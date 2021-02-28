import React, { createContext, useState } from 'react';

export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => window.sessionStorage.getItem('token'));
  const [urlWs, setUrlWs] = useState('');
  const [wsError, setWsError] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  const value = {
    urlWs,
    setUrlWs,
    isAuth,

    wsError,invalidToken,
    setWsError,setInvalidToken,
    activateAuth: info => {
       setIsAuth(true);
       window.sessionStorage.setItem('token',JSON.stringify( info))
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
