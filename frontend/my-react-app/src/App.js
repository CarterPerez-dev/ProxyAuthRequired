// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserId, fetchUserData } from './components/pages/store/userSlice';

// Public pages
import InfoPage from './components/pages/Info/InfoPage';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import ForgotPassword from './components/pages/auth/ForgotPassword';

// Protected pages (wrapped with ProtectedRoute)
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar/Sidebar';
import AchievementPopups from './components/pages/store/AchievementPopups';

import Xploitcraft from './components/pages/XploitcraftPage/Xploitcraft';
import ScenarioSphere from './components/pages/ScenarioPage/ScenarioSphere';
import AnalogyHub from './components/pages/AnalogyPage/AnalogyHub';
import Log from './components/pages/LogPage/Log';
import GRC from './components/pages/GRCpage/GRC';
import DailyCyberBrief from './components/pages/DailyPage/DailyCyberBrief';
import Resources from './components/pages/ResourcesPage/Resources';
import Portfolio from './components/EasterEgg/Portfolio';
import Portfolionotegg from './components/EasterEgg/Portfolio_notegg';
import AdminInterface from './components/pages/AdminInterface/AdminInterface';
import PBQWizard from './components/pages/PBQpage/PBQWizard';
import APlusTestPage from './components/pages/testpage/APlusTestPage';
import ShopPage from './components/pages/store/ShopPage';
import UserProfile from './components/pages/store/UserProfile';

// Global CSS import
import './components/pages/XploitcraftPage/global.css';

function App() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);

  // On app load, check for persisted user info
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId && !userId) {
      dispatch(setCurrentUserId(storedUserId));
      dispatch(fetchUserData(storedUserId));
    }
  }, [dispatch, userId]);

  return (
    <div className="App">
      {/* Render Sidebar only when user is logged in */}
      {userId && <Sidebar />}
      <AchievementPopups />
      {/* Apply a conditional class to main-content */}
      <div className={`main-content ${userId ? 'with-sidebar' : 'no-sidebar'}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<InfoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }/>
          <Route path="/shop" element={
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          }/>
          <Route path="/xploitcraft" element={
            <ProtectedRoute>
              <Xploitcraft />
            </ProtectedRoute>
          }/>
          <Route path="/scenariosphere" element={
            <ProtectedRoute>
              <ScenarioSphere />
            </ProtectedRoute>
          }/>
          <Route path="/analogyhub" element={
            <ProtectedRoute>
              <AnalogyHub />
            </ProtectedRoute>
          }/>
          <Route path="/log" element={
            <ProtectedRoute>
              <Log />
            </ProtectedRoute>
          }/>
          <Route path="/grc" element={
            <ProtectedRoute>
              <GRC />
            </ProtectedRoute>
          }/>
          <Route path="/dailycyberbrief" element={<DailyCyberBrief />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/easteregg" element={<Portfolio />} />
          <Route path="/myportfolio" element={<Portfolionotegg />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminInterface />
            </ProtectedRoute>
          }/>
          <Route path="/pbq" element={
            <ProtectedRoute>
              <PBQWizard />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/a-plus" element={<Navigate to="/practice-tests/a-plus/1" replace />} />
          <Route path="/practice-tests/a-plus/:testId" element={
            <ProtectedRoute>
              <APlusTestPage />
            </ProtectedRoute>
          }/>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

