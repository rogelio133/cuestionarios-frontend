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
                <article className="message is-info" key={question.ID}>
                  <div className="message-header">
                    {`${indexQ+1}.- ${question.Name}`}
                    {
                      props.handlerRemoveQuestion && 
                      <button className="delete" type="button" onClick={()=> props.handlerRemoveQuestion(question.ID)} />
                    }
                      
                  </div>
                  
                  <div className="message-body">
                    <ul>
                      {
                        question.Options.map((option,indexO)=>(
                          <li key={option.ID}>
                            <p className={`${option.Correct && "label"}`}>
                              {`${getOptionLetter(indexO)}) ${option.Name}`}
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
 