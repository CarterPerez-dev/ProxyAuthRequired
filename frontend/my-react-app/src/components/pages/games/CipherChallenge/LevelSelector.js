// src/components/pages/games/CipherChallenge/LevelSelector.js
import React, { useState } from 'react';
import { FaLock, FaLockOpen, FaCheckCircle, FaStar } from 'react-icons/fa';
import './LevelSelector.css';

const LevelSelector = ({ 
  levels, 
  maxUnlockedLevel, 
  challenges, 
  completedChallenges, 
  currentChallenge,
  onSelectLevel,
  onSelectChallenge
}) => {
  const [activeLevel, setActiveLevel] = useState(null);
  
  // Group challenges by level
  const challengesByLevel = {};
  levels.forEach(level => {
    challengesByLevel[level] = challenges.filter(c => c.levelId === level);
  });
  
  const handleLevelClick = (level) => {
    // If the level is locked, don't do anything
    if (level > maxUnlockedLevel) return;
    
    // Toggle active level
    if (activeLevel === level) {
      setActiveLevel(null);
    } else {
      setActiveLevel(level);
      onSelectLevel(level);
    }
  };
  
  const handleChallengeClick = (challenge) => {
    onSelectChallenge(challenge.id);
  };
  
  // Calculate completion percentage for each level
  const getCompletionPercentage = (level) => {
    const levelChallenges = challengesByLevel[level] || [];
    if (levelChallenges.length === 0) return 0;
    
    const completedCount = levelChallenges.filter(c => 
      completedChallenges.includes(c.id)
    ).length;
    
    return Math.round((completedCount / levelChallenges.length) * 100);
  };
  
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
    <div className="cipherchallenge_lvlselector_container">
      <h3>Cipher Levels</h3>
      
      <div className="cipherchallenge_lvlselector_levels_list">
        {levels.map(level => {
          const isLocked = level > maxUnlockedLevel;
          const isActive = activeLevel === level;
          const completionPercentage = getCompletionPercentage(level);
          const isComplete = completionPercentage === 100;
          
          return (
            <div key={level} className="cipherchallenge_lvlselector_level_container">
              <div 
                className={`cipherchallenge_lvlselector_level_item ${isLocked ? 'locked' : ''} ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
                onClick={() => handleLevelClick(level)}
              >
                <div className="cipherchallenge_lvlselector_level_icon">
                  {isLocked ? (
                    <FaLock className="cipherchallenge_lvlselector_lock_icon" />
                  ) : isComplete ? (
                    <FaCheckCircle className="cipherchallenge_lvlselector_complete_icon" />
                  ) : (
                    <FaLockOpen className="cipherchallenge_lvlselector_unlock_icon" />
                  )}
                </div>
                
                <div className="cipherchallenge_lvlselector_level_info">
                  <div className="cipherchallenge_lvlselector_level_name">{getLevelName(level)}</div>
                  <div className="cipherchallenge_lvlselector_level_difficulty">
                    {Array(level).fill().map((_, i) => (
                      <FaStar key={i} className="cipherchallenge_lvlselector_level_star" />
                    ))}
                  </div>
                </div>
                
                <div className="cipherchallenge_lvlselector_level_progress">
                  <div className="cipherchallenge_lvlselector_progress_bar">
                    <div 
                      className="cipherchallenge_lvlselector_progress_fill"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                  <div className="cipherchallenge_lvlselector_progress_text">
                    {completionPercentage}%
                  </div>
                </div>
              </div>
              
              {isActive && challengesByLevel[level] && (
                <div className="cipherchallenge_lvlselector_challenges_list">
                  {challengesByLevel[level].map(challenge => {
                    const isCompleted = completedChallenges.includes(challenge.id);
                    const isSelected = currentChallenge && currentChallenge.id === challenge.id;
                    
                    return (
                      <div 
                        key={challenge.id}
                        className={`cipherchallenge_lvlselector_challenge_item ${isCompleted ? 'completed' : ''} ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleChallengeClick(challenge)}
                      >
                        <div className="cipherchallenge_lvlselector_challenge_indicator">
                          {isCompleted ? (
                            <FaCheckCircle className="cipherchallenge_lvlselector_completed_icon" />
                          ) : (
                            <div className="cipherchallenge_lvlselector_challenge_number">{challenge.id}</div>
                          )}
                        </div>
                        <div className="cipherchallenge_lvlselector_challenge_name">
                          {challenge.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelector;
