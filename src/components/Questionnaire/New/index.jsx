import React,{useState,useRef} from 'react'
import {navigate } from '@reach/router';
import {ListOfQuestions} from '../ListOfQuestions/index'

const NewQuestionary = () => {
  
  const questionaryRef = useRef('');
  const questionRef = useRef('');
  const optionRef = useRef('');

  const [state,setState] = useState({
    options : [],
    questions : [],


    errorQuestionary : false,
    errorQuestion : false,
    errorOptions: false,
    
    modalActive : false,
    modalIsSaving : false,

    
    
  });

  const addOption = () => {

    if(!optionRef.current.value){
      // jeje
    }
    else {
      const max = state.options.length== 0 ? null : state.options.reduce((prev, current) => (prev.id > current.id) ? prev : current);
      const id = max == null ? 1 : (max.id+1);
  
  
      const options = [...state.options,{
        id,
        name : optionRef.current.value,
        correct :false 
      }];
  
      setState({
        ...state,
        options,
        errorOptions : false
      });

      optionRef.current.value = '';
    }

   
    
    
  }

  const addQuestion = () => {
    let _OptionsOK =  '';
    let _QuestionOK =  true;

    if(state.options.length<3){
      _OptionsOK = 'Debe de especificar 3 opciones';
    }
    else if(state.options.filter(o=> o.correct).length==0){
      _OptionsOK = 'Debe de especificar la opción correcta';
    }

    if(!questionRef.current.value){
      _QuestionOK = false;
    }
    
     
    setState({...state,
      errorOptions : _OptionsOK,
      errorQuestion : !_QuestionOK
    });
    

    if(_QuestionOK && !_OptionsOK) {


      const max = state.questions.length== 0 ? null : state.questions.reduce((prev, current) => (prev.id > current.id) ? prev : current);
      const id = max == null ? 1 : (max.id+1);

      const questions = [...state.questions,{
        id,
        name : questionRef.current.value,
        options : state.options 
      }];

      setState({...state,
        questions ,
        options:[]
      });

      questionRef.current.value = '';

    }
    

  }

  const closeModal = () =>{
    setState({...state, modalActive : false})
  }

  const getOptionLetter = (index) =>{
    if(index==0)
      return 'A';
    if(index==1)
      return 'B';
    return 'C';
  }

  const handleKeyDownOption = (e) => {
    
    if (e.key === 'Enter') {
      addOption();
    }
  }

  const confirmQuestionary = () =>{
    let _QuestionaryOK =  true;
    let _QuestionOK = '';

    if(!questionaryRef.current.value){
      _QuestionaryOK = false;
    }
    if(state.questions.length < 1) {
      _QuestionOK = 'Debe de agregar por lo menos 3 preguntas';
    }
   
    setState({...state,
      errorQuestionary : !_QuestionaryOK,
      errorOptions : _QuestionOK,
      modalActive : _QuestionaryOK && !_QuestionOK
    });

  }
 
  const setCorrectOption = (option) =>{
    const {options} = state;

    options.forEach(o => {
      o.correct = o.id == option.id;
    });

    setState({
      ...state,
      options,
      errorOptions : false
    });

  }

  const removeOption = (event,id)=>{
    
    event.stopPropagation();
    const options = state.options.filter(option=> option.id != id);
    setState({
      ...state,
      options,
      errorOptions : false
    });
  }

  const removeQuestion = (id)=>{
    
    const questions = state.questions.filter(question=> question.id != id);
    setState({
      ...state,
      questions
    });
  }

  const saveQuestionary = () =>{
    setState({...state, modalIsSaving: true});  

    setTimeout(() => {
      const id= 133;
      navigate(`/user/questionnaires/${id}`);

    }, 2000);
    
  }

  return (
  
    <>


      <h1 className="title">Nuevo cuestionario</h1>
      <div className="box">
        <div className="field is-grouped">
          <div className="control is-expanded">
            <input type="text" className={`input ${state.errorQuestionary && "is-danger"}`} ref={questionaryRef} placeholder="Nombre del cuestionario"  />
            {
                  state.errorQuestionary &&
                  <p className="help is-danger">Requerido</p>
            }
          </div>
          <p className="control">
            <a 
              className="button is-success"
              onClick={confirmQuestionary}
            >
              Guardar
            </a>
          </p>
        </div>

        <article className={`message ${state.errorOptions && "is-danger"}`}>
          <div className="message-header">
            <p>Agregar pregunta</p>
            
          </div>
          <div className="message-body">


            <div className="field is-grouped">
              <div className="control is-expanded">
                <input type="text" className={`input ${state.errorQuestion && "is-danger"}`} ref={questionRef} placeholder="Descripción de la pregunta"  />
                {
                  state.errorQuestion &&
                  <p className="help is-danger">Requerido</p>
                }
              </div>
              <p className="control">
                <a 
                  className="button is-info"
                  onClick={addQuestion}
                >
                  Agregar
                </a>
              </p>
            </div>





            <div className="box">

              <div className="field is-grouped">
                <p className="control is-expanded">
                  <input type="text" className="input " ref={optionRef} onKeyDown={handleKeyDownOption} placeholder="Descripción de la opción" />
                </p>
                <p className="control">
                  <a 
                    className="button is-info"
                    onClick={addOption} 
                    disabled={state.options.length ==3}
                  >
                    Agregar
                  </a>
                </p>
              </div>


              {
                state.options.map((option,index)=>(
                  <article className={`message ${option.correct ? "is-success" : "is-info" }`} key={option.id} onClick={()=>setCorrectOption(option)}>
                    <div className="message-header">
                      <p>
                        {`${getOptionLetter(index)} ) ${option.name}`}
                      </p> 
                      <button type="button" className="delete" aria-label="delete" onClick={(e)=> removeOption(e,option.id)} />
                    </div>
                  </article>
                  
                ))
              }

            </div>
            
          </div>
          {
            state.errorOptions &&
            <p className="help is-danger">{state.errorOptions}</p>
          }
          
        </article>
        
        <ListOfQuestions 
          questions={state.questions}
          handlerRemoveQuestion={removeQuestion}
        />

        <div className={`modal  ${state.modalActive && "is-active"}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Guardar cuestionario</p>
              <button type="button" className="delete" aria-label="close" onClick={closeModal} disabled={state.modalIsSaving} />
            </header>
            <section className="modal-card-body">
              ¿Desea guardar este cuestionario?
              <br />
             
              Si continua no podrá modificar las preguntas registradas
            </section>
            <footer className="modal-card-foot">
              <button type="button" onClick={saveQuestionary} className={`button is-success ${state.modalIsSaving && "is-loading"}`}>Aceptar</button>
              <button type="button" className="button" onClick={closeModal} disabled={state.modalIsSaving}>Cancelar</button>
            </footer>
          </div>
        </div>
      </div>
     

       
    </>

   
    
  )}

  export default NewQuestionary;

 
