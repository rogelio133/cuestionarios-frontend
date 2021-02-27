import React, { Fragment } from 'react';
 

const Home = () => (
  <>
    <h1 className="title is-1">Bienvenido a Cuestionarios</h1>
        
    <h4 className="title is-4">El sitio donde puedes crear cuestionarios y compartirlos con tus amigos</h4> 
    <hr />
    <div className="columns is-mobile is-centered mt-6">
      <div className="column is-one-third ">
        <div className="box ">
          <h5 className="title is-5 has-text-centered"> Cuento con un código de cuestionario</h5>
          <div className="field has-addons is-justify-content-center">
            <div className="control">
              <input className="input is-medium" type="text" placeholder="Código" />
            </div>
            <div className="control">
              <a className="button is-info is-medium">
                Acceder
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
        
  </>
    )

export default Home;