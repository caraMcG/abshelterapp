import * as React from 'react';
import Select from 'react-select';
import './App.css';
import { Results } from './components'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as AdoptedPic } from './assets/adopted-dog.svg';


function App() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [selection, setSelection] = useState('');
  const [local, setLocal] = useState(false);
  const [localSave, setLocalSave] = useState([]);
  const [imgNotFoundFlags, setImgNotFoundFlags] = useState(Array(localSave.length).fill(false));

  const shelters = [
    { value: "aarcs", label: "AARCS" },
    { value: "pawsitive", label: "Pawsitive Match" },
    { value: "calgaryhumane", label: "Calgary Humane Society" },
    { value: "dogs", label: "All Shelters" },
  ];

  useEffect(() => {

    if (localStorage.getItem('savedDogs')) {
      console.log("you have saves!");
      setLocal(true);

      const saved = JSON.parse(localStorage.getItem('savedDogs'));
      setLocalSave(saved);
    }

  }, []);

  const handleSelection = e => {
    setSelection(e.value)
  }

  function handleLocal(i) {
    if (i === 1) {
      console.log("you want to keep last saves");
      setLocalSave(localSave);
      setLocal(false); //resetting since we completed this prompt
    }
    else {
      console.log("clearing local storage");
      localStorage.clear();
      setLocalSave([]);
      setLocal(false);
    }
  }

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 300 ? setShowTopButton(true) : setShowTopButton(false);
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener('scroll', handleScrollButtonVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      {
        showTopButton && (
          <div className={`scrollToTop`}>
            <button title='Back to top' id='to_top' onClick={handleScrollToTop}>
              &uarr;
            </button>
          </div>
        )
      }
      {local && localSave.length !== 0 ? <div className='app_returned'>
        <h1>Welcome Back!</h1>
        <h4>Would you like to keep the dogs saved from your previous visit? <br />(any adopted dogs will be removed)</h4>
        <button onClick={() => { handleLocal(1) }}>Yes</button>
        <button onClick={() => { handleLocal(0) }}>No</button>

        <div className='app_returned_container'>
          {localSave.map((item, index) => (
            <div key={index} className="dogItem">
              <div className='dogItem_topContainer'>
                <div className='dogItem_pin'>
                  <div className="dogInfo">
                    <span>{item.dogName}</span><br />
                  </div>
                </div>
              </div>

              {imgNotFoundFlags[index] ? <br />
                : <a href={item.dogURL}
                  target='_blank'
                  rel='noreferrer'>
                  <div className="dogImageContainer">
                    {imgNotFoundFlags[index] ? <svg alt={item.dogName + ' has been adopted'}>< AdoptedPic /></svg>
                      :
                      <img src={item.dogPic}
                        className="dogImage"
                        alt={'Picture of ' + item.dogName}
                        draggable="false"
                        onError={() => {
                          const newFlags = [...imgNotFoundFlags];
                          newFlags[index] = true;
                          setImgNotFoundFlags(newFlags)
                        }
                        } />
                    }
                    <br />
                  </div>
                </a>}
            </div>

          ))}
        </div>
      </div>

        : null}

      {!local ? <div className='app_main'>
        <h1>Alberta Shelter App! <FontAwesomeIcon size="2xs" id="appPaw" icon={faPaw} /></h1>   <br />
        {!selection ?
          <>
            <h3 id="descText">A simple app to help anyone go through all of the amazing dogs looking for their forever homes in Alberta.<br />
              If you like a  dog or are interested to learn more, click that little heart on their card. This app will save them at the top of the page for you to come back to!
            </h3><br /><br />
            <h4 id="descText">Please note that results on first selection may take a few minutes to load. <br /> If you're interested in this project feel free to checkout the github <a href="https://github.com/caraMcG/abshelterapp" target="_blank" rel="noreferrer">here</a>.
            </h4></>
          : ''}

        <div className="dropdown_container">
          <div className="dropdown">
            <Select
              placeholder="Please select an option"
              onChange={handleSelection}
              options={shelters}
              classNamePrefix="dropdownOptions"
            />
          </div>
        </div>
      </div>
        : null}

      {selection !== '' ?
        < Results endpoint={selection} prevSave={localSave} />
        : null}
    </div>
  );
}

export default App;
