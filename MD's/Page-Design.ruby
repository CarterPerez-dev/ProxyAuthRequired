
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import sidebarLogo from './sidebarlogo.png'; 
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaBars, 
  FaTimes,
  FaUser,
  FaTrophy, 
  FaStore, 
  FaGift, 
  FaChartBar,
  FaQuestion,
  FaTools,
  FaNewspaper,
  FaBook,
  FaLaptopCode
} from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [practiceTestsOpen, setPracticeTestsOpen] = useState(false);

  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleTools = () => {
    setToolsOpen(!toolsOpen);
  };

  const togglePracticeTests = () => {
    setPracticeTestsOpen(!practiceTestsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // if sidebar is open
      if (!collapsed) {
        // check if clicked inside sidebar
        const clickedInsideSidebar = sidebarRef.current?.contains(event.target);
        // check if clicked on the toggle button
        const clickedToggleButton = toggleButtonRef.current?.contains(event.target);

        // if the click is outside sidebar AND not on the toggle button, collapse
        if (!clickedInsideSidebar && !clickedToggleButton) {
          setCollapsed(true);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [collapsed]);

  // Icon mapping for main menu items
  const getIcon = (path) => {
    switch(path) {
      case '/profile': return <FaUser className="sidebar-icon" />;
      case '/achievements': return <FaTrophy className="sidebar-icon" />;
      case '/shop': return <FaStore className="sidebar-icon" />;
      case '/daily': return <FaGift className="sidebar-icon" />;
      case '/leaderboard': return <FaChartBar className="sidebar-icon" />;
      case '/my-support': return <FaQuestion className="sidebar-icon" />;
      case '/dailycyberbrief': return <FaNewspaper className="sidebar-icon" />;
      case '/resources': return <FaBook className="sidebar-icon" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        ref={toggleButtonRef}
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
      >
        {collapsed ? <FaBars /> : <FaTimes />}
      </button>

      <div ref={sidebarRef} className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-content">
          <h2 className="sidebar-title">root@</h2>
          
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li>
                <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}>
                  {getIcon('/profile')}
                  <span className="sidebar-link-text">/Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/achievements" className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}>
                  {getIcon('/achievements')}
                  <span className="sidebar-link-text">/Achievements</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}>
                  {getIcon('/shop')}
                  <span className="sidebar-link-text">/Shop</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/daily" className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}>
                  {getIcon('/daily')}
                  <span className="sidebar-link-text">/Bonus</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/leaderboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}>
                  {getIcon('/leaderboard')}
                  <span className="sidebar-link-text">/Leaderboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-support" className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}>
                  {getIcon('/my-support')}
                  <span className="sidebar-link-text">/Questions</span>
                </NavLink>
              </li>
              
              {/* Tools group */}
              <li className="sidebar-group">
                <div
                  className="group-header"
                  onClick={toggleTools}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') toggleTools();
                  }}
                >
                  <div className="group-header-content">
                    <FaTools className="sidebar-icon" />
                    <span className="sidebar-link-text">/Tools</span>
                  </div>
                  {toolsOpen ? <FaChevronUp className="group-icon" /> : <FaChevronDown className="group-icon" />}
                </div>
                <ul className={`group-sublist ${toolsOpen ? 'expanded' : ''}`}>
                  <li>
                    <NavLink to="/xploitcraft" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">Xploitcraft</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/scenariosphere" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">Scenario Sphere</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/analogyhub" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">Analogy Hub</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/grc" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">GRC Wizard</span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Daily CyberBrief */}
              <li>
                <NavLink to="/dailycyberbrief" className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}>
                  {getIcon('/dailycyberbrief')}
                  <span className="sidebar-link-text">/Daily CyberBrief</span>
                </NavLink>
              </li>

              {/* Study Resources */}
              <li>
                <NavLink to="/resources" className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}>
                  {getIcon('/resources')}
                  <span className="sidebar-link-text">/Study Resources</span>
                </NavLink>
              </li>

              {/* Practice Tests group */}
              <li className="sidebar-group">
                <div
                  className="group-header"
                  onClick={togglePracticeTests}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') togglePracticeTests();
                  }}
                >
                  <div className="group-header-content">
                    <FaLaptopCode className="sidebar-icon" />
                    <span className="sidebar-link-text">/Practice Tests</span>
                  </div>
                  {practiceTestsOpen ? <FaChevronUp className="group-icon" /> : <FaChevronDown className="group-icon" />}
                </div>
                <ul className={`group-sublist ${practiceTestsOpen ? 'expanded' : ''}`}>
                  <li>
                    <NavLink to="/practice-tests/a-plus" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">A+ Core 1</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/aplus-core2" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">A+ Core 2</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/network-plus" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">Network+</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/security-plus" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">Security+</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/cysa-plus" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">CySa+</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/pen-plus" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">Pentest+</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/casp-plus" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">CASP+</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/linux-plus" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">Linux+</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/cloud-plus" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">Cloud+</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/data-plus" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">Data+</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/server-plus" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">Server+</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/cissp" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">CISSP</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/practice-tests/aws-cloud" className={({ isActive }) => `sidebar-sublink ${isActive ? 'active-subtab' : ''}`}>
                      <span className="sidebar-link-text">AWS Cloud Practitioner</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          <div className="sidebar-logo-container">
            <img src={sidebarLogo} alt="Sidebar Logo" className="sidebar-logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
/* Sidebar.css - Enhanced styling while maintaining core functionality */

:root {
  --sidebar-bg: #121212;
  --sidebar-border: #222222;
  --sidebar-text: #e2dfd2;
  --sidebar-text-hover: #ffffff;
  --sidebar-accent: #cc0000;
  --sidebar-accent-hover: #ff3333;
  --sidebar-item-hover-bg: rgba(255, 255, 255, 0.05);
  --sidebar-active-bg: rgba(204, 0, 0, 0.1);
  --sidebar-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  --sidebar-glow: 0 0 10px rgba(204, 0, 0, 0.5);
}

/* Reset some defaults */
body, html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Orbitron', sans-serif;
}

/* Sidebar Container */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
  padding: 10px;
  border: 2px solid var(--sidebar-border);
  border-left: none;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  display: flex;
  flex-direction: column;
  transform: translateX(-220px);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1500;
  box-shadow: var(--sidebar-shadow);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Hide scrollbar */
.sidebar-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.sidebar:not(.collapsed) {
  transform: translateX(0);
}

.sidebar.collapsed {
  transform: translateX(-220px);
}

/* Sidebar Title */
.sidebar-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.9em;
  margin-bottom: 28px;
  color: var(--sidebar-accent);
  text-align: center;
  text-shadow: 1px 1px 0px #ffffff;
  padding: 10px 0;
}

/* Sidebar Navigation */
.sidebar-nav {
  flex-grow: 1;
}

/* Sidebar List */
.sidebar-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-family: 'Orbitron', sans-serif;
}

.sidebar-list li {
  margin-bottom: 12px;
}

/* Standard Link */
.sidebar-link {
  color: var(--sidebar-text);
  text-decoration: none;
  font-weight: bold;
  transition: all 0.2s ease;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
}

.sidebar-link::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.sidebar-link:hover {
  background-color: var(--sidebar-item-hover-bg);
  color: var(--sidebar-text-hover);
}

.sidebar-link:hover::before {
  background-color: var(--sidebar-accent);
}

.sidebar-link.active-link {
  background-color: var(--sidebar-active-bg);
  color: var(--sidebar-accent);
}

.sidebar-link.active-link::before {
  background-color: var(--sidebar-accent);
}

.sidebar-icon {
  font-size: 18px;
  color: var(--sidebar-accent);
  min-width: 20px;
  transition: transform 0.2s ease;
}

.sidebar-link:hover .sidebar-icon {
  transform: scale(1.1);
  color: var(--sidebar-accent-hover);
}

/* Group Header (for Tools, Practice Tests) */
.sidebar-group .group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--sidebar-text);
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 5px;
}

.group-header-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-group .group-header:hover {
  background-color: var(--sidebar-item-hover-bg);
  color: var(--sidebar-text-hover);
}

.sidebar-group .group-header:hover .sidebar-icon {
  transform: scale(1.1);
  color: var(--sidebar-accent-hover);
}

.group-icon {
  font-size: 14px;
  color: var(--sidebar-accent);
  transition: transform 0.2s ease;
}

/* Group Sublist */
.group-sublist {
  list-style-type: none;
  padding-left: 25px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}

.group-sublist.expanded {
  max-height: 1000px; /* This should be large enough to accommodate all items */
  opacity: 1;
}

.group-sublist li {
  margin-bottom: 10px;
}

.sidebar-sublink {
  color: var(--sidebar-text);
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 8px 10px;
  border-radius: 8px;
  display: block;
  font-size: 0.9em;
  position: relative;
}

.sidebar-sublink::before {
  content: "-";
  margin-right: 5px;
  color: var(--sidebar-accent);
  transition: content 0.2s ease, color 0.2s ease;
}

.sidebar-sublink:hover {
  background-color: var(--sidebar-item-hover-bg);
  color: var(--sidebar-text-hover);
}

.sidebar-sublink:hover::before {
  content: "→";
  color: var(--sidebar-text-hover);
}

.sidebar-sublink.active-subtab {
  background-color: var(--sidebar-active-bg);
  color: var(--sidebar-accent);
}

/* Sidebar Logo Container */
.sidebar-logo-container {
  text-align: center;
  margin-top: 20px;
  padding-bottom: 20px;
}

.sidebar-logo {
  width: 80%;
  max-width: 180px;
  border-radius: 5px;
  filter: brightness(2.2);
  transition: transform 0.3s ease;
}

.sidebar-logo:hover {
  transform: scale(1.05);
}

/* Toggle Button */
.sidebar-toggle {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 2001;
  background-color: rgba(18, 18, 18, 0.8);
  border: 1px solid var(--sidebar-border);
  border-radius: 8px;
  color: var(--sidebar-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
}

.sidebar-toggle:hover {
  background-color: var(--sidebar-accent);
  color: white;
  transform: scale(1.05);
}

.sidebar:not(.collapsed) ~ .sidebar-toggle {
  left: 230px;
}

/* Responsive Adjustments */

/* Tablets */
@media (max-width: 768px) {
  .sidebar {
    width: 180px;
    transform: translateX(-180px);
  }
  
  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }
  
  .sidebar.collapsed {
    transform: translateX(-180px);
  }
  
  .sidebar-title {
    font-size: 1.7em;
    margin-bottom: 20px;
  }
  
  .sidebar-link, .sidebar-group .group-header {
    padding: 8px;
  }
  
  .sidebar-icon {
    font-size: 16px;
  }
  
  .sidebar:not(.collapsed) ~ .sidebar-toggle {
    left: 190px;
  }
  
  .sidebar-logo-container {
    padding-bottom: 30px;
  }
  
  .sidebar-logo {
    max-width: 160px;
  }
  
  .group-sublist {
    padding-left: 20px;
  }
}

/* Mobile Phones */
@media (max-width: 480px) {
  .sidebar {
    width: 160px;
    transform: translateX(-160px);
    border-radius: 0;
    border-right: 1px solid var(--sidebar-border);
    border-left: none;
    border-top: none;
    border-bottom: none;
  }
  
  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }
  
  .sidebar.collapsed {
    transform: translateX(-160px);
  }
  
  .sidebar-title {
    font-size: 1.5em;
    margin-bottom: 15px;
    padding: 5px 0;
  }
  
  .sidebar-link, .sidebar-group .group-header {
    padding: 8px 5px;
    font-size: 0.9em;
  }
  
  .sidebar-icon {
    font-size: 14px;
  }
  
  .sidebar:not(.collapsed) ~ .sidebar-toggle {
    left: 170px;
  }
  
  .sidebar-toggle {
    width: 36px;
    height: 36px;
    font-size: 18px;
    top: 10px;
    left: 10px;
  }
  
  .sidebar-logo-container {
    padding-bottom: 20px;
  }
  
  .sidebar-logo {
    max-width: 130px;
  }
  
  .group-sublist {
    padding-left: 15px;
  }
  
  .group-sublist li {
    margin-bottom: 8px;
  }
  
  .sidebar-sublink {
    padding: 6px 8px;
    font-size: 0.85em;
  }
}

/* Very small screens */
@media (max-width: 320px) {
  .sidebar {
    width: 140px;
    transform: translateX(-140px);
  }
  
  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }
  
  .sidebar.collapsed {
    transform: translateX(-140px);
  }
  
  .sidebar-title {
    font-size: 1.3em;
    margin-bottom: 10px;
  }
  
  .sidebar-link-text {
    font-size: 0.9em;
  }
  
  .sidebar:not(.collapsed) ~ .sidebar-toggle {
    left: 150px;
  }
  
  .sidebar-toggle {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
  
  .sidebar-logo {
    max-width: 110px;
  }
  
  .sidebar-logo-container {
    padding-bottom: 15px;
  }
  
  .group-sublist {
    padding-left: 12px;
  }
}
// src/components/pages/store/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchUserData } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

