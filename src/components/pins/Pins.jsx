import React from 'react'
import { useState, useEffect } from 'react';
import './pins.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const Pins = (props) => {

    const [ pinnedList, setPinnedList] = useState([]);
    const [ recentSelect, setrecentSelect ]  = useState([]);
    const [ recentDelete, setrecentDelete ]  = useState([]);

    useEffect(() => {

        setrecentSelect(props.newPin);

        if(props.newPin !== recentSelect && !JSON.stringify(pinnedList).includes(JSON.stringify(props.newPin.dogName && props.newPin.dogURL))){
            console.log("new item!");
            setPinnedList([...pinnedList,props.newPin]);
        }

    }, [props]);
    

    function handlePinClick(i){
        //unsure if want to do anything with deleted history?
        setrecentDelete([...recentDelete, pinnedList[i.index]])

        // Remove from  pinned list and update state
        const filtered = pinnedList.filter((_,x) => x !== i.index);
        setPinnedList(filtered);
    }


  return (
    <>
      { pinnedList.length > 0 ? <h3 className='pinTitle'>My Pinned Dogs ❤</h3>
        : null}
        <div className="pinResults">
            {pinnedList.map((item, index) => (
                <div key={index} className="pinItem">
                    
                    <div className='pinItem_topContainer'>
                    <div className='pinItem_pin'>
                        <FontAwesomeIcon icon={faXmark} size="xl" name={index} onClick={()=> { handlePinClick({index})}}/> 
                    </div>
                    <div className="pinImageContainer">
                        <img src={item.dogPic} className="pinImage" alt={'Pinned image of ' + item.dogName}/><br/>
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