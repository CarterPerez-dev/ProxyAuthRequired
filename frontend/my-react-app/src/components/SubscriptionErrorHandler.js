// src/components/SubscriptionErrorHandler.js
import React, { useState } from 'react';
import UpgradePrompt from './UpgradePrompt';

/**
 * Utility component to handle subscription-related errors when making API calls
 * This allows free users to see the tools UI but shows the upgrade prompt when they try to use premium features
 */
const SubscriptionErrorHandler = () => {
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [featureType, setFeatureType] = useState('premium');

  /**
   * Handles API errors, checking if they're subscription-related
   * @param {Error|Object} error - The error from an API call
   * @param {string} feature - The premium feature being accessed (premium, questions, daily, etc.)
   * @returns {boolean} - True if the error was subscription-related and handled
   */
  const handleApiError = (error, feature = 'premium') => {
    // Check for axios error format
    const errorData = error?.response?.data || error?.data || error;
    
    // Look for subscription-required status in error response
    if (
      errorData?.status === 'subscription_required' || 
      errorData?.tier === 'premium_required' ||
      (typeof errorData?.error === 'string' && 
        errorData.error.includes('subscription required'))
    ) {
      setFeatureType(feature);
      setShowUpgradePrompt(true);
      return true;
    }
    
    return false;
  };

  /**
   * Closes the upgrade prompt
   */
  const closeUpgradePrompt = () => {
    setShowUpgradePrompt(false);
  };

  return {
    handleApiError,
    closeUpgradePrompt,
    // Render method returns the upgrade prompt if needed
    render: () => (
      showUpgradePrompt ? <UpgradePrompt feature={featureType} /> : null
    )
  };
};

export default SubscriptionErrorHandler;
