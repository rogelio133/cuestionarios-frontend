import React from 'react'

export const Message = ({ children, description }) => (
  <article className='message is-warning'>
    <div className='message-body'>
      <h3 className='title is-4'>{description}</h3>
      {children}
    </div>
  </article>
)
