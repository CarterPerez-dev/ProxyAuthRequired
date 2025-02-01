import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AchievementPopups = () => {
  const dispatch = useDispatch();
  const popups = useSelector((state) => state.achievements.popups);

  useEffect(() => {
    // Assuming achievements are fetched elsewhere
  }, []);

  if (popups.length === 0) return null;

  const currentPopup = popups[0];
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#333',
      color: '#fff',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
    }}>
      <h4>Achievement Unlocked!</h4>
      <p>{currentPopup.title}</p>
    </div>
  );
};

export default AchievementPopups;

