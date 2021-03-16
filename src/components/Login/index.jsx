import React, { useState, useRef, useContext } from 'react'
import { Link } from '@reach/router'
import { rulesEmail, rulesEmpty } from '../../utils'
import { Context } from '../../Context'
import { useAPI } from '../../hooks/useAPI'
import { CenteredContainer } from '../../GlobalStyles'

export const Login = () => {
  const { activateAuth } = useContext(Context)

  const { wsValidateLogin } = useAPI()

  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({ usernameError: '', passwordError: '', formError: '' })

  const usernameRef = useRef('')
  const passwordRef = useRef('')

  const validateForm = () => {
    let usernameError = ''
    let passwordError = ''

    const username = usernameRef.current.value
    const password = passwordRef.current.value

    if (rulesEmpty(username)) {
      usernameError = 'Requerido'
    } else if (!rulesEmail(username)) {
      usernameError = 'Formato de email incorrecto'
    }
    if (rulesEmpty(password)) {
      passwordError = 'Requerido'
    }

    const formOK = !usernameError && !passwordError

    setState({ usernameError, passwordError, formError: '' })

    if (formOK) {
      ValidateLogin(username, password)
    }
  }

  const ValidateLogin = async (user, password) => {
    setLoading(true)
    const response = await wsValidateLogin(user, password)
    setLoading(false)

    if (!response) {
      setState((prevState) => ({ ...prevState, formError: 'No se pudo procesar su solicitud.' }))
      return
    }
    if (!response.d.Success) {
      setState((prevState) => ({ ...prevState, formError: response.d.Message }))
      return
    }
    activateAuth(response.d.Data)
  }

  return (
    <CenteredContainer>
      <form className='box column is-one-third'>
        <h1 className='title is-1 has-text-centered'>Acceso</h1>
        <div className='field'>
          <label className='label'>Email</label>
          <div className='control'>
            <input className={`input ${state.usernameError && 'is-danger'}`} type='email' disabled={loading} ref={usernameRef} defaultValue='rogelio_133@outlook.com' />
          </div>
          {state.usernameError && <p className='help is-danger'>{state.usernameError}</p>}
        </div>

        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input className={`input ${state.passwordError && 'is-danger'}`} type='password' disabled={loading} ref={passwordRef} defaultValue='123' />
          </div>
          {state.passwordError && <p className='help is-danger'>{state.passwordError}</p>}
        </div>

        <button
          type='button'
          className={`button is-primary is-fullwidth ${loading && 'is-loading'}`}
          onClick={validateForm}
        >
          <strong>Acceder</strong>
        </button>
        <p className='mt-5'>
          Si no tienes una cuenta, puedes crearla
          {' '}
          <Link to='/register'>Aquí</Link>
        </p>
        {state.formError && <p className='help is-danger'>{state.formError}</p>}
      </form>
    </CenteredContainer>
  )
}
