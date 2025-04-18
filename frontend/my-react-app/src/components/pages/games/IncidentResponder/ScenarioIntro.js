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
          <div className="incidentresponder_scenariointro_tab_content overview">
            <h3>Incident Overview</h3>
            <p>{scenario.description}</p>
            <div className="incidentresponder_scenariointro_meta_info">
              <div className="incidentresponder_scenariointro_meta_item">
                <span className="incidentresponder_scenariointro_meta_label">Incident Type:</span>
                <span className="incidentresponder_scenariointro_meta_value">{scenario.type}</span>
              </div>
              <div className="incidentresponder_scenariointro_meta_item">
                <span className="incidentresponder_scenariointro_meta_label">Organization:</span>
                <span className="incidentresponder_scenariointro_meta_value">{scenario.organization}</span>
              </div>
              <div className="incidentresponder_scenariointro_meta_item">
                <span className="incidentresponder_scenariointro_meta_label">Industry:</span>
                <span className="incidentresponder_scenariointro_meta_value">{scenario.industry}</span>
              </div>
              <div className="incidentresponder_scenariointro_meta_item">
                <span className="incidentresponder_scenariointro_meta_label">Size:</span>
                <span className="incidentresponder_scenariointro_meta_value">{scenario.organizationSize}</span>
              </div>
            </div>
          </div>
        );
        
      case 'role':
        return (
          <div className="incidentresponder_scenariointro_tab_content role">
            <h3>Your Role</h3>
            <div className="incidentresponder_scenariointro_role_info">
              <div className="incidentresponder_scenariointro_role_icon">
                <FaUserSecret />
              </div>
              <div className="incidentresponder_scenariointro_role_details">
                <h4>{scenario.playerRole}</h4>
                <p>{scenario.roleDescription}</p>
              </div>
            </div>
            <div className="incidentresponder_scenariointro_responsibilities">
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
          <div className="incidentresponder_scenariointro_tab_content objectives">
            <h3>Scenario Objectives</h3>
            <p>{scenario.objectivesDescription}</p>
            <div className="incidentresponder_scenariointro_objectives_list">
              {scenario.objectives.map((objective, index) => (
                <div key={index} className="incidentresponder_scenariointro_objective_item">
                  <div className="incidentresponder_scenariointro_objective_number">{index + 1}</div>
                  <div className="incidentresponder_scenariointro_objective_text">{objective}</div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'tips':
        return (
          <div className="incidentresponder_scenariointro_tab_content tips">
            <h3>Response Tips</h3>
            <div className="incidentresponder_scenariointro_tips_container">
              <div className="incidentresponder_scenariointro_tips_intro">
                <FaInfoCircle className="incidentresponder_scenariointro_tips_icon" />
                <p>Keep these best practices in mind as you respond to the incident:</p>
              </div>
              <ul className="incidentresponder_scenariointro_tips_list">
                {scenario.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="incidentresponder_scenariointro_warning">
              <FaExclamationCircle className="incidentresponder_scenariointro_warning_icon" />
              <p>Remember: Your choices will affect the outcome of the incident. Consider each action carefully.</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="incidentresponder_scenariointro_wrapper">
      <div className="incidentresponder_scenariointro_header">
        <h2>{scenario.title}</h2>
        <div className="incidentresponder_scenariointro_difficulty">
          {Array(scenario.difficulty).fill('★').join('')}
        </div>
      </div>
      
      <div className="incidentresponder_scenariointro_alert_banner">
        <FaExclamationCircle />
        <span>INCIDENT ALERT: {scenario.alertMessage}</span>
      </div>
      
      <div className="incidentresponder_scenariointro_content">
        <div className="incidentresponder_scenariointro_tabs">
          <button 
            className={`incidentresponder_scenariointro_tab_button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaInfoCircle /> Overview
          </button>
          <button 
            className={`incidentresponder_scenariointro_tab_button ${activeTab === 'role' ? 'active' : ''}`}
            onClick={() => setActiveTab('role')}
          >
            <FaBriefcase /> Your Role
          </button>
          <button 
            className={`incidentresponder_scenariointro_tab_button ${activeTab === 'objectives' ? 'active' : ''}`}
            onClick={() => setActiveTab('objectives')}
          >
            <FaClipboardCheck /> Objectives
          </button>
          <button 
            className={`incidentresponder_scenariointro_tab_button ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            <FaLightbulb /> Tips
          </button>
        </div>
        
        <div className="incidentresponder_scenariointro_tab_content_container">
          {renderTabContent()}
        </div>
      </div>
      
      <div className="incidentresponder_scenariointro_actions">
        <button className="incidentresponder_scenariointro_start_button" onClick={onStart}>
          <FaPlay /> Begin Response
        </button>
      </div>
    </div>
  );
};

export default ScenarioIntro;
