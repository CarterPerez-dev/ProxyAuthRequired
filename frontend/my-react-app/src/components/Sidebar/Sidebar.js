// src/components/Sidebar/Sidebar.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import sidebarLogo from './sidebarlogo.png'; // Adjust path if necessary
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true); // Overall sidebar collapsed state
  const [toolsOpen, setToolsOpen] = useState(false); // For the Tools group
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

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {collapsed ? '☰' : '✖'}
      </button>

      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <h2 className="sidebar-title">
          root@
        </h2>

        <ul className="sidebar-list">
          {/* Top-level links: Profile, Achievements, and Shop */}
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>
              /Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/achievements" className={({ isActive }) => isActive ? 'active-link' : ''}>
              /Achievements
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) => isActive ? 'active-link' : ''}>
              /Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" className={({ isActive }) => isActive ? 'active-link' : ''}>
              /Leaderboard
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
                    A+ Core 1
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/aplus-core2" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    A+ Core 2
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
                  <NavLink to="/practice-tests/pen-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Pentest+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/casp-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    CASP+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/linux-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Linux+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/cloud-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Cloud+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/data-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Data+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/server-plus" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    Server+
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/cissp" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    CISSP
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/practice-tests/aws-cloud" className={({ isActive }) => isActive ? 'active-subtab' : ''}>
                    AWS Cloud Practitioner
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

