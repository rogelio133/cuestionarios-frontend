import React from 'react';


export const ListOfAnswers = ({answers}) => (
  <>
    <table className="table is-hoverable is-striped is-fullwidth is-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th># Preguntas correctas</th>
          <th># Preguntas incorrectas</th>
          <th>Resultado</th>
          <th>Tiempo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {
          answers.map((answer,index)=>(
            <tr key={answer.ID}>
              <th className="has-text-right">{index+1}</th>
              <td>{answer.Name}</td>
              <td className="has-text-right">{answer.AnswersCorrect}</td>
              <td className="has-text-right">{answer.AnswersFailed}</td>
              <td className="has-text-centered">{answer.Score}</td>
              <td>{answer.Time}</td>
              <td className="has-text-centered">{answer.Date}</td>

            </tr>
          ))
        }
      </tbody>
    </table>
  </>
    )