// Icons import
import {
  FaTrophy,
  FaMedal,
  FaStar,
  FaCrown,
  FaBolt,
  FaBook,
  FaBrain,
  FaCheckCircle,
  FaRegSmile,
  FaMagic,
  FaEye,
  FaEyeSlash,
  FaCoins,
  FaEdit,
  FaUserAlt,
  FaEnvelope,
  FaKey,
  FaSignOutAlt,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaStore,
  FaTimes,
  FaCheck,
  FaUserCircle,
  FaLevelUpAlt
} from 'react-icons/fa';

// Requirements component for password validation
import PasswordRequirements from '../auth/PasswordRequirements';

// ==========================
// FRONTEND VALIDATION HELPERS
// ==========================

// Example small dictionary of very common passwords
const COMMON_PASSWORDS = new Set([
  "password", "123456", "12345678", "qwerty", "letmein", "welcome"
]);

// Private Use / Surrogates ranges
const PRIVATE_USE_RANGES = [
  [0xE000, 0xF8FF],
  [0xF0000, 0xFFFFD],
  [0x100000, 0x10FFFD]
];
const SURROGATES_RANGE = [0xD800, 0xDFFF];

// Basic check for private use / surrogate codepoints
function hasForbiddenUnicodeScripts(str) {
  for (let i = 0; i < str.length; i++) {
    const cp = str.codePointAt(i);
    // Surrogates
    if (cp >= SURROGATES_RANGE[0] && cp <= SURROGATES_RANGE[1]) {
      return true;
    }
    // Private use
    for (const [start, end] of PRIVATE_USE_RANGES) {
      if (cp >= start && cp <= end) {
        return true;
      }
    }
  }
  return false;
}

// Disallow mixing major scripts
function disallowMixedScripts(str) {
  const scriptSets = new Set();
  for (let i = 0; i < str.length; i++) {
    const cp = str.codePointAt(i);
    // Basic Latin & extended
    if (cp >= 0x0041 && cp <= 0x024F) {
      scriptSets.add("Latin");
    }
    // Greek
    else if (cp >= 0x0370 && cp <= 0x03FF) {
      scriptSets.add("Greek");
    }
    // Cyrillic
    else if (cp >= 0x0400 && cp <= 0x04FF) {
      scriptSets.add("Cyrillic");
    }
    if (scriptSets.size > 1) {
      return true;
    }
  }
  return false;
}

// ========================
// FRONTEND: Validate Username
// ========================
function frontValidateUsername(username) {
  const errors = [];
  const name = username.normalize("NFC");

  // 1) Length
  if (name.length < 3 || name.length > 30) {
    errors.push("Username must be between 3 and 30 characters long.");
  }

  // 2) Forbidden Unicode script checks
  if (hasForbiddenUnicodeScripts(name)) {
    errors.push("Username contains forbidden Unicode blocks.");
  }

  // 3) Disallow mixing multiple major scripts
  if (disallowMixedScripts(name)) {
    errors.push("Username cannot mix multiple Unicode scripts.");
  }

  // 4) Forbid control chars [0..31, 127] + suspicious punctuation
  const forbiddenRanges = [[0, 31], [127, 127]];
  const forbiddenChars = new Set(['<', '>', '\\', '/', '"', "'", ';', '`',' ', '\t', '\r', '\n']);
  for (let i = 0; i < name.length; i++) {
    const cp = name.charCodeAt(i);
    // Check ranges
    if (forbiddenRanges.some(([start, end]) => cp >= start && cp <= end)) {
      errors.push("Username contains forbidden control characters.");
      break;
    }
    if (forbiddenChars.has(name[i])) {
      errors.push("Username contains forbidden characters.");
      break;
    }
  }

  // 5) Strict allowlist pattern
  const pattern = /^[A-Za-z0-9._-]+$/;
  if (!pattern.test(name)) {
    errors.push("Username can only contain letters, digits, underscores, dashes, or dots.");
  }

  // 6) Disallow triple identical consecutive characters
  if (/(.)\1{2,}/.test(name)) {
    errors.push("Username cannot contain three identical consecutive characters.");
  }

  // 7) Disallow leading or trailing punctuation
  if (/^[._-]|[._-]$/.test(name)) {
    errors.push("Username cannot start or end with . - or _.");
  }

  return errors;
}

// ========================
// FRONTEND: Validate Email
// ========================
function frontValidateEmail(email) {
  const errors = [];
  const e = email.normalize("NFC").trim();

  // 1) Length
  if (e.length < 5 || e.length > 128) {
    errors.push("Email length must be between 5 and 128 characters.");
  }

  // 3) Forbid suspicious ASCII
  const forbiddenAscii = new Set(['<','>','`',';',' ', '\t','\r','\n','"',"'", '\\']);
  for (let i = 0; i < e.length; i++) {
    if (forbiddenAscii.has(e[i])) {
      errors.push("Email contains forbidden characters.");
      break;
    }
  }

  // 4) Must have exactly one @
  const atCount = (e.match(/@/g) || []).length;
  if (atCount !== 1) {
    errors.push("Email must contain exactly one '@' symbol.");
  }

  return errors;
}

