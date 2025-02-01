// components/pages/testpage/APlusTestPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";

// Redux actions (from your userSlice)
import {
  dailyLoginBonus,
  addXP,
  addCoins
} from "../store/userSlice";

import ConfettiAnimation from "./ConfettiAnimation";
import "./APlusStyles.css";

const APlusTestPage = () => {
  // -------------------- ROUTER HOOKS --------------------
  const { testId } = useParams();
  const navigate = useNavigate();

  // -------------------- REDUX --------------------
  const dispatch = useDispatch();
  const { xp, level, coins, userId } = useSelector((state) => state.user);

  // -------------------- LOCAL STATE --------------------
  const [currentTest, setCurrentTest] = useState(null);
  const [loadingTest, setLoadingTest] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScoreOverlay, setShowScoreOverlay] = useState(false);
  const [showReviewMode, setShowReviewMode] = useState(false);

  // For level-up overlay
  const [localLevel, setLocalLevel] = useState(level);
  const [showLevelUpOverlay, setShowLevelUpOverlay] = useState(false);

  // -------------------- EFFECT: Fetch Test Data --------------------
  useEffect(() => {
    const fetchTestData = async () => {
      setLoadingTest(true);
      try {
        // Use endpoint matching our blueprint registration
        const response = await fetch(`/api/test/tests/${testId}`);
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            errorData = { error: "Unknown error from server." };
          }
          throw new Error(errorData.error || "Failed to fetch test data");
        }
        const data = await response.json();
        setCurrentTest(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingTest(false);
      }
    };

    fetchTestData();
  }, [testId]);

  // -------------------- EFFECT: Daily Login Bonus --------------------
  useEffect(() => {
    if (userId) {
      dispatch(dailyLoginBonus(userId));
    }
  }, [dispatch, userId]);

  // -------------------- EFFECT: Check for Level Up --------------------
  useEffect(() => {
    if (level > localLevel) {
      setLocalLevel(level);
      setShowLevelUpOverlay(true);
      const timer = setTimeout(() => setShowLevelUpOverlay(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [level, localLevel]);

  // -------------------- EARLY RETURNS --------------------
  if (loadingTest) {
    return <div style={{ color: "#fff" }}>Loading test...</div>;
  }
  if (error) {
    return (
      <div style={{ color: "#fff" }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }
  if (!currentTest) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: "2rem" }}>
        <h2>This test is not yet available!</h2>
        <button
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/practice-tests/a-plus")}
        >
          Back to Test List
        </button>
      </div>
    );
  }

  const totalQuestions = currentTest.questions.length;
  const questionData = currentTest.questions[currentQuestionIndex];

  // -------------------- HANDLERS --------------------
  const handleOptionClick = (optionIndex) => {
    if (isAnswered) return;

    setSelectedOptionIndex(optionIndex);
    const isCorrect = optionIndex === questionData.correctAnswerIndex;

    if (isCorrect) {
      setScore(prev => prev + 1);
      if (userId) {
        dispatch(addXP({ userId, xp: currentTest.xpPerCorrect }));
        dispatch(addCoins({ userId, coins: 5 }));
      }
    }

    setAnswers(prev => [
      ...prev,
      {
        questionId: questionData.id,
        userAnswerIndex: optionIndex,
        correctAnswerIndex: questionData.correctAnswerIndex,
      },
    ]);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      setShowScoreOverlay(true);
      return;
    }
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
  };

  const handleRestartTest = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setScore(0);
    setShowScoreOverlay(false);
    setAnswers([]);
  };

  const handleReviewAnswers = () => setShowReviewMode(true);
  const handleCloseReview = () => setShowReviewMode(false);

  // -------------------- OVERLAYS --------------------
  const renderScoreOverlay = () => {
    if (!showScoreOverlay) return null;
    return (
      <div className="score-overlay">
        <div className="score-content">
          <h2 className="score-title">Test Complete!</h2>
          <p className="score-details">
            You answered <strong>{score}</strong> / <strong>{totalQuestions}</strong> correctly.
          </p>
          <button className="restart-button" onClick={handleRestartTest}>
            Restart Test
          </button>
          <button className="review-button" onClick={handleReviewAnswers}>
            Review Answers
          </button>
          {Number(testId) < 9999 && (
            <button
              className="next-test-button"
              onClick={() => navigate(`/practice-tests/a-plus/${Number(testId) + 1}`)}
            >
              Next Test
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderReviewMode = () => {
    if (!showReviewMode) return null;
    return (
      <div className="score-overlay" style={{ overflowY: "auto" }}>
        <div className="score-content" style={{ maxWidth: "700px" }}>
          <h2 className="score-title">Review Mode</h2>
          <p className="score-details">Here are your answers:</p>
          <div className="review-mode-container">
            {currentTest.questions.map((q) => {
              const userAnswer = answers.find(a => a.questionId === q.id);
              if (!userAnswer) return null;
              const isCorrect = userAnswer.userAnswerIndex === q.correctAnswerIndex;
              return (
                <div key={q.id} className="review-question-card">
                  <h3>Q{q.id}: {q.question}</h3>
                  <p><strong>Your Answer:</strong> {q.options[userAnswer.userAnswerIndex]}</p>
                  <p><strong>Correct Answer:</strong> {q.options[q.correctAnswerIndex]}</p>
                  <p style={{ color: isCorrect ? "#8BC34A" : "#F44336" }}>
                    {isCorrect ? "Correct!" : "Incorrect!"}
                  </p>
                  <p>{q.explanation}</p>
                </div>
              );
            })}
          </div>
          <button className="review-button" onClick={handleCloseReview}>
            Close Review
          </button>
        </div>
      </div>
    );
  };

  const renderLevelUpOverlay = () => {
    if (!showLevelUpOverlay) return null;
    return (
      <div className="level-up-overlay">
        <div className="level-up-content">
          LEVEL UP! <br /> You are now Level {level}
        </div>
      </div>
    );
  };

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  const avatarUrl = level >= 5
    ? "https://via.placeholder.com/60/FF0000/FFFFFF?text=LVL5+Avatar"
    : "https://via.placeholder.com/60";

  return (
    <div className="aplus-test-container">
      <ConfettiAnimation trigger={showLevelUpOverlay} />
      {renderLevelUpOverlay()}
      {renderScoreOverlay()}
      {renderReviewMode()}
      <button style={{ margin: "1rem 0" }} onClick={() => navigate("/practice-tests/a-plus")}>
        Back to Test List
      </button>
      <h1 className="aplus-title">{currentTest.testName}</h1>
      <div className="top-bar">
        <div className="avatar-section">
          <div className="avatar-image" style={{ backgroundImage: `url(${avatarUrl})` }}></div>
          <div className="avatar-level">Lvl {level}</div>
        </div>
        <div className="xp-level-display">XP: {xp}</div>
        <div className="coins-display">Coins: {coins}</div>
      </div>
      <div className="progress-container">
        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}>
          {currentQuestionIndex + 1} / {totalQuestions}
        </div>
      </div>
      {!showScoreOverlay && !showReviewMode && (
        <div className="question-card">
          <div className="question-text">{questionData.question}</div>
          <ul className="options-list">
            {questionData.options.map((option, idx) => {
              let optionClass = "option-button";
              const correctIndex = questionData.correctAnswerIndex;
              if (isAnswered && idx === correctIndex) {
                optionClass += " correct-option";
              } else if (isAnswered && idx === selectedOptionIndex && idx !== correctIndex) {
                optionClass += " incorrect-option";
              }
              return (
                <li className="option-item" key={idx}>
                  <button className={optionClass} onClick={() => handleOptionClick(idx)} disabled={isAnswered}>
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
          {isAnswered && (
            <div className="explanation">
              <strong>{selectedOptionIndex === questionData.correctAnswerIndex ? "Correct!" : "Incorrect!"}</strong>
              <p>{questionData.explanation}</p>
            </div>
          )}
          {isAnswered && (
            <button className="next-button" onClick={handleNextQuestion}>
              {currentQuestionIndex === totalQuestions - 1 ? "Show My Score!" : "Next Question"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default APlusTestPage;

