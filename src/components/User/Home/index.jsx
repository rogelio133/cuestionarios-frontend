import React from 'react'
import { Link } from '@reach/router'
import { sessionInfo } from '../../../sessionInfo'
import { Article } from '../../Widgets/Article/index'

export const UserHome = () => {
  const { name } = sessionInfo()

  return (
    <Article title='Mi cuenta'>
      <h2 className='title is-21'>{`Hola ${name}`}</h2>
      <div className='block'>

        <Link className='button is-success' to='/user/questionnaires'>
          <span className='icon is-small'>
            <i className='fas fa-list' />
          </span>
          <span><strong>Mis cuestionarios</strong></span>
        </Link>

      </div>
      <div className='block'>
        <Link className='button is-primary' to='/user/questionnaires/new'>
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span><strong>Crear cuestionario</strong></span>
        </Link>
      </div>
    </Article>
  )
}
