import {useContext} from 'react';
import {Context} from '../Context';
import  sessionInfo  from '../sessionInfo'; 
import {fetchData} from '../utils';

const useAPI = () =>{

    const { urlWs,setWsError,setInvalidToken } = useContext(Context);


    const wsGetQuestionnaire = async (id) => {
        let info = null;
        try {
            id = parseInt(id);
            const parameters = { id};
            const respuesta = await callMethod('GetQuestionnaire', parameters);
            const { d: { Success, Message,Data,TokenOK } } = respuesta;
      
            if (!Success) {
                throw new Error(Message);
            }
            else if(!TokenOK) {
              setInvalidToken(true);
            }
            else {
                info=  Data;
            }
            
        } catch (error) {
      
          setWsError(true);
          console.error(error);
        }

        return info;
    }

    const wsGetQuestionnaireByToken = async (token) => {
        let info = null;
        try {
            const parameters = { token};
            const respuesta = await callMethod('GetQuestionnaireByToken', parameters);
            const { d: { Success, Message,Data } } = respuesta;
      
            if (!Success) {
                throw new Error(Message);
            }
             
            else {
                info=  Data;
            }
            
        } catch (error) {
          console.error(error);
        }

        return info;
    }

    const wsGetQuestionnaires = async () => {
        let info = null;
        try {
             
            const parameters = { };
            const respuesta = await callMethod('GetQuestionnaires', parameters);
            const { d: { Success, Message,Data,TokenOK } } = respuesta;
      
            if (!Success) {
                throw new Error(Message);
            }
            else if(!TokenOK) {
              setInvalidToken(true);
            }
            else {
                info=  Data;
            }
            
        } catch (error) {
      
          setWsError(true);
          console.error(error);
        }

        return info;
    }

    const wsSaveQuestionnaire = async (questionnaire) => {
        let info = null;
        try {
      
            const parameters = {questionnaire};
            const respuesta = await callMethod('SaveQuestionnaire', parameters);
            const { d: { Success, Message,Data,TokenOK } } = respuesta;
      
            if (!Success) {
                throw new Error(Message);
            }
            else if(!TokenOK) {
              setInvalidToken(true);
            }
            else {
                info=  Data;
            }
            
        } catch (error) {
      
          setWsError(true);
          console.error(error);
        }

        return info;
    }

    const wsValidateCode = async (code) => {
        let info = null;
        try {
            const parameters = { code};
            const respuesta = await callMethod('ValidateCode', parameters,true);
            const { d: { Success, Message,Data } } = respuesta;
      
            if (!Success) {
                throw new Error(Message);
            }
            else {
                info=  Data;
            }
            
        } catch (error) {
          console.error(error);
        }

        return info;
    }


    const callMethod = async( method, parameters, isPublic) =>{
        if(!isPublic) {
            const { token } = sessionInfo();
            parameters = {...parameters,token };    
        }
        const respuesta = await fetchData(`${urlWs}${method}`, parameters);
        return respuesta;
    }

    return {
        wsSaveQuestionnaire,
        wsGetQuestionnaire,
        wsGetQuestionnaireByToken,
        wsGetQuestionnaires,
        wsValidateCode
    };

}

export default useAPI;