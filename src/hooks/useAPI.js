import {useContext} from 'react';
import {Context} from '../Context';
import  sessionInfo  from '../sessionInfo'; 
import {fetchData} from '../utils';

const useAPI = () =>{

    const { urlWs,setWsError,setInvalidToken } = useContext(Context);

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


    const callMethod = async( method, parameters) =>{
        const { token } = sessionInfo();
        parameters = {...parameters,token };
        const respuesta = await fetchData(`${urlWs}${method}`, parameters);
        return respuesta;
    }

    return {
        wsSaveQuestionnaire
    };

}

export default useAPI;