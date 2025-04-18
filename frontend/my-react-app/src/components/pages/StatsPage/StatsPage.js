// src/components/pages/StatsPage/StatsPage.js
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './StatsPage.css';
import {
  FaChartLine, FaTrophy, FaCheckCircle, FaTimesCircle, FaQuestionCircle,
  FaFlagCheckered, FaCertificate, FaMedal, FaChartPie, FaCalendarAlt,
  FaExclamationTriangle, FaRocket, FaChartBar, FaInfoCircle, FaUserGraduate,
  FaLightbulb, FaArrowUp, FaArrowDown, FaEquals, FaFilter, FaSearch,
  FaArrowAltCircleUp, FaArrowAltCircleDown, FaStarHalfAlt, FaCrown,
  FaHourglassHalf, FaHeartbeat, FaGraduationCap, FaFire
} from 'react-icons/fa';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar,
  PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts';

const StatsPage = () => {
  const dispatch = useDispatch();
  
  // Redux selectors for user data
  const { userId, level, xp, coins } = useSelector(state => state.user);
  
  // Local states
  const [testAttempts, setTestAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeRange, setTimeRange] = useState('all');
  const [readinessScores, setReadinessScores] = useState({});
  const [displayMode, setDisplayMode] = useState('overview'); // 'overview', 'details', 'readiness'
  const [leaderboardRank, setLeaderboardRank] = useState({current: 0, previous: 0, change: 0});
  
  // Color definitions for charts
  const COLORS = {
    primary: "var(--stats-accent)",
    secondary: "var(--stats-accent-secondary)",
    success: "#2ecc71",
    warning: "#f39c12",
    danger: "#e74c3c",
    info: "#3498db",
    purple: "#9b59b6",
    teal: "#1abc9c",
    orange: "#e67e22",
    darkBlue: "#34495e"
  };
  
  const CHART_COLORS = [
    COLORS.primary,
    COLORS.secondary,
    COLORS.success,
    COLORS.info,
    COLORS.warning,
    COLORS.purple,
    COLORS.teal
  ];
  
  // Fetch test attempts when component mounts
  useEffect(() => {
    const fetchTestAttempts = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/test/attempts/${userId}/list`);
        if (!response.ok) {
          throw new Error('Failed to fetch test attempts');
        }
        
        const data = await response.json();
        setTestAttempts(data.attempts || []);
        
        // Calculate readiness scores based on test performance
        calculateReadinessScores(data.attempts || []);
        
        // Fetch leaderboard rank data
        fetchLeaderboardRank();
      } catch (err) {
        console.error('Error fetching test attempts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestAttempts();
  }, [userId]);
  
  // Fetch user's leaderboard position
  const fetchLeaderboardRank = async () => {
    if (!userId) return;
    
    try {
      // First query would be for current rank
      const response = await fetch(`/api/test/leaderboard?skip=0&limit=1000`);
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      
      const data = await response.json();
      const userRanking = data.data.findIndex(user => user.username === userId);
      const currentRank = userRanking !== -1 ? userRanking + 1 : null;
      
      // Simulate previous rank (in a real app, this would come from stored history)
      // For this implementation, we'll randomly generate a previous rank close to current
      const previousRank = currentRank ? 
        Math.max(1, currentRank + (Math.random() > 0.5 ? -Math.floor(Math.random() * 5) : Math.floor(Math.random() * 5))) : 
        null;
      
      setLeaderboardRank({
        current: currentRank,
        previous: previousRank,
        change: previousRank ? previousRank - currentRank : 0
      });
      
    } catch (err) {
      console.error('Error fetching leaderboard rank:', err);
    }
  };
  
  // Calculate readiness scores for different certification exams
  const calculateReadinessScores = (attempts) => {
    // Group attempts by category
    const attemptsByCategory = attempts.reduce((acc, attempt) => {
      const category = attempt.category || 'uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(attempt);
      return acc;
    }, {});
    
    // Calculate readiness score for each category
    const scores = {};
    Object.entries(attemptsByCategory).forEach(([category, categoryAttempts]) => {
      if (category === 'uncategorized') return;
      
      // Only consider recent and completed attempts
      const validAttempts = categoryAttempts.filter(a => a.finished && a.score !== undefined);
      if (validAttempts.length === 0) {
        scores[category] = { score: 0, status: 'not-started', attempts: 0, trend: 'neutral' };
        return;
      }
      
      // Calculate average score
      const totalScore = validAttempts.reduce((sum, a) => {
        return sum + (a.score / (a.totalQuestions || 1)) * 100;
      }, 0);
      const avgScore = totalScore / validAttempts.length;
      
      // Determine trend (improving, declining, steady)
      let trend = 'neutral';
      if (validAttempts.length >= 2) {
        // Sort by date (most recent first)
        const sortedAttempts = [...validAttempts].sort((a, b) => {
          return new Date(b.finishedAt) - new Date(a.finishedAt);
        });
        
        // Compare most recent with previous
        const recentScore = sortedAttempts[0].score / (sortedAttempts[0].totalQuestions || 1) * 100;
        const prevScore = sortedAttempts[1].score / (sortedAttempts[1].totalQuestions || 1) * 100;
        
        if (recentScore > prevScore + 5) trend = 'improving';
        else if (recentScore < prevScore - 5) trend = 'declining';
      }
      
      // Determine readiness status
      let status = 'not-ready';
      if (avgScore >= 90) status = 'ready';
      else if (avgScore >= 75) status = 'almost-ready';
      else if (avgScore >= 60) status = 'needs-work';
      
      scores[category] = {
        score: Math.round(avgScore),
        status,
        attempts: validAttempts.length,
        trend
      };
    });
    
    setReadinessScores(scores);
  };
  
  // Format certification name for better display
  const formatCertName = (name) => {
    if (!name) return 'Unknown';
    
    // Handle typical naming patterns
    if (name === 'aplus') return 'A+ Core 1';
    if (name === 'aplus-core2') return 'A+ Core 2';
    if (name === 'network-plus') return 'Network+';
    if (name === 'security-plus') return 'Security+';
    if (name === 'cysa-plus') return 'CySA+';
    if (name === 'pen-plus') return 'PenTest+';
    if (name === 'casp-plus') return 'CASP+';
    if (name === 'linux-plus') return 'Linux+';
    if (name === 'cloud-plus') return 'Cloud+';
    if (name === 'data-plus') return 'Data+';
    if (name === 'server-plus') return 'Server+';
    if (name === 'cissp') return 'CISSP';
    if (name === 'aws-cloud') return 'AWS Cloud';
    
    // General case: capitalize and replace dashes with spaces
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
  };

// Filter attempts based on selected category and time range
  const filteredAttempts = useMemo(() => {
    if (!testAttempts.length) return [];
    
    return testAttempts.filter(attempt => {
      // Category filter
      if (selectedCategory !== 'all' && attempt.category !== selectedCategory) {
        return false;
      }
      
      // Time range filter
      if (timeRange !== 'all') {
        const attemptDate = new Date(attempt.finishedAt || attempt.createdAt);
        const now = new Date();
        
        switch (timeRange) {
          case 'week':
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);
            return attemptDate >= weekAgo;
          case 'month':
            const monthAgo = new Date();
            monthAgo.setMonth(now.getMonth() - 1);
            return attemptDate >= monthAgo;
          case '3months':
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(now.getMonth() - 3);
            return attemptDate >= threeMonthsAgo;
          default:
            return true;
        }
      }
      
      return true;
    });
  }, [testAttempts, selectedCategory, timeRange]);
  
  // Calculate summary statistics
  const stats = useMemo(() => {
    if (!filteredAttempts.length) {
      return {
        totalTests: 0,
        completedTests: 0,
        avgScore: 0,
        totalCorrect: 0,
        perfectScores: 0,
        worstScore: 0,
        bestScore: 0
      };
    }
    
    const completedAttempts = filteredAttempts.filter(a => a.finished);
    
    // Calculate total correct answers and questions
    let totalCorrect = 0;
    let perfectScores = 0;
    let scores = [];
    
    completedAttempts.forEach(attempt => {
      const score = attempt.score || 0;
      const total = attempt.totalQuestions || 0;
      
      totalCorrect += score;
      
      if (score === total && total > 0) {
        perfectScores++;
      }
      
      if (total > 0) {
        scores.push((score / total) * 100);
      }
    });
    
    const avgScore = scores.length > 0
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length
      : 0;
    
    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const worstScore = scores.length > 0 ? Math.min(...scores) : 0;
    
    return {
      totalTests: filteredAttempts.length,
      completedTests: completedAttempts.length,
      avgScore: Math.round(avgScore),
      totalCorrect,
      perfectScores,
      bestScore: Math.round(bestScore),
      worstScore: Math.round(worstScore)
    };
  }, [filteredAttempts]);
  
  // Prepare data for score trend chart
  const scoreChartData = useMemo(() => {
    if (!filteredAttempts.length) return [];
    
    // Get completed attempts with valid dates
    const validAttempts = filteredAttempts
      .filter(a => a.finished && (a.finishedAt || a.createdAt))
      .sort((a, b) => {
        const dateA = new Date(a.finishedAt || a.createdAt);
        const dateB = new Date(b.finishedAt || b.createdAt);
        return dateA - dateB;
      });
      
    return validAttempts.map((attempt, index) => {
      const date = new Date(attempt.finishedAt || attempt.createdAt);
      const score = attempt.totalQuestions 
        ? Math.round((attempt.score / attempt.totalQuestions) * 100) 
        : 0;
        
      // Include a sequential index to make the trend line more visually appealing
      return {
        date: date.toLocaleDateString(),
        score,
        index,
        category: attempt.category || 'Unknown',
        testId: attempt.testId
      };
    });
  }, [filteredAttempts]);
  
  // Prepare data for category performance radar chart
  const categoryData = useMemo(() => {
    if (!filteredAttempts.length) return [];
    
    // Group by category
    const categories = {};
    
    filteredAttempts
      .filter(a => a.finished)
      .forEach(attempt => {
        const category = attempt.category || 'Unknown';
        if (!categories[category]) {
          categories[category] = {
            scores: [],
            totalCorrect: 0,
            totalQuestions: 0
          };
        }
        
        categories[category].scores.push(
          attempt.totalQuestions 
            ? (attempt.score / attempt.totalQuestions) * 100 
            : 0
        );
        categories[category].totalCorrect += attempt.score || 0;
        categories[category].totalQuestions += attempt.totalQuestions || 0;
      });
      
    return Object.entries(categories).map(([category, data]) => {
      const avgScore = data.scores.length 
        ? data.scores.reduce((sum, s) => sum + s, 0) / data.scores.length
        : 0;
        
      return {
        category,
        fullName: formatCertName(category),
        score: Math.round(avgScore),
        accuracy: data.totalQuestions 
          ? Math.round((data.totalCorrect / data.totalQuestions) * 100)
          : 0,
        attempts: data.scores.length
      };
    }).sort((a, b) => b.score - a.score);
  }, [filteredAttempts]);
  
  // Identify strengths and weaknesses
  const { strengths, weaknesses } = useMemo(() => {
    if (!categoryData.length) {
      return { strengths: [], weaknesses: [] };
    }
    
    // Sort categories by score
    const sortedCategories = [...categoryData].sort((a, b) => b.score - a.score);
    
    // Take top 3 as strengths and bottom 3 as weaknesses
    // Only consider categories with at least 2 attempts for more reliable data
    const validCategories = sortedCategories.filter(c => c.attempts >= 2);
    
    const strengths = validCategories.slice(0, 3);
    const weaknesses = [...validCategories].sort((a, b) => a.score - b.score).slice(0, 3);
    
    return { strengths, weaknesses };
  }, [categoryData]);
  
  // Render trophy icon with color based on score
  const renderTrophyIcon = (score) => {
    if (score >= 90) return <FaTrophy className="stats-icon-gold" />;
    if (score >= 75) return <FaTrophy className="stats-icon-silver" />;
    if (score >= 60) return <FaTrophy className="stats-icon-bronze" />;
    return <FaTrophy className="stats-icon-neutral" />;
  };
  
  // Render trend indicator
  const renderTrendIndicator = (trend) => {
    if (trend === 'improving') return <FaArrowAltCircleUp className="stats-trend-up" />;
    if (trend === 'declining') return <FaArrowAltCircleDown className="stats-trend-down" />;
    return <FaEquals className="stats-trend-neutral" />;
  };
  
  // Category list for filter
  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    testAttempts.forEach(attempt => {
      if (attempt.category) uniqueCategories.add(attempt.category);
    });
    return Array.from(uniqueCategories);
  }, [testAttempts]);
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="stats-chart-tooltip">
          <p className="stats-chart-tooltip-title">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="stats-chart-tooltip-item" style={{ color: entry.color }}>
              <span>{entry.name}</span>
              <span className="stats-chart-tooltip-value">{entry.value}{entry.name.includes('%') ? '' : '%'}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Generate rank change indicator
  const renderRankChangeIndicator = () => {
    const { change } = leaderboardRank;
    
    if (change > 0) {
      return (
        <div className="stats-rank-change positive">
          <FaArrowUp className="stats-rank-change-icon" />
          <span>+{change}</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="stats-rank-change negative">
          <FaArrowDown className="stats-rank-change-icon" />
          <span>{change}</span>
        </div>
      );
    } else {
      return (
        <div className="stats-rank-change neutral">
          <FaEquals className="stats-rank-change-icon" />
          <span>No change</span>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="stats-page-container">
        <div className="stats-loading">
          <div className="stats-loading-spinner"></div>
          <p>Loading your performance data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="stats-page-container">
        <div className="stats-error">
          <FaExclamationTriangle className="stats-error-icon" />
          <h3>Error Loading Data</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="stats-retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!testAttempts.length) {
    return (
      <div className="stats-page-container">
        <div className="stats-empty-state">
          <FaChartLine className="stats-empty-icon" />
          <h2>No Test Data Yet</h2>
          <p>Complete some practice tests to see your performance statistics.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="stats-page-container">
      <div className="stats-header">
        <h1 className="stats-title">
          <FaChartBar className="stats-title-icon" />
          Performance Dashboard
        </h1>
        
        <div className="stats-filters">
          <div className="stats-filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="stats-select"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{formatCertName(cat)}</option>
              ))}
            </select>
          </div>
          
          <div className="stats-filter-group">
            <label>Time Range:</label>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="stats-select"
            >
              <option value="all">All Time</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
            </select>
          </div>
        </div>
        
        <div className="stats-view-toggle">
          <button 
            className={`stats-view-btn ${displayMode === 'overview' ? 'active' : ''}`}
            onClick={() => setDisplayMode('overview')}
          >
            <FaChartPie />
            <span>Overview</span>
          </button>
          <button 
            className={`stats-view-btn ${displayMode === 'readiness' ? 'active' : ''}`}
            onClick={() => setDisplayMode('readiness')}
          >
            <FaCertificate />
            <span>Cert Readiness</span>
          </button>
          <button 
            className={`stats-view-btn ${displayMode === 'details' ? 'active' : ''}`}
            onClick={() => setDisplayMode('details')}
          >
            <FaChartLine />
            <span>Detailed Analysis</span>
          </button>
        </div>
      </div>
      
      {/* Overview Mode */}
      {displayMode === 'overview' && (
        <div className="stats-overview-container">
          <div className="stats-summary-cards">
            <div className="stats-card">
              <div className="stats-card-header">
                <FaFlagCheckered className="stats-card-icon" />
                <h3>Tests Completed</h3>
              </div>
              <div className="stats-card-value">{stats.completedTests}</div>
              <div className="stats-card-footer">
                <span>Total Attempts: {stats.totalTests}</span>
              </div>
            </div>
            
            <div className="stats-card">
              <div className="stats-card-header">
                <FaCheckCircle className="stats-card-icon" />
                <h3>Average Score</h3>
              </div>
              <div className="stats-card-value">{stats.avgScore}%</div>
              <div className="stats-card-footer">
                <span>Best: {stats.bestScore}% | Worst: {stats.worstScore}%</span>
              </div>
            </div>
            
            <div className="stats-card">
              <div className="stats-card-header">
                <FaTrophy className="stats-card-icon" />
                <h3>Perfect Scores</h3>
              </div>
              <div className="stats-card-value">{stats.perfectScores}</div>
              <div className="stats-card-footer">
                <span>{stats.completedTests ? Math.round((stats.perfectScores / stats.completedTests) * 100) : 0}% of Tests</span>
              </div>
            </div>
            
            <div className="stats-card">
              <div className="stats-card-header">
                <FaStarHalfAlt className="stats-card-icon" />
                <h3>Leaderboard Rank</h3>
              </div>
              <div className="stats-card-value rank-value">
                <span>#{leaderboardRank.current || '?'}</span>
                {renderRankChangeIndicator()}
              </div>
              <div className="stats-card-footer">
                <span>Based on XP and Level</span>
              </div>
            </div>
          </div>
          
          <div className="stats-charts-container">
            <div className="stats-chart-wrapper">
              <h3 className="stats-chart-title">
                <FaChartLine />
                Score Progression
              </h3>
              <div className="stats-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={scoreChartData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12, fill: 'var(--stats-text-secondary)' }}
                      stroke="rgba(255,255,255,0.2)"
                      interval="preserveEnd"
                      tickFormatter={(value) => {
                        // Shorten date format for mobile
                        const date = new Date(value);
                        return `${date.getMonth()+1}/${date.getDate()}`;
                      }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fontSize: 12, fill: 'var(--stats-text-secondary)' }}
                      stroke="rgba(255,255,255,0.2)"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      name="Score (%)"
                      stroke="var(--stats-accent)" 
                      fillOpacity={1}
                      fill="url(#colorScore)"
                      activeDot={{ r: 8, strokeWidth: 0, fill: 'var(--stats-accent-glow)' }}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="stats-chart-wrapper">
              <h3 className="stats-chart-title">
                <FaChartPie />
                Category Performance
              </h3>
              <div className="stats-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData.slice(0, 6)} layout="vertical" margin={{ left: 100 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]}
                      tick={{ fontSize: 12, fill: 'var(--stats-text-secondary)' }}
                      stroke="rgba(255,255,255,0.2)"
                    />
                    <YAxis 
                      dataKey="fullName" 
                      type="category" 
                      tick={{ fontSize: 12, fill: 'var(--stats-text-secondary)' }}
                      stroke="rgba(255,255,255,0.2)"
                      width={100}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={COLORS.primary} />
                        <stop offset="100%" stopColor={COLORS.secondary} />
                      </linearGradient>
                    </defs>
                    <Bar 
                      dataKey="score" 
                      name="Average Score" 
                      fill="url(#barGradient)" 
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="stats-insights-container">
            <div className="stats-insight-card">
              <h3 className="stats-insight-title">
                <FaArrowUp className="stats-insight-icon stats-icon-success" />
                Strengths
              </h3>
              {strengths.length > 0 ? (
                <ul className="stats-insight-list">
                  {strengths.map((strength, index) => (
                    <li key={index} className="stats-insight-item">
                      <div className="stats-insight-item-header">
                        {renderTrophyIcon(strength.score)}
                        <span className="stats-insight-item-name">
                          {formatCertName(strength.category)}
                        </span>
                        <span className="stats-insight-item-value">
                          {strength.score}%
                        </span>
                      </div>
                      <div className="stats-insight-item-detail">
                        <span>Based on {strength.attempts} tests</span>
                      </div>
                      <div className="stats-insight-progress">
                        <div 
                          className="stats-insight-progress-bar"
                          style={{ width: `${strength.score}%`, background: `var(--stats-insight-gradient-${index + 1})` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="stats-insight-empty">
                  Complete more tests to identify your strengths.
                </p>
              )}
            </div>
            
            <div className="stats-insight-card">
              <h3 className="stats-insight-title">
                <FaArrowDown className="stats-insight-icon stats-icon-danger" />
                Areas for Improvement
              </h3>
              {weaknesses.length > 0 ? (
                <ul className="stats-insight-list">
                  {weaknesses.map((weakness, index) => (
                    <li key={index} className="stats-insight-item">
                      <div className="stats-insight-item-header">
                        {renderTrophyIcon(weakness.score)}
                        <span className="stats-insight-item-name">
                          {formatCertName(weakness.category)}
                        </span>
                        <span className="stats-insight-item-value">
                          {weakness.score}%
                        </span>
                      </div>
                      <div className="stats-insight-item-detail">
                        <span>Based on {weakness.attempts} tests</span>
                      </div>
                      <div className="stats-insight-progress">
                        <div 
                          className="stats-insight-progress-bar"
                          style={{ width: `${weakness.score}%`, background: 'var(--stats-warning)' }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="stats-insight-empty">
                  Complete more tests to identify areas for improvement.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Certification Readiness Mode */}
      {displayMode === 'readiness' && (
        <div className="stats-readiness-container">
          <div className="stats-readiness-header">
            <h2>
              <FaCertificate className="stats-readiness-header-icon" />
              Certification Readiness Assessment
            </h2>
            <p className="stats-readiness-description">
              These scores estimate your exam readiness based on your practice test performance.
              <span className="stats-tooltip-trigger">
                <FaInfoCircle className="stats-info-icon" />
                <span className="stats-tooltip-content">
                  90%+ indicates readiness for the actual exam.<br />
                  75-89% suggests you're close but need more practice.<br />
                  60-74% means more study is needed in specific areas.<br />
                  Below 60% indicates significant preparation is still required.
                </span>
              </span>
            </p>
          </div>
          
          <div className="stats-readiness-grid">
            {Object.keys(readinessScores).length > 0 ? (
              Object.entries(readinessScores).map(([category, data], index) => (
                <div 
                  key={category} 
                  className={`stats-readiness-card stats-readiness-${data.status}`}
                >
                  <div className="stats-readiness-card-header">
                    <h3>{formatCertName(category)}</h3>
                    {renderTrendIndicator(data.trend)}
                  </div>
                  
                  <div className="stats-readiness-score">
                    <div className="stats-readiness-meter">
                      <div 
                        className="stats-readiness-meter-fill" 
                        style={{ width: `${data.score}%` }}
                      ></div>
                    </div>
                    <div className="stats-readiness-value">
                      {data.score}%
                    </div>
                  </div>
                  
                  <div className="stats-readiness-status">
                    {data.status === 'ready' && (
                      <div className="stats-readiness-badge stats-badge-success">
                        <FaCheckCircle />
                        <span>Exam Ready</span>
                      </div>
                    )}
                    {data.status === 'almost-ready' && (
                      <div className="stats-readiness-badge stats-badge-warning">
                        <FaRocket />
                        <span>Almost Ready</span>
                      </div>
                    )}
                    {data.status === 'needs-work' && (
                      <div className="stats-readiness-badge stats-badge-danger">
                        <FaExclamationTriangle />
                        <span>Needs More Practice</span>
                      </div>
                    )}
                    {data.status === 'not-ready' && (
                      <div className="stats-readiness-badge stats-badge-danger">
                        <FaTimesCircle />
                        <span>Not Ready</span>
                      </div>
                    )}
                    {data.status === 'not-started' && (
                      <div className="stats-readiness-badge stats-badge-neutral">
                        <FaQuestionCircle />
                        <span>Not Started</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="stats-readiness-footer">
                    {data.attempts > 0 ? (
                      <span>Based on {data.attempts} {data.attempts === 1 ? 'test' : 'tests'}</span>
                    ) : (
                      <span>No test data available</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="stats-readiness-empty">
                <FaUserGraduate className="stats-empty-icon" />
                <h3>No Certification Data Yet</h3>
                <p>Complete some practice tests to see your certification readiness assessment.</p>
              </div>
            )}
          </div>
          
          <div className="stats-recommendation-container">
            <div className="stats-recommendation-header">
              <FaLightbulb className="stats-recommendation-icon" />
              <h3>Recommendations</h3>
            </div>
            
            <div className="stats-recommendation-content">
              {Object.keys(readinessScores).length > 0 ? (
                <ul className="stats-recommendation-list">
                  {Object.entries(readinessScores)
                    .filter(([_, data]) => data.status !== 'not-started' && data.status !== 'ready')
                    .sort((a, b) => a[1].score - b[1].score)
                    .slice(0, 3)
                    .map(([category, data]) => (
                      <li key={category} className="stats-recommendation-item">
                        <strong>{formatCertName(category)}:</strong> {data.score < 60 
                          ? `Focus on building fundamental knowledge in ${formatCertName(category)}.` 
                          : data.score < 75 
                            ? `Continue practicing ${formatCertName(category)} tests to improve your score.` 
                            : `You're almost ready for the ${formatCertName(category)} exam! Focus on your weak areas.`}
                      </li>
                    ))}
                  
                  {Object.values(readinessScores).some(data => data.trend === 'declining') && (
                    <li className="stats-recommendation-item stats-recommendation-warning">
                      <strong>Warning:</strong> Your scores are declining in some areas. Review your recent tests 
                      to identify knowledge gaps.
                    </li>
                  )}
                  
                  {Object.values(readinessScores).filter(data => data.status === 'ready').length > 0 && (
                    <li className="stats-recommendation-item stats-recommendation-success">
                      <strong>Good news!</strong> You appear ready for {
                        Object.entries(readinessScores)
                          .filter(([_, data]) => data.status === 'ready')
                          .map(([category]) => formatCertName(category))
                          .join(', ')
                      } certification(s).
                    </li>
                  )}
                </ul>
              ) : (
                <p className="stats-recommendation-empty">
                  Complete practice tests across different certification areas to receive personalized recommendations.
                </p>
              )}
            </div>
          </div>
          
          {/* New: Certification Progression Chart */}
          {categoryData.length > 0 && (
            <div className="stats-progression-container">
              <div className="stats-progression-header">
                <h3>
                  <FaGraduationCap className="stats-progression-icon" />
                  Certification Progress Overview
                </h3>
              </div>
              <div className="stats-progression-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="15%" 
                    outerRadius="80%" 
                    data={categoryData.slice(0, 5)} 
                    startAngle={180} 
                    endAngle={0}
                  >
                    <RadialBar
                      minAngle={15}
                      background
                      clockWise={true}
                      dataKey="score"
                      cornerRadius={10}
                      label={{ fill: 'var(--stats-text)', position: 'insideStart', offset: 15 }}
                      labelFormatter={(value, entry) => formatCertName(entry.category)}
                    >
                      {categoryData.slice(0, 5).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={CHART_COLORS[index % CHART_COLORS.length]} 
                        />
                      ))}
                    </RadialBar>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Score']}
                      labelFormatter={(label, payload) => 
                        payload && payload.length > 0 ? formatCertName(payload[0].payload.category) : ''}
                    />
                    <Legend 
                      iconSize={10} 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      formatter={(value, entry) => formatCertName(entry.payload.category)}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Detailed Analysis Mode */}
      {displayMode === 'details' && (
        <div className="stats-details-container">
          <div className="stats-details-row">
            <div className="stats-details-card">
              <h3 className="stats-details-title">
                <FaCalendarAlt className="stats-details-icon" />
                Activity Timeline
              </h3>
              <div className="stats-details-content">
                {scoreChartData.length > 0 ? (
                  <div className="stats-timeline-chart">
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={scoreChartData}>
                        <defs>
                          <linearGradient id="colorTimelineScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="date" 
                          tick={{fill: 'var(--stats-text-secondary)'}}
                          stroke="rgba(255,255,255,0.2)"
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          tick={{fill: 'var(--stats-text-secondary)'}}
                          stroke="rgba(255,255,255,0.2)"
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area 
                          type="monotone" 
                          dataKey="score" 
                          name="Score (%)" 
                          stroke={COLORS.primary} 
                          fillOpacity={1}
                          fill="url(#colorTimelineScore)"
                          activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--stats-accent-glow)' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="stats-empty-message">No activity data available</p>
                )}
              </div>
            </div>
            
            <div className="stats-details-card">
              <h3 className="stats-details-title">
                <FaChartBar className="stats-details-icon" />
                Category Comparison
              </h3>
              <div className="stats-details-content">
                {categoryData.length > 0 ? (
                  <div className="stats-details-chart">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={categoryData}>
                        <defs>
                          <linearGradient id="colorBarScore" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={COLORS.primary} />
                            <stop offset="100%" stopColor={COLORS.secondary} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="category" 
                          tick={{ fontSize: 10, fill: 'var(--stats-text-secondary)' }}
                          stroke="rgba(255,255,255,0.2)"
                          interval={0}
                          tickFormatter={(value) => formatCertName(value).substring(0, 5) + '..'}
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          tick={{ fontSize: 10, fill: 'var(--stats-text-secondary)' }}
                          stroke="rgba(255,255,255,0.2)"
                        />
                        <Tooltip
                          formatter={(value) => [`${value}%`, 'Score']}
                          labelFormatter={(label) => formatCertName(label)}
                          content={<CustomTooltip />}
                        />
                        <Legend />
                        <Bar 
                          dataKey="score" 
                          name="Average Score" 
                          fill="url(#colorBarScore)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="stats-empty-message">No category data available</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="stats-recent-attempts">
            <h3 className="stats-recent-title">
              <FaFlagCheckered className="stats-recent-icon" />
              Recent Test Attempts
            </h3>
            
            {filteredAttempts.length > 0 ? (
              <div className="stats-attempts-table-wrapper">
                <table className="stats-attempts-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Test</th>
                      <th>Category</th>
                      <th>Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttempts
                      .sort((a, b) => new Date(b.finishedAt || b.createdAt) - new Date(a.finishedAt || a.createdAt))
                      .slice(0, 40)
                      .map((attempt, index) => (
                        <tr key={index}>
                          <td>
                            {new Date(attempt.finishedAt || attempt.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            {attempt.testId ? `#${attempt.testId}` : 'Unknown Test'}
                          </td>
                          <td>
                            {formatCertName(attempt.category)}
                          </td>
                          <td>
                            {attempt.finished ? (
                              <span className={`stats-score ${
                                attempt.score / attempt.totalQuestions >= 0.9 ? 'high' :
                                attempt.score / attempt.totalQuestions >= 0.7 ? 'medium' : 'low'
                              }`}>
                                {attempt.score}/{attempt.totalQuestions} 
                                ({Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                              </span>
                            ) : (
                              'N/A'
                            )}
                          </td>
                          <td>
                            {attempt.finished ? (
                              <span className="stats-status-completed">Completed</span>
                            ) : (
                              <span className="stats-status-in-progress">In Progress</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="stats-empty-message">No recent test attempts match your filters</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
