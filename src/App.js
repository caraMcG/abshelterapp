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
      <h4>Currently only displays data for dogs<br/>uses the API found <a href="https://github.com/caraMcG/CalgaryShelterAPI" target="_blank">here</a><br/><br/>
          Please note that results on first selection may take a few minutes to load. <br/>
          This is normal behaviour as this app uses a free host that reloads itself when the API is left inactive</h4>
      <div className="dropdown" onChange={handleSelection}>
        <select className="shelterSelector" defaultValue="Please select an option">
          <option value="" className='optionsbutton'>Please select an option</option>
          <option value="aarcs" className='optionsbutton'>AARCS</option>
          <option value="pawsitive" className='optionsbutton'>Pawsitive Match</option>
          <option value="calgaryhumane" className='optionsbutton'>Calgary Humane Society</option>
          <option value="dogs" className='optionsbutton'>All Shelters</option>
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
