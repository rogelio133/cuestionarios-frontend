import React, { useContext } from 'react'
import { Redirect, Router } from '@reach/router'
import { Context } from '../Context'

import { Layout } from '../containers/Layout'

import { Form } from '../components/Questionnaire/Form'
import { Home } from '../components/Home/index'
import { Login } from '../components/Login/index'
import { Register } from '../components/Register/index'

import { UserHome } from '../components/User/Home/index'
import { ListOfQuestionnaires } from '../components/Questionnaire/ListOfQuestionnaires'
import { NewQuestionary } from '../components/Questionnaire/New/index'
import { QuestionnaireDetail } from '../components/Questionnaire/Detail/index'

export const App = () => {
  const { isAuth, wsError, invalidToken } = useContext(Context)

  return (
    <Layout
      wsError={wsError}
      invalidToken={invalidToken}
    >
      <Router className='elContenedor'>
        <Home path='/' />
        <Form path='/questionnaire' isAuth={isAuth} />

        {!isAuth && <Login path='/login' />}
        {!isAuth && <Register path='/register' />}
        {!isAuth && <Redirect from='/user/questionnaires/new' to='/login' noThrow />}
        {!isAuth && <Redirect from='/user/questionnaires/' to='/login' noThrow />}
        {!isAuth && <Redirect from='/user' to='/login' noThrow />}
        {isAuth && <Redirect from='/login' to='/user' noThrow />}
        {isAuth && <Redirect from='/register' to='/user' noThrow />}
        <UserHome path='/user' />
        <ListOfQuestionnaires path='/user/questionnaires' />
        <NewQuestionary path='/user/questionnaires/new' />
        <QuestionnaireDetail path='/user/questionnaires/detail/:detailId' />
      </Router>
    </Layout>
  )
}
