import React,{useContext,useEffect} from 'react';
import { Redirect, Router } from '@reach/router';
import { Context } from '../Context';

import Layout from '../containers/Layout';

import Home from '../components/Home/index';
import Login from '../components/Login/index';

import UserHome from '../components/User/Home/index';
import NewQuestionary from '../components/Questionnaire/New/index';
import QuestionnaireDetail from '../components/Questionnaire/Detail/index';


const App = ({urlWS}) =>{
   const { isAuth, setUrlWs  } = useContext(Context);
   
   useEffect(() => {
    setUrlWs(urlWS);
  });
   
  
   return  (
     <Layout>
       <Router>
         <Home path="/" />
      
      
         {!isAuth && <Login path="/login"  /> }
         {!isAuth && <Redirect from='/user/questionnaires/new' to='/login' noThrow />}
         {!isAuth && <Redirect from='/user' to='/login' noThrow />}
         {isAuth &&  <Redirect from='/login' to='/user' noThrow />}      
      
         
         <UserHome path="/user"   />
         <NewQuestionary path="/user/questionnaires/new" />
         <QuestionnaireDetail path="/user/questionnaires/detail/:detailId" />
         
       </Router>
     </Layout>
)
   
  
  }
export default App;

