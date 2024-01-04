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
    { recentSelect.length > 0 ? <h3 className='pinTitle'>My Pinned Dogs ❤</h3>
    : null}
        <div className="pinResults">
            {recentSelect.map((item, index) => (
                <div key={index} className="pinItem">
                    <div className='pinItem_topContainer'>
                        <div className='pinItem_pin'>
                            <div className="pinInfo">
                                <span>{item.dogName}</span><br/>
                                <a href={item.dogURL} target='_blank' rel='noreferrer'>More Info</a>
                            </div>
                            <div className='pinX'>
                                <FontAwesomeIcon icon={faXmark} size="xl" name={index} onClick={()=> setPinned({index})}/> 
                            </div>
                        </div>
                    </div> 

                    <div className="pinImageContainer">
                        <img src={item.dogPic} className="pinImage" alt={'Pinned image of ' + item.dogName} draggable="false"/><br/>
                    </div>
                </div>
            ))}
        </div>
        <div className='pinButtons'>
            <button id="shareBtn">Share my picks!</button>
        </div> 

  </>
  )
}

export default Pins