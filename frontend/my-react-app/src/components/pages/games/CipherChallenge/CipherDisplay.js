// src/components/pages/games/CipherChallenge/CipherDisplay.js
import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import './CipherDisplay.css';

const CipherDisplay = ({ ciphertext, cipherType }) => {
  const [copied, setCopied] = useState(false);
  
  // Function to format ciphertext based on cipher type
  const formatCiphertext = () => {
    if (!ciphertext) return '';
    
    switch (cipherType) {
      case 'Binary':
        // Group binary in octets (8 bits)
        return ciphertext.match(/.{1,8}/g)?.join(' ') || ciphertext;
        
      case 'Morse Code':
        // Morse code is already formatted with spaces, just ensure line breaks
        return ciphertext;
        
      case 'Hex':
        // Group hex values in pairs (bytes)
        return ciphertext.match(/.{1,2}/g)?.join(' ') || ciphertext;
        
      case 'Base64':
        // Base64 is typically shown as is
        return ciphertext;
        
      case 'Substitution':
      case 'Caesar Shift':
      case 'ROT13':
      case 'Atbash':
      case 'Vigenère':
        // For text-based ciphers, format in groups of 5 characters
        // as traditionally done in cryptography
        if (ciphertext.includes(' ')) {
          // If it already contains spaces, preserve them
          return ciphertext;
        } else {
          return ciphertext.match(/.{1,5}/g)?.join(' ') || ciphertext;
        }
        
      default:
        return ciphertext;
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(ciphertext).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Determine if this is a text-based or symbolic cipher
  const isSymbolicCipher = ['Pigpen', 'Symbol Substitution'].includes(cipherType);
  
  return (
    <div className="cipher-display">
      <div className="cipher-display-header">
        <h3>Encoded Message</h3>
        <button
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy ciphertext"
        >
          {copied ? <FaCheck /> : <FaCopy />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      {isSymbolicCipher ? (
        <div className="symbolic-cipher">
          <img
            src={ciphertext} // For symbolic ciphers, ciphertext is a URL to an image
            alt={`${cipherType} cipher`}
            className="cipher-image"
          />
        </div>
      ) : (
        <div className="cipher-text">
          <pre>{formatCiphertext()}</pre>
        </div>
      )}
      
      {cipherType === 'Morse Code' && (
        <div className="morse-legend">
          <h4>Morse Code Legend</h4>
          <div className="morse-guide">
            <div className="morse-row">
              <span className="morse-letter">A: .-</span>
              <span className="morse-letter">B: -...</span>
              <span className="morse-letter">C: -.-.</span>
              <span className="morse-letter">D: -..</span>
              <span className="morse-letter">E: .</span>
              <span className="morse-letter">F: ..-.</span>
              <span className="morse-letter">G: --.</span>
              <span className="morse-letter">H: ....</span>
            </div>
            <div className="morse-row">
              <span className="morse-letter">I: ..</span>
              <span className="morse-letter">J: .---</span>
              <span className="morse-letter">K: -.-</span>
              <span className="morse-letter">L: .-..</span>
              <span className="morse-letter">M: --</span>
              <span className="morse-letter">N: -.</span>
              <span className="morse-letter">O: ---</span>
              <span className="morse-letter">P: .--.</span>
            </div>
            <div className="morse-row">
              <span className="morse-letter">Q: --.-</span>
              <span className="morse-letter">R: .-.</span>
              <span className="morse-letter">S: ...</span>
              <span className="morse-letter">T: -</span>
              <span className="morse-letter">U: ..-</span>
              <span className="morse-letter">V: ...-</span>
              <span className="morse-letter">W: .--</span>
              <span className="morse-letter">X: -..-</span>
            </div>
            <div className="morse-row">
              <span className="morse-letter">Y: -.--</span>
              <span className="morse-letter">Z: --..</span>
              <span className="morse-letter">0: -----</span>
              <span className="morse-letter">1: .----</span>
              <span className="morse-letter">2: ..---</span>
              <span className="morse-letter">3: ...--</span>
              <span className="morse-letter">4: ....-</span>
              <span className="morse-letter">5: .....</span>
            </div>
            <div className="morse-row">
              <span className="morse-letter">6: -....</span>
              <span className="morse-letter">7: --...</span>
              <span className="morse-letter">8: ---..</span>
              <span className="morse-letter">9: ----.</span>
              <span className="morse-letter">.: .-.-.-</span>
              <span className="morse-letter">,: --..--</span>
              <span className="morse-letter">?: ..--..</span>
              <span className="morse-letter">/: -..-.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CipherDisplay;
