// src/components/pages/games/ThreatHunter/ScenarioSelector.js
import React from 'react';
import { 
  FaVirus, FaShieldAlt, FaNetworkWired, FaUserSecret, 
  FaServer, FaTachometerAlt
} from 'react-icons/fa';
import './ScenarioSelector.css';

const ScenarioSelector = ({ 
  scenarios, 
  selectedType, 
  selectedDifficulty, 
  threatTypes,
  onThreatTypeChange, 
  onDifficultyChange, 
  onSelectScenario 
}) => {
  
  // Get icon for each threat type
  const getThreatTypeIcon = (type) => {
    switch(type) {
      case 'malware':
        return <FaVirus />;
      case 'intrusion':
        return <FaShieldAlt />;
      case 'data_exfiltration':
        return <FaNetworkWired />;
      case 'credential_theft':
        return <FaUserSecret />;
      case 'ddos':
        return <FaServer />;
      default:
        return <FaShieldAlt />;
    }
  };
  
  // Format threat type display name
  const formatThreatType = (type) => {
    if (type === 'all') return 'All Types';
    
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Difficulty settings
  const difficulties = [
    {
      id: 'easy',
      name: 'Easy',
      description: 'More obvious indicators, extra time, and simplified logs.',
      timeMultiplier: '1.5x',
      complexity: 'Low'
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Standard complexity logs with moderate time limits.',
      timeMultiplier: '1x',
      complexity: 'Medium'
    },
    {
      id: 'hard',
      name: 'Hard',
      description: 'Complex logs, stricter time limits, and subtle indicators.',
      timeMultiplier: '0.7x',
      complexity: 'High'
    }
  ];
  
  return (
    <div className="scenario-selection">
      <div className="selection-header">
        <h2>Select Log Analysis Scenario</h2>
        <p>Analyze log files to identify security threats and incidents.</p>
      </div>
      
      <div className="scenario-filters">
        <div className="type-filter">
          <h3>Threat Type</h3>
          <div className="type-buttons">
            {threatTypes.map(type => (
              <button
                key={type}
                className={selectedType === type ? 'active' : ''}
                onClick={() => onThreatTypeChange(type)}
              >
                {type !== 'all' && getThreatTypeIcon(type)}
                {formatThreatType(type)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="difficulty-selector">
          <h3>Difficulty Level</h3>
          <div className="difficulty-options">
            {difficulties.map(difficulty => (
              <button
                key={difficulty.id}
                className={`difficulty-button ${selectedDifficulty === difficulty.id ? 'active' : ''}`}
                onClick={() => onDifficultyChange(difficulty.id)}
              >
                <div className="difficulty-name">{difficulty.name}</div>
                <div className="difficulty-indicators">
                  <div className="indicator">
                    <FaTachometerAlt />
                    <span>Time: {difficulty.timeMultiplier}</span>
                  </div>
                  <div className="indicator">
                    <FaShieldAlt />
                    <span>Complexity: {difficulty.complexity}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="selected-difficulty-info">
            <p>
              {difficulties.find(d => d.id === selectedDifficulty)?.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="scenarios-grid">
        {scenarios.length === 0 ? (
          <div className="no-scenarios">
            <p>No scenarios available for the selected threat type. Try another type or check back later.</p>
          </div>
        ) : (
          scenarios.map(scenario => (
            <div
              key={scenario.id}
              className="scenario-card"
              onClick={() => onSelectScenario(scenario.id)}
            >
              <div className="scenario-icon">
                {getThreatTypeIcon(scenario.threatType)}
              </div>
              <div className="scenario-info">
                <h3>{scenario.title}</h3>
                <div className="scenario-meta">
                  <span className="scenario-type">{formatThreatType(scenario.threatType)}</span>
                  <span className="scenario-difficulty">
                    {Array(scenario.difficulty).fill('★').join('')}
                  </span>
                </div>
                <p>{scenario.description}</p>
                
                <div className="scenario-stats">
                  <div className="stat-item">
                    <span className="stat-label">Logs:</span>
                    <span className="stat-value">{scenario.logCount || scenario.logs?.length || 0}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Time Limit:</span>
                    <span className="stat-value">{scenario.timeLimit} sec</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScenarioSelector;
