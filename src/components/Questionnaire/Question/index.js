import React,{useState,useEffect} from 'react';

const Question = (props) => {

  const [_options,setOptions] = useState(props.question.Options);
   
  useEffect(() => {
    // setOptions(props.question.Options);
    // console.log("ahh");
  },[]);

  const handleSelectedOption =(option) => {
    props.handleOptionSelected(option.IDOption);
    
    let options;
    options = JSON.parse(JSON.stringify(props.question.Options))

    options.forEach(_option => {
      _option.Correct = option.IDOption == _option.IDOption;
    });

    props.question.Options = options;

    
  }


    return (
      <div className="box">
        <h4 className="title is-4">
          {`${props.number}.- ${props.question.Name}`}
        </h4>
        {
         props.question.Options.map((option)=>(
           <div 
             className={`isSelectable notification p-2 mb-3 ${option.Correct ? 'is-success' : 'is-warning is-light' }`} 
             onClick={()=>handleSelectedOption(option)}
             key={option.IDOption}
           >
             <label className="is-size-5">
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