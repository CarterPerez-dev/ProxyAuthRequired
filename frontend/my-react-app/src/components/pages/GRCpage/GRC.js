import React, { useState, useCallback } from "react";
import "./GRC.css";

const ENDPOINT = "/api"; 

const GRC = () => {
  const [category, setCategory] = useState("Random");
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");

  const categories = [
    "Regulation", "Risk Management", "Compliance", "Audit", "Governance", 
    "Management", "Policy", "Ethics", "Threat Assessment", "Leadership", 
    "Business Continuity", "Random"
  ];
  const difficulties = ["Easy", "Medium", "Hard"];

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    setFeedback("");
    setQuestionData(null);
    setSelectedOption(null);

    try {
      const response = await fetch(`${ENDPOINT}/grc/generate_question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, difficulty }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch question");
      }

      const data = await response.json();
      setQuestionData(data);
    } catch (error) {
      console.error("Error fetching question:", error);
      setFeedback("Error fetching question. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [category, difficulty]);

  const handleAnswer = useCallback((index) => {
    if (!questionData) return;
    const correctIndex = questionData.correct_answer_index;
    if (index === correctIndex) {
      setFeedback(
        `✅ Correct! ${questionData.explanations[index.toString()]}\nExam Tip: ${questionData.exam_tip}`
      );
    } else {
      setFeedback(
        `❌ Incorrect. ${questionData.explanations[index.toString()]}\nExam Tip: ${questionData.exam_tip}`
      );
    }
  }, [questionData]);

  const handleCopy = useCallback(() => {
    if (!questionData || !feedback) return;
    const textToCopy = `Question: ${questionData.question}\n${feedback}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch(err => console.error("Failed to copy:", err));
  }, [questionData, feedback]);

  return (
    <div className="grc-wizard-page">
      <div className="grc-wizard-container">
        <div className="grc-wizard-header">
          <h1 className="grc-title">GRC Wizard</h1>
          <p className="grc-subtitle">
            Choose a category and difficulty, then test your GRC knowledge.
          </p>
        </div>

        <div className="grc-wizard-controls">
          <div className="grc-control">
            <label className="grc-label" htmlFor="category-select">Category</label>
            <select
              id="category-select"
              className="grc-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Select Category"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grc-control">
            <label className="grc-label" htmlFor="difficulty-select">Difficulty</label>
            <select
              id="difficulty-select"
              className="grc-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              aria-label="Select Difficulty"
            >
              {difficulties.map((level, idx) => (
                <option key={idx} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="button-and-sphere">
            <button
              className="grc-generate-btn"
              onClick={fetchQuestion}
              disabled={loading}
              aria-label="Generate Question"
            >    
              {loading ? (
                <span className="grc-button-loading-version1" aria-label="Loading">
                  Generating_
                </span>
              ) : (
                "Generate Question"
              )}
            </button>
          </div>
        </div>

        {questionData && (
          <div className="grc-question-container">
            <h2 className="grc-question">{questionData.question}</h2>
            <div className="grc-options">
              {questionData.options.map((option, index) => (
                <button
                  key={index}
                  className={`grc-option-btn ${selectedOption === index ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedOption(index);
                    handleAnswer(index);
                  }}
                  disabled={!!feedback}
                  aria-label={`Option ${index + 1}: ${option}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {feedback && (
          <div
            className={`grc-feedback ${
              feedback.includes("Correct") ? "correct" : "incorrect"
            }`}
          >
            {feedback}
            <button className="copy-btn" onClick={handleCopy} aria-label="Copy Feedback">
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GRC;

