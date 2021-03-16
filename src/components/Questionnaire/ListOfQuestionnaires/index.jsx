import React, { useEffect, useState } from 'react'
import { Link } from '@reach/router'
import NProgress from 'nprogress'
import { useAPI } from '../../../hooks/useAPI'
import { Article } from '../../Widgets/Article/index'
import { Message } from '../../Widgets/Message/index'

export const ListOfQuestionnaires = () => {
  const { wsGetQuestionnaires } = useAPI()
  const [questionnaires, setQuestionnaires] = useState([])

  useEffect(() => {
    GetQuestionnaires()
  }, [])

  const GetQuestionnaires = async () => {
    NProgress.configure({ showSpinner: false })
    NProgress.start()
    const questionnaires = await wsGetQuestionnaires()
    NProgress.done()
    if (questionnaires) setQuestionnaires(questionnaires)
  }

  return (
    <Article title='Mis cuestionarios'>
      <div className='has-text-right'>
        <Link className='button is-primary mb-4' to='/user'>
          <strong>Regresar</strong>
        </Link>
      </div>
      {questionnaires.length > 0 ? (
        <table className='table is-hoverable is-striped is-fullwidth is-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Código</th>
              <th># Preguntas</th>
              <th>Personas que han respondido</th>
            </tr>
          </thead>
          <tbody>
            {questionnaires.map((q, index) => (
              <tr key={q.Code}>
                <th className='has-text-right'>{index + 1}</th>
                <td>
                  <Link to={`/user/questionnaires/detail/${q.Code}`}>
                    {q.Name}
                  </Link>
                </td>
                <td className='has-text-centered'>{q.Code}</td>
                <td className='has-text-right'>{q.NoQuestions}</td>
                <td className='has-text-right'>{q.Answers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Message description='Todavia no has creado un cuestionario' />
      )}
    </Article>
  )
}
