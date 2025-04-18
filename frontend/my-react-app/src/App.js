// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from './components/pages/store/slice/userSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public pages
import InfoPage from './components/pages/Info/InfoPage';
import DemosPage from './components/pages/Info/DemosPage';
import ExamsPage from './components/pages/Info/ExamsPage';
import PublicLeaderboardPage from './components/pages/Info/PublicLeaderboardPage';
import ContactPage from './components/pages/Info/ContactPage';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import ForgotPassword from './components/pages/auth/ForgotPassword';
import ResetPassword from './components/pages/auth/ResetPassword';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';
import CreateUsernameForm from './components/pages/auth/CreateUsernameForm';
import BlogPage from './components/pages/Info/BlogPage';
import BlogPostPage from './components/pages/Info/BlogPostPage';
import SubscriptionCancel from './components/pages/subscription/SubscriptionCancel';
import SubscriptionPage from './components/pages/subscription/SubscriptionPage';
import SubscriptionSuccess from './components/pages/subscription/SubscriptionSuccess';
import PrivacyPolicyIOS from './components/pages/ios/PrivacyPolicyIOS';
import TermsOfServiceIOS from './components/pages/ios/TermsOfServiceIOS';

// Admin 
import CrackedAdminLoginPage from './components/cracked/CrackedAdminLoginPage';
import CrackedAdminDashboard from './components/cracked/CrackedAdminDashboard'; 

// Protected pages
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar/Sidebar';

import Xploitcraft from './components/pages/XploitcraftPage/Xploitcraft';
import ScenarioSphere from './components/pages/ScenarioPage/ScenarioSphere';
import AnalogyHub from './components/pages/AnalogyPage/AnalogyHub';
import GRC from './components/pages/GRCpage/GRC';
import DailyCyberBrief from './components/pages/DailyPage/DailyCyberBrief';
import Resources from './components/pages/ResourcesPage/Resources';

// Gamified components and userprofile
import DailyStationPage from './components/pages/store/DailyStationPage';
import ShopPage from './components/pages/store/ShopPage';
import UserProfile from './components/pages/store/UserProfile';
import LeaderboardPage from './components/pages/store/LeaderboardPage';
import AchievementPage from './components/pages/store/AchievementPage';
import SupportAskAnythingPage from './components/pages/store/SupportAskAnythingPage';

// Unique Test Pages
import APlusTestPage from './components/pages/tests/aplus/APlusTestPage';
import APlusCore2TestPage from './components/pages/tests/aplus2/APlusCore2TestPage';
import NetworkPlusTestPage from './components/pages/tests/nplus/NetworkPlusTestPage';
import SecurityPlusTestPage from './components/pages/tests/secplus/SecurityPlusTestPage';
import CySAPlusTestPage from './components/pages/tests/cysa/CySAPlusTestPage';
import PenPlusTestPage from './components/pages/tests/penplus/PenPlusTestPage';
import CaspPlusTestPage from './components/pages/tests/casp/CaspPlusTestPage';
import LinuxPlusTestPage from './components/pages/tests/linuxplus/LinuxPlusTestPage';
import CloudPlusTestPage from './components/pages/tests/cloudplus/CloudPlusTestPage';
import DataPlusTestPage from './components/pages/tests/dataplus/DataPlusTestPage';
import ServerPlusTestPage from './components/pages/tests/serverplus/ServerPlusTestPage';
import CisspTestPage from './components/pages/tests/cissp/CisspTestPage';
import AWSCloudTestPage from './components/pages/tests/awscloud/AWSCloudTestPage'

// Global Test Page
import GlobalTestPage from './components/GlobalTestPage';

// OAuth Success Page
import OAuthSuccess from './components/pages/auth/OAuthSuccess';

// Global CSS import
import './global.css';



function HomeOrProfile() {
  const { userId, status } = useSelector((state) => state.user);
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (userId) {
    return <Navigate to="/profile" replace />;
  }
  return <InfoPage />;
}

