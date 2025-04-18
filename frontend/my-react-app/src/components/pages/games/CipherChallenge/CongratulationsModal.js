// src/components/pages/games/CipherChallenge/CongratulationsModal.js
import React from 'react';
import { FaTrophy, FaLevelUpAlt, FaCoins, FaStar, FaUnlock } from 'react-icons/fa';
import './CongratulationsModal.css';

const CongratulationsModal = ({ data, onClose }) => {
  const { levelCompleted, newLevelUnlocked, xpEarned, coinsEarned } = data;
  
  const getLevelName = (level) => {
    switch (level) {
      case 1: return 'Beginner';
      case 2: return 'Easy';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return `Level ${level}`;
    }
  };
  
  return (
    <div className="congratulations-overlay">
      <div className="congratulations-modal">
        <div className="confetti-animation">
          {/* Animated confetti elements would go here */}
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
        </div>
        
        <div className="modal-content">
          <div className="trophy-container">
            <FaTrophy className="trophy-icon" />
          </div>
          
          <h2 className="congratulations-title">Level Complete!</h2>
          
          <div className="level-info">
            <h3>
              <FaStar /> {getLevelName(levelCompleted)} Mastered!
            </h3>
            <p>You've conquered all the challenges in this level!</p>
          </div>
          
          <div className="unlocked-level">
            <FaUnlock className="unlock-icon" />
            <h3>New Level Unlocked!</h3>
            <div className="new-level-name">
              <FaLevelUpAlt /> {getLevelName(newLevelUnlocked)}
            </div>
            <p>You've unlocked new, more challenging ciphers to decode!</p>
          </div>
          
          <div className="rewards-container">
            <h3>Rewards Earned:</h3>
            <div className="rewards">
              <div className="reward-item">
                <div className="reward-value">+{xpEarned}</div>
                <div className="reward-label">XP</div>
              </div>
              <div className="reward-item">
                <div className="reward-value">
                  <FaCoins className="coins-icon" /> {coinsEarned}
                </div>
                <div className="reward-label">Coins</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="continue-button" onClick={onClose}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;
