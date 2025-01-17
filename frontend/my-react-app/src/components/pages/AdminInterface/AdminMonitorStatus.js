import React, { useState, useEffect } from 'react';
import './AdminMonitorStatus.css';

const AdminMonitorStatus = ({ apiKey }) => {
  const [systemInfo, setSystemInfo] = useState({});
  const [appStatus, setAppStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStatus = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/status/status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSystemInfo(data.system_info || {});
        setAppStatus(data.application_status || {});
      } else {
        setError(data.error || "Failed to fetch status.");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
 // eslint-disable-next-line
  }, []);

  return (
    <div className="admin-monitor-status-container">
      <h3>Monitor Application Status</h3>
      {loading && <p>Loading status...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <div className="status-section">
            <h4>System Information</h4>
            <p><strong>CPU Usage:</strong> {systemInfo.cpu_percent}%</p>
            <p><strong>Memory Usage:</strong> {systemInfo.memory_percent}%</p>
            <p><strong>Disk Usage:</strong> {systemInfo.disk_percent}%</p>
          </div>
          <div className="status-section">
            <h4>Services Status</h4>
            <ul>
              {Object.entries(appStatus).map(([service, status], idx) => (
                <li key={idx}>
                  <strong>{service}:</strong> {status}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminMonitorStatus;

