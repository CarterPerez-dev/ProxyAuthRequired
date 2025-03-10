// src/components/pages/Info/ContactPage.js
import React, { useState } from 'react';
import { 
  FaEnvelope, 
  FaPaperPlane, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaReddit, 
  FaFacebook,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';
import InfoNavbar from './InfoNavbar';
import Footer from '../../Footer';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    
    // Message validation
    if (!formData.message) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

 // Updated handleSubmit function for ContactPage.js

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate form
  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }
  
  setIsSubmitting(true);
  setSubmitStatus(null);
  
  try {
    // Call the actual API endpoint
    const response = await fetch('/api/contact-form/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        message: formData.message
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      // Success case
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        email: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } else {
      // API returned an error
      console.error('Error submitting form:', data.error);
      setSubmitStatus('error');
    }
  } catch (error) {
    console.error('Network error submitting form:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="contact-container">
      <InfoNavbar />
      
      <div className="contact-content">
        <div className="contact-header">
          <h1 className="contact-title">
            <FaEnvelope className="title-icon" />
            Contact Us
          </h1>
          <p className="contact-subtitle">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-form-container">
            <div className="contact-form-card">
              <h2>Send us a message</h2>
              
              {submitStatus === 'success' && (
                <div className="form-success">
                  <FaCheck className="success-icon" />
                  <p>Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-error">
                  <FaExclamationTriangle className="error-icon" />
                  <p>There was an error sending your message. Please try again later.</p>
                </div>
              )}
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    className={formErrors.email ? 'input-error' : ''}
                  />
                  {formErrors.email && (
                    <div className="error-message">{formErrors.email}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What would you like to tell us?"
                    rows="6"
                    disabled={isSubmitting}
                    className={formErrors.message ? 'input-error' : ''}
                  ></textarea>
                  {formErrors.message && (
                    <div className="error-message">{formErrors.message}</div>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="send-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="submitting">
                      <span className="spinner"></span>
                      Sending...
                    </span>
                  ) : (
                    <span className="send-text">
                      <FaPaperPlane className="send-icon" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="contact-info-container">
            <div className="contact-info-card">
              <h2>Get in Touch</h2>
              
              <div className="contact-channels">
                <div className="contact-channel">
                  <div className="channel-icon">
                    <FaEnvelope />
                  </div>
                  <div className="channel-details">
                    <h3>Support Email</h3>
                    <p>support@certgames.com</p>
                    <p className="response-time">Usually responds within 24 hours</p>
                  </div>
                </div>
                
                <div className="contact-channel">
                  <div className="channel-icon business">
                    <FaEnvelope />
                  </div>
                  <div className="channel-details">
                    <h3>Business Inquiries</h3>
                    <p>inquiry@certgames.com</p>
                    <p className="response-time">For partnership opportunities</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                  <a href="https://www.linkedin.com/company/certgames/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    <FaLinkedin />
                  </a>
                  <a href="https://x.com/CertsGamified" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                    <FaTwitter />
                  </a>
                  <a href="https://www.instagram.com/certsgamified/" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://www.reddit.com/user/Hopeful_Beat7161/" target="_blank" rel="noopener noreferrer" className="social-icon reddit">
                    <FaReddit />
                  </a>
                  <a href="https://www.facebook.com/people/CertGames/61574087485497/" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                    <FaFacebook />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="faq-section">
              <h3>Frequently Asked Questions</h3>
              
              <div className="faq-item">
                <h4>How do I reset my password?</h4>
                <p>You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions sent to your email.</p>
              </div>
              
              <div className="faq-item">
                <h4>How do I cancel my subscription?</h4>
                <p>You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.</p>
              </div>
              
              <div className="faq-item">
                <h4>Can I access CertGames on my mobile device?</h4>
                <p>Yes! CertGames is fully responsive and works on all devices, including mobile phones and tablets.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
