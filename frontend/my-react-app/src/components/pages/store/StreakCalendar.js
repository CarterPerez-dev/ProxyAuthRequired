// components/StreakCalendar.js
import React from 'react';
import { useSelector } from 'react-redux';

function StreakCalendar() {
  const loginHistory = useSelector((state) => state.user.loginHistory);

  // We'll do a simple approach: show current month days in a grid, 
  // and highlight any date in loginHistory.
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based, e.g. 0=Jan
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = endOfMonth.getDate();

  // Convert loginHistory strings to a set for quick membership check
  const loginDatesSet = new Set(loginHistory);

  // We'll store the date strings in the same format we used above, e.g. new Date().toDateString()
  // But let's just do a quick approach:
  const dayArray = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = dateObj.toDateString();
    const loggedIn = loginDatesSet.has(dateStr);
    dayArray.push({ day: d, loggedIn });
  }

  return (
    <div>
      <h3>Streak Calendar ({now.toLocaleString('default', { month: 'long' })} {year})</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 40px)', 
        gap: '10px'
      }}>
        {dayArray.map(({ day, loggedIn }) => (
          <div 
            key={day}
            style={{
              width: '40px',
              height: '40px',
              background: loggedIn ? '#4CAF50' : '#555',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              color: '#fff'
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreakCalendar;

