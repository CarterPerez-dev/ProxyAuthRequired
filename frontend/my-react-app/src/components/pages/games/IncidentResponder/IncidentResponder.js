// src/components/pages/games/IncidentResponder/IncidentResponder.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchScenarios,
  startScenario,
  selectAction,
  resetGame
} from '../store/slice/incidentResponderSlice';
import { FaShieldAlt, FaBug, FaExclamationTriangle, FaAward, FaClipboardCheck } from 'react-icons/fa';
import ScenarioIntro from './ScenarioIntro';
import ScenarioStage from './ScenarioStage';
import ScenarioResults from './ScenarioResults';
import DifficultySelector from './DifficultySelector';
import './IncidentResponder.css';

const IncidentResponder = () => {
  const dispatch = useDispatch();
  const { 
    scenarios, 
    currentScenario,
    currentStage,
    selectedActions,
    gameStatus,
    score,
    results,
    loading, 
    error 
  } = useSelector(state => state.incidentResponder);
  const { userId } = useSelector(state => state.user);
  
  const [scenarioTypes, setScenarioTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  
  // Fetch scenarios when component mounts
  useEffect(() => {
    if (scenarios.length === 0) {
      dispatch(fetchScenarios());
    }
  }, [dispatch, scenarios.length]);
  
  // Extract unique scenario types when scenarios are loaded
  useEffect(() => {
    if (scenarios.length > 0) {
      const types = ['all', ...new Set(scenarios.map(scenario => scenario.type))];
      setScenarioTypes(types);
    }
  }, [scenarios]);
  
  const handleStartScenario = (scenarioId) => {
    dispatch(startScenario({ 
      scenarioId, 
      userId,
      difficulty: selectedDifficulty
    }));
  };
  
  const handleSelectAction = (actionId) => {
    dispatch(selectAction({ 
      actionId, 
      stageId: currentStage.id,
      userId 
    }));
  };
  
  const handleRestart = () => {
    dispatch(resetGame());
  };
  
  const handleTypeChange = (type) => {
    setSelectedType(type);
  };
  
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };
  
  // Filter scenarios based on selected type
  const filteredScenarios = selectedType === 'all' 
    ? scenarios 
    : scenarios.filter(scenario => scenario.type === selectedType);
  
  // Render different views based on game status
  const renderGameContent = () => {
    switch (gameStatus) {
      case 'selecting':
        return (
          <div className="incidentresponder_scenario_selection_container">
            <div className="incidentresponder_selection_header_block">
              <h2>Select an Incident Scenario</h2>
              <p>Test your incident response skills by handling various security incidents.</p>
            </div>
            
            <div className="incidentresponder_scenario_filters_section">
              <div className="incidentresponder_type_filter_group">
                <h3>Incident Type</h3>
                <div className="incidentresponder_type_buttons_row">
                  {scenarioTypes.map(type => (
                    <button
                      key={type}
                      className={selectedType === type ? 'active' : ''}
                      onClick={() => handleTypeChange(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <DifficultySelector 
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={handleDifficultyChange}
              />
            </div>
            
            <div className="incidentresponder_scenarios_grid">
              {filteredScenarios.map(scenario => (
                <div
                  key={scenario.id}
                  className="incidentresponder_scenario_card"
                  onClick={() => handleStartScenario(scenario.id)}
                >
                  <div className="incidentresponder_scenario_icon_wrapper">
                    {scenario.type === 'malware' && <FaBug />}
                    {scenario.type === 'breach' && <FaExclamationTriangle />}
                    {scenario.type === 'phishing' && <FaShieldAlt />}
                    {!['malware', 'breach', 'phishing'].includes(scenario.type) && <FaClipboardCheck />}
                  </div>
                  <div className="incidentresponder_scenario_info_section">
                    <h3>{scenario.title}</h3>
                    <div className="incidentresponder_scenario_meta_data">
                      <span className="incidentresponder_scenario_type_label">{scenario.type}</span>
                      <span className="incidentresponder_scenario_difficulty_rating">
                        {Array(scenario.difficulty).fill('★').join('')}
                      </span>
                    </div>
                    <p>{scenario.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'intro':
        return (
          <ScenarioIntro 
            scenario={currentScenario} 
            onStart={() => dispatch(selectAction({ actionId: 'start', stageId: 'intro', userId }))}
          />
        );
        
      case 'playing':
        return (
          <ScenarioStage 
            stage={currentStage}
            scenarioTitle={currentScenario?.title}
            selectedActions={selectedActions}
            onSelectAction={handleSelectAction}
            score={score}
            difficulty={selectedDifficulty}
          />
        );
        
      case 'completed':
        return (
          <ScenarioResults 
            results={results}
            scenario={currentScenario}
            selectedActions={selectedActions}
            score={score}
            onRestart={handleRestart}
          />
        );
        
      default:
        return null;
    }
  };
  
  if (loading && scenarios.length === 0) {
    return <div className="incidentresponder_loading_state">Loading incident scenarios...</div>;
  }
  
  if (error) {
    return <div className="incidentresponder_error_state">Error: {error}</div>;
  }
  
  return (
    <div className="incidentresponder_main_container">
      <div className="incidentresponder_header_section">
        <h1><FaShieldAlt /> Incident Responder</h1>
        <p>Test your cybersecurity incident response skills in realistic scenarios</p>
      </div>
      
      <div className="incidentresponder_content_area">
        {renderGameContent()}
      </div>
    </div>
  );
};

export default IncidentResponder;
