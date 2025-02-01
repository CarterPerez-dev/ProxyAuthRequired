// src/components/pages/store/UserProfile.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const { userId, username, xp, level, coins } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // Optionally clear localStorage if you are using it for persistence
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">User Profile</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      <div className="profile-overview">
        <div className="profile-card">
          <h2>Overview</h2>
          <div className="profile-details">
            <p><span className="detail-label">Username:</span> {username}</p>
            <p><span className="detail-label">User ID:</span> {userId}</p>
            <p><span className="detail-label">Level:</span> {level}</p>
            <p><span className="detail-label">XP:</span> {xp}</p>
            <p><span className="detail-label">Coins:</span> {coins}</p>
          </div>
        </div>
      </div>
      
      <div className="profile-actions">
        <div className="action-card">
          <h2>Account Settings</h2>
          <div className="action-buttons">
            <button className="profile-btn">Change Username</button>
            <button className="profile-btn">Change Email</button>
            <button className="profile-btn">Change Password</button>
            <button className="profile-btn">Cancel Subscription</button>
          </div>
          {/* 
            For subscription cancellation, integrate with Stripe or your payment API here.
            (This is a placeholder button.)
          */}
        </div>
      </div>
      
      <div className="profile-extra">
        <div className="extra-card">
          <h2>Your Achievements</h2>
          <div className="extra-content">
            {/* Replace with dynamic achievement list */}
            <p>(Achievements will be displayed here.)</p>
          </div>
        </div>
        <div className="extra-card">
          <h2>Purchased Items</h2>
          <div className="extra-content">
            {/* Replace with dynamic purchased items list */}
            <p>(Purchased items will be listed here.)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

