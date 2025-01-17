// components/EasterEgg/Portfolio.js
import React, { useState } from 'react';
import './Portfolio.css';


import meImage from './me.png';
import AImg from './A.png';
import NetImg from './network.png';
import SecImg from './sec.png';
import CysaImg from './cysa.png';
import CaspImg from './CASP.png';
import PentestImg from './pentest.png';
import PcepImg from './pcep.png';


import Project1Img from './project1.jpg';
import Project2Img from './project2.jpg';
import Resume from './CarterPerez.pdf';


function Portfolio() {
  const [showEggMessage, setShowEggMessage] = useState(false);

  const handleRootClick = () => {
    setShowEggMessage(true);
    setTimeout(() => {
      setShowEggMessage(false);
    }, 7000);
  };

  return (
    <div className="portfolio-container">
      {showEggMessage && (
        <div className="egg-popup">
          <p>Nice job on finding the Easter Egg—root is me lol!...........get it?  😅 👉👈</p>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content ">
          <h1 className="hero-title portfolio-glitch">Carter Perez Portfolio</h1>
          <p className="hero-subtitle">
            <span>Integration Technician</span> | <span>Cybersecurity Enthusiast</span>
          </p>
          <div className="hero-avatar">
            <img
              src={meImage}
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div className="tiny-root" onClick={handleRootClick}>
            Did you click root@ twice in the Sidebar to find this page?
          </div>
        </div>
      </section>

      {/* ABOUT MY WORK/JOB SECTION */}
      <section className="about-work fade-in">
        <h2 className="section-title">Where I Work</h2>
        <div className="work-details">
          <p>
            I work at SealingTech as a System Integration Technician, where I build and configure custom cybersecurity and defense systems. My focus is on designing secure, reliable environments that meet client needs and perform under demanding conditions. I handle system assembly, optimization, and testing to ensure everything operates smoothly and efficiently. With attention to detail and quality, I help deliver solutions that support critical operations and long-term scalability.
          </p>
          <p>
            Outside the 9-to-5, I’m constantly learning new skills—ranging from penetration testing labs to advanced programming. 
            I believe in pushing the boundaries of what’s possible through curiosity and creative problem-solving.
          </p>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="projects-section fade-in">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card pulse-hover">
            <img
              src={Project1Img}
              alt="Project 1"
              className="project-image"
            />
            <div className="project-info">
              <h3>www.ProxyAuthrequired.com</h3>
              <p>
                ProxyAuthRequired.com is a centralized cybersecurity platform that merges AI-driven simulations, hands-on learning modules, and a robust Resource Hub to help users at any level sharpen their skills. It includes tools like GRC Wizard for compliance questions, Log Analysis for real-time practice, and scenario-based exercises for incident response. By combining interactive content with up-to-date threats and exam objectives, ProxyAuthRequired.com strives to be a single-stop solution for professionals, students, and educators looking to elevate their cybersecurity knowledge and readiness.
              </p>
              {/* GitHub link for Project One */}
              <p>
                <a
                  href="https://github.com/CarterPerez-dev/ProxyAuthRequired"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </p>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card pulse-hover">
            <img
              src={Project2Img}
              alt="Project 2"
              className="project-image"
            />
            <div className="project-info">
              <h3>AutoApplication</h3>
              <p>
                Auto apply bot for Indeed and Linkiden
              </p>
              <p>
                <a
                  href="https://github.com/CarterPerez-dev/AutoApplication"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View On Github
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section className="certifications-section fade-in">
        <h2 className="section-title">Certifications</h2>
        <div className="certs-grid">
          <div className="cert-card scale-hover">
            <a href={AImg} target="_blank" rel="noopener noreferrer">
              <img src={AImg} alt="Certification A+" className="cert-image" />
            </a>
            <p>CompTIA A+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={NetImg} target="_blank" rel="noopener noreferrer">
              <img src={NetImg} alt="Certification Net+" className="cert-image" />
            </a>
            <p>CompTIA Network+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={SecImg} target="_blank" rel="noopener noreferrer">
              <img src={SecImg} alt="Certification Sec+" className="cert-image" />
            </a>
            <p>CompTIA Security+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={CysaImg} target="_blank" rel="noopener noreferrer">
              <img src={CysaImg} alt="Certification CySa+" className="cert-image" />
            </a>
            <p>CompTIA CySa+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={CaspImg} target="_blank" rel="noopener noreferrer">
              <img src={CaspImg} alt="Certification CASP+" className="cert-image" />
            </a>
            <p>CompTIA CASP+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={PentestImg} target="_blank" rel="noopener noreferrer">
              <img src={PentestImg} alt="Certification Pentest+" className="cert-image" />
            </a>
            <p>CompTIA Pentest+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={PcepImg} target="_blank" rel="noopener noreferrer">
              <img src={PcepImg} alt="Certification Python PCEP" className="cert-image" />
            </a>
            <p>Python PCEP</p>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="blog-section fade-in">
        <h2 className="section-title">My Blog</h2>
        <div className="blog-list">
          <div className="blog-post tilt-hover">
            <h3>Building Custom Solutions with Quality at the Core</h3>
            <p>
              The blog highlights the role of a System Integration Technician at SealingTech, showcasing how custom defense and cybersecurity systems are designed and built to meet specific client needs. It dives into the process of selecting and configuring hardware, optimizing system performance, and ensuring quality through rigorous testing and ISO 9001 standards. The post also explores the importance of cable management, airflow, and modular design in creating reliable, scalable solutions that support critical operations.
            </p>
            <a
              href="https://www.sealingtech.com/2024/10/03/building-custom-solutions-with-quality-at-the-core/"
              target="_blank"
              rel="noopener noreferrer"
              className="blog-link"
            >
              Read More
            </a>
          </div>
          {/* Another blog post */}
          <div className="blog-post tilt-hover">
            <h3>Coming Soon</h3>
            <p>
              This blog I am currently still in the process of writing.
            </p>
            <a href="https://www.sealingtech.com/" target="_blank" rel="noopener noreferrer" className="blog-link">
              Read More
            </a>
          </div>
        </div>
      </section>

      {/* RESUME SECTION */}
      <section className="resume-section fade-in">
        <h2 className="section-title">My Résumé</h2>
        <div className="resume-info">
          <p>View or download my detailed résumé below:</p>
          <a 
            href={Resume}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link"
          >
            Check Out My Résumé
          </a>
        </div>
      </section>

      {/* CONTACT & SOCIALS SECTION */}
      <section className="contact-social-section fade-in">
        <h2 className="section-title">Contact & Social</h2>
        <div className="contact-info">
          <p>Phone: <span className="accent-text">443-510-0866</span></p>
          <p>
            Email:{' '}
            <a
              href="mailto:CarterPerez-dev@ProxyAuthRequired.com"
              className="accent-link"
            >
              CarterPerez-dev@ProxyAuthRequired.com
            </a>
          </p>
        </div>
        <div className="social-links">
          <a
            href="https://github.com/CarterPerez-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/carter-perez-ProxyAuthRequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="portfolio-footer">
        <p>© {new Date().getFullYear()} Carter Perez - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Portfolio;

