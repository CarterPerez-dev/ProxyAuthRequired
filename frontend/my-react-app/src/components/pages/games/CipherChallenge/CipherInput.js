// src/components/pages/games/CipherChallenge/CipherInput.js
import React from 'react';
import { FaPaperPlane, FaUnlock, FaCheckCircle } from 'react-icons/fa';
import './CipherInput.css';

const CipherInput = ({ value, onChange, onSubmit, feedback, isCompleted }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <div className="cipher-input-container">
      <h3 className="input-header">
        <FaUnlock /> Your Solution
        {isCompleted && (
          <span className="completed-badge">
            <FaCheckCircle /> Solved
          </span>
        )}
      </h3>
      
      <form onSubmit={handleSubmit} className="solution-form">
        <div className="input-wrapper">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your deciphered message here..."
            className={`solution-input ${isCompleted ? 'completed' : ''}`}
            rows={3}
          />
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={!value.trim()}
          >
            <FaPaperPlane />
            <span>Submit</span>
          </button>
        </div>
        
        {feedback && (
          <div className={`feedback-message ${feedback.type}`}>
            {feedback.message}
          </div>
        )}
      </form>
      
      <div className="solution-tips">
        <h4>Solution Tips:</h4>
        <ul>
          <li>Your answer should be the fully deciphered plaintext message.</li>
          <li>Capitalization is not important, but spelling is.</li>
          <li>Include spaces and punctuation as appropriate in your answer.</li>
          <li>If you're stuck, try using the cipher tools in the sidebar or unlock a hint.</li>
        </ul>
      </div>
    </div>
  );
};

export default CipherInput;
