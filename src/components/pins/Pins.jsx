import React from 'react'
import { useState, useEffect } from 'react';
import './pins.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";


const Pins = (props) => {

    const [ pinnedList, setPinnedList] = useState([]);

    useEffect(() => {
        
        if(pinnedList.includes(props.newPin)){
            //do nothing/something?
        }
        else{
            setPinnedList([...pinnedList,props.newPin]);
        }
       
      }, [props]);
    

    function handlePinClick(i){
       
        // const deleteIndex = props.newPin[i.index];
        const filtered = pinnedList.filter((_,x) => x !== i.index);
        setPinnedList(filtered);
    }


    


  return (
    <div className="pinResults">
        {/* {console.log(pinnedList.length)} */}
        <h3>My Pinned Dogs</h3>
        {/* {props.newPin.map((item, index) => ( */}
        {pinnedList.map((item, index) => (
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