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
    <div className="threathunter_scenarioselector_main_container">
      <div className="threathunter_scenarioselector_header">
        <h2>Select Log Analysis Scenario</h2>
        <p>Analyze log files to identify security threats and incidents.</p>
      </div>
      
      <div className="threathunter_scenarioselector_filters">
        <div className="threathunter_scenarioselector_type_filter">
          <h3>Threat Type</h3>
          <div className="threathunter_scenarioselector_type_buttons">
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
        
        <div className="threathunter_scenarioselector_difficulty_selector">
          <h3>Difficulty Level</h3>
          <div className="threathunter_scenarioselector_difficulty_options">
            {difficulties.map(difficulty => (
              <button
                key={difficulty.id}
                className={`threathunter_scenarioselector_difficulty_button ${selectedDifficulty === difficulty.id ? 'active' : ''}`}
                onClick={() => onDifficultyChange(difficulty.id)}
              >
                <div className="threathunter_scenarioselector_difficulty_name">{difficulty.name}</div>
                <div className="threathunter_scenarioselector_difficulty_indicators">
                  <div className="threathunter_scenarioselector_indicator">
                    <FaTachometerAlt />
                    <span>Time: {difficulty.timeMultiplier}</span>
                  </div>
                  <div className="threathunter_scenarioselector_indicator">
                    <FaShieldAlt />
                    <span>Complexity: {difficulty.complexity}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="threathunter_scenarioselector_selected_difficulty_info">
            <p>
              {difficulties.find(d => d.id === selectedDifficulty)?.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="threathunter_scenarioselector_scenarios_grid">
        {scenarios.length === 0 ? (
          <div className="threathunter_scenarioselector_no_scenarios">
            <p>No scenarios available for the selected threat type. Try another type or check back later.</p>
          </div>
        ) : (
          scenarios.map(scenario => (
            <div
              key={scenario.id}
              className="threathunter_scenarioselector_scenario_card"
              onClick={() => onSelectScenario(scenario.id)}
            >
              <div className="threathunter_scenarioselector_scenario_icon">
                {getThreatTypeIcon(scenario.threatType)}
              </div>
              <div className="threathunter_scenarioselector_scenario_info">
                <h3>{scenario.title}</h3>
                <div className="threathunter_scenarioselector_scenario_meta">
                  <span className="threathunter_scenarioselector_scenario_type">{formatThreatType(scenario.threatType)}</span>
                  <span className="threathunter_scenarioselector_scenario_difficulty">
                    {Array(scenario.difficulty).fill('★').join('')}
                  </span>
                </div>
                <p>{scenario.description}</p>
                
                <div className="threathunter_scenarioselector_scenario_stats">
                  <div className="threathunter_scenarioselector_stat_item">
                    <span className="threathunter_scenarioselector_stat_label">Logs:</span>
                    <span className="threathunter_scenarioselector_stat_value">{scenario.logCount || scenario.logs?.length || 0}</span>
                  </div>
                  <div className="threathunter_scenarioselector_stat_item">
                    <span className="threathunter_scenarioselector_stat_label">Time Limit:</span>
                    <span className="threathunter_scenarioselector_stat_value">{scenario.timeLimit} sec</span>
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
