import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPassword.css';
import './auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSent(true);
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setError('Please enter your email.');
    }
  };

  return (
    <div className="forgot-container">
      <Link to="/" className="back-to-info">Back to Info Page</Link>
      <div className="forgot-card">
        <h2 className="forgot-title">Reset Your Password</h2>
        {sent ? (
          <p className="forgot-success">
            A reset link has been sent to your email address. Please check your inbox.
          </p>
        ) : (
          <form className="forgot-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Enter your email address</label>
            <input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" className="forgot-btn">Send Reset Link</button>
          </form>
        )}
        <p className="forgot-switch">
          Remembered your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
