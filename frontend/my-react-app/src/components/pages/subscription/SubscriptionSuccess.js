// src/components/pages/subscription/SubscriptionSuccess.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { 
  FaCheckCircle, 
  FaSpinner, 
  FaTimesCircle, 
  FaTrophy, 
  FaSignInAlt,
  FaUser,
  FaArrowRight,
  FaShieldAlt,
  FaFighterJet
} from 'react-icons/fa';
import './css/SubscriptionSuccess.css';

const SubscriptionSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [isOauthFlow, setIsOauthFlow] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get session ID and user ID from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');
  const userId = searchParams.get('user_id');
  
  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        setError('Missing session information');
        setLoading(false);
        return;
      }
      
      try {
        // Verify the checkout session status
        const response = await axios.get(`/api/subscription/session-status?sessionId=${sessionId}`);
        
        if (response.data.status === 'complete' || response.data.paymentStatus === 'paid') {
          // Payment was successful
          
          // Determine if this is a new user registration or an existing user
          if (userId === 'new') {
            setIsNewUser(true);
            
            // Check if this is an OAuth flow
            // We'll use a flag from the session to determine this
            try {
              const checkOauth = await axios.get('/api/subscription/check-flow');
              setIsOauthFlow(checkOauth.data.isOauthFlow || false);
            } catch (err) {
              console.error('Error checking OAuth flow:', err);
              // Default to standard flow if we can't determine
              setIsOauthFlow(false);
            }
          }
          
          setLoading(false);
        } else {
          // Payment is still processing or failed
          setError('Your payment is still processing or could not be completed. Please check your payment details.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error verifying checkout session:', err);
        setError('Error verifying your subscription. Please contact support if your subscription is not active.');
        setLoading(false);
      }
    };
    
    verifySession();
  }, [sessionId, userId]);
  
  // Handle the next steps based on user status
  // Inside handleContinue of SubscriptionSuccess.js
  const handleContinue = () => {
    if (isNewUser) {
      if (isOauthFlow) {
        // OAuth flow - proceed to profile 
        navigate('/profile', {
          state: { 
            message: 'Your account has been created! You are using the free tier.' 
          }
        });
      } else {
        // Regular flow - proceed to login
        navigate('/login', { 
          state: { 
            message: 'Your account has been created! Please sign in with your credentials.' 
          }
        });
      }
    } else {
      // For existing users who upgraded to premium
      // Check if there's a return path in session storage
      const returnPath = sessionStorage.getItem('upgradeReturnPath');
      if (returnPath) {
        // Clear the storage and return to the original page
        sessionStorage.removeItem('upgradeReturnPath');
        navigate(returnPath, {
          state: {
            message: 'Your subscription has been activated successfully!'
          }
        });
      } else {
        // Default to profile if no return path
        navigate('/profile', {
          state: {
            message: 'Your subscription has been activated successfully!'
          }
        });
      }
    }
  };
  
  
  return (
    <div className="success-container">
      <div className="success-background">
        <div className="success-grid"></div>
        <div className="success-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="success-particle"></div>
          ))}
        </div>
        <div className="success-glow"></div>
      </div>
      
      <div className="success-content">
        <div className="success-card">
          <div className="success-card-accent"></div>
          
          {loading ? (
            <div className="success-loading">
              <div className="success-loading-icon">
                <FaSpinner className="success-spinner" />
              </div>
              <h2>Verifying your subscription...</h2>
              <p>Please wait while we complete your registration.</p>
              <div className="success-progress">
                <div className="success-progress-bar"></div>
              </div>
            </div>
          ) : error ? (
            <div className="success-error">
              <div className="success-error-icon">
                <FaTimesCircle />
              </div>
              <h2>Subscription Error</h2>
              <p>{error}</p>
              <div className="success-actions">
                <Link to="/subscription" className="success-button success-button-secondary">
                  Try Again
                </Link>
                <Link to="/contact" className="success-contact-link">
                  Contact Support
                </Link>
              </div>
            </div>
          ) : (
            <div className="success-confirmed">
              <div className="success-header">
                <div className="success-logo">
                  <FaCheckCircle className="success-logo-icon-primary" />
                  <FaShieldAlt className="success-logo-icon-secondary" />
                </div>
                <h1 className="success-title">Subscription Successful!</h1>
                <p className="success-subtitle">
                  Thank you for subscribing to CertGames Your account is now activated with full access to all features.
                </p>
              </div>
              
              <div className="success-benefits">
                <h3>
                  <FaFighterJet className="success-section-icon" />
                  <span>What You've Unlocked</span>
                </h3>
                <ul className="success-benefits-list">
                  <li>
                    <FaCheckCircle className="success-check-icon" />
                    <span>13,000+ practice questions across all certification paths</span>
                  </li>
                  <li>
                    <FaCheckCircle className="success-check-icon" />
                    <span>Unlimited access to all learning tools and features</span>
                  </li>
                  <li>
                    <FaCheckCircle className="success-check-icon" />
                    <span>Full gamification system with XP, achievements, and leaderboards</span>
                  </li>
                  <li>
                    <FaCheckCircle className="success-check-icon" />
                    <span>24/7 expert support for all your study questions</span>
                  </li>
                </ul>
              </div>
              
              <div className="success-next-steps">
                <h3>
                  <FaTrophy className="success-section-icon" />
                  <span>What's Next?</span>
                </h3>
                <p>
                  {isNewUser 
                    ? isOauthFlow
                      ? "You'll need to set up your username to complete your account setup."
                      : "You can now sign in to your new account using the credentials you provided during registration."
                    : "You can now access all premium features in your account."
                  }
                </p>
              </div>
              
              <button
                className="success-button success-button-primary"
                onClick={handleContinue}
              >
                {isNewUser 
                  ? isOauthFlow
                    ? <><FaUser className="success-button-icon" /> Complete Account Setup</>
                    : <><FaSignInAlt className="success-button-icon" /> Sign In to Your Account</>
                  : <><FaTrophy className="success-button-icon" /> Continue to Your Account</>
                }
                <FaArrowRight className="success-button-icon-right" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
