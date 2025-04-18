// src/components/pages/games/ThreatHunter/AnalysisTools.js
import React, { useState } from 'react';
import { 
  FaNetworkWired, FaShieldAlt, FaVirus, FaUserSecret, 
  FaTimes, FaPlus, FaChevronDown, FaChevronUp 
} from 'react-icons/fa';
import './AnalysisTools.css';

const threatTypes = [
  { id: 'malware', name: 'Malware Activity', icon: <FaVirus /> },
  { id: 'intrusion', name: 'Intrusion Attempt', icon: <FaShieldAlt /> },
  { id: 'data_exfiltration', name: 'Data Exfiltration', icon: <FaNetworkWired /> },
  { id: 'credential_theft', name: 'Credential Theft', icon: <FaUserSecret /> },
  { id: 'ddos', name: 'DDoS Attack', icon: <FaNetworkWired /> },
];

const AnalysisTools = ({ scenario, detectedThreats, onDetectThreat, onRemoveThreat }) => {
  const [activeTool, setActiveTool] = useState('threat-detection');
  const [showDetectionForm, setShowDetectionForm] = useState(false);
  const [threatType, setThreatType] = useState('malware');
  const [threatDescription, setThreatDescription] = useState('');
  const [threatSource, setThreatSource] = useState('');
  const [editingThreatId, setEditingThreatId] = useState(null);
  
  const handleToolSelect = (toolId) => {
    setActiveTool(toolId);
  };
  
  const showAddThreatForm = () => {
    setEditingThreatId(null);
    setThreatType('malware');
    setThreatDescription('');
    setThreatSource('');
    setShowDetectionForm(true);
  };
  
  const showEditThreatForm = (threat) => {
    setEditingThreatId(threat.id);
    setThreatType(threat.type);
    setThreatDescription(threat.description);
    setThreatSource(threat.source);
    setShowDetectionForm(true);
  };
  
  const handleCancelForm = () => {
    setShowDetectionForm(false);
    setEditingThreatId(null);
    setThreatType('malware');
    setThreatDescription('');
    setThreatSource('');
  };
  
  const handleSubmitThreat = () => {
    if (!threatDescription.trim()) return;
    
    const threatData = {
      id: editingThreatId || `threat-${Date.now()}`,
      type: threatType,
      description: threatDescription.trim(),
      source: threatSource.trim(),
      timestamp: new Date().toISOString()
    };
    
    onDetectThreat(threatData);
    
    // Reset form
    setShowDetectionForm(false);
    setEditingThreatId(null);
    setThreatType('malware');
    setThreatDescription('');
    setThreatSource('');
  };
  
  const handleRemoveThreat = (threatId) => {
    if (onRemoveThreat) {
      onRemoveThreat(threatId);
    }
  };
  
  // Group icon mapping
  const getToolIcon = (toolId) => {
    switch(toolId) {
      case 'threat-detection':
        return <FaShieldAlt />;
      case 'ip-analysis':
        return <FaNetworkWired />;
      case 'pattern-recognition':
        return <FaVirus />;
      case 'user-activity':
        return <FaUserSecret />;
      default:
        return null;
    }
  };
  
  // Get the icon for a specific threat type
  const getThreatTypeIcon = (type) => {
    const threatType = threatTypes.find(t => t.id === type);
    return threatType ? threatType.icon : <FaVirus />;
  };
  
  return (
    <div className="analysis-tools">
      <div className="tools-header">
        <h3>Analysis Tools</h3>
      </div>
      
      <div className="tools-container">
        <div className="tools-menu">
          <button 
            className={`tool-button ${activeTool === 'threat-detection' ? 'active' : ''}`}
            onClick={() => handleToolSelect('threat-detection')}
          >
            <FaShieldAlt className="tool-icon" />
            <span>Threat Detection</span>
          </button>
          <button 
            className={`tool-button ${activeTool === 'ip-analysis' ? 'active' : ''}`}
            onClick={() => handleToolSelect('ip-analysis')}
          >
            <FaNetworkWired className="tool-icon" />
            <span>IP Analysis</span>
          </button>
          <button 
            className={`tool-button ${activeTool === 'pattern-recognition' ? 'active' : ''}`}
            onClick={() => handleToolSelect('pattern-recognition')}
          >
            <FaVirus className="tool-icon" />
            <span>Pattern Recognition</span>
          </button>
          <button 
            className={`tool-button ${activeTool === 'user-activity' ? 'active' : ''}`}
            onClick={() => handleToolSelect('user-activity')}
          >
            <FaUserSecret className="tool-icon" />
            <span>User Activity</span>
          </button>
        </div>
        
        <div className="tool-content">
          {activeTool === 'threat-detection' && (
            <div className="threat-detection-tool">
              <div className="tool-actions">
                <button className="add-threat-button" onClick={showAddThreatForm}>
                  <FaPlus /> Add Detected Threat
                </button>
              </div>
              
              {showDetectionForm && (
                <div className="threat-form">
                  <h4>{editingThreatId ? 'Edit Threat' : 'Add New Threat'}</h4>
                  
                  <div className="form-group">
                    <label>Threat Type:</label>
                    <select 
                      value={threatType}
                      onChange={(e) => setThreatType(e.target.value)}
                    >
                      {threatTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      value={threatDescription}
                      onChange={(e) => setThreatDescription(e.target.value)}
                      placeholder="Describe the threat you've identified..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Source/Evidence:</label>
                    <input
                      type="text"
                      value={threatSource}
                      onChange={(e) => setThreatSource(e.target.value)}
                      placeholder="IP, user, or log line reference"
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="submit-threat-button" 
                      onClick={handleSubmitThreat}
                      disabled={!threatDescription.trim()}
                    >
                      {editingThreatId ? 'Update' : 'Add'} Threat
                    </button>
                    <button className="cancel-button" onClick={handleCancelForm}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              <div className="detected-threats">
                <h4>Detected Threats ({detectedThreats.length})</h4>
                
                {detectedThreats.length === 0 ? (
                  <div className="no-threats">
                    <p>No threats detected yet. Use the analysis tools and flags to identify suspicious activity.</p>
                  </div>
                ) : (
                  <div className="threats-list">
                    {detectedThreats.map(threat => (
                      <div key={threat.id} className="threat-item">
                        <div className="threat-header">
                          <div className="threat-type">
                            {getThreatTypeIcon(threat.type)}
                            <span>{threatTypes.find(t => t.id === threat.type)?.name || 'Unknown Threat'}</span>
                          </div>
                          <div className="threat-actions">
                            <button 
                              className="edit-threat" 
                              onClick={() => showEditThreatForm(threat)}
                              title="Edit threat"
                            >
                              Edit
                            </button>
                            <button 
                              className="remove-threat" 
                              onClick={() => handleRemoveThreat(threat.id)}
                              title="Remove threat"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                        <div className="threat-body">
                          <div className="threat-description">{threat.description}</div>
                          {threat.source && (
                            <div className="threat-source">Source: {threat.source}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTool === 'ip-analysis' && (
            <div className="ip-analysis-tool">
              <h4>IP Analysis</h4>
              <p className="tool-instruction">Identify suspicious IPs by analyzing log patterns. Look for repeated failed logins, unusual ports, or communication with known malicious hosts.</p>
              
              {scenario?.knownEntities?.ips && (
                <div className="entity-accordion">
                  <div 
                    className="accordion-header"
                    onClick={() => {
                      const el = document.getElementById('ip-list');
                      el.style.display = el.style.display === 'block' ? 'none' : 'block';
                    }}
                  >
                    <span>Network IPs</span>
                    <FaChevronDown />
                  </div>
                  <div id="ip-list" className="accordion-content" style={{ display: 'none' }}>
                    <ul className="entity-list">
                      {scenario.knownEntities.ips.map((ip, index) => (
                        <li key={index} className="entity-item">
                          <span className="entity-value">{ip.address}</span>
                          <span className="entity-info">{ip.info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="ip-analysis-tips">
                <h5>Analysis Tips:</h5>
                <ul>
                  <li>Look for IP addresses that appear in many failed authentication attempts</li>
                  <li>Check for communication with unusual ports (e.g., 4444, 31337)</li>
                  <li>Monitor traffic to/from countries or IPs not normally in your network</li>
                  <li>Identify IPs establishing connections outside business hours</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTool === 'pattern-recognition' && (
            <div className="pattern-recognition-tool">
              <h4>Pattern Recognition</h4>
              <p className="tool-instruction">Identify repeating patterns and anomalies in logs that might indicate malicious activity.</p>
              
              <div className="pattern-tips">
                <h5>Common Malicious Patterns:</h5>
                <ul>
                  <li>
                    <span className="pattern-name">Port Scanning:</span>
                    <span className="pattern-desc">Multiple connection attempts to different ports from the same IP</span>
                  </li>
                  <li>
                    <span className="pattern-name">Brute Force:</span>
                    <span className="pattern-desc">Repeated failed login attempts followed by a successful one</span>
                  </li>
                  <li>
                    <span className="pattern-name">Command & Control:</span>
                    <span className="pattern-desc">Regular beaconing connections to the same external host</span>
                  </li>
                  <li>
                    <span className="pattern-name">Data Exfiltration:</span>
                    <span className="pattern-desc">Large outbound data transfers, especially to unusual destinations</span>
                  </li>
                  <li>
                    <span className="pattern-name">Privilege Escalation:</span>
                    <span className="pattern-desc">Sudden access to resources by users who typically don't have permission</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTool === 'user-activity' && (
            <div className="user-activity-tool">
              <h4>User Activity Analysis</h4>
              <p className="tool-instruction">Analyze user login patterns, permissions changes, and unusual behavior.</p>
              
              {scenario?.knownEntities?.users && (
                <div className="entity-accordion">
                  <div 
                    className="accordion-header"
                    onClick={() => {
                      const el = document.getElementById('user-list');
                      el.style.display = el.style.display === 'block' ? 'none' : 'block';
                    }}
                  >
                    <span>Authorized Users</span>
                    <FaChevronDown />
                  </div>
                  <div id="user-list" className="accordion-content" style={{ display: 'none' }}>
                    <ul className="entity-list">
                      {scenario.knownEntities.users.map((user, index) => (
                        <li key={index} className="entity-item">
                          <span className="entity-value">{user.username}</span>
                          <span className="entity-info">{user.role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="user-activity-tips">
                <h5>Suspicious User Behaviors:</h5>
                <ul>
                  <li>Login attempts outside normal working hours</li>
                  <li>Access from unusual locations or IPs</li>
                  <li>Privilege escalation or permission changes</li>
                  <li>Accessing sensitive resources not typically used</li>
                  <li>Creating new admin accounts</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisTools;
