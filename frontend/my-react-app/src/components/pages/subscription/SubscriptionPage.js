// src/components/pages/subscription/PremiumSubscriptionPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../store/slice/userSlice';
import axios from 'axios';
import {
  FaCrown,
  FaLock,
  FaCreditCard,
  FaInfoCircle,
  FaSpinner,
  FaArrowLeft,
  FaArrowRight,
  FaRedo,
  FaTrophy,
  FaHome,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaGem,
  FaRegGem,
  FaInfinity,
  FaCubes,
  FaShieldAlt,
  FaWrench,
  FaClipboardCheck,
  FaRocket,
  FaUsers
} from 'react-icons/fa';
import './css/SubscriptionPage.css';

const PremiumSubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stripeConfig, setStripeConfig] = useState({});
  const [redirecting, setRedirecting] = useState(false);
  const [searchParams] = useSearchParams();
  const isRenewal = searchParams.get('renewal') === 'true';
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  
  // Check if there's registration data in the location state
  const registrationData = location.state?.registrationData;
  const isOauthFlow = location.state?.isOauthFlow || false;
  
  // State for showing continue with free option
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

    // Add an animation effect for premium plan highlight
    const premiumPlanCard = document.querySelector('.premium-plan-card.premium');
    if (premiumPlanCard) {
      setTimeout(() => {
        premiumPlanCard.classList.add('premium-highlighted');
      }, 500);
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

  // Function to handle continuing with free tier
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
          
          // Fetch user data to populate Redux store
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
  
  // Function to handle escaping the subscription flow
  const handleEscapeRenewal = () => {
    // Set the escape flag in session storage
    sessionStorage.setItem('escapeSubscriptionRenewal', 'true');
    // Navigate to home page
    navigate('/home');
  };
  
  // Premium features
  const premiumFeatures = [
    { title: 'Practice Questions', free: '100 Questions', premium: 'Unlimited', isPremium: true },
    { title: 'Analogy Hub', free: true, premium: true, isPremium: true },
    { title: 'ScenarioSphere', free: false, premium: true, isPremium: true },
    { title: 'GRC Wizard', free: false, premium: true, isPremium: true },
    { title: 'XploitCraft', free: false, premium: true, isPremium: true },
    { title: 'Daily Questions', free: false, premium: true, isPremium: true },
    { title: 'Resource Hub', free: 'Limited', premium: 'Full Access', isPremium: true },
    { title: 'Certification Coverage', free: 'Limited', premium: 'Full Access', isPremium: true },
    { title: 'XP & Achievements', free: true, premium: true, isPremium: false },
    { title: 'Shop & Avatar System', free: true, premium: true, isPremium: false },
    { title: 'Leaderboard Access', free: true, premium: true, isPremium: false },
  ];
  
  return (
    <div className="premium-container">
      <div className="premium-background">
        <div className="premium-grid"></div>
        <div className="premium-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="premium-particle"></div>
          ))}
        </div>
        <div className="premium-glow"></div>
      </div>
      
      <div className="premium-content">
        <div className="premium-card">
          <div className="premium-header">
            <div className="premium-logo">
              <FaCrown className="premium-logo-icon" />
            </div>
            <h1 className="premium-title">
              {isRenewal ? 'Reactivate Unlimited Access' : 'Choose Your Premium Plan'}
            </h1>
            <p className="premium-subtitle">
              {isRenewal 
                ? 'Continue your learning journey with unlimited access to all premium features' 
                : 'Get started for free or unlock everything with premium to accelerate your certification journey'}
            </p>
          </div>
          
          {error && (
            <div className="premium-error">
              <FaTimesCircle />
              <span>{error}</span>
            </div>
          )}
          
          {/* Plans Container */}
          <div className="premium-plans-container">
            {/* Free Plan */}
            <div className="premium-plan-card free">
              <div className="premium-plan-header">
                <h3 className="premium-plan-name">Free</h3>
                <div className="premium-price-container">
                  <span className="premium-price-currency">$</span>
                  <span className="premium-price-value">0</span>
                </div>
                <div className="premium-price-period">Forever</div>
              </div>
              
              <div className="premium-plan-features">
                <ul className="premium-features-list">
                  <li className="premium-feature-item limited">
                    <FaCheckCircle className="premium-feature-icon available" />
                    <span className="premium-feature-text">100 Practice Questions</span>
                  </li>
                  <li className="premium-feature-item">
                    <FaCheckCircle className="premium-feature-icon available" />
                    <span className="premium-feature-text">Basic Gamification</span>
                  </li>
                  <li className="premium-feature-item">
                    <FaCheckCircle className="premium-feature-icon available" />
                    <span className="premium-feature-text">Profile & Leaderboard</span>
                  </li>
                  <li className="premium-feature-item">
                    <FaTimesCircle className="premium-feature-icon unavailable" />
                    <span className="premium-feature-text">Interactive Tools (ScenarioSphere, GRC, XploitCraft)</span>
                  </li>
                  <li className="premium-feature-item">
                    <FaTimesCircle className="premium-feature-icon unavailable" />
                    <span className="premium-feature-text">Daily Questions & Resources</span>
                  </li>
                </ul>
                
                {showContinueFree && (
                  <button 
                    className="premium-free-button"
                    onClick={handleContinueFree}
                    disabled={loading || redirecting}
                  >
                    {loading ? (
                      <span className="premium-button-loading">
                        <div className="premium-spinner"></div>
                        <span>Processing...</span>
                      </span>
                    ) : (
                      <span className="premium-button-text">
                        <span>Continue with Free</span>
                        <FaChevronRight className="premium-button-icon" />
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className="premium-plan-card premium">
              <div className="premium-plan-badge">RECOMMENDED</div>
              <div className="premium-plan-header">
                <h3 className="premium-plan-name">Premium</h3>
                <div className="premium-price-container">
                  <span className="premium-price-currency">$</span>
                  <span className="premium-price-value">9</span>
                  <span className="premium-price-decimal">.99</span>
                </div>
                <div className="premium-price-period">per month</div>
                <div className="premium-trial-badge">
                  3-Day Free Trial
                </div>
              </div>
              
              <div className="premium-plan-features">
                <ul className="premium-features-list">
                  <li className="premium-feature-item">
                    <FaCheckCircle className="premium-feature-icon available" />
                    <span className="premium-feature-text"><strong>Unlimited</strong> Practice Questions</span>
                  </li>
                  <li className="premium-feature-item">
                    <FaCheckCircle className="premium-feature-icon available" />
                    <span className="premium-feature-text">Full Access to All Interactive Tools</span>
                  </li>
                  <li className="premium-feature-item">
                    <FaCheckCircle className="premium-feature-icon available" />
                    <span className="premium-feature-text">Interactive Daily Questions</span>
                  </li>
                  <li className="premium-feature-item">
                    <FaCheckCircle className="premium-feature-icon available" />
                    <span className="premium-feature-text">Complete Resource Hub</span>
                  </li>
                  <li className="premium-feature-item">
                    <FaCheckCircle className="premium-feature-icon available" />
                    <span className="premium-feature-text">Everything in Free Plan</span>
                  </li>
                </ul>
                
                <button
                  className="premium-premium-button"
                  onClick={handleSubscribe}
                  disabled={loading || redirecting}
                >
                  {loading || redirecting ? (
                    <span className="premium-button-loading">
                      <div className="premium-spinner"></div>
                      <span>{redirecting ? 'Redirecting...' : 'Processing...'}</span>
                    </span>
                  ) : (
                    <span className="premium-button-text">
                      <FaCreditCard />
                      <span>{isRenewal ? 'RENEW SUBSCRIPTION' : '  START FREE TRIAL'}</span>
                      {isRenewal ? 
                        <FaRedo className="premium-button-icon" /> : 
                        <FaArrowRight className="premium-button-icon" />}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Feature Comparison Table */}
          <div className="premium-comparison-table">
            <div className="premium-comparison-header">
              <h3>
                <FaTrophy className="premium-comparison-header-icon" />
                <span>Detailed Feature Comparison</span>
              </h3>
            </div>
            
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="premium-comparison-row">
                <div className="premium-comparison-cell feature">
                  {feature.title}
                </div>
                <div className="premium-comparison-cell free">
                  {typeof feature.free === 'boolean' ? (
                    feature.free ? (
                      <FaCheckCircle className="premium-comparison-icon available" />
                    ) : (
                      <FaTimesCircle className="premium-comparison-icon unavailable" />
                    )
                  ) : (
                    <span className="premium-comparison-limited">{feature.free}</span>
                  )}
                </div>
                <div className="premium-comparison-cell premium">
                  {typeof feature.premium === 'boolean' ? (
                    feature.premium ? (
                      <FaCheckCircle className="premium-comparison-icon available" />
                    ) : (
                      <FaTimesCircle className="premium-comparison-icon unavailable" />
                    )
                  ) : (
                    <span>{feature.premium}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="premium-actions">
            {/* Add escape button when in renewal mode */}
            {isRenewal && (
              <button
                className="premium-escape-button"
                onClick={handleEscapeRenewal}
                disabled={loading || redirecting}
              >
                <FaHome />
                <span>GO TO HOME PAGE</span>
              </button>
            )}
            
            <button
              className="premium-back-button"
              onClick={handleGoBack}
              disabled={loading || redirecting}
            >
              <FaArrowLeft />
              <span>Go Back</span>
            </button>
          </div>
          
          {/* Add additional escape notice */}
          {isRenewal && (
            <div className="premium-escape-notice">
              <FaInfoCircle className="premium-note-icon" />
              <p>
                Need to explore other sections first? Click "Go to Home Page" to temporarily bypass the subscription reminder.
              </p>
            </div>
          )}
          
          <div className="premium-note">
            <FaInfoCircle className="premium-note-icon" />
            <p>
              By subscribing, you agree to our <a href="/terms">Terms of Service</a> and 
              <a href="/privacy"> Privacy Policy</a>. You can cancel your subscription at any time
              from your profile page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscriptionPage;
