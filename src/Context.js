import React, { createContext, useState } from 'react'

export const Context = createContext()

const Provider = ({ children, urlWS }) => {
  const [isAuth, setIsAuth] = useState(() => window.sessionStorage.getItem('token'))
  const [wsError, setWsError] = useState('')
  const [invalidToken, setInvalidToken] = useState(false)

  const value = {
    urlWs: urlWS,
    isAuth,

    wsError,
    invalidToken,
    setWsError,
    setInvalidToken,
    activateAuth: info => {
      setIsAuth(true)
      window.sessionStorage.setItem('token', JSON.stringify(info))
    },
    removeAuth: () => {
      setIsAuth(false)
      window.sessionStorage.removeItem('token')
    }
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Consumer: Context.Consumer
}
