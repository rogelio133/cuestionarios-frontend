import React, { useState, useRef } from 'react'
import { Link, navigate } from '@reach/router'
import { ListOfQuestions } from '../ListOfQuestions/index'
import { useAPI } from '../../../hooks/useAPI'
import { Article } from '../../Widgets/Article/index'
import { rulesEmpty } from '../../../utils'

export const NewQuestionary = () => {
  const questionaryRef = useRef('')
  const questionRef = useRef('')
  const optionRef = useRef('')

  const { wsSaveQuestionnaire } = useAPI()

  const [loading, setIsLoading] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const [options, setOptions] = useState([])
  const [questions, setQuestions] = useState([])

  const [state, setState] = useState({
    errorQuestionary: false,
    errorQuestion: false,
    errorOptions: false
  })

  const addOption = () => {
    const option = optionRef.current.value
    if (!rulesEmpty(option) && options.length < 3) {
      const max = options.length == 0 ? null : options.reduce((prev, current) => (prev.IDOption > current.IDOption) ? prev : current)
      const IDOption = max == null ? 1 : (max.IDOption + 1)

      setOptions((prevOptions) => ([...prevOptions, { IDOption, Name: option, Correct: false }]))
      setState((prevState) => ({ ...prevState, errorOptions: '' }))

      optionRef.current.value = ''
    }
  }

  const addQuestion = () => {
    const question = questionRef.current.value

    let _OptionsOK = ''
    let _QuestionOK = true

    if (options.length < 3) {
      _OptionsOK = 'Debe de especificar 3 opciones'
    } else if (options.filter(o => o.Correct).length == 0) {
      _OptionsOK = 'Debe de especificar la opción correcta'
    }

    if (rulesEmpty(question)) {
      _QuestionOK = false
    }

    setState((prevState) => ({ ...prevState, errorOptions: _OptionsOK, errorQuestion: !_QuestionOK }))

    if (_QuestionOK && !_OptionsOK) {
      const max = questions.length == 0 ? null : questions.reduce((prev, current) => (prev.IDQuestion > current.IDQuestion) ? prev : current)
      const IDQuestion = max == null ? 1 : (max.IDQuestion + 1)

      setQuestions((prevQuestions) => ([...prevQuestions, { IDQuestion, Name: question, Options: options }]))
      setOptions([])

      questionRef.current.value = ''
    }
  }

  const closeModal = () => {
    setModalActive(false)
  }

  const confirmQuestionnaire = () => {
    const questionary = questionaryRef.current.value
    let _QuestionaryOK = true
    let _QuestionOK = ''

    if (rulesEmpty(questionary)) {
      _QuestionaryOK = false
    }
    if (questions.length < 1) {
      _QuestionOK = 'Debe de agregar por lo menos 3 preguntas'
    }

    setModalActive(_QuestionaryOK && !_QuestionOK)
    setState((prevState) => ({ ...prevState, errorQuestionary: !_QuestionaryOK, errorOptions: _QuestionOK }))
  }

  const getOptionLetter = (index) => {
    if (index == 0) { return 'A' }
    if (index == 1) { return 'B' }
    return 'C'
  }

  const handleKeyDownOption = (e) => {
    if (e.key === 'Enter') {
      addOption()
    }
  }

  const removeOption = (event, id) => {
    event.stopPropagation()
    setOptions(options.filter(option => option.IDOption != id))
    setState((prevState) => ({ ...prevState, errorOptions: false }))
  }

  const removeQuestion = (id) => {
    setQuestions(questions.filter(question => question.IDQuestion != id))
  }

  const saveQuestionnaire = async () => {
    const questionnaire = { Name: questionaryRef.current.value, Questions: questions }

    setIsLoading(true)
    const data = await wsSaveQuestionnaire(questionnaire)
    setIsLoading(false)

    closeModal()
    if (data) {
      navigate(`/user/questionnaires/detail/${data.questionnaireID}`)
    }
  }

  const setCorrectOption = (option) => {
    const _options = options

    _options.forEach(o => {
      o.Correct = o.IDOption == option.IDOption
    })

    setOptions(_options)
    setState((prevState) => ({ ...prevState, errorOptions: false }))
  }

  return (
    <Article title='Nuevo cuestionario'>
      <div className='field  '>
        <div className='control  '>
          <input type='text' className={`input ${state.errorQuestionary && 'is-danger'}`} ref={questionaryRef} placeholder='Nombre del cuestionario' maxLength={50} />
          {
            state.errorQuestionary &&
              <p className='help is-danger'>Requerido</p>
          }
        </div>
      </div>
      <div className='has-text-centered mb-3'>
        <a
          className='button is-success'
          onClick={confirmQuestionnaire}
        >
          <strong>Guardar cuestionario</strong>
        </a>
        <Link className='button is-danger ml-2' to='/user'>
          Cancelar
        </Link>

      </div>

      <Article
        title='Agregar pregunta'
        type={state.errorOptions ? 'is-danger' : 'is-info'}
        withBackgroundWhite={false}
        titleSize={6}
      >
        <div className='field is-grouped'>
          <div className='control is-expanded'>
            <input type='text' className={`input ${state.errorQuestion ? 'is-danger' : ''}`} ref={questionRef} placeholder='Descripción de la pregunta' />
            {
              state.errorQuestion &&
                <p className='help is-danger'>Requerido</p>
            }
          </div>
          <p className='control'>
            <a
              className='button is-info'
              onClick={addQuestion}
            >
              Agregar
            </a>
          </p>
        </div>
        <div className='box'>
          <div className='field is-grouped'>
            <p className='control is-expanded'>
              <input type='text' className='input' ref={optionRef} onKeyDown={handleKeyDownOption} placeholder='Descripción de la opción' />
            </p>
            <p className='control'>
              <a
                className='button is-info'
                onClick={addOption}
                disabled={options.length == 3}
              >
                Agregar
              </a>
            </p>
          </div>

          {
            options.map((option, index) => (
              <article className={`message is-clickable ${option.Correct ? 'is-success' : 'is-info'}`} key={option.IDOption} onClick={() => setCorrectOption(option)}>
                <div className='message-header'>
                  <p>
                    {`${getOptionLetter(index)} ) ${option.Name}`}
                  </p>
                  <button type='button' className='delete' aria-label='delete' onClick={(e) => removeOption(e, option.IDOption)} />
                </div>
              </article>

            ))
          }

        </div>
        {
          state.errorOptions &&
            <p className='help is-danger'>{state.errorOptions}</p>
        }
      </Article>

      <Article
        title='Preguntas'
        withBackgroundWhite={false}
        titleSize={6}
      >
        <ListOfQuestions
          questions={questions}
          handlerRemoveQuestion={removeQuestion}
        />

      </Article>

      <div className={`modal  ${modalActive && 'is-active'}`}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Guardar cuestionario</p>
            <button type='button' className='delete' aria-label='close' onClick={closeModal} disabled={loading} />
          </header>
          <section className='modal-card-body'>
            ¿Desea guardar este cuestionario?
            <br />
            Si continua no podrá modificar las preguntas registradas
          </section>
          <footer className='modal-card-foot'>
            <button type='button' onClick={saveQuestionnaire} className={`button is-success ${loading && 'is-loading'}`}>Aceptar</button>
            <button type='button' className='button' onClick={closeModal} disabled={loading}>Cancelar</button>
          </footer>
        </div>
      </div>
    </Article>
  )
}
