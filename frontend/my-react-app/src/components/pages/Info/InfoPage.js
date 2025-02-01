// src/components/pages/InfoPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaQuestionCircle, 
  FaRocket, 
  FaTrophy, 
  FaRegNewspaper, 
  FaVideo, 
  FaLaptopCode, 
  FaShieldAlt,
  FaEnvelopeOpenText,
  FaDesktop
} from 'react-icons/fa';
import './InfoPage.css';

const InfoPage = () => {
  return (
    <div className="info-container">
      <header className="info-header">
        <h1 className="site-title">proxyauthrequired.com</h1>
        <p className="tagline">
          Your Ultimate Digital Hub for Exam Mastery &amp; Interactive Tools
        </p>
        <div className="auth-buttons">
          <Link to="/register" className="auth-btn register-btn">
            Register Now
          </Link>
          <Link to="/login" className="auth-btn login-btn">
            Login
          </Link>
        </div>
        <p className="subscription-info">
          Unlock unlimited access to <span className="price">8,000+</span> practice questions, interactive labs, leaderboards, achievements and more—for only <span className="price">$10/month</span>.
        </p>
      </header>

      <section className="info-features">
        {/* Feature Box 1 */}
        <div className="feature">
          <FaQuestionCircle className="feature-icon" style={{ color: "#ff5555" }} />
          <h2 className="feature-title">Massive Question Bank</h2>
          <p className="feature-text">
            Access over <span className="price">8,000+</span> practice questions organized into 120 tests covering A+ Core 1 &amp; 2, Security+, Network+, CySa+, Pentest+, CASP+ and more.
            Enhance your learning with detailed explanations for every question.
          </p>
        </div>
        {/* Feature Box 2 */}
        <div className="feature">
          <FaRocket className="feature-icon" style={{ color: "#ffa500" }} />
          <h2 className="feature-title">Gamified Learning</h2>
          <p className="feature-text">
            Earn coins for every correct answer, level up, and unlock awesome badges, avatars, and power‑ups.
            Enjoy a fun, interactive study experience that keeps you engaged.
          </p>
        </div>
        {/* Feature Box 3 */}
        <div className="feature">
          <FaTrophy className="feature-icon" style={{ color: "#ffd700" }} />
          <h2 className="feature-title">Achievements &amp; Leaderboards</h2>
          <p className="feature-text">
            Compete with peers and unlock achievements as you climb the leaderboard.
            Showcase your progress and celebrate every milestone.
          </p>
        </div>
        {/* Feature Box 4 */}
        <div className="feature">
          <FaRegNewspaper className="feature-icon" style={{ color: "#00ced1" }} />
          <h2 className="feature-title">Resource Hub &amp; Newsletter</h2>
          <p className="feature-text">
            Discover curated courses, top YouTube playlists, and the best cybersecurity tools.
            Subscribe to our newsletter for weekly exam tips and study insights.
          </p>
        </div>
        {/* Feature Box 5 */}
        <div className="feature">
          <FaVideo className="feature-icon" style={{ color: "#1e90ff" }} />
          <h2 className="feature-title">Interactive Labs &amp; Tools</h2>
          <p className="feature-text">
            Experiment with hands-on tools like Xploitcraft, Scenario Sphere, Analogy Hub, Log Analysis, and our GRC generator.
            Experience dynamic, real‑time simulations to hone your skills.
          </p>
        </div>
        {/* Feature Box 6 */}
        <div className="feature">
          <FaLaptopCode className="feature-icon" style={{ color: "#32cd32" }} />
          <h2 className="feature-title">One-Stop Study Platform</h2>
          <p className="feature-text">
            No more searching across multiple sites – everything you need for CompTIA exam prep is in one sleek, unified platform.
            Streamline your study process effortlessly.
          </p>
        </div>
        {/* Feature Box 7 */}
        <div className="feature">
          <FaShieldAlt className="feature-icon" style={{ color: "#8a2be2" }} />
          <h2 className="feature-title">Secure &amp; Reliable</h2>
          <p className="feature-text">
            Benefit from a high‑performance, secure platform designed with robust measures.
            Study with confidence knowing your data is protected.
          </p>
        </div>
        {/* Feature Box 8 */}
        <div className="feature">
          <FaEnvelopeOpenText className="feature-icon" style={{ color: "#ff69b4" }} />
          <h2 className="feature-title">24-Hour Support</h2>
          <p className="feature-text">
            Have questions? Email us anytime with your queries regarding the exams, the website, or the practice questions.
            We promise a response within 24 hours.
          </p>
        </div>
        {/* Feature Box 9 */}
        <div className="feature">
          <FaDesktop className="feature-icon" style={{ color: "#00fa9a" }} />
          <h2 className="feature-title">Unified Study Dashboard</h2>
          <p className="feature-text">
            Manage your practice tests, track your progress, and access all tools from one seamless dashboard.
            Everything is integrated to provide you with a hassle-free study experience.
          </p>
        </div>
      </section>

      <section className="info-cta">
        <p className="cta-text">
          Ready to revolutionize your exam prep? Join us for unlimited access to interactive tools, a massive question bank, and more!
        </p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-btn register-btn">Register Now</Link>
          <Link to="/login" className="cta-btn login-btn">Login</Link>
        </div>
      </section>

      <footer className="info-footer">
        <p>&copy; {new Date().getFullYear()} proxyauthrequired.com. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InfoPage;

