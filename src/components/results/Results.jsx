import React from 'react'
import { useState, useEffect } from 'react';
import './results.css'; 
import Pins from '../pins/Pins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";


const Results = (props) => {
  const [results, setResults] = useState([]);
  const [pins, setPins] = useState([]);
  const lastItem = results.length;


  useEffect(() => {
    
    const endpoint = props.endpoint;

    (async () => {
        const data = await fetch("https://abshelterapi.onrender.com/"+ endpoint, {credentials: "omit"})
          .then(res => res.json())
          setResults(data)
    })()
  }, [props]);

 
  function handlePinClick(i){
     
        setPins([...pins, results[i.index]]);
        console.log(pins.length +1);
        console.log(Object.keys(pins).length + 1);

    }

  return (
  <>
  <div className="dogPinned">
    { Object.keys(pins).length != 0  ?  < Pins save={pins} />
      : null
    }
   
  </div>
    <h4>{lastItem} Results</h4><br/>
      <div className="dogResults">
        
        {results.map((item, index) => (
              <div key={index} className="dogItem">
                <div className='dogItem_topContainer'>
                  <div className='dogItem_pin'>
                    <FontAwesomeIcon icon={faThumbtack} size="xl" name={index} onClick={()=> { handlePinClick({index})}}/> 
                  </div>
                  <div className="dogImageContainer">
                      <img src={item.dogPic} className="dogImage"/><br/>
                    </div>
                 </div>
                    
                    <div className="dogInfo">
                      <span>{item.dogName}</span><br/>
                      <a href={item.dogURL} alt={'Picture of ' + item.dogName}>More Info</a>
                    </div>
              </div>
              
        ))}
        {/* edit [0] out  later testing */}
      </div>
    </>
  )
}

export default Results