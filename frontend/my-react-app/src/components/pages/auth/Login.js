// src/components/auth/Login.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser, clearAuthErrors } from '../store/slice/userSlice';
import { 
  FaUser, 
  FaLock, 
  FaGoogle, 
  FaApple, 
  FaEnvelope, 
  FaChevronRight, 
  FaEye, 
  FaEyeSlash,
  FaExclamationCircle,
  FaFingerprint,
  FaCheckCircle
} from 'react-icons/fa';
import Footer from '../../Footer';
import './css/Login.css';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { loading, error, userId } = useSelector((state) => state.user);
  
  // Clear errors when component mounts or unmounts
  useEffect(() => {
    dispatch(clearAuthErrors());
    
    // Check for success message from registration
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
      // Clear the location state after reading
      window.history.replaceState({}, document.title);
    }
    
    // Check for subscription_ended reason
    const searchParams = new URLSearchParams(location.search);
    const reason = searchParams.get('reason');
    if (reason === 'subscription_ended') {
      setFormError('Your subscription has ended. Please log in to renew your subscription.');
      // Clear the reason param to prevent showing the message again on refresh
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
    
    return () => {
      dispatch(clearAuthErrors());
    };
  }, [dispatch, location]);
  
  useEffect(() => {
    // If already logged in, redirect to profile
    if (userId) {
      navigate('/profile');
    }
  }, [userId, navigate]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    
    // Basic validation
    if (!usernameOrEmail || !password) {
      setFormError('Please enter both username/email and password');
      return;
    }
    try {
      const resultAction = await dispatch(loginUser({ usernameOrEmail, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        // Check subscription status
        const userId = resultAction.payload.user_id;
        const isSubscriptionActive = resultAction.payload.subscriptionActive;
        const subscriptionStatus = resultAction.payload.subscriptionStatus;
        
        // Save userId regardless of subscription status
        localStorage.setItem('userId', userId);
        
        // IMPORTANT NEW CODE: Set escape flag for free users to prevent redirect loop
        if (!isSubscriptionActive) {
          // Set a temporary flag to prevent subscription redirect
          sessionStorage.setItem('escapeSubscriptionRenewal', 'true');
          
          // Give the flag a 5-minute expiry by setting a timeout to remove it
          setTimeout(() => {
            sessionStorage.removeItem('escapeSubscriptionRenewal');
          }, 5 * 60 * 1000); // 5 minutes
          
          // If subscription is not active, redirect to subscription page with renewal flag
          // but only if explicitly canceled (not for new free users)
          if (subscriptionStatus === 'canceled') {
            navigate(`/subscription?renewal=true`, { 
              state: { 
                userId: userId,
                from: '/login'
              } 
            });
          } else {
            // For free users or other non-active states, just go to profile
            navigate('/profile');
          }
        } else {
          // Subscription is active, navigate to profile
          navigate('/profile');
        }
      } else {
        // Handle error from the action
        setFormError(resultAction.payload || 'Login failed. Please try again.');
      }
    } catch (err) {
      setFormError('An error occurred. Please try again.');
    }
  };
  
  const handleSocialLogin = (provider) => {
    setFormError('');
    setSuccessMessage('');
    
    try {
      // Redirect to the backend OAuth route
      window.location.href = `/api/oauth/login/${provider.toLowerCase()}`;
    } catch (err) {
      setFormError(`${provider} login failed. Please try again.`);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-grid"></div>
        <div className="login-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="login-particle"></div>
          ))}
        </div>
        <div className="login-glow"></div>
      </div>
      
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <FaFingerprint className="login-logo-icon" />
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue your journey</p>
          </div>
          
          {successMessage && (
            <div className="login-success-message">
              <FaCheckCircle />
              <span>{successMessage}</span>
            </div>
          )}
          
          {(formError || error) && (
            <div className="login-error-message">
              <FaExclamationCircle />
              <span>{formError || error}</span>
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <div className="login-input-wrapper">
                <FaUser className="login-input-icon" />
                <input
                  type="text"
                  id="usernameOrEmail"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="Enter your username or email"
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <FaLock className="login-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="login-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <div className="login-options">
              <div className="login-remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              
              <Link to="/forgot-password" className="login-forgot-password">
                Forgot password?
              </Link>
            </div>
            
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <span className="login-button-loading">
                  <span className="login-spinner"></span>
                  Signing In...
                </span>
              ) : (
                <span className="login-button-text">
                  Sign In
                  <FaChevronRight className="login-button-icon" />
                </span>
              )}
            </button>
          </form>
          
          <div className="login-separator">
            <span>or continue with</span>
          </div>
          
          <div className="login-social-buttons">
            <button
              type="button"
              className="login-social-button login-google"
              onClick={() => handleSocialLogin('Google')}
              disabled={loading}
            >
              <FaGoogle />
              <span>Google</span>
            </button>
            
            <button
              type="button"
              className="login-social-button login-apple"
              onClick={() => handleSocialLogin('Apple')}
              disabled={loading}
            >
              <FaApple />
              <span>Apple</span>
            </button>
          </div>
          
          <div className="login-register-link">
            <span>Don't have an account?</span>
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
