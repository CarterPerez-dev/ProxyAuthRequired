// src/components/pages/leaderboard/LeaderboardPage.js
import React, { useEffect, useState } from 'react';
import './LeaderboardPage.css'; // We'll define this shortly

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await fetch('/api/test/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to load leaderboard');
        }
        const data = await response.json();
        setLeaders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  if (loading) {
    return <div className="leaderboard-loading">Loading Leaderboard...</div>;
  }
  if (error) {
    return <div className="leaderboard-error">Error: {error}</div>;
  }

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Top 100 Leaderboard</h1>
      <div className="leaderboard-list">
        {leaders.map((user) => {
          // Special styling for top 3
          let rankClass = '';
          if (user.rank === 1) rankClass = 'gold-rank';
          else if (user.rank === 2) rankClass = 'silver-rank';
          else if (user.rank === 3) rankClass = 'bronze-rank';

          return (
            <div key={user.rank} className={`leaderboard-item ${rankClass}`}>
              <span className="rank-label">{user.rank}</span>
              <div className="avatar-wrapper">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="avatar"
                    className="leaderboard-avatar"
                  />
                ) : (
                  <img
                    src="/avatars/default.png"
                    alt="default avatar"
                    className="leaderboard-avatar"
                  />
                )}
              </div>
              <div className="user-info">
                <span className="username">{user.username}</span>
                <span className="user-level">Level: {user.level}</span>
                <span className="user-xp">XP: {user.xp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardPage;

