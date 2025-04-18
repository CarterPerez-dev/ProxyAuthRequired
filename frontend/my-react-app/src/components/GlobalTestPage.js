// GlobalTestPage.js
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setXPAndCoins } from "./pages/store/slice/userSlice";
import { fetchShopItems } from "./pages/store/slice/shopSlice";
import ConfettiAnimation from "./ConfettiAnimation";
import { showAchievementToast } from "./pages/store/AchievementToast";
import "./test.css";
import iconMapping from "./iconMapping";
import colorMapping from "./colorMapping";
import FormattedQuestion from './FormattedQuestion';
import QuestionLimitBanner from './QuestionLimitBanner';
import UpgradePrompt from './UpgradePrompt';
import {
  FaTrophy,
  FaMedal,
  FaStar,
  FaCrown,
  FaBolt,
  FaBook,
  FaBrain,
  FaCheckCircle,
  FaCoins,
  FaFlagCheckered,
  FaArrowLeft,
  FaArrowRight,
  FaRedoAlt,
  FaStepForward,
  FaExclamationTriangle,
  FaPlay,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCheck,
  FaFlag,
  FaLevelUpAlt,
  FaSpinner,
  FaList,
  FaClipboardList,
  FaFilter,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaUser,
  FaPause,
  FaClock
} from "react-icons/fa";

// Helper functions
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleIndices(length) {
  const indices = Array.from({ length }, (_, i) => i);
  return shuffleArray(indices);
}

