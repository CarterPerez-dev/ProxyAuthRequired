// src/components/pages/games/ThreatHunter/ThreatHunter.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchLogScenarios, 
  startScenario, 
  submitAnalysis,
  resetGame
} from '../store/slice/threatHunterSlice';
import { FaSearch, FaFileAlt, FaChartLine, FaExclamationTriangle, FaTrophy } from 'react-icons/fa';
import LogViewer from './LogViewer';
import AnalysisTools from './AnalysisTools';
import ThreatControls from './ThreatControls';
import ScenarioSelector from './ScenarioSelector';
import ThreatResultsModal from './ThreatResultsModal';
import './ThreatHunter.css';

const ThreatHunter = () => {
  const dispatch = useDispatch();
  const { 
    scenarios, 
    currentScenario,
    gameStatus,
    selectedLog,
    timeLeft,
    score,
    results,
    loading, 
    error 
  } = useSelector(state => state.threatHunter);
  const { userId } = useSelector(state => state.user);
  
  const [selectedThreatType, setSelectedThreatType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [showResults, setShowResults] = useState(false);
  const [flaggedLines, setFlaggedLines] = useState([]);
  const [detectedThreats, setDetectedThreats] = useState([]);
  
  // Fetch log scenarios when component mounts
  useEffect(() => {
    if (scenarios.length === 0) {
      dispatch(fetchLogScenarios());
    }
  }, [dispatch, scenarios.length]);
  
  // Show results modal when game is completed
  useEffect(() => {
    if (gameStatus === 'completed' && results) {
      setShowResults(true);
    }
  }, [gameStatus, results]);
  
  const handleStartScenario = (scenarioId) => {
    dispatch(startScenario({ 
      scenarioId, 
      userId,
      difficulty: selectedDifficulty
    }));
    
    // Reset state for new game
    setFlaggedLines([]);
    setDetectedThreats([]);
  };
  
  const handleLogSelection = (logId) => {
    // If we need to track which log file is being viewed
    // This would be implemented in the Redux slice
  };
  
  const handleLineFlagging = (lineNumber) => {
    // Toggle flagging for this line
    if (flaggedLines.includes(lineNumber)) {
      setFlaggedLines(flaggedLines.filter(line => line !== lineNumber));
    } else {
      setFlaggedLines([...flaggedLines, lineNumber]);
    }
  };
  
  const handleThreatDetection = (threat) => {
    // Either add or update a threat
    const existingIndex = detectedThreats.findIndex(t => t.id === threat.id);
    
    if (existingIndex >= 0) {
      const updatedThreats = [...detectedThreats];
      updatedThreats[existingIndex] = threat;
      setDetectedThreats(updatedThreats);
    } else {
      setDetectedThreats([...detectedThreats, threat]);
    }
  };
  
  const handleThreatRemoval = (threatId) => {
    setDetectedThreats(detectedThreats.filter(t => t.id !== threatId));
  };
  
  const handleSubmitAnalysis = () => {
    dispatch(submitAnalysis({
      userId,
      scenarioId: currentScenario.id,
      flaggedLines,
      detectedThreats,
      timeLeft
    }));
  };
  
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };
  
  const handleThreatTypeChange = (type) => {
    setSelectedThreatType(type);
  };
  
  const handleRestart = () => {
    dispatch(resetGame());
    setShowResults(false);
  };
  
  // Filter scenarios based on selected threat type
  const filteredScenarios = selectedThreatType === 'all' 
    ? scenarios 
    : scenarios.filter(scenario => scenario.threatType === selectedThreatType);
  
  // Render different views based on game status
  const renderGameContent = () => {
    switch (gameStatus) {
      case 'selecting':
        return (
          <ScenarioSelector 
            scenarios={filteredScenarios}
            selectedType={selectedThreatType}
            selectedDifficulty={selectedDifficulty}
            onThreatTypeChange={handleThreatTypeChange}
            onDifficultyChange={handleDifficultyChange}
            onSelectScenario={handleStartScenario}
            threatTypes={['all', 'malware', 'intrusion', 'data_exfiltration', 'credential_theft', 'ddos']}
          />
        );
        
      case 'playing':
        return (
          <div className="threat-hunter-gameplay">
            <div className="log-analysis-container">
              <LogViewer 
                logs={currentScenario.logs}
                selectedLog={selectedLog}
                flaggedLines={flaggedLines}
                onSelectLog={handleLogSelection}
                onFlagLine={handleLineFlagging}
              />
              
              <div className="analysis-panel">
                <AnalysisTools 
                  scenario={currentScenario}
                  detectedThreats={detectedThreats}
                  onDetectThreat={handleThreatDetection}
                  onRemoveThreat={handleThreatRemoval}
                />
                
                <ThreatControls 
                  timeLeft={timeLeft}
                  flaggedLines={flaggedLines}
                  detectedThreats={detectedThreats}
                  onSubmit={handleSubmitAnalysis}
                />
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  if (loading && scenarios.length === 0) {
    return <div className="threat-hunter-loading">Loading log scenarios...</div>;
  }
  
  if (error) {
    return <div className="threat-hunter-error">Error: {error}</div>;
  }
  
  return (
    <div className="threat-hunter-container">
      <div className="threat-hunter-header">
        <h1><FaSearch /> Threat Hunter</h1>
        <p>Analyze logs, detect suspicious patterns, and identify security threats.</p>
      </div>
      
      <div className="threat-hunter-content">
        {renderGameContent()}
      </div>
      
      {showResults && (
        <ThreatResultsModal 
          results={results}
          scenario={currentScenario}
          onClose={() => setShowResults(false)}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default ThreatHunter;
