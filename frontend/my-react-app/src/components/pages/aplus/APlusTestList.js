import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../test.css"; // Ensure you have your updated toggle & tooltip CSS here

const APlusTestList = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const totalQuestionsPerTest = 100;
  const category = "aplus";

  const [attemptData, setAttemptData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persist examMode in localStorage
  const [examMode, setExamMode] = useState(() => {
    const stored = localStorage.getItem("examMode");
    return stored === "true"; // Evaluate string => boolean
  });

  // Show/hide tooltip for the info icon
  const [showExamInfo, setShowExamInfo] = useState(false);

  // Fetch attempts from backend once userId is available
  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    const fetchAttempts = async () => {
      try {
        const res = await fetch(`/api/test/attempts/${userId}/list`);
        if (!res.ok) {
          throw new Error("Failed to fetch attempts for user");
        }
        const data = await res.json();
        const attemptList = data.attempts || [];

        // Filter attempts for this category
        const relevant = attemptList.filter((a) => a.category === category);

        // For each testId, pick the best attempt doc (unfinished if exists, else latest finished)
        const bestAttempts = {};
        for (let att of relevant) {
          const testKey = att.testId;
          if (!bestAttempts[testKey]) {
            bestAttempts[testKey] = att;
          } else {
            const existing = bestAttempts[testKey];
            // If we have an unfinished attempt, keep it;
            // otherwise compare finish times.
            if (!existing.finished && att.finished) {
              // keep existing
            } else if (existing.finished && !att.finished) {
              bestAttempts[testKey] = att;
            } else {
              const existingTime = new Date(existing.finishedAt || 0).getTime();
              const newTime = new Date(att.finishedAt || 0).getTime();
              if (newTime > existingTime) {
                bestAttempts[testKey] = att;
              }
            }
          }
        }

        setAttemptData(bestAttempts);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAttempts();
  }, [userId, category]);

  // Whenever examMode changes, store it in localStorage
  useEffect(() => {
    localStorage.setItem("examMode", examMode ? "true" : "false");
  }, [examMode]);

  if (!userId) {
    return <div className="tests-list-container">Please log in.</div>;
  }

  if (loading) {
    return <div className="tests-list-container">Loading attempts...</div>;
  }
  if (error) {
    return <div className="tests-list-container">Error: {error}</div>;
  }

  // Helper: retrieve doc from bestAttempts or return null
  const getAttemptDoc = (testNumber) => {
    return attemptData[testNumber] || null;
  };

  // Display “progress” or final score
  const getProgressDisplay = (attemptDoc) => {
    if (!attemptDoc) return "No progress yet";
    const { finished, score, totalQuestions, currentQuestionIndex } = attemptDoc;
    if (finished) {
      const pct = Math.round((score / (totalQuestions || totalQuestionsPerTest)) * 100);
      return `Final Score: ${pct}% (${score}/${totalQuestions || totalQuestionsPerTest})`;
    } else {
      if (typeof currentQuestionIndex === "number") {
        return `Progress: ${currentQuestionIndex + 1} / ${totalQuestions || totalQuestionsPerTest}`;
      }
      return "No progress yet";
    }
  };

  // Start or resume a test
  const startTest = (testNumber, doRestart = false, existingAttempt = null) => {
    if (existingAttempt && !doRestart) {
      // resume
      navigate(`/practice-tests/a-plus/${testNumber}`);
    } else {
      // brand new or forced restart => upsert doc with examMode
      fetch(`/api/test/attempts/${userId}/${testNumber}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          answers: [],
          score: 0,
          totalQuestions: totalQuestionsPerTest,
          currentQuestionIndex: 0,
          shuffleOrder: [],
          answerOrder: [],
          finished: false,
          examMode
        })
      })
        .then(() => {
          // Navigate to the global test page, passing examMode in route state
          navigate(`/practice-tests/a-plus/${testNumber}`, {
            state: { examMode }
          });
        })
        .catch((err) => {
          console.error("Failed to create new attempt doc:", err);
        });
    }
  };

  // Description text for exam mode
  const examInfoText = `Exam Mode hides immediate correctness and explanations,
and awards XP only when you finish the test. You can change answers until the end.`;

  return (
    <div className="tests-list-container">
      <h1 className="tests-list-title">CompTIA A+ Core 1 Practice Tests</h1>

      {/* Centered container for the toggle + label + info icon */}
      <div className="centered-toggle-container">
        <div className="toggle-with-text">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={examMode}
              onChange={(e) => setExamMode(e.target.checked)}
            />
            <span className="slider">{examMode ? "ON" : "OFF"}</span>
          </label>
          <span className="toggle-label">Exam Mode</span>

          {/* The info icon: hover or tap => show tooltip */}
          <div
            className="info-icon-container"
            onMouseEnter={() => setShowExamInfo(true)}
            onMouseLeave={() => setShowExamInfo(false)}
            onClick={() => setShowExamInfo((prev) => !prev)}
          >
            <div className="info-icon">ⓘ</div>
            {showExamInfo && (
              <div className="info-tooltip">
                {examInfoText}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tests-list-grid">
        {Array.from({ length: 10 }, (_, i) => {
          const testNumber = i + 1;
          const attemptDoc = getAttemptDoc(testNumber);
          const progressDisplay = getProgressDisplay(attemptDoc);

          return (
            <div key={testNumber} className="test-card">
              <div className="test-badge">Test {testNumber}</div>
              <p className="test-progress">{progressDisplay}</p>

              {!attemptDoc && (
                <button
                  className="start-button"
                  onClick={() => startTest(testNumber, false, null)}
                >
                  Start
                </button>
              )}

              {attemptDoc && !attemptDoc.finished && (
                <div className="test-card-buttons">
                  <button
                    className="resume-button"
                    onClick={() => startTest(testNumber, false, attemptDoc)}
                  >
                    Resume
                  </button>
                  <button
                    className="restart-button-testlist"
                    onClick={() => startTest(testNumber, true, attemptDoc)}
                  >
                    Restart
                  </button>
                </div>
              )}

              {attemptDoc && attemptDoc.finished && (
                <div className="test-card-buttons">
                  <button
                    className="resume-button"
                    onClick={() =>
                      navigate(`/practice-tests/a-plus/${testNumber}`, {
                        state: { review: true }
                      })
                    }
                  >
                    View Review
                  </button>
                  <button
                    className="restart-button-testlist"
                    onClick={() => startTest(testNumber, true, attemptDoc)}
                  >
                    Restart
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default APlusTestList;
