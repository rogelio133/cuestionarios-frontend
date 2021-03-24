import { useContext } from 'react'
import { Context } from '../Context'
import { sessionInfo } from '../sessionInfo'
import { fetchData } from '../utils'

export const useAPI = () => {
  const { urlWs, setWsError, setInvalidToken } = useContext(Context)

  const wsCreateAccount = async (name, username, password) => {
    let info = null
    try {
      const parameters = { name, username, password }
      const response = await callMethod('CreateAccount', parameters, true)
      info = response
    } catch (error) {
      console.error(error)
    }

    return info
  }

  const wsGetDetailAnswer = async (IDExam) => {
    let info = null
    try {
      const parameters = { IDExam }
      const respuesta = await callMethod('GetDetailAnswer', parameters)
      const { d: { Success, Message, Data, TokenOK } } = respuesta

      if (!Success) {
        throw new Error(Message)
      } else if (!TokenOK) {
        setInvalidToken(true)
      } else {
        info = Data
      }
    } catch (error) {
      setWsError(true)
      console.error(error)
    }

    return info
  }

  const wsGetQuestionnaire = async (code) => {
    let info = {}
    try {
      const parameters = { code }
      const respuesta = await callMethod('GetQuestionnaire', parameters)
      const { d: { Success, Message, Data, TokenOK } } = respuesta

      if (!Success) {
        throw new Error(Message)
      } else if (!TokenOK) {
        setInvalidToken(true)
      } else {
        info = Data
      }
    } catch (error) {
      setWsError(error.message)
      console.error(error)
    }

    return info
  }

  const wsGetQuestionnaireByToken = async (token) => {
    let info = null
    try {
      const parameters = { token }
      const respuesta = await callMethod('GetQuestionnaireByToken', parameters)
      const { d: { Success, Message, Data } } = respuesta

      if (!Success) {
        throw new Error(Message)
      } else {
        info = Data
      }
    } catch (error) {
      console.error(error)
    }

    return info
  }

  const wsGetQuestionnaires = async () => {
    let info = null
    try {
      const parameters = { }
      const respuesta = await callMethod('GetQuestionnaires', parameters)
      const { d: { Success, Message, Data, TokenOK } } = respuesta

      if (!Success) {
        throw new Error(Message)
      } else if (!TokenOK) {
        setInvalidToken(true)
      } else {
        info = Data
      }
    } catch (error) {
      setWsError(true)
      console.error(error)
    }

    return info
  }

  const wsSaveQuestionnaire = async (questionnaire) => {
    let info = null
    try {
      const parameters = { questionnaire }
      const respuesta = await callMethod('SaveQuestionnaire', parameters)
      const { d: { Success, Message, Data, TokenOK } } = respuesta

      if (!Success) {
        throw new Error(Message)
      } else if (!TokenOK) {
        setInvalidToken(true)
      } else {
        info = Data
      }
    } catch (error) {
      setWsError(error.message)
      console.error(error)
    }

    return info
  }

  const wsSaveQuestionnaireAnswer = async (code, exam) => {
    let info = null
    try {
      const parameters = { code, exam }
      const respuesta = await callMethod('SaveQuestionnaireAnswer', parameters, true)
      const { d: { Success, Message, Data } } = respuesta

      if (!Success) {
        throw new Error(Message)
      } else {
        info = Data
      }
    } catch (error) {
      console.error(error)
    }

    return info
  }

  const wsValidateCode = async (code) => {
    let info = null
    try {
      const parameters = { code }
      const respuesta = await callMethod('ValidateCode', parameters, true)
      const { d: { Success, Message, Data } } = respuesta

      if (!Success) {
        throw new Error(Message)
      } else {
        info = Data
      }
    } catch (error) {
      console.error(error)
    }

    return info
  }

  const wsValidateLogin = async (user, password) => {
    let info = null
    try {
      const parameters = { user, password }
      const response = await callMethod('ValidateLogin', parameters, true)
      info = response
    } catch (error) {
      console.error(error)
    }

    return info
  }

  const callMethod = async (method, parameters, isPublic) => {
    if (!isPublic) {
      const { token } = sessionInfo()
      parameters = { ...parameters, token }
    }
    const respuesta = await fetchData(`${urlWs}${method}`, parameters)
    return respuesta
  }

  return {
    wsCreateAccount,
    wsGetDetailAnswer,
    wsGetQuestionnaire,
    wsGetQuestionnaireByToken,
    wsGetQuestionnaires,
    wsSaveQuestionnaire,
    wsSaveQuestionnaireAnswer,
    wsValidateCode,
    wsValidateLogin
  }
}
