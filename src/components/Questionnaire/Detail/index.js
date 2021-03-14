import React, { Fragment ,useEffect, useState} from 'react';
import NProgress from 'nprogress';
import {ListOfQuestions} from '../ListOfQuestions/index';
import {ListOfAnswers} from '../ListOfAnswers/index';

import useAPI from '../../../hooks/useAPI';

const QuestionnaireDetail = ({ detailId }) => {

  const {wsGetQuestionnaire} = useAPI();

    const [questionnaire, setQuestinnaire] = useState({});
    const [tabs, setTabs] = useState([
        {id:1,icon:'ticket-alt', title:'Código', active: true},
        {id:2,icon:'list', title:'Preguntas', active: false},
        {id:3,icon:'clipboard-check', title:'Respuestas', active: false},
        {id:4,icon:'chart-pie', title:'Estadisticas', active: false},
    ]);

    const tabCodigo= (
      <div>
        <h4 className="title is-4 has-text-centered">Comparte el siguiente codigo a las personas que quieras que contesten el cuestionario</h4>
        <h1 className="title is-1 has-text-centered">{questionnaire.Code}</h1>
      </div>
    );

    useEffect(() => { GetQuestionnaire() },[]);

    const getActiveTabContent = ()=> {
        if(tabs[0].active)
            return tabCodigo;
        if(tabs[1].active)
          return <ListOfQuestions questions={questionnaire.Questions} />
        if(tabs[2].active)
          return <ListOfAnswers answers={questionnaire.Exams} />  
        return <div>aun no esta</div>
    }

    const handleTabSelected = (tab) => {
        const _tabs = Object.create(tabs);

        _tabs.forEach(t => {
          t.active = t.id == tab.id;
        });

        setTabs(_tabs);
    }

    const GetQuestionnaire = async() => {
        NProgress.configure({ showSpinner: false });
        NProgress.start();
        const questionnaire = await wsGetQuestionnaire(detailId);
        NProgress.done();
        setQuestinnaire(questionnaire);
    }

return(
  <>
    <h2 className="title is-2">{questionnaire.Name}</h2>
    <div className="tabs is-centered is-toggle is-fullwidth ">
      <ul>
        {
              tabs.map((tab)=>(
                <li 
                  key={tab.id} 
                  className={tab.active ? 'is-active' : ''}
                  onClick={()=> handleTabSelected(tab)}
                >
                  <a>
                    <span className="icon is-small"><i className={`fas fa-${tab.icon}`} aria-hidden="true" /></span>
                    <span>{tab.title}</span>
                  </a>
                </li>
              ))
          }
      </ul>
    </div>
    <div className="box mt-0">
      {
        getActiveTabContent()
      }

    </div>
  </>
    )
}

export default QuestionnaireDetail;