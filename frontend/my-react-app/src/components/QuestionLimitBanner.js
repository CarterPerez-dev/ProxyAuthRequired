// src/components/QuestionLimitBanner.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import './QuestionLimitBanner.css'; // You'll need to create this CSS file

const QuestionLimitBanner = () => {
  const { subscriptionActive, practiceQuestionsRemaining } = useSelector(state => state.user);
  const navigate = useNavigate();
  
  // Don't show banner for premium users
  if (subscriptionActive) {
    return null;
  }
  
  // Determine progress percentage
  const progress = (practiceQuestionsRemaining / 100) * 100;
  
  return (
    <div className="question-limit-banner">
      <div className="question-limit-info">
        <FaInfoCircle className="question-limit-icon" />
        <div className="question-limit-text">
          <span className="question-limit-count">{practiceQuestionsRemaining}</span> free practice questions remaining
        </div>
      </div>
      
      <div className="question-limit-progress-container">
        <div 
          className="question-limit-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <button 
        className="question-limit-button"
        onClick={() => navigate('/subscription')}
      >
        <span>Upgrade for Unlimited</span>
        <FaArrowRight className="question-limit-button-icon" />
      </button>
    </div>
  );
};

export default QuestionLimitBanner;
