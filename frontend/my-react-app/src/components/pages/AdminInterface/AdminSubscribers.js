import React, { useState, useEffect } from 'react';
import './AdminSubscribers.css';

const AdminSubscribers = ({ apiKey }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchSubscribers = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/subscribe/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSubscribers(data.subscribers);
        setFiltered(data.subscribers);
      } else {
        setMessage(data.error || "Failed to fetch subscribers.");
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
     // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearch(val);
    setFiltered(subscribers.filter(sub => sub.toLowerCase().includes(val)));
  };

  const handleUnsubscribe = async (email) => {
    try {
      const response = await fetch('/api/unsubscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey, 
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubscribers(prev => prev.filter(s => s !== email));
        setFiltered(prev => prev.filter(s => s !== email));
      } else {
        setMessage(data.error || "Failed to unsubscribe user.");
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="admin-subscribers-container">
      <h3>Manage Subscribers</h3>
      <input
        type="text"
        className="search-input"
        placeholder="Search subscribers..."
        value={search}
        onChange={handleSearch}
      />
      {loading && <p>Loading subscribers...</p>}
      {message && <p className="error">{message}</p>}

      {!loading && !message && (
        <table className="subscribers-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((email, idx) => (
              <tr key={idx}>
                <td>{email}</td>
                <td>
                  <button
                    className="unsubscribe-button"
                    onClick={() => handleUnsubscribe(email)}
                  >
                    Unsubscribe
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSubscribers;

