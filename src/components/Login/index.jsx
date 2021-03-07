import React, { Fragment,useState, useRef,useContext  } from 'react';
import { Link } from '@reach/router';
import {rulesEmail,rulesEmpty,fetchData} from '../../utils';
import {Context} from '../../Context';


const Login = () => {
    const { activateAuth,urlWs } = useContext(Context)

    const [state, setState] = useState({

        loading : false,

        usernameError:'',
        passwordError : '',
        formError:''
    });

    const usernameRef = useRef('');
    const passwordRef = useRef('');

    const validateForm = () =>{

        let usernameError = '';
        let passwordError = '';

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        
        if(rulesEmpty(username)) {
          usernameError= 'Requerido';
        }
        else  if(!rulesEmail(username)) {
          usernameError= 'Formato de email incorrecto';
        }
        if(rulesEmpty(password)) {
          passwordError= 'Requerido';
        }
        
        const formOK = !usernameError && !passwordError;

        setState({...state, 
          loading: formOK,
          usernameError,
          passwordError,
          formError : ''
        });

        if(formOK) {

          ValidateLogin(username,password);
          
        }

    }

    const ValidateLogin= async (user, password) => {

      try {
        const respuesta = await wsValidateLogin(user,password);
        const { d: { Success, Message, Data } } = respuesta;
        
        if (!Success) {
            throw new Error(Message);
        }
        else {
          activateAuth(Data);
        }
    } catch (error) {
      setState({...state,loading: false,formError:error.message});
    }



    }

    const wsValidateLogin = async (user, password) => {
      const parameters = { user, password };
      const respuesta = await fetchData(`${urlWs}ValidateLogin`, parameters);
      return respuesta;
    }

    return (
      <>
        <h1 className="title is-1">Acceso</h1>

        <div className="columns is-centered mt-6">
          <div className="column is-one-third">
            <form className="box">
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className={`input ${state.usernameError && 'is-danger'}`} type="email" disabled={state.loading} ref={usernameRef} defaultValue="rogelio_133@outlook.com"  />
                </div>
                { state.usernameError && <p className="help is-danger">{ state.usernameError}</p>}
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className={`input ${state.passwordError && 'is-danger'}`} type="password" disabled={state.loading} ref={passwordRef} defaultValue="123"  />
                </div>
                { state.passwordError && <p className="help is-danger">{ state.passwordError}</p>}
              </div>

              <button 
                type="button" 
                className={`button is-primary is-fullwidth ${state.loading && 'is-loading'}`}
                onClick={validateForm}
              >
                <strong>Acceder</strong>
              </button>
              <p className="mt-5">
                Si no tienes una cuenta, puedes crearla
                {' '}
                <Link to="register">Aquí</Link>
              </p>
              { state.formError && <p className="help is-danger">{ state.formError}</p>}
            </form>
            
          </div>
        </div>


      </>
    )
}

export default Login;