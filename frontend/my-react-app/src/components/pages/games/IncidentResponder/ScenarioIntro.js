// src/components/pages/games/IncidentResponder/ScenarioIntro.js
import React, { useState } from 'react';
import { FaPlay, FaBriefcase, FaInfoCircle, FaExclamationCircle, FaUserSecret, FaLightbulb, FaClipboardCheck } from 'react-icons/fa';
import './ScenarioIntro.css';

const ScenarioIntro = ({ scenario, onStart }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!scenario) return null;
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content overview">
            <h3>Incident Overview</h3>
            <p>{scenario.description}</p>
            <div className="scenario-meta-info">
              <div className="meta-item">
                <span className="meta-label">Incident Type:</span>
                <span className="meta-value">{scenario.type}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Organization:</span>
                <span className="meta-value">{scenario.organization}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Industry:</span>
                <span className="meta-value">{scenario.industry}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Size:</span>
                <span className="meta-value">{scenario.organizationSize}</span>
              </div>
            </div>
          </div>
        );
        
      case 'role':
        return (
          <div className="tab-content role">
            <h3>Your Role</h3>
            <div className="role-info">
              <div className="role-icon">
                <FaUserSecret />
              </div>
              <div className="role-details">
                <h4>{scenario.playerRole}</h4>
                <p>{scenario.roleDescription}</p>
              </div>
            </div>
            <div className="responsibilities">
              <h4>Your Responsibilities:</h4>
              <ul>
                {scenario.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      case 'objectives':
        return (
          <div className="tab-content objectives">
            <h3>Scenario Objectives</h3>
            <p>{scenario.objectivesDescription}</p>
            <div className="objectives-list">
              {scenario.objectives.map((objective, index) => (
                <div key={index} className="objective-item">
                  <div className="objective-number">{index + 1}</div>
                  <div className="objective-text">{objective}</div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'tips':
        return (
          <div className="tab-content tips">
            <h3>Response Tips</h3>
            <div className="tips-container">
              <div className="tips-intro">
                <FaInfoCircle className="tips-icon" />
                <p>Keep these best practices in mind as you respond to the incident:</p>
              </div>
              <ul className="tips-list">
                {scenario.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="warning">
              <FaExclamationCircle className="warning-icon" />
              <p>Remember: Your choices will affect the outcome of the incident. Consider each action carefully.</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="scenario-intro">
      <div className="intro-header">
        <h2>{scenario.title}</h2>
        <div className="scenario-difficulty">
          {Array(scenario.difficulty).fill('★').join('')}
        </div>
      </div>
      
      <div className="alert-banner">
        <FaExclamationCircle />
        <span>INCIDENT ALERT: {scenario.alertMessage}</span>
      </div>
      
      <div className="intro-content">
        <div className="intro-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaInfoCircle /> Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'role' ? 'active' : ''}`}
            onClick={() => setActiveTab('role')}
          >
            <FaBriefcase /> Your Role
          </button>
          <button 
            className={`tab-button ${activeTab === 'objectives' ? 'active' : ''}`}
            onClick={() => setActiveTab('objectives')}
          >
            <FaClipboardCheck /> Objectives
          </button>
          <button 
            className={`tab-button ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            <FaLightbulb /> Tips
          </button>
        </div>
        
        <div className="tab-content-container">
          {renderTabContent()}
        </div>
      </div>
      
      <div className="intro-actions">
        <button className="start-button" onClick={onStart}>
          <FaPlay /> Begin Response
        </button>
      </div>
    </div>
  );
};

export default ScenarioIntro;
