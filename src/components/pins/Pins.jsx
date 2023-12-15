import React from 'react'
import './pins.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";


const Pins = (props) => {

    function handlePinClick(i){
        console.log("clicked again");
    }


  return (
    <div className="pinResults">
        {console.log(props.save.length)}
        <h3>My Pinned Dogs</h3>
        {props.save.map((item, index) => (
            <div key={index} className="pinItem">
                
                <div className='pinItem_topContainer'>
                <div className='pinItem_pin'>
                    <FontAwesomeIcon icon={faThumbtack} size="xl" name={index} onClick={()=> { handlePinClick({index})}}/> 
                </div>
                <div className="pinImageContainer">
                    <img src={item.dogPic} className="pinImage"/><br/>
                    </div>
                </div> 
                <div className="pinInfo">
                    <span>{item.dogName}</span><br/>
                    <a href={item.dogURL} alt={'Picture of ' + item.dogName}>More Info</a>
                    </div>
            </div>
        ))}
  </div>
  )
}

export default Pins