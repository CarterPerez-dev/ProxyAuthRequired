// src/components/pages/games/ThreatHunter/ThreatResultsModal.js
import React from 'react';
import { 
  FaTrophy, FaRedo, FaHome, FaCheck, FaTimes, 
  FaClock, FaExclamationTriangle, FaTwitter, FaLinkedin 
} from 'react-icons/fa';
import './ThreatResultsModal.css';

const ThreatResultsModal = ({ results, scenario, onClose, onRestart }) => {
  if (!results || !scenario) return null;
  
  const { 
    score,
    maxScore,
    correctThreats,
    missedThreats,
    falsePositives,
    timeBonus,
    coinsAwarded,
    xpAwarded,
    feedback,
    newAchievements
  } = results;
  
  // Calculate score percentage
  const scorePercentage = Math.round((score / maxScore) * 100);
  
  // Determine rating based on score percentage
  const getRating = () => {
    if (scorePercentage >= 90) return 'Expert Analyst';
    if (scorePercentage >= 75) return 'Senior Analyst';
    if (scorePercentage >= 60) return 'Security Analyst';
    if (scorePercentage >= 40) return 'Junior Analyst';
    return 'Trainee';
  };
  
  const getRatingClass = () => {
    if (scorePercentage >= 90) return 'expert';
    if (scorePercentage >= 75) return 'senior';
    if (scorePercentage >= 60) return 'analyst';
    if (scorePercentage >= 40) return 'junior';
    return 'trainee';
  };
  
  return (
    <div className="threat-results-overlay">
      <div className="threat-results-modal">
        <div className="results-header">
          <h2>Analysis Complete</h2>
          <h3>{scenario.title}</h3>
        </div>
        
        <div className="results-overview">
          <div className="score-container">
            <div className="score-circle">
              <div className="score-percentage">{scorePercentage}%</div>
              <div className="score-points">{score}/{maxScore}</div>
            </div>
            
            <div className={`rating-container ${getRatingClass()}`}>
              <FaTrophy className="rating-icon" />
              <div className="rating-value">{getRating()}</div>
            </div>
          </div>
          
          <div className="threat-stats">
            <div className="stat-row correct">
              <div className="stat-icon"><FaCheck /></div>
              <div className="stat-label">Threats Correctly Identified:</div>
              <div className="stat-value">{correctThreats.length}</div>
            </div>
            
            <div className="stat-row missed">
              <div className="stat-icon"><FaTimes /></div>
              <div className="stat-label">Threats Missed:</div>
              <div className="stat-value">{missedThreats.length}</div>
            </div>
            
            <div className="stat-row false">
              <div className="stat-icon"><FaExclamationTriangle /></div>
              <div className="stat-label">False Positives:</div>
              <div className="stat-value">{falsePositives.length}</div>
            </div>
            
            <div className="stat-row time">
              <div className="stat-icon"><FaClock /></div>
              <div className="stat-label">Time Bonus:</div>
              <div className="stat-value">+{timeBonus}</div>
            </div>
          </div>
        </div>
        
        <div className="rewards-summary">
          <div className="reward-item">
            <div className="reward-value">+{xpAwarded}</div>
            <div className="reward-label">XP</div>
          </div>
          <div className="reward-item">
            <div className="reward-value">+{coinsAwarded}</div>
            <div className="reward-label">Coins</div>
          </div>
        </div>
        
        {newAchievements && newAchievements.length > 0 && (
          <div className="new-achievements">
            <h3>Achievements Unlocked!</h3>
            
            <div className="achievements-list">
              {newAchievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-icon">
                    <FaTrophy />
                  </div>
                  <div className="achievement-details">
                    <div className="achievement-name">{achievement.name}</div>
                    <div className="achievement-description">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="detection-details">
          <div className="details-section">
            <h3>Correctly Identified Threats</h3>
            {correctThreats.length > 0 ? (
              <ul className="threats-list correct">
                {correctThreats.map((threat, index) => (
                  <li key={index} className="threat-item">
                    <FaCheck className="threat-icon correct" />
                    <div className="threat-info">
                      <div className="threat-name">{threat.name}</div>
                      <div className="threat-description">{threat.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-threats">No threats were correctly identified.</p>
            )}
          </div>
          
          {missedThreats.length > 0 && (
            <div className="details-section">
              <h3>Missed Threats</h3>
              <ul className="threats-list missed">
                {missedThreats.map((threat, index) => (
                  <li key={index} className="threat-item">
                    <FaTimes className="threat-icon missed" />
                    <div className="threat-info">
                      <div className="threat-name">{threat.name}</div>
                      <div className="threat-description">{threat.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="feedback-section">
          <h3>Analysis Feedback</h3>
          <p>{feedback}</p>
        </div>
        
        <div className="results-actions">
          <button className="restart-button" onClick={onRestart}>
            <FaRedo /> Try Again
          </button>
          <button className="home-button" onClick={onClose}>
            <FaHome /> Choose New Scenario
          </button>
          
          <div className="share-container">
            <span>Share your results:</span>
            <button className="twitter-share">
              <FaTwitter />
            </button>
            <button className="linkedin-share">
              <FaLinkedin />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatResultsModal;
