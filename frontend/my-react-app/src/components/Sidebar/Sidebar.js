// components/Sidebar/Sidebar.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import sidebarLogo from './sidebarlogo.png'; // Adjust path if necessary
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);       // Overall sidebar collapsed state
  const [toolsOpen, setToolsOpen] = useState(false);        // For the Tools group
  const [practiceTestsOpen, setPracticeTestsOpen] = useState(false); // For the Practice Tests group

  const navigate = useNavigate();

  // Toggle entire sidebar collapse
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Toggle Tools group collapse
  const toggleTools = () => {
    setToolsOpen(!toolsOpen);
  };

  // Toggle Practice Tests group collapse
  const togglePracticeTests = () => {
    setPracticeTestsOpen(!practiceTestsOpen);
  };

  // Double-click on title for easter egg (Portfolio)
  const handleRootDoubleClick = () => {
    navigate('/easteregg');
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {collapsed ? '☰' : '✖'}
      </button>

      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <h2 className="sidebar-title" onDoubleClick={handleRootDoubleClick}>
          root@
        </h2>

        <ul className="sidebar-list">
          {/* Top-level links: Profile and Shop */}
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>
              /Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) => isActive ? 'active-link' : ''}>
              /Shop
            </NavLink>
          </li>

          {/* Tools group: Contains several tool pages */}
          <li className="sidebar-group">
            <div
              className="group-header"
              onClick={toggleTools}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') toggleTools(); }}
            >
              <span>/Tools</span>
              {toolsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {toolsOpen && (
              <ul className="group-sublist">
                <li>
                  <NavLink to="/xploitcraft" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Xploitcraft
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/scenariosphere" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Scenario Sphere
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/analogyhub" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Analogy Hub
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/log" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Log Analysis
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/grc" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    GRC Wizard
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Daily CyberBrief (remains separate) */}
          <li>
            <NavLink to="/dailycyberbrief" className={({ isActive }) => isActive ? 'active-link' : ''}>
              /Daily CyberBrief
            </NavLink>
          </li>

          {/* Study Resources (remains separate) */}
          <li>
            <NavLink to="/resources" className={({ isActive }) => isActive ? 'active-link' : ''}>
              /Study Resources
            </NavLink>
          </li>

          {/* Practice Tests group */}
          <li className="sidebar-group">
            <div
              className="group-header"
              onClick={togglePracticeTests}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') togglePracticeTests(); }}
            >
              <span>/Practice Tests</span>
              {practiceTestsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {practiceTestsOpen && (
              <ul className="group-sublist">
                <li>
                  <NavLink to="/practice-tests/a-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    A+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/network-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Network+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/security-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Security+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/cysa-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    CySa+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/pentest-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Pentest+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/casp" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    CASP+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/linux" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Linux+
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <div className="sidebar-logo-container">
          <img src={sidebarLogo} alt="Sidebar Logo" className="sidebar-logo" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;

