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
  const [loadedLastSave, setLoadedLastSave] = useState(false); //true = loaded last visit 
  const endpoint = props.endpoint;

  useEffect(() => {
    
    if(!loaded){
      (async () => {
        const data = await fetch("https://abshelterapi.onrender.com/dogs", {credentials: "omit"})
          .then(res => res.json())
            setResults(data);
            setLoaded(true);
            console.log("Data loaded");

            // update pins based on last save
            const exists = checkLastVisit(data);

            //Check selected filter & map results
            if(endpoint === 'dogs'){
              const toSet = exists.length > 0 
                            ? data.filter((profile) => !pinned.includes(profile) && !exists.includes(profile))
                            : data.filter((profile) => !pinned.includes(profile));

              setFiltered(toSet);
            }
            else{
              const toSet = exists.length > 0 
                            ? data.filter((profile) => profile.shelterName.includes(endpoint) && !pinned.includes(profile) && !exists.includes(profile))
                            : data.filter((profile) => profile.shelterName.includes(endpoint) && !pinned.includes(profile));

              setFiltered(toSet);
            }
      })()       
    }
    else{
      if(endpoint === 'dogs'){
        setFiltered(results.filter((profile) => !pinned.includes(profile))); 
      }
      else{
        setFiltered(results.filter((profile) => profile.shelterName.includes(endpoint) && !pinned.includes(profile)));
      }     
    }
  }, [props.endpoint]);


  function checkLastVisit(check){
    let newData = [];
    if(props.prevSave.length !== 0 && !loadedLastSave){
      console.log("checking last visit");
      const prevSave = props.prevSave;

      //find if saved dog profiles still exist in results
      const matching  = check.map((i1) => ({
          dogName: i1.dogName,
          dogURL: i1.dogURL,
          dogPic: i1.dogPic,
          shelterName: i1.shelterName,
          match: prevSave.some((i2) => i2.dogURL === i1.dogURL),
      }))

      //filter out dog profiles that don't exist
      const exists = matching.filter((i) => i.match !== false);
      
      //remove match property from existing profiles
      for(let i=0; i < exists.length;i++){
        delete exists[i].match;

        //find location of each dog profile in the new data 
        const prevToFind = exists[i].dogURL;
        const prevLocation = check.findIndex( profile => profile.dogURL === prevToFind);

        //load item into new variable
        newData.push(check[prevLocation]);
      }

      //add existing dog profiles to pinned 
      setPinned(newData);
      
      //confirm loaded last save is complete
      setLoadedLastSave(true);
    }
    return newData; 
  }

 //Add selected dog card to "pinned" and update filtered results for display 
  const handleAddClick = i =>{

      const newFiltered  = filtered[i.index];
      setPinned([...pinned,newFiltered]);

      //remove from main results 
      setFiltered(filtered.filter((profile) => !profile.dogURL.includes(newFiltered.dogURL))); 

      //add to localStorage for next return 
      localStorage.setItem('savedDogs', JSON.stringify([...pinned,newFiltered]));
  };


//Remove selected dog card from "pinned" and update filtered results for display 
  const handleDeleteClick = i =>{

    //get original filtered results to find original position of profile
    let endpointFilter =  [];

    if(endpoint === 'dogs'){
      endpointFilter = (results);
    }
    else{
      endpointFilter = (results.filter((profile) => profile.shelterName.includes(endpoint)));
    }

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

    //remove from localstorage
    localStorage.setItem('savedDogs', JSON.stringify(newUpdatedPins));

    if(JSON.parse(localStorage.getItem('savedDogs')).length === 0){
      localStorage.removeItem('savedDogs');
    }
  };



  return (
  <>        
    <div className="dogPinned">
      { Object.keys(pinned).length !== 0  ?  < Pins setPinned={handleDeleteClick} pinned={pinned}/>
        : null
      }
    </div>


    {!loaded && Object.keys(results).length === 0 ? <div className='loadingAnim'>
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
                <h3 className='resultsText'>{filtered.length} Results</h3><br/><br/>
    
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