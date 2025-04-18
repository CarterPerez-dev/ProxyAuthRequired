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
    <div className="incidentresponder_results_container">
      <div className="incidentresponder_results_header">
        <h2>Incident Response Completed</h2>
        <h3>{scenario.title}</h3>
      </div>
      
      <div className="incidentresponder_results_overview">
        <div className="incidentresponder_score_container">
          <div className="incidentresponder_score_circle">
            <div className="incidentresponder_score_value">{scorePercentage}%</div>
            <div className="incidentresponder_score_label">Score</div>
          </div>
          
          <div className={`incidentresponder_rating_container ${getResponseRatingClass()}`}>
            <FaTrophy className="incidentresponder_rating_icon" />
            <div className="incidentresponder_rating_value">{responseRating}/100</div>
            <div className="incidentresponder_rating_label">{getResponseRatingText()}</div>
          </div>
        </div>
        
        <div className="incidentresponder_rewards_container">
          <h3>Rewards Earned</h3>
          <div className="incidentresponder_rewards">
            <div className="incidentresponder_reward_item">
              <div className="incidentresponder_reward_value">+{xpAwarded}</div>
              <div className="incidentresponder_reward_label">XP</div>
            </div>
            <div className="incidentresponder_reward_item">
              <div className="incidentresponder_reward_value">+{coinsAwarded}</div>
              <div className="incidentresponder_reward_label">Coins</div>
            </div>
            {timeBonus > 0 && (
              <div className="incidentresponder_reward_item bonus">
                <div className="incidentresponder_reward_value">+{timeBonus}</div>
                <div className="incidentresponder_reward_label">Time Bonus</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {achievements && achievements.length > 0 && (
        <div className="incidentresponder_achievements_earned">
          <h3><FaTrophy /> Achievements Unlocked</h3>
          <div className="incidentresponder_achievements_container">
            {achievements.map((achievement, index) => (
              <div key={index} className="incidentresponder_achievement_item">
                <div className="incidentresponder_achievement_icon">
                  <FaBookmark />
                </div>
                <div className="incidentresponder_achievement_details">
                  <div className="incidentresponder_achievement_name">{achievement.name}</div>
                  <div className="incidentresponder_achievement_description">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="incidentresponder_feedback_section">
        <h3><FaChartLine /> Response Analysis</h3>
        <div className="incidentresponder_feedback_summary">
          <p>{feedbackSummary}</p>
        </div>
        
        <div className="incidentresponder_key_lessons">
          <h4>Key Lessons:</h4>
          <ul>
            {keyLessons.map((lesson, index) => (
              <li key={index}>{lesson}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="incidentresponder_response_timeline">
        <h3><FaClipboardCheck /> Your Response Timeline</h3>
        <div className="incidentresponder_timeline_container">
          {results.actionDetails.map((action, index) => (
            <div key={index} className="incidentresponder_timeline_item">
              <div className="incidentresponder_timeline_step">{index + 1}</div>
              <div className={`incidentresponder_timeline_content ${getActionQuality(action.id)}`}>
                <div className="incidentresponder_timeline_action">{action.text}</div>
                <div className="incidentresponder_timeline_outcome">
                  {action.quality === 'best' || action.quality === 'good' ? (
                    <FaCheck className="incidentresponder_positive_icon" />
                  ) : (
                    <FaExclamationTriangle className="incidentresponder_negative_icon" />
                  )}
                  <span>{action.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="incidentresponder_results_actions">
        <button className="incidentresponder_restart_button" onClick={onRestart}>
          <FaRedo /> Try Again
        </button>
        <button className="incidentresponder_home_button" onClick={onRestart}>
          <FaHome /> Choose New Scenario
        </button>
        <div className="incidentresponder_share_container">
          <span>Share your results:</span>
          <button className="incidentresponder_twitter_share">
            <FaTwitter />
          </button>
          <button className="incidentresponder_linkedin_share">
            <FaLinkedin />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioResults;
