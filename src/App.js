import * as React from 'react';
import './App.css';
import { Results } from './components'
import { useState } from 'react';


function App() {

  const [selection, setSelection] = useState(''); 
 
  function handleSelection(event){
        setSelection(event.target.value)
    }


  return (
    <div className="App">
      <h1>Alberta Shelter App!</h1><br/>
      <h6>Currently only displays data for dogs<br/>uses the API found <a href="https://github.com/caraMcG/CalgaryShelterAPI" target="_blank">here</a><br/><br/>
          Please note that results on first selection may take a few minutes to load. <br/>
          This is normal behaviour as this app uses a free host that reloads itself when the API is left inactive</h6>
      <div className="dropdown" onChange={handleSelection}>
        <select id="shelterSelector">
          <option value="">Please select an option</option>
          <option value="aarcs">AARCS</option>
          <option value="pawsitive">Pawsitive Match</option>
          <option value="calgaryhumane">Calgary Humane Society</option>
          <option value="dogs">All of the Above</option>
        </select>
      </div>
      {/* <h6>{'Results returned: '}</h6> */}
      
      { selection != '' ?
                < Results endpoint = {selection}/>
            : null}

     
    </div>
  );
}

export default App;
