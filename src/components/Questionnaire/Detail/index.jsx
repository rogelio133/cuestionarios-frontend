import React, { useEffect, useState } from 'react'
import { Link } from '@reach/router'
import NProgress from 'nprogress'
import { ListOfQuestions } from '../ListOfQuestions/index'
import { ListOfAnswers } from '../ListOfAnswers/index'
import { Article } from '../../Widgets/Article/index'
import { Message } from '../../Widgets/Message'

import { useAPI } from '../../../hooks/useAPI'

export const QuestionnaireDetail = ({ detailId }) => {
  const { wsGetQuestionnaire } = useAPI()

  const [questionnaire, setQuestinnaire] = useState({})
  const [tabs, setTabs] = useState([
    { id: 1, icon: 'ticket-alt', title: 'Código', active: true },
    { id: 2, icon: 'list', title: 'Preguntas', active: false },
    { id: 3, icon: 'clipboard-check', title: 'Respuestas', active: false }
  ])

  const tabCode = (
    <>
      <h4 className='title is-4 has-text-centered'>Comparte el siguiente codigo a las personas que quieras que contesten el cuestionario</h4>
      <h1 className='title is-1 has-text-centered'>{questionnaire.Code}</h1>
    </>
  )

  const tabWithoutAnswes = (
    <Message description='Aun no han contestado este cuestionario'><div className='box'>{tabCode}</div></Message>
  )

  useEffect(() => { GetQuestionnaire() }, [])

  const getActiveTabContent = () => {
    if (tabs[0].active) { return tabCode }
    if (tabs[1].active) { return <ListOfQuestions questions={questionnaire.Questions} /> }
    if (tabs[2].active) { return questionnaire.Exams.length > 0 ? <ListOfAnswers answers={questionnaire.Exams} /> : tabWithoutAnswes }
  }

  const GetQuestionnaire = async () => {
    NProgress.configure({ showSpinner: false })
    NProgress.start()
    const questionnaire = await wsGetQuestionnaire(detailId)
    NProgress.done()
    setQuestinnaire(questionnaire)
  }

  const handleTabSelected = (tab) => {
    const _tabs = Object.create(tabs)

    _tabs.forEach(t => {
      t.active = t.id == tab.id
    })

    setTabs(_tabs)
  }

  return (
    <Article title={questionnaire.Name}>
      <div className='has-text-right'>
        <Link className='button is-primary mb-4' to='/user/questionnaires'>
          <strong>Regresar</strong>
        </Link>
      </div>
      <div className='tabs is-centered is-toggle is-fullwidth mb-0'>
        <ul>
          {
            tabs.map((tab) => (
              <li
                key={tab.id}
                className={tab.active ? 'is-active' : ''}
                onClick={() => handleTabSelected(tab)}
              >
                <a className='button'>
                  <span className='icon is-small'><i className={`fas fa-${tab.icon}`} aria-hidden='true' /></span>
                  <span>{tab.title}</span>
                </a>
              </li>
            ))
          }
        </ul>
      </div>
      <div className='box mt-0'>
        {
          getActiveTabContent()
        }

      </div>
    </Article>
  )
}
