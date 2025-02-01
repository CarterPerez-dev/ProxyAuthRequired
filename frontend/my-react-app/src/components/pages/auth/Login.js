// src/components/pages/auth/Login.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/userSlice'; // Adjust path if needed
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userId } = useSelector((state) => state.user);

  // Single field for username or email
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  // When user logs in successfully, store the userId and redirect to Profile.
  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
      navigate('/profile');
    }
  }, [userId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch login action with usernameOrEmail and password.
    dispatch(loginUser({ usernameOrEmail, password }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="usernameOrEmail">Username or Email</label>
          <input 
            id="usernameOrEmail"
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="login-forgot">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="login-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

