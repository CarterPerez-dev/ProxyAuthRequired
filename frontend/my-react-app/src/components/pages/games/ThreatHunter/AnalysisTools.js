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
    <div className="threathunter_analysistools_container">
      <div className="threathunter_analysistools_header">
        <h3>Analysis Tools</h3>
      </div>
      
      <div className="threathunter_analysistools_container_inner">
        <div className="threathunter_analysistools_menu">
          <button 
            className={`threathunter_analysistools_tool_button ${activeTool === 'threat-detection' ? 'active' : ''}`}
            onClick={() => handleToolSelect('threat-detection')}
          >
            <FaShieldAlt className="threathunter_analysistools_tool_icon" />
            <span>Threat Detection</span>
          </button>
          <button 
            className={`threathunter_analysistools_tool_button ${activeTool === 'ip-analysis' ? 'active' : ''}`}
            onClick={() => handleToolSelect('ip-analysis')}
          >
            <FaNetworkWired className="threathunter_analysistools_tool_icon" />
            <span>IP Analysis</span>
          </button>
          <button 
            className={`threathunter_analysistools_tool_button ${activeTool === 'pattern-recognition' ? 'active' : ''}`}
            onClick={() => handleToolSelect('pattern-recognition')}
          >
            <FaVirus className="threathunter_analysistools_tool_icon" />
            <span>Pattern Recognition</span>
          </button>
          <button 
            className={`threathunter_analysistools_tool_button ${activeTool === 'user-activity' ? 'active' : ''}`}
            onClick={() => handleToolSelect('user-activity')}
          >
            <FaUserSecret className="threathunter_analysistools_tool_icon" />
            <span>User Activity</span>
          </button>
        </div>
        
        <div className="threathunter_analysistools_tool_content">
          {activeTool === 'threat-detection' && (
            <div className="threathunter_analysistools_threat_detection_tool">
              <div className="threathunter_analysistools_tool_actions">
                <button className="threathunter_analysistools_add_threat_button" onClick={showAddThreatForm}>
                  <FaPlus /> Add Detected Threat
                </button>
              </div>
              
              {showDetectionForm && (
                <div className="threathunter_analysistools_threat_form">
                  <h4>{editingThreatId ? 'Edit Threat' : 'Add New Threat'}</h4>
                  
                  <div className="threathunter_analysistools_form_group">
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
                  
                  <div className="threathunter_analysistools_form_group">
                    <label>Description:</label>
                    <textarea
                      value={threatDescription}
                      onChange={(e) => setThreatDescription(e.target.value)}
                      placeholder="Describe the threat you've identified..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="threathunter_analysistools_form_group">
                    <label>Source/Evidence:</label>
                    <input
                      type="text"
                      value={threatSource}
                      onChange={(e) => setThreatSource(e.target.value)}
                      placeholder="IP, user, or log line reference"
                    />
                  </div>
                  
                  <div className="threathunter_analysistools_form_actions">
                    <button 
                      className="threathunter_analysistools_submit_threat_button" 
                      onClick={handleSubmitThreat}
                      disabled={!threatDescription.trim()}
                    >
                      {editingThreatId ? 'Update' : 'Add'} Threat
                    </button>
                    <button className="threathunter_analysistools_cancel_button" onClick={handleCancelForm}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              <div className="threathunter_analysistools_detected_threats">
                <h4>Detected Threats ({detectedThreats.length})</h4>
                
                {detectedThreats.length === 0 ? (
                  <div className="threathunter_analysistools_no_threats">
                    <p>No threats detected yet. Use the analysis tools and flags to identify suspicious activity.</p>
                  </div>
                ) : (
                  <div className="threathunter_analysistools_threats_list">
                    {detectedThreats.map(threat => (
                      <div key={threat.id} className="threathunter_analysistools_threat_item">
                        <div className="threathunter_analysistools_threat_header">
                          <div className="threathunter_analysistools_threat_type">
                            {getThreatTypeIcon(threat.type)}
                            <span>{threatTypes.find(t => t.id === threat.type)?.name || 'Unknown Threat'}</span>
                          </div>
                          <div className="threathunter_analysistools_threat_actions">
                            <button 
                              className="threathunter_analysistools_edit_threat" 
                              onClick={() => showEditThreatForm(threat)}
                              title="Edit threat"
                            >
                              Edit
                            </button>
                            <button 
                              className="threathunter_analysistools_remove_threat" 
                              onClick={() => handleRemoveThreat(threat.id)}
                              title="Remove threat"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                        <div className="threathunter_analysistools_threat_body">
                          <div className="threathunter_analysistools_threat_description">{threat.description}</div>
                          {threat.source && (
                            <div className="threathunter_analysistools_threat_source">Source: {threat.source}</div>
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
            <div className="threathunter_analysistools_ip_analysis_tool">
              <h4>IP Analysis</h4>
              <p className="threathunter_analysistools_tool_instruction">Identify suspicious IPs by analyzing log patterns. Look for repeated failed logins, unusual ports, or communication with known malicious hosts.</p>
              
              {scenario?.knownEntities?.ips && (
                <div className="threathunter_analysistools_entity_accordion">
                  <div 
                    className="threathunter_analysistools_accordion_header"
                    onClick={() => {
                      const el = document.getElementById('ip-list');
                      el.style.display = el.style.display === 'block' ? 'none' : 'block';
                    }}
                  >
                    <span>Network IPs</span>
                    <FaChevronDown />
                  </div>
                  <div id="ip-list" className="threathunter_analysistools_accordion_content" style={{ display: 'none' }}>
                    <ul className="threathunter_analysistools_entity_list">
                      {scenario.knownEntities.ips.map((ip, index) => (
                        <li key={index} className="threathunter_analysistools_entity_item">
                          <span className="threathunter_analysistools_entity_value">{ip.address}</span>
                          <span className="threathunter_analysistools_entity_info">{ip.info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="threathunter_analysistools_ip_analysis_tips">
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
            <div className="threathunter_analysistools_pattern_recognition_tool">
              <h4>Pattern Recognition</h4>
              <p className="threathunter_analysistools_tool_instruction">Identify repeating patterns and anomalies in logs that might indicate malicious activity.</p>
              
              <div className="threathunter_analysistools_pattern_tips">
                <h5>Common Malicious Patterns:</h5>
                <ul>
                  <li>
                    <span className="threathunter_analysistools_pattern_name">Port Scanning:</span>
                    <span className="threathunter_analysistools_pattern_desc">Multiple connection attempts to different ports from the same IP</span>
                  </li>
                  <li>
                    <span className="threathunter_analysistools_pattern_name">Brute Force:</span>
                    <span className="threathunter_analysistools_pattern_desc">Repeated failed login attempts followed by a successful one</span>
                  </li>
                  <li>
                    <span className="threathunter_analysistools_pattern_name">Command & Control:</span>
                    <span className="threathunter_analysistools_pattern_desc">Regular beaconing connections to the same external host</span>
                  </li>
                  <li>
                    <span className="threathunter_analysistools_pattern_name">Data Exfiltration:</span>
                    <span className="threathunter_analysistools_pattern_desc">Large outbound data transfers, especially to unusual destinations</span>
                  </li>
                  <li>
                    <span className="threathunter_analysistools_pattern_name">Privilege Escalation:</span>
                    <span className="threathunter_analysistools_pattern_desc">Sudden access to resources by users who typically don't have permission</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTool === 'user-activity' && (
            <div className="threathunter_analysistools_user_activity_tool">
              <h4>User Activity Analysis</h4>
              <p className="threathunter_analysistools_tool_instruction">Analyze user login patterns, permissions changes, and unusual behavior.</p>
              
              {scenario?.knownEntities?.users && (
                <div className="threathunter_analysistools_entity_accordion">
                  <div 
                    className="threathunter_analysistools_accordion_header"
                    onClick={() => {
                      const el = document.getElementById('user-list');
                      el.style.display = el.style.display === 'block' ? 'none' : 'block';
                    }}
                  >
                    <span>Authorized Users</span>
                    <FaChevronDown />
                  </div>
                  <div id="user-list" className="threathunter_analysistools_accordion_content" style={{ display: 'none' }}>
                    <ul className="threathunter_analysistools_entity_list">
                      {scenario.knownEntities.users.map((user, index) => (
                        <li key={index} className="threathunter_analysistools_entity_item">
                          <span className="threathunter_analysistools_entity_value">{user.username}</span>
                          <span className="threathunter_analysistools_entity_info">{user.role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="threathunter_analysistools_user_activity_tips">
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
