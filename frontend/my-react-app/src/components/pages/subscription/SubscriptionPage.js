// src/components/pages/subscription/SubscriptionPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../store/slice/userSlice';
import axios from 'axios';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaDragon,
  FaLock,
  FaCreditCard,
  FaInfoCircle,
  FaSpinner,
  FaArrowLeft,
  FaArrowRight,
  FaRedo,
  FaTrophy,
  FaMedal,
  FaGraduationCap,
  FaFighterJet,
  FaUserSecret,
  FaHome,
  FaCrown,
  FaCheckSquare,
  FaRegSquare,
  FaPlusSquare,
  FaChevronRight
} from 'react-icons/fa';
import './css/SubscriptionPage.css';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stripeConfig, setStripeConfig] = useState({});
  const [redirecting, setRedirecting] = useState(false);
  const [searchParams] = useSearchParams();
  const isRenewal = searchParams.get('renewal') === 'true';
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch here
  const { userId } = useSelector((state) => state.user);
  
  // Check if there's registration data in the location state
  const registrationData = location.state?.registrationData;
  const isOauthFlow = location.state?.isOauthFlow || false;
  
  // New state for showing continue with free option
  const [showContinueFree, setShowContinueFree] = useState(false);
  
  useEffect(() => {
    // Fetch Stripe configuration
    const fetchStripeConfig = async () => {
      try {
        const response = await axios.get('/api/subscription/config');
        setStripeConfig(response.data);
      } catch (err) {
        console.error('Error fetching Stripe configuration:', err);
        setError('Error loading payment configuration. Please try again.');
      }
    };
    
    fetchStripeConfig();
    
    // Show continue with free option if this is a new registration
    if (registrationData || isOauthFlow) {
      setShowContinueFree(true);
    }
  }, [registrationData, isOauthFlow]);
  
  const handleSubscribe = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Create a Stripe checkout session
      const response = await axios.post('/api/subscription/create-checkout-session', {
        userId: userId || null,
        registrationData: registrationData || null,
        isOauthFlow: isOauthFlow
      });
      
      // Set redirecting state to show feedback
      setRedirecting(true);
      
      // Redirect to Stripe Checkout page
      window.location.href = response.data.url;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError('Please navigate to certgames.com/register and create an account before attempting to subscribe.');
      setLoading(false);
    }
  };
  
  const handleGoBack = () => {
    if (registrationData) {
      // Go back to registration
      navigate('/register');
    } else if (userId) {
      // Go back to profile for existing users
      navigate('/profile');
    } else {
      // Default fallback
      navigate('/');
    }
  };

  // New function to handle continuing with free tier
  const handleContinueFree = async () => {
    setLoading(true);
    
    try {
      if (registrationData) {
        // For new registration, create the user account without subscribing
        const response = await axios.post('/api/test/user', registrationData);
        
        if (response.data.user_id) {
          // Set userId in localStorage
          localStorage.setItem('userId', response.data.user_id);
          
          // Set a session flag to prevent the subscription redirect
          sessionStorage.setItem('escapeSubscriptionRenewal', 'true');
          
          // Instead of navigating to login, fetch user data to populate Redux store
          await dispatch(fetchUserData(response.data.user_id));
          
          // Navigate directly to profile
          navigate('/profile', { 
            state: { 
              message: 'Your account has been created! You are using the free tier.' 
            } 
          });
        }
      } else if (isOauthFlow) {
        // For OAuth flow, just navigate to profile
        sessionStorage.setItem('escapeSubscriptionRenewal', 'true');
        navigate('/profile', {
          state: {
            message: 'Welcome to CertGames! You are using the free tier.'
          }
        });
      } else if (userId) {
        // For existing users, just navigate back to profile
        sessionStorage.setItem('escapeSubscriptionRenewal', 'true');
        navigate('/profile');
      }
    } catch (err) {
      console.error('Error creating free account:', err);
      setError('Error creating your account. Please try again.');
      setLoading(false);
    }
  };
  
  // New function to handle escaping the subscription flow
  const handleEscapeRenewal = () => {
    // Set the escape flag in session storage
    sessionStorage.setItem('escapeSubscriptionRenewal', 'true');
    // Navigate to home page
    navigate('/home');
  };
  
  // Premium features
  const premiumFeatures = [
    { title: 'Unlimited Practice Questions', isPremium: true },
    { title: 'Access to ScenarioSphere', isPremium: true },
    { title: 'Access to GRC Wizard', isPremium: true },
    { title: 'Access to XploitCraft', isPremium: true },
    { title: 'Interactive Daily Questions', isPremium: true },
    { title: 'Complete Resource Hub Access', isPremium: true },
    { title: 'Full Certification Coverage', isPremium: true },
    { title: 'Full Gamification (XP, Achievements)', isPremium: false },
    { title: 'Shop & Avatar System', isPremium: false },
    { title: 'Leaderboard Access', isPremium: false },
  ];
  
  return (
    <div className="subscription-container">
      <div className="subscription-background">
        <div className="subscription-grid"></div>
        <div className="subscription-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="subscription-particle"></div>
          ))}
        </div>
        <div className="subscription-glow"></div>
      </div>
      
      <div className="subscription-content">
        <div className="subscription-card">
          <div className="subscription-card-accent"></div>
          
          <div className="subscription-header">
            <div className="subscription-logo">
              <FaDragon className="subscription-logo-icon" />
            </div>
            <h1 className="subscription-title">
              {isRenewal ? 'Reactivate Unlimited Access' : 'Choose Your Plan'}
            </h1>
            <p className="subscription-subtitle">
              {isRenewal 
                ? 'Continue your learning journey with unlimited access' 
                : 'Get started for free or unlock everything with premium'}
            </p>
          </div>
          
          {error && (
            <div className="subscription-error">
              <FaTimesCircle />
              <span>{error}</span>
            </div>
          )}
          
          {/* New comparison section */}
          <div className="subscription-comparison">
            <div className="subscription-plans">
              <div className="subscription-plan free">
                <div className="subscription-plan-header">
                  <h3>Free</h3>
                  <p className="subscription-plan-price">$0</p>
                  <p className="subscription-plan-billing">Forever</p>
                </div>
                <div className="subscription-plan-features">
                  <ul>
                    <li>
                      <FaCheckCircle className="feature-available" />
                      <span>100 Practice Questions</span>
                    </li>
                    <li>
                      <FaCheckCircle className="feature-available" />
                      <span>Basic Gamification</span>
                    </li>
                    <li>
                      <FaCheckCircle className="feature-available" />
                      <span>Profile & Leaderboard</span>
                    </li>
                    <li>
                      <FaTimesCircle className="feature-unavailable" />
                      <span>ScenarioSphere, GRC, XploitCraft</span>
                    </li>
                    <li>
                      <FaTimesCircle className="feature-unavailable" />
                      <span>Daily Questions & Resources</span>
                    </li>
                  </ul>
                  
                  {showContinueFree && (
                    <button 
                      className="subscription-free-button"
                      onClick={handleContinueFree}
                      disabled={loading || redirecting}
                    >
                      {loading ? (
                        <span className="subscription-button-loading">
                          <div className="subscription-spinner"></div>
                          <span>Processing...</span>
                        </span>
                      ) : (
                        <span className="subscription-button-text">
                          <span>Continue with Free</span>
                          <FaChevronRight className="subscription-button-icon-right" />
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="subscription-plan premium">
                <div className="subscription-plan-badge">RECOMMENDED</div>
                <div className="subscription-plan-header">
                  <h3>Premium</h3>
                  <div className="subscription-price">
                    <span className="subscription-price-currency">$</span>
                    <span className="subscription-price-value">9</span>
                    <span className="subscription-price-decimal">.99</span>
                    <span className="subscription-price-period">/month</span>
                  </div>
                  <div className="subscription-trial-badge">
                    <span className="subscription-trial-text">3-Day Free Trial</span>
                  </div>
                </div>
                <div className="subscription-plan-features">
                  <ul>
                    <li>
                      <FaCheckCircle className="feature-available" />
                      <span><strong>Unlimited</strong> Practice Questions</span>
                    </li>
                    <li>
                      <FaCheckCircle className="feature-available" />
                      <span>Full Access to All Tools</span>
                    </li>
                    <li>
                      <FaCheckCircle className="feature-available" />
                      <span>Interactive Daily Questions</span>
                    </li>
                    <li>
                      <FaCheckCircle className="feature-available" />
                      <span>Complete Resource Hub</span>
                    </li>
                    <li>
                      <FaCheckCircle className="feature-available" />
                      <span>Everything in Free Plan</span>
                    </li>
                  </ul>
                  
                  <button
                    className="subscription-premium-button"
                    onClick={handleSubscribe}
                    disabled={loading || redirecting}
                  >
                    {loading || redirecting ? (
                      <span className="subscription-button-loading">
                        <div className="subscription-spinner"></div>
                        <span>{redirecting ? 'Redirecting...' : 'Processing...'}</span>
                      </span>
                    ) : (
                      <span className="subscription-button-text">
                        <FaCreditCard className="subscription-button-icon" />
                        <span>{isRenewal ? 'RENEW SUBSCRIPTION' : 'START FREE TRIAL'}</span>
                        {isRenewal ? 
                          <FaRedo className="subscription-button-icon-right" /> : 
                          <FaArrowRight className="subscription-button-icon-right" />}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="subscription-features-comparison">
              <h3>
                <FaTrophy className="subscription-section-icon" />
                <span>Feature Comparison</span>
              </h3>
              <div className="subscription-comparison-table">
                <div className="subscription-comparison-header">
                  <div className="subscription-comparison-column feature">Feature</div>
                  <div className="subscription-comparison-column free">Free</div>
                  <div className="subscription-comparison-column premium">Premium</div>
                </div>
                <div className="subscription-comparison-rows">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="subscription-comparison-row">
                      <div className="subscription-comparison-cell feature">
                        {feature.title}
                      </div>
                      <div className="subscription-comparison-cell free">
                        {feature.isPremium ? (
                          feature.title === 'Unlimited Practice Questions' ? (
                            <span className="limited-feature">100 Questions</span>
                          ) : (
                            <FaTimesCircle className="feature-unavailable" />
                          )
                        ) : (
                          <FaCheckCircle className="feature-available" />
                        )}
                      </div>
                      <div className="subscription-comparison-cell premium">
                        <FaCheckCircle className="feature-available" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="subscription-actions">
            {/* Add escape button when in renewal mode */}
            {isRenewal && (
              <button
                className="subscription-escape-button"
                onClick={handleEscapeRenewal}
                disabled={loading || redirecting}
              >
                <FaHome className="subscription-button-icon" />
                <span>GO TO HOME PAGE</span>
              </button>
            )}
            
            <button
              className="subscription-back-button"
              onClick={handleGoBack}
              disabled={loading || redirecting}
            >
              <FaArrowLeft className="subscription-button-icon" />
              <span>Go Back</span>
            </button>
          </div>
          
          {/* Add additional escape notice */}
          {isRenewal && (
            <div className="subscription-escape-notice">
              <FaInfoCircle className="subscription-note-icon" />
              <p>
                Need to explore other sections first? Click "Go to Home Page" to temporarily bypass the subscription reminder.
              </p>
            </div>
          )}
          
          <div className="subscription-note">
            <FaInfoCircle className="subscription-note-icon" />
            <p>
              By subscribing, you agree to our <a href="/terms">Terms of Service</a> and 
              <a href="/privacy">Privacy Policy</a>. You can cancel your subscription at any time
              from your profile page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
