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
    <div className="level-selector">
      <h3>Cipher Levels</h3>
      
      <div className="levels-list">
        {levels.map(level => {
          const isLocked = level > maxUnlockedLevel;
          const isActive = activeLevel === level;
          const completionPercentage = getCompletionPercentage(level);
          const isComplete = completionPercentage === 100;
          
          return (
            <div key={level} className="level-container">
              <div 
                className={`level-item ${isLocked ? 'locked' : ''} ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
                onClick={() => handleLevelClick(level)}
              >
                <div className="level-icon">
                  {isLocked ? (
                    <FaLock className="lock-icon" />
                  ) : isComplete ? (
                    <FaCheckCircle className="complete-icon" />
                  ) : (
                    <FaLockOpen className="unlock-icon" />
                  )}
                </div>
                
                <div className="level-info">
                  <div className="level-name">{getLevelName(level)}</div>
                  <div className="level-difficulty">
                    {Array(level).fill().map((_, i) => (
                      <FaStar key={i} className="level-star" />
                    ))}
                  </div>
                </div>
                
                <div className="level-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {completionPercentage}%
                  </div>
                </div>
              </div>
              
              {isActive && challengesByLevel[level] && (
                <div className="challenges-list">
                  {challengesByLevel[level].map(challenge => {
                    const isCompleted = completedChallenges.includes(challenge.id);
                    const isSelected = currentChallenge && currentChallenge.id === challenge.id;
                    
                    return (
                      <div 
                        key={challenge.id}
                        className={`challenge-item ${isCompleted ? 'completed' : ''} ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleChallengeClick(challenge)}
                      >
                        <div className="challenge-indicator">
                          {isCompleted ? (
                            <FaCheckCircle className="completed-icon" />
                          ) : (
                            <div className="challenge-number">{challenge.id}</div>
                          )}
                        </div>
                        <div className="challenge-name">
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
