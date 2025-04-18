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
          <div className="phishingphrenzy_phishing_email">
            <div className="phishingphrenzy_email_header">
              <div className="phishingphrenzy_email_from">
                <strong>From:</strong> {item.from}
              </div>
              <div className="phishingphrenzy_email_subject">
                <strong>Subject:</strong> {item.subject}
              </div>
              {item.date && (
                <div className="phishingphrenzy_email_date">
                  <strong>Date:</strong> {item.date}
                </div>
              )}
            </div>
            <div className="phishingphrenzy_email_body">
              {item.body}
            </div>
            {item.links && item.links.length > 0 && (
              <div className="phishingphrenzy_email_links">
                <div className="phishingphrenzy_link_label">Links in email:</div>
                {item.links.map((link, idx) => (
                  <div className="phishingphrenzy_email_link" key={idx}>
                    <FaLink /> <span className="phishingphrenzy_link_text">{link}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'website':
        return (
          <div className="phishingphrenzy_phishing_website">
            <div className="phishingphrenzy_website_url">
              {item.url}
            </div>
            <div className="phishingphrenzy_website_preview">
              <div className="phishingphrenzy_website_header">
                <h3>{item.title}</h3>
              </div>
              <div className="phishingphrenzy_website_content">
                {item.content}
              </div>
              {item.formFields && (
                <div className="phishingphrenzy_website_form">
                  {item.formFields.map((field, idx) => (
                    <div className="phishingphrenzy_form_field" key={idx}>
                      <label>{field.label}</label>
                      <input 
                        type={field.type} 
                        placeholder={field.placeholder}
                        disabled 
                      />
                    </div>
                  ))}
                  <button className="phishingphrenzy_form_submit" disabled>
                    {item.submitButton || "Submit"}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'sms':
        return (
          <div className="phishingphrenzy_phishing_sms">
            <div className="phishingphrenzy_sms_from">
              From: {item.from}
            </div>
            <div className="phishingphrenzy_sms_message">
              {item.message}
            </div>
            {item.links && item.links.length > 0 && (
              <div className="phishingphrenzy_sms_links">
                {item.links.map((link, idx) => (
                  <div className="phishingphrenzy_sms_link" key={idx}>
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
        return <FaEnvelope className="phishingphrenzy_card_icon" />;
      case 'website':
        return <FaGlobe className="phishingphrenzy_card_icon" />;
      case 'sms':
        return <FaCommentAlt className="phishingphrenzy_card_icon" />;
      default:
        return null;
    }
  };

  return (
    <div className={`phishingphrenzy_card_container ${item.type}-card`}>
      <div className="phishingphrenzy_card_header">
        {getCardIcon()}
        <span className="phishingphrenzy_card_type">
          {item.type === 'email' ? 'Email Message' : 
           item.type === 'website' ? 'Website' : 
           item.type === 'sms' ? 'SMS Message' : 'Unknown'}
        </span>
      </div>
      <div className="phishingphrenzy_card_content">
        {renderContent()}
      </div>
      <div className="phishingphrenzy_card_instruction">
        <strong>Is this a phishing attempt?</strong>
      </div>
    </div>
  );
};

export default PhishingCard;
