import React,{Fragment, useContext, useRef} from 'react'
import { Link  } from '@reach/router';
import {Context} from '../../Context';
 
import 'bulma/css/bulma.css';
import './styles.css';

const Layout = ({children}) =>{

  const menuRef = useRef(null);
  const hamburguerMenuRef = useRef(null);
  const { isAuth, removeAuth } = useContext(Context);

  const handleMenuClick = () => {
    if(menuRef.current.classList.contains('is-active')){
      menuRef.current.classList.remove('is-active');
      hamburguerMenuRef.current.classList.remove('is-active');
    }
    else {
      menuRef.current.classList.add('is-active');
      hamburguerMenuRef.current.classList.add('is-active');
    }
      
  }

  return (
    <div className="contenedor">
    
      <nav className="navbar" role="navigation" aria-label="main navigation">

        <div className="navbar-brand">
        
          <Link className="navbar-item" to="/">
            Cuestionarios
          </Link>
        

          <a ref={hamburguerMenuRef} onClick={handleMenuClick} role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div ref={menuRef} className="navbar-menu">
          <div className="navbar-end">
            {
              isAuth && (
              <Link className="navbar-item" to="/user">
                Mi cuenta
              </Link>
            )
            }
            
            <div className="navbar-item">
              <div className="buttons">
              
                {
                  !isAuth ? (
                    <>
                      <Link className="button is-primary" to="/register">
                        <strong>Registro</strong>
                      </Link>
                      <Link className="button is-light" to="/login">
                        Acceder
                      </Link>
                    </>
                  )
                    : (
                      <div 
                        className="button is-primary"
                        onClick={()=> removeAuth()}
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

      <main className="p-5 has-background-info-light">
        {children}
      </main>
    
      <footer className="p-5 has-background-info-dark is-justify-content-flex-end">
        <div className="content has-text-centered">
          <p className="has-text-white">
            Made with 
            {' '}
            <label className="has-text-danger">&#10084;</label>
            {' '}
            by @rogeliope
          </p>
        </div>
      </footer>
    </div>
    )

  }
export default Layout
