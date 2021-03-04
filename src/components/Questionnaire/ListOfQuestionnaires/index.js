import React, { Fragment ,useEffect, useState} from 'react';
import { Link  } from '@reach/router';
import useAPI from '../../../hooks/useAPI';


const ListOfQuestionnaires = () => {

  const {wsGetQuestionnaires} = useAPI();

    const [questionnaires, setQuestinnaires] = useState([]);

    useEffect(() => {
      GetQuestionnaires();
    },[]);

   

      const GetQuestionnaires = async() => {
        const questionnaires = await wsGetQuestionnaires();
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
            <tr key={q.ID}>
              <th>{index+1}</th>
              <td><Link to={`/user/questionnaires/detail/${q.ID}`}>{q.Name}</Link></td>
              <td>{q.Code}</td>
              <td>{q.NoQuestions}</td>
              <td>0</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </>
    )
}

export default ListOfQuestionnaires;