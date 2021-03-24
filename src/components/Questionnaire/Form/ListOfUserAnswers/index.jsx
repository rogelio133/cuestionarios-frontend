import React from 'react'

export const ListOfUserAnswers = ({ questions }) => {
  const getOptionLetter = (index) => {
    if (index == 0) { return 'A' }
    if (index == 1) { return 'B' }
    return 'C'
  }
  return (
    <>
      {
        questions.map((question) => (
          <div key={question.IDQuestion} className={`box has-background-${question.Correct ? 'success' : 'danger'}-light`}>
            <h6 className='title is-6 mb-2'>{`${question.IDQuestion}.-  ${question.Name}`}</h6>
            <ul>
              {
                question.Options.map((option, indexO) => (
                  <li key={option.IDOption}>
                    <p className={option.Selected ? 'label' : (!question.Correct && option.Correct ? 'has-background-success-light mt-2 mb-2' : '')}>
                      {`${getOptionLetter(indexO)}) ${option.Name}`}
                    </p>
                  </li>
                ))
              }
            </ul>

          </div>
        ))
      }
    </>
  )
}
