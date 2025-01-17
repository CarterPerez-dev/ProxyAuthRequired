// frontend/my-react-app/src/components/pages/AdminInterface/AdminInterface.js

import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';  
import './AdminInterface.css';

import AdminNewsletter from './AdminNewsletter';
import AdminSubscribers from './AdminSubscribers';
import AdminTriggerTasks from './AdminTriggerTasks';
import AdminMonitorStatus from './AdminMonitorStatus';

import adminBackground from './adminbackground.jpg'; 

const AdminInterface = () => {
  const [authKey, setAuthKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const handleAuthSubmit = async () => {
    if (!authKey) {
      setMessage("API Key is required to proceed.");
      return;
    }

    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: authKey.trim() })
      });

      const data = await response.json();

      if (response.status === 200) {
        setIsAuthenticated(true);
        setApiKey(authKey.trim());
        setMessage('');
      } else {
        setMessage(data.error || "Authentication failed.");
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const authBackgroundStyle = {
    backgroundImage: `url(${adminBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-interface-container" style={authBackgroundStyle}>
        <div style={{ width: '100%' }}>
          <h2>Admin Interface</h2>
          <div className="form-group">
            <label>Enter admin password:</label>
            <input
              type="password"
              value={authKey}
              onChange={(e) => setAuthKey(e.target.value)}
              placeholder="password"
              className="admin-input"
            />
          </div>
          <button
            onClick={handleAuthSubmit}
            className="admin-submit-button"
          >
            Submit
          </button>
          {message && <p className="admin-message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-interface-container">
      <h2>Admin Interface</h2>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="admin tabs">
        <Tab label="Update Newsletter" />
        <Tab label="Manage Subscribers" />
        <Tab label="Trigger Tasks" />
        <Tab label="Monitor Status" />
      </Tabs>
      <Box sx={{ p: 3 }}>
        {tabIndex === 0 && <AdminNewsletter apiKey={apiKey} />}
        {tabIndex === 1 && <AdminSubscribers apiKey={apiKey} />}
        {tabIndex === 2 && <AdminTriggerTasks apiKey={apiKey} />}
        {tabIndex === 3 && <AdminMonitorStatus apiKey={apiKey} />}
      </Box>
    </div>
  );
};

export default AdminInterface;

