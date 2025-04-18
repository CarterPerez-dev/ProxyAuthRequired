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
                <FaRegClock />
                <span>Time: {difficulty.timeMultiplier}</span>
              </div>
              <div className="indicator">
                <FaTachometerAlt />
                <span>Forgiveness: {difficulty.forgivenessLevel}</span>
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
  );
};

export default DifficultySelector;
