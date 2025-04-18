// src/components/pages/games/PhishingPhrenzy/GameOverModal.js
import React from 'react';
import { FaTrophy, FaMedal, FaRedo, FaHome, FaTwitter, FaFacebook } from 'react-icons/fa';
import './GameOverModal.css';

const GameOverModal = ({ score, highScore, onClose, onPlayAgain }) => {
  const isNewHighScore = score > highScore;
  
  const getScoreRating = () => {
    if (score >= 500) return { rating: 'Legendary', icon: <FaTrophy className="gold-trophy" /> };
    if (score >= 300) return { rating: 'Expert', icon: <FaTrophy className="silver-trophy" /> };
    if (score >= 200) return { rating: 'Advanced', icon: <FaTrophy className="bronze-trophy" /> };
    if (score >= 100) return { rating: 'Skilled', icon: <FaMedal className="gold-medal" /> };
    if (score >= 50) return { rating: 'Competent', icon: <FaMedal className="silver-medal" /> };
    return { rating: 'Novice', icon: null };
  };

  const { rating, icon } = getScoreRating();
  
  const getRatingDescription = () => {
    switch (rating) {
      case 'Legendary':
        return "You're practically immune to phishing! You could teach a masterclass on this.";
      case 'Expert':
        return "Outstanding! Your phishing detection skills are razor-sharp.";
      case 'Advanced':
        return "Great work! You've got a keen eye for spotting phishing attempts.";
      case 'Skilled':
        return "Good job! You're building solid phishing detection skills.";
      case 'Competent':
        return "Not bad! With more practice, you'll get even better at spotting phishing.";
      case 'Novice':
        return "We all start somewhere! Keep practicing to improve your detection skills.";
      default:
        return "Keep practicing to improve your phishing detection skills!";
    }
  };
  
  const getPhishingTip = () => {
    const tips = [
      "Always check the sender's email address, not just the display name.",
      "Hover over links before clicking to see where they really go.",
      "Be wary of urgent requests that pressure you to act quickly.",
      "Look for spelling and grammar errors - they're common in phishing attempts.",
      "Never provide personal information when responding to an unsolicited message.",
      "Check for personalization - legitimate messages often include personal details.",
      "Be suspicious of generic greetings like 'Dear Customer' or 'Dear User'.",
      "Watch out for emails asking you to 'verify your account' or 'update your information'.",
      "If something seems too good to be true, it probably is.",
      "When in doubt, contact the company directly using a known phone number or website."
    ];
    
    // Return a random tip
    return tips[Math.floor(Math.random() * tips.length)];
  };
  
  return (
    <div className="game-over-overlay">
      <div className="game-over-modal">
        <h2 className="game-over-title">Game Over!</h2>
        
        <div className="score-container">
          <div className="final-score">
            <h3>Your Score</h3>
            <div className="score-number">{score}</div>
            {isNewHighScore && (
              <div className="new-high-score">
                <FaTrophy className="high-score-icon" /> New High Score!
              </div>
            )}
          </div>
          
          <div className="rating-container">
            <h3>Rating</h3>
            <div className="rating">
              {icon} {rating}
            </div>
            <p className="rating-description">{getRatingDescription()}</p>
          </div>
        </div>
        
        <div className="phishing-tip">
          <h3>Phishing Tip:</h3>
          <p>{getPhishingTip()}</p>
        </div>
        
        <div className="modal-buttons">
          <button className="play-again-button" onClick={onPlayAgain}>
            <FaRedo /> Play Again
          </button>
          <button className="home-button" onClick={onClose}>
            <FaHome /> Return to Menu
          </button>
        </div>
        
        <div className="share-container">
          <p>Share your score:</p>
          <div className="share-buttons">
            <button className="twitter-share">
              <FaTwitter /> Twitter
            </button>
            <button className="facebook-share">
              <FaFacebook /> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
