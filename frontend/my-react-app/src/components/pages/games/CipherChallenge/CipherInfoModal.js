// src/components/pages/games/CipherChallenge/CipherInfoModal.js
import React, { useState } from 'react';
import { FaTimes, FaLock, FaExchangeAlt, FaHistory, FaRandom, FaKey } from 'react-icons/fa';
import './CipherInfoModal.css';

const CipherInfoModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('caesar');
  
  const cipherTypes = [
    {
      id: 'caesar',
      name: 'Caesar Cipher',
      icon: <FaExchangeAlt />,
      description: 'The Caesar Cipher is one of the simplest encryption techniques. It works by shifting each letter in the plaintext a certain number of positions down the alphabet. For example, with a shift of 3, A would become D, B would become E, and so on.',
      example: {
        plaintext: 'HELLO',
        ciphertext: 'KHOOR',
        explanation: 'Shift of 3: H→K, E→H, L→O, L→O, O→R'
      },
      history: 'Named after Julius Caesar, who used it to communicate with his generals. It\'s a type of substitution cipher where each letter is replaced by a letter some fixed number of positions down the alphabet.'
    },
    {
      id: 'rot13',
      name: 'ROT13',
      icon: <FaExchangeAlt />,
      description: 'ROT13 is a special case of the Caesar cipher, using a fixed shift of 13 places. Since the English alphabet has 26 letters, ROT13 is its own inverse - applying it twice gets you back to the original text.',
      example: {
        plaintext: 'HELLO',
        ciphertext: 'URYYB',
        explanation: 'Shift of 13: H→U, E→R, L→Y, L→Y, O→B'
      },
      history: 'ROT13 was used in online forums as a means of hiding spoilers or offensive material. It\'s simple enough to decode manually but prevents accidental reading.'
    },
    {
      id: 'atbash',
      name: 'Atbash Cipher',
      icon: <FaRandom />,
      description: 'The Atbash cipher is a substitution cipher where each letter is mapped to its reverse in the alphabet. A becomes Z, B becomes Y, and so on. It\'s its own inverse, like ROT13.',
      example: {
        plaintext: 'HELLO',
        ciphertext: 'SVOOL',
        explanation: 'H→S, E→V, L→O, L→O, O→L'
      },
      history: 'One of the oldest known encryption methods, the Atbash cipher originated from Hebrew cryptography. It appears in the Bible in the Book of Jeremiah.'
    },
    {
      id: 'substitution',
      name: 'Substitution Cipher',
      icon: <FaExchangeAlt />,
      description: 'A simple substitution cipher replaces each letter of the plaintext with a different letter or symbol, using a fixed system. Unlike the Caesar cipher, the substitutions are not limited to shifts and can be completely random.',
      example: {
        plaintext: 'HELLO',
        ciphertext: 'XVPPS',
        explanation: 'Based on a key where H→X, E→V, L→P, O→S'
      },
      history: 'Substitution ciphers have been used for thousands of years. A famous example is the "pigpen cipher" used by Freemasons. While easy to implement, they can be broken using frequency analysis.'
    },
    {
      id: 'vigenere',
      name: 'Vigenère Cipher',
      icon: <FaKey />,
      description: 'The Vigenère cipher uses a keyword to determine the shift value for each letter in the plaintext. This creates a more complex encryption pattern that resists simple frequency analysis.',
      example: {
        plaintext: 'HELLO',
        ciphertext: 'KAMVP',
        explanation: 'Using key "KEY": H(+K=10)→K, E(+E=4)→A, L(+Y=24)→M, L(+K=10)→V, O(+E=4)→P'
      },
      history: 'Invented by Blaise de Vigenère in the 16th century, it remained unbroken for three centuries and was known as "le chiffre indéchiffrable" (the indecipherable cipher).'
    },
    {
      id: 'binary',
      name: 'Binary Encoding',
      icon: <FaExchangeAlt />,
      description: 'Binary encoding represents each character using its ASCII value in binary (base-2) format. Each character is typically represented by 8 bits, creating patterns of 0s and 1s.',
      example: {
        plaintext: 'HI',
        ciphertext: '01001000 01001001',
        explanation: 'H has ASCII value 72 (01001000 in binary), I has ASCII value 73 (01001001 in binary)'
      },
      history: 'Binary is the fundamental language of computers. While not a traditional cipher, binary encoding is commonly used in digital communication and is the foundation of all computer data.'
    }
  ];
  
  const selectedCipher = cipherTypes.find(cipher => cipher.id === activeTab) || cipherTypes[0];
  
  return (
    <div className="cipher-info-modal-overlay">
      <div className="cipher-info-modal">
        <div className="modal-header">
          <h2><FaLock /> Cipher Types</h2>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="cipher-tabs">
            {cipherTypes.map(cipher => (
              <button
                key={cipher.id}
                className={`cipher-tab ${activeTab === cipher.id ? 'active' : ''}`}
                onClick={() => setActiveTab(cipher.id)}
              >
                {cipher.icon}
                <span>{cipher.name}</span>
              </button>
            ))}
          </div>
          
          <div className="cipher-details">
            <h3>{selectedCipher.name}</h3>
            
            <div className="cipher-description">
              <h4>How it Works</h4>
              <p>{selectedCipher.description}</p>
            </div>
            
            <div className="cipher-example">
              <h4>Example</h4>
              <div className="example-container">
                <div className="example-text">
                  <span className="example-label">Plaintext:</span>
                  <span className="example-value">{selectedCipher.example.plaintext}</span>
                </div>
                <div className="example-text">
                  <span className="example-label">Ciphertext:</span>
                  <span className="example-value">{selectedCipher.example.ciphertext}</span>
                </div>
                <div className="example-explanation">
                  {selectedCipher.example.explanation}
                </div>
              </div>
            </div>
            
            <div className="cipher-history">
              <h4><FaHistory /> Historical Context</h4>
              <p>{selectedCipher.history}</p>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <p>
            Cryptography has evolved from these simple ciphers to the advanced encryption algorithms that secure our digital communications today.
          </p>
          <button 
            className="close-modal-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CipherInfoModal;
