LogViewer.js// src/components/pages/games/ThreatHunter/LogViewer.js
import React, { useState, useEffect, useRef } from 'react';
import { FaFlag, FaRegFlag, FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import './LogViewer.css';

const LogViewer = ({ logs, selectedLog, flaggedLines, onSelectLog, onFlagLine }) => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);
  const [highlightedLineIndex, setHighlightedLineIndex] = useState(-1);
  
  const logViewerRef = useRef(null);
  
  // Get the currently visible log
  const currentLog = logs ? logs[currentLogIndex] : null;
  
  // Auto scroll to highlighted search result
  useEffect(() => {
    if (currentSearchIndex >= 0 && searchResults.length > 0) {
      const lineIndex = searchResults[currentSearchIndex];
      setHighlightedLineIndex(lineIndex);
      
      // Find and scroll to the element
      const element = document.getElementById(`log-line-${lineIndex}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentSearchIndex, searchResults]);
  
  // Parse and handle log data
  const handleLogSwitch = (index) => {
    setCurrentLogIndex(index);
    if (onSelectLog) {
      onSelectLog(logs[index].id);
    }
    // Reset search when switching logs
    setSearchTerm('');
    setSearchResults([]);
    setCurrentSearchIndex(-1);
    setHighlightedLineIndex(-1);
  };
  
  // Search functionality
  const handleSearch = () => {
    if (!searchTerm.trim() || !currentLog) {
      setSearchResults([]);
      setCurrentSearchIndex(-1);
      return;
    }
    
    const results = [];
    currentLog.content.forEach((line, index) => {
      if (line.text.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(index);
      }
    });
    
    setSearchResults(results);
    setCurrentSearchIndex(results.length > 0 ? 0 : -1);
  };
  
  const navigateSearch = (direction) => {
    if (searchResults.length === 0) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentSearchIndex + 1) % searchResults.length;
    } else {
      newIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    }
    
    setCurrentSearchIndex(newIndex);
  };
  
  const handleFlagLine = (lineIndex) => {
    if (onFlagLine) {
      onFlagLine(lineIndex);
    }
  };
  
  // If no logs are available, show a message
  if (!logs || logs.length === 0) {
    return (
      <div className="log-viewer-empty">
        <FaExclamationTriangle className="empty-icon" />
        <p>No log files available for analysis.</p>
      </div>
    );
  }
  
  return (
    <div className="log-viewer">
      <div className="log-header">
        <div className="log-tabs">
          {logs.map((log, index) => (
            <button
              key={log.id}
              className={`log-tab ${index === currentLogIndex ? 'active' : ''}`}
              onClick={() => handleLogSwitch(index)}
            >
              {log.name}
            </button>
          ))}
        </div>
        
        <div className="log-search">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-button" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="search-navigation">
              <span className="results-count">
                {currentSearchIndex + 1}/{searchResults.length}
              </span>
              <button 
                className="nav-button prev"
                onClick={() => navigateSearch('prev')}
              >
                ↑
              </button>
              <button 
                className="nav-button next"
                onClick={() => navigateSearch('next')}
              >
                ↓
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="log-content" ref={logViewerRef}>
        {currentLog && (
          <div className="log-info">
            <div className="log-info-header">
              <span className="log-name">{currentLog.name}</span>
              <span className="log-type">{currentLog.type}</span>
            </div>
            <div className="log-meta">
              <span className="log-timestamp">Timestamp: {currentLog.timestamp}</span>
              <span className="log-source">Source: {currentLog.source}</span>
            </div>
          </div>
        )}
        
        <div className="log-lines">
          {currentLog && currentLog.content.map((line, index) => {
            const isHighlighted = index === highlightedLineIndex;
            const isFlagged = flaggedLines.includes(index);
            const hasSearchMatch = searchTerm && line.text.toLowerCase().includes(searchTerm.toLowerCase());
            
            return (
              <div 
                key={index}
                id={`log-line-${index}`}
                className={`log-line ${isHighlighted ? 'highlighted' : ''} ${isFlagged ? 'flagged' : ''} ${hasSearchMatch ? 'search-match' : ''}`}
              >
                <div className="line-number">{index + 1}</div>
                <div className="line-text">
                  <pre>{line.text}</pre>
                </div>
                <div className="line-actions">
                  <button 
                    className={`flag-button ${isFlagged ? 'active' : ''}`}
                    onClick={() => handleFlagLine(index)}
                    title={isFlagged ? "Unflag this line" : "Flag as suspicious"}
                  >
                    {isFlagged ? <FaFlag /> : <FaRegFlag />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="log-viewer-footer">
        <div className="log-statistics">
          <span>Total Lines: {currentLog ? currentLog.content.length : 0}</span>
          <span>Flagged: {flaggedLines.length}</span>
        </div>
        <div className="log-help">
          <span className="help-text">Click <FaRegFlag /> to flag suspicious log entries</span>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;
