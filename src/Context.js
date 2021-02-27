import React, { createContext, useState } from 'react';

export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => window.sessionStorage.getItem('token'));
  const [urlWs, setUrlWs] = useState('');

  const value = {
    urlWs,
    setUrlWs,
    isAuth,
    activateAuth: token => {
       setIsAuth(true)
       window.sessionStorage.setItem('token',JSON.stringify( token))
    },
    removeAuth: () => {
      setIsAuth(false)
      window.sessionStorage.removeItem('token')
    }
  };

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
