import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./log.css";

const LOG_CATEGORIES = {
  security: ["All", "Firewall", "Vulnerability Scanner", "IDS", "Access Control"],
  event: ["All", "System Monitor", "AppManager", "AuthService", "Network Manager"],
  error: ["All", "Database", "FileSystem", "Network Interface", "Application Service"],
  debug: ["All", "Query Executor", "API Gateway", "Config Manager", "Process Manager"],
  info: ["All", "System Monitor", "Activity Tracker", "Deployment Manager", "Service Monitor"],
};

const MAX_LOG_COUNT = 20;

const getProgressBarColor = (percentage) => {
  if (percentage > 75) return "#00ffea"; // Neon Cyan
  if (percentage > 50) return "#ff4d4d"; // Neon Red
  if (percentage > 25) return "#ff00ff"; // Neon Pink
  return "#ffffff"; // White
};

const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    .trim();
};

const Controls = ({
  category,
  setCategory,
  subcategory,
  setSubcategory,
  count,
  setCount,
  generateLogs,
  loading,
  progress,
}) => {
  return (
    <div className="log-controls hacker-panel neon-border flicker-in-1">
      <div className="control-group">
        <label htmlFor="category-select">Log Category:</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        >
          {Object.keys(LOG_CATEGORIES).map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="subcategory-select">Subcategory:</label>
        <select
          id="subcategory-select"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          disabled={loading}
        >
          {LOG_CATEGORIES[category].map((subcat) => (
            <option key={subcat} value={subcat}>
              {subcat}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="count-input">Number of Logs:</label>
        <input
          type="number"
          id="count-input"
          value={count}
          min="1"
          max={MAX_LOG_COUNT}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1 && value <= MAX_LOG_COUNT) {
              setCount(value);
            }
          }}
          disabled={loading || subcategory === "All"}
        />
        {subcategory !== "All" && <span className="max-count">Max {MAX_LOG_COUNT}</span>}
      </div>

      <button
        className="generate-btn neon-btn"
        onClick={generateLogs}
        disabled={
          loading ||
          (count < 1 || count > MAX_LOG_COUNT) ||
          (subcategory === "All" && LOG_CATEGORIES[category].length - 1 === 0)
        }
      >
        {loading ? `Generating Logs (${Math.floor(progress)}%)` : "Generate Logs"}
      </button>
    </div>
  );
};

const LogEntry = ({ log, analyzeIndividualLog, loading }) => {
  const renderNestedObject = (obj) => {
    if (obj === null) return <span>Null</span>;
    if (typeof obj !== "object") return <span>{obj.toString()}</span>;
    return (
      <ul>
        {Object.entries(obj).map(([key, value]) => (
          <li key={key}>
            <strong>{formatFieldName(key)}:</strong>{" "}
            {typeof value === "object" && value !== null
              ? renderNestedObject(value)
              : value !== null && value !== undefined
              ? value.toString()
              : "N/A"}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`log-entry severity-${log.severity ? log.severity.toLowerCase() : "all"} neon-border`}>
      <h3 className="log-event scanline">{log.event || "N/A"}</h3>
      <p><strong>Type:</strong> {log.type || "N/A"}</p>
      <p><strong>Source:</strong> {log.source || "N/A"}</p>
      <p><strong>Severity:</strong> {log.severity || "N/A"}</p>
      <p><strong>Message:</strong> {log.message || "N/A"}</p>
      <p><strong>Timestamp:</strong> {log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}</p>

      <div className="log-details">
        {Object.entries(log).map(([key, value]) => {
          if (["type", "source", "event", "message", "severity", "timestamp", "analysis", "id"].includes(key)) {
            return null;
          }
          if (typeof value === "object" && value !== null) {
            return (
              <div key={key}>
                <strong>{formatFieldName(key)}:</strong>
                <div className="nested-data hacker-scroll">
                  {Array.isArray(value) ? (
                    <ul>
                      {value.map((item, index) => (
                        <li key={index}>
                          {typeof item === "object" && item !== null
                            ? renderNestedObject(item)
                            : item !== null && item !== undefined
                            ? item.toString()
                            : "N/A"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    renderNestedObject(value)
                  )}
                </div>
              </div>
            );
          }

          return (
            <p key={key}>
              <strong>{formatFieldName(key)}:</strong>{" "}
              {value !== null && value !== undefined ? value.toString() : "N/A"}
            </p>
          );
        })}
      </div>

      {!log.analysis && (
        <button
          className="analyze-individual-btn neon-btn"
          onClick={() => analyzeIndividualLog(log)}
          disabled={loading || log.analysis}
          title="Analyze this log"
        >
          {log.analysis ? "Analyzed" : "Analyze Log"}
        </button>
      )}

      {log.analysis && (
        <div className="analysis-result">
          <h4>Analysis:</h4>
          <pre className="analysis-box neon-border">{log.analysis}</pre>
        </div>
      )}
    </div>
  );
};

const HistoryEntry = ({ entry }) => {
  return (
    <div className="history-entry neon-border">
      <h4>
        {entry.log.event || "N/A"} - {entry.log.source || "N/A"}
      </h4>
      <p>
        <strong>Analysis:</strong> {entry.analysis}
      </p>
      <p>
        <strong>Timestamp:</strong> {entry.timestamp}
      </p>
    </div>
  );
};

const HistorySection = ({ history, showHistory, toggleHistory }) => {
  return (
    history.length > 0 && (
      <div className="log-history hacker-panel neon-border flicker-in-2">
        <h2>Analysis History</h2>
        <div className="history-controls">
          <button className="neon-btn" onClick={toggleHistory}>
            {showHistory ? "Hide History" : "Show History"}
          </button>
        </div>
        {showHistory && (
          <div className="history-list hacker-scroll">
            {history.map((entry, index) => (
              <HistoryEntry key={`${entry.id}-${index}`} entry={entry} />
            ))}
          </div>
        )}
      </div>
    )
  );
};

const App = () => {
  const [logs, setLogs] = useState([]);
  const [category, setCategory] = useState("security");
  const [subcategory, setSubcategory] = useState("All");
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState([]);
  const [showAnalysisHistory, setShowAnalysisHistory] = useState(false);

  const ENDPOINT = "/api";

  useEffect(() => {
    setSubcategory("All");
    setCount(1);
  }, [category]);

  const generateLogs = async () => {
    setLoading(true);
    setProgress(0);
    setLogs([]);
    try {
      const startTime = Date.now();
      const response = await axios.post(`${ENDPOINT}/logs/generate`, {
        category,
        count,
      });

      const generatedLogs = response.data.logs || [];
      let filteredLogs = [];
      if (subcategory !== "All") {
        filteredLogs = generatedLogs.filter(
          (log) => log.source.toLowerCase() === subcategory.toLowerCase()
        );
      } else {
        filteredLogs = generatedLogs;
      }

      const logsWithId = filteredLogs.map((l) => ({
        ...l,
        id: l.id || `${l.type}-${l.timestamp}-${Math.random()}`
      }));

      setLogs(logsWithId);

      const endTime = Date.now();
      const duration = endTime - startTime;
      const simulateProgress = () => {
        const interval = 100;
        const totalIntervals = Math.max(1, Math.floor(duration / interval));
        let currentInterval = 0;
        const progressInterval = setInterval(() => {
          currentInterval += 1;
          setProgress(Math.min((currentInterval / totalIntervals) * 100, 100));
          if (currentInterval >= totalIntervals) {
            clearInterval(progressInterval);
            setProgress(100);
          }
        }, interval);
      };

      simulateProgress();
      await new Promise((resolve) => setTimeout(resolve, duration));

      toast.success(`${logsWithId.length} log(s) generated successfully!`);
    } catch (error) {
      console.error("Error generating logs:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Generation failed: ${error.response.data.error}`);
      } else {
        toast.error("Failed to generate logs. Please try again.");
      }
    }
    setLoading(false);
    setProgress(0);
  };

  const analyzeIndividualLog = async (log) => {
    setLoading(true);
    setProgress(10); 
    const startTime = Date.now();
    try {
      const response = await axios.post(`${ENDPOINT}/logs/analyze`, {
        log: log,
      });
      const analyzedLog = response.data.analysis ? response.data.analysis : "";

      if (!analyzedLog) {
        toast.warn("Log analysis returned no results.");
        setLoading(false);
        setProgress(0);
        return;
      }

      setLogs((prevLogs) =>
        prevLogs.map((l) => (l.id === log.id ? { ...l, analysis: analyzedLog } : l))
      );

      const newAnalysisEntry = {
        id: log.id,
        log: log,
        analysis: analyzedLog,
        timestamp: new Date().toLocaleString(),
      };

      setHistory((prevHistory) => [newAnalysisEntry, ...prevHistory]);

      const endTime = Date.now();
      const duration = endTime - startTime;
      const simulateProgress = () => {
        const interval = 100;
        let currentInterval = 10;
        const progressInterval = setInterval(() => {
          currentInterval += 10;
          if (currentInterval > 100) currentInterval = 100;
          setProgress(currentInterval);
          if (currentInterval >= 100) {
            clearInterval(progressInterval);
          }
        }, interval);
      };

      simulateProgress();
      await new Promise((resolve) => setTimeout(resolve, duration));

      toast.success("Log analyzed successfully!");
    } catch (error) {
      console.error("Error analyzing log:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Analysis failed: ${error.response.data.error}`);
      } else {
        toast.error("Failed to analyze log. Please try again.");
      }
    }
    setLoading(false);
    setProgress(0);
  };

  const exportLogs = (format) => {
    if (logs.length === 0) {
      toast.warn("No logs to export.");
      return;
    }

    let filename = "logs_export";
    let dataStr = "";
    switch (format) {
      case "json":
        filename += ".json";
        dataStr = JSON.stringify(logs, null, 2);
        dataStr = dataStr.replace(/\\n/g, "\n");
        break;
      case "csv":
        filename += ".csv";
        const keys = Object.keys(logs[0]);
        const csvRows = [
          keys.join(","),
          ...logs.map((l) =>
            keys
              .map((k) => {
                let val = l[k];
                if (typeof val === "object" && val !== null) {
                  val = JSON.stringify(val).replace(/\\n/g, "\n");
                }
                return `"${val || ""}"`;
              })
              .join(",")
          ),
        ];
        dataStr = csvRows.join("\n");
        break;
      case "txt":
        filename += ".txt";
        dataStr = logs
          .map((l) => JSON.stringify(l, null, 2).replace(/\\n/g, "\n"))
          .join("\n\n");
        break;
      case "xml":
        filename += ".xml";
        dataStr = `<logs>\n${logs
          .map((l) => {
            const entries = Object.entries(l)
              .map(([k, v]) => {
                let val = v;
                if (typeof val === "object" && val !== null) {
                  val = JSON.stringify(val).replace(/\\n/g, "\n");
                } else if (typeof val === "string") {
                  val = val.replace(/\\n/g, "\n");
                }
                return `<${k}>${val}</${k}>`;
              })
              .join("\n");
            return `<log>\n${entries}\n</log>`;
          })
          .join("\n")}\n</logs>`;
        break;
      case "pdf":
        filename += ".pdf";
        dataStr = logs
          .map((l) => JSON.stringify(l, null, 2).replace(/\\n/g, "\n"))
          .join("\n\n");
        break;
      default:
        dataStr = JSON.stringify(logs, null, 2).replace(/\\n/g, "\n");
        filename += ".json";
        break;
    }

    const blob = new Blob([dataStr], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success(`Logs exported as ${filename}!`);
  };

  const resetLogs = () => {
    setLogs([]);
    setHistory([]);
    setCategory("security");
    setSubcategory("All");
    setCount(1);
    toast.info("Dashboard has been reset.");
  };

  return (
    <div className="log-page-container crt-overlay">
      <h1 className="log-page-title"> LOG ANALYSIS TERMINAL </h1>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Controls
        category={category}
        setCategory={setCategory}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        count={count}
        setCount={setCount}
        generateLogs={generateLogs}
        loading={loading}
        progress={progress}
      />

      {loading && progress > 0 && (
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              backgroundColor: getProgressBarColor(progress),
            }}
          ></div>
          <span className="progress-percentage">{Math.floor(progress)}%</span>
        </div>
      )}

      <div className="log-list hacker-scroll">
        {logs.length === 0 ? (
          <p className="empty-message">No logs to display.</p>
        ) : (
          logs.map((log) => (
            <LogEntry
              key={log.id}
              log={log}
              analyzeIndividualLog={analyzeIndividualLog}
              loading={loading}
            />
          ))
        )}
      </div>

      <HistorySection
        history={history}
        showHistory={showAnalysisHistory}
        toggleHistory={() => setShowAnalysisHistory(!showAnalysisHistory)}
      />

      <div className="log-actions">
        <div className="export-dropdown">
          <button className="export-btn neon-btn">Export Logs</button>
          <div className="export-options neon-border">
            <button onClick={() => exportLogs("json")}>JSON</button>
            <button onClick={() => exportLogs("csv")}>CSV</button>
            <button onClick={() => exportLogs("txt")}>TXT</button>
            <button onClick={() => exportLogs("xml")}>XML</button>
            <button onClick={() => exportLogs("pdf")}>PDF</button>
          </div>
        </div>
        <button
          className="reset-btn neon-btn"
          onClick={resetLogs}
          disabled={loading || (logs.length === 0 && history.length === 0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;

