import React, { Fragment } from 'react';
import { Link  } from '@reach/router';
import  sessionInfos  from '../../../sessionInfo';



const UserHome = () => {


  const {name } = sessionInfos();

return(
  <>
    <h1 className="title is-1">{`Hola ${name}`}</h1>
    <div className="block">
      <button className="button is-success">
        <span className="icon is-small">
          <i className="fas fa-list" />
        </span>
        <span>Mis cuestionarios</span>
      </button>
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