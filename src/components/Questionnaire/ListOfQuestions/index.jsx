/* eslint-disable import/prefer-default-export */
import React from 'react';

export const ListOfQuestions = (props) =>{
  
  const getOptionLetter = (index) =>{
    if(index==0)
      return 'A';
    if(index==1)
      return 'B';
    return 'C';
  }
  
  return (
    <article className="message">
      {
        props.handlerRemoveQuestion && (
        <div className="message-header">
          <p>Preguntas </p>
        </div>
      )
      }
      
      <div className="message-body">
        {
              props.questions.map((question,indexQ)=>(
                <article className="message is-info" key={question.id}>
                  <div className="message-header">
                    {`${indexQ+1}.- ${question.name}`}
                    {
                      props.handlerRemoveQuestion && 
                      <button className="delete" type="button" onClick={()=> props.handlerRemoveQuestion(question.id)} />
                    }
                      
                  </div>
                  
                  <div className="message-body">
                    <ul>
                      {
                        question.options.map((option,indexO)=>(
                          <li key={option.id}>
                            <p className={`${option.correct && "label"}`}>
                              {`${getOptionLetter(indexO)}) ${option.name}`}
                            </p>
                          </li>
                        ))
                      }
                      
                    </ul>
                  </div>
                </article>

              ))
          }
          


          

          
      </div>
    </article>

)
        }
 