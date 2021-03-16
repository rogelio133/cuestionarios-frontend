import React from 'react'
import { Article } from '../../Widgets/Article/index'

export const ListOfQuestions = (props) => {
  const getOptionLetter = (index) => {
    if (index == 0) { return 'A' }
    if (index == 1) { return 'B' }
    return 'C'
  }

  return (
    <>
      {
        props.questions.map((question, indexQ) => (
          <Article
            key={question.IDQuestion}
            title={`${indexQ + 1}.- ${question.Name}`}
            titleSize={6}
            handlerRemove={props.handlerRemoveQuestion ? () => props.handlerRemoveQuestion(question.IDQuestion) : null}
          >
            <ul>
              {
                question.Options.map((option, indexO) => (
                  <li key={option.IDOption}>
                    <p className={`${option.Correct && 'label'}`}>
                      {`${getOptionLetter(indexO)}) ${option.Name}`}
                    </p>
                  </li>
                ))
              }

            </ul>

          </Article>

        ))
      }
    </>
  )
}
