// src/components/pages/games/ThreatHunter/LogViewer.js
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
      <div className="threathunter_logviewer_empty_state">
        <FaExclamationTriangle className="threathunter_logviewer_empty_icon" />
        <p>No log files available for analysis.</p>
      </div>
    );
  }
  
  return (
    <div className="threathunter_logviewer_main_wrapper">
      <div className="threathunter_logviewer_header_bar">
        <div className="threathunter_logviewer_tabs_container">
          {logs.map((log, index) => (
            <button
              key={log.id}
              className={`threathunter_logviewer_tab_button ${index === currentLogIndex ? 'active' : ''}`}
              onClick={() => handleLogSwitch(index)}
            >
              {log.name}
            </button>
          ))}
        </div>
        
        <div className="threathunter_logviewer_search_area">
          <div className="threathunter_logviewer_search_input_box">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="threathunter_logviewer_search_button" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="threathunter_logviewer_search_navigation">
              <span className="threathunter_logviewer_results_count">
                {currentSearchIndex + 1}/{searchResults.length}
              </span>
              <button 
                className="threathunter_logviewer_nav_button prev"
                onClick={() => navigateSearch('prev')}
              >
                ↑
              </button>
              <button 
                className="threathunter_logviewer_nav_button next"
                onClick={() => navigateSearch('next')}
              >
                ↓
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="threathunter_logviewer_content_area" ref={logViewerRef}>
        {currentLog && (
          <div className="threathunter_logviewer_info_section">
            <div className="threathunter_logviewer_info_header">
              <span className="threathunter_logviewer_log_name">{currentLog.name}</span>
              <span className="threathunter_logviewer_log_type">{currentLog.type}</span>
            </div>
            <div className="threathunter_logviewer_log_meta">
              <span className="threathunter_logviewer_log_timestamp">Timestamp: {currentLog.timestamp}</span>
              <span className="threathunter_logviewer_log_source">Source: {currentLog.source}</span>
            </div>
          </div>
        )}
        
        <div className="threathunter_logviewer_log_lines">
          {currentLog && currentLog.content.map((line, index) => {
            const isHighlighted = index === highlightedLineIndex;
            const isFlagged = flaggedLines.includes(index);
            const hasSearchMatch = searchTerm && line.text.toLowerCase().includes(searchTerm.toLowerCase());
            
            return (
              <div 
                key={index}
                id={`log-line-${index}`}
                className={`threathunter_logviewer_log_line ${isHighlighted ? 'highlighted' : ''} ${isFlagged ? 'flagged' : ''} ${hasSearchMatch ? 'search-match' : ''}`}
              >
                <div className="threathunter_logviewer_line_number">{index + 1}</div>
                <div className="threathunter_logviewer_line_text">
                  <pre>{line.text}</pre>
                </div>
                <div className="threathunter_logviewer_line_actions">
                  <button 
                    className={`threathunter_logviewer_flag_button ${isFlagged ? 'active' : ''}`}
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
      
      <div className="threathunter_logviewer_footer">
        <div className="threathunter_logviewer_statistics">
          <span>Total Lines: {currentLog ? currentLog.content.length : 0}</span>
          <span>Flagged: {flaggedLines.length}</span>
        </div>
        <div className="threathunter_logviewer_help_text">
          <span>Click <FaRegFlag /> to flag suspicious log entries</span>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;
