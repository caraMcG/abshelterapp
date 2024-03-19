import React from 'react';
import { useState } from 'react';
import './sharebutton.css'; 

const ShareButton = ({ defaultMessage }) => {

    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard');
    const signature = '❤ Shared from Alberta Shelter App 🐶'

    const handleEmailShare = () => {
        window.location.href = `mailto:?subject=Check out my favourite dogs!&body=${encodeURIComponent('They\'re adorable and need a home:\n\n' + defaultMessage + '\n\n\n' + signature)}`;
    };

    const handleCopyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(defaultMessage);
          setCopyButtonText('Copied!');
          setTimeout(() => {
            setCopyButtonText('Copy to Clipboard');
          }, 2000); // Reset text after 2 seconds

        } catch (error) {
          console.error('Error copying to clipboard:', error);
        }
    };
     
    const handleTextShare = () => {
        window.location.href = `sms:?body=Check out my favourite dogs! ${encodeURIComponent(defaultMessage + '\n\n\n' + signature)}`;
    };

    return (
        <div>
            <button id="shareBtn" onClick={() => setShowShareMenu(!showShareMenu)}>Share!</button>
            <div className={`share-menu ${showShareMenu ? 'active' : ''}`}>
                <button onClick = {handleCopyToClipboard}>{copyButtonText}</button>
                <button onClick = {handleEmailShare}>Share via Email</button>
                <button onClick = {handleTextShare}>Share via Text</button>
            </div>
        </div>
    );
};

export default ShareButton;