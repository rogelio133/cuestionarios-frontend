import React, { useState } from 'react'
import { ListOfUserAnswers } from '../Form/ListOfUserAnswers/index'
import { useAPI } from '../../../hooks/useAPI'

export const ListOfAnswers = ({ answers }) => {
  const [loading, setIsLoading] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const [name, setName] = useState()
  const [questions, setQuestions] = useState([])

  const { wsGetDetailAnswer } = useAPI()
  const handleExamDetail = (exam) => {
    setModalActive(true)
    setName(exam.Name)
    console.log(exam)
    GetDetailAnswer(exam.ID)
  }

  const GetDetailAnswer = async (ID) => {
    const questions = await wsGetDetailAnswer(ID)

    if (questions) setQuestions(questions)
  }

  return (
    <>
      <div className='table-container'>
        <table className='table is-hoverable is-striped is-fullwidth is-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correctas</th>
              <th>Incorrectas</th>
              <th>Resultado</th>
              <th>Tiempo</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {
              answers.map((answer, index) => (
                <tr key={answer.ID}>
                  <th className='has-text-right'>{index + 1}</th>
                  <td>
                    <a
                      onClick={() => handleExamDetail(answer)}
                    >
                      {answer.Name}
                    </a>
                  </td>
                  <td className='has-text-right'>{answer.AnswersCorrect}</td>
                  <td className='has-text-right'>{answer.AnswersFailed}</td>
                  <td className='has-text-centered'>{answer.Score}</td>
                  <td>{answer.Time}</td>
                  <td className='has-text-centered'>{answer.Date}</td>

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className={`modal  ${modalActive && 'is-active'}`}>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>{`Respuestas de ${name}`}</p>
            <button type='button' className='delete' aria-label='close' onClick={() => setModalActive(false)} />
          </header>
          <section className='modal-card-body'>

            <ListOfUserAnswers questions={questions} />
          </section>

        </div>
      </div>

    </>
  )
}
