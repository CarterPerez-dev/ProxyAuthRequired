import React, { useState } from 'react';
import './DailyCyberBrief.css';

const ENDPOINT = "/api";

const DailyCyberBrief = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Generic function to manage API calls
  const handleApiRequest = async (url, data, successMessage) => {
    setLoading(true);
    setLoadingProgress(0);
    try {
      // Simulate loading progress
      const loadingInterval = setInterval(() => {
        setLoadingProgress((prevProgress) => {
          if (prevProgress < 90) {
            return prevProgress + 10; // Gradually increase the loading bar to ~90%
          } else {
            clearInterval(loadingInterval);
            return prevProgress;
          }
        });
      }, 200);

      const response = await fetch(`${ENDPOINT}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage(successMessage);
      } else {
        const errorData = await response.json();
        if (errorData.error) {
          setMessage(`Error: ${errorData.error}`);
        } else if (errorData.message) {
          setMessage(`Error: ${errorData.message}`);
        } else {
          setMessage("Error: Something went wrong");
        }
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setLoadingProgress(100); // Set to 100% on completion
    }
  };

  const handleSubscribe = () => {
    const data = { email };
    handleApiRequest('/subscribe/', data, 'Subscription successful!');
  };

  const handleUnsubscribe = () => {
    const data = { email };
    handleApiRequest('/unsubscribe/', data, 'Unsubscribed successfully!');
  };

  return (
    <div className="page-wrapper">
      <div className="left-bg"></div>

      <div className="daily-cyberbrief-container">
        <h1 className="cyberbrief-title">Daily Newsletter</h1>
        <p className="cyberbrief-description">
          Daily newsletter sent out at 12am ET about the latest cybersecurity news, 
          exam tips, study tips, and life tips.
        </p>

        <div className="cyberbrief-form">
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="cyberbrief-input"
          />

          <div className="button-group">
            <button onClick={handleSubscribe} className="cyberbrief-submit-button">
              Subscribe
            </button>
            <button onClick={handleUnsubscribe} className="cyberbrief-submit-button unsubscribe-button">
              Unsubscribe
            </button>
          </div>

          {loading && (
            <div className="loading-bar-container">
              <div className="loading-bar">
                <div
                  className="loading-bar-progress"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <span className="loading-percentage">{loadingProgress}%</span>
            </div>
          )}
          {message && <p className="cyberbrief-message">{message}</p>}
        </div>
      </div>

      <div className="right-bg"></div>
    </div>
  );
};

export default DailyCyberBrief;

