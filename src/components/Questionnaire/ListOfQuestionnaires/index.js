import React, { Fragment ,useEffect, useState} from 'react';
import { Link  } from '@reach/router';
import NProgress from 'nprogress';
import useAPI from '../../../hooks/useAPI';


const ListOfQuestionnaires = () => {

  const {wsGetQuestionnaires} = useAPI();

    const [questionnaires, setQuestinnaires] = useState([]);

    useEffect(() => {
      GetQuestionnaires();
    },[]);

   

      const GetQuestionnaires = async() => {
        NProgress.configure({ showSpinner: false });
        NProgress.start();
        const questionnaires = await wsGetQuestionnaires();
        NProgress.done();
        if(questionnaires)
          setQuestinnaires(questionnaires);

      }

return(
  <>
    <h1 className="title is-1">Mis cuestionarios</h1>
    <table className="table is-hoverable is-striped is-fullwidth">
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
        {
          questionnaires.map((q,index)=>(
            <tr key={q.Code}>
              <th className="has-text-right">{index+1}</th>
              <td><Link to={`/user/questionnaires/detail/${q.Code}`}>{q.Name}</Link></td>
              <td className="has-text-center">{q.Code}</td>
              <td className="has-text-right">{q.NoQuestions}</td>
              <td className="has-text-right">0</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </>
    )
}

export default ListOfQuestionnaires;