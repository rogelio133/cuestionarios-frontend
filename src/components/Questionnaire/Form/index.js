import React, { Fragment  ,useState, useRef} from 'react';
import { Link  } from '@reach/router';
import useAPI from '../../../hooks/useAPI';
import Question from '../Question/index';


const Form = () => {

    const _stepValidatingCode = 1;
    const _stepGettingUserData=2;
    const _stepAnswering = 3;

    let questionIndex = 0;

    const {wsValidateCode} = useAPI();

    const [state,setState] = useState({
        questionnaire : null,
        answers: [],
        
        searchingCode : false,
        optionSelected : false,
        lastQuestion : false,
        selectedOptionID : null,
        
        errorCode : false,
        errorName : false,
        
        step: _stepValidatingCode
    });

    const [currentQuestion,setCurrentQuestion] = useState({});

    const coderef = useRef('');
    const nameRef = useRef('');
  
    const handleGettingUserData = () =>{
        
        setCurrentQuestion(state.questionnaire.Questions[questionIndex]);
        
        setState({
            ...state, 
            searchingCode : false,
            errorName : !nameRef.current.value,
            step :  nameRef.current.value ? _stepAnswering : _stepGettingUserData,
        });
        
    }

    const handleSearchCode =async () => {
      if(coderef.current.value.length>=5){
        
        setState({...state, searchingCode : true });

        const questionnaire = await wsValidateCode(coderef.current.value);
        
        setState({
            ...state, 
            questionnaire ,
            searchingCode : false,
            errorCode : !questionnaire,
            step :  questionnaire ? _stepGettingUserData : _stepValidatingCode,
        });
        
      }
      
    }

    const handleOptionSelected = (optionID) => {

        setState({...state,
            optionSelected: true,
            selectedOptionID : optionID
        });
    }

    const handleSendAnswers = () => {
      const  answer = {ID : currentQuestion.ID, SelectedOption: state.selectedOptionID}; 

       const allAnswers = [...state.answers,answer];

      console.log(allAnswers);

    }

    const handleSetNextQuestion = () => {
        questionIndex++;
        setCurrentQuestion(state.questionnaire.Questions[questionIndex]);

        const  answer = {ID : currentQuestion.ID, SelectedOption: state.selectedOptionID}; 
        
        const lastQuestion = (questionIndex + 1) == state.questionnaire.Questions.length;
        
        setState({...state,
            optionSelected: false,
            answers : [...state.answers,answer],
            lastQuestion
        });
    }

return(
  <>
    {
        state.step == _stepValidatingCode && (
        <div className="columns is-mobile is-centered mt-6">
          <div className="column is-one-third ">
            <div className="box ">
              <h5 className="title is-5 has-text-centered"> Tengo un código de cuestionario</h5>
              <div className="field has-addons is-justify-content-center">
                <div className="control">
                  <input 
                    className="input is-large has-text-centered" 
                    type="text" 
                    placeholder="Código" 
                    ref={coderef} 
                    disabled={state.searchingCode}
                    maxLength={6}
                    defaultValue="111111"
                  />
                </div>
                <div className="control">
                  <button 
                    type="button"  
                    className={`button is-info is-large ${state.searchingCode && 'is-loading'}`} 
                    onClick={handleSearchCode}
                  >
                    Acceder
                  </button>
                </div>
            
              </div>
              { state.errorCode && <p className="help is-danger">El código es incorrecto, favor de validar</p>}
            </div>
          </div>
        </div>
      )
    }
    {
        state.step == _stepGettingUserData && (
        <>
          <h1 className="title is-1">Cuestionario</h1>
          <h2 className="title is-2">
            {state.questionnaire.Name}
          </h2>


          <div className="field">
            <label className="label">¿Cual es tu nombre?</label>
            <div className="control">
              <input className={`input is-large ${state.errorName && 'is-danger'}`} type="text" ref={nameRef} maxLength={100} defaultValue="Rogelio Guillermo Pacheco Elorza" />
            </div>
            { state.errorName && <p className="help is-danger">Requerido</p>}
          </div>
          <div className="columns is-mobile is-centered mt-6">
            <button 
              type="button"  
              className={`button is-success is-large ${state.searchingCode && 'is-loading'}`} 
              onClick={handleGettingUserData}
            >
              Comenzar
            </button>
          </div>
        </>
      )
    }
    {
        state.step == _stepAnswering && (
        <div>
          <h2 className="title is-2">
            {state.questionnaire.Name}
          </h2>

          <Question 
            handleOptionSelected={handleOptionSelected}
            question={currentQuestion}
          />
          {
            !state.lastQuestion && (
            <button 
              type="button"  
              className="button is-info is-large"
              disabled={!state.optionSelected}
              onClick={handleSetNextQuestion}
            >
              Siguiente
            </button>
            )
          }
          {
            state.lastQuestion && (
            <button 
              type="button"  
              className="button is-info is-large"
              disabled={!state.optionSelected}
              onClick={handleSendAnswers}
            >
              Enviar
            </button>
            )
          }
        </div>
      )
    } 
  </>
    )
  }
export default Form;