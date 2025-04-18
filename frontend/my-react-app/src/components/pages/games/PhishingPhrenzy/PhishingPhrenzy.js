// src/components/pages/games/PhishingPhrenzy/PhishingPhrenzy.js
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShieldAlt, FaSkullCrossbones, FaClock, FaTrophy } from 'react-icons/fa';
import { 
  startGame, 
  endGame, 
  incrementScore, 
  decrementScore, 
  resetGame,
  fetchPhishingData
} from '../../store/slice/phishingPhrenzySlice';
import PhishingCard from './PhishingCard';
import GameOverModal from './GameOverModal';
import './PhishingPhrenzy.css';

const difficultySettings = {
  easy: { 
    timeLimit: 60, 
    penaltyTime: 2,
    bonusTime: 3,
    pointsPerCorrect: 10
  },
  medium: { 
    timeLimit: 45, 
    penaltyTime: 3,
    bonusTime: 2,
    pointsPerCorrect: 15
  },
  hard: { 
    timeLimit: 30, 
    penaltyTime: 5,
    bonusTime: 1,
    pointsPerCorrect: 20
  }
};

const PhishingPhrenzy = () => {
  const dispatch = useDispatch();
  const { phishingItems, gameStatus, score, highScore, loading, error } = useSelector(state => state.phishingPhrenzy);
  const { userId } = useSelector(state => state.user);
  
  const [currentItem, setCurrentItem] = useState(null);
  const [itemIndex, setItemIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  
  const timerRef = useRef(null);
  const settings = difficultySettings[difficulty];
  
  // Load phishing examples when component mounts
  useEffect(() => {
    dispatch(fetchPhishingData());
  }, [dispatch]);

  // Set up game when status changes to 'playing'
  useEffect(() => {
    if (gameStatus === 'playing') {
      setTimeLeft(settings.timeLimit);
      setItemIndex(0);
      setStreak(0);
      if (phishingItems.length > 0) {
        setCurrentItem(phishingItems[0]);
      }
    }
  }, [gameStatus, phishingItems, settings.timeLimit]);

  // Timer logic
  useEffect(() => {
    if (gameStatus === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleGameOver();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft <= 0 && gameStatus === 'playing') {
      handleGameOver();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStatus, timeLeft]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startNewGame = () => {
    dispatch(resetGame());
    dispatch(startGame());
  };

  const handleGameOver = () => {
    clearInterval(timerRef.current);
    dispatch(endGame(userId));
    setShowModal(true);
  };

  const handleAnswer = (answer) => {
    if (answered || !currentItem) return;
    
    setAnswered(true);
    const isCorrect = answer === currentItem.isPhishing;
    
    if (isCorrect) {
      dispatch(incrementScore(settings.pointsPerCorrect));
      setFeedback({
        type: 'correct',
        message: `+${settings.pointsPerCorrect} points! ${currentItem.isPhishing ? 'This was phishing!' : 'This was legitimate!'}`
      });
      
      // Handle streak
      setStreak(prev => prev + 1);
      
      // Add bonus time if on a streak
      if (streak >= 2) {
        const bonusTime = Math.min(streak, 5) * settings.bonusTime;
        setTimeLeft(prev => prev + bonusTime);
        setFeedback(prev => ({
          ...prev,
          message: `${prev.message} Streak bonus: +${bonusTime}s!`
        }));
      }
    } else {
      dispatch(decrementScore(Math.floor(settings.pointsPerCorrect / 2)));
      setTimeLeft(prev => Math.max(1, prev - settings.penaltyTime));
      setFeedback({
        type: 'incorrect',
        message: `Incorrect! -${settings.penaltyTime}s penalty. ${currentItem.isPhishing ? 'This was phishing!' : 'This was legitimate!'}`
      });
      setStreak(0);
    }
    
    // Wait to show the next item
    setTimeout(() => {
      if (itemIndex < phishingItems.length - 1) {
        setItemIndex(prev => prev + 1);
        setCurrentItem(phishingItems[itemIndex + 1]);
        setAnswered(false);
        setFeedback(null);
      } else {
        // Ran out of items, end the game
        handleGameOver();
      }
    }, 1500);
  };

  const getTimerColor = () => {
    if (timeLeft > settings.timeLimit * 0.6) return 'green';
    if (timeLeft > settings.timeLimit * 0.3) return 'orange';
    return 'red';
  };

  if (loading) {
    return <div className="phishingphrenzy_loading">Loading game data...</div>;
  }

  if (error) {
    return <div className="phishingphrenzy_error">Error loading game: {error}</div>;
  }

  return (
    <div className="phishingphrenzy_main_container">
      <div className="phishingphrenzy_header_section">
        <h1><FaShieldAlt /> Phishing Phrenzy</h1>
        <p>Quickly identify phishing attempts before time runs out!</p>
      </div>
      
      {gameStatus === 'idle' ? (
        <div className="phishingphrenzy_start_screen">
          <h2>Ready to test your phishing detection skills?</h2>
          <p>You'll be shown various emails, messages, and websites. Quickly decide if they're legitimate or phishing attempts.</p>
          
          <div className="phishingphrenzy_difficulty_selector">
            <h3>Select Difficulty:</h3>
            <div className="phishingphrenzy_difficulty_buttons">
              <button 
                className={difficulty === 'easy' ? 'active' : ''} 
                onClick={() => setDifficulty('easy')}
              >
                Easy
              </button>
              <button 
                className={difficulty === 'medium' ? 'active' : ''} 
                onClick={() => setDifficulty('medium')}
              >
                Medium
              </button>
              <button 
                className={difficulty === 'hard' ? 'active' : ''} 
                onClick={() => setDifficulty('hard')}
              >
                Hard
              </button>
            </div>
            <div className="phishingphrenzy_difficulty_details">
              <p>Time Limit: {difficultySettings[difficulty].timeLimit} seconds</p>
              <p>Points Per Correct: {difficultySettings[difficulty].pointsPerCorrect}</p>
              <p>Time Penalty: -{difficultySettings[difficulty].penaltyTime} seconds</p>
            </div>
          </div>
          
          <button className="phishingphrenzy_start_game_button" onClick={startNewGame}>
            Start Game
          </button>
          
          <div className="phishingphrenzy_high_score_display">
            <FaTrophy /> Your High Score: {highScore}
          </div>
        </div>
      ) : (
        <div className="phishingphrenzy_gameplay">
          <div className="phishingphrenzy_game_stats">
            <div className="phishingphrenzy_timer">
              <FaClock /> Time: <span style={{ color: getTimerColor() }}>{timeLeft}</span>
            </div>
            <div className="phishingphrenzy_score">
              Score: {score}
            </div>
            <div className="phishingphrenzy_streak">
              Streak: {streak > 0 ? `${streak} 🔥` : '0'}
            </div>
          </div>
          
          {currentItem && (
            <>
              <PhishingCard item={currentItem} />
              
              <div className="phishingphrenzy_answer_buttons">
                <button 
                  className="phishingphrenzy_legitimate_button"
                  onClick={() => handleAnswer(false)}
                  disabled={answered}
                >
                  Legitimate
                </button>
                <button 
                  className="phishingphrenzy_phishing_button"
                  onClick={() => handleAnswer(true)}
                  disabled={answered}
                >
                  <FaSkullCrossbones /> Phishing
                </button>
              </div>
              
              {feedback && (
                <div className={`phishingphrenzy_feedback ${feedback.type}`}>
                  {feedback.message}
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {showModal && (
        <GameOverModal 
          score={score} 
          highScore={highScore}
          onClose={() => setShowModal(false)}
          onPlayAgain={startNewGame}
        />
      )}
    </div>
  );
};

export default PhishingPhrenzy
