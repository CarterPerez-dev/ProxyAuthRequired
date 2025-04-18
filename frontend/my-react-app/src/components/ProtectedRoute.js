// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkSubscription, fetchUsageLimits } from './pages/store/slice/userSlice';
import UpgradePrompt from './UpgradePrompt';

const ProtectedRoute = ({ children, requiresPremium = false }) => {
  const { 
    userId, 
    subscriptionActive, 
    subscriptionStatus, 
    practiceQuestionsRemaining, 
    status 
  } = useSelector((state) => state.user);
  
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const verifyAccess = async () => {
      if (userId) {
        try {
          // Only check subscription if not already marked as active
          if (subscriptionActive === undefined || subscriptionActive === false) {
            console.log('Checking subscription status for user', userId);
            await dispatch(checkSubscription(userId)).unwrap();
          }
          
          // For free users, fetch usage limits
          if (!subscriptionActive) {
            await dispatch(fetchUsageLimits(userId)).unwrap();
          }
          
          setIsChecking(false);
        } catch (err) {
          console.error('Error checking access:', err);
          setIsChecking(false);
        }
      } else {
        setIsChecking(false);
      }
    };
    
    verifyAccess();
  }, [userId, dispatch, subscriptionActive]);
  
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
  
  // Check if this is a premium feature and user doesn't have premium
  if (requiresPremium && !subscriptionActive) {
    return <UpgradePrompt feature="premium" />;
  }
  
  // For practice tests, check if free user has questions remaining
  if (location.pathname.includes('/practice-tests') && 
      !subscriptionActive && 
      practiceQuestionsRemaining <= 0) {
    return <UpgradePrompt feature="questions" />;
  }
  
  // Handle existing cancelation case
  if (!subscriptionActive && subscriptionStatus === 'canceling') {
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
  
  // All checks passed, show the protected content
  return children;
};

export default ProtectedRoute;
