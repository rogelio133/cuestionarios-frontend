import React, { useState, useRef, useContext } from 'react'
import { Link } from '@reach/router'
import { rulesEmail, rulesEmpty } from '../../utils'
import { Context } from '../../Context'
import { useAPI } from '../../hooks/useAPI'
import { CenteredContainer } from '../../GlobalStyles'

export const Register = () => {
  const { activateAuth } = useContext(Context)

  const { wsCreateAccount } = useAPI()

  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({ usernameError: '', passwordError: '', passwordConfirmError: '', formError: '' })

  const usernameRef = useRef('')
  const passwordRef = useRef('')
  const passwordConfirmRef = useRef('')

  const CreateAccount = async (user, password) => {
    setLoading(true)
    const response = await wsCreateAccount(user, password)
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

  const handleChange = (e) => {
    e.preventDefault()
  }

  const validateForm = () => {
    let usernameError = ''
    let passwordError = ''
    let passwordConfirmError = ''

    const username = usernameRef.current.value
    const password = passwordRef.current.value
    const passwordConfirm = passwordConfirmRef.current.value

    if (rulesEmpty(username)) {
      usernameError = 'Requerido'
    } else if (!rulesEmail(username)) {
      usernameError = 'Formato de email incorrecto'
    }
    if (rulesEmpty(password)) {
      passwordError = 'Requerido'
    }

    if (rulesEmpty(passwordConfirm)) {
      passwordConfirmError = 'Requerido'
    } else if (password != passwordConfirm) {
      passwordConfirmError = 'El password no coincide con la confirmación'
    }

    const formOK = !usernameError && !passwordError && !passwordConfirmError

    setState({ usernameError, passwordError, passwordConfirmError, formError: '' })

    if (formOK) {
      CreateAccount(username, password)
    }
  }

  return (
    <CenteredContainer>
      <form className='box column is-one-third'>
        <h1 className='title is-1 has-text-centered'>Registro</h1>
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
            <input
              className={`input ${state.passwordError && 'is-danger'}`}
              type='password'
              disabled={loading}
              ref={passwordRef}
              defaultValue='123'
              onCut={handleChange}
              onCopy={handleChange}
              onPaste={handleChange}
            />
          </div>
          {state.passwordError && <p className='help is-danger'>{state.passwordError}</p>}
        </div>
        <div className='field'>
          <label className='label'>Confirma Password</label>
          <div className='control has-icons-right '>
            <input
              className={`input ${state.passwordConfirmError && 'is-danger'}`}
              type='password'
              disabled={loading}
              ref={passwordConfirmRef}
              defaultValue='123'
              onCut={handleChange}
              onCopy={handleChange}
              onPaste={handleChange}
            />
            <span class='icon is-small is-right is-clickable'>
              <i class='fas fa-eye' />
            </span>
          </div>
          {state.passwordConfirmError && <p className='help is-danger'>{state.passwordConfirmError}</p>}
        </div>

        <button
          type='button'
          className={`button is-primary is-fullwidth ${loading && 'is-loading'}`}
          onClick={validateForm}
        >
          <strong>Crear cuenta</strong>
        </button>
        <p className='mt-5'>
          Si ya tienes una cuenta, puedes
          {' '}
          <Link to='/login'>Iniciar sesión</Link>
        </p>
        {state.formError && <p className='help is-danger'>{state.formError}</p>}
      </form>
    </CenteredContainer>
  )
}
