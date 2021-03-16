import React from 'react'

export const Article = ({ children, title, size, type, withBackgroundWhite, titleSize, handlerRemove }) => (
  <article className={`message ${type}${size ? (` column is-${size}`) : ''}`}>
    <div className={`message-header is-size-${titleSize}`}>
      <p>{title}</p>
      {
        handlerRemove &&
          <button className='delete' type='button' onClick={handlerRemove} />
      }
    </div>
    <div className={`message-body${withBackgroundWhite ? ' has-background-white' : ''}`}>
      {children}
    </div>
  </article>
)

Article.defaultProps = {
  type: 'is-info',
  withBackgroundWhite: true,
  titleSize: 4
}
