So i have oauth for google, and in order ot actually haev users use it aside from just you adn your test users you must publish/verify your app/wesbite. so they haev a bunch of requriemnts to like essentially get verified- ill porvide you all the documentation regaridng that from google



here-
Skip to main content
Google Cloud Platform Console
Verification requirements
This is NOT a policy document. The Google’s API Terms of Service and Google API Services User Data Policygoverns the use of all Google API Services when you, the developer, request access to user data. For product specific API policies please refer to the respective product's policy document.
The intent of this document is to serve as a guide to navigate Google's OAuth App verification process.
Before you start…
Please note that certain app scenarios are exempt from these verification requirements. Review the "When is verification not needed" section to learn more.

Also, ensure that your project contact information is set up correctly for your project as we will use this to contact you about app verification requirements.  

Brand verification requirements
All apps that access Google APIs must verify that they accurately represent their identity and intent as specified by Google’s API Terms of Service, API Services User Data Policy, and product-specific Google Developer Policy. We call this step “brand verification,” which includes the following requirements:

1. Homepage Requirements
Your app homepage must meet the following requirements:

The homepage must be hosted on a verified domain you own
The homepage must accurately represent and identify your app or brand
The homepage must describe your app’s functionality to its users. Your homepage can not be only a login page
You must add the link of your privacy policy to your homepage and this link should match the link you added on your OAuth consent screen configuration
2. Privacy Policy
Your Privacy Policy and in-product privacy notifications must meet the following requirements:

The Privacy Policy should be hosted within the domain that hosts your homepage
The Privacy Policy should be linked on your homepage so that users can find this information easily
The Privacy Policy must be linked from the OAuth consent screen on the Google API Console
The Privacy Policy linked on your homepage and the one linked on the app’s OAuth consent screen should be same
The Privacy Policy, together with your product-specific privacy disclosures, must disclose how your app accesses, uses, stores, and/or shares Google user data.
Your use of Google user data must be limited to the practices disclosed in your published Privacy Policy and should conform with Google’s Limited use requirements
In-product privacy notifications must be prominently displayed in your app interface so that users can find this information easily.
Your Privacy Policy and in-product privacy notification must be kept up to date about how your app uses Google user data.
3. Verify Domain Ownership
You must verify that you own all domains listed in your Authorized domains section of the OAuth consent screen editor. 
An account listed as a project owner or editor on your GCP account must verify ownership of the authorized domain using Google Search Console. For more information about domain verifications in Google Search Console, see Verify your site ownership.
4. Google Branding
Buttons or links that initiate an action on a Google product must follow the Google branding guidelines.
For example, the clickable button in your app that initiates the user action to grant (authorize) access to their data should satisfy this requirement.
Some products have specific branding guidelines. Your app must comply with the branding guidelines of the Google product API being requested.
Helpful Tip: Sign-in branding guidelines are recommended for apps requesting only “profile or email” scopes.
6. Up-to-date Project Contact Information
Google teams use the contact listed on the Project Cloud Console to communicate any new requirements or updates regarding your app.
You must maintain up-to-date contact information to keep you and your team members aware of any changes.
Learn more about Project Contacts.
How to manage Project Ownership.
Caution: Failure to act on timely notifications about your project could result in the loss of access to Google APIs.
Sensitive and Restricted Scope Requirements
Apps requesting access to sensitive or restricted scopes must complete the following requirements in addition to Brand Verification Requirements:

1. Scopes access is only permitted for limited app types
Apps can request access to sensitive or restricted scopes data only for appropriate use cases

During an app’s review process the functionality of an app is reviewed to determine if it can be considered an appropriate use case

Here are few examples, to help understand what an appropriate use case may constitute:

Gmail
Google Drive
Google Fit
Google Photos
Approved app types often use APIs for “productivity” purposes. Productivity purposes include a) purposes adding new user facing features extending beyond the core functionality of the product or service, b) purposes contributing to an identifiable user benefit, and/or c) purposes increasing the efficiency of a product or service feature or user action.

2. App functionality demonstration video
We need to gain a good understanding of your app’s functionality and your compliance with the Google API Services User Data Policy and, if applicable, the product-specific policy on the Google Developer Page. In order to do this, we ask you to provide a link to a demonstration video of your app when submitting your app for verification. The video must meet the following requirements:

Must show the end-to-end flow of your app including the OAuth grant process
Must show the same application you have submitted for verification (including app name, branding)
Show the complete OAuth Consent Screen. The consent screen must also show the same exact scopes you are requesting (or you have already been verified for) when you submit your app for re-verification. Please ensure the language setting on the bottom-left corner of the consent screen is toggled to “English”. 
Note: OAuth 2.0 Policies and Transparent and Accurate Notice and Control Clauses require affirmative consent and user consent. This means that your demonstration video must meet the requirement outlined here, additionally if your application transfers data for AI model training, under the approved use cases described above, your demonstration video must show the flow of the user explicitly consenting to their data used for personalized AI model training.
Must demonstrate the app functionalities that utilize the requested OAuth scopes
3. Data obtained through the API is subject to limited uses
The raw data obtained through Google APIs, along with any data aggregated, anonymized, or derived from the raw data must be handled in accordance with the following requirements:
Data must only be used to provide or improve user-facing features that are prominent in the requesting app's user interface;
Transfers of data are not allowed, except:
To provide or improve your appropriate access or user-facing features that are visible and prominent in the requesting app's user interface and only with the user's consent;
For security purposes (for example, investigating abuse);
To comply with applicable laws; or,
As part of a merger, acquisition, or sale of assets of the developer after obtaining explicit prior consent from the user.
Humans are not allowed to read the data, unless:
You first obtained the user's affirmative agreement to view specific messages, files, or other data, with the limited exception of use cases approved by Google under additional terms applicable to the Nest Device Access program
It is necessary for security purposes (for example, investigating a bug or abuse);
It is necessary to comply with applicable law; or
The data (including derivations) is aggregated and used for internal operations in accordance with applicable privacy and other jurisdictional legal requirements.
All other transfers, uses, or sales of user data are prohibited, including:
Transferring or selling user data to third parties like advertising platforms, data brokers, or any information resellers.
Transferring, selling, or using user data for serving ads, including retargeting, personalized or interest-based advertising.
Transferring, selling, or using user data to determine credit-worthiness or for lending purposes.
Your employees, agents, contractors, and successors must comply with Google API Services User Data Policy.

4. Request narrowest scopes
All access to Google APIs must adhere to the principle of minimum required scopes, which requires:
Do not request access to data you do not need
Do not request access to data based on “future enhancements” that has not been implemented yet in your app
You must only request the narrowest scope(s) your app needs to function
You must provide a detailed justification for your requested scope(s) which should include 
An explanation why narrower scopes would not work, including specifics on what functionality would not work as intended.
We will assess your justification and seek additional clarification as required. If the requested scope(s) goes beyond the usage needed, you will be directed to request a narrower scope to proceed with verification. 
If your justification is deemed insufficient, your app verification request may be rejected.

Example of an acceptable justification: My app will use https://www.googleapis.com/auth/calendar to show a user's Google calendar data on the scheduling screen of my app, so that users can manage their schedules through my app and sync the changes with their Google calendar.

5. Security Assessment ( For restricted scopes only)
Apps requesting access to restricted scopes must meet the additional requirement of secure data handling by submitting to an annual security assessment from a Google empanelled group of security assessors. See the security assessment section to learn more.

Give feedback about this article
Was this helpful?YesNo
Support
OAuth App Verification Help Center
Submitting your app for verification
Verification requirements
When is verification not needed
Security Assessment
Annual Recertification
Changes to approved app
Restricted Scopes
Frequently Asked Questions
Quick Reference Guides
©2025 Google  Privacy Policy  Terms of Service
Language












ok so now that you have a thoruroigh undertstanding ofgoogle verification requiremnts, idk know what i need to have or write or whatver whatver

so scan all my files realting to all that- so far i have a home page, prvacy policy, and terms of srevice, maek sure it has all the info it needs and stuff- then verify my login and register oages t see if they are all good and stuff

and anything else i migth be missing or somehting


