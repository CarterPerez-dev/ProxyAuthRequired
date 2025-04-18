// src/components/pages/games/PhishingPhrenzy/GameOverModal.js
import React from 'react';
import { FaTrophy, FaMedal, FaRedo, FaHome, FaTwitter, FaFacebook } from 'react-icons/fa';
import './GameOverModal.css';

const GameOverModal = ({ score, highScore, onClose, onPlayAgain }) => {
  const isNewHighScore = score > highScore;
  
  const getScoreRating = () => {
    if (score >= 500) return { rating: 'Legendary', icon: <FaTrophy className="phishingphrenzy_gold_trophy" /> };
    if (score >= 300) return { rating: 'Expert', icon: <FaTrophy className="phishingphrenzy_silver_trophy" /> };
    if (score >= 200) return { rating: 'Advanced', icon: <FaTrophy className="phishingphrenzy_bronze_trophy" /> };
    if (score >= 100) return { rating: 'Skilled', icon: <FaMedal className="phishingphrenzy_gold_medal" /> };
    if (score >= 50) return { rating: 'Competent', icon: <FaMedal className="phishingphrenzy_silver_medal" /> };
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
    <div className="phishingphrenzy_gameover_overlay">
      <div className="phishingphrenzy_gameover_modal">
        <h2 className="phishingphrenzy_gameover_title">Game Over!</h2>
        
        <div className="phishingphrenzy_score_container">
          <div className="phishingphrenzy_final_score">
            <h3>Your Score</h3>
            <div className="phishingphrenzy_score_number">{score}</div>
            {isNewHighScore && (
              <div className="phishingphrenzy_new_high_score">
                <FaTrophy className="phishingphrenzy_high_score_icon" /> New High Score!
              </div>
            )}
          </div>
          
          <div className="phishingphrenzy_rating_container">
            <h3>Rating</h3>
            <div className="phishingphrenzy_rating">
              {icon} {rating}
            </div>
            <p className="phishingphrenzy_rating_description">{getRatingDescription()}</p>
          </div>
        </div>
        
        <div className="phishingphrenzy_phishing_tip">
          <h3>Phishing Tip:</h3>
          <p>{getPhishingTip()}</p>
        </div>
        
        <div className="phishingphrenzy_modal_buttons">
          <button className="phishingphrenzy_play_again_button" onClick={onPlayAgain}>
            <FaRedo /> Play Again
          </button>
          <button className="phishingphrenzy_home_button" onClick={onClose}>
            <FaHome /> Return to Menu
          </button>
        </div>
        
        <div className="phishingphrenzy_share_container">
          <p>Share your score:</p>
          <div className="phishingphrenzy_share_buttons">
            <button className="phishingphrenzy_twitter_share">
              <FaTwitter /> Twitter
            </button>
            <button className="phishingphrenzy_facebook_share">
              <FaFacebook /> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
