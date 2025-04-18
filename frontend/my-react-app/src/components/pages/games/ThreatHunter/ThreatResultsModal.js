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
    <div className="threathunter_resultsmodal_overlay">
      <div className="threathunter_resultsmodal_container">
        <div className="threathunter_resultsmodal_header">
          <h2>Analysis Complete</h2>
          <h3>{scenario.title}</h3>
        </div>
        
        <div className="threathunter_resultsmodal_overview">
          <div className="threathunter_resultsmodal_score_container">
            <div className="threathunter_resultsmodal_score_circle">
              <div className="threathunter_resultsmodal_score_percentage">{scorePercentage}%</div>
              <div className="threathunter_resultsmodal_score_points">{score}/{maxScore}</div>
            </div>
            
            <div className={`threathunter_resultsmodal_rating_container ${getRatingClass()}`}>
              <FaTrophy className="threathunter_resultsmodal_rating_icon" />
              <div className="threathunter_resultsmodal_rating_value">{getRating()}</div>
            </div>
          </div>
          
          <div className="threathunter_resultsmodal_threat_stats">
            <div className="threathunter_resultsmodal_stat_row correct">
              <div className="threathunter_resultsmodal_stat_icon"><FaCheck /></div>
              <div className="threathunter_resultsmodal_stat_label">Threats Correctly Identified:</div>
              <div className="threathunter_resultsmodal_stat_value">{correctThreats.length}</div>
            </div>
            
            <div className="threathunter_resultsmodal_stat_row missed">
              <div className="threathunter_resultsmodal_stat_icon"><FaTimes /></div>
              <div className="threathunter_resultsmodal_stat_label">Threats Missed:</div>
              <div className="threathunter_resultsmodal_stat_value">{missedThreats.length}</div>
            </div>
            
            <div className="threathunter_resultsmodal_stat_row false">
              <div className="threathunter_resultsmodal_stat_icon"><FaExclamationTriangle /></div>
              <div className="threathunter_resultsmodal_stat_label">False Positives:</div>
              <div className="threathunter_resultsmodal_stat_value">{falsePositives.length}</div>
            </div>
            
            <div className="threathunter_resultsmodal_stat_row time">
              <div className="threathunter_resultsmodal_stat_icon"><FaClock /></div>
              <div className="threathunter_resultsmodal_stat_label">Time Bonus:</div>
              <div className="threathunter_resultsmodal_stat_value">+{timeBonus}</div>
            </div>
          </div>
        </div>
        
        <div className="threathunter_resultsmodal_rewards_summary">
          <div className="threathunter_resultsmodal_reward_item">
            <div className="threathunter_resultsmodal_reward_value">+{xpAwarded}</div>
            <div className="threathunter_resultsmodal_reward_label">XP</div>
          </div>
          <div className="threathunter_resultsmodal_reward_item">
            <div className="threathunter_resultsmodal_reward_value">+{coinsAwarded}</div>
            <div className="threathunter_resultsmodal_reward_label">Coins</div>
          </div>
        </div>
        
        {newAchievements && newAchievements.length > 0 && (
          <div className="threathunter_resultsmodal_new_achievements">
            <h3>Achievements Unlocked!</h3>
            
            <div className="threathunter_resultsmodal_achievements_list">
              {newAchievements.map((achievement, index) => (
                <div key={index} className="threathunter_resultsmodal_achievement_item">
                  <div className="threathunter_resultsmodal_achievement_icon">
                    <FaTrophy />
                  </div>
                  <div className="threathunter_resultsmodal_achievement_details">
                    <div className="threathunter_resultsmodal_achievement_name">{achievement.name}</div>
                    <div className="threathunter_resultsmodal_achievement_description">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="threathunter_resultsmodal_detection_details">
          <div className="threathunter_resultsmodal_details_section">
            <h3>Correctly Identified Threats</h3>
            {correctThreats.length > 0 ? (
              <ul className="threathunter_resultsmodal_threats_list correct">
                {correctThreats.map((threat, index) => (
                  <li key={index} className="threathunter_resultsmodal_threat_item">
                    <FaCheck className="threathunter_resultsmodal_threat_icon correct" />
                    <div className="threathunter_resultsmodal_threat_info">
                      <div className="threathunter_resultsmodal_threat_name">{threat.name}</div>
                      <div className="threathunter_resultsmodal_threat_description">{threat.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="threathunter_resultsmodal_no_threats">No threats were correctly identified.</p>
            )}
          </div>
          
          {missedThreats.length > 0 && (
            <div className="threathunter_resultsmodal_details_section">
              <h3>Missed Threats</h3>
              <ul className="threathunter_resultsmodal_threats_list missed">
                {missedThreats.map((threat, index) => (
                  <li key={index} className="threathunter_resultsmodal_threat_item">
                    <FaTimes className="threathunter_resultsmodal_threat_icon missed" />
                    <div className="threathunter_resultsmodal_threat_info">
                      <div className="threathunter_resultsmodal_threat_name">{threat.name}</div>
                      <div className="threathunter_resultsmodal_threat_description">{threat.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="threathunter_resultsmodal_feedback_section">
          <h3>Analysis Feedback</h3>
          <p>{feedback}</p>
        </div>
        
        <div className="threathunter_resultsmodal_actions">
          <button className="threathunter_resultsmodal_restart_button" onClick={onRestart}>
            <FaRedo /> Try Again
          </button>
          <button className="threathunter_resultsmodal_home_button" onClick={onClose}>
            <FaHome /> Choose New Scenario
          </button>
          
          <div className="threathunter_resultsmodal_share_container">
            <span>Share your results:</span>
            <button className="threathunter_resultsmodal_twitter_share">
              <FaTwitter />
            </button>
            <button className="threathunter_resultsmodal_linkedin_share">
              <FaLinkedin />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatResultsModal;