// ========================
// FRONTEND: Validate Password
// ========================
function frontValidatePassword(password, username, email) {
  const errors = [];
  const pwd = password;

  // 1) Length
  if (pwd.length < 6 || pwd.length > 64) {
    errors.push("Password must be between 6 and 64 characters long.");
  }

  // 2) Disallow whitespace or < >
  if (/[ \t\r\n<>]/.test(pwd)) {
    errors.push("Password cannot contain whitespace or < or > characters.");
  }

  // 3) Complexity
  if (!/[A-Z]/.test(pwd)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(pwd)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/\d/.test(pwd)) {
    errors.push("Password must contain at least one digit.");
  }
  const specialPattern = /[!@#$%^&*()\-_=+\[\]{}|;:'",<.>\/?`~\\]/;
  if (!specialPattern.test(pwd)) {
    errors.push("Password must contain at least one special character.");
  }

  // 4) Disallow triple identical consecutive characters
  if (/(.)\1{2,}/.test(pwd)) {
    errors.push("Password must not contain three identical consecutive characters.");
  }

  // 5) Check common password list
  const lowerPwd = pwd.toLowerCase();
  if (COMMON_PASSWORDS.has(lowerPwd)) {
    errors.push("Password is too common. Please choose a stronger password.");
  }

  // 6) Disallow certain dictionary words
  const dictionaryPatterns = ['password', 'qwerty', 'abcdef', 'letmein', 'welcome', 'admin'];
  for (const pat of dictionaryPatterns) {
    if (lowerPwd.includes(pat)) {
      errors.push(`Password must not contain the word '${pat}'.`);
    }
  }

  // 7) Disallow if password contains username or local part of email
  if (username && lowerPwd.includes(username.toLowerCase())) {
    errors.push("Password must not contain your username.");
  }
  if (email) {
    const emailLocalPart = email.split('@')[0].toLowerCase();
    if (lowerPwd.includes(emailLocalPart)) {
      errors.push("Password must not contain the local part of your email address.");
    }
  }

  return errors;
}

// ============================
// ACHIEVEMENT ICON MAPPING
// ============================
const iconMapping = {
  "test_rookie": FaTrophy,
  "accuracy_king": FaMedal,
  "bronze_grinder": FaBook,
  "silver_scholar": FaStar,
  "gold_god": FaCrown,
  "platinum_pro": FaMagic,
  "walking_encyclopedia": FaBrain,
  "redemption_arc": FaBolt,
  "coin_collector_5000": FaBook,
  "coin_hoarder_10000": FaBook,
  "coin_tycoon_50000": FaBook,
  "perfectionist_1": FaCheckCircle,
  "double_trouble_2": FaCheckCircle,
  "error404_failure_not_found": FaCheckCircle,
  "level_up_5": FaTrophy,
  "mid_tier_grinder_25": FaMedal,
  "elite_scholar_50": FaStar,
  "ultimate_master_100": FaCrown,
  "answer_machine_1000": FaBook,
  "knowledge_beast_5000": FaBrain,
  "question_terminator": FaBrain,
  "test_finisher": FaCheckCircle
};

// ============================
// COLOR MAPPING FOR ACHIEVEMENTS
// ============================
const colorMapping = {
  "test_rookie": "#ff5555",
  "accuracy_king": "#ffa500",
  "bronze_grinder": "#cd7f32",
  "silver_scholar": "#c0c0c0",
  "gold_god": "#ffd700",
  "platinum_pro": "#e5e4e2",
  "walking_encyclopedia": "#00fa9a",
  "redemption_arc": "#ff4500",
  "coin_collector_5000": "#ff69b4",
  "coin_hoarder_10000": "#ff1493",
  "coin_tycoon_50000": "#ff0000",
  "perfectionist_1": "#adff2f",
  "double_trouble_2": "#7fff00",
  "error404_failure_not_found": "#00ffff",
  "level_up_5": "#f08080",
  "mid_tier_grinder_25": "#ff8c00",
  "elite_scholar_50": "#ffd700",
  "ultimate_master_100": "#ff4500",
  "answer_machine_1000": "#ff69b4",
  "knowledge_beast_5000": "#00fa9a",
  "question_terminator": "#ff1493",
  "test_finisher": "#adff2f"
};

// Main UserProfile Component
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data from Redux store
  const {
    userId,
    username,
    email,
    xp,
    level,
    coins,
    achievements = [],
    currentAvatar,
    purchasedItems,
    subscriptionActive
  } = useSelector((state) => state.user);

  // Get achievements and shop items data
  const allAchievements = useSelector((state) => state.achievements.all);
  const allShopItems = useSelector((state) => state.shop.items);

  // Tabs state management
  const [activeTab, setActiveTab] = useState('overview');

  // Toggles for showing/hiding different forms
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const [showChangePassword, setShowChangePassword] = useState(false);

  // Password form states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showRequirements, setShowRequirements] = useState(false);

  // Status message
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success', 'error'

  // Stats display toggles
  const [showMoreAchievements, setShowMoreAchievements] = useState(false);
  const [showMoreItems, setShowMoreItems] = useState(false);

  // Calculate the percentage of XP to next level (just a visual approximation)
  const calculateXpPercentage = () => {
    const baseXpPerLevel = 1000; // Assuming 1000 XP per level
    const currentLevelBaseXp = (level - 1) * baseXpPerLevel;
    const nextLevelBaseXp = level * baseXpPerLevel;
    const xpInCurrentLevel = xp - currentLevelBaseXp;
    const xpRequiredForNextLevel = nextLevelBaseXp - currentLevelBaseXp;
    return Math.min(100, (xpInCurrentLevel / xpRequiredForNextLevel) * 100);
  };

  // XP progress percentage
  const xpPercentage = calculateXpPercentage();

  // Get user avatar from shop items
  let profilePicUrl = '/avatars/default-avatar.png'; // Default avatar
  if (currentAvatar) {
    const foundAvatar = allShopItems.find(item => item._id === currentAvatar);
    if (foundAvatar && foundAvatar.imageUrl) {
      profilePicUrl = foundAvatar.imageUrl;
    }
  }

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('userId');
    navigate('/login');
  };

  // Refresh user data
  const refetchUser = () => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  };

  // Clear status message after 5 seconds
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage('');
        setStatusType('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // =======================
  // CHANGE USERNAME
  // =======================
  const handleChangeUsername = async () => {
    setStatusMessage('');
    setStatusType('');
    
    const errors = frontValidateUsername(newUsername);
    if (errors.length > 0) {
      setStatusMessage(errors.join(' '));
      setStatusType('error');
      return;
    }

    try {
      const res = await fetch('/api/test/user/change-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newUsername })
      });
      const data = await res.json();

      if (!res.ok) {
        let errorMsg = data.error || 'Failed to change username';
        if (data.details && data.details.length > 0) {
          errorMsg += ': ' + data.details.join(', ');
        }
        throw new Error(errorMsg);
      }
      setStatusMessage('Username updated successfully!');
      setStatusType('success');
      setShowChangeUsername(false);
      setNewUsername('');
      refetchUser();
    } catch (err) {
      setStatusMessage('Error: ' + err.message);
      setStatusType('error');
    }
  };

  // =======================
  // CHANGE EMAIL
  // =======================
  const handleChangeEmail = async () => {
    setStatusMessage('');
    setStatusType('');
    
    const errors = frontValidateEmail(newEmail);
    if (errors.length > 0) {
      setStatusMessage(errors.join(' '));
      setStatusType('error');
      return;
    }

    try {
      const res = await fetch('/api/test/user/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newEmail })
      });
      const data = await res.json();

      if (!res.ok) {
        let errorMsg = data.error || 'Failed to change email';
        if (data.details && data.details.length > 0) {
          errorMsg += ': ' + data.details.join(', ');
        }
        throw new Error(errorMsg);
      }
      setStatusMessage('Email updated successfully!');
      setStatusType('success');
      setShowChangeEmail(false);
      setNewEmail('');
      refetchUser();
    } catch (err) {
      setStatusMessage('Error: ' + err.message);
      setStatusType('error');
    }
  };

  // =======================
  // CHANGE PASSWORD
  // =======================
  const handleChangePassword = async () => {
    setStatusMessage('');
    setStatusType('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setStatusMessage('All password fields are required');
      setStatusType('error');
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMessage('New passwords do not match');
      setStatusType('error');
      return;
    }

    const errors = frontValidatePassword(newPassword, username, email);
    if (errors.length > 0) {
      setStatusMessage(errors.join(' '));
      setStatusType('error');
      return;
    }

    try {
      const res = await fetch('/api/test/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          oldPassword,
          newPassword,
          confirmPassword
        })
      });
      const data = await res.json();

      if (!res.ok) {
        let errorMsg = data.error || 'Failed to change password';
        if (data.details && data.details.length > 0) {
          errorMsg += ': ' + data.details.join(', ');
        }
        throw new Error(errorMsg);
      }

      setStatusMessage('Password changed successfully!');
      setStatusType('success');
      setShowChangePassword(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowRequirements(false);
    } catch (err) {
      setStatusMessage('Error: ' + err.message);
      setStatusType('error');
    }
  };

  // CANCEL SUBSCRIPTION (placeholder)
  const handleCancelSubscription = async () => {
    try {
      const res = await fetch('/api/test/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }
      setStatusMessage('Subscription cancelled successfully');
      setStatusType('success');
      refetchUser();
    } catch (err) {
      setStatusMessage('Error: ' + err.message);
      setStatusType('error');
    }
  };

  // Map user achievements IDs to full achievement data
  const userAchievementsData = achievements
    .map(achId => allAchievements.find(a => a.achievementId === achId))
    .filter(Boolean);

  // Map user purchased item IDs to full shop item data
  const userPurchasedItems = purchasedItems
    .map(itemId => allShopItems.find(item => item._id === itemId))
    .filter(Boolean);

  return (
    <div className="user-profile-container">
      {/* Notification */}
      {statusMessage && (
        <div className={`profile-notification ${statusType === 'success' ? 'profile-notification-success' : 'profile-notification-error'}`}>
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage('')} className="profile-notification-close">
            <FaTimes />
          </button>
        </div>
      )}

      {/* Main wrapper */}
      <div className="profile-wrapper">
        {/* Header section with profile info */}
        <div className="profile-header-section">
          <div className="profile-header-content">
            <div className="profile-avatar-wrapper">
              <img src={profilePicUrl} alt={`${username}'s avatar`} className="profile-avatar" />
            </div>
            
            <div className="profile-header-info">
              <h1 className="profile-username">{username}</h1>
              
              <div className="profile-level-container">
                <div className="profile-level-badge">
                  <span className="profile-level-number">{level}</span>
                  <FaLevelUpAlt className="profile-level-icon" />
                </div>
                
                <div className="profile-xp-container">
                  <div className="profile-xp-bar">
                    <div 
                      className="profile-xp-progress" 
                      style={{ width: `${xpPercentage}%` }}
                    ></div>
                  </div>
                  <span className="profile-xp-text">{xp} XP</span>
                </div>
              </div>
              
              <div className="profile-stats">
                <div className="profile-stat-item">
                  <FaCoins className="profile-stat-icon" />
                  <span className="profile-stat-value">{coins}</span>
                </div>
                <div className="profile-stat-item">
                  <FaTrophy className="profile-stat-icon" />
                  <span className="profile-stat-value">{achievements.length}</span>
                </div>
                <div className="profile-stat-item">
                  <FaStore className="profile-stat-icon" />
                  <span className="profile-stat-value">{purchasedItems.length}</span>
                </div>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="profile-logout-btn" onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`profile-tab ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
          <button 
            className={`profile-tab ${activeTab === 'items' ? 'active' : ''}`}
            onClick={() => setActiveTab('items')}
          >
            Items
          </button>
          <button 
            className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Content section based on active tab */}
        <div className="profile-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="profile-overview-tab">
              <div className="profile-overview-cards">
                <div className="profile-card">
                  <h2 className="profile-card-title">
                    <FaUserAlt className="profile-card-icon" />
                    User Info
                  </h2>
                  <div className="profile-card-content">
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">ID:</span>
                      <span className="profile-detail-value">{userId}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">Username:</span>
                      <span className="profile-detail-value">{username}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">Email:</span>
                      <span className="profile-detail-value">{email}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="profile-detail-label">Subscription:</span>
                      <span className="profile-detail-value">
                        {subscriptionActive ? (
                          <span className="profile-subscription-active">Active</span>
                        ) : (
                          <span className="profile-subscription-inactive">Inactive</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="profile-card">
                  <h2 className="profile-card-title">
                    <FaTrophy className="profile-card-icon" />
                    Latest Achievements
                  </h2>
                  <div className="profile-card-content">
                    {userAchievementsData.length > 0 ? (
                      <div className="profile-mini-achievements">
                        {userAchievementsData.slice(0, 3).map((ach) => {
                          const AchIcon = iconMapping[ach.achievementId] || FaTrophy;
                          const achColor = colorMapping[ach.achievementId] || "#ffffff";
                          
                          return (
                            <div key={ach.achievementId} className="profile-mini-achievement">
                              <div className="profile-mini-achievement-icon" style={{ color: achColor }}>
                                <AchIcon />
                              </div>
                              <div className="profile-mini-achievement-info">
                                <span className="profile-mini-achievement-title">{ach.title}</span>
                              </div>
                            </div>
                          );
                        })}
                        {userAchievementsData.length > 3 && (
                          <button 
                            className="profile-view-more-btn"
                            onClick={() => setActiveTab('achievements')}
                          >
                            View All ({userAchievementsData.length})
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="profile-empty-message">No achievements yet. Start completing tests!</p>
                    )}
                  </div>
                </div>

                <div className="profile-card">
                  <h2 className="profile-card-title">
                    <FaStore className="profile-card-icon" />
                    Latest Items
                  </h2>
                  <div className="profile-card-content">
                    {userPurchasedItems && userPurchasedItems.length > 0 ? (
                      <div className="profile-mini-items">
                        {userPurchasedItems.slice(0, 3).map((item) => (
                          <div key={item._id} className="profile-mini-item">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="profile-mini-item-image"
                            />
                            <span className="profile-mini-item-title">{item.title}</span>
                          </div>
                        ))}
                        {userPurchasedItems.length > 3 && (
                          <button 
                            className="profile-view-more-btn"
                            onClick={() => setActiveTab('items')}
                          >
                            View All ({userPurchasedItems.length})
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="profile-empty-message">No items purchased yet. Visit the shop!</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="profile-overview-stats">
                <div className="profile-stats-card">
                  <h2 className="profile-card-title">Player Stats</h2>
                  <div className="profile-stats-grid">
                    <div className="profile-stat-card">
                      <div className="profile-stat-header">
                        <FaLevelUpAlt className="profile-stat-header-icon" />
                        <span>Level</span>
                      </div>
                      <div className="profile-stat-number">{level}</div>
                    </div>

                    <div className="profile-stat-card">
                      <div className="profile-stat-header">
                        <FaStar className="profile-stat-header-icon" />
                        <span>XP</span>
                      </div>
                      <div className="profile-stat-number">{xp}</div>
                    </div>

                    <div className="profile-stat-card">
                      <div className="profile-stat-header">
                        <FaCoins className="profile-stat-header-icon" />
                        <span>Coins</span>
                      </div>
                      <div className="profile-stat-number">{coins}</div>
                    </div>

                    <div className="profile-stat-card">
                      <div className="profile-stat-header">
                        <FaTrophy className="profile-stat-header-icon" />
                        <span>Achievements</span>
                      </div>
                      <div className="profile-stat-number">{achievements.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="profile-achievements-tab">
              <h2 className="profile-section-title">Your Achievements</h2>
              
              {userAchievementsData.length > 0 ? (
                <div className="profile-achievements-grid">
                  {userAchievementsData.map((ach) => {
                    const AchIcon = iconMapping[ach.achievementId] || FaTrophy;
                    const achColor = colorMapping[ach.achievementId] || "#ffffff";
                    
                    return (
                      <div key={ach.achievementId} className="profile-achievement-card">
                        <div className="profile-achievement-icon" style={{ color: achColor }}>
                          {ach.title.includes('🏆') ? (
                            <span className="profile-achievement-emoji">{ach.title.split(' ')[0]}</span>
                          ) : (
                            <AchIcon />
                          )}
                        </div>
                        <div className="profile-achievement-content">
                          <h3 className="profile-achievement-title">
                            {ach.title.includes('🏆') ? ach.title.split(' ').slice(1).join(' ') : ach.title}
                          </h3>
                          <p className="profile-achievement-description">{ach.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="profile-empty-state">
                  <FaTrophy className="profile-empty-icon" />
                  <p>You haven't unlocked any achievements yet.</p>
                  <p>Complete tests and challenges to earn achievements!</p>
                </div>
              )}
            </div>
          )}

          {/* Items Tab */}
          {activeTab === 'items' && (
            <div className="profile-items-tab">
              <h2 className="profile-section-title">Your Items</h2>
              
              {userPurchasedItems && userPurchasedItems.length > 0 ? (
                <div className="profile-items-grid">
                  {userPurchasedItems.map((item) => (
                    <div key={item._id} className="profile-item-card">
                      <div className="profile-item-image-container">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="profile-item-image"
                        />
                      </div>
                      <div className="profile-item-content">
                        <h3 className="profile-item-title">{item.title}</h3>
                        {item.description && (
                          <p className="profile-item-description">{item.description}</p>
                        )}
                        <div className="profile-item-status">
                          {item._id === currentAvatar ? (
                            <span className="profile-item-equipped">Equipped</span>
                          ) : (
                            <span className="profile-item-owned">Owned</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="profile-empty-state">
                  <FaStore className="profile-empty-icon" />
                  <p>You haven't purchased any items yet.</p>
                  <p>Visit the shop to buy avatars and other items!</p>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="profile-settings-tab">
              <h2 className="profile-section-title">Account Settings</h2>
              
              <div className="profile-settings-grid">
                {/* Change Username */}
                <div className="profile-setting-card">
                  <div className="profile-setting-header">
                    <FaUserAlt className="profile-setting-icon" />
                    <h3 className="profile-setting-title">Username</h3>
                  </div>
                  
                  <div className="profile-setting-content">
                    <p className="profile-setting-current">Current: <span>{username}</span></p>
                    
                    {!showChangeUsername ? (
                      <button 
                        className="profile-setting-action-btn"
                        onClick={() => setShowChangeUsername(true)}
                      >
                        <FaEdit />
                        <span>Change Username</span>
                      </button>
                    ) : (
                      <div className="profile-setting-form">
                        <div className="profile-setting-input-group">
                          <input
                            type="text"
                            className="profile-setting-input"
                            placeholder="New username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                          />
                        </div>
                        <div className="profile-setting-buttons">
                          <button 
                            className="profile-setting-submit-btn"
                            onClick={handleChangeUsername}
                          >
                            <FaCheck />
                            <span>Save</span>
                          </button>
                          <button 
                            className="profile-setting-cancel-btn"
                            onClick={() => {
                              setShowChangeUsername(false);
                              setNewUsername('');
                            }}
                          >
                            <FaTimes />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Change Email */}
                <div className="profile-setting-card">
                  <div className="profile-setting-header">
                    <FaEnvelope className="profile-setting-icon" />
                    <h3 className="profile-setting-title">Email</h3>
                  </div>
                  
                  <div className="profile-setting-content">
                    <p className="profile-setting-current">Current: <span>{email}</span></p>
                    
                    {!showChangeEmail ? (
                      <button 
                        className="profile-setting-action-btn"
                        onClick={() => setShowChangeEmail(true)}
                      >
                        <FaEdit />
                        <span>Change Email</span>
                      </button>
                    ) : (
                      <div className="profile-setting-form">
                        <div className="profile-setting-input-group">
                          <input
                            type="email"
                            className="profile-setting-input"
                            placeholder="New email address"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                          />
                        </div>
                        <div className="profile-setting-buttons">
                          <button 
                            className="profile-setting-submit-btn"
                            onClick={handleChangeEmail}
                          >
                            <FaCheck />
                            <span>Save</span>
                          </button>
                          <button 
                            className="profile-setting-cancel-btn"
                            onClick={() => {
                              setShowChangeEmail(false);
                              setNewEmail('');
                            }}
                          >
                            <FaTimes />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Change Password */}
                <div className="profile-setting-card">
                  <div className="profile-setting-header">
                    <FaKey className="profile-setting-icon" />
                    <h3 className="profile-setting-title">Password</h3>
                  </div>
                  
                  <div className="profile-setting-content">
                    <p className="profile-setting-current">Status: <span>*********</span></p>
                    
                    {!showChangePassword ? (
                      <button 
                        className="profile-setting-action-btn"
                        onClick={() => setShowChangePassword(true)}
                      >
                        <FaEdit />
                        <span>Change Password</span>
                      </button>
                    ) : (
                      <div className="profile-setting-form">
                        {/* Old Password */}
                        <div className="profile-setting-input-group">
                          <div className="profile-setting-password-field">
                            <input
                              type={showOldPassword ? 'text' : 'password'}
                              className="profile-setting-input"
                              placeholder="Current password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <button
                              type="button"
                              className="profile-setting-password-toggle"
                              onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        
                        {/* New Password */}
                        <div className="profile-setting-input-group">
                          <div className="profile-setting-password-field">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              className="profile-setting-input"
                              placeholder="New password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              onFocus={() => setShowRequirements(true)}
                              onBlur={() => {
                                if (!newPassword) {
                                  setShowRequirements(false);
                                }
                              }}
                            />
                            <button
                              type="button"
                              className="profile-setting-password-toggle"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        
                        {/* Password Requirements */}
                        {showRequirements && (
                          <div className="profile-password-requirements">
                            <PasswordRequirements password={newPassword} />
                          </div>
                        )}
                        
                        {/* Confirm Password */}
                        <div className="profile-setting-input-group">
                          <div className="profile-setting-password-field">
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              className="profile-setting-input"
                              placeholder="Confirm new password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                              type="button"
                              className="profile-setting-password-toggle"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="profile-setting-buttons">
                          <button 
                            className="profile-setting-submit-btn"
                            onClick={handleChangePassword}
                          >
                            <FaCheck />
                            <span>Save</span>
                          </button>
                          <button 
                            className="profile-setting-cancel-btn"
                            onClick={() => {
                              setShowChangePassword(false);
                              setOldPassword('');
                              setNewPassword('');
                              setConfirmPassword('');
                              setShowRequirements(false);
                            }}
                          >
                            <FaTimes />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subscription Management */}
                <div className="profile-setting-card">
                  <div className="profile-setting-header">
                    <FaUserCircle className="profile-setting-icon" />
                    <h3 className="profile-setting-title">Subscription</h3>
                  </div>
                  
                  <div className="profile-setting-content">
                    <p className="profile-setting-current">
                      Status: 
                      <span className={subscriptionActive ? "subscription-active" : "subscription-inactive"}>
                        {subscriptionActive ? "Active" : "Inactive"}
                      </span>
                    </p>
                    
                    {subscriptionActive && (
                      <button 
                        className="profile-setting-action-btn profile-setting-danger-btn"
                        onClick={handleCancelSubscription}
                      >
                        <FaTimes />
                        <span>Cancel Subscription</span>
                      </button>
                    )}
                    
                    {!subscriptionActive && (
                      <button 
                        className="profile-setting-action-btn"
                        onClick={() => navigate('/subscription')}
                      >
                        <FaCheck />
                        <span>Subscribe Now</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
/* UserProfile.css - Gamified User Profile */

:root {
  --profile-bg-dark: #0c0e14;
  --profile-bg-card: #171a23;
  --profile-accent: #b30000;
  --profile-accent-glow: #990000;
  --profile-accent-secondary: #990000;
  --profile-border: #000;
  --profile-text: #e2e2e2;
  --profile-text-secondary: #9da8b9;
  --profile-success: #2ebb77;
  --profile-error: #ff4e4e;
  --profile-warning: #ffc107;
  --profile-gradient-primary: #990000;
  --profile-gradient-secondary: linear-gradient(135deg, #ff4c8b, #ff7950);
  --profile-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  --profile-glow: 0 0 15px #990000;
}

/* Main container for the entire profile page */
.user-profile-container {
  font-family: 'Orbitron', 'Roboto', sans-serif;
  color: var(--profile-text);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
  background-color: var(--profile-bg-dark);
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(26, 20, 64, 0.4) 0%, transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(42, 26, 89, 0.3) 0%, transparent 40%),
    repeating-linear-gradient(rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 10px);
  position: relative;
}

/* This wrapper keeps all profile content centered */
.profile-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* =================== */
/* NOTIFICATION STYLES */
/* =================== */

.profile-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  padding: 15px 20px;
  border-radius: 8px;
  background: var(--profile-bg-card);
  border-left: 4px solid;
  box-shadow: var(--profile-shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 280px;
  max-width: 450px;
  animation: notification-slide-in 0.3s ease forwards;
}

@keyframes notification-slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.profile-notification-success {
  border-left-color: var(--profile-success);
}

.profile-notification-error {
  border-left-color: var(--profile-error);
}

.profile-notification span {
  font-size: 14px;
  flex-grow: 1;
}

.profile-notification-close {
  background: none;
  border: none;
  color: var(--profile-text-secondary);
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
  font-size: 16px;
  transition: color 0.2s;
}

.profile-notification-close:hover {
  color: var(--profile-text);
}

/* =================== */
/* HEADER SECTION      */
/* =================== */

.profile-header-section {
  background: var(--profile-bg-card);
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 25px;
  box-shadow: var(--profile-shadow);
  border: 1px solid var(--profile-border);
  position: relative;
  overflow: hidden;
}

.profile-header-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--profile-gradient-primary);
}

.profile-header-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
}

.profile-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--profile-accent);
  box-shadow: var(--profile-glow);
}

.profile-header-info {
  flex: 1;
  min-width: 250px;
}

.profile-username {
  font-size: 28px;
  margin: 0 0 10px 0;
  background: var(--profile-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  font-weight: 700;
}

.profile-level-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.profile-level-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--profile-gradient-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  box-shadow: var(--profile-glow);
  position: relative;
}

.profile-level-number {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.profile-level-icon {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--profile-bg-card);
  border-radius: 50%;
  padding: 3px;
  font-size: 12px;
  color: var(--profile-accent-glow);
}

.profile-xp-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.profile-xp-bar {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.profile-xp-progress {
  height: 100%;
  background: var(--profile-gradient-primary);
  border-radius: 5px;
  transition: width 0.5s ease;
}

.profile-xp-text {
  font-size: 12px;
  color: var(--profile-text-secondary);
  text-align: right;
}

.profile-stats {
  display: flex;
  gap: 20px;
}

.profile-stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.profile-stat-icon {
  color: var(--profile-accent);
  font-size: 16px;
}

.profile-stat-value {
  font-size: 16px;
  font-weight: 600;
}

.profile-actions {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.profile-logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--profile-border);
  color: var(--profile-text);
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
}

.profile-logout-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--profile-accent-secondary);
}

/* =================== */
/* NAVIGATION TABS     */
/* =================== */

.profile-tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 5px;
  scrollbar-width: thin;
  scrollbar-color: var(--profile-accent) var(--profile-bg-dark);
}

.profile-tabs::-webkit-scrollbar {
  height: 5px;
}

.profile-tabs::-webkit-scrollbar-track {
  background: var(--profile-bg-dark);
}

.profile-tabs::-webkit-scrollbar-thumb {
  background-color: var(--profile-accent);
  border-radius: 10px;
}

.profile-tab {
  padding: 12px 24px;
  background: var(--profile-bg-card);
  border: 1px solid var(--profile-border);
  border-radius: 8px;
  color: var(--profile-text-secondary);
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  min-width: max-content;
}

.profile-tab:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--profile-text);
}

.profile-tab.active {
  background: var(--profile-gradient-primary);
  color: white;
  box-shadow: var(--profile-glow);
  border-color: transparent;
}

/* =================== */
/* CONTENT SECTION     */
/* =================== */

.profile-content {
  min-height: 400px;
}

.profile-section-title {
  font-size: 20px;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--profile-border);
  color: var(--profile-text);
}

/* =================== */
/* OVERVIEW TAB        */
/* =================== */

.profile-overview-tab {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.profile-overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.profile-card {
  background: var(--profile-bg-card);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--profile-shadow);
  border: 1px solid var(--profile-border);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.profile-card-title {
  font-size: 18px;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--profile-border);
  color: var(--profile-text);
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-card-icon {
  color: var(--profile-accent);
}

.profile-card-content {
  flex-grow: 1;
}

.profile-detail-item {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-detail-label {
  color: var(--profile-text-secondary);
  font-size: 14px;
}

.profile-detail-value {
  font-weight: 500;
  font-size: 14px;
}

.profile-subscription-active {
  color: var(--profile-success);
  font-weight: 600;
}

.profile-subscription-inactive {
  color: var(--profile-text-secondary);
}

.profile-mini-achievements, 
.profile-mini-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-mini-achievement,
.profile-mini-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  transition: transform 0.2s, background 0.2s;
}

.profile-mini-achievement:hover,
.profile-mini-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.profile-mini-achievement-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.profile-mini-achievement-info {
  overflow: hidden;
}

.profile-mini-achievement-title {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-mini-item-image {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
}

.profile-mini-item-title {
  font-size: 14px;
  font-weight: 500;
}

.profile-view-more-btn {
  align-self: flex-end;
  background: none;
  border: none;
  color: var(--profile-accent);
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  padding: 5px;
  transition: color 0.2s;
}

.profile-view-more-btn:hover {
  color: var(--profile-accent-glow);
  text-decoration: underline;
}

.profile-empty-message {
  color: var(--profile-text-secondary);
  font-size: 14px;
  text-align: center;
  padding: 20px;
}

.profile-overview-stats {
  margin-top: 20px;
}

.profile-stats-card {
  background: var(--profile-bg-card);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--profile-shadow);
  border: 1px solid var(--profile-border);
}

.profile-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.profile-stat-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s;
}

.profile-stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.05);
}

.profile-stat-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
  color: var(--profile-text-secondary);
  font-size: 14px;
}

.profile-stat-header-icon {
  color: var(--profile-accent);
}

.profile-stat-number {
  font-size: 26px;
  font-weight: 700;
  background: var(--profile-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* =================== */
/* ACHIEVEMENTS TAB    */
/* =================== */

.profile-achievements-tab {
  padding: 10px;
}

.profile-achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.profile-achievement-card {
  background: var(--profile-bg-card);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  border: 1px solid var(--profile-border);
  transition: transform 0.2s, box-shadow 0.2s;
}

.profile-achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--profile-shadow), var(--profile-glow);
}

.profile-achievement-icon {
  font-size: 32px;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-achievement-emoji {
  font-size: 28px;
}

.profile-achievement-content {
  flex-grow: 1;
}

.profile-achievement-title {
  font-size: 16px;
  margin: 0 0 8px 0;
  font-weight: 600;
  color: var(--profile-text);
}

.profile-achievement-description {
  font-size: 14px;
  margin: 0;
  color: var(--profile-text-secondary);
  line-height: 1.4;
}

/* Empty state for no achievements */
.profile-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  gap: 15px;
  color: var(--profile-text-secondary);
}

.profile-empty-icon {
  font-size: 48px;
  opacity: 0.3;
}

.profile-empty-state p {
  margin: 0;
  font-size: 16px;
}

.profile-empty-state p:last-child {
  font-size: 14px;
  opacity: 0.7;
}

/* =================== */
/* ITEMS TAB           */
/* =================== */

.profile-items-tab {
  padding: 10px;
}

.profile-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.profile-item-card {
  background: var(--profile-bg-card);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--profile-border);
  transition: transform 0.2s, box-shadow 0.2s;
  gap: 15px;
}

.profile-item-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--profile-shadow), var(--profile-glow);
}

.profile-item-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
}

.profile-item-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.profile-item-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-item-title {
  font-size: 16px;
  margin: 0;
  font-weight: 600;
  color: var(--profile-text);
}

.profile-item-description {
  font-size: 14px;
  margin: 0;
  color: var(--profile-text-secondary);
}

.profile-item-status {
  margin-top: auto;
}

.profile-item-equipped {
  display: inline-block;
  background: var(--profile-gradient-primary);
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.profile-item-owned {
  display: inline-block;
  background: rgba(255, 255, 255, 0.05);
  color: var(--profile-text-secondary);
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
}

/* =================== */
/* SETTINGS TAB        */
/* =================== */

.profile-settings-tab {
  padding: 10px;
}

.profile-settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.profile-setting-card {
  background: var(--profile-bg-card);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--profile-shadow);
  border: 1px solid var(--profile-border);
}

.profile-setting-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--profile-border);
}

.profile-setting-icon {
  color: var(--profile-accent);
  font-size: 18px;
}

.profile-setting-title {
  font-size: 18px;
  margin: 0;
  color: var(--profile-text);
}

.profile-setting-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.profile-setting-current {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--profile-text-secondary);
  font-size: 14px;
  margin: 0;
}

.profile-setting-current span {
  color: var(--profile-text);
  font-weight: 500;
}

.profile-setting-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--profile-border);
  color: var(--profile-text);
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
}

.profile-setting-action-btn:hover {
  background: var(--profile-accent);
  color: white;
}

.profile-setting-danger-btn {
  color: var(--profile-error);
  border-color: rgba(255, 78, 78, 0.3);
}

.profile-setting-danger-btn:hover {
  background: var(--profile-error);
  color: white;
}

.profile-setting-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.profile-setting-input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.profile-setting-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--profile-border);
  border-radius: 8px;
  padding: 10px 15px;
  color: var(--profile-text);
  font-family: inherit;
  font-size: 14px;
  transition: border-color 0.2s;
}

.profile-setting-input:focus {
  outline: none;
  border-color: var(--profile-accent);
}

.profile-setting-password-field {
  position: relative;
  width: 100%;
}

.profile-setting-password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--profile-text-secondary);
  cursor: pointer;
  padding: 5px;
  font-size: 14px;
  transition: color 0.2s;
}

.profile-setting-password-toggle:hover {
  color: var(--profile-text);
}

.profile-password-requirements {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 10px;
  font-size: 12px;
}

.profile-setting-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.profile-setting-submit-btn,
.profile-setting-cancel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px 15px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;
}

.profile-setting-submit-btn {
  background: var(--profile-accent);
  color: white;
  border: none;
}

.profile-setting-submit-btn:hover {
  background: var(--profile-accent-glow);
}

.profile-setting-cancel-btn {
  background: transparent;
  color: var(--profile-text-secondary);
  border: 1px solid var(--profile-border);
}

.profile-setting-cancel-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--profile-text);
}

/* =================== */
/* SUBSCRIPTION STATUS */
/* =================== */

.subscription-active {
  color: var(--profile-success);
  font-weight: 600;
}

.subscription-inactive {
  color: var(--profile-error);
  font-weight: 600;
}

/* =================== */
/* RESPONSIVE STYLES   */
/* =================== */

/* Tablet styles */
@media (max-width: 992px) {
  .profile-wrapper {
    padding: 15px;
  }
  
  .profile-header-content {
    gap: 20px;
  }
  
  .profile-avatar {
    width: 100px;
    height: 100px;
  }
  
  .profile-username {
    font-size: 24px;
  }
  
  .profile-overview-cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .profile-achievements-grid,
  .profile-items-grid,
  .profile-settings-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .profile-wrapper {
    padding: 10px;
  }
  
  .profile-header-section {
    padding: 15px;
  }
  
  .profile-header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 15px;
  }
  
  .profile-header-info {
    width: 100%;
  }
  
  .profile-stats {
    justify-content: center;
  }
  
  .profile-level-container {
    flex-direction: column;
    gap: 10px;
  }
  
  .profile-actions {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
    align-items: center;
  }
  
  .profile-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .profile-tab {
    padding: 10px 15px;
    font-size: 13px;
    min-width: 80px;
    flex: 1;
  }
  
  .profile-overview-cards,
  .profile-achievements-grid,
  .profile-items-grid,
  .profile-settings-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .profile-detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .profile-setting-buttons {
    flex-direction: column;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .profile-username {
    font-size: 20px;
  }
  
  .profile-avatar {
    width: 80px;
    height: 80px;
  }
  
  .profile-notification {
    min-width: auto;
    left: 10px;
    right: 10px;
    max-width: none;
    font-size: 13px;
  }
  
  .profile-card-title,
  .profile-setting-title {
    font-size: 16px;
  }
  
  .profile-stats-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-section-title {
    font-size: 18px;
  }
  
  .profile-achievement-card {
    padding: 15px;
  }
  
  .profile-achievement-icon {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
  
  .profile-achievement-emoji {
    font-size: 22px;
  }
  
  .profile-mini-achievement,
  .profile-mini-item {
    padding: 8px;
  }
}

/* iPhone SE and other small devices */
@media (max-width: 375px) {
  .profile-wrapper {
    padding: 8px;
  }
  
  .profile-header-section {
    padding: 12px;
  }
  
  .profile-username {
    font-size: 18px;
  }
  
  .profile-avatar {
    width: 70px;
    height: 70px;
  }
  
  .profile-tab {
    padding: 8px 12px;
    font-size: 12px;
    min-width: 70px;
  }
  
  .profile-card {
    padding: 12px;
  }
  
  .profile-stat-number {
    font-size: 22px;
  }
  
  .profile-setting-input {
    padding: 8px 12px;
    font-size: 13px;
  }
}
// src/components/pages/store/LeaderboardPage.js
import React, { useEffect, useState, useRef, useCallback } from 'react';
import './LeaderboardPage.css';
import { 
  FaTrophy, 
  FaMedal, 
  FaStar, 
  FaCrown, 
  FaUserAlt,
  FaSearch,
  FaSyncAlt,
  FaChevronDown,
  FaAngleDoubleDown,
  FaExclamationTriangle,
  FaChevronUp,
  FaSpinner
} from 'react-icons/fa';

// Skeleton component for loading state
const SkeletonItem = ({ index }) => {
  return (
    <div className="leaderboard-item skeleton">
      <div className="leaderboard-rank">
        <div className="skeleton-pulse rank-number"></div>
      </div>
      <div className="leaderboard-avatar-container">
        <div className="skeleton-pulse avatar-circle"></div>
      </div>
      <div className="leaderboard-user-info">
        <div className="skeleton-pulse username-line"></div>
        <div className="leaderboard-user-stats">
          <div className="skeleton-pulse stat-line"></div>
          <div className="skeleton-pulse stat-line shorter"></div>
        </div>
      </div>
    </div>
  );
};

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50); // Load 50 at a time
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  // Reference to the leaderboard container for scrolling functionality
  const leaderboardRef = useRef(null);
  
  // Function to fetch leaderboard data
  const fetchLeaderboard = useCallback(async (skipCount = 0, replace = true) => {
    try {
      const url = `/api/test/leaderboard?skip=${skipCount}&limit=${limit}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to load leaderboard data');
      }
      
      const data = await response.json();
      
      if (replace) {
        setLeaders(data.data);
      } else {
        setLeaders(prev => [...prev, ...data.data]);
      }
      
      setTotal(data.total);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [limit]);

  // Initial data fetch
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      await fetchLeaderboard(skip);
      setLoading(false);
    };
    
    loadInitialData();
  }, [fetchLeaderboard, skip]);

  // Handle scroll event to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (leaderboardRef.current) {
        const { scrollTop } = leaderboardRef.current;
        setShowScrollToTop(scrollTop > 300);
      }
    };
    
    const currentRef = leaderboardRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Load more data
  const handleLoadMore = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    const newSkip = leaders.length;
    const data = await fetchLeaderboard(newSkip, false);
    setLoadingMore(false);
  };

  // Filter leaders by username
  const filteredLeaders = searchTerm.trim() === '' 
    ? leaders 
    : leaders.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Scroll to top function
  const scrollToTop = () => {
    if (leaderboardRef.current) {
      leaderboardRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Determine if we should show more results
  const hasMoreResults = leaders.length < total;

  // Render trophy icon based on rank
  const renderRankIcon = (rank) => {
    if (rank === 1) return <FaTrophy className="rank-icon gold" />;
    if (rank === 2) return <FaTrophy className="rank-icon silver" />;
    if (rank === 3) return <FaTrophy className="rank-icon bronze" />;
    if (rank <= 10) return <FaStar className="rank-icon top-ten" />;
    return null;
  };

  // Loading state with skeletons
  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div className="leaderboard-title">
            <h1>Leaderboard</h1>
            <p>See where you rank against other players!</p>
          </div>
        </div>
        
        <div className="leaderboard-content">
          <div className="leaderboard-loading">
            <FaSpinner className="loading-spinner" />
            <p>Loading leaderboard data...</p>
          </div>
          
          <div className="leaderboard-list">
            {Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonItem key={idx} index={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div className="leaderboard-title">
            <h1>Leaderboard</h1>
            <p>See where you rank against other players!</p>
          </div>
        </div>
        
        <div className="leaderboard-error">
          <FaExclamationTriangle className="error-icon" />
          <p>Error loading leaderboard: {error}</p>
          <button 
            className="leaderboard-retry-btn"
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchLeaderboard(0)
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
            }}
          >
            <FaSyncAlt /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main render - the leaderboard
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="leaderboard-title">
          <h1>Leaderboard</h1>
          <p>See where you rank against other players!</p>
        </div>
        
        <div className="leaderboard-stats">
          <div className="leaderboard-stat">
            <FaCrown className="leaderboard-stat-icon" />
            <div className="leaderboard-stat-text">
              <span className="leaderboard-stat-value">{total}</span>
              <span className="leaderboard-stat-label">Players</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="leaderboard-controls">
        <div className="leaderboard-search">
          <FaSearch className="search-icon" />
          <input 
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="leaderboard-search-input"
          />
          {searchTerm && (
            <button 
              className="leaderboard-search-clear"
              onClick={() => setSearchTerm('')}
            >
              &times;
            </button>
          )}
        </div>
      </div>
      
      <div className="leaderboard-content" ref={leaderboardRef}>
        {filteredLeaders.length === 0 ? (
          <div className="leaderboard-empty">
            <FaUserAlt className="empty-icon" />
            <p>No players found matching "{searchTerm}"</p>
            <button 
              className="leaderboard-reset-btn"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="leaderboard-list">
            {filteredLeaders.map((user) => {
              const rankClass = 
                user.rank === 1 ? 'gold-rank' : 
                user.rank === 2 ? 'silver-rank' : 
                user.rank === 3 ? 'bronze-rank' : 
                user.rank <= 10 ? 'top-rank' : '';
              
              return (
                <div key={user.rank} className={`leaderboard-item ${rankClass}`}>
                  <div className="leaderboard-rank">
                    <span className="rank-number">{user.rank}</span>
                    {renderRankIcon(user.rank)}
                  </div>
                  
                  <div className="leaderboard-avatar-container">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={`${user.username}'s avatar`}
                        className="leaderboard-avatar"
                      />
                    ) : (
                      <div className="leaderboard-avatar default">
                        <FaUserAlt />
                      </div>
                    )}
                  </div>
                  
                  <div className="leaderboard-user-info">
                    <h3 className="leaderboard-username">{user.username}</h3>
                    <div className="leaderboard-user-stats">
                      <div className="leaderboard-user-level">
                        <span className="level-label">Level</span>
                        <span className="level-value">{user.level}</span>
                      </div>
                      <div className="leaderboard-user-xp">
                        <span className="xp-label">XP</span>
                        <span className="xp-value">{user.xp.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {hasMoreResults && !searchTerm && (
              <div className="leaderboard-load-more">
                <button 
                  className="load-more-btn"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <FaSpinner className="loading-spinner" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <FaAngleDoubleDown />
                      <span>Load More</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
        
        {showScrollToTop && (
          <button 
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FaChevronUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
/* LeaderboardPage.css - Gamified Leaderboard */

:root {
  --leaderboard-bg-dark: #0b0c15;
  --leaderboard-bg-card: #171a23;
  --leaderboard-accent: #6543cc;
  --leaderboard-accent-glow: #8a58fc;
  --leaderboard-accent-secondary: #ff4c8b;
  --leaderboard-success: #2ebb77;
  --leaderboard-error: #ff4e4e;
  --leaderboard-warning: #ffc107;
  --leaderboard-text: #e2e2e2;
  --leaderboard-text-secondary: #9da8b9;
  --leaderboard-border: #2a2c3d;
  --leaderboard-input-bg: rgba(0, 0, 0, 0.2);
  --leaderboard-gradient-primary: linear-gradient(135deg, #6543cc, #8a58fc);
  --leaderboard-gradient-secondary: linear-gradient(135deg, #ff4c8b, #ff7950);
  --leaderboard-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  --leaderboard-glow: 0 0 15px rgba(134, 88, 252, 0.5);
  
  /* Rank colors */
  --rank-gold: #ffd700;
  --rank-silver: #c0c0c0;
  --rank-bronze: #cd7f32;
  --rank-top: #00ccff;
}

/* Main Container */
.leaderboard-container {
  font-family: 'Orbitron', 'Roboto', sans-serif;
  color: var(--leaderboard-text);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
  background-color: var(--leaderboard-bg-dark);
  background-image: 
    radial-gradient(circle at 15% 25%, rgba(26, 20, 64, 0.4) 0%, transparent 45%),
    radial-gradient(circle at 75% 65%, rgba(42, 26, 89, 0.3) 0%, transparent 40%),
    repeating-linear-gradient(rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 10px);
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

/* =================== */
/* HEADER SECTION      */
/* =================== */

.leaderboard-header {
  background: var(--leaderboard-bg-card);
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 25px;
  box-shadow: var(--leaderboard-shadow);
  border: 1px solid var(--leaderboard-border);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.leaderboard-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--leaderboard-gradient-primary);
}

.leaderboard-title {
  flex: 1;
  min-width: 250px;
}

.leaderboard-title h1 {
  font-size: 28px;
  margin: 0 0 10px 0;
  background: var(--leaderboard-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  font-weight: 700;
}

.leaderboard-title p {
  font-size: 16px;
  color: var(--leaderboard-text-secondary);
  margin: 0;
}

.leaderboard-stats {
  display: flex;
  gap: 20px;
}

.leaderboard-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--leaderboard-input-bg);
  border: 1px solid var(--leaderboard-border);
  border-radius: 10px;
  padding: 10px 15px;
}

.leaderboard-stat-icon {
  font-size: 24px;
  color: var(--rank-gold);
}

.leaderboard-stat-text {
  display: flex;
  flex-direction: column;
}

.leaderboard-stat-value {
  font-size: 18px;
  font-weight: 600;
}

.leaderboard-stat-label {
  font-size: 12px;
  color: var(--leaderboard-text-secondary);
}

/* =================== */
/* CONTROLS SECTION    */
/* =================== */

.leaderboard-controls {
  margin-bottom: 20px;
}

.leaderboard-search {
  position: relative;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--leaderboard-text-secondary);
}

.leaderboard-search-input {
  width: 100%;
  background: var(--leaderboard-bg-card);
  border: 1px solid var(--leaderboard-border);
  border-radius: 10px;
  padding: 12px 40px 12px 45px;
  color: var(--leaderboard-text);
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
}

.leaderboard-search-input:focus {
  outline: none;
  border-color: var(--leaderboard-accent);
  box-shadow: var(--leaderboard-glow);
}

.leaderboard-search-clear {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--leaderboard-text-secondary);
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

.leaderboard-search-clear:hover {
  color: var(--leaderboard-text);
}

/* =================== */
/* CONTENT SECTION     */
/* =================== */

.leaderboard-content {
  flex: 1;
  position: relative;
  max-height: calc(100vh - 220px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--leaderboard-accent) var(--leaderboard-bg-dark);
}

.leaderboard-content::-webkit-scrollbar {
  width: 8px;
}

.leaderboard-content::-webkit-scrollbar-track {
  background: var(--leaderboard-bg-dark);
  border-radius: 4px;
}

.leaderboard-content::-webkit-scrollbar-thumb {
  background-color: var(--leaderboard-accent);
  border-radius: 4px;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  background: var(--leaderboard-bg-card);
  border: 1px solid var(--leaderboard-border);
  border-radius: 12px;
  padding: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}

.leaderboard-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--leaderboard-shadow);
}

/* Special ranks styling */
.leaderboard-item.gold-rank {
  border-color: var(--rank-gold);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}

.leaderboard-item.gold-rank::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ffd700, #ffeb7a, #ffd700);
}

.leaderboard-item.silver-rank {
  border-color: var(--rank-silver);
  box-shadow: 0 0 15px rgba(192, 192, 192, 0.3);
}

.leaderboard-item.silver-rank::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #c0c0c0, #e6e6e6, #c0c0c0);
}

.leaderboard-item.bronze-rank {
  border-color: var(--rank-bronze);
  box-shadow: 0 0 15px rgba(205, 127, 50, 0.3);
}

.leaderboard-item.bronze-rank::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #cd7f32, #e8bb85, #cd7f32);
}

.leaderboard-item.top-rank {
  border-color: var(--rank-top);
}

.leaderboard-item.top-rank::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00ccff, #80e6ff, #00ccff);
}

.leaderboard-rank {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  position: relative;
}

.rank-number {
  font-size: 20px;
  font-weight: 700;
}

.leaderboard-item.gold-rank .rank-number {
  color: var(--rank-gold);
}

.leaderboard-item.silver-rank .rank-number {
  color: var(--rank-silver);
}

.leaderboard-item.bronze-rank .rank-number {
  color: var(--rank-bronze);
}

.leaderboard-item.top-rank .rank-number {
  color: var(--rank-top);
}

.rank-icon {
  margin-top: 5px;
  font-size: 16px;
}

.rank-icon.gold {
  color: var(--rank-gold);
}

.rank-icon.silver {
  color: var(--rank-silver);
}

.rank-icon.bronze {
  color: var(--rank-bronze);
}

.rank-icon.top-ten {
  color: var(--rank-top);
}

.leaderboard-avatar-container {
  margin: 0 15px;
}

.leaderboard-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid var(--leaderboard-border);
  object-fit: cover;
}

.leaderboard-avatar.default {
  background: var(--leaderboard-input-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--leaderboard-text-secondary);
  font-size: 24px;
}

.leaderboard-user-info {
  flex: 1;
  min-width: 0; /* Enable text truncation */
}

.leaderboard-username {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.leaderboard-item.gold-rank .leaderboard-username {
  color: var(--rank-gold);
}

.leaderboard-item.silver-rank .leaderboard-username {
  color: var(--rank-silver);
}

.leaderboard-item.bronze-rank .leaderboard-username {
  color: var(--rank-bronze);
}

.leaderboard-user-stats {
  display: flex;
  gap: 15px;
}

.leaderboard-user-level,
.leaderboard-user-xp {
  display: flex;
  align-items: center;
  gap: 8px;
}

.level-label,
.xp-label {
  color: var(--leaderboard-text-secondary);
  font-size: 13px;
}

.level-value,
.xp-value {
  font-weight: 600;
  font-size: 14px;
}

/* Load More Button */
.leaderboard-load-more {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.load-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--leaderboard-gradient-primary);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 25px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(101, 67, 204, 0.3);
}

.load-more-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(101, 67, 204, 0.4);
}

.load-more-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Scroll to Top Button */
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: var(--leaderboard-bg-card);
  border: 1px solid var(--leaderboard-border);
  color: var(--leaderboard-text);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: var(--leaderboard-shadow);
  transition: all 0.2s;
}

.scroll-to-top:hover {
  background: var(--leaderboard-accent);
  color: white;
  transform: translateY(-3px);
}

/* =================== */
/* EMPTY STATE         */
/* =================== */

.leaderboard-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: var(--leaderboard-bg-card);
  border: 1px solid var(--leaderboard-border);
  border-radius: 12px;
  gap: 15px;
  text-align: center;
}

.empty-icon {
  font-size: 40px;
  color: var(--leaderboard-text-secondary);
  opacity: 0.6;
}

.leaderboard-empty p {
  font-size: 18px;
  margin: 0;
  color: var(--leaderboard-text-secondary);
}

.leaderboard-reset-btn {
  background: var(--leaderboard-accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.leaderboard-reset-btn:hover {
  background: var(--leaderboard-accent-glow);
}

/* =================== */
/* LOADING STATE       */
/* =================== */

.leaderboard-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: var(--leaderboard-bg-card);
  border: 1px solid var(--leaderboard-border);
  border-radius: 12px;
  margin-bottom: 20px;
  gap: 15px;
}

.leaderboard-loading .loading-spinner {
  font-size: 40px;
  color: var(--leaderboard-accent);
}

.leaderboard-loading p {
  font-size: 18px;
  margin: 0;
  color: var(--leaderboard-text-secondary);
}

/* =================== */
/* ERROR STATE         */
/* =================== */

.leaderboard-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: var(--leaderboard-bg-card);
  border: 1px solid var(--leaderboard-error);
  border-radius: 12px;
  gap: 15px;
  text-align: center;
}

.error-icon {
  font-size: 40px;
  color: var(--leaderboard-error);
}

.leaderboard-error p {
  font-size: 18px;
  margin: 0;
  color: var(--leaderboard-text);
}

.leaderboard-retry-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--leaderboard-bg-dark);
  color: var(--leaderboard-text);
  border: 1px solid var(--leaderboard-border);
  border-radius: 8px;
  padding: 10px 20px;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.leaderboard-retry-btn:hover {
  background: var(--leaderboard-accent);
  color: white;
  border-color: transparent;
}

