import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

import Xploitcraft from './components/pages/XploitcraftPage/Xploitcraft';
import About from './components/pages/AboutPage/About'; 
import ScenarioSphere from './components/pages/ScenarioPage/ScenarioSphere';
import AnalogyHub from './components/pages/AnalogyPage/AnalogyHub';
import Log from './components/pages/LogPage/Log';
import GRC from './components/pages/GRCpage/GRC';
import DailyCyberBrief from './components/pages/DailyPage/DailyCyberBrief';
import Resources from './components/pages/ResourcesPage/Resources';
import Donate from './components/pages/DonatePage/Donate';
import Portfolio from './components/EasterEgg/Portfolio.js';
import Portfolionotegg from './components/EasterEgg/Portfolio_notegg.js';
import AdminInterface from './components/pages/AdminInterface/AdminInterface';

import './components/pages/XploitcraftPage/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/xploitcraft" element={<Xploitcraft />} />
            <Route path="/scenariosphere" element={<ScenarioSphere />} />
            <Route path="/analogyhub" element={<AnalogyHub />} />
            <Route path="/log" element={<Log />} />
            <Route path="/grc" element={<GRC />} />
            <Route path="/dailycyberbrief" element={<DailyCyberBrief />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/easteregg" element={<Portfolio />} />
            <Route path="/myportfolio" element={<Portfolionotegg />} />
            <Route path="/admin" element={<AdminInterface />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;









