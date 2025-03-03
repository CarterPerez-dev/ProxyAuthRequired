import React, { useState, useRef, useEffect } from 'react';
import './ScenarioSphere.css';
import { ATTACK_TYPES } from './attacks';
import { 
  FaRandom, 
  FaDatabase, 
  FaUserNinja, 
  FaFire, 
  FaPlay,
  FaCog, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaLightbulb,
  FaChevronDown,
  FaSearch,
  FaBuilding,
  FaSkull,
  FaUserSecret,
  FaThermometerHalf,
  FaSpinner,
  FaChevronUp,
  FaClipboardCheck,
  FaQuestionCircle,
  FaArrowRight,
  FaShieldAlt,
  FaLock,
  FaExclamationTriangle
} from 'react-icons/fa';

const ENDPOINT = "/api";

const ScenarioSphere = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [industry, setIndustry] = useState("Finance");
  const [attackType, setAttackType] = useState("");
  const [skillLevel, setSkillLevel] = useState("Script Kiddie");
  const [threatIntensity, setThreatIntensity] = useState(50);

  const [scenarioText, setScenarioText] = useState("");
  const [interactiveQuestions, setInteractiveQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const scenarioOutputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [scoreCounter, setScoreCounter] = useState(0);

  // New state for UI enhancements
  const [outputExpanded, setOutputExpanded] = useState(true);
  const [questionsExpanded, setQuestionsExpanded] = useState(true);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [scenarioGenerated, setScenarioGenerated] = useState(false);

  useEffect(() => {
    // Handle clicking outside the suggestions dropdown
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        setShowAllSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll to scenario output when it changes
  useEffect(() => {
    if (scenarioText && scenarioOutputRef.current && isGenerating) {
      scenarioOutputRef.current.scrollTop = scenarioOutputRef.current.scrollHeight;
    }
  }, [scenarioText, isGenerating]);

  const handleAttackTypeChange = (e) => {
    const userInput = e.target.value;
    setAttackType(userInput);
    setShowAllSuggestions(false);
    setErrorMessage("");

    if (userInput.length > 0) {
      const filteredSuggestions = ATTACK_TYPES.filter(
        (attack) => attack.toLowerCase().includes(userInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestionIndex(-1);
  };

  const handleShowAllSuggestionsClick = () => {
    setShowAllSuggestions(true);
  };

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        if (
          activeSuggestionIndex <
          (showAllSuggestions
            ? suggestions.length - 1
            : Math.min(suggestions.length, 10) - 1)
        ) {
          setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
      } else if (e.key === 'ArrowUp') {
        if (activeSuggestionIndex > 0) {
          setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }
      } else if (e.key === 'Enter') {
        if (
          activeSuggestionIndex >= 0 &&
          activeSuggestionIndex <
            (showAllSuggestions
              ? suggestions.length
              : Math.min(suggestions.length, 10))
        ) {
          setAttackType(suggestions[activeSuggestionIndex]);
          setSuggestions([]);
          setShowSuggestions(false);
          setActiveSuggestionIndex(-1);
          setShowAllSuggestions(false);
          e.preventDefault();
        }
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        setShowAllSuggestions(false);
      }
    }
  };

  const handleGenerateScenario = () => {
    if (!attackType.trim()) {
      setErrorMessage("Please enter the Type of Attack");
      return;
    }

    setErrorMessage("");
    setIsGenerating(true);
    setScenarioText("");
    setInteractiveQuestions([]);
    setUserAnswers({});
    setFeedback({});
    setScoreCounter(0);
    setScenarioGenerated(true);
    setGenerationComplete(false);

    const data = {
      industry,
      attack_type: attackType,
      skill_level: skillLevel,
      threat_intensity: threatIntensity,
    };

    fetch(`${ENDPOINT}/scenario/stream_scenario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          setIsGenerating(false);
          return response.text().then((text) => {
            setErrorMessage(`Error: ${text}`);
          });
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let scenarioAccumulator = "";

        function readChunk() {
          reader.read().then(({ done, value }) => {
            if (done) {
              setIsGenerating(false);
              setGenerationComplete(true);
              setScenarioText(scenarioAccumulator.trim());
              fetchQuestions(scenarioAccumulator.trim());
              return;
            }
            const chunk = decoder.decode(value, { stream: true });
            scenarioAccumulator += chunk;
            setScenarioText(scenarioAccumulator);
            readChunk();
          });
        }

        readChunk();
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("An error occurred while streaming scenario");
        setIsGenerating(false);
      });
  };

  const fetchQuestions = (finalScenarioText) => {
    if (!finalScenarioText) return;

    const data = { scenario_text: finalScenarioText };

    fetch(`${ENDPOINT}/scenario/stream_questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error fetching questions.");
          return response.text().then((t) => console.error(t));
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let jsonAccumulator = "";

        function readChunk() {
          reader.read().then(({ done, value }) => {
            if (done) {
              try {
                console.log("Accumulated Questions JSON:", jsonAccumulator); 

                const parsed = JSON.parse(jsonAccumulator);

                if (Array.isArray(parsed)) {
                  const errorObj = parsed.find(q => q.error);
                  if (errorObj) {
                    console.error("Error in questions generation:", errorObj.error);
                    setErrorMessage(`Error generating questions: ${errorObj.error}`);
                  } else if (parsed.length === 3) {
                    setInteractiveQuestions(parsed);
                  } else {
                    console.error("Expected exactly 3 questions, but received:", parsed);
                    setErrorMessage("Unexpected number of questions received");
                  }
                } else {
                  console.error("Parsed questions are not in an array format.");
                  setErrorMessage("Invalid format for interactive questions");
                }
              } catch (e) {
                console.error("Failed to parse question JSON:", e);
                console.error("Received text:", jsonAccumulator);
                setErrorMessage("An error occurred while parsing interactive questions");
              }
              return;
            }
            const chunk = decoder.decode(value, { stream: true });
            jsonAccumulator += chunk;
            readChunk();
          });
        }
        readChunk();
      })
      .catch((error) => {
        console.error("Error streaming questions:", error);
        setErrorMessage("Error streaming questions");
      });
  };

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    if (userAnswers.hasOwnProperty(questionIndex)) {
      return; // Already answered
    }
    
    const question = interactiveQuestions[questionIndex];
    const isCorrect = selectedOption === question.correct_answer;

    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));

    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [questionIndex]: {
        isCorrect,
        explanation: question.explanation,
      },
    }));
    
    // Update score counter if correct
    if (isCorrect) {
      setScoreCounter(prev => prev + 1);
    }
  };

  const renderQuestions = () => {
    return interactiveQuestions.map((question, index) => (
      <div key={index} className="question-card">
        <div className="question-header">
          <span className="question-number">Question {index + 1}</span>
          {feedback[index] && (
            <span className={`question-status ${feedback[index].isCorrect ? 'correct' : 'incorrect'}`}>
              {feedback[index].isCorrect ? 
                <><FaCheckCircle /> Correct</> : 
                <><FaTimesCircle /> Incorrect</>
              }
            </span>
          )}
        </div>
        
        <p className="question-text">{question.question}</p>
        
        <div className="options-container">
          {Object.entries(question.options).map(([optionLetter, optionText]) => {
            const isSelected = userAnswers[index] === optionLetter;
            const showCorrect = feedback[index] && question.correct_answer === optionLetter;
            const showIncorrect = feedback[index] && isSelected && !feedback[index].isCorrect;
            
            return (
              <button 
                key={optionLetter} 
                className={`option-button ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showIncorrect ? 'incorrect' : ''}`}
                onClick={() => handleAnswerSelect(index, optionLetter)}
                disabled={userAnswers.hasOwnProperty(index)}
              >
                <span className="option-letter">{optionLetter}</span>
                <span className="option-text">{optionText}</span>
                {showCorrect && <FaCheckCircle className="option-icon correct" />}
                {showIncorrect && <FaTimesCircle className="option-icon incorrect" />}
              </button>
            );
          })}
        </div>
        
        {feedback[index] && (
          <div className="feedback-container">
            <div className="feedback-icon">
              <FaLightbulb />
            </div>
            <div className="feedback-content">
              <p className="feedback-explanation">{feedback[index].explanation}</p>
            </div>
          </div>
        )}
      </div>
    ));
  };

  // Calculate progress based on number of paragraphs
  const calculateStreamProgress = () => {
    if (!scenarioText) return 0;
    
    // Roughly estimate progress by counting paragraphs
    const paragraphs = scenarioText.split('\n\n').filter(p => p.trim().length > 0);
    // Typical scenario has about 5 paragraphs
    return Math.min(Math.ceil((paragraphs.length / 5) * 100), 90);
  };

  const streamProgress = calculateStreamProgress();

  return (
    <div className="scenario-container">
      <div className="scenario-header">
        <div className="scenario-title-container">
          <h1 className="scenario-title">
            <FaShieldAlt className="scenario-title-icon" />
            Scenario Sphere
          </h1>
          <p className="scenario-subtitle">Immerse yourself in realistic cybersecurity scenarios and test your knowledge</p>
        </div>
        
        {errorMessage && (
          <div className="scenario-error">
            <FaExclamationTriangle className="error-icon" />
            <span>{errorMessage}</span>
            <button 
              className="error-close" 
              onClick={() => setErrorMessage("")}
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>

      <div className="scenario-content">
        <div className="scenario-params-card">
          <div className="params-header">
            <h2><FaCog className="params-icon" /> Generation Parameters</h2>
            
            <div className="scenario-score-display">
              <div className="score-counter">
                <span>{scoreCounter}</span>
                <span>/3</span>
              </div>
              <span className="score-label">Correct</span>
            </div>
          </div>
          
          <div className="params-content">
            <div className="param-group">
              <label htmlFor="industry-select">
                <FaBuilding className="param-icon" />
                Industry
              </label>
              <div className="select-wrapper">
                <select
                  id="industry-select"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  disabled={isGenerating}
                >
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Retail">Retail</option>
                  <option value="Technology">Technology</option>
                  <option value="Energy">Energy</option>
                  <option value="Education">Education</option>
                  <option value="Supply Chain">Supply Chain</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Pharmaceutical">Pharmaceutical</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Cybersecurity Company">Cybersecurity Company</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="CYBERPUNK2077">CYBERPUNK2077</option>
                </select>
                <FaChevronDown className="select-arrow" />
              </div>
            </div>

            <div className="param-group" ref={suggestionsRef}>
              <label htmlFor="attack-type-input">
                <FaSkull className="param-icon" />
                Attack Type
              </label>
              <div className="input-wrapper">
                <FaSearch className="input-icon" />
                <input
                  id="attack-type-input"
                  type="text"
                  placeholder="Search or enter attack type..."
                  value={attackType}
                  onChange={handleAttackTypeChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    if (attackType.length > 0 && suggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  disabled={isGenerating}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="suggestions-dropdown">
                    <ul className="suggestions-list">
                      {(showAllSuggestions ? suggestions : suggestions.slice(0, 10)).map(
                        (suggestion, index) => (
                          <li
                            key={suggestion}
                            className={index === activeSuggestionIndex ? 'active' : ''}
                            onClick={() => {
                              setAttackType(suggestion);
                              setSuggestions([]);
                              setShowSuggestions(false);
                              setActiveSuggestionIndex(-1);
                              setShowAllSuggestions(false);
                            }}
                          >
                            {suggestion}
                          </li>
                        )
                      )}
                      {!showAllSuggestions && suggestions.length > 10 && (
                        <li
                          className="show-all-suggestions"
                          onClick={handleShowAllSuggestionsClick}
                        >
                          <FaChevronDown /> Show all options ({suggestions.length})
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="param-group">
              <label htmlFor="skill-level-select">
                <FaUserSecret className="param-icon" />
                Attacker Skill Level
              </label>
              <div className="select-wrapper">
                <select
                  id="skill-level-select"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  disabled={isGenerating}
                >
                  <option value="Script Kiddie">Script Kiddie</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="APT">APT</option>
                </select>
                <FaChevronDown className="select-arrow" />
              </div>
            </div>

            <div className="param-group">
              <label htmlFor="threat-intensity-slider">
                <FaThermometerHalf className="param-icon" />
                Threat Intensity: <span className="intensity-value">{threatIntensity}</span>
              </label>
              <div className="slider-wrapper">
                <input
                  id="threat-intensity-slider"
                  type="range"
                  min="1"
                  max="100"
                  value={threatIntensity}
                  onChange={(e) => setThreatIntensity(e.target.value)}
                  disabled={isGenerating}
                />
                <div className="slider-markers">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            <button
              className="generate-button"
              onClick={handleGenerateScenario}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <FaSpinner className="spinner-icon" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FaPlay className="play-icon" />
                  <span>Generate Scenario</span>
                </>
              )}
            </button>
          </div>
        </div>

        {scenarioGenerated && (
          <div className="scenario-results">
            <div className="scenario-output-card">
              <div 
                className="output-header"
                onClick={() => setOutputExpanded(!outputExpanded)}
              >
                <h2>
                  <FaLock className="output-icon" />
                  Generated Scenario
                </h2>
                <div className="output-controls">
                  {!generationComplete && isGenerating && (
                    <div className="generation-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${streamProgress}%` }}
                        ></div>
                      </div>
                      <span className="progress-label">Generating...</span>
                    </div>
                  )}
                  <button className="toggle-button">
                    {outputExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              </div>
              
              {outputExpanded && (
                <div 
                  className="output-content"
                  ref={scenarioOutputRef}
                >
                  {scenarioText ? (
                    <div className="scenario-text">
                      {scenarioText}
                      {isGenerating && (
                        <span className="typing-cursor"></span>
                      )}
                    </div>
                  ) : (
                    <div className="scenario-placeholder">
                      <FaSpinner className={`placeholder-icon ${isGenerating ? 'spinning' : ''}`} />
                      <p>Scenario will appear here...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {interactiveQuestions.length > 0 && (
              <div className="scenario-questions-card">
                <div 
                  className="questions-header"
                  onClick={() => setQuestionsExpanded(!questionsExpanded)}
                >
                  <h2>
                    <FaQuestionCircle className="questions-icon" />
                    Knowledge Assessment
                  </h2>
                  <button className="toggle-button">
                    {questionsExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                
                {questionsExpanded && (
                  <div className="questions-content">
                    {Object.keys(feedback).length === interactiveQuestions.length && (
                      <div className="assessment-complete">
                        <FaClipboardCheck className="complete-icon" />
                        <div className="assessment-results">
                          <p className="completion-message">Assessment Complete</p>
                          <p className="score-message">
                            You scored {scoreCounter} out of {interactiveQuestions.length} correct
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="questions-list">
                      {renderQuestions()}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioSphere;
