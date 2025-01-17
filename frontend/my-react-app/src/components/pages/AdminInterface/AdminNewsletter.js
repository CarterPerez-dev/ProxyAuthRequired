import React, { useState } from 'react';
import './AdminNewsletter.css';

const ENDPOINT = "/api/admin/newsletter";

const AdminNewsletter = ({ apiKey }) => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateNewsletter = async () => {
    if (!content) {
      setMessage("Newsletter content cannot be empty.");
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Newsletter updated successfully!");
        setContent('');
      } else {
        setMessage(data.error || "An error occurred updating the newsletter.");
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-newsletter-container">
      <h3>Update Newsletter</h3>
      <div className="form-group">
        <label>Newsletter Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter newsletter content here..."
          className="admin-textarea"
          rows="10"
        />
      </div>
      <button
        onClick={handleUpdateNewsletter}
        className="admin-submit-button"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Newsletter"}
      </button>
      {message && <p className="admin-message">{message}</p>}
    </div>
  );
};

export default AdminNewsletter;

