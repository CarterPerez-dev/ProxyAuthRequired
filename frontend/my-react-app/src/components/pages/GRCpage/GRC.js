// GRC.js - Redesigned with gamified UI
import React, { useState, useCallback, useEffect } from "react";
import "./GRC.css";
import SubscriptionErrorHandler from '../../SubscriptionErrorHandler';
import { 
  FaRandom, 
  FaBalanceScale, 
  FaClipboardCheck, 
  FaSearch,
  FaFileAlt, 
  FaUsers, 
  FaFileContract, 
  FaUserSecret, 
  FaShieldAlt,
  FaUserTie, 
  FaSyncAlt, 
  FaBook,
  FaLock,
  FaCopy,
  FaCheck,
  FaTimes,
  FaLightbulb,
  FaSpinner,
  FaTrophy,
  FaRocket,
  FaRegLightbulb
} from "react-icons/fa";

const ENDPOINT = "/api";

// Icon mapping for categories
const categoryIcons = {
  "Regulation": <FaBalanceScale />,
  "Risk Management": <FaShieldAlt />,
  "Compliance": <FaClipboardCheck />,
  "Audit": <FaSearch />,
  "Governance": <FaUsers />,
  "Management": <FaUserTie />,
  "Policy": <FaFileContract />,
  "Ethics": <FaUserSecret />,
  "Threat Assessment": <FaLock />,
  "Leadership": <FaUserTie />,
  "Business Continuity": <FaSyncAlt />,
  "Random": <FaRandom />
};

// Difficulty level icons and colors
const difficultyIcons = {
  "Easy": <FaRegLightbulb />,
  "Medium": <FaRocket />,
  "Hard": <FaTrophy />
};

const difficultyColors = {
  "Easy": "#2ebb77",
  "Medium": "#ffc107",
  "Hard": "#ff4c8b"
};