function App() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const location = useLocation();

  // THEME INITIALIZATION - CRITICALLY IMPORTANT
  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('selectedTheme') || 'default';
      document.documentElement.setAttribute('data-theme', savedTheme);
    };
    initializeTheme();
  }, []);
  
  // FETCH USER DATA - MAJORLY IMPORTANT
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  }, [dispatch, userId]);

  // Subscription check effect - only run periodically
  useEffect(() => {
    if (!userId) return;
    
    // Check if this is an OAuth flow or coming from username creation
    const isOAuthFlow = sessionStorage.getItem('isOauthFlow') === 'true';
    const isComingFromCreateUsername = window.location.pathname.includes('/create-username');
    
    // Add a new check for users trying to escape the renewal loop
    const isEscapingRenewal = sessionStorage.getItem('escapeSubscriptionRenewal') === 'true';
    
    // Only run subscription check periodically, not on every route change
    const SUBSCRIPTION_CHECK_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours
    
    const checkSubscription = async () => {
      try {
        // Skip check for OAuth flow, username creation, or when user is explicitly trying to escape
        if (isOAuthFlow || isComingFromCreateUsername || isEscapingRenewal) {
          console.log('Skipping subscription check for special flow');
          return;
        }
        
        // Add check for navigation to non-subscription pages that should be allowed
        const allowedPaths = ['/home', '/login', '/register', '/contact', '/blog', '/exams', '/demos', '/public-leaderboard'];
        if (allowedPaths.some(path => window.location.pathname.includes(path))) {
          console.log('User navigating to allowed path, skipping subscription redirect');
          sessionStorage.setItem('escapeSubscriptionRenewal', 'true');
          
          setTimeout(() => {
            sessionStorage.removeItem('escapeSubscriptionRenewal');
          }, 5 * 60 * 1000);
          return;
        }
        
        const response = await fetch(`/api/subscription/subscription-status?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          
          // If subscription is no longer active AND we're not on an allowed page
          if (!data.subscriptionActive && 
              !window.location.pathname.includes('/subscription') && 
              !window.location.pathname.includes('/login') &&
              !allowedPaths.some(path => window.location.pathname.includes(path))) {
            console.log('Subscription no longer active, redirecting');
            // Instead of immediately logging out, redirect to subscription page
            window.location.href = '/subscription?renewal=true';
          }
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };
    
    // Initial check when component mounts (with special handling for OAuth flow)
    if (isOAuthFlow || isComingFromCreateUsername) {
      // Skip initial check for OAuth flow
      console.log('Skipping initial subscription check for OAuth flow');
    } else {
      checkSubscription();
    }
    
    // Set up interval for periodic checks
    const intervalId = setInterval(checkSubscription, SUBSCRIPTION_CHECK_INTERVAL);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, userId]);
  
    
  return (
    <div className="App">
      {userId && <Sidebar />}
      <ToastContainer 
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="main-content">
        <Routes>
          {/* The default route depends on whether the user is logged in */}
          <Route path="/" element={<HomeOrProfile />} />
          
          {/* Added additional home route that always shows InfoPage */}
          <Route path="/home" element={<InfoPage />} />
          
          {/* public marketing routes */}
          <Route path="/demos" element={<DemosPage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/public-leaderboard" element={<PublicLeaderboardPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/create-username" element={<CreateUsernameForm />} />
          <Route path="/oauth/success" element={<OAuthSuccess />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/subscription/success" element={<SubscriptionSuccess />} />
          <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
          
          {/* Admin routes */}
          <Route path="/cracked" element={<CrackedAdminLoginPage />} />
          <Route path="/cracked/dashboard" element={<CrackedAdminDashboard />} />

          {/* Legal pages */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy-ios" element={<PrivacyPolicyIOS />} />
          <Route path="/terms-ios" element={<TermsOfServiceIOS />} />
          
          {/* Support route */}
          <Route path="/my-support" element={<SupportAskAnythingPage />} />
          
          {/* Protected routes - require login */}
          <Route path="/profile" element={
            <ProtectedRoute requiresPremium={false}>
              <UserProfile />
            </ProtectedRoute>
          }/>
          <Route path="/achievements" element={
            <ProtectedRoute requiresPremium={false}>
              <AchievementPage />
            </ProtectedRoute>
          }/>
          <Route path="/shop" element={
            <ProtectedRoute requiresPremium={false}>
              <ShopPage />
            </ProtectedRoute>
          }/>
          <Route path="/daily" element={
            <ProtectedRoute requiresPremium={false}>
              <DailyStationPage />
            </ProtectedRoute>
          }/>
          <Route path="/leaderboard" element={
            <ProtectedRoute requiresPremium={false}>
              <LeaderboardPage />
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
            <ProtectedRoute requiresPremium={false}>
              <AnalogyHub />
            </ProtectedRoute>
          }/>
          <Route path="/grc" element={
            <ProtectedRoute>
              <GRC />
            </ProtectedRoute>
          }/>
          <Route path="/dailycyberbrief" element={
            <ProtectedRoute requiresPremium={false}> 
              <DailyCyberBrief />
            </ProtectedRoute>
          }/>
          <Route path="/resources" element={
            <ProtectedRoute requiresPremium={false}> 
              <Resources />
            </ProtectedRoute>
          }/>
         
          <Route path="/practice-tests/a-plus" element={
            <ProtectedRoute requiresPremium={false}>
              <APlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/a-plus/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <APlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/aplus-core2" element={
            <ProtectedRoute requiresPremium={false}>
              <APlusCore2TestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/aplus-core2/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <APlusCore2TestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/network-plus" element={
            <ProtectedRoute requiresPremium={false}>
              <NetworkPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/network-plus/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <NetworkPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/security-plus" element={
            <ProtectedRoute requiresPremium={false}>
              <SecurityPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/security-plus/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <SecurityPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cysa-plus" element={
            <ProtectedRoute requiresPremium={false}>
              <CySAPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cysa-plus/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <CySAPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/pen-plus" element={
            <ProtectedRoute requiresPremium={false}>
              <PenPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/pen-plus/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <PenPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/casp-plus" element={
            <ProtectedRoute requiresPremium={false}>
              <CaspPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/casp-plus/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <CaspPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/linux-plus" element={
            <ProtectedRoute requiresPremium={false}>
              <LinuxPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/linux-plus/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <LinuxPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cloud-plus" element={
            <ProtectedRoute requiresPremium={false}>
              <CloudPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cloud-plus/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <CloudPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/data-plus" element={
            <ProtectedRoute requiresPremium={false}>
              <DataPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/data-plus/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <DataPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/server-plus" element={
            <ProtectedRoute requiresPremium={false}>
              <ServerPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/server-plus/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <ServerPlusTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cissp" element={
            <ProtectedRoute requiresPremium={false}>
              <CisspTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/cissp/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <CisspTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/aws-cloud" element={
            <ProtectedRoute requiresPremium={false}>
              <AWSCloudTestPage />
            </ProtectedRoute>
          }/>
          <Route path="/practice-tests/aws-cloud/:testId" element={
            <ProtectedRoute requiresPremium={false}>
              <AWSCloudTestPage />
            </ProtectedRoute>
          }/>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
