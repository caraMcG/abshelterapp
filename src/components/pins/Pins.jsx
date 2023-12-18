import React from 'react'
import { useState, useEffect } from 'react';
import './pins.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const Pins = ({setPinned, pinned }) => {

    const [ recentSelect, setrecentSelect ]  = useState([]);

    useEffect(() => {

        console.log("useEffect fired in PinsTest")
        setrecentSelect([...pinned]);

    }, [pinned]);
    

  return (
    <>
        <div className="pinResults">
            {recentSelect.map((item, index) => (
                <div key={index} className="pinItem">
                    <div className='pinItem_topContainer'>
                    <div className='pinItem_pin'>
                        <FontAwesomeIcon icon={faXmark} size="xl" name={index} onClick={()=> setPinned({index})}/> 
                    </div>
                    <div className="pinImageContainer">
                        <img src={item.dogPic} className="pinImage" alt={'Pinned image of ' + item.dogName} draggable="false"/><br/>
                        </div>
                    </div> 
                    <div className="pinInfo">
                        <span>{item.dogName}</span><br/>
                        <a href={item.dogURL} target='_blank' rel='noreferrer'>More Info</a>
                        </div>
                </div>
            ))}
        </div> 

  </>
  )
}

export default Pins