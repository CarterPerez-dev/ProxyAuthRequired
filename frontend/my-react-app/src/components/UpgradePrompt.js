// src/components/UpgradePrompt.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaLock, FaTrophy, FaExclamationCircle, FaArrowRight, FaInfoCircle, FaUserSecret } from 'react-icons/fa';
import './UpgradePrompt.css'; // You'll need to create this CSS file

const UpgradePrompt = ({ feature }) => {
  const navigate = useNavigate();
  const { practiceQuestionsRemaining } = useSelector((state) => state.user);
  
  const getFeatureInfo = () => {
    switch (feature) {
      case 'premium':
        return {
          title: 'Premium Feature',
          message: 'This feature is only available with a premium subscription.',
          icon: <FaLock className="upgrade-prompt-icon" />
        };
      case 'questions':
        return {
          title: 'Question Limit Reached',
          message: 'You\'ve used all of your free practice questions.',
          icon: <FaExclamationCircle className="upgrade-prompt-icon" />
        };
      case 'daily':
        return {
          title: 'Premium Feature',
          message: 'Answering daily questions is only available with a premium subscription.',
          icon: <FaLock className="upgrade-prompt-icon" />
        };
      case 'resources':
        return {
          title: 'Premium Feature',
          message: 'Accessing resource links is only available with a premium subscription.',
          icon: <FaLock className="upgrade-prompt-icon" />
        };
      case 'xploitcraft':
        return {
          title: 'Unlock XploitCraft',
          message: 'XploitCraft is a premium tool for exploring cybersecurity exploits and vulnerabilities.',
          icon: <FaUserSecret className="upgrade-prompt-icon" />
        };
      case 'scenariosphere':
        return {
          title: 'Unlock ScenarioSphere',
          message: 'ScenarioSphere is a premium tool for generating realistic cybersecurity scenarios.',
          icon: <FaLock className="upgrade-prompt-icon" />
        };
      case 'grc':
        return {
          title: 'Unlock GRC Wizard',
          message: 'GRC Wizard is a premium tool for learning about Governance, Risk, and Compliance.',
          icon: <FaLock className="upgrade-prompt-icon" />
        };
      default:
        return {
          title: 'Premium Feature',
          message: 'This feature requires a premium subscription.',
          icon: <FaLock className="upgrade-prompt-icon" />
        };
    }
  };
  
  const { title, message, icon } = getFeatureInfo();
  
  return (
    <div className="upgrade-prompt-container">
      <div className="upgrade-prompt-card">
        <div className="upgrade-prompt-header">
          {icon}
          <h2 className="upgrade-prompt-title">{title}</h2>
          <p className="upgrade-prompt-message">{message}</p>
        </div>
        
        <div className="upgrade-prompt-features">
          <h3 className="upgrade-prompt-features-title">
            <FaTrophy className="upgrade-prompt-features-icon" />
            With Premium Subscription You Get:
          </h3>
          
          <ul className="upgrade-prompt-feature-list">
            <li className="upgrade-prompt-feature-item">
              <span className="upgrade-prompt-feature-check">✓</span>
              <span>Unlimited practice questions</span>
            </li>
            <li className="upgrade-prompt-feature-item">
              <span className="upgrade-prompt-feature-check">✓</span>
              <span>Access to ScenarioSphere, GRC Wizard & XploitCraft</span>
            </li>
            <li className="upgrade-prompt-feature-item">
              <span className="upgrade-prompt-feature-check">✓</span>
              <span>Interactive daily questions with rewards</span>
            </li>
            <li className="upgrade-prompt-feature-item">
              <span className="upgrade-prompt-feature-check">✓</span>
              <span>Full access to all Resource Hub links</span>
            </li>
          </ul>
        </div>
        
        <div className="upgrade-prompt-trial">
          <FaInfoCircle className="upgrade-prompt-trial-icon" />
          <p>Start with a 3-day free trial - cancel anytime</p>
        </div>
        
        <div className="upgrade-prompt-actions">
          <button 
            className="upgrade-prompt-button"
            onClick={() => navigate('/subscription')}
          >
            <span>Upgrade to Premium</span>
            <FaArrowRight className="upgrade-prompt-button-icon" />
          </button>
          
          <button
            className="upgrade-prompt-back-button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePrompt;
