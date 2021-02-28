import {fetchData} from './utils';
import  sessionInfo  from './sessionInfo';

export const wsSaveQuestionnaire = async (  questionnaire,urlWs) => {
    
    const parameters = { token , questionnaire };
    const respuesta = await callMethod('SaveQuestionnaire', parameters,urlWs);
    return respuesta;
}

const callMethod = async( method, parameters,urlWs) =>{

    const {token } = sessionInfo();

    parameters = {...parameters,token };
    const respuesta = await fetchData(`${urlWs}${method}`, parameters);
    return respuesta;
}