// src/components/pages/games/CipherChallenge/CipherHints.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unlockHint } from '../../store/slice/cipherChallengeSlice';
import { FaLightbulb, FaLock, FaCoins, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './CipherHints.css';

const CipherHints = ({ hints, challengeId }) => {
  const dispatch = useDispatch();
  const { unlockedHints } = useSelector(state => state.cipherChallenge);
  const { userId, coins } = useSelector(state => state.user);
  
  const [showHints, setShowHints] = useState(false);
  
  if (!hints || hints.length === 0) {
    return null;
  }
  
  const userUnlockedHints = unlockedHints[challengeId] || [];
  
  const handleUnlockHint = (hintIndex) => {
    // Calculate cost based on hint index (first hint is cheaper)
    const cost = hintIndex === 0 ? 10 : hintIndex === 1 ? 25 : 50;
    
    // Check if user has enough coins
    if (coins < cost) {
      alert(`Not enough coins! You need ${cost} coins to unlock this hint.`);
      return;
    }
    
    // Confirm hint unlock
    if (window.confirm(`Unlock this hint for ${cost} coins?`)) {
      dispatch(unlockHint({ 
        userId, 
        challengeId, 
        hintIndex, 
        cost 
      }));
    }
  };
  
  return (
    <div className="cipher-hints-container">
      <div 
        className="hints-header"
        onClick={() => setShowHints(!showHints)}
      >
        <h3>
          <FaLightbulb /> Hints 
          <span className="hint-count">
            ({userUnlockedHints.length}/{hints.length})
          </span>
        </h3>
        <button className="toggle-hints-button">
          {showHints ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      
      {showHints && (
        <div className="hints-content">
          {hints.map((hint, index) => {
            const isUnlocked = userUnlockedHints.includes(index);
            const cost = index === 0 ? 10 : index === 1 ? 25 : 50;
            
            return (
              <div 
                key={index} 
                className={`hint-item ${isUnlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="hint-number">Hint {index + 1}</div>
                
                {isUnlocked ? (
                  <div className="hint-text">{hint}</div>
                ) : (
                  <div className="locked-hint">
                    <FaLock className="lock-icon" />
                    <div className="hint-locked-message">
                      Unlock this hint for valuable clues!
                    </div>
                    <button 
                      className="unlock-hint-button"
                      onClick={() => handleUnlockHint(index)}
                      disabled={coins < cost}
                    >
                      <FaCoins /> {cost} Coins
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          
          <div className="hints-info">
            <p>
              <strong>Note:</strong> Using hints will still allow you to earn XP and coins for solving the challenge, but the rewards will be slightly reduced.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CipherHints;
