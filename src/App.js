import * as React from 'react';
import './App.css';
import { Results } from './components'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as AdoptedPic } from './assets/adopted-dog.svg';
// import adoptedPic from './assets/adopted-dog.svg';


function App() {

  const [selection, setSelection] = useState(''); 
  const [local, setLocal] = useState(false);
  const [localSave, setLocalSave] = useState([]);
  // const imgNotFound = "assets/adopted-dog.svg";
  const [imgNotFoundFlags, setImgNotFoundFlags] = useState(Array(localSave.length).fill(false)); 
 

  useEffect(() => {

    if(localStorage.getItem('savedDogs')){
      console.log("you have saves!");
      setLocal(true);

      const saved = JSON.parse(localStorage.getItem('savedDogs'));
      setLocalSave(saved);
    }

  }, []);

  function handleSelection(event){
      setSelection(event.target.value)
    }
  
  function handleLocal(i){
    if(i === 1){
      console.log("you want to keep last saves");    
      setLocalSave(localSave);
      setLocal(false); //resetting since we completed this prompt
    }
    else{ //(i ==  0)
      console.log("clearing local storage");
      localStorage.clear();
      setLocalSave([]);
      setLocal(false);
    }
  }

  return (
    <div className="App">
       { local && localSave.length !== 0 ? <div className='app_returned'>
                      <h1>Welcome Back!</h1>
                      <h4>Would you like to keep the dogs saved from your previous visit? <br/>(any adopted dogs will be removed)</h4>
                      <button onClick={()=> { handleLocal(1)}}>Yes</button>
                      <button onClick={()=> { handleLocal(0)}}>No</button>
                      
                      <div className='app_returned_container'> 
                        {localSave.map((item,index) => (
                          <div key={index} className="dogItem">
                            <div className='dogItem_topContainer'>
                              <div className='dogItem_pin'>
                                <div className="dogInfo">
                                    <span>{item.dogName}</span><br/>
                                    {imgNotFoundFlags[index] ? <br/>                                  
                                    :  <a href={item.dogURL} 
                                      target='_blank' 
                                      rel='noreferrer'>More Info</a>}
                                </div>
                              </div>
                            </div>
      
                            <div className="dogImageContainer">
                              {imgNotFoundFlags[index] ? <svg alt={item.dogName + ' has been adopted'}>< AdoptedPic/></svg>
                              :
                               <img src={item.dogPic} 
                                  className="dogImage" 
                                  alt={'Picture of ' + item.dogName} 
                                  draggable="false" 
                                  onError={()=> {
                                    const newFlags = [...imgNotFoundFlags];
                                    newFlags[index] = true;
                                    setImgNotFoundFlags(newFlags)}
                                  }/>
                              }

                                {/* <img src={imgNotFoundFlags[index] ? adoptedPic : item.dogPic} 
                                  className="dogImage" 
                                  alt={'Picture of ' + item.dogName} 
                                  draggable="false" 
                                  onError={()=> {
                                    const newFlags = [...imgNotFoundFlags];
                                    newFlags[index] = true;
                                    setImgNotFoundFlags(newFlags)}
                                  }/> */}

                                <br/>
                                </div>
                          </div>
                        
                        ))}
                      </div>
                  </div>
                
        :  null}

      { !local ? <div className='app_main'>
          <h1>Alberta Shelter App! <FontAwesomeIcon size="2xs" id="appPaw" icon={faPaw} /></h1><br/>
          <h3 id="descText">A simple app to help anyone go through all of the amazing dogs looking for their forever homes in Alberta.<br/>
            If you like a  dog or are interested to learn more, click that little heart on their card. This app will save them at the top of the page for you to come back to!
          </h3><br/><br/>
          <h4>Please note that results on first selection may take a few minutes to load. <br/> If you're interested in this project feel free to checkout the github <a href="https://github.com/caraMcG/CalgaryShelterAPI" target="_blank">here</a>.
          </h4>

     
        <div className="dropdown" onChange={handleSelection}>
          <select className="shelterSelector" defaultValue="Please select an option">
            <option value="" className='optionsbutton'>Please select an option</option>
            <option value="aarcs" className='optionsbutton'>AARCS</option>
            <option value="pawsitive" className='optionsbutton'>Pawsitive Match</option>
            <option value="calgaryhumane" className='optionsbutton'>Calgary Humane Society</option>
            <option value="dogs" className='optionsbutton'>All Shelters</option>
          </select>
        </div>  
        </div>
      : null }
    
      { selection !== '' ?
                < Results endpoint = {selection} prevSave = {localSave} />
            : null}
    </div>
  );
}

export default App;