// Reusable QuestionDropdown component
const QuestionDropdown = ({
  totalQuestions,
  currentQuestionIndex,
  onQuestionSelect,
  answers,
  flaggedQuestions,
  testData,
  shuffleOrder,
  examMode
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getQuestionStatus = (index) => {
    const realIndex = shuffleOrder[index];
    const question = testData.questions[realIndex];
    const answer = answers.find((a) => a.questionId === question.id);
    const isFlagged = flaggedQuestions.includes(question.id);
    const isAnswered = answer?.userAnswerIndex !== undefined;
    const isSkipped = answer?.userAnswerIndex === null;
    const isCorrect =
      answer && answer.userAnswerIndex === question.correctAnswerIndex;
    return { isAnswered, isSkipped, isCorrect, isFlagged };
  };

  return (
    <div className="question-dropdown" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
        <FaList className="dropdown-icon" />
        <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const status = getQuestionStatus(i);
            let statusClass = "";
            if (status.isAnswered && !status.isSkipped) {
              statusClass = status.isCorrect ? "correct" : "incorrect";
            } else if (status.isSkipped) {
              statusClass = "skipped";
            }
            
            return (
              <button
                key={i}
                onClick={() => {
                  onQuestionSelect(i);
                  setIsOpen(false);
                }}
                className={`dropdown-item ${i === currentQuestionIndex ? 'active' : ''} ${statusClass}`}
              >
                <span>Question {i + 1}</span>
                <div className="status-indicators">
                  {status.isSkipped && <span className="skip-indicator">⏭️</span>}
                  {status.isFlagged && <span className="flag-indicator">🚩</span>}
                  {!examMode && status.isAnswered && !status.isSkipped && (
                    <span
                      className={
                        status.isCorrect
                          ? "answer-indicator correct"
                          : "answer-indicator incorrect"
                      }
                    >
                      {status.isCorrect ? "✓" : "✗"}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const GlobalTestPage = ({
  testId,
  category,
  backToListPath,
  navigateBackAfterCompletion = false
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux user data
  const { 
    xp, 
    level, 
    coins, 
    userId, 
    xpBoost, 
    currentAvatar, 
    subscriptionActive, 
    practiceQuestionsRemaining 
  } = useSelector(
    (state) => state.user
  );
  const achievements = useSelector((state) => state.achievements.all);
  const { items: shopItems, status: shopStatus } = useSelector(
    (state) => state.shop
  );

  // Local states for test logic
  const [testData, setTestData] = useState(null);
  const [shuffleOrder, setShuffleOrder] = useState([]);
  const [answerOrder, setAnswerOrder] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [loadingTest, setLoadingTest] = useState(true);
  const [error, setError] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  // Overlays
  const [showScoreOverlay, setShowScoreOverlay] = useState(false);
  const [showReviewMode, setShowReviewMode] = useState(false);

  // Confetti on level-up
  const [localLevel, setLocalLevel] = useState(level);
  const [showLevelUpOverlay, setShowLevelUpOverlay] = useState(false);

  // Flags
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);

  // Confirmation popups
  const [showRestartPopup, setShowRestartPopup] = useState(false);
  const [showFinishPopup, setShowFinishPopup] = useState(false);
  const [showNextPopup, setShowNextPopup] = useState(false);

  // Exam mode
  const [examMode, setExamMode] = useState(false);

  // Test length selection state
  const allowedTestLengths = [25, 50, 75, 100];
  const [selectedLength, setSelectedLength] = useState(100);
  const [activeTestLength, setActiveTestLength] = useState(null);
  const [showTestLengthSelector, setShowTestLengthSelector] = useState(false);
  
  // Free user question limit handling
  const [showQuestionLimitPrompt, setShowQuestionLimitPrompt] = useState(false);

  useEffect(() => {
    if (shopStatus === "idle") {
      dispatch(fetchShopItems());
    }
  }, [shopStatus, dispatch]);

  // Clean up on unmount and save progress
  useEffect(() => {
    return () => {
      // IMPORTANT FIX: Always save progress when leaving the component
      if (userId && testId && testData && !loadingTest) {
        const saveProgressOnExit = async () => {
          try {
            await fetch(`/api/test/attempts/${userId}/${testId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                category,
                answers,
                score,
                totalQuestions: testData?.questions?.length || 0,
                selectedLength: activeTestLength,
                currentQuestionIndex,
                shuffleOrder,
                answerOrder,
                finished: isFinished,
                examMode
              })
            });
          } catch (err) {
            console.error("Failed to save progress on exit", err);
          }
        };
        
        saveProgressOnExit();
      }
    };
  }, [userId, testId, testData, loadingTest, category, answers, score, activeTestLength, currentQuestionIndex, shuffleOrder, answerOrder, isFinished, examMode]);

  const fetchTestAndAttempt = async () => {
    setLoadingTest(true);
    try {
      let attemptDoc = null;
      if (userId) {
        // IMPORTANT CHANGE: First check for unfinished attempts
        const unfinishedRes = await fetch(`/api/test/attempts/${userId}/${testId}?status=unfinished`);
        const unfinishedData = await unfinishedRes.json();
        
        if (unfinishedData.attempt) {
          attemptDoc = unfinishedData.attempt;
        } else {
          // If no unfinished attempt, check for finished attempts
          const finishedRes = await fetch(`/api/test/attempts/${userId}/${testId}?status=finished`);
          const finishedData = await finishedRes.json();
          attemptDoc = finishedData.attempt;
        }
      }
      
      const testRes = await fetch(`/api/test/tests/${category}/${testId}`);
      if (!testRes.ok) {
        const errData = await testRes.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to fetch test data");
      }
      const testDoc = await testRes.json();
      setTestData(testDoc);

      const totalQ = testDoc.questions.length;

      // Check if attempt exists
      if (attemptDoc) {
        // If the test is already finished, we keep the data but also mark isFinished
        setAnswers(attemptDoc.answers || []);
        setScore(attemptDoc.score || 0);
        setIsFinished(attemptDoc.finished === true);

        // IMPORTANT FIX: Always use the exam mode from the attempt doc
        // This ensures exam mode doesn't change when resuming
        const attemptExam = attemptDoc.examMode === true;
        setExamMode(attemptExam);
        
        // Also update the localStorage to match this value to maintain consistency
        localStorage.setItem("examMode", attemptExam ? "true" : "false");

        // Use the chosen length if available
        const chosenLength = attemptDoc.selectedLength || totalQ;
        setActiveTestLength(chosenLength);

        // IMPORTANT FIX: Only use saved shuffleOrder if it exists AND matches the chosen length
        // Otherwise, keep using the existing shuffleOrder (don't create a new one)
        if (
          attemptDoc.shuffleOrder &&
          Array.isArray(attemptDoc.shuffleOrder) &&
          attemptDoc.shuffleOrder.length === chosenLength
        ) {
          setShuffleOrder(attemptDoc.shuffleOrder);
        } else {
          // If we don't have a valid shuffle order, create a new one
          const newQOrder = shuffleIndices(chosenLength);
          setShuffleOrder(newQOrder);
          
          // Immediately save this new shuffle order to the backend
          // to ensure it's preserved for future sessions
          await fetch(`/api/test/attempts/${userId}/${testId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category,
              answers: attemptDoc.answers || [],
              score: attemptDoc.score || 0,
              totalQuestions: totalQ,
              selectedLength: chosenLength,
              currentQuestionIndex: attemptDoc.currentQuestionIndex || 0,
              shuffleOrder: newQOrder,
              answerOrder: attemptDoc.answerOrder || [],
              finished: attemptDoc.finished === true,
              examMode: attemptExam
            })
          });
        }

        // Same logic for answerOrder
        if (
          attemptDoc.answerOrder &&
          Array.isArray(attemptDoc.answerOrder) &&
          attemptDoc.answerOrder.length === chosenLength
        ) {
          setAnswerOrder(attemptDoc.answerOrder);
        } else {
          const generatedAnswerOrder = testDoc.questions
            .slice(0, chosenLength)
            .map((q) => {
              const numOptions = q.options.length;
              return shuffleArray([...Array(numOptions).keys()]);
            });
          setAnswerOrder(generatedAnswerOrder);
          
          // Immediately save the new answer order
          await fetch(`/api/test/attempts/${userId}/${testId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category,
              answers: attemptDoc.answers || [],
              score: attemptDoc.score || 0,
              totalQuestions: totalQ,
              selectedLength: chosenLength,
              currentQuestionIndex: attemptDoc.currentQuestionIndex || 0,
              shuffleOrder: attemptDoc.shuffleOrder || [],
              answerOrder: generatedAnswerOrder,
              finished: attemptDoc.finished === true,
              examMode: attemptExam
            })
          });
        }

        setCurrentQuestionIndex(attemptDoc.currentQuestionIndex || 0);
      } else {
        // No attempt doc exists: show the test length selector UI
        setActiveTestLength(null);
        setShowTestLengthSelector(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingTest(false);
    }
  };

  useEffect(() => {
    fetchTestAndAttempt();
  }, [testId, userId]);

  useEffect(() => {
    if (level > localLevel) {
      setLocalLevel(level);
      setShowLevelUpOverlay(true);
      const t = setTimeout(() => setShowLevelUpOverlay(false), 3000);
      return () => clearTimeout(t);
    }
  }, [level, localLevel]);

  useEffect(() => {
    // Fix for the "Next Test" button issue: check if we're coming from a test completion
    // and ensure we don't immediately show the score overlay for the new test
    const isFromNextTestButton = location.state?.fromNextTest;
    
    if (isFromNextTestButton) {
      // Reset these states to ensure we don't show the completion overlay
      setShowScoreOverlay(false);
      setIsFinished(false);
      // Clean up the location state
      navigate(location.pathname, { replace: true, state: {} });
    } else if (location.state?.review && isFinished) {
      setShowReviewMode(true);
    }
  }, [location.state, isFinished, navigate, location.pathname]);

  const getShuffledIndex = useCallback(
    (i) => {
      if (!shuffleOrder || shuffleOrder.length === 0) return i;
      return shuffleOrder[i];
    },
    [shuffleOrder]
  );

  const effectiveTotal =
    activeTestLength || (testData ? testData.questions.length : 0);

  const realIndex = getShuffledIndex(currentQuestionIndex);
  const questionObject =
    testData && testData.questions && testData.questions.length > 0
      ? testData.questions[realIndex]
      : null;

  useEffect(() => {
    if (!questionObject) return;
    const existing = answers.find((a) => a.questionId === questionObject.id);
    if (existing) {
      setSelectedOptionIndex(null);
      if (
        existing.userAnswerIndex !== null &&
        existing.userAnswerIndex !== undefined
      ) {
        const displayIndex = answerOrder[realIndex].indexOf(
          existing.userAnswerIndex
        );
        if (displayIndex >= 0) {
          setSelectedOptionIndex(displayIndex);
          setIsAnswered(true);
        } else {
          setIsAnswered(false);
        }
      } else {
        setIsAnswered(false);
      }
    } else {
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    }
  }, [questionObject, answers, realIndex, answerOrder]);

  const updateServerProgress = useCallback(
    async (updatedAnswers, updatedScore, finished = false, singleAnswer = null) => {
      if (!userId) return;
      try {
        if (singleAnswer) {
          const res = await fetch(`/api/test/user/${userId}/submit-answer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              testId,
              questionId: singleAnswer.questionId,
              correctAnswerIndex: singleAnswer.correctAnswerIndex,
              selectedIndex: singleAnswer.userAnswerIndex,
              xpPerCorrect: (testData?.xpPerCorrect || 10) * xpBoost,
              coinsPerCorrect: 5
            })
          });
          const data = await res.json();
          
          // NEW: Handle free user question limit
          if (!subscriptionActive && data.status === 'limit_reached') {
            setShowQuestionLimitPrompt(true);
            return data;
          }
          
          // IMPORTANT FIX: For exam mode, also update the full attempt
          // This ensures answer choices are saved in exam mode
          if (examMode) {
            await fetch(`/api/test/attempts/${userId}/${testId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                category,
                answers: updatedAnswers,
                score: updatedScore,
                totalQuestions: testData?.questions?.length || 0,
                selectedLength: activeTestLength,
                currentQuestionIndex,
                shuffleOrder,
                answerOrder,
                finished,
                examMode
              })
            });
          }
          
          return data;
        }
        
        // This saves position data only (for navigation within the test)
        await fetch(`/api/test/attempts/${userId}/${testId}/position`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentQuestionIndex,
            finished
          })
        });

        // Also save the full attempt data to ensure nothing is lost
        await fetch(`/api/test/attempts/${userId}/${testId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            answers: updatedAnswers,
            score: updatedScore,
            totalQuestions: testData?.questions?.length || 0,
            selectedLength: activeTestLength,
            currentQuestionIndex,
            shuffleOrder,
            answerOrder,
            finished,
            examMode
          })
        });
      } catch (err) {
        console.error("Failed to update test attempt on backend", err);
      }
    },
    [userId, testId, testData, xpBoost, currentQuestionIndex, category, activeTestLength, shuffleOrder, answerOrder, examMode, subscriptionActive]
  );

  // In exam mode, allow answer switching; in non–exam mode, lock answer selection once chosen.
  const handleOptionClick = useCallback(
    async (displayOptionIndex) => {
      if (!questionObject) return;
      if (!examMode && isAnswered) return; // Only block if exam mode is off.
      
      // NEW: Don't allow selection if free user has reached limit
      if (!subscriptionActive && practiceQuestionsRemaining <= 0) {
        setShowQuestionLimitPrompt(true);
        return;
      }
      
      const actualAnswerIndex = answerOrder[realIndex][displayOptionIndex];
      setSelectedOptionIndex(displayOptionIndex);

      // For non–exam mode, lock the answer; for exam mode, allow changes.
      if (!examMode) {
        setIsAnswered(true);
      } else {
        // IMPORTANT FIX: For exam mode, still mark as answered but allow changing
        setIsAnswered(true);
      }
      
      try {
        const newAnswerObj = {
          questionId: questionObject.id,
          userAnswerIndex: actualAnswerIndex,
          correctAnswerIndex: questionObject.correctAnswerIndex
        };
        const updatedAnswers = [...answers];
        const idx = updatedAnswers.findIndex(
          (a) => a.questionId === questionObject.id
        );
        if (idx >= 0) {
          updatedAnswers[idx] = newAnswerObj;
        } else {
          updatedAnswers.push(newAnswerObj);
        }
        setAnswers(updatedAnswers);

        const awardData = await updateServerProgress(
          updatedAnswers,
          score,
          false,
          newAnswerObj
        );
        
        // NEW: Check for question limit status
        if (awardData && awardData.status === 'limit_reached') {
          setShowQuestionLimitPrompt(true);
          return;
        }
        
        if (!examMode && awardData && awardData.examMode === false) {
          if (awardData.isCorrect) {
            setScore((prev) => prev + 1);
          }
          if (awardData.isCorrect && !awardData.alreadyCorrect && awardData.awardedXP) {
            dispatch(
              setXPAndCoins({
                xp: awardData.newXP,
                coins: awardData.newCoins
              })
            );
          }
        }
      } catch (err) {
        console.error("Failed to submit answer to backend", err);
      }
    },
    [
      isAnswered,
      questionObject,
      examMode,
      testData,
      xpBoost,
      userId,
      testId,
      dispatch,
      score,
      answers,
      updateServerProgress,
      realIndex,
      answerOrder,
      subscriptionActive,
      practiceQuestionsRemaining
    ]
  );

  const finishTestProcess = useCallback(async () => {
    let finalScore = 0;
    answers.forEach((ans) => {
      if (ans.userAnswerIndex === ans.correctAnswerIndex) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setIsFinished(true); // Mark as finished immediately in the UI
    
    try {
      // IMPORTANT CHANGE: Use specific testId in the finish endpoint
      const res = await fetch(`/api/test/attempts/${userId}/${testId}/finish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: finalScore,
          totalQuestions: effectiveTotal,
          testId: testId, // Explicitly pass testId
          category: category // Also include category
        })
      });
      const finishData = await res.json();

      if (finishData.newlyUnlocked && finishData.newlyUnlocked.length > 0) {
        finishData.newlyUnlocked.forEach((achievementId) => {
          const achievement = achievements.find(
            (a) => a.achievementId === achievementId
          );
          if (achievement) {
            const IconComp = iconMapping[achievement.achievementId] || null;
            const color = colorMapping[achievement.achievementId] || "#fff";
            showAchievementToast({
              title: achievement.title,
              description: achievement.description,
              icon: IconComp ? <IconComp /> : null,
              color
            });
          }
        });
      }

      if (
        typeof finishData.newXP !== "undefined" &&
        typeof finishData.newCoins !== "undefined"
      ) {
        dispatch(
          setXPAndCoins({
            xp: finishData.newXP,
            coins: finishData.newCoins,
            newlyUnlocked: finishData.newlyUnlocked || []
          })
        );
      }
      
      // When navigating back to the list after a test, include a state flag
      if (navigateBackAfterCompletion) {
        navigate(backToListPath, { 
          state: { 
            testJustCompleted: testId,
            completedAt: new Date().toISOString() 
          } 
        });
      }
    } catch (err) {
      console.error("Failed to finish test attempt:", err);
    }
    
    setShowScoreOverlay(true);
    setShowReviewMode(false);
  }, [answers, userId, testId, effectiveTotal, achievements, dispatch, category, navigate, backToListPath, navigateBackAfterCompletion]);

  const handleNextQuestion = useCallback(() => {
    if (!isAnswered && !examMode) {
      setShowNextPopup(true);
      return;
    }
    if (currentQuestionIndex === effectiveTotal - 1) {
      finishTestProcess();
      return;
    }
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    updateServerProgress(answers, score, false);
  }, [
    isAnswered,
    examMode,
    currentQuestionIndex,
    effectiveTotal,
    finishTestProcess,
    updateServerProgress,
    answers,
    score
  ]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      updateServerProgress(answers, score, false);
    }
  }, [currentQuestionIndex, updateServerProgress, answers, score]);

  const handleSkipQuestion = () => {
    if (!questionObject) return;
    
    // NEW: Don't allow skipping if free user has reached limit
    if (!subscriptionActive && practiceQuestionsRemaining <= 0) {
      setShowQuestionLimitPrompt(true);
      return;
    }
    
    const updatedAnswers = [...answers];
    const idx = updatedAnswers.findIndex(
      (a) => a.questionId === questionObject.id
    );
    const skipObj = {
      questionId: questionObject.id,
      userAnswerIndex: null,
      correctAnswerIndex: questionObject.correctAnswerIndex
    };
    if (idx >= 0) {
      updatedAnswers[idx] = skipObj;
    } else {
      updatedAnswers.push(skipObj);
    }
    setAnswers(updatedAnswers);
    setIsAnswered(false);
    setSelectedOptionIndex(null);
    updateServerProgress(updatedAnswers, score, false, skipObj);
    if (currentQuestionIndex === effectiveTotal - 1) {
      finishTestProcess();
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFlagQuestion = () => {
    if (!questionObject) return;
    const qId = questionObject.id;
    if (flaggedQuestions.includes(qId)) {
      setFlaggedQuestions(flaggedQuestions.filter((x) => x !== qId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, qId]);
    }
  };

  const handleRestartTest = useCallback(async () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setScore(0);
    setAnswers([]);
    setFlaggedQuestions([]);
    setIsFinished(false);
    setShowReviewMode(false);
    setShowScoreOverlay(false);

    if (testData?.questions?.length && activeTestLength) {
      const newQOrder = shuffleIndices(activeTestLength);
      setShuffleOrder(newQOrder);
      const newAnswerOrder = testData.questions
        .slice(0, activeTestLength)
        .map((q) => {
          const numOpts = q.options.length;
          return shuffleArray([...Array(numOpts).keys()]);
        });
      setAnswerOrder(newAnswerOrder);

      if (userId && testId) {
        await fetch(`/api/test/attempts/${userId}/${testId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: [],
            score: 0,
            totalQuestions: testData.questions.length,
            selectedLength: activeTestLength,
            category: testData.category || category,
            currentQuestionIndex: 0,
            shuffleOrder: newQOrder,
            answerOrder: newAnswerOrder,
            finished: false,
            examMode
          })
        });
      }
    }
  }, [
    testData,
    userId,
    testId,
    category,
    examMode,
    activeTestLength
  ]);

  const handleFinishTest = () => {
    finishTestProcess();
  };

  const [reviewFilter, setReviewFilter] = useState("all");
  const handleReviewAnswers = () => {
    setShowReviewMode(true);
    setReviewFilter("all");
  };
  const handleCloseReview = () => {
    if (!isFinished) setShowReviewMode(false);
  };

  const filteredQuestions = useMemo(() => {
    if (!testData || !testData.questions) return [];
    return testData.questions.slice(0, effectiveTotal).filter((q) => {
      const userAns = answers.find((a) => a.questionId === q.id);
      const isFlagged = flaggedQuestions.includes(q.id);

      if (!userAns) {
        // Not answered => count it as "skipped" or "all"
        return reviewFilter === "skipped" || reviewFilter === "all";
      }

      const isSkipped = userAns.userAnswerIndex === null;
      const isCorrect = userAns.userAnswerIndex === q.correctAnswerIndex;

      if (reviewFilter === "all") return true;
      if (reviewFilter === "skipped" && isSkipped) return true;
      if (reviewFilter === "flagged" && isFlagged) return true;
      if (reviewFilter === "incorrect" && !isCorrect && !isSkipped) return true;
      if (reviewFilter === "correct" && isCorrect && !isSkipped) return true;

      return false;
    });
  }, [testData, answers, flaggedQuestions, reviewFilter, effectiveTotal]);

  const NextQuestionAlert = ({ message, onOk }) => (
    <div className="confirm-popup-overlay">
      <div className="confirm-popup-content">
        <div className="alert-header">
          <FaExclamationTriangle className="alert-icon" />
          <h3>Attention</h3>
        </div>
        <p>{message}</p>
        <div className="confirm-popup-buttons">
          <button className="confirm-popup-ok" onClick={onOk}>
            <FaCheck className="button-icon" />
            <span>OK</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNextPopup = () => {
    if (!showNextPopup) return null;
    return (
      <NextQuestionAlert
        message="You haven't answered this question yet. Please select an answer or skip the question."
        onOk={() => {
          setShowNextPopup(false);
        }}
      />
    );
  };

  const ConfirmPopup = ({ message, onConfirm, onCancel }) => (
    <div className="confirm-popup-overlay">
      <div className="confirm-popup-content">
        <div className="alert-header">
          <FaExclamationTriangle className="alert-icon" />
          <h3>Confirm Action</h3>
        </div>
        <p>{message}</p>
        <div className="confirm-popup-buttons">
          <button className="confirm-popup-yes" onClick={onConfirm}>
            <FaCheck className="button-icon" />
            <span>Yes</span>
          </button>
          <button className="confirm-popup-no" onClick={onCancel}>
            <FaTimes className="button-icon" />
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderRestartPopup = () => {
    if (!showRestartPopup) return null;
    return (
      <ConfirmPopup
        message="Are you sure you want to restart the test? All progress will be lost and you'll start from the beginning."
        onConfirm={() => {
          handleRestartTest();
          setShowRestartPopup(false);
        }}
        onCancel={() => setShowRestartPopup(false)}
      />
    );
  };

  const renderFinishPopup = () => {
    if (!showFinishPopup) return null;
    return (
      <ConfirmPopup
        message="Are you sure you want to finish the test now? Any unanswered questions will be marked as skipped."
        onConfirm={() => {
          handleFinishTest();
          setShowFinishPopup(false);
        }}
        onCancel={() => setShowFinishPopup(false)}
      />
    );
  };

  const renderScoreOverlay = () => {
    if (!showScoreOverlay) return null;
    const percentage = effectiveTotal
      ? Math.round((score / effectiveTotal) * 100)
      : 0;
      
    // Determine grade based on percentage
    let grade = "";
    let gradeClass = "";
    
    if (percentage >= 90) {
      grade = "Outstanding!";
      gradeClass = "grade-a-plus";
    } else if (percentage >= 80) {
      grade = "Excellent!";
      gradeClass = "grade-a";
    } else if (percentage >= 70) {
      grade = "Great Job!";
      gradeClass = "grade-b";
    } else if (percentage >= 60) {
      grade = "Good Effort!";
      gradeClass = "grade-c";
    } else {
      grade = "Keep Practicing!";
      gradeClass = "grade-d";
    }
    
    return (
      <div className="score-overlay">
        <div className="score-content">
          <h2 className="score-title">Test Complete!</h2>
          
          <div className="score-grade-container">
            <div className={`score-grade ${gradeClass}`}>
              <div className="percentage-display">{percentage}%</div>
              <div className="grade-label">{grade}</div>
            </div>
            
            <div className="score-details-container">
              <p className="score-details">
                You answered <strong>{score}</strong> out of <strong>{effectiveTotal}</strong> questions correctly.
              </p>
              
              {examMode && (
                <div className="exam-mode-note">
                  <FaTrophy className="exam-icon" />
                  <p>You completed this test in exam mode!</p>
                </div>
              )}
            </div>
          </div>

          <div className="overlay-buttons">
            <button
              className="restart-button"
              onClick={() => setShowRestartPopup(true)}
            >
              <FaRedoAlt className="button-icon" />
              <span>Restart Test</span>
            </button>
            
            <button 
              className="review-button" 
              onClick={handleReviewAnswers}
            >
              <FaEye className="button-icon" />
              <span>Review Answers</span>
            </button>
            
            <button 
              className="back-btn" 
              onClick={() => navigate(backToListPath, {
                state: { 
                  testJustCompleted: testId,
                  completedAt: new Date().toISOString() 
                }
              })}
            >
              <FaArrowLeft className="button-icon" />
              <span>Back to List</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderReviewMode = () => {
    if (!showReviewMode) return null;
    return (
      <div className="score-overlay review-overlay">
        <div className="score-content review-content">
          {isFinished ? (
            <>
              <button
                className="back-to-list-btn"
                onClick={() => navigate(backToListPath, {
                  state: { 
                    testJustCompleted: testId,
                    completedAt: new Date().toISOString() 
                  }
                })}
              >
                <FaArrowLeft className="button-icon" />
                <span>Back to Test List</span>
              </button>
              {/* Additional fixed back to list button outside the container */}
              <button
                className="back-to-list-btn fixed-top-right"
                onClick={() => navigate(backToListPath, {
                  state: { 
                    testJustCompleted: testId,
                    completedAt: new Date().toISOString() 
                  }
                })}
              >
                <FaArrowLeft className="button-icon" />
                <span>Back to Test List</span>
              </button>
            </>
          ) : (
            <button className="close-review-x" onClick={handleCloseReview}>
              <FaTimes />
            </button>
          )}
          <h2 className="score-title">Review Mode</h2>
          {isFinished && (
            <div className="review-header-info">
              <p className="review-score-line">
                Your final score: {score}/{effectiveTotal} (
                {effectiveTotal ? Math.round((score / effectiveTotal) * 100) : 0}
                %)
              </p>
              {examMode && (
                <div className="review-mode-indicator">
                  <FaTrophy className="exam-icon" />
                  <span>Exam Mode</span>
                </div>
              )}
            </div>
          )}
          <div className="review-filter-buttons">
            <button
              className={reviewFilter === "all" ? "active-filter" : ""}
              onClick={() => setReviewFilter("all")}
            >
              <FaClipboardList className="filter-icon" />
              <span>All</span>
            </button>
            <button
              className={reviewFilter === "skipped" ? "active-filter" : ""}
              onClick={() => setReviewFilter("skipped")}
            >
              <FaStepForward className="filter-icon" />
              <span>Skipped</span>
            </button>
            <button
              className={reviewFilter === "flagged" ? "active-filter" : ""}
              onClick={() => setReviewFilter("flagged")}
            >
              <FaFlag className="filter-icon" />
              <span>Flagged</span>
            </button>
            <button
              className={reviewFilter === "incorrect" ? "active-filter" : ""}
              onClick={() => setReviewFilter("incorrect")}
            >
              <FaTimes className="filter-icon" />
              <span>Incorrect</span>
            </button>
            <button
              className={reviewFilter === "correct" ? "active-filter" : ""}
              onClick={() => setReviewFilter("correct")}
            >
              <FaCheck className="filter-icon" />
              <span>Correct</span>
            </button>
          </div>
          <p className="review-filter-count">
            Showing {filteredQuestions.length} questions
          </p>
          <div className="review-mode-container">
            {filteredQuestions.map((q, idx) => {
              const userAns = answers.find((a) => a.questionId === q.id);
              const isFlagged = flaggedQuestions.includes(q.id);

              if (!userAns) {
                return (
                  <div key={q.id} className="review-question-card">
                    <div className="review-question-header">
                      <span className="question-number">Question {idx + 1}</span>
                      {isFlagged && <span className="flagged-icon">🚩</span>}
                    </div>
                    <h3><FormattedQuestion questionText={q.question} /></h3>
                    <div className="review-answer-section unanswered">
                      <p className="review-status-label">
                        <FaExclamationTriangle className="status-icon warning" />
                        <span>Not Answered</span>
                      </p>
                      <p className="correct-answer">
                        <strong>Correct Answer:</strong>{" "}
                        {q.options[q.correctAnswerIndex]}
                      </p>
                    </div>
                    <div className="review-explanation">
                      <p>{q.explanation}</p>
                    </div>
                  </div>
                );
              }

              const isSkipped = userAns.userAnswerIndex === null;
              const isCorrect = userAns.userAnswerIndex === q.correctAnswerIndex;

              return (
                <div key={q.id} className={`review-question-card ${isSkipped ? 'skipped' : isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="review-question-header">
                    <span className="question-number">Question {idx + 1}</span>
                    {isFlagged && <span className="flagged-icon">🚩</span>}
                  </div>
                  <h3><FormattedQuestion questionText={q.question} /></h3>
                  <div className={`review-answer-section ${isSkipped ? 'skipped' : isCorrect ? 'correct' : 'incorrect'}`}>
                    <p className="review-status-label">
                      {isSkipped ? (
                        <>
                          <FaStepForward className="status-icon skipped" />
                          <span>Skipped</span>
                        </>
                      ) : isCorrect ? (
                        <>
                          <FaCheck className="status-icon correct" />
                          <span>Correct!</span>
                        </>
                      ) : (
                        <>
                          <FaTimes className="status-icon incorrect" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </p>
                    
                    {!isSkipped && (
                      <p className="your-answer">
                        <strong>Your Answer:</strong>{" "}
                        {q.options[userAns.userAnswerIndex]}
                      </p>
                    )}
                    
                    <p className="correct-answer">
                      <strong>Correct Answer:</strong>{" "}
                      {q.options[q.correctAnswerIndex]}
                    </p>
                  </div>
                  <div className="review-explanation">
                    <p>{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {!isFinished && (
            <button
              className="review-button close-review-btn"
              onClick={handleCloseReview}
            >
              <FaTimes className="button-icon" />
              <span>Close Review</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  const handleNextQuestionButtonClick = () => {
    if (!isAnswered && !examMode) {
      setShowNextPopup(true);
    } else {
      handleNextQuestion();
    }
  };

  // If free user has hit their question limit, show the upgrade prompt
  if (showQuestionLimitPrompt) {
    return <UpgradePrompt feature="questions" />;
  }

  // If no attempt doc was found (on first load), show test length UI:
  if (showTestLengthSelector) {
    return (
      <div className="aplus-test-container">
        <div className="test-length-selector">
          <h2>Select Test Length</h2>
          <div className="test-mode-indicator">
            <span className={examMode ? 'exam-on' : 'exam-off'}>
              {examMode ? 'Exam Mode: ON' : 'Practice Mode'}
            </span>
          </div>
          <p>How many questions would you like to answer?</p>
          <div className="test-length-options">
            {allowedTestLengths.map((length) => (
              <label 
                key={length}
                className={selectedLength === length ? 'selected' : ''}
              >
                <input
                  type="radio"
                  name="testLength"
                  value={length}
                  checked={selectedLength === length}
                  onChange={(e) => setSelectedLength(Number(e.target.value))}
                />
                <span>{length}</span>
              </label>
            ))}
          </div>
          <button
            onClick={async () => {
              setActiveTestLength(selectedLength);
              if (testData) {
                const totalQ = testData.questions.length;
                const newQOrder = shuffleIndices(selectedLength);
                setShuffleOrder(newQOrder);
                const newAnswerOrder = testData.questions
                  .slice(0, selectedLength)
                  .map((q) => {
                    const numOpts = q.options.length;
                    return shuffleArray([...Array(numOpts).keys()]);
                  });
                setAnswerOrder(newAnswerOrder);
                try {
                  await fetch(`/api/test/attempts/${userId}/${testId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      answers: [],
                      score: 0,
                      totalQuestions: totalQ,
                      selectedLength: selectedLength,
                      category: testData.category || category,
                      currentQuestionIndex: 0,
                      shuffleOrder: newQOrder,
                      answerOrder: newAnswerOrder,
                      finished: false,
                      examMode: location.state?.examMode || false
                    })
                  });
                  setShowTestLengthSelector(false);
                  fetchTestAndAttempt();
                } catch (err) {
                  console.error("Failed to start new attempt", err);
                }
              }
            }}
          >
            <FaPlay className="button-icon" />
            <span>Start Test</span>
          </button>
          <button 
            className="back-to-list-btn"
            onClick={() => navigate(backToListPath, {
              state: { fromError: true }
            })}
          >
            <FaArrowLeft className="button-icon" />
            <span>Back to Test List</span>
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aplus-test-container">
        <div className="test-error-container">
          <FaExclamationTriangle className="test-error-icon" />
          <h2>Error Loading Test</h2>
          <p>{error}</p>
          <div className="test-error-actions">
            <button onClick={() => window.location.reload()}>
              <FaRedoAlt className="button-icon" />
              <span>Try Again</span>
            </button>
            <button onClick={() => navigate(backToListPath, {
              state: { fromError: true }
            })}>
              <FaArrowLeft className="button-icon" />
              <span>Back to Test List</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loadingTest) {
    return (
      <div className="aplus-test-container">
        <div className="test-loading-container">
          <div className="test-loading-spinner">
            <FaSpinner className="spinner-icon" />
          </div>
          <p>Loading test data...</p>
        </div>
      </div>
    );
  }

  if (!testData || !testData.questions || testData.questions.length === 0) {
    return (
      <div className="aplus-test-container">
        <div className="test-error-container">
          <FaExclamationTriangle className="test-error-icon" />
          <h2>No Questions Found</h2>
          <p>This test doesn't have any questions yet.</p>
          <button onClick={() => navigate(backToListPath, {
            state: { fromError: true }
          })}>
            <FaArrowLeft className="button-icon" />
            <span>Back to Test List</span>
          </button>
        </div>
      </div>
    );
  }

  let avatarUrl = "https://via.placeholder.com/60";
  if (currentAvatar && shopItems && shopItems.length > 0) {
    const avatarItem = shopItems.find((item) => item._id === currentAvatar);
    if (avatarItem && avatarItem.imageUrl) {
      avatarUrl = avatarItem.imageUrl;
    }
  }

  const progressPercentage = effectiveTotal
    ? Math.round(((currentQuestionIndex + 1) / effectiveTotal) * 100)
    : 0;
  const progressColorHue = (progressPercentage * 120) / 100; // from red to green
  const progressColor = `hsl(${progressColorHue}, 100%, 50%)`;

  let displayedOptions = [];
  if (questionObject && answerOrder[realIndex]) {
    displayedOptions = answerOrder[realIndex].map(
      (optionIdx) => questionObject.options[optionIdx]
    );
  }

  return (
    <div className="aplus-test-container">
      <ConfettiAnimation trigger={showLevelUpOverlay} level={level} />

      {renderRestartPopup()}
      {renderFinishPopup()}
      {renderNextPopup()}
      {renderScoreOverlay()}
      {renderReviewMode()}

      {/* Display question limit banner for free users */}
      {!subscriptionActive && !isFinished && !showScoreOverlay && !showReviewMode && (
        <QuestionLimitBanner />
      )}

      <div className="top-control-bar">
        <button 
          className={`flag-btn ${questionObject && flaggedQuestions.includes(questionObject.id) ? 'active' : ''}`} 
          onClick={handleFlagQuestion}
          disabled={!questionObject}
        >
          <FaFlag className="button-icon" />
          <span>{questionObject && flaggedQuestions.includes(questionObject.id) ? "Unflag" : "Flag"}</span>
        </button>
        
        <QuestionDropdown
          totalQuestions={effectiveTotal}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionSelect={(index) => {
            setCurrentQuestionIndex(index);
            updateServerProgress(answers, score, false);
          }}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          testData={testData}
          shuffleOrder={shuffleOrder}
          examMode={examMode}
        />
        
        <button
          className="finish-test-btn"
          onClick={() => setShowFinishPopup(true)}
        >
          <FaFlagCheckered className="button-icon" />
          <span>Finish Test</span>
        </button>
      </div>

      <div className="upper-control-bar">
        <button
          className="restart-test-btn"
          onClick={() => setShowRestartPopup(true)}
        >
          <FaRedoAlt className="button-icon" />
          <span>Restart</span>
        </button>
        
        <h1 className="aplus-title">{testData.testName}</h1>
        
        <button 
          className="back-btn" 
          onClick={() => navigate(backToListPath)}
        >
          <FaArrowLeft className="button-icon" />
          <span>Back to List</span>
        </button>
      </div>

      <div className="top-bar">
        <div className="avatar-section-test">
          <div
            className="avatar-image"
            style={{ backgroundImage: `url(${avatarUrl})` }}
          />
          <div className="avatar-level">
            <FaLevelUpAlt className="level-icon" />
            <span>{level}</span>
          </div>
        </div>
        <div className="xp-level-display">
          <FaStar className="xp-icon" />
          <span>{xp} XP</span>
        </div>
        <div className="coins-display">
          <FaCoins className="coins-icon" />
          <span>{coins}</span>
        </div>
      </div>

      <div className="exam-mode-indicator">
        {examMode ? (
          <div className="exam-badge">
            <FaTrophy className="exam-icon" />
            <span>EXAM MODE</span>
          </div>
        ) : null}
      </div>

      <div className="progress-container">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%`, background: progressColor }}
        >
          {currentQuestionIndex + 1} / {effectiveTotal} ({progressPercentage}%)
        </div>
      </div>

      {!showScoreOverlay && !showReviewMode && !isFinished && (
        <div className="question-card">
          <div className="question-text">
            {questionObject && <FormattedQuestion questionText={questionObject.question} />}
          </div>

          <ul className="options-list">
            {displayedOptions.map((option, displayIdx) => {
              let optionClass = "option-button";

              if (!examMode) {
                if (isAnswered && questionObject) {
                  const correctIndex = questionObject.correctAnswerIndex;
                  const actualIndex = answerOrder[realIndex][displayIdx];

                  if (actualIndex === correctIndex) {
                    optionClass += " correct-option";
                  } else if (
                    displayIdx === selectedOptionIndex &&
                    actualIndex !== correctIndex
                  ) {
                    optionClass += " incorrect-option";
                  }
                }
              } else {
                if (isAnswered && displayIdx === selectedOptionIndex) {
                  optionClass += " chosen-option";
                }
              }

              return (
                <li className="option-item" key={displayIdx}>
                  <button
                    className={optionClass}
                    onClick={() => handleOptionClick(displayIdx)}
                    disabled={examMode ? false : isAnswered}
                  >
                    <div className="option-letter">{String.fromCharCode(65 + displayIdx)}</div>
                    <div className="option-text">{option}</div>
                  </button>
                </li>
              );
            })}
          </ul>

          {isAnswered && questionObject && !examMode && (
            <>
              <div className={`explanation ${selectedOptionIndex !== null &&
                answerOrder[realIndex][selectedOptionIndex] ===
                  questionObject.correctAnswerIndex
                  ? "correct-explanation"
                  : "incorrect-explanation"}`}>
                <strong>
                  {selectedOptionIndex !== null &&
                  answerOrder[realIndex][selectedOptionIndex] ===
                    questionObject.correctAnswerIndex
                    ? (
                      <>
                        <FaCheck className="explanation-icon" />
                        <span>Correct!</span>
                      </>
                    ) : (
                      <>
                        <FaTimes className="explanation-icon" />
                        <span>Incorrect!</span>
                      </>
                    )}
                </strong>
                <p>{questionObject.explanation}</p>
              </div>
              
              {questionObject.examTip && (
                <div className="exam-tip">
                  <strong>
                    <FaBolt className="exam-tip-icon" />
                    <span>Exam Tip</span>
                  </strong>
                  <p>{questionObject.examTip}</p>
                </div>
              )}
            </>
          )}

          <div className="bottom-control-bar">
            <div className="bottom-control-row">
              <button
                className="prev-question-btn"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <FaChevronLeft className="button-icon" />
                <span>Previous</span>
              </button>
              
              {currentQuestionIndex === effectiveTotal - 1 ? (
                <button
                  className="next-question-btn finish-btn"
                  onClick={handleNextQuestionButtonClick}
                >
                  <FaFlagCheckered className="button-icon" />
                  <span>Finish Test</span>
                </button>
              ) : (
                <button
                  className="next-question-btn"
                  onClick={handleNextQuestionButtonClick}
                >
                  <span>Next</span>
                  <FaChevronRight className="button-icon" />
                </button>
              )}
            </div>

            <div className="bottom-control-row skip-row">
              <button 
                className="skip-question-btn" 
                onClick={handleSkipQuestion}
              >
                <FaStepForward className="button-icon" />
                <span>Skip Question</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalTestPage;
