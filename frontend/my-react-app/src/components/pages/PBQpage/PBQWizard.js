/**
 * PBQWizard.js
 *
 * React component for generating a PBQ from /generate_pbq_stream (SSE)
 * and simulating Nmap commands via /simulate_cmd. 
 * Renders multiple sub-tasks with MC answers, etc.
 */

import React, { useState, useRef, useEffect } from 'react';
import './PBQWizard.css';

const ENDPOINT = "/api"; // Adjust if needed

const PBQWizard = () => {
  // PBQ generation parameters
  const [category, setCategory] = useState("Network Security");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [performanceLevel, setPerformanceLevel] = useState("average");

  const [pbqData, setPbqData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Debug SSE text
  const [streamedText, setStreamedText] = useState("");

  // Terminal simulation
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");

  // Sub-task state
  const [currentSubTaskIndex, setCurrentSubTaskIndex] = useState(0);
  const [subTaskCompleted, setSubTaskCompleted] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [correctCount, setCorrectCount] = useState(0);

  // Refs for auto-scrolling
  const terminalRef = useRef(null);
  const pbqContainerRef = useRef(null);

  /*********************************
   * PBQ Generation (SSE streaming)
   *********************************/
  const handleGeneratePBQ = async () => {
    setLoading(true);
    resetState();

    const bodyData = {
      category,
      difficulty,
      performance_level: performanceLevel
    };

    try {
      const response = await fetch(`${ENDPOINT}/pbq/generate_pbq_stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let completeText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        completeText += chunk;
        setStreamedText(prev => prev + chunk);
      }

      // Now parse SSE lines from completeText
      let jsonBuffer = "";
      const lines = completeText.split("\n");
      for (let line of lines) {
        line = line.trim();
        if (line.startsWith("data: ")) {
          const payload = line.slice("data: ".length).trim();
          if (payload && payload !== "[DONE]") {
            jsonBuffer += payload;
          }
        }
      }

      if (!jsonBuffer) {
        setPbqData({ error: "No data received from server." });
      } else {
        try {
          const parsed = JSON.parse(jsonBuffer);
          setPbqData(parsed);
        } catch (parseErr) {
          console.error("Error parsing PBQ JSON:", parseErr, jsonBuffer);
          setPbqData({ error: "Received malformed or partial JSON from server." });
        }
      }

    } catch (err) {
      console.error("Error generating PBQ:", err);
      setPbqData({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  /*********************************
   * Terminal / Nmap Simulation
   *********************************/
  const handleCommandSubmit = async (e) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    setTerminalLines(prev => [...prev, `> ${currentCommand}`]);

    try {
      const res = await fetch(`${ENDPOINT}/pbq/simulate_cmd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: currentCommand })
      });
      if (!res.ok) {
        throw new Error(`simulate_cmd: HTTP status ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        setTerminalLines(prev => [...prev, `Error: ${data.error}`]);
      } else {
        setTerminalLines(prev => [...prev, data.output]);
      }
    } catch (err) {
      setTerminalLines(prev => [...prev, `Error calling simulate_cmd: ${err.message}`]);
    } finally {
      setCurrentCommand("");
    }
  };

  /*********************************
   * Sub-task logic
   *********************************/
  const handleMultipleChoiceChange = (subTaskIndex, choiceIndex) => {
    setUserAnswers(prev => ({ ...prev, [subTaskIndex]: choiceIndex }));
  };

  const handleSubmitFollowup = (subTaskIndex) => {
    if (!pbqData || !pbqData.subTasks) return;
    const subTask = pbqData.subTasks[subTaskIndex];
    if (!subTask) return;

    const chosenIndex = userAnswers[subTaskIndex];
    if (chosenIndex === undefined) {
      alert("Please select an answer first.");
      return;
    }

    setSubTaskCompleted(prev => ({ ...prev, [subTaskIndex]: true }));
    if (subTask.correctAnswerIndex === chosenIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (subTaskCompleted[currentSubTaskIndex]) {
      const nextIndex = currentSubTaskIndex + 1;
      if (pbqData?.subTasks && nextIndex < pbqData.subTasks.length) {
        setCurrentSubTaskIndex(nextIndex);
      }
    }
  }, [subTaskCompleted, currentSubTaskIndex, pbqData]);

  /*********************************
   * Auto-scrolling
   *********************************/
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    if (pbqContainerRef.current) {
      pbqContainerRef.current.scrollTop = pbqContainerRef.current.scrollHeight;
    }
  }, [terminalLines, pbqData]);

  /*********************************
   * Helper
   *********************************/
  const resetState = () => {
    setPbqData(null);
    setStreamedText("");
    setTerminalLines([]);
    setCurrentCommand("");
    setCurrentSubTaskIndex(0);
    setSubTaskCompleted({});
    setUserAnswers({});
    setCorrectCount(0);
  };

  /*********************************
   * Render sub-tasks
   *********************************/
  const renderSubTaskDetails = (subTask, index) => {
    if (index > currentSubTaskIndex) return null;

    return (
      <div className="subtask-details" key={index}>
        <h3 className="subtask-title">{subTask.taskTitle}</h3>
        <p className="subtask-description">{subTask.taskDescription}</p>

        {subTask.followUpQuestion && (
          <div className="followup-question">{subTask.followUpQuestion}</div>
        )}

        {subTask.possibleAnswers && subTask.possibleAnswers.length > 0 && (
          <div className="possible-answers">
            {subTask.possibleAnswers.map((ans, ansIdx) => (
              <label key={ansIdx}>
                <input
                  type="radio"
                  name={`subtask-${index}`}
                  value={ansIdx}
                  checked={userAnswers[index] === ansIdx}
                  onChange={() => handleMultipleChoiceChange(index, ansIdx)}
                  disabled={!!subTaskCompleted[index]}
                />
                {ans}
              </label>
            ))}
          </div>
        )}

        {!subTaskCompleted[index] && subTask.possibleAnswers && (
          <button 
            className="submit-answer-button"
            onClick={() => handleSubmitFollowup(index)}
          >
            Submit Answer
          </button>
        )}

        {subTaskCompleted[index] && subTask.explanation && (
          <div className="explanation-block">
            <strong>Explanation:</strong>
            <p>{subTask.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  /*********************************
   * Render PBQ
   *********************************/
  const renderPBQ = () => {
    if (!pbqData) return null;
    if (pbqData.error) {
      return <p className="error-msg">Error: {pbqData.error}</p>;
    }
    if (!pbqData.subTasks) {
      return <p className="error-msg">No subTasks found in PBQ data. Possibly invalid structure.</p>;
    }

    const allDone = pbqData.subTasks.every((_, i) => subTaskCompleted[i]);

    return (
      <div className="pbq-container" ref={pbqContainerRef}>
        <h2 className="pbq-title">{pbqData.pbqTitle}</h2>
        <p className="pbq-difficulty">Difficulty: {pbqData.difficulty}</p>

        {/* Terminal window */}
        <div className="terminal-window" ref={terminalRef}>
          {terminalLines.map((line, i) => (
            <div key={i} className="terminal-line">{line}</div>
          ))}
        </div>

        {/* Terminal input if not all done */}
        {!allDone && (
          <form className="terminal-input-form" onSubmit={handleCommandSubmit}>
            <input
              className="terminal-input"
              type="text"
              placeholder="Type an Nmap command here..."
              value={currentCommand}
              onChange={e => setCurrentCommand(e.target.value)}
            />
          </form>
        )}

        {pbqData.subTasks.map((st, i) => renderSubTaskDetails(st, i))}

        {allDone && pbqData.overallSummary && (
          <div className="pbq-overallSummary">
            <h4>Overall Summary</h4>
            <p>{pbqData.overallSummary}</p>
            <p className="pbq-score">
              Your Score: {correctCount} / {pbqData.subTasks.length}
            </p>
          </div>
        )}
      </div>
    );
  };

  /*********************************
   * Final Return
   *********************************/
  return (
    <div className="pbq-wizard-page">
      <header className="pbq-header">
        <h1>Advanced Nmap PBQ Wizard</h1>
        <p>Practice advanced Nmap flags in a simulated CLI environment.</p>
      </header>

      <section className="pbq-controls">
        <div className="control-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="e.g. Network Security"
          />
        </div>

        <div className="control-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="performanceLevel">Performance Level:</label>
          <select
            id="performanceLevel"
            value={performanceLevel}
            onChange={e => setPerformanceLevel(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="average">Average</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          className="generate-pbq-button"
          onClick={handleGeneratePBQ}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate PBQ"}
        </button>
      </section>

      <main className="pbq-main-content">
        {renderPBQ()}

        {/* SSE Debug */}
        {streamedText && (
          <div className="debug-section">
            <h4>Debug: Streamed Raw Text</h4>
            <pre>{streamedText}</pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default PBQWizard;