const GRC = () => {
  // Add subscription error handler
  const subscriptionErrorHandler = SubscriptionErrorHandler();
  
  const [category, setCategory] = useState("Random");
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const categories = [
    "Regulation",
    "Risk Management",
    "Compliance",
    "Audit",
    "Governance",
    "Management",
    "Policy",
    "Ethics",
    "Threat Assessment",
    "Leadership",
    "Business Continuity",
    "Random"
  ];
  
  const difficulties = ["Easy", "Medium", "Hard"];

  // Reset copy status after 2 seconds
  useEffect(() => {
    if (copiedToClipboard) {
      const timer = setTimeout(() => {
        setCopiedToClipboard(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedToClipboard]);

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    setFeedback("");
    setQuestionData(null);
    setSelectedOption(null);
    setShowExplanation(false);

    try {
      const response = await fetch(`${ENDPOINT}/grc/generate_question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, difficulty }),
      });

      if (!response.ok) {
        const errData = await response.json();
        
        // Check if this is a subscription error
        if (subscriptionErrorHandler.handleApiError(errData, 'grc')) {
          // Error was handled, clean up UI state
          setLoading(false);
          return;
        }
        
        throw new Error(errData.error || "Failed to fetch question");
      }

      const data = await response.json();
      setQuestionData(data);
    } catch (error) {
      console.error("Error fetching question:", error);
      
      // Check if this is a subscription error
      if (!subscriptionErrorHandler.handleApiError(error, 'grc')) {
        // Only set feedback if not a subscription error
        setFeedback("Error fetching question. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [category, difficulty, subscriptionErrorHandler]);

  const handleAnswer = useCallback(
    (index) => {
      if (!questionData) return;
      setSelectedOption(index);
      const correctIndex = questionData.correct_answer_index;
      const isCorrect = index === correctIndex;
      
      setFeedback(isCorrect ? "Correct!" : "Incorrect");
      setShowExplanation(true);
    },
    [questionData]
  );

  const handleCopy = useCallback(() => {
    if (!questionData || !showExplanation) return;
    
    const correctIndex = questionData.correct_answer_index;
    const correctExplanation = questionData.explanations[correctIndex.toString()];
    const examTip = questionData.exam_tip;
    
    const textToCopy = `Question: ${questionData.question}\n\nOptions:\n${questionData.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\nCorrect Answer: ${questionData.options[correctIndex]}\n\nExplanation: ${correctExplanation}\n\nExam Tip: ${examTip}`;
    
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedToClipboard(true);
      })
      .catch((err) => console.error("Failed to copy:", err));
  }, [questionData, showExplanation]);

  const getNewQuestion = () => {
    fetchQuestion();
  };

  return (
    <div className="grc-wizard-page">
      {/* Render the subscription error handler UI if needed */}
      {subscriptionErrorHandler.render()}
      
      <div className="grc-header">
        <div className="grc-title-container">
          <h1 className="grc-title">GRC Wizard</h1>
          <p className="grc-subtitle">Master the art of Governance, Risk, and Compliance</p>
        </div>
      </div>

      <div className="grc-content">
        <div className="grc-wizard-card">
          <div className="grc-card-header">
            <h2>Generate a Question</h2>
            <p>Select a category and difficulty level</p>
          </div>
          
          <div className="grc-controls">
            <div className="grc-control-group">
              <label className="grc-label" htmlFor="category-select">
                Category
              </label>
              <div className="grc-select-wrapper">
                <select
                  id="category-select"
                  className="grc-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={loading}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="grc-select-icon">
                  {categoryIcons[category] || <FaRandom />}
                </span>
              </div>
            </div>

            <div className="grc-control-group">
              <label className="grc-label" htmlFor="difficulty-select">
                Difficulty
              </label>
              <div className="grc-select-wrapper">
                <select
                  id="difficulty-select"
                  className="grc-select"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  disabled={loading}
                >
                  {difficulties.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <span className="grc-select-icon" style={{ color: difficultyColors[difficulty] }}>
                  {difficultyIcons[difficulty]}
                </span>
              </div>
            </div>

            <button
              className="grc-generate-btn"
              onClick={fetchQuestion}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="grc-spinner" />
                  <span>Generating</span>
                </>
              ) : questionData ? (
                <>
                  <FaSyncAlt />
                  <span>New Question</span>
                </>
              ) : (
                <>
                  <FaBook />
                  <span>Generate Question</span>
                </>
              )}
            </button>
          </div>
        </div>

        {questionData && (
          <div className="grc-question-card">
            <div className="grc-question-header">
              <div className="grc-question-meta">
                <span className="grc-question-category">
                  {categoryIcons[category]} {category}
                </span>
                <span className="grc-question-difficulty" style={{ color: difficultyColors[difficulty] }}>
                  {difficultyIcons[difficulty]} {difficulty}
                </span>
              </div>
              <h3 className="grc-question-title">Question</h3>
            </div>

            <div className="grc-question-content">
              <p className="grc-question-text">{questionData.question}</p>
              
              <div className="grc-options-container">
                {questionData.options.map((option, index) => {
                  const isCorrect = index === questionData.correct_answer_index;
                  let optionClass = "grc-option";
                  
                  if (selectedOption !== null) {
                    if (index === selectedOption) {
                      optionClass += " selected";
                    }
                    if (showExplanation) {
                      optionClass += isCorrect ? " correct" : " incorrect";
                    }
                  }
                  
                  return (
                    <button
                      key={index}
                      className={optionClass}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedOption !== null}
                    >
                      <span className="grc-option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="grc-option-text">{option}</span>
                      {showExplanation && isCorrect && (
                        <span className="grc-option-status">
                          <FaCheck className="grc-status-icon correct" />
                        </span>
                      )}
                      {showExplanation && selectedOption === index && !isCorrect && (
                        <span className="grc-option-status">
                          <FaTimes className="grc-status-icon incorrect" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {showExplanation && (
              <div className="grc-explanation-container">
                <div className="grc-explanation-header">
                  <h3>
                    {selectedOption === questionData.correct_answer_index ? (
                      <><FaCheck className="grc-header-icon correct" /> Correct Answer</>
                    ) : (
                      <><FaTimes className="grc-header-icon incorrect" /> Incorrect Answer</>
                    )}
                  </h3>
                  <button 
                    className={`grc-copy-btn ${copiedToClipboard ? 'copied' : ''}`}
                    onClick={handleCopy}
                  >
                    {copiedToClipboard ? (
                      <><FaCheck /> Copied</>
                    ) : (
                      <><FaCopy /> Copy</>
                    )}
                  </button>
                </div>
                
                <div className="grc-explanation-content">
                  <div className="grc-explanation-section">
                    <h4>Explanation</h4>
                    <p>{questionData.explanations[selectedOption.toString()]}</p>
                  </div>
                  
                  <div className="grc-explanation-section">
                    <h4><FaLightbulb className="grc-tip-icon" /> Exam Tip</h4>
                    <p className="grc-tip-text">{questionData.exam_tip}</p>
                  </div>
                </div>
                
                <div className="grc-action-buttons">
                  <button 
                    className="grc-next-btn" 
                    onClick={getNewQuestion}
                  >
                    <FaSyncAlt />
                    <span>New Question</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GRC;
