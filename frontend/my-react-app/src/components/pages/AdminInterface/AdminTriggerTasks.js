import React, { useState } from 'react';
import './AdminTriggerTasks.css';

const AdminTriggerTasks = ({ apiKey }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const triggerTask = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/celery/trigger-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Task triggered successfully. Task ID: ${data.task_id}`);
      } else {
        setMessage(data.error || "Failed to trigger task.");
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-trigger-tasks-container">
      <h3>Trigger Celery Tasks</h3>
      <button
        onClick={triggerTask}
        className="trigger-task-button"
        disabled={loading}
      >
        {loading ? "Triggering..." : "Send Newsletter Now"}
      </button>
      {message && <p className="trigger-message">{message}</p>}
    </div>
  );
};

export default AdminTriggerTasks;