/* =================== */
/* SKELETON LOADERS    */
/* =================== */

.skeleton {
  position: relative;
  overflow: hidden;
}

.skeleton-pulse {
  background: linear-gradient(90deg, var(--leaderboard-input-bg) 0%, rgba(49, 49, 63, 0.5) 50%, var(--leaderboard-input-bg) 100%);
  background-size: 200% 100%;
  animation: pulse 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes pulse {
  0% { background-position: 0% 0%; }
  100% { background-position: -200% 0%; }
}

.rank-number.skeleton-pulse {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.avatar-circle.skeleton-pulse {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.username-line.skeleton-pulse {
  width: 150px;
  height: 18px;
  margin-bottom: 10px;
}

.stat-line.skeleton-pulse {
  width: 100px;
  height: 14px;
}

.stat-line.shorter.skeleton-pulse {
  width: 70px;
}

/* =================== */
/* RESPONSIVE STYLES   */
/* =================== */

/* Tablet Styles */
@media (max-width: 992px) {
  .leaderboard-container {
    padding: 15px;
  }
  
  .leaderboard-header {
    padding: 20px;
  }
  
  .leaderboard-title h1 {
    font-size: 24px;
  }
  
  .leaderboard-title p {
    font-size: 14px;
  }
  
  .leaderboard-stat {
    padding: 8px 12px;
  }
  
  .leaderboard-stat-icon {
    font-size: 20px;
  }
  
  .leaderboard-stat-value {
    font-size: 16px;
  }
  
  .leaderboard-content {
    max-height: calc(100vh - 200px);
  }
  
  .leaderboard-avatar {
    width: 50px;
    height: 50px;
  }
  
  .rank-number {
    font-size: 18px;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .leaderboard-container {
    padding: 10px;
  }
  
  .leaderboard-header {
    padding: 15px;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .leaderboard-title h1 {
    font-size: 22px;
  }
  
  .leaderboard-stats {
    width: 100%;
    justify-content: flex-start;
  }
  
  .leaderboard-item {
    padding: 12px;
  }
  
  .leaderboard-username {
    font-size: 15px;
  }
  
  .leaderboard-user-stats {
    flex-direction: column;
    gap: 5px;
  }
  
  .level-label,
  .xp-label,
  .level-value,
  .xp-value {
    font-size: 12px;
  }
  
  .load-more-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  .leaderboard-avatar-container {
    margin: 0 10px;
  }
  
  .leaderboard-avatar {
    width: 45px;
    height: 45px;
  }
}

/* Small Mobile Styles */
@media (max-width: 480px) {
  .leaderboard-title h1 {
    font-size: 20px;
  }
  
  .leaderboard-title p {
    font-size: 12px;
  }
  
  .leaderboard-rank {
    min-width: 30px;
  }
  
  .rank-number {
    font-size: 16px;
  }
  
  .rank-icon {
    font-size: 14px;
  }
  
  .leaderboard-avatar {
    width: 40px;
    height: 40px;
  }
  
  .leaderboard-username {
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .load-more-btn {
    width: 100%;
  }
  
  .leaderboard-avatar-container {
    margin: 0 8px;
  }
  
  .leaderboard-search-input {
    padding: 10px 35px 10px 35px;
    font-size: 13px;
  }
  
  .leaderboard-empty p,
  .leaderboard-loading p,
  .leaderboard-error p {
    font-size: 15px;
  }
}

/* iPhone SE and other small devices */
@media (max-width: 375px) {
  .leaderboard-rank {
    min-width: 25px;
  }
  
  .rank-number {
    font-size: 14px;
  }
  
  .rank-icon {
    font-size: 12px;
  }
  
  .leaderboard-avatar {
    width: 35px;
    height: 35px;
    border-width: 1px;
  }
  
  .leaderboard-username {
    font-size: 13px;
  }
  
  .level-label,
  .xp-label,
  .level-value,
  .xp-value {
    font-size: 11px;
  }
}
// src/components/pages/store/AchievementPage.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAchievements } from '../store/achievementsSlice';
import { 
  FaTrophy, 
  FaMedal, 
  FaStar, 
  FaCrown, 
  FaBolt, 
  FaBook, 
  FaBrain, 
  FaCheckCircle, 
  FaMagic,
  FaFilter,
  FaTimes,
  FaCoins,
  FaLevelUpAlt,
  FaCheck,
  FaLock,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaSyncAlt
} from 'react-icons/fa';
import { showAchievementToast } from './AchievementToast';
import './AchievementPage.css';

// Mapping achievement IDs to icon components.
const iconMapping = {
  "test_rookie": FaTrophy,
  "accuracy_king": FaMedal,
  "bronze_grinder": FaBook,
  "silver_scholar": FaStar,
  "gold_god": FaCrown,
  "platinum_pro": FaMagic,
  "walking_encyclopedia": FaBrain,
  "redemption_arc": FaBolt,
  "coin_collector_5000": FaBook,
  "coin_hoarder_10000": FaBook,
  "coin_tycoon_50000": FaBook,
  "perfectionist_1": FaCheckCircle,
  "double_trouble_2": FaCheckCircle,
  "error404_failure_not_found": FaCheckCircle,
  "level_up_5": FaTrophy,
  "mid_tier_grinder_25": FaMedal,
  "elite_scholar_50": FaStar,
  "ultimate_master_100": FaCrown,
  "answer_machine_1000": FaBook,
  "knowledge_beast_5000": FaBrain,
  "question_terminator": FaBrain,
  "test_finisher": FaCheckCircle,
};

// Mapping achievement IDs to colors.
const colorMapping = {
  "test_rookie": "#ff5555",
  "accuracy_king": "#ffa500",
  "bronze_grinder": "#cd7f32",
  "silver_scholar": "#c0c0c0",
  "gold_god": "#ffd700",
  "platinum_pro": "#e5e4e2",
  "walking_encyclopedia": "#00fa9a",
  "redemption_arc": "#ff4500",
  "coin_collector_5000": "#ff69b4",
  "coin_hoarder_10000": "#ff1493",
  "coin_tycoon_50000": "#ff0000",
  "perfectionist_1": "#adff2f",
  "double_trouble_2": "#7fff00",
  "error404_failure_not_found": "#00ffff",
  "level_up_5": "#f08080",
  "mid_tier_grinder_25": "#ff8c00",
  "elite_scholar_50": "#ffd700",
  "ultimate_master_100": "#ff4500",
  "answer_machine_1000": "#ff69b4",
  "knowledge_beast_5000": "#00fa9a",
  "question_terminator": "#ff1493",
  "test_finisher": "#adff2f",
};

// Achievement categories
const categories = {
  "test": "Test Completion",
  "score": "Score & Accuracy",
  "coins": "Coin Collection",
  "level": "Leveling Up",
  "questions": "Question Mastery",
  "all": "All Achievements"
};

// Function to determine the category of an achievement
const getAchievementCategory = (achievementId) => {
  if (achievementId.includes('level') || achievementId.includes('grinder') || 
      achievementId.includes('scholar') || achievementId.includes('master')) {
    return "level";
  } else if (achievementId.includes('coin')) {
    return "coins";
  } else if (achievementId.includes('accuracy') || achievementId.includes('perfectionist') || 
             achievementId.includes('redemption')) {
    return "score";
  } else if (achievementId.includes('answer') || achievementId.includes('question') || 
             achievementId.includes('encyclopedia')) {
    return "questions";
  } else if (achievementId.includes('rookie') || achievementId.includes('test') || 
             achievementId.includes('trouble')) {
    return "test";
  }
  return "all";
};

const AchievementPage = () => {
  const dispatch = useDispatch();
  const achievements = useSelector((state) => state.achievements.all);
  const userAchievements = useSelector((state) => state.user.achievements) || [];
  const { username, level, xp } = useSelector((state) => state.user);
  const loadingStatus = useSelector((state) => state.achievements.status);

  // State for filtering and sorting
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);
  const [showOnlyLocked, setShowOnlyLocked] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState({});
  const [sortBy, setSortBy] = useState('default'); // default, name, unlocked
  
  // State for tracking achievement stats
  const [totalAchievements, setTotalAchievements] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState(0);
  const [percentComplete, setPercentComplete] = useState(0);

  useEffect(() => {
    if (!achievements || achievements.length === 0) {
      dispatch(fetchAchievements());
    }
  }, [dispatch, achievements]);

  useEffect(() => {
    if (achievements && achievements.length > 0) {
      setTotalAchievements(achievements.length);
      setUnlockedAchievements(userAchievements.length);
      setPercentComplete((userAchievements.length / achievements.length) * 100);
    }
  }, [achievements, userAchievements]);

  // Filter achievements based on selected criteria
  const filteredAchievements = achievements.filter(achievement => {
    // Category filter
    const categoryMatch = activeCategory === 'all' || 
                        getAchievementCategory(achievement.achievementId) === activeCategory;
    
    // Unlock status filter
    const isUnlocked = userAchievements.includes(achievement.achievementId);
    const statusMatch = (showOnlyUnlocked && isUnlocked) || 
                      (showOnlyLocked && !isUnlocked) || 
                      (!showOnlyUnlocked && !showOnlyLocked);
    
    // Search filter
    const searchMatch = !searchTerm || 
                      achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && statusMatch && searchMatch;
  });

  // Sort achievements
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    const aUnlocked = userAchievements.includes(a.achievementId);
    const bUnlocked = userAchievements.includes(b.achievementId);
    
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'unlocked') {
      return bUnlocked - aUnlocked; // Show unlocked first
    } else if (sortBy === 'locked') {
      return aUnlocked - bUnlocked; // Show locked first
    }
    
    // Default sorting
    return 0;
  });

  const toggleDetails = (achievementId) => {
    setDetailsOpen(prev => ({
      ...prev,
      [achievementId]: !prev[achievementId]
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory('all');
    setSearchTerm('');
    setShowOnlyUnlocked(false);
    setShowOnlyLocked(false);
    setSortBy('default');
  };

  // This function remains if you ever want to trigger a test popup programmatically
  const testPopup = (achievementId) => {
    const achievement = achievements.find((ach) => ach.achievementId === achievementId);
    if (achievement) {
      const IconComponent = iconMapping[achievement.achievementId] || null;
      const color = colorMapping[achievement.achievementId] || "#fff";
      showAchievementToast({
        title: achievement.title,
        description: achievement.description,
        icon: IconComponent ? <IconComponent /> : null,
        color: color
      });
    }
  };

  return (
    <div className="achievement-page-container">
      {/* Header Section with Stats */}
      <div className="achievement-header">
        <div className="achievement-header-content">
          <div className="achievement-header-titles">
            <h1>Achievement Gallery</h1>
            <p>Track your progress and unlock achievements as you master the platform!</p>
          </div>
          
          {username && (
            <div className="achievement-player-stats">
              <div className="achievement-player-name">
                <span>{username}'s Progress</span>
              </div>
              <div className="achievement-progress-container">
                <div className="achievement-progress-stats">
                  <div className="achievement-stat">
                    <FaTrophy className="achievement-stat-icon" />
                    <div className="achievement-stat-numbers">
                      <span className="achievement-stat-value">{unlockedAchievements} / {totalAchievements}</span>
                      <span className="achievement-stat-label">Achievements</span>
                    </div>
                  </div>
                  <div className="achievement-stat">
                    <FaLevelUpAlt className="achievement-stat-icon" />
                    <div className="achievement-stat-numbers">
                      <span className="achievement-stat-value">{level}</span>
                      <span className="achievement-stat-label">Level</span>
                    </div>
                  </div>
                </div>
                <div className="achievement-progress-bar-container">
                  <div className="achievement-progress-bar">
                    <div 
                      className="achievement-progress-fill" 
                      style={{ width: `${percentComplete}%` }}
                    ></div>
                  </div>
                  <span className="achievement-progress-percent">{Math.round(percentComplete)}% Complete</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="achievement-controls">
        <div className="achievement-categories">
          {Object.entries(categories).map(([key, value]) => (
            <button
              key={key}
              className={`achievement-category-btn ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {value}
            </button>
          ))}
        </div>
        
        <div className="achievement-filters">
          <div className="achievement-search">
            <FaSearch className="achievement-search-icon" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="achievement-search-input"
            />
            {searchTerm && (
              <button 
                className="achievement-search-clear" 
                onClick={() => setSearchTerm('')}
              >
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="achievement-filter-options">
            <button 
              className={`achievement-filter-btn ${showOnlyUnlocked ? 'active' : ''}`}
              onClick={() => {
                setShowOnlyUnlocked(!showOnlyUnlocked);
                setShowOnlyLocked(false);
              }}
            >
              <FaCheck />
              <span>Unlocked</span>
            </button>
            
            <button 
              className={`achievement-filter-btn ${showOnlyLocked ? 'active' : ''}`}
              onClick={() => {
                setShowOnlyLocked(!showOnlyLocked);
                setShowOnlyUnlocked(false);
              }}
            >
              <FaLock />
              <span>Locked</span>
            </button>
            
            <div className="achievement-sort-dropdown">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="achievement-sort-select"
              >
                <option value="default">Default Sort</option>
                <option value="name">Sort by Name</option>
                <option value="unlocked">Unlocked First</option>
                <option value="locked">Locked First</option>
              </select>
            </div>
            
            <button 
              className="achievement-filter-reset" 
              onClick={resetFilters}
              title="Reset all filters"
            >
              <FaSyncAlt />
            </button>
          </div>
        </div>
      </div>

      {/* Main Achievement Grid */}
      {loadingStatus === 'loading' ? (
        <div className="achievement-loading">
          <FaSyncAlt className="achievement-loading-icon" />
          <p>Loading achievements...</p>
        </div>
      ) : sortedAchievements.length > 0 ? (
        <div className="achievement-grid">
          {sortedAchievements.map((ach) => {
            const isUnlocked = userAchievements.includes(ach.achievementId);
            const IconComponent = iconMapping[ach.achievementId] || FaTrophy;
            const iconColor = colorMapping[ach.achievementId] || "#ffffff";
            const isDetailsOpen = detailsOpen[ach.achievementId] || false;
            
            return (
              <div
                key={ach.achievementId}
                className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                onClick={() => toggleDetails(ach.achievementId)}
              >
                <div className="achievement-card-content">
                  <div className="achievement-icon-container">
                    <div className="achievement-icon" style={{ color: iconColor }}>
                      <IconComponent />
                    </div>
                    {isUnlocked && <div className="achievement-completed-badge"><FaCheck /></div>}
                  </div>
                  
                  <div className="achievement-info">
                    <h3 className="achievement-title">{ach.title}</h3>
                    <p className="achievement-description">{ach.description}</p>
                  </div>
                  
                  <button 
                    className="achievement-details-toggle"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDetails(ach.achievementId);
                    }}
                  >
                    {isDetailsOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                
                {isDetailsOpen && (
                  <div className="achievement-details">
                    <div className="achievement-details-content">
                      <div className="achievement-details-header">
                        <FaInfoCircle className="achievement-details-icon" />
                        <h4>Achievement Details</h4>
                      </div>
                      
                      <div className="achievement-details-info">
                        <div className="achievement-details-item">
                          <span className="achievement-details-label">Category:</span>
                          <span className="achievement-details-value">
                            {categories[getAchievementCategory(ach.achievementId)]}
                          </span>
                        </div>
                        
                        <div className="achievement-details-item">
                          <span className="achievement-details-label">Status:</span>
                          <span className={`achievement-details-value ${isUnlocked ? 'unlocked' : 'locked'}`}>
                            {isUnlocked ? 'Unlocked' : 'Locked'}
                          </span>
                        </div>
                        
                        {/* Add more achievement details as needed */}
                      </div>
                    </div>
                  </div>
                )}
                
                {!isUnlocked && (
                  <div className="achievement-locked-overlay">
                    <FaLock className="achievement-locked-icon" />
                    <span>Locked</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="achievement-empty">
          <FaFilter className="achievement-empty-icon" />
          <p>No achievements match your current filters.</p>
          <button className="achievement-reset-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
/* AchievementPage.css - Gamified Achievement Page */

:root {
  --achievement-bg-dark: #0b0c15;
  --achievement-bg-card: #171a23;
  --achievement-accent: #6543cc;
  --achievement-accent-glow: #8a58fc;
  --achievement-accent-secondary: #ff4c8b;
  --achievement-success: #2ebb77;
  --achievement-error: #ff4e4e;
  --achievement-warning: #ffc107;
  --achievement-text: #e2e2e2;
  --achievement-text-secondary: #9da8b9;
  --achievement-border: #2a2c3d;
  --achievement-input-bg: rgba(0, 0, 0, 0.2);
  --achievement-gradient-primary: linear-gradient(135deg, #6543cc, #8a58fc);
  --achievement-gradient-secondary: linear-gradient(135deg, #ff4c8b, #ff7950);
  --achievement-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  --achievement-glow: 0 0 15px rgba(134, 88, 252, 0.5);
}

/* Main Container */
.achievement-page-container {
  font-family: 'Orbitron', 'Roboto', sans-serif;
  color: var(--achievement-text);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
  background-color: var(--achievement-bg-dark);
  background-image: 
    radial-gradient(circle at 15% 25%, rgba(26, 20, 64, 0.4) 0%, transparent 45%),
    radial-gradient(circle at 75% 65%, rgba(42, 26, 89, 0.3) 0%, transparent 40%),
    repeating-linear-gradient(rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 10px);
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

/* =================== */
/* HEADER SECTION      */
/* =================== */

.achievement-header {
  background: var(--achievement-bg-card);
  border-radius: 15px;
  margin-bottom: 30px;
  padding: 25px;
  box-shadow: var(--achievement-shadow);
  border: 1px solid var(--achievement-border);
  position: relative;
  overflow: hidden;
}

.achievement-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--achievement-gradient-primary);
}

.achievement-header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
}

.achievement-header-titles {
  flex: 1;
  min-width: 300px;
}

.achievement-header-titles h1 {
  font-size: 28px;
  margin: 0 0 10px 0;
  background: var(--achievement-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  font-weight: 700;
}

.achievement-header-titles p {
  font-size: 16px;
  color: var(--achievement-text-secondary);
  margin: 0;
}

.achievement-player-stats {
  min-width: 300px;
  flex: 1;
  background: var(--achievement-input-bg);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid var(--achievement-border);
}

.achievement-player-name {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.achievement-progress-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.achievement-progress-stats {
  display: flex;
  justify-content: space-around;
}

.achievement-stat {
  display: flex;
  align-items: center;
  gap: 10px;
}

.achievement-stat-icon {
  font-size: 24px;
  color: var(--achievement-accent);
}

.achievement-stat-numbers {
  display: flex;
  flex-direction: column;
}

.achievement-stat-value {
  font-size: 18px;
  font-weight: 600;
}

.achievement-stat-label {
  font-size: 12px;
  color: var(--achievement-text-secondary);
}

.achievement-progress-bar-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.achievement-progress-bar {
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.achievement-progress-fill {
  height: 100%;
  background: var(--achievement-gradient-secondary);
  transition: width 1s ease;
}

.achievement-progress-percent {
  font-size: 12px;
  text-align: right;
  color: var(--achievement-text-secondary);
}

/* =================== */
/* CONTROLS SECTION    */
/* =================== */

.achievement-controls {
  margin-bottom: 30px;
}

.achievement-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 5px;
  scrollbar-width: thin;
  scrollbar-color: var(--achievement-accent) var(--achievement-bg-dark);
}

.achievement-categories::-webkit-scrollbar {
  height: 5px;
}

.achievement-categories::-webkit-scrollbar-track {
  background: var(--achievement-bg-dark);
}

.achievement-categories::-webkit-scrollbar-thumb {
  background-color: var(--achievement-accent);
  border-radius: 10px;
}

.achievement-category-btn {
  background: var(--achievement-bg-card);
  border: 1px solid var(--achievement-border);
  color: var(--achievement-text-secondary);
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  min-width: max-content;
}

.achievement-category-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--achievement-text);
}

.achievement-category-btn.active {
  background: var(--achievement-gradient-primary);
  color: white;
  border-color: transparent;
  box-shadow: var(--achievement-glow);
}

.achievement-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.achievement-search {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.achievement-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--achievement-text-secondary);
  font-size: 16px;
}

.achievement-search-input {
  background: var(--achievement-input-bg);
  border: 1px solid var(--achievement-border);
  border-radius: 8px;
  padding: 12px 40px 12px 40px;
  color: var(--achievement-text);
  font-family: inherit;
  font-size: 14px;
  width: 100%;
  transition: border-color 0.2s;
}

.achievement-search-input:focus {
  outline: none;
  border-color: var(--achievement-accent);
}

.achievement-search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--achievement-text-secondary);
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  transition: color 0.2s;
}

.achievement-search-clear:hover {
  color: var(--achievement-text);
}

.achievement-filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.achievement-filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--achievement-bg-card);
  border: 1px solid var(--achievement-border);
  color: var(--achievement-text-secondary);
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
}

.achievement-filter-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--achievement-text);
}

.achievement-filter-btn.active {
  background: var(--achievement-accent);
  color: white;
  border-color: transparent;
}

.achievement-sort-dropdown select {
  background: var(--achievement-bg-card);
  border: 1px solid var(--achievement-border);
  color: var(--achievement-text);
  padding: 10px 15px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239da8b9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  padding-right: 30px;
  min-width: 160px;
}

.achievement-sort-dropdown select:focus {
  outline: none;
  border-color: var(--achievement-accent);
}

.achievement-filter-reset {
  background: var(--achievement-bg-card);
  border: 1px solid var(--achievement-border);
  color: var(--achievement-text-secondary);
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.achievement-filter-reset:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--achievement-text);
}

/* =================== */
/* GRID SECTION        */
/* =================== */

.achievement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.achievement-card {
  position: relative;
  background: var(--achievement-bg-card);
  border-radius: 12px;
  border: 1px solid var(--achievement-border);
  overflow: hidden;
  box-shadow: var(--achievement-shadow);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--achievement-shadow), var(--achievement-glow);
}

.achievement-card.unlocked {
  border-color: var(--achievement-accent);
}

.achievement-card.unlocked::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--achievement-gradient-primary);
}

.achievement-card-content {
  display: flex;
  padding: 20px;
  gap: 15px;
}

.achievement-icon-container {
  position: relative;
  min-width: 50px;
}

.achievement-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.achievement-completed-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: var(--achievement-success);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  border: 2px solid var(--achievement-bg-card);
}

.achievement-info {
  flex: 1;
  min-width: 0; /* For text truncation to work */
}

.achievement-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--achievement-text);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.achievement-description {
  font-size: 14px;
  color: var(--achievement-text-secondary);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.achievement-details-toggle {
  background: none;
  border: none;
  color: var(--achievement-text-secondary);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: color 0.2s;
}

.achievement-details-toggle:hover {
  color: var(--achievement-text);
}

.achievement-details {
  background: var(--achievement-input-bg);
  border-top: 1px solid var(--achievement-border);
  padding: 15px 20px;
}

.achievement-details-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.achievement-details-icon {
  color: var(--achievement-accent);
  font-size: 16px;
}

.achievement-details-header h4 {
  font-size: 14px;
  margin: 0;
}

.achievement-details-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.achievement-details-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.achievement-details-label {
  font-size: 12px;
  color: var(--achievement-text-secondary);
}

.achievement-details-value {
  font-size: 12px;
  font-weight: 500;
}

.achievement-details-value.unlocked {
  color: var(--achievement-success);
}

.achievement-details-value.locked {
  color: var(--achievement-text-secondary);
}

.achievement-locked-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.achievement-locked-icon {
  font-size: 24px;
  color: var(--achievement-text);
  margin-bottom: 5px;
}

/* =================== */
/* LOADING & EMPTY     */
/* =================== */

.achievement-loading,
.achievement-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: var(--achievement-bg-card);
  border-radius: 12px;
  border: 1px solid var(--achievement-border);
  box-shadow: var(--achievement-shadow);
  margin-top: 20px;
  gap: 15px;
}

.achievement-loading-icon,
.achievement-empty-icon {
  font-size: 40px;
  color: var(--achievement-accent);
  margin-bottom: 15px;
}

.achievement-loading-icon {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.achievement-loading p,
.achievement-empty p {
  font-size: 18px;
  color: var(--achievement-text-secondary);
  margin: 0;
}

.achievement-reset-btn {
  background: var(--achievement-accent);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  transition: background 0.2s;
}

.achievement-reset-btn:hover {
  background: var(--achievement-accent-glow);
}

/* =================== */
/* RESPONSIVE STYLES   */
/* =================== */

/* Tablet Styles */
@media (max-width: 992px) {
  .achievement-page-container {
    padding: 15px;
  }
  
  .achievement-header {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .achievement-header-titles h1 {
    font-size: 24px;
  }
  
  .achievement-header-titles p {
    font-size: 14px;
  }
  
  .achievement-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
  }
  
  .achievement-card-content {
    padding: 15px;
  }
  
  .achievement-category-btn {
    padding: 8px 15px;
    font-size: 13px;
  }
  
  .achievement-filter-btn {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .achievement-sort-dropdown select {
    padding: 8px 12px;
    font-size: 13px;
    min-width: 140px;
  }
  
  .achievement-filter-reset {
    width: 34px;
    height: 34px;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .achievement-page-container {
    padding: 10px;
  }
  
  .achievement-header {
    padding: 15px;
    margin-bottom: 15px;
  }
  
  .achievement-header-content {
    flex-direction: column;
  }
  
  .achievement-header-titles h1 {
    font-size: 22px;
    text-align: center;
  }
  
  .achievement-header-titles p {
    font-size: 13px;
    text-align: center;
  }
  
  .achievement-player-stats {
    width: 100%;
  }
  
  .achievement-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .achievement-controls {
    margin-bottom: 20px;
  }
  
  .achievement-filter-options {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
  
  .achievement-sort-dropdown,
  .achievement-search {
    width: 100%;
  }
  
  .achievement-sort-dropdown select {
    width: 100%;
  }
  
  .achievement-filter-btn {
    justify-content: center;
  }
  
  .achievement-filter-reset {
    align-self: center;
  }
  
  .achievement-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .achievement-title {
    font-size: 15px;
  }
  
  .achievement-description {
    font-size: 13px;
  }
}

/* Small Mobile Styles */
@media (max-width: 480px) {
  .achievement-header-titles h1 {
    font-size: 20px;
  }
  
  .achievement-header-titles p {
    font-size: 12px;
  }
  
  .achievement-stat-icon {
    font-size: 20px;
  }
  
  .achievement-stat-value {
    font-size: 16px;
  }
  
  .achievement-search-input {
    padding: 10px 35px 10px 35px;
    font-size: 13px;
  }
  
  .achievement-card-content {
    padding: 12px;
    gap: 12px;
  }
  
  .achievement-details {
    padding: 12px 15px;
  }
  
  .achievement-details-header h4 {
    font-size: 13px;
  }
  
  .achievement-details-label,
  .achievement-details-value {
    font-size: 11px;
  }
  
  .achievement-loading p,
  .achievement-empty p {
    font-size: 16px;
  }
}

/* iPhone SE and other small devices */
@media (max-width: 375px) {
  .achievement-header-titles h1 {
    font-size: 18px;
  }
  
  .achievement-player-name {
    font-size: 16px;
  }
  
  .achievement-stat-value {
    font-size: 14px;
  }
  
  .achievement-stat-label {
    font-size: 11px;
  }
  
  .achievement-category-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .achievement-icon {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
  
  .achievement-title {
    font-size: 14px;
  }
  
  .achievement-description {
    font-size: 12px;
  }
}
export default AchievementPage;

aalso heres oem conext for what my revious designer has been doing ( provided an emaple of some of the pages teh designer did perviously, of he page it id which was teh userpofile, and shop page, it did other pages aswell but provided two examples
modern, gamified experience
# Comprehensive Project Summary: Gamified UI Component Redesign

## Design Approach Overview
We created a cohesive, modern, gamified UI design system for multiple components of your application, maintaining functionality while significantly enhancing visual appeal. The design follows a dark-themed, neon-accented gaming aesthetic with consistent styling across all components.

## Core Design Elements
- **Color Scheme**: Dark backgrounds (#0b0c15, #171a23) with purple/pink accent gradients
- **Typography**: 'Orbitron' font for headings, modern sans-serif for content
- **Visual Effects**: Subtle glows, shadows, hover animations, and micro-interactions
- **Layout**: Card-based designs with clear content hierarchy
- **Interactions**: Animated transitions, feedback indicators, and interactive elements

## Components Redesigned
1. **User Profile** - Complete redesign with tabbed interface, level display, and achievement showcases
2. **Daily Station** - Gamified daily rewards center with animations and clear countdowns
3. **Achievement Page** - Interactive achievement gallery with filtering capabilities
4. **Leaderboard** - Enhanced leaderboard with rank styling and optimized performance
5. **Shop Page** - Modern storefront with preview features and intuitive purchase flow
6. **Sidebar** - Refined navigation with better mobile experience and less intrusive toggle

## Technical Implementation
- Used CSS variables for consistency and maintainability
- Created responsive designs for all screen sizes including iPhone SE
- Organized class naming to avoid conflicts with other components
- Added performance optimizations for smoother animations
- Implemented accessibility improvements for better usability

## Component-Specific Enhancements

### User Profile
- Tabbed interface (Overview, Achievements, Items, Settings)
- XP progress visualization with level badge
- Modernized forms for username/email/password changes
- Organized display of achievements and purchased items

### Daily Station
- Countdown visualizations for bonus and questions
- Animated reward celebrations
- Redesigned question interface with better feedback
- Clear visual states for available/claimed rewards

### Achievement Gallery
- Filtering system by category and completion status
- Interactive cards with expandable details
- Progress tracking with completion percentage
- Search functionality and sorting options

### Leaderboard
- Special styling for top ranks (gold, silver, bronze)
- Optimized loading with skeleton placeholders
- Virtualized scrolling for better performance
- User search functionality

### Shop Page
- Tabbed navigation between item categories
- Avatar preview functionality
- Clear visual indicators for item requirements
- Enhanced purchase and equip flow

### Sidebar
- Improved toggle button to prevent content overlap
- Enhanced navigation with icons and better hover states
- Smoother animations for collapsible sections
- Maintained original logo and core functionality

## Implementation Approach
We created each component with:
1. A React component (JS/JSX) with proper state management
2. A corresponding CSS file with responsive styling
3. Attention to all screen sizes and device types
4. Performance considerations for animations and transitions


ok so the above text is what deisgned ravamping we are doing.

**************WHAT WE NEED TO DESIGN HERE***********************


**********FILES HERE*********************


