import React,{useState,useEffect} from 'react';

const Question = (props) => {

  const [_options,setOptions] = useState(props.question.Options);
   
  useEffect(() => {
    // setOptions(props.question.Options);
    // console.log("ahh");
  },[]);

  const handleSelectedOption =(option) => {
    props.handleOptionSelected(option.ID);
    
    let options;
    options = JSON.parse(JSON.stringify(props.question.Options))

    options.forEach(_option => {
      _option.Correct = option.ID == _option.ID;
    });

    props.question.Options = options;

    
  }


    return (
      <div className="box">
        <h3 className="title is-3">
          {props.question.Name}

        </h3>
        {
         props.question.Options.map((option)=>(
           <div 
             className={`notification p-3 ${option.Correct ? 'is-success' : 'is-warning is-light' }`} 
             onClick={()=>handleSelectedOption(option)}
             key={option.ID}
           >
             <label className="is-size-4">
               <b className="mr-2">A)</b>
               {option.Name}
             </label>
           </div>
          ))
        }
         
      </div>
    )
}

export default Question;