import React from 'react';
import { useState, useEffect } from 'react';
import './pins.css'; 
import ShareButton from '../shareButton/ShareButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const Pins = ({setPinned, pinned }) => {

    const [ recentSelect, setrecentSelect ]  = useState([]);
    let pinurls = recentSelect.map(obj => obj.dogURL);
    let urls = pinurls.toString().replace(/,/g, '\n');
    console.log(urls);
    
    useEffect(() => {

        setrecentSelect([...pinned]);

    }, [pinned]);
    

  return (
    <>
    { recentSelect.length > 0 ? <span className='pinTitle'>My Favourites ❤</span>
                        
    : null}
        <div className="pinResults">
            {recentSelect.map((item, index) => (
                <div key={index} className="pinItem">
                    <div className='pinItem_topContainer'>
                        <div className='pinItem_pin'>
                            <div className="pinInfo">
                                <span>{item.dogName}</span><br/>
                                {/* <a href={item.dogURL} target='_blank' rel='noreferrer'>More Info</a> */}
                            </div>
                            <div className='pinX'>
                                <FontAwesomeIcon icon={faXmark} size="xl" name={index} onClick={()=> setPinned({index})}/> 
                            </div>
                        </div>
                    </div> 
                    <a href={item.dogURL} target='_blank' rel='noreferrer' style={{textDecoration: "none"}} >
                        <div className="pinImageContainer">
                            <img src={item.dogPic} className="pinImage" alt={'Pinned image of ' + item.dogName} draggable="false"/><br/>
                        </div>
                    </a>
                </div>
            ))}
        </div>
        <div className='pinButtons'>
            <ShareButton defaultMessage={urls}/>
        </div>
       
    </>
  )
}

export default Pins