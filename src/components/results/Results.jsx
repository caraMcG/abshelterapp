import React from 'react'
import { useState, useEffect } from 'react';
import './results.css'; 
import Pins from '../pins/Pins';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import BeatLoader from "react-spinners/BeatLoader";


const Results = (props) => {
  const [results, setResults] = useState([]); //original returned results from api 
  const [filtered, setFiltered] = useState([]); //filtered results
  const [pinned, setPinned] = useState([]);   //Saved list of dogs
  const [loaded, setLoaded] = useState(false); //loaded all  data once
  const lastItem = filtered.length;
  const endpoint = props.endpoint;

  useEffect(() => {
    
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
              console.log("Data filtered on load");
              setFiltered(data.filter((profile) => profile.shelterName.includes(endpoint))); 
            }
      })()   
       
    }
    else{
      if(endpoint === 'dogs'){

        setFiltered(results.filter((profile) => !pinned.includes(profile))); 

      }
      ///endpoint is not all shelters
      else{

        setFiltered(results.filter((profile) => profile.shelterName.includes(endpoint) && !pinned.includes(profile)));
      }
    } 
  }, [props]);


 //Add selected dog card to "pinned" and update filtered results for display 
  const handleAddClick = i =>{

      const newFiltered  = filtered[i.index];
      setPinned([...pinned,newFiltered]);

      //remove from main results 
      setFiltered(filtered.filter((profile) => !profile.dogURL.includes(newFiltered.dogURL))); 
  };


//Remove selected dog card from "pinned" and update filtered results for display 
  const handleDeleteClick = i =>{

    //get original filtered results to find original position of profile
    const endpointFilter = (results.filter((profile) => profile.shelterName.includes(endpoint)));

    //URL of the profile just removed from pins
    const urlToFind = pinned[i.index].dogURL;
    const indexToInsert = endpointFilter.findIndex( profile => profile.dogURL === urlToFind);

    //add back into the filtered array
    const newFilteredArray = [...filtered];
    newFilteredArray.splice(indexToInsert, 0, pinned[i.index])
    setFiltered(newFilteredArray);

    //remove from  pinned list
    const newUpdatedPins = pinned.filter((_,x) => x !== i.index);
    setPinned(newUpdatedPins);
  };



  return (
  <>        
  <div className="dogPinned">
    { Object.keys(pinned).length !== 0  ?  < Pins setPinned={handleDeleteClick} pinned={pinned}/>
      : null
    }
  </div>


  {!loaded ? <div className='loadingAnim'>
                    <BeatLoader
                      color= "#455d7a"
                      loading= {!loaded}
                      size={30}
                      speedMultiplier={1}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
            </div>
    : null} 

    {loaded ?  
          <div>
                <h3 className='resultsText'>{lastItem} Results</h3><br/><br/>
    
            <div className="dogResults">
              {filtered.map((item, index) => (
                    <div key={index} className="dogItem">
                      <div className='dogItem_topContainer'>
                        <div className='dogItem_pin'>
                          <div className="dogInfo">
                              <span>{item.dogName}</span><br/>
                              <a href={item.dogURL} target='_blank' rel='noreferrer'>More Info</a>
                          </div>
                          
                          <div className='pinHeart' >
                            <FontAwesomeIcon icon={faHeart} size="xl" name={index} onClick={()=> { handleAddClick({index})}}/> 
                          </div>
                        </div>
                      </div>

                      <div className="dogImageContainer">
                            <img src={item.dogPic} className="dogImage" alt={'Picture of ' + item.dogName} draggable="false"/><br/>
                      </div>
                    </div>
                
                ))}
            </div>
          </div>
    : null}
       
    </>
  )
}

export default Results