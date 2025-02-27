import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../test.css"; // Make sure this file includes the CSS below

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
    return stored === "true";
  });

  // Show/hide tooltip for the info icon
  const [showExamInfo, setShowExamInfo] = useState(false);

  // State to control the restart popup on the test list page.
  // If non-null, it holds the test number for which the popup is active.
  const [restartPopupTest, setRestartPopupTest] = useState(null);

  // NEW: State to hold the chosen test length for each test card (keyed by test number)
  const allowedTestLengths = [25, 50, 75, 100];
  const [selectedLengths, setSelectedLengths] = useState({});

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

  // Save examMode to localStorage whenever it changes
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

  // Display progress or final score
  const getProgressDisplay = (attemptDoc) => {
    if (!attemptDoc) return "No progress yet";
    const { finished, score, totalQuestions, currentQuestionIndex } = attemptDoc;
    if (finished) {
      const pct = Math.round(
        (score / (totalQuestions || totalQuestionsPerTest)) * 100
      );
      return `Final Score: ${pct}% (${score}/${
        totalQuestions || totalQuestionsPerTest
      })`;
    } else {
      if (typeof currentQuestionIndex === "number") {
        return `Progress: ${currentQuestionIndex + 1} / ${
          totalQuestions || totalQuestionsPerTest
        }`;
      }
      return "No progress yet";
    }
  };

  // Simple difficulty labels/colors (added back from old file)
  const difficultyColors = [
    { label: "Normal", color: "hsl(0, 0%, 100%)" },
    { label: "Very Easy", color: "hsl(120, 100%, 80%)" },
    { label: "Easy", color: "hsl(120, 100%, 70%)" },
    { label: "Moderate", color: "hsl(120, 100%, 60%)" },
    { label: "Intermediate", color: "hsl(120, 100%, 50%)" },
    { label: "Formidable", color: "hsl(120, 100%, 40%)" },
    { label: "Challenging", color: "hsl(120, 100%, 30%)" },
    { label: "Very Challenging", color: "hsl(120, 100%, 20%)" },
    { label: "Ruthless", color: "hsl(120, 100%, 10%)" },
    { label: "Ultra Level", color: "#000" }
  ];

  // Start/resume test
  const startTest = (testNumber, doRestart = false, existingAttempt = null) => {
    if (existingAttempt && !doRestart) {
      // Resume test
      navigate(`/practice-tests/a-plus/${testNumber}`);
    } else {
      // For new or forced restart, use the chosen test length (default to totalQuestionsPerTest if not set)
      const lengthToUse = selectedLengths[testNumber] || totalQuestionsPerTest;
      fetch(`/api/test/attempts/${userId}/${testNumber}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          answers: [],
          score: 0,
          totalQuestions: totalQuestionsPerTest,
          selectedLength: lengthToUse,
          currentQuestionIndex: 0,
          shuffleOrder: [],
          answerOrder: [],
          finished: false,
          examMode
        })
      })
        .then(() => {
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
  const examInfoText = `Replicate a real exam experience—answers and explanations stay hidden until the test is completed🤪`;

  return (
    <div className="tests-list-container">
      <h1 className="tests-list-title">CompTIA A+ Core 1 Practice Tests</h1>

      {/* Centered container for toggle, label, and info icon */}
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
          const difficulty = difficultyColors[i] || { label: "", color: "#fff" };

          const isFinished = attemptDoc?.finished;
          const noAttempt = !attemptDoc;

          return (
            <div key={testNumber} className="test-card">
              <div className="test-badge">Test {testNumber}</div>
              <div
                className="difficulty-label"
                style={{ color: difficulty.color }}
              >
                {difficulty.label}
              </div>
              <p className="test-progress">{progressDisplay}</p>

              {/* 
                Show the test-length selector if:
                1) No attempt doc yet, OR
                2) The attempt doc is already finished.
              */}
              {(noAttempt || isFinished) && (
                <div className="test-length-selector-card">
                  <p>Select Test Length:</p>
                  {allowedTestLengths.map((length) => (
                    <label key={length}>
                      <input
                        type="radio"
                        name={`testLength-${testNumber}`}
                        value={length}
                        checked={
                          (selectedLengths[testNumber] ||
                            totalQuestionsPerTest) === length
                        }
                        onChange={(e) =>
                          setSelectedLengths((prev) => ({
                            ...prev,
                            [testNumber]: Number(e.target.value)
                          }))
                        }
                      />
                      {length}
                    </label>
                  ))}
                </div>
              )}

              {/* 1) If no attempt doc => show "Start" */}
              {noAttempt && (
                <button
                  className="start-button"
                  onClick={() => startTest(testNumber, false, null)}
                >
                  Start
                </button>
              )}

              {/* 2) If attempt exists but not finished => show "Resume" / "Restart" */}
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
                    onClick={() => setRestartPopupTest(testNumber)}
                  >
                    Restart
                  </button>
                </div>
              )}

              {/* 3) If attempt is finished => "View Review" + "Restart" */}
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

      {/* Restart Popup for partially completed tests on the test list page */}
      {restartPopupTest !== null && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>
              You are currently in progress on this test, are you sure you want to restart!?😱 
              Also, if you want to change the test length, please finish your current attempt.
              Restarting now will use your currently selected test length and reset your progress🧙‍♂️.
            </p>
            <div className="popup-buttons">
              <button
                onClick={() => {
                  const attemptDoc = getAttemptDoc(restartPopupTest);
                  startTest(restartPopupTest, true, attemptDoc);
                  setRestartPopupTest(null);
                }}
              >
                Yes, Restart!😎
              </button>
              <button onClick={() => setRestartPopupTest(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APlusTestList;
