import React, { Fragment } from 'react';
import { Link  } from '@reach/router';
import  sessionInfos  from '../../../sessionInfo';



const UserHome = () => {


  const {name } = sessionInfos();

return(
  <>
    <h1 className="title is-1">{`Hola ${name}`}</h1>
    <div className="block">

      <Link className="button is-success" to="/user/questionnaires">
        <span className="icon is-small">
          <i className="fas fa-list" />
        </span>
        <span>Mis cuestionarios</span>
      </Link>

    </div>
    <div className="block">
      <Link className="button is-info" to="/user/questionnaires/new">
        <span className="icon is-small">
          <i className="fas fa-plus" />
        </span>
        <span>Crear cuestionario</span>
      </Link>
    </div>
  </>
    )
  }
export default UserHome;