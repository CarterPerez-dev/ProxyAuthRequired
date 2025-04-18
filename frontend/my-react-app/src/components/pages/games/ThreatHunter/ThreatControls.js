// src/components/pages/games/ThreatHunter/ThreatControls.js
import React, { useState, useEffect } from 'react';
import { FaFlag, FaExclamationTriangle, FaClock, FaCheck } from 'react-icons/fa';
import './ThreatControls.css';

const ThreatControls = ({ timeLeft, flaggedLines, detectedThreats, onSubmit }) => {
  const [timerDisplay, setTimerDisplay] = useState('00:00');
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  
  // Format time left for display
  useEffect(() => {
    if (timeLeft !== null && timeLeft !== undefined) {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      setTimerDisplay(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }
  }, [timeLeft]);
  
  // Check if submission is enabled
  useEffect(() => {
    // At least one threat must be detected to submit
    if (detectedThreats.length === 0) {
      setSubmitEnabled(false);
      setWarningMessage('Add at least one detected threat to submit your analysis');
      return;
    }
    
    // Reset warning if conditions are met
    setWarningMessage('');
    setSubmitEnabled(true);
  }, [flaggedLines, detectedThreats]);
  
  const handleSubmitAnalysis = () => {
    if (submitEnabled && onSubmit) {
      onSubmit();
    }
  };
  
  return (
    <div className="threat-controls">
      <div className="controls-header">
        <h3>Investigation Controls</h3>
      </div>
      
      <div className="controls-content">
        <div className="analysis-status">
          <div className="status-item">
            <div className="status-icon flag-icon">
              <FaFlag />
            </div>
            <div className="status-details">
              <div className="status-value">{flaggedLines.length}</div>
              <div className="status-label">Flagged Lines</div>
            </div>
          </div>
          
          <div className="status-item">
            <div className="status-icon threat-icon">
              <FaExclamationTriangle />
            </div>
            <div className="status-details">
              <div className="status-value">{detectedThreats.length}</div>
              <div className="status-label">Threats Detected</div>
            </div>
          </div>
          
          {timeLeft !== null && timeLeft !== undefined && (
            <div className="status-item">
              <div className={`status-icon time-icon ${timeLeft < 60 ? 'urgent' : ''}`}>
                <FaClock />
              </div>
              <div className="status-details">
                <div className={`status-value ${timeLeft < 60 ? 'urgent' : ''}`}>{timerDisplay}</div>
                <div className="status-label">Time Remaining</div>
              </div>
            </div>
          )}
        </div>
        
        {warningMessage && (
          <div className="submission-warning">
            <FaExclamationTriangle />
            <span>{warningMessage}</span>
          </div>
        )}
        
        <button 
          className="submit-analysis-button"
          onClick={handleSubmitAnalysis}
          disabled={!submitEnabled}
        >
          <FaCheck />
          <span>Submit Analysis</span>
        </button>
        
        <div className="submission-note">
          <p>Submit your analysis when you've identified all threats. Your score will be based on correctly identified threats, evidence quality, and time remaining.</p>
        </div>
      </div>
    </div>
  );
};

export default ThreatControls;
