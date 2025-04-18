// src/components/pages/games/CipherChallenge/CipherChallenge.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCipherChallenges, 
  submitSolution, 
  resetCurrentChallenge,
  unlockNextLevel
} from '../../store/slice/cipherChallengeSlice';
import { FaLock, FaLockOpen, FaKey, FaQuestionCircle, FaBrain, FaMedal } from 'react-icons/fa';
import CipherDisplay from './CipherDisplay';
import CipherInput from './CipherInput';
import CipherHints from './CipherHints';
import CipherTools from './CipherTools';
import LevelSelector from './LevelSelector';
import CipherInfoModal from './CipherInfoModal';
import CongratulationsModal from './CongratulationsModal';
import './CipherChallenge.css';

const CipherChallenge = () => {
  const dispatch = useDispatch();
  const { 
    challenges, 
    currentChallenge, 
    completedChallenges, 
    maxUnlockedLevel,
    loading, 
    error,
    hintUsed
  } = useSelector(state => state.cipherChallenge);
  const { userId } = useSelector(state => state.user);
  
  const [userSolution, setUserSolution] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [congratsData, setCongratsData] = useState(null);
  
  // Load challenges when component mounts
  useEffect(() => {
    if (challenges.length === 0) {
      dispatch(fetchCipherChallenges());
    }
  }, [dispatch, challenges.length]);
  
  // Reset user solution when current challenge changes
  useEffect(() => {
    setUserSolution('');
    setFeedbackMessage(null);
  }, [currentChallenge]);
  
  const handleSolutionChange = (value) => {
    setUserSolution(value);
    
    // Clear feedback when user types
    if (feedbackMessage) {
      setFeedbackMessage(null);
    }
  };
  
  const handleSubmitSolution = () => {
    if (!currentChallenge) return;
    
    // Normalize both strings for comparison
    const normalizedUserSolution = userSolution.trim().toLowerCase();
    const normalizedCorrectSolution = currentChallenge.solution.trim().toLowerCase();
    
    if (normalizedUserSolution === normalizedCorrectSolution) {
      // Solution is correct
      const wasAlreadyCompleted = completedChallenges.includes(currentChallenge.id);
      
      // Dispatch action to mark challenge as completed
      dispatch(submitSolution({
        userId,
        challengeId: currentChallenge.id,
        levelId: currentChallenge.levelId,
        hintUsed,
        timeSpent: 0, // TODO: Add timer functionality
      })).then((resultAction) => {
        if (submitSolution.fulfilled.match(resultAction)) {
          // Show success message
          setFeedbackMessage({
            type: 'success',
            message: 'Correct! You\'ve cracked the cipher.'
          });
          
          // Check if this unlocks a new level
          const allChallengesInLevelCompleted = challenges
            .filter(challenge => challenge.levelId === currentChallenge.levelId)
            .every(challenge => 
              completedChallenges.includes(challenge.id) || challenge.id === currentChallenge.id
            );
          
          if (allChallengesInLevelCompleted && currentChallenge.levelId < 5) {
            // Unlock next level
            dispatch(unlockNextLevel(currentChallenge.levelId + 1));
            
            // Show congratulations modal
            setCongratsData({
              levelCompleted: currentChallenge.levelId,
              newLevelUnlocked: currentChallenge.levelId + 1,
              xpEarned: wasAlreadyCompleted ? 10 : 50,
              coinsEarned: wasAlreadyCompleted ? 5 : 25
            });
            setShowCongratulations(true);
          }
        }
      });
    } else {
      // Solution is incorrect
      setFeedbackMessage({
        type: 'error',
        message: 'Incorrect solution. Try again!'
      });
    }
  };
  
  const handleSelectLevel = (levelId) => {
    // Find the first uncompleted challenge in the selected level
    const uncompletedChallenge = challenges
      .filter(challenge => challenge.levelId === levelId)
      .find(challenge => !completedChallenges.includes(challenge.id));
    
    if (uncompletedChallenge) {
      dispatch(resetCurrentChallenge(uncompletedChallenge));
    } else {
      // If all challenges in the level are completed, select the first one
      const firstChallengeInLevel = challenges
        .filter(challenge => challenge.levelId === levelId)
        .sort((a, b) => a.id - b.id)[0];
      
      if (firstChallengeInLevel) {
        dispatch(resetCurrentChallenge(firstChallengeInLevel));
      }
    }
  };
  
  const handleSelectChallenge = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      dispatch(resetCurrentChallenge(challenge));
    }
  };
  
  const handleToolSelect = (toolName) => {
    setActiveTool(activeTool === toolName ? null : toolName);
  };
  
  if (loading && challenges.length === 0) {
    return <div className="cipher-loading">Loading cipher challenges...</div>;
  }
  
  if (error) {
    return <div className="cipher-error">Error: {error}</div>;
  }
  
  return (
    <div className="cipher-challenge-container">
      <div className="cipher-header">
        <h1><FaKey /> Cipher Challenge</h1>
        <p>Decode cryptographic messages and unlock the secrets!</p>
        <button 
          className="info-button"
          onClick={() => setShowInfo(true)}
          aria-label="Show information about cipher types"
        >
          <FaQuestionCircle /> About Ciphers
        </button>
      </div>
      
      <div className="cipher-content">
        <div className="cipher-sidebar">
          <LevelSelector 
            levels={[1, 2, 3, 4, 5]}
            maxUnlockedLevel={maxUnlockedLevel}
            challenges={challenges}
            completedChallenges={completedChallenges}
            currentChallenge={currentChallenge}
            onSelectLevel={handleSelectLevel}
            onSelectChallenge={handleSelectChallenge}
          />
          
          <div className="cipher-tools-container">
            <h3><FaBrain /> Cipher Tools</h3>
            <CipherTools 
              activeTool={activeTool}
              onToolSelect={handleToolSelect}
              cipherType={currentChallenge?.cipherType}
              ciphertext={currentChallenge?.ciphertext || ''}
            />
          </div>
        </div>
        
        <div className="cipher-main">
          {currentChallenge ? (
            <>
              <div className="challenge-header">
                <h2>
                  {completedChallenges.includes(currentChallenge.id) ? (
                    <><FaLockOpen className="unlocked-icon" /> </>
                  ) : (
                    <><FaLock className="locked-icon" /> </>
                  )}
                  {currentChallenge.title}
                </h2>
                <div className="challenge-metadata">
                  <span className="challenge-type">
                    Cipher Type: {currentChallenge.cipherType}
                  </span>
                  <span className="challenge-difficulty">
                    Difficulty: {Array(currentChallenge.difficulty).fill('★').join('')}
                  </span>
                </div>
              </div>
              
              <div className="challenge-description">
                {currentChallenge.description}
              </div>
              
              <CipherDisplay 
                ciphertext={currentChallenge.ciphertext}
                cipherType={currentChallenge.cipherType}
              />
              
              <CipherHints 
                hints={currentChallenge.hints}
                challengeId={currentChallenge.id}
              />
              
              <CipherInput
                value={userSolution}
                onChange={handleSolutionChange}
                onSubmit={handleSubmitSolution}
                feedback={feedbackMessage}
                isCompleted={completedChallenges.includes(currentChallenge.id)}
              />
              
              {activeTool && (
                <div className="active-tool-display">
                  <h3>{activeTool} Analysis</h3>
                  {/* Tool-specific content rendered by CipherTools component */}
                </div>
              )}
            </>
          ) : (
            <div className="no-challenge-selected">
              <h2>Select a Challenge</h2>
              <p>Choose a cipher challenge from the menu on the left to begin.</p>
              <div className="cipher-introduction">
                <h3><FaMedal /> How to Play</h3>
                <ul>
                  <li>Each challenge presents you with an encoded message.</li>
                  <li>Your task is to decrypt the message and submit the solution.</li>
                  <li>Start with easier ciphers like Caesar and work your way up to more complex ones.</li>
                  <li>Use the provided tools to help analyze the ciphertext.</li>
                  <li>Unlock higher levels by completing challenges.</li>
                  <li>Earn XP and coins for each solved cipher!</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showInfo && (
        <CipherInfoModal onClose={() => setShowInfo(false)} />
      )}
      
      {showCongratulations && congratsData && (
        <CongratulationsModal 
          data={congratsData}
          onClose={() => setShowCongratulations(false)}
        />
      )}
    </div>
  );
};

export default CipherChallenge;
