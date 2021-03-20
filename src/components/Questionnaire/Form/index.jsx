import React, { useState, useRef, useEffect } from 'react'
import { Link } from '@reach/router'
import NProgress from 'nprogress'
import { CenteredContainer } from '../../../GlobalStyles'
import { useAPI } from '../../../hooks/useAPI'
import { Question } from '../Question/index'
import { Article } from '../../Widgets/Article/index'
import { Message } from '../../Widgets/Message/index'
import { rulesEmpty } from '../../../utils'

export const Form = ({ isAuth }) => {
  const _stepValidatingCode = 1
  const _stepGettingUserData = 2
  const _stepAnswering = 3
  const _stepAnswersSaved = 4
  const _stepErrorSaving = 5

  const { wsValidateCode, wsSaveQuestionnaireAnswer } = useAPI()

  const [startDate, setStartDate] = useState(null)
  const [errorMessage, setErrormessage] = useState('')
  const [name, setName] = useState('')
  const [step, setStep] = useState(_stepValidatingCode)
  const [loading, setLoading] = useState(false)
  const [questionnaire, setQuestionnaire] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState({ selected: false, ID: 0 })
  const [answers, setAnswers] = useState([])
  const [stats, setStats] = useState([])
  const [isLastQuestion, setIsLastQuestion] = useState(false)

  const coderef = useRef('')
  const nameRef = useRef('')

  useEffect(() => { console.log(isAuth); NProgress.configure({ showSpinner: false }) }, [])

  const addAnswer = () => {
    const answer = { IDQuestion: currentQuestion.IDQuestion, IDOptionSelected: selectedOption.ID }
    setAnswers((prevAnswers) => ([...prevAnswers, answer]))
  }

  const handleGettingUserData = () => {
    const _name = nameRef.current.value

    if (rulesEmpty(_name)) {
      setErrormessage('Requerido')
    } else {
      setCurrentQuestion(questionnaire.Questions[questionIndex])
      setErrormessage('')
      setStartDate(_name ? new Date() : null)
      setName(_name)
      setStep(_name ? _stepAnswering : _stepGettingUserData)
    }
  }

  const handleSearchCode = async () => {
    const code = coderef.current.value

    if (rulesEmpty(code)) {
      setErrormessage('Requerido')
    } else if (code.length < 6) {
      setErrormessage('La longitud del código debe de ser de 6 caracteres')
    } else {
      setErrormessage('')
      isLoading(true)
      const questionnaire = await wsValidateCode(code)
      isLoading(false)

      setQuestionnaire(questionnaire)
      setErrormessage(!questionnaire ? 'Código incorrecto, favor de validar' : '')
      setStep(questionnaire ? _stepGettingUserData : _stepValidatingCode)
    }
  }

  const handleOptionSelected = (optionID) => {
    setSelectedOption({ selected: true, ID: optionID })
  }

  const handleSendAnswers = async () => {
    const answer = { IDQuestion: currentQuestion.IDQuestion, IDOptionSelected: selectedOption.ID }

    const endDate = new Date()

    const questionnaireAnswer = {
      Name: name,
      Answers: [...answers, answer],
      Time: endDate.getTime() - startDate.getTime()
    }

    isLoading(true)
    const stats = await wsSaveQuestionnaireAnswer(questionnaire.Code, questionnaireAnswer)
    isLoading(false)

    setStats(stats)
    setStep(stats ? _stepAnswersSaved : _stepErrorSaving)
  }

  const handleSetNextQuestion = () => {
    addAnswer()
    setCurrentQuestion(questionnaire.Questions[questionIndex + 1])

    const lastQuestion = (questionIndex + 1) == questionnaire.Questions.length - 1

    setSelectedOption({ selected: false, ID: 0 })
    setQuestionIndex((prevIndex) => (prevIndex + 1))
    setIsLastQuestion(lastQuestion)
  }

  const isLoading = (_loading) => {
    setLoading(_loading)
    if (_loading) { NProgress.start() } else { NProgress.done() }
  }

  return (
    <>
      {
        step == _stepValidatingCode && (
          <CenteredContainer>
            <Article title='Introduce el código de cuestionario'>
              <div className='field has-addons is-justify-content-center'>
                <div className='control'>
                  <input
                    className={`input is-large has-text-centered ${errorMessage && 'is-danger'}`}
                    type='text'
                    placeholder='Código'
                    ref={coderef}
                    disabled={loading}
                    maxLength={6}
                    defaultValue='VvEA35'
                  />
                </div>
                <div className='control'>
                  <button
                    type='button'
                    className={`button is-info is-large ${loading && 'is-loading'}`}
                    onClick={handleSearchCode}
                  >
                    Acceder
                  </button>
                </div>

              </div>
              {errorMessage && <p className='help is-danger'>{errorMessage}</p>}
            </Article>
          </CenteredContainer>

        )
      }
      {
        step == _stepGettingUserData && (
          <CenteredContainer>
            <Article
              title={questionnaire.Name}
              size='half'
            >
              <div className='field'>
                <label className='label'>¿Cual es tu nombre?</label>
                <div className='control'>
                  <input className={`input is-large ${errorMessage && 'is-danger'}`} type='text' ref={nameRef} maxLength={150} placeholder='Especifica tu nombre' />
                </div>
                {errorMessage && <p className='help is-danger'>{errorMessage}</p>}
              </div>
              <div className='has-text-centered mt-5'>
                <button
                  type='button'
                  className={`button is-success is-large ${loading && 'is-loading'}`}
                  onClick={handleGettingUserData}
                >
                  Comenzar
                </button>
              </div>
            </Article>

          </CenteredContainer>
        )
      }
      {
        step == _stepAnswering && (

          <Article title={questionnaire.Name}>
            <h5 className='title is-5 has-text-centered mb-2'>{`${questionIndex + 1} / ${questionnaire.Questions.length}`}</h5>
            <progress className='progress is-link' value={questionIndex + 1} max={questionnaire.Questions.length} />

            <Question
              number={questionIndex + 1}
              handleOptionSelected={handleOptionSelected}
              question={currentQuestion}
            />
            <div className='has-text-right'>
              {
                !isLastQuestion && (
                  <button
                    type='button'
                    className='button is-info is-large'
                    disabled={!selectedOption.selected}
                    onClick={handleSetNextQuestion}
                  >
                    Siguiente
                  </button>
                )
              }
              {
                isLastQuestion && (
                  <button
                    type='button'
                    className={`button is-success is-large ${loading && 'is-loading'}`}
                    disabled={!selectedOption.selected}
                    onClick={handleSendAnswers}
                  >
                    Finalizar
                  </button>
                )
              }
            </div>
          </Article>
        )
      }
      {
        step == _stepAnswersSaved && (
          <Article title={questionnaire.Name}>

            <h5 className='title is-5'>Gracias por contestar este cuestionario, tu resultado es el siguiente :</h5>
            <nav className='box level'>
              {
                stats.map((stat) => (
                  <div key={stat.ID} className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>{stat.Description}</p>
                      <p className='title'>{stat.Value}</p>
                    </div>
                  </div>
                ))
              }

            </nav>
            {!isAuth &&
              <>
                <p className='is-size-5'>
                  ¿Te gustó este cuestionario?, ¿Te gustaria crear tus propios cuestionarios para compartirlos con tus amigos?.
                  <br />
                  Puedes crear una cuenta o si ya cuentas con una, puedes iniciar sesión para crear y compartir cuestionarios.
                </p>
                <div className='has-text-centered mt-6 mb-4'>
                  <Link className='button is-medium is-info' to='/'><strong>Conocer más</strong></Link>
                </div>
              </>}
          </Article>
        )
      }
      {
        step == _stepErrorSaving &&
          <Message
            description='Ocurrió un problema al procesar su solicitud'
          >
            <div className='has-text-centered mt-6 mb-4'>
              <Link className='button is-medium is-info' to='/'><strong>Aceptar</strong></Link>
            </div>
          </Message>
      }
    </>
  )
}
