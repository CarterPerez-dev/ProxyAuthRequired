import React from 'react';
import './About.css'; 


function About() {
  return (
    <div className="about-page-container">
      {/* About Section */}
      <div className="about-content">
        <h1 className="about-main-header orbitron-font">About ProxyAuthRequired</h1>

        
        <section className="about-intro">
          <p>
            ProxyAuthRequired is your personal launchpad into the realm of cybersecurity, combining a variety of tools—like analogy-driven explanations, daily newsletters, targeted test questions, and well-organized study materials—into one cohesive platform. Designed by Carter, an integration tech at Sealing Tech who thrives on making hard concepts understandable, ProxyAuthRequired encourages learners to explore content on their own terms. With its fusion of practical learning and interactive experiences, you'll move beyond rote memorization to truly grasp the why behind cybersecurity practices.
          </p>
          <p>
            The result is a fun, immersive environment where theory meets real-world practice, ensuring you grow from curious beginner to confident professional.
          </p>
        </section>

        {/* Tools Section */}
        <section className="about-tools">
          <div className="tool-column">
            <div className="tool-card">
              <h3>Xploitcraft</h3>
              <p>Xploitcraft allows you to specify a vulnerability and or an evasion technique, then generates a realistic payload that attackers might use. By seeing this code in action, you gain insight into the logic and methods behind sophisticated exploits.</p>
            </div>
            <div className="tool-card">
              <h3>Log Analysis</h3>
              <p>Log Analysis equips you with the tools to interpret raw system logs and spot hidden patterns. You can dive into simulated logs, tweak complexity settings, and uncover suspicious activities that hint at breaches or policy violations. By practicing on varied datasets, you develop the skill to sift through noise, identify critical events, and piece together a coherent timeline of incidents. Over multiple sessions, you’ll refine your investigative techniques, learn which anomalies to flag, and how to draw meaningful conclusions.</p>
            </div>
          </div>

          <div className="tool-column">
            <div className="tool-card">
              <h3>AnalogyHub</h3>
              <p>AnalogyHub takes the complex world of cybersecurity and translates it into vivid, relatable metaphors. Instead of wading through dense technical jargon, you’ll discover comparisons that turn complicated protocols into familiar concepts—like comparing cryptography keys to house keys, or firewalls to castle walls. Each analogy aims to clarify, entertain, and embed the lesson into your memory. As you explore more metaphors, you’ll find it easier to understand advanced topics like zero-trust architectures or network segmentation.</p>
            </div>
            <div className="tool-card">
              <h3>GRC Wizard</h3>
              <p>GRC Wizard demystifies Governance, Risk, and Compliance frameworks, guiding you step-by-step through complex policies and standards. You can specify difficulty levels and choose particular categories—or let it pick one at random—to generate a focused test question. By tackling these questions, you’ll learn how to navigate regulatory mandates, implement controls, and manage risks efficiently. </p>
            </div>
          </div>


          <div className="tool-column">
            <div className="tool-card">
              <h3>Scenario Sphere</h3>
              <p>Scenario Sphere transports you into a tailored cybersecurity incident, letting you pick the threat type, skill level, and over 2000 different types of attacks to choose from. Once set, it generates a realistic scenario that immerses you in the crisis, compelling you to think critically. After presenting the context, it provides four thought-provoking test questions, ensuring you truly internalize the lesson. By solving these scenario-based challenges, you sharpen your decision-making and adaptability under pressure.</p>
            </div>
            <div className="tool-card">
              <h3>Daily Cyber Brief</h3>
              <p>Daily Cyber Brief delivers curated cybersecurity news, updates, CompTIA objectives, study tips, and best practices straight to your inbox each morning. Its concise format ensures you stay informed without feeling overwhelmed—just enough to keep you aware of evolving threats and defenses. By regularly receiving these summaries, you’ll maintain a steady awareness of industry shifts, from newly discovered vulnerabilities to emerging compliance requirements.</p>
            </div>
          </div>
        </section>


        <section className="about-certifications">
          <div className="certifications-list">
            <div>
              <h3>Current Certifications ---</h3>
              <ul>
                <li>CompTIA A+</li>
                <li>CompTIA Network+</li>
                <li>CompTIA Security+</li>
                <li>CompTIA CySa+</li>
                <li>CompTIA Pentest+</li>
                <li>CompTIA CASP+</li>
                <li>Python PCEP</li>
              </ul>
            </div>
            <div>
              <h3> --- In Progress/Up Next</h3>
              <ul>
                <li>CISSP</li>
                <li>OSCP</li>
                <li>OSWA</li>
                <li>OSWE</li>
                <li>OSEP</li>
                <li>OSMR</li>
                <li>OSED</li>
              </ul>
            </div>
          </div>
        </section>


        <section className="about-links">
          <h2 className="links-title">Links</h2>
          <div className="links-container">
            <p>
              <strong className="github-title">GitHub:</strong> 
              <a className="repository-link" href="https://github.com/Yoshi2003/ProxyAuthRequired" target="_blank" rel="noopener noreferrer">Repository</a>
            </p>
            <p>
              <strong className="linkedin-title">LinkedIn:</strong> 
              <a className="linkedin-link" href="https://www.linkedin.com/in/carter-perez-ProxyAuthRequired/" target="_blank" rel="noopener noreferrer">Carter's LinkedIn</a>
            </p>
          </div>
        </section>

        {/* About Carter Section */}
        <section className="about-carter">
          <h2 className="carter-title">About Carter</h2>
          <p className="carter-description">
           My name is Carter, I’m 21, and I work as an Integration Technician at Sealing Tech. Im driven by a passion for making cybersecurity learning both accessible and engaging. Just a year ago, I was a General Manager in the fast-food industry, but I decided to pivot toward a field that truly excites me. Now, I’m pursuing a master’s degree in Cybersecurity at UMGC while building a career that aligns with my goals and interests.

My favorite show, Mr. Robot, inspires not only my mindset but also the aesthetic of this website—it’s a nod to the hacker culture that first sparked my curiosity in the field. Outside of work, I’m always challenging myself to learn and grow. One way I do this is by diving into certifications, aiming to complete them as efficiently as possible. It’s a rewarding way to learn new things, and deepen my expertise while tackling new challenges.

I also enjoy programming, web design, and creating tools to make life easier. Whether it’s writing scripts to streamline workflows or building applications just for fun, I love the mix of creativity and problem-solving. My long-term goals include growing into a cybersecurity analyst role, then transitioning into penetration testing. Eventually, I hope to step into a Chief Technology Officer (CTO) position—or even launch my own cybersecurity company.

By the way, there is a simple little Easter Egg in this website, look through my git repo to find it or solve the riddle.
 
 Riddle............ I’m the master of all, the start of the chain,
Tap me once, and I’ll remain.
Twice, however, and you’ll see,
What lies behind the root of me.
          </p>
        </section>

        {/* Contact Section */}
        <section className="contact-section pulse-on-hover">
          <h2 className="section-title-glitch">Contact</h2>
          <p>Phone: <span className="purple-text">443-510-0866</span></p>
          <p>
            Email: 
            <a 
              href="mailto:CarterPerez-dev@ProxyAuthRequired.com"
              className="custom-email-link"
            >
              CarterPerez-dev@ProxyAuthRequired.com
            </a>
          </p>
        </section>

        {/* ReadMe Section */}
        <section className="readme-section pulse-on-hover">
          <h2 className="section-title-glitch">ReadMe</h2>
          <div className="readme-links">
            <a href="https://github.com/CarterPerez-dev/ProxyAuthRequired/blob/main/README.md" target="_blank" rel="noopener noreferrer">README.md </a>
            <a href="https://github.com/CarterPerez-dev/ProxyAuthRequired/blob/main/AWS.md" target="_blank" rel="noopener noreferrer">AWS.md </a>
            <a href="https://github.com/CarterPerez-dev/ProxyAuthRequired/blob/main/INSTALL.md" target="_blank" rel="noopener noreferrer">INSTALL.md </a>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="portfolio-section">
          <h2 className="section-title-glitch ">Portfolio</h2>
          <p>
            Check out my{" "}
            <a href="/myportfolio" target="_blank" rel="noopener noreferrer">
              Portfolio
            </a> 
          </p>
        </section>
      </div>

      <footer className="about-footer">
        <p>© 2025 ProxyAuthRequired. Developed and Designed by Carter Perez.</p>
      </footer>
    </div>
  );
}

export default About;