// src/components/pages/PrivacyPolicy.js
import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import './LegalPages.css';
import { FaAngleUp, FaPrint, FaExternalLinkAlt, FaBook, FaArrowLeft, FaInfoCircle, FaLock } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('.legal-section');
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop - 100 && 
            window.pageYOffset < sectionTop + sectionHeight - 100) {
          currentSection = section.id;
        }
      });
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  // Auto-scroll to section if hash is present in URL
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigate back
  const goBack = () => {
    window.history.back();
  };

  // Sections for table of contents
  const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'information', title: '2. Information We Collect' },
    { id: 'use', title: '3. How We Use Your Information' },
    { id: 'share', title: '4. How We Share Your Information' },
    { id: 'security', title: '5. Data Security' },
    { id: 'rights', title: '6. Your Data Rights' },
    { id: 'cookies', title: '7. Cookies and Similar Technologies' },
    { id: 'authentication', title: '8. Third-Party Authentication' },
    { id: 'children', title: '9. Children\'s Privacy' },
    { id: 'international', title: '10. International Data Transfers' },
    { id: 'retention', title: '11. Data Retention' },
    { id: 'changes', title: '12. Changes to This Privacy Policy' },
    { id: 'contact', title: '13. Contact Us' },
  ];

  return (
    <div className="legal-container">
      <div className="legal-header-accent"></div>
      <div className="legal-content">
        <button className="legal-back-button" onClick={goBack}>
          <FaArrowLeft /> Back
        </button>
        
        <div className="legal-document-header">
          <FaLock className="legal-header-icon" />
          <div className="legal-title-wrapper">
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-date">Last updated: March 7, 2025</p>
          </div>
        </div>
        
        <div className="legal-summary-card">
          <div className="legal-summary-header">
            <FaInfoCircle className="legal-summary-icon" />
            <h3>Document Summary</h3>
          </div>
          <p>
            This Privacy Policy explains how we collect, use, and protect your personal information. 
            We value your privacy and are committed to transparency about our data practices.
          </p>
        </div>
        
        {/* Table of Contents */}
        <div className="legal-toc-container">
          <div className="legal-toc">
            <div className="legal-toc-header">
              <FaBook className="legal-toc-icon" />
              <div className="legal-toc-title">Table of Contents</div>
            </div>
            <ul className="legal-toc-list">
              {sections.map((section) => (
                <li key={section.id} className={activeSection === section.id ? 'legal-active-section' : ''}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="legal-document-body">
          <section id="introduction" className="legal-section">
            <h2>1. Introduction</h2>
            <div className="legal-section-content">
              <p>
                This Privacy Policy explains how Cert Games ("we", "us", or "our") collects, uses, and shares your information when you use our website and services at certgames.com.
              </p>
              <p>
                We take your privacy seriously and are committed to protecting your personal information. Please read this policy carefully to understand our practices regarding your data.
              </p>
            </div>
          </section>
          
          <section id="information" className="legal-section">
            <h2>2. Information We Collect</h2>
            <div className="legal-section-content">
              <p>We collect several types of information from and about users of our website, including:</p>
              <ul className="legal-list">
                <li><strong>Personal Information:</strong> This includes your name, email address, and username when you register for an account.</li>
                <li><strong>Authentication Information:</strong> When you sign in using Google or Apple authentication services, we receive basic profile information such as your name and email address.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including tests taken, scores, achievements, and usage patterns.</li>
                <li><strong>Payment Information:</strong> When you purchase a subscription, payment information is processed by our payment provider. We do not store complete payment details on our servers.</li>
                <li><strong>Device Information:</strong> We may collect information about your device, including your IP address, browser type, operating system, and other technical details.</li>
              </ul>
            </div>
          </section>
          
          <section id="use" className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <div className="legal-section-content">
              <p>We use the information we collect to:</p>
              <ul className="legal-list">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your account registration and maintain your account</li>
                <li>Track your progress, achievements, and leaderboard status</li>
                <li>Communicate with you about your account, updates, or support requests</li>
                <li>Personalize your experience and deliver relevant content</li>
                <li>Process transactions and manage your subscription</li>
                <li>Analyze usage patterns to improve our website and services</li>
                <li>Protect the security and integrity of our platform</li>
              </ul>
            </div>
          </section>
          
          <section id="share" className="legal-section">
            <h2>4. How We Share Your Information</h2>
            <div className="legal-section-content">
              <p>We do not sell your personal information to third parties. We may share your information in the following circumstances:</p>
              <ul className="legal-list">
                <li>With service providers who perform services on our behalf (such as hosting providers and payment processors)</li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
                <li>With your consent or at your direction</li>
              </ul>
              <div className="legal-callout">
                <strong>Note:</strong> When information is shared with service providers, we ensure they have appropriate data protection measures in place.
              </div>
            </div>
          </section>
          
          <section id="security" className="legal-section">
            <h2>5. Data Security</h2>
            <div className="legal-section-content">
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="legal-list">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and testing</li>
                <li>Access controls and authentication requirements</li>
                <li>Monitoring for suspicious activities</li>
              </ul>
              <p>
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </section>
          
          <section id="rights" className="legal-section">
            <h2>6. Your Data Rights</h2>
            <div className="legal-section-content">
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="legal-list">
                <li>Accessing your personal information</li>
                <li>Correcting inaccurate information</li>
                <li>Deleting your information</li>
                <li>Restricting or objecting to certain processing</li>
                <li>Requesting portability of your information</li>
                <li>Withdrawing consent (where processing is based on consent)</li>
              </ul>
              <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>
            </div>
          </section>
          
          <section id="cookies" className="legal-section">
            <h2>7. Cookies and Similar Technologies</h2>
            <div className="legal-section-content">
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are small data files that are placed on your device when you visit our website.
              </p>
              <p>
                We use cookies for the following purposes:
              </p>
              <ul className="legal-list">
                <li>To maintain your session and authentication status</li>
                <li>To remember your preferences and settings</li>
                <li>To analyze how our website is used</li>
                <li>To personalize your experience</li>
              </ul>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our website may not function properly.
              </p>
            </div>
          </section>
          
          <section id="authentication" className="legal-section">
            <h2>8. Third-Party Authentication</h2>
            <div className="legal-section-content">
              <p>
                Our service offers sign-in through Google and Apple authentication services. When you choose to sign in using these services:
              </p>
              <ul className="legal-list">
                <li>We receive basic profile information including your name and email address</li>
                <li>We do not receive your password or account details</li>
                <li>We store a unique identifier to recognize your account</li>
              </ul>
              <p>
                Your use of Google or Apple sign-in is also subject to their respective privacy policies:
              </p>
              <ul className="legal-list">
                <li>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Google Privacy Policy <FaExternalLinkAlt className="legal-external-link-icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">
                    Apple Privacy Policy <FaExternalLinkAlt className="legal-external-link-icon" />
                  </a>
                </li>
              </ul>
            </div>
          </section>
          
          <section id="children" className="legal-section">
            <h2>9. Children's Privacy</h2>
            <div className="legal-section-content">
              <p>
                Our services are not intended for children under 13, and we do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can take appropriate steps.
              </p>
            </div>
          </section>
          
          <section id="international" className="legal-section">
            <h2>10. International Data Transfers</h2>
            <div className="legal-section-content">
              <p>
                Your information may be transferred to and processed in countries other than the one in which you reside. These countries may have data protection laws that are different from the laws of your country.
              </p>
              <p>
                Whenever we transfer your information, we take appropriate safeguards to ensure that your information remains protected in accordance with this Privacy Policy and applicable data protection laws.
              </p>
            </div>
          </section>
          
          <section id="retention" className="legal-section">
            <h2>11. Data Retention</h2>
            <div className="legal-section-content">
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including to satisfy any legal, accounting, or reporting requirements.
              </p>
              <p>
                To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure, and the applicable legal requirements.
              </p>
              <p>
                When we no longer need your personal information, we will securely delete or anonymize it.
              </p>
            </div>
          </section>
          
          <section id="changes" className="legal-section">
            <h2>12. Changes to This Privacy Policy</h2>
            <div className="legal-section-content">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>
          </section>
          
          <section id="contact" className="legal-section">
            <h2>13. Contact Us</h2>
            <div className="legal-section-content">
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="legal-contact-info">
                <p>
                  Email: <a href="mailto:support@certgames.com">support@certgames.com</a>
                </p>
              </div>
            </div>
          </section>
        </div>
        
        {/* Print button */}
        <div className="legal-actions">
          <button onClick={handlePrint} className="legal-print-btn">
            <FaPrint className="legal-print-icon" /> Print this document
          </button>
        </div>
      </div>
      
      {/* Back to top button */}
      <button
        className={`legal-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaAngleUp />
      </button>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;



// src/components/pages/TermsOfService.js
import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import './LegalPages.css';
import { FaAngleUp, FaPrint, FaExternalLinkAlt, FaBook, FaArrowLeft, FaInfoCircle, FaScroll } from 'react-icons/fa';

const TermsOfService = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('.legal-section');
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop - 100 && 
            window.pageYOffset < sectionTop + sectionHeight - 100) {
          currentSection = section.id;
        }
      });
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  // Auto-scroll to section if hash is present in URL
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigate back
  const goBack = () => {
    window.history.back();
  };

  // Sections for table of contents
  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'changes', title: '2. Changes to Terms' },
    { id: 'registration', title: '3. Account Registration' },
    { id: 'subscription', title: '4. Subscription and Payment' },
    { id: 'conduct', title: '5. User Conduct' },
    { id: 'ip', title: '6. Intellectual Property' },
    { id: 'third-party', title: '7. Third-Party Services' },
    { id: 'disclaimer', title: '8. Disclaimer of Warranties' },
    { id: 'liability', title: '9. Limitation of Liability' },
    { id: 'termination', title: '10. Termination' },
    { id: 'governing-law', title: '11. Governing Law' },
    { id: 'contact', title: '12. Contact Us' },
  ];

  return (
    <div className="legal-container">
      <div className="legal-header-accent"></div>
      <div className="legal-content">
        <button className="legal-back-button" onClick={goBack}>
          <FaArrowLeft /> Back
        </button>
        
        <div className="legal-document-header">
          <FaScroll className="legal-header-icon" />
          <div className="legal-title-wrapper">
            <h1 className="legal-title">Terms of Service</h1>
            <p className="legal-date">Last updated: March 7, 2025</p>
          </div>
        </div>
        
        <div className="legal-summary-card">
          <div className="legal-summary-header">
            <FaInfoCircle className="legal-summary-icon" />
            <h3>Document Summary</h3>
          </div>
          <p>
            This document outlines the terms governing your use of our services, including your responsibilities, 
            our obligations, subscription terms, and your rights. By using our platform, you agree to these terms.
          </p>
        </div>
        
        {/* Table of Contents */}
        <div className="legal-toc-container">
          <div className="legal-toc">
            <div className="legal-toc-header">
              <FaBook className="legal-toc-icon" />
              <div className="legal-toc-title">Table of Contents</div>
            </div>
            <ul className="legal-toc-list">
              {sections.map((section) => (
                <li key={section.id} className={activeSection === section.id ? 'legal-active-section' : ''}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="legal-document-body">
          <section id="acceptance" className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <div className="legal-section-content">
              <p>
                Welcome to Cert Games! These Terms of Service ("Terms") govern your access to and use of certgames.com and all related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
              </p>
            </div>
          </section>
          
          <section id="changes" className="legal-section">
            <h2>2. Changes to Terms</h2>
            <div className="legal-section-content">
              <p>
                We may modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>
          </section>
          
          <section id="registration" className="legal-section">
            <h2>3. Account Registration</h2>
            <div className="legal-section-content">
              <p>
                To access certain features of our Services, you must register for an account. You may register directly or through Google or Apple authentication services. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </div>
          </section>
          
          <section id="subscription" className="legal-section">
            <h2>4. Subscription and Payment</h2>
            <div className="legal-section-content">
              <p>
                Some aspects of our Services are available on a subscription basis. By subscribing, you agree to pay the applicable fees. Subscriptions automatically renew unless canceled before the renewal date.
              </p>
              <p>
                All payments are processed through third-party payment processors. Your use of their services is subject to their terms and conditions.
              </p>
              <div className="legal-callout">
                <strong>Note:</strong> You can cancel your subscription at any time through your account settings. Refunds are provided in accordance with our refund policy.
              </div>
            </div>
          </section>
          
          <section id="conduct" className="legal-section">
            <h2>5. User Conduct</h2>
            <div className="legal-section-content">
              <p>
                You agree not to:
              </p>
              <ul className="legal-list">
                <li>Use the Services in any manner that could disable, overburden, damage, or impair the Services</li>
                <li>Use any robot, spider, or other automatic device to access the Services</li>
                <li>Introduce any viruses, trojan horses, worms, or other malicious code</li>
                <li>Attempt to gain unauthorized access to any part of the Services</li>
                <li>Interfere with any other user's use of the Services</li>
                <li>Use the Services for any illegal or unauthorized purpose</li>
                <li>Impersonate or attempt to impersonate Cert Games, a Cert Games employee, another user, or any other person or entity</li>
                <li>Engage in any other conduct that restricts or inhibits anyone's use of the Services</li>
              </ul>
            </div>
          </section>
          
          <section id="ip" className="legal-section">
            <h2>6. Intellectual Property</h2>
            <div className="legal-section-content">
              <p>
                The Services and all content, features, and functionality (including but not limited to text, graphics, software, images, videos, and audio) are owned by Cert Games or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                We grant you a limited, non-exclusive, non-transferable, and revocable license to use the Services for your personal, non-commercial use only.
              </p>
            </div>
          </section>
          
          <section id="third-party" className="legal-section">
            <h2>7. Third-Party Services</h2>
            <div className="legal-section-content">
              <p>
                Our Services may contain links to third-party websites or services that are not owned or controlled by Cert Games. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p>
                When you use Google or Apple authentication, your use is subject to their terms of service and privacy policies:
              </p>
              <ul className="legal-list">
                <li>
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                    Google Terms of Service <FaExternalLinkAlt className="legal-external-link-icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.apple.com/legal/internet-services/itunes/us/terms.html" target="_blank" rel="noopener noreferrer">
                    Apple Terms of Service <FaExternalLinkAlt className="legal-external-link-icon" />
                  </a>
                </li>
              </ul>
            </div>
          </section>
          
          <section id="disclaimer" className="legal-section">
            <h2>8. Disclaimer of Warranties</h2>
            <div className="legal-section-content">
              <p className="legal-important">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </div>
          </section>
          
          <section id="liability" className="legal-section">
            <h2>9. Limitation of Liability</h2>
            <div className="legal-section-content">
              <p className="legal-important">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL CERT GAMES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </div>
          </section>
          
          <section id="termination" className="legal-section">
            <h2>10. Termination</h2>
            <div className="legal-section-content">
              <p>
                We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use the Services will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive termination.
              </p>
            </div>
          </section>
          
          <section id="governing-law" className="legal-section">
            <h2>11. Governing Law</h2>
            <div className="legal-section-content">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located within the United States.
              </p>
            </div>
          </section>
          
          <section id="contact" className="legal-section">
            <h2>12. Contact Us</h2>
            <div className="legal-section-content">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="legal-contact-info">
                <p>
                  Email: <a href="mailto:support@certgames.com">support@certgames.com</a>
                </p>
              </div>
            </div>
          </section>
        </div>
        
        {/* Print button */}
        <div className="legal-actions">
          <button onClick={handlePrint} className="legal-print-btn">
            <FaPrint className="legal-print-icon" /> Print this document
          </button>
        </div>
      </div>
      
      {/* Back to top button */}
      <button
        className={`legal-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaAngleUp />
      </button>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;



// src/components/pages/Info/InfoPage.js
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import InfoNavbar from './InfoNavbar';
import Footer from '../../Footer';
import { 
  FaApple, 
  FaGoogle, 
  FaAppStore, 
  FaPlay, 
  FaArrowRight, 
  FaInfoCircle, 
  FaExternalLinkAlt 
} from 'react-icons/fa';
import './InfoPage.css';

const InfoPage = () => {
  // For tab switching functionality
  const [activeTab, setActiveTab] = useState('comptia');
  
  // For the typing animation effect in hero section
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Level up your cybersecurity skills';
  
  // For counting animation
  const [questionCount, setQuestionCount] = useState(0);
  const [certCount, setCertCount] = useState(0);
  const [resourceCount, setResourceCount] = useState(0);
  
  // Refs for scroll sections
  const featuresRef = useRef(null);
  const toolsRef = useRef(null);
  const testsRef = useRef(null);
  const pricingRef = useRef(null);
  
  // Functions to handle card flipping and demo views
  const handleCardClick = (event, demoId = null) => {
    const card = event.currentTarget;
    card.classList.toggle('info-flipped');
    
    // Reset other flipped cards
    document.querySelectorAll('.info-flipped').forEach(flippedCard => {
      if (flippedCard !== card) {
        flippedCard.classList.remove('info-flipped');
      }
    });
    
    // If demoId is provided, store it for navigation
    if (demoId) {
      localStorage.setItem('lastViewedDemo', demoId);
    }
  };
  
  // Scroll to section function
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // For parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.info-animate-on-scroll');
      
      elements.forEach(el => {
        const position = el.getBoundingClientRect();
        
        // If element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
          el.classList.add('info-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Typing effect
  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [displayText]);
  
  // Counting animation
  useEffect(() => {
    const questionsTarget = 13000;
    const certsTarget = 13;
    const resourcesTarget = 600;
    const duration = 2000; // ms
    const steps = 50;
    
    const questionsIncrement = questionsTarget / steps;
    const certsIncrement = certsTarget / steps;
    const resourcesIncrement = resourcesTarget / steps;
    const interval = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      if (currentStep <= steps) {
        setQuestionCount(Math.floor(questionsIncrement * currentStep));
        setCertCount(Math.floor(certsIncrement * currentStep));
        setResourceCount(Math.floor(resourcesIncrement * currentStep));
      } else {
        setQuestionCount(questionsTarget);
        setCertCount(certsTarget);
        setResourceCount(resourcesTarget);
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="info-container">
      {/* Navbar */}
      <InfoNavbar />
      
      {/* Hero Section */}
      <section className="info-hero-section">
        <div className="info-overlay"></div>
        <div className="info-hero-content">
          <div className="info-hero-text">
            <h1 className="info-hero-title">
              <span className="info-logo-text">Cert<span className="info-highlight">Games</span></span>
            </h1>
            <h2 className="info-hero-subtitle">{displayText}<span className="info-cursor"></span></h2>
            <p className="info-hero-description">
              The ultimate gamified cybersecurity training platform that makes learning fun, effective, and addictive.
            </p>
            <div className="info-hero-cta">
              <Link to="/register" className="info-button info-primary-button">
                Start Your Journey <FaArrowRight className="info-icon" />
              </Link>
              <Link to="/login" className="info-button info-secondary-button">
                Log In
              </Link>
            </div>
            <div className="info-quick-links">
              <button onClick={() => scrollToSection(featuresRef)} className="info-quick-link">
                <span>Features</span>
              </button>
              <button onClick={() => scrollToSection(toolsRef)} className="info-quick-link">
                <span>Learning Tools</span>
              </button>
              <button onClick={() => scrollToSection(testsRef)} className="info-quick-link">
                <span>Certification Tests</span>
              </button>
              <button onClick={() => scrollToSection(pricingRef)} className="info-quick-link">
                <span>Pricing</span>
              </button>
            </div>
          </div>

          <div className="info-hero-stats">
            <div className="info-stat-card">
              <div className="info-stat-value">{questionCount.toLocaleString()}</div>
              <div className="info-stat-label">Practice Questions</div>
            </div>
            <div className="info-stat-card">
              <div className="info-stat-value">{certCount}</div>
              <div className="info-stat-label">Certifications</div>
            </div>
            <div className="info-stat-card">
              <div className="info-stat-value">{resourceCount}+</div>
              <div className="info-stat-label">Learning Resources</div>
            </div>
          </div>
        </div>
        <div className="info-scroll-indicator">
          <div className="info-mouse"></div>
          <p>Scroll to explore</p>
        </div>
      </section>

      {/* Gamified Experience Section */}
      <section ref={featuresRef} className="info-feature-section info-gamified-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">🎮</span>
            Gamified Learning Experience
          </h2>
          <p>Level up your skills while having fun</p>
        </div>
        <div className="info-feature-grid">
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card"
            onClick={(e) => handleCardClick(e, 'xp-system')}
          >
            <div className="info-feature-icon">
              <i className="info-exp-icon">XP</i>
            </div>
            <h3>Earn XP & Level Up</h3>
            <p>Answer questions correctly to gain experience points and climb the ranks from rookie to elite hacker.</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch XP System Demo</span>
                </Link>
              </div>
            </div>
          </div>
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card" 
            onClick={(e) => handleCardClick(e, 'coins-system')}
          >
            <div className="info-feature-icon">
              <i className="info-coins-icon">💰</i>
            </div>
            <h3>Collect Coins</h3>
            <p>Earn virtual currency by completing tests and daily challenges to unlock exclusive avatars and boosts.</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch Coins System Demo</span>
                </Link>
              </div>
            </div>
          </div>
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card"
            onClick={(e) => handleCardClick(e, 'achievements')}
          >
            <div className="info-feature-icon">
              <i className="info-trophy-icon">🏆</i>
            </div>
            <h3>Unlock Achievements</h3>
            <p>Complete special tasks to earn badges and trophies that showcase your growing expertise.</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch Achievements Demo</span>
                </Link>
              </div>
            </div>
          </div>
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card"
            onClick={(e) => handleCardClick(e, 'leaderboards')}
          >
            <div className="info-feature-icon">
              <i className="info-leaderboard-icon">📊</i>
            </div>
            <h3>Compete on Leaderboards</h3>
            <p>See how you rank against other cybersecurity enthusiasts and strive to climb to the top.</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/public-leaderboard" className="info-demo-link">
                  <FaExternalLinkAlt className="info-demo-icon" />
                  <span>View Current Leaderboard</span>
                </Link>
              </div>
            </div>
          </div>
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card"
            onClick={(e) => handleCardClick(e, 'themes')}
          >
            <div className="info-feature-icon">
              <i className="info-theme-icon">🎨</i>
            </div>
            <h3>Customize Your Experience</h3>
            <p>Choose from multiple themes and personalize your learning environment to suit your style.</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch Theme Customization Demo</span>
                </Link>
              </div>
            </div>
          </div>
          <div 
            className="info-feature-card info-animate-on-scroll info-clickable-card"
            onClick={(e) => handleCardClick(e, 'mobile')}
          >
            <div className="info-feature-icon">
              <i className="info-mobile-icon">📱</i>
            </div>
            <h3>Learn Anywhere</h3>
            <p>Access all features on desktop, mobile browsers, and our dedicated iOS app for learning on the go.</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch Mobile App Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="info-feature-links info-animate-on-scroll">
          <Link to="/demos" className="info-feature-link">
            <span>View All Feature Demos</span>
            <FaArrowRight className="info-link-icon" />
          </Link>
          <Link to="/public-leaderboard" className="info-feature-link">
            <span>Browse Leaderboard</span>
            <FaArrowRight className="info-link-icon" />
          </Link>
        </div>
        
        <div className="info-preview-placeholder info-animate-on-scroll">
          <div className="info-preview-overlay">
            <p>Leaderboard Preview</p>
          </div>
        </div>
      </section>

      {/* Certification Tests Section */}
      <section ref={testsRef} className="info-feature-section info-tests-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">📝</span>
            Master 13 Certification Paths
          </h2>
          <p>13,000 practice questions across the most in-demand certifications</p>
        </div>
        <div className="info-test-features info-animate-on-scroll">
          <div className="info-test-features-list">
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Performance-Based Questions (PBQs)</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Realistic Exam Simulations</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Detailed Explanations</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Difficulty Progression System</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Customizable Test Lengths</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Memorable Exam Tips</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Progress Tracking & Analytics</span>
            </div>
            <div className="info-test-feature">
              <span className="info-check-icon">✓</span>
              <span>Exam Mode with Timed Sessions</span>
            </div>
          </div>
          <div className="info-test-selector">
            <div className="info-test-tabs">
              <button 
                className={`info-test-tab ${activeTab === 'comptia' ? 'info-active' : ''}`} 
                onClick={() => setActiveTab('comptia')}
              >
                CompTIA
              </button>
              <button 
                className={`info-test-tab ${activeTab === 'isc2' ? 'info-active' : ''}`} 
                onClick={() => setActiveTab('isc2')}
              >
                ISC2
              </button>
              <button 
                className={`info-test-tab ${activeTab === 'aws' ? 'info-active' : ''}`} 
                onClick={() => setActiveTab('aws')}
              >
                AWS
              </button>
            </div>
            
            {/* CompTIA Tab Content */}
            <div className={`info-cert-list ${activeTab !== 'comptia' ? 'info-hidden' : ''}`}>
              <div className="info-cert-item">
                <span className="info-cert-badge">A+</span>
                <span className="info-cert-name">A+ Core 1 & Core 2</span>
                <span className="info-cert-count">2,000 questions</span>
              </div>
              <div className="info-cert-item">
                <span className="info-cert-badge">N+</span>
                <span className="info-cert-name">Network+</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
              <div className="info-cert-item">
                <span className="info-cert-badge">S+</span>
                <span className="info-cert-name">Security+</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
              <div className="info-cert-item">
                <span className="info-cert-badge">CySA+</span>
                <span className="info-cert-name">CySA+</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
              <div className="info-cert-item">
                <span className="info-cert-badge">PenTest+</span>
                <span className="info-cert-name">PenTest+</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
              <div className="info-cert-dropdown">
                <div className="info-show-more">
                  <span>+7 more certifications</span>
                </div>
                <div className="info-dropdown-content">
                  <div className="info-cert-item">
                    <span className="info-cert-badge">CASP+</span>
                    <span className="info-cert-name">CASP+</span>
                    <span className="info-cert-count">1,000 questions</span>
                  </div>
                  <div className="info-cert-item">
                    <span className="info-cert-badge">Linux+</span>
                    <span className="info-cert-name">Linux+</span>
                    <span className="info-cert-count">1,000 questions</span>
                  </div>
                  <div className="info-cert-item">
                    <span className="info-cert-badge">Data+</span>
                    <span className="info-cert-name">Data+</span>
                    <span className="info-cert-count">1,000 questions</span>
                  </div>
                  <div className="info-cert-item">
                    <span className="info-cert-badge">Server+</span>
                    <span className="info-cert-name">Server+</span>
                    <span className="info-cert-count">1,000 questions</span>
                  </div>
                  <div className="info-cert-item">
                    <span className="info-cert-badge">Cloud+</span>
                    <span className="info-cert-name">Cloud+</span>
                    <span className="info-cert-count">1,000 questions</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ISC2 Tab Content */}
            <div className={`info-cert-list ${activeTab !== 'isc2' ? 'info-hidden' : ''}`}>
              <div className="info-cert-item">
                <span className="info-cert-badge">CISSP</span>
                <span className="info-cert-name">CISSP</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
            </div>
            
            {/* AWS Tab Content */}
            <div className={`info-cert-list ${activeTab !== 'aws' ? 'info-hidden' : ''}`}>
              <div className="info-cert-item">
                <span className="info-cert-badge">CCP</span>
                <span className="info-cert-name">Cloud Practitioner</span>
                <span className="info-cert-count">1,000 questions</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="info-feature-links info-animate-on-scroll">
          <Link to="/exams" className="info-feature-link">
            <span>View All Certification Exams</span>
            <FaArrowRight className="info-link-icon" />
          </Link>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section ref={toolsRef} className="info-feature-section info-tools-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">🛠️</span>
            Cutting-Edge Learning Tools
          </h2>
          <p>Unique tools to boost your cybersecurity understanding</p>
        </div>
        <div className="info-tools-grid">
          <div 
            className="info-tool-card info-animate-on-scroll info-clickable-card"
            onClick={(e) => handleCardClick(e, 'scenario-sphere')}
          >
            <h3>
              <span className="info-tool-icon">🔎</span>
              ScenarioSphere
            </h3>
            <p>Immerse yourself in realistic security scenarios with detailed storylines. Tackle simulated cyberattacks to build your incident response skills.</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch ScenarioSphere Demo</span>
                </Link>
              </div>
            </div>
          </div>
          <div 
            className="info-tool-card info-animate-on-scroll info-clickable-card"
            onClick={(e) => handleCardClick(e, 'analogy-hub')}
          >
            <h3>
              <span className="info-tool-icon">🔄</span>
              Analogy Hub
            </h3>
            <p>Complex concepts made simple through custom analogies. Compare security concepts using memorable examples to reinforce your learning.</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch Analogy Hub Demo</span>
                </Link>
              </div>
            </div>
          </div>
          <div 
            className="info-tool-card info-animate-on-scroll info-clickable-card"
            onClick={(e) => handleCardClick(e, 'grc-wizard')}
          >
            <h3>
              <span className="info-tool-icon">📋</span>
              GRC Wizard
            </h3>
            <p>Master governance, risk, and compliance topics with custom generated questions across multiple categories and difficulty levels.</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch GRC Wizard Demo</span>
                </Link>
              </div>
            </div>
          </div>
          <div 
            className="info-tool-card info-animate-on-scroll info-clickable-card"
            onClick={(e) => handleCardClick(e, 'xploitcraft')}
          >
            <h3>
              <span className="info-tool-icon">⚔️</span>
              XploitCraft
            </h3>
            <p>Learn about exploitation techniques through educational code examples with detailed explanations for real world understanding.</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch XploitCraft Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="info-feature-links info-animate-on-scroll">
          <Link to="/demos" className="info-feature-link">
            <span>View All Tool Demos</span>
            <FaArrowRight className="info-link-icon" />
          </Link>
        </div>
      </section>

      {/* Resources Section */}
      <section className="info-feature-section info-resources-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">📚</span>
            Comprehensive Resource Library
          </h2>
          <p>600+ curated resources to accelerate your learning</p>
        </div>
        <div className="info-resources-preview info-animate-on-scroll">
          <div className="info-resources-categories">
            <div className="info-resource-category">
              <span className="info-category-icon">🔧</span>
              <span>Security Tools</span>
            </div>
            <div className="info-resource-category">
              <span className="info-category-icon">🎓</span>
              <span>Courses</span>
            </div>
            <div className="info-resource-category">
              <span className="info-category-icon">📹</span>
              <span>YouTube Resources</span>
            </div>
            <div className="info-resource-category">
              <span className="info-category-icon">📜</span>
              <span>Certification Guides</span>
            </div>
            <div className="info-resource-category">
              <span className="info-category-icon">🛡️</span>
              <span>Security Frameworks</span>
            </div>
            <div className="info-resource-category">
              <span className="info-resource-more">+400 more</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="info-feature-section info-support-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">🤝</span>
            24/7 Expert Support
          </h2>
          <p>Get help whenever you need it</p>
        </div>
        <div className="info-support-content info-animate-on-scroll">
          <div 
            className="info-support-preview info-clickable-card"
            onClick={(e) => handleCardClick(e, 'support')}
          >
            <div className="info-support-chat">
              <div className="info-chat-header">
                <h4>Support / Ask Anything</h4>
              </div>
              <div className="info-chat-message info-user-message">
                <p>How do I know I am prepared for the Security+ exam?</p>
                <span className="info-message-time">09:38 AM</span>
              </div>
              <div className="info-chat-message info-support-message">
                <div className="info-support-avatar"></div>
                <div className="info-message-content">
                  <p>Take a quick self check: grab the exam objectives PDF, skim each bullet point, and try to explain each one in your own words. If you can do that for most of them, go ahead and schedule the exam!</p>
                  <p>Would you like some tips on how to be confident during your exam?</p>
                </div>
                <span className="info-message-time">09:44 AM</span>
              </div>
              <div className="info-chat-input">
                <input type="text" placeholder="Type your message here..." disabled />
                <button className="info-send-button" disabled></button>
              </div>
            </div>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch Support System Demo</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="info-support-details">
            <h3>Your Personal Cybersecurity Tutor</h3>
            <ul className="info-support-features">
              <li>
                <span className="info-check-icon">✓</span>
                <span>Ask questions about any certification topic</span>
              </li>
              <li>
                <span className="info-check-icon">✓</span>
                <span>Get help with difficult concepts</span>
              </li>
              <li>
                <span className="info-check-icon">✓</span>
                <span>Receive customized study advice</span>
              </li>
              <li>
                <span className="info-check-icon">✓</span>
                <span>Average response time: 3 hours</span>
              </li>
              <li>
                <span className="info-check-icon">✓</span>
                <span>Technical assistance with platform features</span>
              </li>
            </ul>
            
            <div className="info-support-links">
              <Link to="/contact" className="info-support-link">
                <span>Contact Support</span>
                <FaArrowRight className="info-link-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Rewards Section */}
      <section className="info-feature-section info-daily-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">🎁</span>
            Daily Rewards & Challenges
          </h2>
          <p>Keep the momentum going with daily incentives</p>
        </div>
        <div className="info-daily-content info-animate-on-scroll">
          <div 
            className="info-daily-card info-clickable-card"
            onClick={(e) => handleCardClick(e, 'daily-bonus')}
          >
            <div className="info-daily-icon">🪙</div>
            <h3>Daily Bonus</h3>
            <p>Claim free coins every 24 hours to spend in the shop</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch Daily Bonus Demo</span>
                </Link>
              </div>
            </div>
          </div>
          <div 
            className="info-daily-card info-clickable-card"
            onClick={(e) => handleCardClick(e, 'daily-pbq')}
          >
            <div className="info-daily-icon">🧩</div>
            <h3>Daily PBQ Challenge</h3>
            <p>Tackle a new performance-based question each day to earn bonus coins</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch Daily PBQ Demo</span>
                </Link>
              </div>
            </div>
          </div>
          <div 
            className="info-daily-card info-clickable-card"
            onClick={(e) => handleCardClick(e, 'cyber-brief')}
          >
            <div className="info-daily-icon">📰</div>
            <h3>Cyber Brief</h3>
            <p>Stay informed with curated cybersecurity news and study tips</p>
            <div className="info-card-flip">
              <div className="info-demo-preview">
                <Link to="/demos" className="info-demo-link">
                  <FaPlay className="info-demo-icon" />
                  <span>Watch Cyber Brief Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="info-pricing-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">💎</span>
            Unlock Your Full Potential
          </h2>
          <p>Affordable access to premium cybersecurity training</p>
        </div>
        
        <div className="info-pricing-card info-animate-on-scroll">
          <h3 className="info-plan-name">Access</h3>
          <div className="info-price">
            <span className="info-currency">$</span>
            <span className="info-amount">14</span>
            <span className="info-decimal">.99</span>
            <span className="info-period">/month</span>
          </div>
          
          <ul className="info-pricing-features">
            <li>
              <span className="info-check-icon">✓</span>
              <span>13,000+ Practice Questions</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>13 Certification Paths</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>All Interactive Learning Tools</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>Complete Resource Library</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>24/7 Support / Ask Anything</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>Gamified Learning Experience</span>
            </li>
            <li>
              <span className="info-check-icon">✓</span>
              <span>Daily Rewards & Challenges</span>
            </li>
          </ul>
          
          <Link to="/register" className="info-button info-cta-button">
            Get Started Now
          </Link>
          <p className="info-pricing-note">Cancel anytime. No long-term commitment.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="info-testimonials-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">💬</span>
            Testimonials
          </h2>
          <p>Join other IT enthusiasts who have leveled up their studying!</p>
        </div>
        
        <div className="info-testimonials-grid">
          <div className="info-testimonial-card info-animate-on-scroll">
            <div className="info-testimonial-content">
              <p>"I never thought I'd say this about a study site, but it's genuinely fun. The gamified aspect takes the monotomy out of studying, and having a that centralized resource hub is brilliant. My browser bookmarks are thanking me."</p>
            </div>
            <div className="info-testimonial-author">
              <div className="info-author-avatar" style={{ backgroundColor: '#4e54c8' }}></div>
              <div className="info-author-info">
                <p className="info-author-name">Connor B.</p>
                <p className="info-author-title">Security Analyst</p>
              </div>
            </div>
          </div>
          
          <div className="info-testimonial-card info-animate-on-scroll">
            <div className="info-testimonial-content">
              <p>"This site hits that sweet spot between education and entertainment. Studying for CompTIA certs feels rewarding instead of tedious. Big thumbs-up for the gamification, because I always tried to study like that myself, but now there is finally a dedicated webiste I can use."</p>
            </div>
            <div className="info-testimonial-author">
              <div className="info-author-avatar" style={{ backgroundColor: '#43cea2' }}></div>
              <div className="info-author-info">
                <p className="info-author-name">Samantha K.</p>
                <p className="info-author-title">Cybersecurity Manager</p>
              </div>
            </div>
          </div>
          
          <div className="info-testimonial-card info-animate-on-scroll">
            <div className="info-testimonial-content">
              <p>"I appreciate how this website doesn't feel like a lecture—more like playing a game that just happens to teach certifications. I also think the question page helped me alot when I needed to ask questions regarding my upcoming exam."</p>
            </div>
            <div className="info-testimonial-author">
              <div className="info-author-avatar" style={{ backgroundColor: '#ff9966' }}></div>
              <div className="info-author-info">
                <p className="info-author-name">Leon T.</p>
                <p className="info-author-title">IT Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="info-faq-section">
        <div className="info-section-header info-animate-on-scroll">
          <h2>
            <span className="info-section-icon">❓</span>
            Frequently Asked Questions
          </h2>
          <p>Everything you need to know</p>
        </div>
        
        <div className="info-faq-content">
          <div className="info-faq-item info-animate-on-scroll">
            <h3 className="info-faq-question">How up-to-date are the practice questions?</h3>
            <p className="info-faq-answer">Our team of certified experts regularly updates all questions to match the latest exam objectives and industry changes. We ensure our content remains current with all certification requirements.</p>
          </div>
          
          <div className="info-faq-item info-animate-on-scroll">
            <h3 className="info-faq-question">Can I access CertGames on my mobile device?</h3>
            <p className="info-faq-answer">Absolutely! CertGames is fully responsive and works on all devices including desktop, tablet, and mobile phones. We also have a dedicated IOS app you can donwload in the App Store. Your progress syncs across all platforms automatically.</p>
          </div>
          
          <div className="info-faq-item info-animate-on-scroll">
            <h3 className="info-faq-question">How does the subscription work?</h3>
            <p className="info-faq-answer">For $9.99 per month, you gain unlimited access to all practice tests, tools, resources, and features. You can cancel your subscription at any time with no questions asked.</p>
          </div>
          
          <div className="info-faq-item info-animate-on-scroll">
            <h3 className="info-faq-question">Is there a guarantee I'll pass my certification exam?</h3>
            <p className="info-faq-answer">While we can't guarantee passing, our success rates are extremely high. Users who complete just half of our practice tests for their target certification and maintain a score of 75% or higher have a passing rate of over 95% on their actual exams.</p>
          </div>
          
          <div className="info-faq-item info-animate-on-scroll">
            <h3 className="info-faq-question">What if I need help with a specific concept?</h3>
            <p className="info-faq-answer">Our 24/7 "Ask Anything" support feature allows you to ask any certification-related question, test question, exam questions, study advice, and whatever you might need help with, you will receive a thorough, personalized answer from our expert team who have passed all certifications listed, typically within 3 hours.</p>
          </div>
          
          <div className="info-more-questions">
            <Link to="/contact" className="info-more-questions-link">
              <FaInfoCircle className="info-question-icon" />
              <span>Have more questions? Contact us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="info-final-cta">
        <div className="info-cta-content info-animate-on-scroll">
          <h2>Ready to Begin Your Cybersecurity Journey?</h2>
          <p>Join oter security professionals and IT enthusiasts who've transformed their careers/study prep with CertGames</p>
          <div className="info-cta-buttons">
            <Link to="/register" className="info-button info-primary-button">
              Create Your Account
            </Link>
            <Link to="/login" className="info-button info-secondary-button">
              Log In
            </Link>
          </div>
          <div className="info-oauth-options">
            <span>Quick sign-up with:</span>
            <div className="info-oauth-buttons">
              <button className="info-oauth-button info-google" onClick={() => window.location.href = "/api/oauth/login/google"}>
                <FaGoogle className="info-oauth-icon" /> Google
              </button>
              <button className="info-oauth-button info-apple" onClick={() => window.location.href = "/api/oauth/login/apple"}>
                <FaApple className="info-oauth-icon" /> Apple ID
              </button>
            </div>
          </div>
          <div className="info-app-download">
            <a href="#" className="info-app-link">
              <FaAppStore className="info-app-icon" />
              <span>Download on the App Store</span>
            </a>
          </div>
        </div>
        <div className="info-cta-graphic">
          <div className="info-glow"></div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InfoPage;

// src/components/pages/Info/ExamsPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaChevronDown, FaChevronUp, FaCheckCircle } from 'react-icons/fa';
import InfoNavbar from './InfoNavbar';
import Footer from '../../Footer';
import './ExamsPage.css';
import aplusLogo from './images/aplus.webp';
import awscloudLogo from './images/awscloud.webp';
import cisspLogo from './images/cissp.webp';
import cloudLogo from './images/cloud.webp';
import cyssaLogo from './images/cysa.webp';
import dataLogo from './images/data.webp';
import linuxLogo from './images/linux.webp';
import networkLogo from './images/network.webp';
import pentestLogo from './images/pentest.webp';
import securityLogo from './images/security.webp';
import securityxLogo from './images/securityx.webp';
import serverLogo from './images/server.webp';


const ExamsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expandedCert, setExpandedCert] = useState(null);

  // Mock data for certifications
  const certifications = [
    {
      id: 'aplus-core1',
      title: 'CompTIA A+ Core 1',
      code: '220-1101',
      logo: aplusLogo,
      category: 'comptia',
      level: 'beginner',
      questionCount: 1000,
      description: 'Mobile devices, networking technology, hardware, virtualization and cloud computing and hardware and network troubleshooting.',
      skills: ['Hardware', 'Network Troubleshooting', 'Mobile Devices', 'Virtualization'],
      popular: true
    },
    {
      id: 'aplus-core2',
      title: 'CompTIA A+ Core 2',
      code: '220-1102',
      logo: aplusLogo,
      category: 'comptia',
      level: 'beginner',
      questionCount: 1000,
      description: 'Operating systems, security, software troubleshooting and operational procedures.',
      skills: ['Windows', 'Security', 'Troubleshooting', 'Operational Procedures'],
      popular: true
    },
    {
      id: 'network-plus',
      title: 'CompTIA Network+',
      code: 'N10-009',
      logo: networkLogo,
      category: 'comptia',
      level: 'intermediate',
      questionCount: 1000,
      description: 'Design and implement functional networks, configure, manage, and maintain essential network devices.',
      skills: ['Networking', 'Subnetting', 'Routing', 'Troubleshooting'],
      popular: true
    },
    {
      id: 'security-plus',
      title: 'CompTIA Security+',
      code: 'SY0-701',
      logo: securityLogo,
      category: 'comptia',
      level: 'intermediate',
      questionCount: 1000,
      description: 'Assess the security posture of an enterprise environment and recommend and implement appropriate security solutions.',
      skills: ['Security', 'Cryptography', 'Risk Management', 'Identity Management'],
      popular: true
    },
    {
      id: 'cysa-plus',
      title: 'CompTIA CySA+',
      code: 'CS0-003',
      logo: cyssaLogo,
      category: 'comptia',
      level: 'advanced',
      questionCount: 1000,
      description: 'Apply behavioral analytics to networks to improve the overall state of IT security.',
      skills: ['Threat Detection', 'Security Analytics', 'Vulnerability Management', 'Incident Response'],
      popular: false
    },
    {
      id: 'pentest-plus',
      title: 'CompTIA PenTest+',
      code: 'PT0-003',
      logo: pentestLogo,
      category: 'comptia',
      level: 'advanced',
      questionCount: 1000,
      description: 'Plan and scope a penetration testing engagement, understand legal and compliance requirements.',
      skills: ['Penetration Testing', 'Vulnerability Scanning', 'Exploitation', 'Reporting'],
      popular: false
    },
    {
      id: 'security-x',
      title: 'CompTIA Security X (formerly CASP+)',
      code: 'CAS-005',
      logo: securityxLogo,
      category: 'comptia',
      level: 'expert',
      questionCount: 1000,
      description: 'Security advanced security concepts, principles, and implementations that pertain to enterprise environments.',
      skills: ['Enterprise Security', 'Risk Management', 'Integration', 'Security Architecture'],
      popular: false
    },
    {
      id: 'linux-plus',
      title: 'CompTIA Linux+',
      code: 'XK0-005',
      logo: linuxLogo,
      category: 'comptia',
      level: 'intermediate',
      questionCount: 1000,
      description: 'Using Linux command line for maintenance and troubleshooting, as well as system configuration of the OS.',
      skills: ['Linux', 'Command Line', 'System Administration', 'Scripting'],
      popular: false
    },
    {
      id: 'data-plus',
      title: 'CompTIA Data+',
      code: 'DA0-001',
      logo: dataLogo,
      category: 'comptia',
      level: 'intermediate',
      questionCount: 1000,
      description: 'Data mining, visualization techniques, building data models, and manipulating data.',
      skills: ['Data Analysis', 'Data Mining', 'Visualization', 'Data Modeling'],
      popular: false
    },
    {
      id: 'server-plus',
      title: 'CompTIA Server+',
      code: 'SK0-005',
      logo: serverLogo,
      category: 'comptia',
      level: 'intermediate',
      questionCount: 1000,
      description: 'Server hardware and software technologies, as well as disaster recovery.',
      skills: ['Server Administration', 'Storage', 'Security', 'Virtualization'],
      popular: false
    },
    {
      id: 'cloud-plus',
      title: 'CompTIA Cloud+',
      code: 'CV0-004',
      logo: cloudLogo,
      category: 'comptia',
      level: 'intermediate',
      questionCount: 1000,
      description: 'Deploy, secure, and automate cloud environments and understand how to use cloud computing to accomplish business objectives.',
      skills: ['Cloud Computing', 'Deployment', 'Security', 'Automation'],
      popular: false
    },
    {
      id: 'cissp',
      title: 'ISC2 CISSP',
      code: 'CISSP',
      logo: cisspLogo,
      category: 'isc2',
      level: 'expert',
      questionCount: 1000,
      description: 'Security and risk management, asset security, security architecture and engineering, and more.',
      skills: ['Security Management', 'Asset Security', 'Security Engineering', 'Communications'],
      popular: true
    },
    {
      id: 'aws-cloud',
      title: 'AWS Cloud Practitioner',
      code: 'CLF-C02',
      logo: awscloudLogo,
      category: 'aws',
      level: 'beginner',
      questionCount: 1000,
      description: 'Understanding of the AWS Cloud, security and compliance within the AWS Cloud, and core AWS services.',
      skills: ['Cloud Concepts', 'Security', 'AWS Services', 'Billing and Pricing'],
      popular: true
    }
  ];
  
  // Filter certifications based on active category and search term
  const filteredCerts = certifications.filter(cert => {
    // Filter by category
    if (activeCategory !== 'all' && cert.category !== activeCategory) return false;
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        cert.title.toLowerCase().includes(searchLower) ||
        cert.code.toLowerCase().includes(searchLower) ||
        cert.description.toLowerCase().includes(searchLower) ||
        cert.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  // Toggle expanded certification
  const toggleExpand = (certId) => {
    if (expandedCert === certId) {
      setExpandedCert(null);
    } else {
      setExpandedCert(certId);
    }
  };
  
  return (
    <div className="exams-container">
      <InfoNavbar />
      
      <div className="exams-content">
        <div className="exams-header">
          <h1 className="exams-title">
            <span className="exams-icon">🎓</span>
            Certification Exam Prep
          </h1>
          <p className="exams-subtitle">
            Access to all exams with a single subscription — 13,000+ practice questions across 13 certifications
          </p>
          
          <div className="exams-access-notice">
            <FaCheckCircle className="notice-icon" />
            <p>Your subscription includes unlimited access to all certification practice tests</p>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="exams-search-filters">
          <div className="exams-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search certifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="exams-filters">
            <div 
              className="filters-toggle" 
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <FaFilter className="filter-icon" />
              <span>Filter</span>
              {filtersOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            
            {filtersOpen && (
              <div className="filters-dropdown">
                <div className="filter-group">
                  <h4>Vendor</h4>
                  <div className="filter-options">
                    <button 
                      className={`filter-option ${activeCategory === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveCategory('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`filter-option ${activeCategory === 'comptia' ? 'active' : ''}`}
                      onClick={() => setActiveCategory('comptia')}
                    >
                      CompTIA
                    </button>
                    <button 
                      className={`filter-option ${activeCategory === 'isc2' ? 'active' : ''}`}
                      onClick={() => setActiveCategory('isc2')}
                    >
                      ISC2
                    </button>
                    <button 
                      className={`filter-option ${activeCategory === 'aws' ? 'active' : ''}`}
                      onClick={() => setActiveCategory('aws')}
                    >
                      AWS
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Certifications Grid */}
        <div className="exams-grid">
          {filteredCerts.length > 0 ? (
            filteredCerts.map((cert) => (
              <div 
                key={cert.id} 
                className={`cert-card ${expandedCert === cert.id ? 'expanded' : ''} ${cert.popular ? 'popular' : ''}`}
              >
                {cert.popular && <div className="popular-badge">Popular</div>}
                
                <div className="cert-header">
                  <div className="cert-logo">
                    <img src={cert.logo} alt={`${cert.title} logo`} />
                  </div>
                  <div className="cert-title-info">
                    <h3>{cert.title}</h3>
                    <div className="cert-meta">
                      <span className="cert-code">{cert.code}</span>
                      <span className={`cert-level ${cert.level}`}>
                        {cert.level.charAt(0).toUpperCase() + cert.level.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="expand-button"
                    onClick={() => toggleExpand(cert.id)}
                  >
                    {expandedCert === cert.id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                
                <div className="cert-content">
                  <p className="cert-description">{cert.description}</p>
                  
                  <div className="cert-stats">
                    <div className="cert-stat">
                      <span className="stat-value">{cert.questionCount.toLocaleString()}</span>
                      <span className="stat-label">Questions</span>
                    </div>
                    <div className="cert-stat">
                      <span className="stat-value">10</span>
                      <span className="stat-label">Practice Tests</span>
                    </div>
                    <div className="cert-stat">
                      <span className="stat-value">100%</span>
                      <span className="stat-label">Coverage</span>
                    </div>
                  </div>
                  
                  {expandedCert === cert.id && (
                    <div className="cert-details">
                      <div className="cert-skills">
                        <h4>Key Skills Covered:</h4>
                        <div className="skills-list">
                          {cert.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="cert-features">
                        <div className="feature-item">
                          <FaCheckCircle className="feature-icon" />
                          <span>Performance-based Questions</span>
                        </div>
                        <div className="feature-item">
                          <FaCheckCircle className="feature-icon" />
                          <span>Detailed Explanations</span>
                        </div>
                        <div className="feature-item">
                          <FaCheckCircle className="feature-icon" />
                          <span>Progress Tracking</span>
                        </div>
                        <div className="feature-item">
                          <FaCheckCircle className="feature-icon" />
                          <span>Exam Simulation Mode</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="cert-actions">
                    <Link to="/register" className="try-cert-button">Try This Exam</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No certifications found</h3>
              <p>Try adjusting your search or filters</p>
              <button 
                className="reset-button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Subscribe CTA */}
        <div className="exams-subscribe-cta">
          <div className="subscribe-card">
            <div className="subscribe-content">
              <h2>Ready to pass your certification exams?</h2>
              <p>Get unlimited access to all 13 certification paths with 13,000+ practice questions</p>
              <div className="price-section">
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">14</span>
                  <span className="decimal">.99</span>
                  <span className="period">/month</span>
                </div>
                <p className="price-note">Cancel anytime. No long-term commitment.</p>
              </div>
              <Link to="/register" className="subscribe-button">
                Start Your Journey
              </Link>
            </div>
            
            <div className="subscribe-features">
              <div className="feature">
                <FaCheckCircle className="feature-icon" />
                <span>13 Certification Paths</span>
              </div>
              <div className="feature">
                <FaCheckCircle className="feature-icon" />
                <span>13,000+ Practice Questions</span>
              </div>
              <div className="feature">
                <FaCheckCircle className="feature-icon" />
                <span>All Learning Tools Included</span>
              </div>
              <div className="feature">
                <FaCheckCircle className="feature-icon" />
                <span>24/7 Support</span>
              </div>
              <div className="feature">
                <FaCheckCircle className="feature-icon" />
                <span>Gamified Learning Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExamsPage;

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

// src/components/pages/Info/DemosPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import InfoNavbar from './InfoNavbar';
import Footer from '../../Footer';
import './DemosPage.css';

const DemosPage = () => {
  const [activeSection, setActiveSection] = useState('featured');
  const [activeDemo, setActiveDemo] = useState(null);

  // Demo data - this would be replaced with actual demo data
  const demoData = {
    gamification: [
      {
        id: 'xp-system',
        title: 'XP & Leveling System',
        description: 'See how completing tests and answering questions correctly earns you XP to level up your profile.',
        videoUrl: '/demos/xp-system.mp4', // Placeholder - will be replaced
        thumbnail: 'https://via.placeholder.com/600x338?text=XP+System+Demo'
      },
      {
        id: 'coins-system',
        title: 'Coins & Shop System',
        description: 'Watch how to earn coins and spend them in the shop to unlock unique avatars and boosts.',
        videoUrl: '/demos/coins-system.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=Coins+System+Demo'
      },
      {
        id: 'achievements',
        title: 'Achievement System',
        description: 'Discover the various achievements you can unlock as you progress through your certification journey.',
        videoUrl: '/demos/achievements.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=Achievements+Demo'
      },
      {
        id: 'leaderboards',
        title: 'Leaderboards',
        description: 'See how you stack up against other cybersecurity enthusiasts on our global leaderboards.',
        videoUrl: '/demos/leaderboards.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=Leaderboards+Demo'
      }
    ],
    learning: [
      {
        id: 'scenario-sphere',
        title: 'ScenarioSphere',
        description: 'Experience realistic security scenarios with detailed storylines to build your incident response skills.',
        videoUrl: '/demos/scenario-sphere.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=ScenarioSphere+Demo'
      },
      {
        id: 'analogy-hub',
        title: 'Analogy Hub',
        description: 'See how complex security concepts are broken down using memorable analogies to enhance understanding.',
        videoUrl: '/demos/analogy-hub.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=Analogy+Hub+Demo'
      },
      {
        id: 'grc-wizard',
        title: 'GRC Wizard',
        description: 'Watch how our GRC Wizard helps you master governance, risk, and compliance topics with custom-generated questions.',
        videoUrl: '/demos/grc-wizard.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=GRC+Wizard+Demo'
      },
      {
        id: 'xploitcraft',
        title: 'XploitCraft',
        description: 'Learn about exploitation techniques through educational code examples with detailed explanations.',
        videoUrl: '/demos/xploitcraft.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=XploitCraft+Demo'
      }
    ],
    daily: [
      {
        id: 'daily-bonus',
        title: 'Daily Bonus',
        description: 'See how to claim your daily free coins to spend in the shop.',
        videoUrl: '/demos/daily-bonus.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=Daily+Bonus+Demo'
      },
      {
        id: 'pbq-challenge',
        title: 'Daily PBQ Challenge',
        description: 'Watch how the daily performance-based question challenges work and how to solve them.',
        videoUrl: '/demos/pbq-challenge.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=PBQ+Challenge+Demo'
      },
      {
        id: 'cyber-brief',
        title: 'Cyber Brief',
        description: 'Check out our daily cybersecurity news and study tips feature.',
        videoUrl: '/demos/cyber-brief.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=Cyber+Brief+Demo'
      }
    ],
    tests: [
      {
        id: 'test-interface',
        title: 'Test Interface',
        description: 'See how our intuitive test interface makes studying for your certification exams a breeze.',
        videoUrl: '/demos/test-interface.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=Test+Interface+Demo'
      },
      {
        id: 'exam-mode',
        title: 'Exam Mode',
        description: 'Experience our realistic exam simulation mode to prepare for the real thing.',
        videoUrl: '/demos/exam-mode.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=Exam+Mode+Demo'
      },
      {
        id: 'review-answers',
        title: 'Review & Analytics',
        description: 'See how our detailed review and analytics help you identify and improve your weak areas.',
        videoUrl: '/demos/review-analytics.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=Review+Analytics+Demo'
      }
    ],
    support: [
      {
        id: 'ask-anything',
        title: 'Ask Anything',
        description: 'Watch how our 24/7 support system works to help you with any questions or issues.',
        videoUrl: '/demos/ask-anything.mp4', // Placeholder
        thumbnail: 'https://via.placeholder.com/600x338?text=Ask+Anything+Demo'
      }
    ]
  };

  // Create a featured demos array with 1 demo from each category
  const featuredDemos = [
    demoData.gamification[0],
    demoData.learning[0],
    demoData.daily[0],
    demoData.tests[0],
    demoData.support[0]
  ];

  // Handle demo selection
  const handleDemoSelect = (demo) => {
    setActiveDemo(demo);
    // Scroll to video player
    document.getElementById('demo-player').scrollIntoView({ behavior: 'smooth' });
  };

  // Get current demos based on active section
  const getCurrentDemos = () => {
    switch(activeSection) {
      case 'featured':
        return featuredDemos;
      case 'gamification':
        return demoData.gamification;
      case 'learning':
        return demoData.learning;
      case 'daily':
        return demoData.daily;
      case 'tests':
        return demoData.tests;
      case 'support':
        return demoData.support;
      default:
        return featuredDemos;
    }
  };

  // Set default active demo when section changes
  useEffect(() => {
    const currentDemos = getCurrentDemos();
    if (currentDemos.length > 0) {
      setActiveDemo(currentDemos[0]);
    }
  }, [activeSection]);

  return (
    <div className="demos-container">
      <InfoNavbar />
      
      <div className="demos-content">
        <div className="demos-header">
          <h1 className="demos-title">
            <span className="demos-icon">🎬</span>
            Feature Demos
          </h1>
          <p className="demos-subtitle">Watch our interactive demos to see CertGames in action</p>
        </div>

        {/* Demo Player Section */}
        <div id="demo-player" className="demo-player-section">
          {activeDemo && (
            <div className="demo-player-container">
              <div className="demo-video">
                {/* This would be replaced with an actual video player component */}
                <div className="demo-video-placeholder">
                  <img src={activeDemo.thumbnail} alt={activeDemo.title} />
                  <div className="play-overlay">
                    <FaPlay className="play-icon" />
                    <span>Demo Video Placeholder</span>
                  </div>
                </div>
              </div>
              <div className="demo-info">
                <h2>{activeDemo.title}</h2>
                <p>{activeDemo.description}</p>
                <div className="demo-cta">
                  <Link to="/register" className="demo-register-btn">
                    Try This Feature
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo Categories Navigation */}
        <div className="demo-categories">
          <button
            className={`category-button ${activeSection === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveSection('featured')}
          >
            Featured
          </button>
          <button
            className={`category-button ${activeSection === 'gamification' ? 'active' : ''}`}
            onClick={() => setActiveSection('gamification')}
          >
            Gamification
          </button>
          <button
            className={`category-button ${activeSection === 'learning' ? 'active' : ''}`}
            onClick={() => setActiveSection('learning')}
          >
            Learning Tools
          </button>
          <button
            className={`category-button ${activeSection === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveSection('daily')}
          >
            Daily Features
          </button>
          <button
            className={`category-button ${activeSection === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveSection('tests')}
          >
            Test Experience
          </button>
          <button
            className={`category-button ${activeSection === 'support' ? 'active' : ''}`}
            onClick={() => setActiveSection('support')}
          >
            Support
          </button>
        </div>

        {/* Demo Thumbnails */}
        <div className="demo-thumbnails">
          <div className="thumbnails-header">
            <h3>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Demos</h3>
            <div className="thumbnails-navigation">
              <button className="nav-button">
                <FaChevronLeft />
              </button>
              <button className="nav-button">
                <FaChevronRight />
              </button>
            </div>
          </div>
          
          <div className="thumbnails-grid">
            {getCurrentDemos().map((demo) => (
              <div 
                key={demo.id} 
                className={`thumbnail-item ${activeDemo && activeDemo.id === demo.id ? 'active' : ''}`}
                onClick={() => handleDemoSelect(demo)}
              >
                <div className="thumbnail-image">
                  <img src={demo.thumbnail} alt={demo.title} />
                  <div className="thumbnail-overlay">
                    <FaPlay className="thumbnail-play" />
                  </div>
                </div>
                <h4 className="thumbnail-title">{demo.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Register CTA Section */}
        <div className="demos-cta-section">
          <div className="demos-cta-content">
            <h2>Ready to experience all these features?</h2>
            <p>Create your free account today and start your cybersecurity journey with CertGames!</p>
            <Link to="/register" className="cta-button">
              Create Your Account
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DemosPage;

// src/components/auth/Login.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser, clearAuthErrors } from '../store/userSlice';
import { 
  FaUser, 
  FaLock, 
  FaGoogle, 
  FaApple, 
  FaEnvelope, 
  FaChevronRight, 
  FaEye, 
  FaEyeSlash,
  FaExclamationCircle,
  FaFingerprint,
  FaCheckCircle
} from 'react-icons/fa';
import Footer from '../../Footer';
import './Login.css';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { loading, error, userId } = useSelector((state) => state.user);
  
  // Clear errors when component mounts or unmounts
  useEffect(() => {
    dispatch(clearAuthErrors());
    
    // Check for success message from registration
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
      // Clear the location state after reading
      window.history.replaceState({}, document.title);
    }
    
    return () => {
      dispatch(clearAuthErrors());
    };
  }, [dispatch, location]);
  
  useEffect(() => {
    // If already logged in, redirect to profile
    if (userId) {
      navigate('/profile');
    }
  }, [userId, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    
    // Basic validation
    if (!usernameOrEmail || !password) {
      setFormError('Please enter both username/email and password');
      return;
    }

    try {
      const resultAction = await dispatch(loginUser({ usernameOrEmail, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        // Login successful, navigation will happen through useEffect
      } else {
        // Handle error from the action
        setFormError(resultAction.payload || 'Login failed. Please try again.');
      }
    } catch (err) {
      setFormError('An error occurred. Please try again.');
    }
  };
  
  const handleSocialLogin = (provider) => {
    setFormError('');
    setSuccessMessage('');
    
    try {
      // Redirect to the backend OAuth route
      window.location.href = `/api/oauth/login/${provider.toLowerCase()}`;
    } catch (err) {
      setFormError(`${provider} login failed. Please try again.`);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-grid"></div>
        <div className="login-glow"></div>
      </div>
      
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <FaFingerprint className="login-logo-icon" />
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue your journey</p>
          </div>
          
          {successMessage && (
            <div className="login-success-message">
              <FaCheckCircle />
              <span>{successMessage}</span>
            </div>
          )}
          
          {(formError || error) && (
            <div className="login-error-message">
              <FaExclamationCircle />
              <span>{formError || error}</span>
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <div className="login-input-wrapper">
                <FaUser className="login-input-icon" />
                <input
                  type="text"
                  id="usernameOrEmail"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="Enter your username or email"
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <FaLock className="login-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="login-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <div className="login-options">
              <div className="login-remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              
              <Link to="/forgot-password" className="login-forgot-password">
                Forgot password?
              </Link>
            </div>
            
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <span className="login-button-loading">
                  <span className="login-spinner"></span>
                  Signing In...
                </span>
              ) : (
                <span className="login-button-text">
                  Sign In
                  <FaChevronRight className="login-button-icon" />
                </span>
              )}
            </button>
          </form>
          
          <div className="login-separator">
            <span>or continue with</span>
          </div>
          
          <div className="login-social-buttons">
            <button
              type="button"
              className="login-social-button login-google"
              onClick={() => handleSocialLogin('Google')}
              disabled={loading}
            >
              <FaGoogle />
              <span>Google</span>
            </button>
            
            <button
              type="button"
              className="login-social-button login-apple"
              onClick={() => handleSocialLogin('Apple')}
              disabled={loading}
            >
              <FaApple />
              <span>Apple</span>
            </button>
          </div>
          
          <div className="login-register-link">
            <span>Don't have an account?</span>
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;

// src/components/auth/Register.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearAuthErrors } from '../store/userSlice';
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaApple,
  FaEnvelope,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaUserSecret,
  FaCheck,
  FaInfoCircle,
  FaTimes
} from 'react-icons/fa';
import PasswordRequirements from './PasswordRequirements';
import Footer from '../../Footer';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinimumLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, userId } = useSelector((state) => state.user);
  
  // Clear errors when component mounts or unmounts
  useEffect(() => {
    dispatch(clearAuthErrors());
    
    return () => {
      dispatch(clearAuthErrors());
    };
  }, [dispatch]);
  
  useEffect(() => {
    // If already logged in, redirect to profile
    if (userId) {
      navigate('/profile');
    }
  }, [userId, navigate]);
  
  // Update password validation whenever password changes
  useEffect(() => {
    setPasswordValidation({
      hasMinimumLength: password.length >= 6,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()\-_=+[\]{}|;:'",<.>/?`~\\]/.test(password)
    });
  }, [password]);

  const passwordIsValid = () => {
    return Object.values(passwordValidation).every(val => val === true);
  };
  
  const validateForm = () => {
    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      setFormError('All fields are required');
      return false;
    }
    
    // Check if password meets requirements
    if (!passwordIsValid()) {
      setFormError('Password does not meet all requirements');
      setShowPasswordRequirements(true);
      return false;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    
    // Check if terms are agreed to
    if (!agreeTerms) {
      setFormError('You must agree to the Terms and Conditions');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const resultAction = await dispatch(registerUser({
        username,
        email,
        password,
        confirmPassword: confirmPassword
      }));
      
      if (registerUser.fulfilled.match(resultAction)) {
        // Registration successful, now login
        navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
      } else {
        // Handle error from the action
        const errorMessage = resultAction.payload || resultAction.error?.message;
        
        // Check for email already taken message
        if (errorMessage && (
            errorMessage.includes("Email is already taken") || 
            errorMessage.includes("Username or email is already taken") ||
            errorMessage.includes("already taken")
        )) {
          setFormError('Email address is already registered. Please use a different email or login.');
        } else {
          setFormError(errorMessage || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      // Handle other errors
      if (err.message && (
          err.message.includes("Email is already taken") ||
          err.message.includes("Username or email is already taken") ||
          err.message.includes("already taken")
      )) {
        setFormError('Email address is already registered. Please use a different email or login.');
      } else {
        setFormError('An error occurred. Please try again.');
      }
    }
  };
  
  const handleSocialSignUp = (provider) => {
    setFormError('');
    
    try {
      // Redirect to the backend OAuth route
      window.location.href = `/api/oauth/login/${provider.toLowerCase()}`;
    } catch (err) {
      setFormError(`${provider} sign up failed. Please try again.`);
    }
  };
  
  return (
    <div className="register-container">
      <div className="register-background">
        <div className="register-grid"></div>
        <div className="register-glow"></div>
      </div>
      
      <div className="register-content">
        <div className="register-card">
          <div className="register-header">
            <div className="register-logo">
              <FaUserSecret className="register-logo-icon" />
            </div>
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Join and start your learning journey</p>
          </div>
          
          {(formError || error) && (
            <div className="register-error-message">
              <FaExclamationCircle />
              <span>{formError || error}</span>
            </div>
          )}
          
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-input-group">
              <label htmlFor="username">Username</label>
              <div className="register-input-wrapper">
                <FaUser className="register-input-icon" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a unique username"
                  disabled={loading}
                />
              </div>
              <div className="register-input-hint">
                <FaInfoCircle className="register-hint-icon" />
                <span>3-30 characters, letters, numbers, dots, underscores, dashes</span>
              </div>
            </div>
            
            <div className="register-input-group">
              <label htmlFor="email">Email Address</label>
              <div className="register-input-wrapper">
                <FaEnvelope className="register-input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="register-input-group">
              <label htmlFor="password">Password</label>
              <div className="register-input-wrapper">
                <FaLock className="register-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowPasswordRequirements(true)}
                  onBlur={() => {
                    // Keep requirements visible if there's text or error
                    if (!password) {
                      setShowPasswordRequirements(false);
                    }
                  }}
                  placeholder="Create a strong password"
                  disabled={loading}
                  className={password && !passwordIsValid() ? "register-input-error" : ""}
                />
                <button
                  type="button"
                  className="register-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {showPasswordRequirements && (
                <div className="register-password-requirements">
                  <div className="register-requirements-header">
                    <h4>Password Requirements:</h4>
                    {passwordIsValid() ? (
                      <div className="register-requirements-status valid">
                        <FaCheck /> Valid
                      </div>
                    ) : (
                      <div className="register-requirements-status invalid">
                        <FaTimes /> Invalid
                      </div>
                    )}
                  </div>
                  <ul className="register-requirements-list">
                    <li className={passwordValidation.hasMinimumLength ? 'valid' : 'invalid'}>
                      {passwordValidation.hasMinimumLength ? 
                        <FaCheck className="icon-check" /> : 
                        <FaTimes className="icon-times" />}
                      <span>At least 6 characters long</span>
                    </li>
                    
                    <li className={passwordValidation.hasUpperCase ? 'valid' : 'invalid'}>
                      {passwordValidation.hasUpperCase ? 
                        <FaCheck className="icon-check" /> : 
                        <FaTimes className="icon-times" />}
                      <span>At least one uppercase letter</span>
                    </li>
                    
                    <li className={passwordValidation.hasLowerCase ? 'valid' : 'invalid'}>
                      {passwordValidation.hasLowerCase ? 
                        <FaCheck className="icon-check" /> : 
                        <FaTimes className="icon-times" />}
                      <span>At least one lowercase letter</span>
                    </li>
                    
                    <li className={passwordValidation.hasNumber ? 'valid' : 'invalid'}>
                      {passwordValidation.hasNumber ? 
                        <FaCheck className="icon-check" /> : 
                        <FaTimes className="icon-times" />}
                      <span>At least one number</span>
                    </li>
                    
                    <li className={passwordValidation.hasSpecialChar ? 'valid' : 'invalid'}>
                      {passwordValidation.hasSpecialChar ? 
                        <FaCheck className="icon-check" /> : 
                        <FaTimes className="icon-times" />}
                      <span>At least one special character</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="register-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="register-input-wrapper">
                <FaLock className="register-input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="register-toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex="-1"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {password && confirmPassword && (
                <div className={`register-password-match ${password === confirmPassword ? 'match' : 'no-match'}`}>
                  {password === confirmPassword ? (
                    <>
                      <FaCheck className="register-match-icon" />
                      <span>Passwords match</span>
                    </>
                  ) : (
                    <>
                      <FaExclamationCircle className="register-match-icon" />
                      <span>Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <div className="register-terms">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="agreeTerms">
                I agree to the <Link to="/terms">Terms and Conditions</Link>
              </label>
            </div>
            
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? (
                <span className="register-button-loading">
                  <span className="register-spinner"></span>
                  Creating Account...
                </span>
              ) : (
                <span className="register-button-text">
                  Create Account
                  <FaChevronRight className="register-button-icon" />
                </span>
              )}
            </button>
          </form>
          
          <div className="register-separator">
            <span>or sign up with</span>
          </div>
          
          <div className="register-social-buttons">
            <button
              type="button"
              className="register-social-button register-google"
              onClick={() => handleSocialSignUp('Google')}
              disabled={loading}
            >
              <FaGoogle />
              <span>Google</span>
            </button>
            
            <button
              type="button"
              className="register-social-button register-apple"
              onClick={() => handleSocialSignUp('Apple')}
              disabled={loading}
            >
              <FaApple />
              <span>Apple</span>
            </button>
          </div>
          
          <div className="register-login-link">
            <span>Already have an account?</span>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;

// src/components/auth/OAuthSuccess.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCurrentUserId, fetchUserData } from '../store/userSlice';
import { FaShieldAlt, FaSpinner } from 'react-icons/fa';
import './Login.css';

const OAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const provider = searchParams.get('provider');
    
    if (!userId) {
      setError('Authentication failed. Please try again.');
      setLoading(false);
      return;
    }
    
    // Handle successful login
    const handleSuccess = async () => {
      try {
        // Save userId to localStorage
        localStorage.setItem('userId', userId);
        
        // Update Redux state
        dispatch(setCurrentUserId(userId));
        
        // Fetch user data
        await dispatch(fetchUserData(userId)).unwrap();
        
        // Navigate to profile page
        navigate('/profile', { 
          state: { 
            message: `Successfully signed in with ${provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : 'OAuth'}`
          }
        });
      } catch (err) {
        console.error('Error during OAuth completion:', err);
        setError('Failed to complete authentication. Please try again.');
        setLoading(false);
      }
    };
    
    handleSuccess();
  }, [dispatch, navigate, location.search]);
  
  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-grid"></div>
        <div className="login-glow"></div>
      </div>
      
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <FaShieldAlt className="login-logo-icon" />
            </div>
            <h1 className="login-title">Authentication</h1>
            <p className="login-subtitle">
              {error ? 'Authentication Error' : 'Completing your sign-in...'}
            </p>
          </div>
          
          <div className="oauth-loading-container">
            {error ? (
              <div className="oauth-error">
                <p>{error}</p>
                <button 
                  className="login-button"
                  onClick={() => navigate('/login')}
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <div className="oauth-loading">
                <div className="oauth-spinner"></div>
                <p>Please wait while we complete your authentication...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthSuccess;




asn this is what my bradning fro google looks like <img width="326" alt="image" src="https://github.com/user-attachments/assets/733274cf-5517-4ce6-8893-b16c1c7c7597" />
