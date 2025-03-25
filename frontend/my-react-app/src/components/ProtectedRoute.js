// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkSubscription } from './pages/store/userSlice';

const ProtectedRoute = ({ children }) => {
  const { userId, subscriptionActive, subscriptionStatus, status } = useSelector((state) => state.user);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const verifySubscription = async () => {
      if (userId) {
        try {
          await dispatch(checkSubscription(userId)).unwrap();
          setIsChecking(false);
        } catch (err) {
          console.error('Error checking subscription:', err);
          setIsChecking(false);
        }
      } else {
        setIsChecking(false);
      }
    };
    
    verifySubscription();
  }, [userId, dispatch]);
  
  if (isChecking || status === 'loading') {
    // Show loading state
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!userId) {
    // Not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Handle different subscription states
  if (!subscriptionActive) {
    // Check if subscription is canceled but still has access
    if (subscriptionStatus === 'canceling') {
      // Show children with a renewal banner instead of redirecting
      return (
        <>
          <div className="subscription-banner">
            <div className="subscription-banner-content">
              <p>Your subscription will end at the end of your current billing period. <a href="/subscription">Renew now</a> to maintain access.</p>
            </div>
          </div>
          {children}
        </>
      );
    }
    
    // No active subscription, redirect to subscription page
    // Add renewal=true parameter if subscription was previously canceled
    const renewalMode = subscriptionStatus === 'canceled' ? '?renewal=true' : '';
    return <Navigate to={`/subscription${renewalMode}`} state={{ userId, from: location }} replace />;
  }
  
  // User is logged in and has active subscription
  return children;
};

export default ProtectedRoute;
