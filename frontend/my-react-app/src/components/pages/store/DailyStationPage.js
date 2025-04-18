// src/components/pages/store/DailyStationPage.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { claimDailyBonus, setXPAndCoins, fetchUserData } from './slice/userSlice';
import './css/DailyStation.css';
import FormattedQuestion from '../../FormattedQuestion'; 
import UpgradePrompt from '../../UpgradePrompt';

// Icon imports
import {
  FaCoins,
  FaStar,
  FaTrophy,
  FaCalendarCheck,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
  FaChevronRight,
  FaSyncAlt,
  FaGift,
  FaLock,
  FaCrown
} from 'react-icons/fa';

// Helper to format seconds as HH:MM:SS
function formatCountdown(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((x) => String(x).padStart(2, '0')).join(':');
}

const DailyStationPage = () => {
  const dispatch = useDispatch();
  const { userId, username, coins, xp, lastDailyClaim, loading: userLoading, subscriptionActive } = useSelector((state) => state.user);

  // Local states
  const [bonusError, setBonusError] = useState(null);
  const [claimInProgress, setClaimInProgress] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [bonusCountdown, setBonusCountdown] = useState(24 * 3600); // 24 hours in seconds
  const [showButton, setShowButton] = useState(true);
  const [localLastClaim, setLocalLastClaim] = useState(null);

  const [loadingQ, setLoadingQ] = useState(true);
  const [qError, setQError] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);

  const [questionCountdown, setQuestionCountdown] = useState(0);
  
  // State for freemium functionality
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // Animations
  const [showBonusAnimation, setShowBonusAnimation] = useState(false);
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
  const [showWrongAnimation, setShowWrongAnimation] = useState(false);

  // Check if user can claim bonus on initial load
  useEffect(() => {
    if (userId) {
      // Check if there's a recent claim from the server or localStorage
      const storedLastClaim = localStorage.getItem(`lastClaim_${userId}`);
      const serverLastClaim = lastDailyClaim;
      
      const lastClaimDate = serverLastClaim || (storedLastClaim ? new Date(storedLastClaim) : null);
      
      if (lastClaimDate) {
        setLocalLastClaim(lastClaimDate);
        checkClaimStatus(lastClaimDate);
      } else {
        // No previous claim found, so show button
        setShowButton(true);
      }
    }
  }, [userId, lastDailyClaim]);

  // Check claim status helper function
  function checkClaimStatus(lastClaimDate) {
    const now = new Date();
    const lastClaimTime = new Date(lastClaimDate).getTime();
    const diffMs = now - lastClaimTime;
    
    if (diffMs >= 24 * 60 * 60 * 1000) {
      // It's been 24 hours, show button
      setShowButton(true);
    } else {
      // Less than 24 hours, show countdown
      setShowButton(false);
      const secondsRemaining = Math.floor((24 * 60 * 60 * 1000 - diffMs) / 1000);
      setBonusCountdown(secondsRemaining);
    }
  }

  // Bonus countdown logic (runs every second)
  useEffect(() => {
    if (!showButton && localLastClaim) {
      function tickBonus() {
        const now = new Date();
        const lastClaimTime = new Date(localLastClaim).getTime();
        const diffMs = now - lastClaimTime;
        
        if (diffMs >= 24 * 60 * 60 * 1000) {
          // It's been 24 hours, show button
          setShowButton(true);
          setBonusCountdown(0);
        } else {
          // Less than 24 hours, update countdown
          const secondsRemaining = Math.floor((24 * 60 * 60 * 1000 - diffMs) / 1000);
          setBonusCountdown(secondsRemaining);
        }
      }
      
      tickBonus(); // Run immediately
      const bonusInterval = setInterval(tickBonus, 1000);
      return () => clearInterval(bonusInterval);
    }
  }, [localLastClaim, showButton]);

  // Daily question refresh countdown logic
  useEffect(() => {
    function tickQuestion() {
      const now = new Date();
      const nextMidnightUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
      const diff = Math.floor((nextMidnightUTC - now) / 1000);
      setQuestionCountdown(diff);
    }
    
    tickQuestion(); // Run immediately
    const questionInterval = setInterval(tickQuestion, 1000);
    return () => clearInterval(questionInterval);
  }, []);

  // Fetch daily question if user is logged in
  useEffect(() => {
    if (userId) {
      fetchDailyQuestion();
    } else {
      setLoadingQ(false);
    }
  }, [userId]);

  // Claim daily bonus - THIS IS THE KEY FUNCTION WE'RE FIXING
  const handleClaimDailyBonus = async () => {
    if (!userId) {
      setBonusError('Please log in first.');
      return;
    }
    
    // IMMEDIATELY hide button and show countdown - this is the key fix
    setShowButton(false);
    setClaimInProgress(true);
    setBonusError(null);
    
    // Set last claim time to now and store it both in state and localStorage
    const now = new Date();
    setLocalLastClaim(now);
    localStorage.setItem(`lastClaim_${userId}`, now.toISOString());
    
    // Start the countdown immediately
    setBonusCountdown(24 * 60 * 60); // 24 hours in seconds
    
    try {
      // Now we make the API call
      const res = await fetch(`/api/test/user/${userId}/daily-bonus`, {
        method: 'POST'
      });
      const data = await res.json();
      
      setClaimInProgress(false);
      
      if (data.success) {
        // Show success animation
        setShowBonusAnimation(true);
        setTimeout(() => setShowBonusAnimation(false), 3000);
        setClaimed(true);
        
        // Update the user data in Redux
        dispatch(fetchUserData(userId));
      } else {
        // Server says already claimed
        setBonusError(data.message);
        // Don't change UI state - keep showing countdown
      }
    } catch (err) {
      setBonusError('Error: ' + err.message);
      setClaimInProgress(false);
      // Even if there's an error, keep showing the countdown
    }
  };

  // Fetch daily question
  const fetchDailyQuestion = async () => {
    setLoadingQ(true);
    setQError(null);
    
    try {
      const res = await fetch(`/api/test/daily-question?userId=${userId}`);
      const data = await res.json();
      
      if (!res.ok) {
        setQError(data.error || 'Failed to fetch daily question');
      } else {
        setQuestionData(data);
      }
      
      setLoadingQ(false);
    } catch (err) {
      setQError('Error fetching daily question: ' + err.message);
      setLoadingQ(false);
    }
  };

  // Handle attempt to answer as free user
  const handlePremiumRequired = () => {
    setShowUpgradePrompt(true);
  };

  // Submit daily answer
  const submitDailyAnswer = async () => {
    // Check if user has premium subscription
    if (!subscriptionActive) {
      handlePremiumRequired();
      return;
    }
    
    if (!questionData || questionData.alreadyAnswered) {
      setQError("You've already answered today's question!");
      return;
    }
    
    if (selectedAnswer === null) {
      setQError('Please select an answer first.');
      return;
    }
    
    setQError(null);
    
    try {
      const body = {
        userId,
        dayIndex: questionData.dayIndex,
        selectedIndex: selectedAnswer
      };
      
      const res = await fetch('/api/test/daily-question/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const ansData = await res.json();
      
      if (!res.ok) {
        if (ansData.status === 'subscription_required') {
          // Handle subscription requirement from API
          handlePremiumRequired();
        } else {
          setQError(ansData.error || 'Error submitting answer.');
        }
      } else {
        setSubmitResult(ansData);
        
        dispatch(
          setXPAndCoins({
            xp: ansData.newXP || xp,
            coins: ansData.newCoins || coins
          })
        );
        
        setQuestionData((prev) => ({
          ...prev,
          alreadyAnswered: true
        }));

        if (ansData.correct) {
          setShowCorrectAnimation(true);
          setTimeout(() => setShowCorrectAnimation(false), 2000);
        } else {
          setShowWrongAnimation(true);
          setTimeout(() => setShowWrongAnimation(false), 2000);
        }
      }
    } catch (err) {
      setQError('Error: ' + err.message);
    }
  };

  // If upgrade prompt is shown, render that instead
  if (showUpgradePrompt) {
    return <UpgradePrompt feature="daily" />;
  }

  return (
    <div className="daily-station-container">
      {/* HEADER SECTION */}
      <div className="daily-station-header">
        <div className="daily-station-title">
          <h1>Daily Station</h1>
          <p>Claim your daily rewards and answer the challenge</p>
        </div>
        
        {userId && (
          <div className="daily-station-user-stats">
            <div className="daily-station-stat">
              <FaCoins className="daily-station-stat-icon coins" />
              <span className="daily-station-stat-value">{coins}</span>
            </div>
            <div className="daily-station-stat">
              <FaStar className="daily-station-stat-icon xp" />
              <span className="daily-station-stat-value">{xp}</span>
            </div>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="daily-station-content">
        {!userId ? (
          <div className="daily-station-login-required">
            <div className="daily-station-login-message">
              <FaLightbulb className="daily-station-login-icon" />
              <h2>Login Required</h2>
              <p>Please log in to claim daily rewards and participate in daily challenges.</p>
            </div>
          </div>
        ) : (
          <>
            {/* DAILY BONUS SECTION */}
            <div className="daily-station-card bonus-card">
              <div className="daily-station-card-header">
                <FaGift className="daily-station-card-icon" />
                <h2>Daily Bonus</h2>
              </div>
              
              <div className="daily-station-card-content">
                <div className="daily-station-bonus-info">
                  <div className="daily-station-bonus-value">
                    <FaCoins className="daily-station-bonus-coin-icon" />
                    <span>250</span>
                  </div>
                  <p>Claim your free coins every 24 hours!</p>
                </div>
                
                {/* Show error if any */}
                {bonusError && !bonusError.includes("Next bonus in") && (
                  <div className="daily-station-error">
                    <p>{bonusError}</p>
                  </div>
                )}
                
                {/* Claim Button or Countdown - THIS IS THE KEY UI PART */}
                <div className="daily-station-bonus-action">
                  {showButton ? (
                    <button 
                      className="daily-station-claim-btn"
                      onClick={handleClaimDailyBonus}
                      disabled={claimInProgress}
                    >
                      {claimInProgress ? (
                        <>
                          <FaSyncAlt className="loading-icon" />
                          <span>Claiming...</span>
                        </>
                      ) : (
                        <>
                          <FaCoins />
                          <span>Claim Bonus</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="daily-station-countdown">
                      <FaHourglassHalf className="daily-station-countdown-icon" />
                      <div className="daily-station-countdown-info">
                        <span className="daily-station-countdown-label">Next bonus in:</span>
                        <span className="daily-station-countdown-time">{formatCountdown(bonusCountdown)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* DAILY QUESTION SECTION */}
            <div className="daily-station-card question-card">
              <div className="daily-station-card-header">
                <FaLightbulb className="daily-station-card-icon" />
                <h2>Daily Challenge</h2>
                
                {/* Premium indicator for daily question */}
                {!subscriptionActive && (
                  <div className="daily-station-premium-badge">
                    <FaCrown className="daily-station-premium-icon" />
                    <span>Premium</span>
                  </div>
                )}
              </div>
              
              <div className="daily-station-card-content">
                {loadingQ ? (
                  <div className="daily-station-loading">
                    <FaSyncAlt className="loading-icon" />
                    <p>Loading challenge...</p>
                  </div>
                ) : qError ? (
                  <div className="daily-station-error">
                    <p>{qError}</p>
                  </div>
                ) : !questionData ? (
                  <div className="daily-station-empty">
                    <p>No challenges available today. Check back tomorrow!</p>
                  </div>
                ) : (
                  <div className={`daily-station-question ${showCorrectAnimation ? 'correct-animation' : ''} ${showWrongAnimation ? 'wrong-animation' : ''}`}>
                    <div className="daily-station-question-prompt">
                      {/* Replace direct paragraph with FormattedQuestion component */}
                      <FormattedQuestion questionText={questionData.prompt} />
                    </div>
                    
                    {questionData.alreadyAnswered ? (
                      <div className="daily-station-question-answered">
                        {submitResult && (
                          <div className={`daily-station-result ${submitResult.correct ? 'correct' : 'incorrect'}`}>
                            {submitResult.correct ? (
                              <>
                                <FaCheckCircle className="daily-station-result-icon" />
                                <p>Correct! You earned {submitResult.awardedCoins} coins.</p>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="daily-station-result-icon" />
                                <p>Not quite, but you still got {submitResult.awardedCoins} coins.</p>
                              </>
                            )}
                          </div>
                        )}
                        
                        {/* Explanation Section - Now using FormattedQuestion */}
                        {(questionData.explanation || (submitResult && submitResult.explanation)) && (
                          <div className="daily-station-explanation">
                            <h4>Explanation:</h4>
                            {/* Replace direct paragraph with FormattedQuestion component */}
                            <FormattedQuestion questionText={questionData.explanation || (submitResult && submitResult.explanation)} />
                          </div>
                        )}
                        
                        <div className="daily-station-next-question">
                          <div className="daily-station-countdown">
                            <FaCalendarCheck className="daily-station-countdown-icon" />
                            <div className="daily-station-countdown-info">
                              <span className="daily-station-countdown-label">Next challenge in:</span>
                              <span className="daily-station-countdown-time">{formatCountdown(questionCountdown)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="daily-station-question-options">
                        {!subscriptionActive && (
                          <div className="daily-station-premium-required">
                            <FaLock className="daily-station-lock-icon" />
                            <p>Premium subscription required to answer daily challenges</p>
                            <button 
                              className="daily-station-upgrade-btn"
                              onClick={handlePremiumRequired}
                            >
                              <FaCrown className="daily-station-upgrade-icon" />
                              <span>Upgrade to Premium</span>
                            </button>
                          </div>
                        )}
                        
                        <div className={`daily-station-options-list ${!subscriptionActive ? 'premium-locked' : ''}`}>
                          {questionData.options.map((option, index) => (
                            <label 
                              key={index} 
                              className={`daily-station-option ${selectedAnswer === index ? 'selected' : ''} ${!subscriptionActive ? 'disabled' : ''}`}
                            >
                              <input
                                type="radio"
                                name="dailyQuestion"
                                value={index}
                                checked={selectedAnswer === index}
                                onChange={() => subscriptionActive ? setSelectedAnswer(index) : handlePremiumRequired()}
                                className="daily-station-option-input"
                                disabled={!subscriptionActive}
                              />
                              <span className="daily-station-option-text">{option}</span>
                              {selectedAnswer === index && (
                                <FaChevronRight className="daily-station-option-indicator" />
                              )}
                            </label>
                          ))}
                        </div>
                        
                        <button 
                          className={`daily-station-submit-btn ${!subscriptionActive ? 'premium-required' : ''}`}
                          onClick={subscriptionActive ? submitDailyAnswer : handlePremiumRequired}
                          disabled={selectedAnswer === null || !subscriptionActive}
                        >
                          {subscriptionActive ? (
                            "Submit Answer"
                          ) : (
                            <>
                              <FaLock className="daily-station-lock-icon-sm" />
                              <span>Premium Required</span>
                            </>
                          )}
                        </button>
                        
                        <div className="daily-station-next-question">
                          <div className="daily-station-countdown">
                            <FaCalendarCheck className="daily-station-countdown-icon" />
                            <div className="daily-station-countdown-info">
                              <span className="daily-station-countdown-label">Challenge refreshes in:</span>
                              <span className="daily-station-countdown-time">{formatCountdown(questionCountdown)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* BONUS CLAIM ANIMATION OVERLAY */}
      {showBonusAnimation && (
        <div className="daily-station-overlay">
          <div className="daily-station-bonus-animation">
            <FaCoins className="daily-station-bonus-icon" />
            <div className="daily-station-bonus-text">
              <h3>Daily Bonus Claimed!</h3>
              <p>+250 coins added to your account</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Add CSS for new premium elements */}
      <style jsx>{`
        .daily-station-premium-badge {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #c19b4a, #f6e27a);
          color: #4a3800;
          font-size: 0.8rem;
          padding: 0.2rem 0.5rem;
          border-radius: 20px;
          margin-left: 1rem;
          font-weight: bold;
        }
        
        .daily-station-premium-icon {
          margin-right: 0.3rem;
        }
        
        .daily-station-premium-required {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          margin-bottom: 1rem;
          border: 1px dashed #c19b4a;
        }
        
        .daily-station-lock-icon {
          font-size: 2rem;
          color: #c19b4a;
          margin-bottom: 0.5rem;
        }
        
        .daily-station-lock-icon-sm {
          font-size: 1rem;
          margin-right: 0.3rem;
        }
        
        .daily-station-upgrade-btn {
          background: linear-gradient(135deg, #c19b4a, #f6e27a);
          color: #4a3800;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 50px;
          font-weight: bold;
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-top: 1rem;
          transition: all 0.2s;
        }
        
        .daily-station-upgrade-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(193, 155, 74, 0.3);
        }
        
        .daily-station-upgrade-icon {
          margin-right: 0.5rem;
        }
        
        .daily-station-options-list.premium-locked {
          opacity: 0.7;
          filter: blur(1px);
          pointer-events: none;
        }
        
        .daily-station-option.disabled {
          cursor: not-allowed;
        }
        
        .daily-station-submit-btn.premium-required {
          background: linear-gradient(135deg, #888, #ccc);
          cursor: pointer;
        }
        
        .daily-station-submit-btn.premium-required:hover {
          background: linear-gradient(135deg, #c19b4a, #f6e27a);
        }
      `}</style>
    </div>
  );
};

export default DailyStationPage;
