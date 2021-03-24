import React, { useContext, useRef } from 'react'
import { Link, navigate } from '@reach/router'
import { Context } from '../../Context'

import 'bulma/css/bulma.css'
import './styles.css'

export const Layout = (props) => {
  const menuRef = useRef(null)
  const hamburguerMenuRef = useRef(null)
  const { isAuth, removeAuth } = useContext(Context)

  const handleMenuClick = () => {
    if (menuRef.current.classList.contains('is-active')) {
      menuRef.current.classList.remove('is-active')
      hamburguerMenuRef.current.classList.remove('is-active')
    } else {
      menuRef.current.classList.add('is-active')
      hamburguerMenuRef.current.classList.add('is-active')
    }
  }

  return (
    <div className='contenedor'>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link className='navbar-item is-size-4' to='/'>
            <img src='data:image/png;base64,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' height='50' />
            <p className='ml-2'>Cuestionarios</p>
          </Link>

          <a ref={hamburguerMenuRef} onClick={handleMenuClick} role='button' className='navbar-burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </a>
        </div>
        <div ref={menuRef} className='navbar-menu'>
          <div className='navbar-end'>

            <div className='navbar-item'>
              <div className='buttons'>
                <Link className='button is-success is-inverted' to='/questionnaire'>Tengo un código de cuestionario</Link>
                {
                  isAuth && (
                    <a className='button is-info is-light' onClick={() => { navigate('/user'); handleMenuClick() }}>
                      Mi cuenta
                    </a>
                  )
                }
                {
                  !isAuth ? (
                    <>
                      <a className='button is-primary' onClick={() => { navigate('/register'); handleMenuClick() }}>
                        <strong>Registro</strong>
                      </a>
                      <a className='button is-info is-light' onClick={() => { navigate('/login'); handleMenuClick() }}>
                        Acceso
                      </a>
                    </>
                  )
                    : (
                      <div
                        className='button is-primary'
                        onClick={() => { removeAuth(); navigate('/login'); handleMenuClick() }}
                      >
                        <strong>Cerrar sesión</strong>
                      </div>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className='p-5 has-background-info-light'>
        {props.children}
      </main>
      <footer className='p-5 has-background-info-dark is-justify-content-flex-end'>
        <div className='content has-text-centered'>
          <p className='has-text-white'>
            Made with
            {' '}
            <label className='has-text-danger'>&#10084;</label>
            {' '}
            by <a style={{ textDecoration: 'underline' }} className='has-text-white' href='https://github.com/rogelio133' target='blank'>@rogeliope</a>
          </p>
        </div>
      </footer>
      {
      }

    </div>
  )
}
