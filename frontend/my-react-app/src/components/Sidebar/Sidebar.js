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
  FaLaptopCode,
  FaChessKnight
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
      case '/performance': return <FaChessKnight className="sidebar-icon" />;
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
        {collapsed ? "☰" : "✕"}
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
              {/* Stats/Performance Dashboard */}
              <li>
                <NavLink to="/performance" className={({ isActive }) => `sidebar-link ${isActive ? 'active-link' : ''}`}>
                  {getIcon('/performance')}
                  <span className="sidebar-link-text">/Stats</span>
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
                      <span className="sidebar-link-text">Security-X</span>
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
