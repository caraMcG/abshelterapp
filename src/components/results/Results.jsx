import React from 'react'
import { useState, useEffect } from 'react';
import './results.css'; 
import Pins from '../pins/Pins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack, faHeart } from "@fortawesome/free-solid-svg-icons";


const Results = (props) => {
  const [results, setResults] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [pins, setPins] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const lastItem = filtered.length;

  useEffect(() => {
    
    const endpoint = props.endpoint;

    if(!loaded){

      (async () => {
        const data = await fetch("https://abshelterapi.onrender.com/dogs", {credentials: "omit"})
          .then(res => res.json())
            setResults(data);
            setLoaded(true);
            console.log("Data loaded");

            if(endpoint === 'dogs'){
              setFiltered(data);
            }
            else{
              console.log("Data filtered");
              setFiltered(data.filter((profile) => profile.shelterName.includes(endpoint))); 
            }
           

      })()   
       
    }
    else{
      if(endpoint === 'dogs'){
        console.log("after loading, all above");
        setFiltered(results);
      }
      else{
        setFiltered(results.filter((profile) => profile.shelterName.includes(endpoint)));
      }
    } 
  }, [props]);
 
  function handlePinClick(i){

        console.log("setting pin again");
        setPins(filtered[i.index]);
    }


  return (
  <>
  <div className="dogPinned">
    { Object.keys(pins).length !== 0  ?  < Pins newPin={pins} />
      : null
    }
   
  </div>
    <h3 className='resultsText'>{lastItem} Results</h3><br/><br/>
      <div className="dogResults">
        {filtered.map((item, index) => (
              <div key={index} className="dogItem">
                <div className='dogItem_topContainer'>
                  <div className='dogItem_pin'>
                    <FontAwesomeIcon icon={faHeart} size="xl" name={index} onClick={()=> { handlePinClick({index})}}/> 
                  </div>
                  <div className="dogImageContainer">
                      <img src={item.dogPic} className="dogImage" alt={'Picture of ' + item.dogName}/><br/>
                    </div>
                 </div>
                    
                    <div className="dogInfo">
                      <span>{item.dogName}</span><br/>
                      <a href={item.dogURL} target='_blank' rel='noreferrer'>More Info</a>
                    </div>
              </div>
              
        ))}
      
      </div>
    </>
  )
}

export default Results