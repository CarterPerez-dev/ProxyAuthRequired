// src/components/pages/games/PhishingPhrenzy/PhishingCard.js
import React from 'react';
import { FaEnvelope, FaGlobe, FaCommentAlt, FaLink } from 'react-icons/fa';
import './PhishingCard.css';

const PhishingCard = ({ item }) => {
  if (!item) return null;

  const renderContent = () => {
    switch (item.type) {
      case 'email':
        return (
          <div className="phishing-email">
            <div className="email-header">
              <div className="email-from">
                <strong>From:</strong> {item.from}
              </div>
              <div className="email-subject">
                <strong>Subject:</strong> {item.subject}
              </div>
              {item.date && (
                <div className="email-date">
                  <strong>Date:</strong> {item.date}
                </div>
              )}
            </div>
            <div className="email-body">
              {item.body}
            </div>
            {item.links && item.links.length > 0 && (
              <div className="email-links">
                <div className="link-label">Links in email:</div>
                {item.links.map((link, idx) => (
                  <div className="email-link" key={idx}>
                    <FaLink /> <span className="link-text">{link}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'website':
        return (
          <div className="phishing-website">
            <div className="website-url">
              {item.url}
            </div>
            <div className="website-preview">
              <div className="website-header">
                <h3>{item.title}</h3>
              </div>
              <div className="website-content">
                {item.content}
              </div>
              {item.formFields && (
                <div className="website-form">
                  {item.formFields.map((field, idx) => (
                    <div className="form-field" key={idx}>
                      <label>{field.label}</label>
                      <input 
                        type={field.type} 
                        placeholder={field.placeholder}
                        disabled 
                      />
                    </div>
                  ))}
                  <button className="form-submit" disabled>
                    {item.submitButton || "Submit"}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'sms':
        return (
          <div className="phishing-sms">
            <div className="sms-from">
              From: {item.from}
            </div>
            <div className="sms-message">
              {item.message}
            </div>
            {item.links && item.links.length > 0 && (
              <div className="sms-links">
                {item.links.map((link, idx) => (
                  <div className="sms-link" key={idx}>
                    {link}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      default:
        return <div>Unknown content type</div>;
    }
  };

  const getCardIcon = () => {
    switch (item.type) {
      case 'email':
        return <FaEnvelope className="card-icon" />;
      case 'website':
        return <FaGlobe className="card-icon" />;
      case 'sms':
        return <FaCommentAlt className="card-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className={`phishing-card ${item.type}-card`}>
      <div className="card-header">
        {getCardIcon()}
        <span className="card-type">
          {item.type === 'email' ? 'Email Message' : 
           item.type === 'website' ? 'Website' : 
           item.type === 'sms' ? 'SMS Message' : 'Unknown'}
        </span>
      </div>
      <div className="card-content">
        {renderContent()}
      </div>
      <div className="card-instruction">
        <strong>Is this a phishing attempt?</strong>
      </div>
    </div>
  );
};

export default PhishingCard;
