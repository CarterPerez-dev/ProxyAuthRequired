// src/components/PremiumUpgradePrompt.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaLock, 
  FaTrophy, 
  FaExclamationCircle, 
  FaArrowRight, 
  FaInfoCircle, 
  FaUserSecret,
  FaInfinity,
  FaClipboardCheck,
  FaCubes,
  FaRocket,
  FaShieldAlt,
  FaGem,
  FaTags
} from 'react-icons/fa';
import './UpgradePrompt.css';

const PremiumUpgradePrompt = ({ feature }) => {
  const navigate = useNavigate();
  const { practiceQuestionsRemaining } = useSelector((state) => state.user);
  
  // Close with escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        navigate(-1);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [navigate]);
  
  // Add body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  // Animation for particles
  useEffect(() => {
    // Create a subtle animation effect for the particles
    const particles = document.querySelectorAll('.premium-upgrade-particle');
    particles.forEach((particle, index) => {
      // Add a small random delay to each particle's animation
      const delay = Math.random() * 2;
      particle.style.animationDelay = `${delay}s`;
    });
  }, []);
  
  const getFeatureInfo = () => {
    switch (feature) {
      case 'premium':
        return {
          title: 'Premium Feature',
          message: 'This powerful feature is exclusive to premium subscribers. Upgrade now to unlock its full potential.',
          icon: <FaLock className="premium-upgrade-icon" />
        };
      case 'questions':
        return {
          title: 'Question Limit Reached',
          message: `You've used all ${practiceQuestionsRemaining === 0 ? 100 : practiceQuestionsRemaining} of your free practice questions. Upgrade to premium for unlimited questions.`,
          icon: <FaExclamationCircle className="premium-upgrade-icon" />
        };
      case 'daily':
        return {
          title: 'Daily Questions',
          message: 'Daily interactive questions with rewards are available exclusively for premium members.',
          icon: <FaClipboardCheck className="premium-upgrade-icon" />
        };
      case 'resources':
        return {
          title: 'Full Resource Access',
          message: 'Unlock our complete library of certification resources and study materials with a premium subscription.',
          icon: <FaRocket className="premium-upgrade-icon" />
        };
      case 'xploitcraft':
        return {
          title: 'Unlock XploitCraft',
          message: 'XploitCraft is an advanced simulation tool for mastering cybersecurity exploits and vulnerabilities.',
          icon: <FaUserSecret className="premium-upgrade-icon" />
        };
      case 'scenariosphere':
        return {
          title: 'Unlock ScenarioSphere',
          message: 'ScenarioSphere creates realistic cybersecurity scenarios to test and improve your skills in a safe environment.',
          icon: <FaCubes className="premium-upgrade-icon" />
        };
      case 'grc':
        return {
          title: 'Unlock GRC Wizard',
          message: 'GRC Wizard helps you master Governance, Risk, and Compliance concepts through interactive scenarios.',
          icon: <FaShieldAlt className="premium-upgrade-icon" />
        };
      default:
        return {
          title: 'Premium Feature',
          message: 'This advanced feature requires a premium subscription to access.',
          icon: <FaGem className="premium-upgrade-icon" />
        };
    }
  };
  
  const { title, message, icon } = getFeatureInfo();
  
  // Feature list content based on the current feature being accessed
  const getFeatureGridItems = () => {
    // Base features that appear for all upgrades
    const baseFeatures = [
      {
        icon: <FaInfinity />,
        text: "Unlimited practice questions"
      },
      {
        icon: <FaRocket />,
        text: "Interactive guided learning paths"
      }
    ];
    
    // Add feature-specific items
    switch (feature) {
      case 'questions':
        return [
          ...baseFeatures,
          {
            icon: <FaTags />,
            text: "Question categorization & tracking"
          },
          {
            icon: <FaClipboardCheck />,
            text: "Performance analytics & reports"
          }
        ];
      case 'daily':
        return [
          ...baseFeatures,
          {
            icon: <FaClipboardCheck />,
            text: "Daily challenges with rewards"
          },
          {
            icon: <FaTrophy />,
            text: "Daily streak achievements"
          }
        ];
      case 'resources':
        return [
          ...baseFeatures,
          {
            icon: <FaRocket />,
            text: "Full resource library access"
          },
          {
            icon: <FaShieldAlt />,
            text: "Premium study materials"
          }
        ];
      case 'xploitcraft':
      case 'scenariosphere':
      case 'grc':
        return [
          ...baseFeatures,
          {
            icon: <FaCubes />,
            text: "All interactive simulation tools"
          },
          {
            icon: <FaShieldAlt />,
            text: "Practical skill-building scenarios"
          }
        ];
      default:
        return [
          ...baseFeatures,
          {
            icon: <FaCubes />,
            text: "Full access to all tools & features"
          },
          {
            icon: <FaShieldAlt />,
            text: "Advanced certification preparation"
          }
        ];
    }
  };
  
  return (
    <div className="premium-upgrade-container">
      <div className="premium-upgrade-background"></div>
      <div className="premium-upgrade-grid"></div>
      <div className="premium-upgrade-glow"></div>
      <div className="premium-upgrade-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="premium-upgrade-particle"></div>
        ))}
      </div>
      
      <div className="premium-upgrade-card">
        <div className="premium-upgrade-header">
          <div className="premium-upgrade-logo-container">
            <div className="premium-upgrade-logo">
              {icon}
            </div>
            <div className="premium-upgrade-logo-pulse"></div>
          </div>
          <h2 className="premium-upgrade-title">{title}</h2>
          <p className="premium-upgrade-message">{message}</p>
        </div>
        
        <div className="premium-upgrade-features">
          <h3 className="premium-upgrade-features-title">
            <FaTrophy className="premium-upgrade-trophy-icon" />
            Premium Benefits
          </h3>
          
          <div className="premium-upgrade-feature-grid">
            {getFeatureGridItems().map((feature, index) => (
              <div key={index} className="premium-upgrade-feature-item">
                <div className="premium-upgrade-feature-icon-wrapper">
                  <span className="premium-upgrade-feature-icon">{feature.icon}</span>
                </div>
                <span className="premium-upgrade-feature-text">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="premium-upgrade-trial">
          <div className="premium-upgrade-trial-icon">
            <FaInfoCircle className="premium-upgrade-trial-info-icon" />
          </div>
          <p className="premium-upgrade-trial-text">
            Start with a <span className="premium-upgrade-trial-highlight">3-day free trial</span> - cancel anytime with no obligation
          </p>
        </div>
        
        <div className="premium-upgrade-actions">
          <button 
            className="premium-upgrade-button"
            onClick={() => navigate('/subscription')}
          >
            <span>Upgrade to Premium</span>
            <FaArrowRight className="premium-upgrade-button-icon" />
          </button>
          
          <button
            className="premium-upgrade-back-button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgradePrompt;
