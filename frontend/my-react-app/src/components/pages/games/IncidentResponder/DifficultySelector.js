// src/components/pages/games/IncidentResponder/DifficultySelector.js
import React from 'react';
import { FaRegClock, FaTachometerAlt } from 'react-icons/fa';
import './DifficultySelector.css';

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficulties = [
    {
      id: 'easy',
      name: 'Easy',
      description: 'More time to respond, clearer indicators, and more forgiving scoring.',
      timeMultiplier: '1.5x',
      forgivenessLevel: 'High'
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Standard time constraints with balanced scoring.',
      timeMultiplier: '1x',
      forgivenessLevel: 'Medium'
    },
    {
      id: 'hard',
      name: 'Hard',
      description: 'Strict time limits, subtle indicators, and rigorous scoring.',
      timeMultiplier: '0.7x',
      forgivenessLevel: 'Low'
    }
  ];
  
  return (
    <div className="incidentresponder_diffsel_wrapper">
      <h3>Difficulty Level</h3>
      <div className="incidentresponder_diffsel_options_container">
        {difficulties.map(difficulty => (
          <button
            key={difficulty.id}
            className={`incidentresponder_diffsel_difficulty_btn ${selectedDifficulty === difficulty.id ? 'active' : ''}`}
            onClick={() => onDifficultyChange(difficulty.id)}
          >
            <div className="incidentresponder_diffsel_name_display">{difficulty.name}</div>
            <div className="incidentresponder_diffsel_indicators_area">
              <div className="incidentresponder_diffsel_indicator_item">
                <FaRegClock />
                <span>Time: {difficulty.timeMultiplier}</span>
              </div>
              <div className="incidentresponder_diffsel_indicator_item">
                <FaTachometerAlt />
                <span>Forgiveness: {difficulty.forgivenessLevel}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="incidentresponder_diffsel_selected_info">
        <p>
          {difficulties.find(d => d.id === selectedDifficulty)?.description}
        </p>
      </div>
    </div>
  );
};

export default DifficultySelector;
