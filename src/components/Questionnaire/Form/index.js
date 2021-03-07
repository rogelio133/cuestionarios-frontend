import React, { Fragment  ,useState, useRef} from 'react';
import { Link  } from '@reach/router';
import useAPI from '../../../hooks/useAPI';
import Question from '../Question/index';



const Form = () => {

    const _stepValidatingCode = 1;
    const _stepGettingUserData=2;
    const _stepAnswering = 3;
    const _stepAnswersSaved = 4;
    const _stepErrorSaving = 5;

    
    const {wsValidateCode,wsSaveQuestionnaireAnswer} = useAPI();

    const [state,setState] = useState({
        questionnaire : null,
        answers: [],
        
        searchingCode : false,
        saving : false,
        optionSelected : false,
        lastQuestion : false,
        selectedOptionID : null,
        questionIndex:0,
        name : '',
        
        errorCode : false,
        errorName : false,
        
        step: _stepValidatingCode
    });

    const [currentQuestion,setCurrentQuestion] = useState({});

    const coderef = useRef('');
    const nameRef = useRef('');
  
    const handleGettingUserData = () =>{
        
        setCurrentQuestion(state.questionnaire.Questions[state.questionIndex]);
        
        setState({
            ...state, 
            searchingCode : false,
            errorName : !nameRef.current.value,
            name : nameRef.current.value,
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

    const handleSendAnswers = async() => {
      const  answer = {IDQuestion : currentQuestion.ID, IDOptionSelected: state.selectedOptionID}; 

       const allAnswers = [...state.answers,answer];

       
      const questionnaireAnswer = {
        Name : state.name,
        Answers : allAnswers
      };

      setState({ ...state, 
        questionIndex : state.questionIndex+1,
        saving : true
      });
      const saved = await wsSaveQuestionnaireAnswer(questionnaireAnswer);
        
      setState({
          ...state, 
          saving : false,
          step :  saved ? _stepAnswersSaved : _stepErrorSaving,
      });

    }

    const handleSetNextQuestion = () => {
     
        setCurrentQuestion(state.questionnaire.Questions[state.questionIndex+1]);

        const  answer = {IDQuestion : currentQuestion.ID, IDOptionSelected: state.selectedOptionID}; 
        
        const lastQuestion = (state.questionIndex+1) == state.questionnaire.Questions.length-1;
        
        
        setState({...state,
            questionIndex : state.questionIndex+1,
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
        <>
          <h2 className="title is-2">
            {state.questionnaire.Name}
          </h2>

          <label>{`${state.questionIndex+1 == state.questionnaire.Questions.length  ? state.questionnaire.Questions.length : state.questionIndex+1 } / ${state.questionnaire.Questions.length}`}</label>
          <progress className="progress is-link" value={state.questionIndex+1} max={state.questionnaire.Questions.length} />

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
              className={`button is-success is-large ${state.saving && 'is-loading'}`} 
              disabled={!state.optionSelected}
              onClick={handleSendAnswers}
            >
              Enviar
            </button>
            )
          }
        </>
      )
    }
    {
       state.step == _stepAnswersSaved &&
       <div>se guardó todo</div>
    }
    {
       state.step == _stepErrorSaving &&
       <div>error al guardar</div>
    }  
  </>
    )
  }
export default Form;