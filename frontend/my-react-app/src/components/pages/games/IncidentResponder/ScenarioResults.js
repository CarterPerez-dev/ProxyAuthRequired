// src/components/pages/games/IncidentResponder/ScenarioResults.js
import React from 'react';
import { 
  FaTrophy, FaRedo, FaHome, FaClipboardCheck, 
  FaBookmark, FaTwitter, FaLinkedin, FaCheck, 
  FaExclamationTriangle, FaChartLine
} from 'react-icons/fa';
import './ScenarioResults.css';

const ScenarioResults = ({ results, scenario, selectedActions, score, onRestart }) => {
  if (!results || !scenario) return null;
  
  const { 
    responseRating, 
    xpAwarded, 
    coinsAwarded, 
    timeBonus,
    feedbackSummary,
    keyLessons,
    achievements
  } = results;
  
  const maxPossibleScore = scenario.maxScore || 100;
  const scorePercentage = Math.round((score / maxPossibleScore) * 100);
  
  const getResponseRatingClass = () => {
    if (responseRating >= 90) return 'excellent';
    if (responseRating >= 70) return 'good';
    if (responseRating >= 50) return 'fair';
    return 'poor';
  };
  
  const getResponseRatingText = () => {
    if (responseRating >= 90) return 'Expert Responder';
    if (responseRating >= 70) return 'Skilled Responder';
    if (responseRating >= 50) return 'Competent Responder';
    return 'Novice Responder';
  };
  
  const getActionQuality = (actionId) => {
    const action = results.actionDetails.find(a => a.id === actionId);
    if (!action) return '';
    
    if (action.quality === 'best') return 'excellent-choice';
    if (action.quality === 'good') return 'good-choice';
    if (action.quality === 'fair') return 'fair-choice';
    return 'poor-choice';
  };
  
  return (
    <div className="scenario-results">
      <div className="results-header">
        <h2>Incident Response Completed</h2>
        <h3>{scenario.title}</h3>
      </div>
      
      <div className="results-overview">
        <div className="score-container">
          <div className="score-circle">
            <div className="score-value">{scorePercentage}%</div>
            <div className="score-label">Score</div>
          </div>
          
          <div className={`rating-container ${getResponseRatingClass()}`}>
            <FaTrophy className="rating-icon" />
            <div className="rating-value">{responseRating}/100</div>
            <div className="rating-label">{getResponseRatingText()}</div>
          </div>
        </div>
        
        <div className="rewards-container">
          <h3>Rewards Earned</h3>
          <div className="rewards">
            <div className="reward-item">
              <div className="reward-value">+{xpAwarded}</div>
              <div className="reward-label">XP</div>
            </div>
            <div className="reward-item">
              <div className="reward-value">+{coinsAwarded}</div>
              <div className="reward-label">Coins</div>
            </div>
            {timeBonus > 0 && (
              <div className="reward-item bonus">
                <div className="reward-value">+{timeBonus}</div>
                <div className="reward-label">Time Bonus</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {achievements && achievements.length > 0 && (
        <div className="achievements-earned">
          <h3><FaTrophy /> Achievements Unlocked</h3>
          <div className="achievements-container">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon">
                  <FaBookmark />
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
      
      <div className="feedback-section">
        <h3><FaChartLine /> Response Analysis</h3>
        <div className="feedback-summary">
          <p>{feedbackSummary}</p>
        </div>
        
        <div className="key-lessons">
          <h4>Key Lessons:</h4>
          <ul>
            {keyLessons.map((lesson, index) => (
              <li key={index}>{lesson}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="response-timeline">
        <h3><FaClipboardCheck /> Your Response Timeline</h3>
        <div className="timeline-container">
          {results.actionDetails.map((action, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-step">{index + 1}</div>
              <div className={`timeline-content ${getActionQuality(action.id)}`}>
                <div className="timeline-action">{action.text}</div>
                <div className="timeline-outcome">
                  {action.quality === 'best' || action.quality === 'good' ? (
                    <FaCheck className="positive-icon" />
                  ) : (
                    <FaExclamationTriangle className="negative-icon" />
                  )}
                  <span>{action.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="results-actions">
        <button className="restart-button" onClick={onRestart}>
          <FaRedo /> Try Again
        </button>
        <button className="home-button" onClick={onRestart}>
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
  );
};

export default ScenarioResults;
