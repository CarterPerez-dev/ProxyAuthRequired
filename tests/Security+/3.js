{
  "category": "secplus",
  "testId": 3,
  "testName": "Practice Test #3 (Easy)",
  "xpPerCorrect": 10,
  "questions": [
    {
      "id": 1,
      "question": "Which type of attack attempts to guess a password by systematically trying every possible combination?",
      "options": [
        "Brute force attack",
        "Phishing attack",
        "Denial-of-Service (DoS) attack",
        "Man-in-the-middle (MITM) attack"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A brute force attack systematically attempts every possible password combination until it finds the correct one. Phishing (option 2) tricks users into revealing passwords. DoS (option 3) overwhelms systems. MITM (option 4) intercepts communications.",
      "examTip": "Brute force = 'Tries everything' until it cracks the password."
    },
    {
      "id": 2,
      "question": "Which of the following security measures is used to verify a user's identity?",
      "options": [
        "Authentication",
        "Encryption",
        "Firewall",
        "Hashing"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Authentication verifies a user's identity before granting access. Encryption (option 2) protects data but does not verify identity. Firewalls (option 3) control network traffic. Hashing (option 4) ensures data integrity but does not authenticate users.",
      "examTip": "Authentication = 'Prove who you are' (e.g., password, MFA, biometrics)."
    },
    {
      "id": 3,
      "question": "Which security concept ensures that information is only accessible to authorized individuals?",
      "options": [
        "Confidentiality",
        "Integrity",
        "Availability",
        "Non-repudiation"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Confidentiality ensures that only authorized users can access information. Integrity (option 2) ensures data remains unchanged. Availability (option 3) ensures system uptime. Non-repudiation (option 4) prevents users from denying actions they performed.",
      "examTip": "Confidentiality = 'Keep it secret'—only the right people can access data."
    },
    {
      "id": 4,
      "question": "Which of the following is an example of a social engineering attack?",
      "options": [
        "Phishing",
        "SQL injection",
        "Denial-of-Service (DoS)",
        "Brute force attack"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Phishing is a social engineering attack that tricks users into revealing sensitive information. SQL injection (option 2) targets databases. DoS (option 3) overwhelms systems. Brute force (option 4) guesses passwords systematically.",
      "examTip": "Phishing = 'Fake emails, fake websites'—always verify before clicking!"
    },
    {
      "id": 5,
      "question": "Which of the following is the BEST way to protect data stored on a lost or stolen laptop?",
      "options": [
        "Full-disk encryption",
        "Using a strong password",
        "Enabling automatic software updates",
        "Installing antivirus software"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Full-disk encryption protects data on a lost or stolen laptop by making it unreadable without the encryption key. Strong passwords (option 2) help but can be cracked. Software updates (option 3) fix vulnerabilities but don’t protect stored data. Antivirus (option 4) stops malware but does not prevent data theft if the laptop is stolen.",
      "examTip": "Lost laptop? 'Full-disk encryption' = No data access without the key."
    },
    {
      "id": 6,
      "question": "Which security principle limits user access to only the data and systems necessary for their job?",
      "options": [
        "Least privilege",
        "Zero Trust",
        "Separation of duties",
        "Non-repudiation"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Least privilege ensures users only have access to what they need for their job, reducing security risks. Zero Trust (option 2) assumes no one is trusted by default. Separation of duties (option 3) prevents fraud by dividing tasks. Non-repudiation (option 4) ensures actions cannot be denied.",
      "examTip": "Least privilege = 'Need-to-know' access only!"
    },
    {
      "id": 7,
      "question": "Which of the following is a type of malware that encrypts files and demands payment to restore access?",
      "options": [
        "Ransomware",
        "Trojan",
        "Spyware",
        "Worm"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Ransomware encrypts files and demands payment to restore access. Trojans (option 2) disguise themselves as legitimate programs. Spyware (option 3) collects user data. Worms (option 4) self-replicate and spread without user action.",
      "examTip": "Ransomware = 'Pay up or lose your files!'—Always back up your data!"
    },
    {
      "id": 8,
      "question": "Which of the following BEST describes multi-factor authentication (MFA)?",
      "options": [
        "Using two or more authentication factors",
        "Using a strong password",
        "Using encryption to protect passwords",
        "Allowing users to log in without a password"
      ],
      "correctAnswerIndex": 0,
      "explanation": "MFA requires two or more authentication factors (e.g., password + fingerprint). Strong passwords (option 2) are good security but not MFA. Encryption (option 3) protects passwords but is not an authentication method. Logging in without a password (option 4) is not secure.",
      "examTip": "MFA = 'Two or more ways' to verify identity (password + phone code, fingerprint, etc.)."
    },
    {
      "id": 9,
      "question": "Which network device filters traffic based on security rules?",
      "options": [
        "Firewall",
        "Router",
        "Switch",
        "Access point"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A firewall filters network traffic based on security rules. Routers (option 2) forward traffic between networks. Switches (option 3) connect devices within a network. Access points (option 4) provide Wi-Fi connectivity but do not enforce security policies.",
      "examTip": "Firewall = 'Traffic cop' for network security."
    },
    {
      "id": 10,
      "question": "Which of the following is a common method used to secure wireless networks?",
      "options": [
        "WPA3 encryption",
        "Using open Wi-Fi",
        "Disabling SSID broadcast",
        "Using WEP encryption"
      ],
      "correctAnswerIndex": 0,
      "explanation": "WPA3 is the most secure wireless encryption standard. Open Wi-Fi (option 2) is insecure. Disabling SSID broadcast (option 3) hides the network but does not secure it. WEP (option 4) is outdated and vulnerable to attacks.",
      "examTip": "WPA3 = 'Best Wi-Fi security'—always use it!"
    },
    {
      "id": 11,
      "question": "Which security measure prevents unauthorized devices from connecting to a network?",
      "options": [
        "Network Access Control (NAC)",
        "Intrusion Detection System (IDS)",
        "Firewall",
        "Virtual Private Network (VPN)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "NAC enforces security policies and prevents unauthorized devices from connecting to the network. IDS (option 2) detects threats but does not block access. Firewalls (option 3) filter traffic but do not verify device authorization. VPNs (option 4) provide encrypted remote access but do not enforce network access policies.",
      "examTip": "NAC = 'Network gatekeeper'—only approved devices can connect."
    },
    {
      "id": 12,
      "question": "Which security concept ensures that data is available and accessible when needed?",
      "options": [
        "Availability",
        "Confidentiality",
        "Integrity",
        "Non-repudiation"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Availability ensures that systems and data remain accessible to authorized users when needed. Confidentiality (option 2) protects data from unauthorized access. Integrity (option 3) ensures data is not altered. Non-repudiation (option 4) prevents users from denying actions they performed.",
      "examTip": "Availability = 'Always accessible'—no downtime!"
    },
    {
      "id": 13,
      "question": "Which type of malware disguises itself as legitimate software but carries malicious code?",
      "options": [
        "Trojan",
        "Ransomware",
        "Spyware",
        "Worm"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A Trojan appears as legitimate software but contains hidden malicious code. Ransomware (option 2) encrypts files and demands payment. Spyware (option 3) secretly collects user data. Worms (option 4) self-replicate and spread across networks.",
      "examTip": "Trojan = 'Looks safe but is dangerous'—never download unverified software!"
    },
    {
      "id": 14,
      "question": "Which of the following BEST describes an Intrusion Prevention System (IPS)?",
      "options": [
        "A security system that detects and blocks threats in real time",
        "A device that allows or denies traffic based on predefined rules",
        "A tool used to capture and analyze network traffic",
        "A security solution that encrypts network communications"
      ],
      "correctAnswerIndex": 0,
      "explanation": "An IPS actively detects and blocks threats in real time. Firewalls (option 2) filter traffic but do not detect threats. Packet analyzers (option 3) capture network traffic. Encryption (option 4) secures data but does not prevent attacks.",
      "examTip": "IPS = 'Detect & Block'—stops threats before they spread."
    },
    {
      "id": 15,
      "question": "Which of the following is a form of biometric authentication?",
      "options": [
        "Fingerprint scan",
        "Security question",
        "Strong password",
        "One-time passcode"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Biometric authentication uses unique physical traits like fingerprints, facial recognition, or retina scans. Security questions (option 2) and passwords (option 3) rely on knowledge, not biometrics. One-time passcodes (option 4) use temporary numeric codes but are not biometrics.",
      "examTip": "Biometric = 'Something you ARE' (fingerprint, face, eye scan)."
    },
    {
      "id": 16,
      "question": "Which of the following is a preventive security control?",
      "options": [
        "Firewall",
        "Incident response plan",
        "Security log analysis",
        "Forensic investigation"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A firewall is a preventive control that blocks unauthorized access. Incident response plans (option 2) are corrective. Security log analysis (option 3) is detective. Forensic investigations (option 4) happen after an incident occurs.",
      "examTip": "Firewall = 'Stops threats before they happen.'"
    },
    {
      "id": 17,
      "question": "Which type of security control is used to detect security incidents after they occur?",
      "options": [
        "Detective",
        "Preventive",
        "Corrective",
        "Compensating"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Detective controls identify security incidents after they happen (e.g., IDS, security cameras, log monitoring). Preventive (option 2) stops incidents before they happen. Corrective (option 3) restores systems after an incident. Compensating (option 4) provides alternative security when primary controls fail.",
      "examTip": "Detective = 'Finds' incidents after they occur (logs, IDS, cameras)."
    },
    {
      "id": 18,
      "question": "Which authentication method allows users to log in once and access multiple systems without re-entering credentials?",
      "options": [
        "Single Sign-On (SSO)",
        "Multi-factor Authentication (MFA)",
        "Role-Based Access Control (RBAC)",
        "Discretionary Access Control (DAC)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "SSO allows users to log in once and access multiple systems without re-entering credentials. MFA (option 2) requires multiple authentication factors. RBAC (option 3) assigns access based on roles. DAC (option 4) allows users to control their own file access.",
      "examTip": "SSO = 'One login, multiple access'—reduces password fatigue."
    },
    {
      "id": 19,
      "question": "Which security concept ensures that data has not been altered in transit?",
      "options": [
        "Integrity",
        "Confidentiality",
        "Availability",
        "Least privilege"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Integrity ensures that data remains unchanged. Confidentiality (option 2) protects data from unauthorized access. Availability (option 3) ensures resources remain accessible. Least privilege (option 4) limits access but does not ensure data integrity.",
      "examTip": "Integrity = 'Data remains unchanged'—protected from tampering."
    },
    {
      "id": 20,
      "question": "Which of the following is an example of a physical security control?",
      "options": [
        "Mantrap",
        "Firewall",
        "Antivirus software",
        "Encryption"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A mantrap is a physical security control that restricts access to secure areas. Firewalls (option 2) filter network traffic. Antivirus software (option 3) detects malware. Encryption (option 4) secures data but is not a physical control.",
      "examTip": "Mantrap = 'Physical security'—prevents unauthorized entry."
    },
    {
      "id": 21,
      "question": "Which type of attack involves an attacker intercepting communication between two parties without their knowledge?",
      "options": [
        "Man-in-the-Middle (MITM)",
        "Denial-of-Service (DoS)",
        "Brute force",
        "SQL injection"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A Man-in-the-Middle (MITM) attack intercepts and possibly alters communication between two parties. DoS (option 2) overwhelms a system with traffic. Brute force (option 3) guesses passwords. SQL injection (option 4) manipulates databases via input fields.",
      "examTip": "MITM = 'Eavesdropping' on communication—intercepts & manipulates data."
    },
    {
      "id": 22,
      "question": "Which of the following is a common method used to secure online banking transactions?",
      "options": [
        "Multi-factor authentication (MFA)",
        "Simple passwords",
        "Disabling encryption",
        "Using HTTP instead of HTTPS"
      ],
      "correctAnswerIndex": 0,
      "explanation": "MFA adds an extra layer of security by requiring more than one method to verify identity. Simple passwords (option 2) are weak. Disabling encryption (option 3) makes data vulnerable. HTTP (option 4) is not secure; HTTPS encrypts web traffic.",
      "examTip": "MFA = 'Extra security'—always enable it for banking!"
    },
    {
      "id": 23,
      "question": "Which protocol is used to securely transfer files over a network?",
      "options": [
        "SFTP",
        "FTP",
        "Telnet",
        "SMTP"
      ],
      "correctAnswerIndex": 0,
      "explanation": "SFTP (Secure File Transfer Protocol) encrypts file transfers. FTP (option 2) transfers files but lacks encryption. Telnet (option 3) is an insecure remote access protocol. SMTP (option 4) is used for sending emails.",
      "examTip": "SFTP = 'Secure file transfer'—always use it instead of FTP."
    },
    {
      "id": 24,
      "question": "Which type of malware spreads without user interaction and replicates itself across networks?",
      "options": [
        "Worm",
        "Trojan",
        "Spyware",
        "Ransomware"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A worm spreads across networks without user interaction. Trojans (option 2) disguise themselves as legitimate software. Spyware (option 3) secretly collects data. Ransomware (option 4) encrypts files and demands payment.",
      "examTip": "Worm = 'Self-spreading'—no user action needed."
    },
    {
      "id": 25,
      "question": "Which of the following is a security best practice when creating passwords?",
      "options": [
        "Use a long and complex password",
        "Use the same password for all accounts",
        "Use personal information in passwords",
        "Write passwords on a sticky note"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A long and complex password increases security. Reusing passwords (option 2) is risky. Personal information (option 3) makes passwords easy to guess. Writing passwords down (option 4) increases the risk of theft.",
      "examTip": "Strong password = 'Long + Complex + Unique'—never reuse passwords!"
    },
    {
      "id": 26,
      "question": "Which of the following security tools can capture and analyze network traffic in real-time?",
      "options": [
        "Packet sniffer",
        "Firewall",
        "Antivirus software",
        "Password cracker"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A packet sniffer (e.g., Wireshark) captures and analyzes network traffic. Firewalls (option 2) filter traffic but do not analyze packets. Antivirus software (option 3) detects malware. Password crackers (option 4) attempt to break passwords.",
      "examTip": "Packet sniffer = 'Network spy'—analyzes traffic in real-time."
    },
    {
      "id": 27,
      "question": "Which security feature ensures that a system remains operational even if a component fails?",
      "options": [
        "Fault tolerance",
        "Confidentiality",
        "Access control",
        "Non-repudiation"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Fault tolerance ensures that systems continue running even when components fail. Confidentiality (option 2) protects data. Access control (option 3) regulates permissions. Non-repudiation (option 4) ensures actions cannot be denied.",
      "examTip": "Fault tolerance = 'No downtime' even if something breaks."
    },
    {
      "id": 28,
      "question": "Which of the following is a common method attackers use to gain access to a system?",
      "options": [
        "Phishing",
        "Firewall configuration",
        "Software updates",
        "Using multi-factor authentication"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Phishing tricks users into revealing credentials, allowing attackers to gain access. Firewall configuration (option 2) is a security measure. Software updates (option 3) patch vulnerabilities. MFA (option 4) enhances security.",
      "examTip": "Phishing = 'Tricks users' into giving up credentials—always verify links!"
    },
    {
      "id": 29,
      "question": "Which security concept ensures that users cannot deny actions they have performed?",
      "options": [
        "Non-repudiation",
        "Confidentiality",
        "Integrity",
        "Availability"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Non-repudiation prevents users from denying their actions. Confidentiality (option 2) protects data. Integrity (option 3) ensures data is unaltered. Availability (option 4) ensures systems remain accessible.",
      "examTip": "Non-repudiation = 'No denying'—digital signatures & logs prove actions."
    },
    {
      "id": 30,
      "question": "Which security measure is commonly used to secure remote access to a corporate network?",
      "options": [
        "Virtual Private Network (VPN)",
        "Simple passwords",
        "Open Wi-Fi",
        "Disabling encryption"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A VPN encrypts remote connections, securing access to corporate networks. Simple passwords (option 2) are weak. Open Wi-Fi (option 3) is insecure. Disabling encryption (option 4) makes data vulnerable.",
      "examTip": "VPN = 'Secure tunnel'—always use it for remote work!"
    },
    {
      "id": 31,
      "question": "Which of the following is an example of a strong password?",
      "options": [
        "P@ssw0rd#2024!",
        "12345678",
        "password",
        "qwerty123"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A strong password includes uppercase and lowercase letters, numbers, and symbols. '12345678' (option 2), 'password' (option 3), and 'qwerty123' (option 4) are weak and commonly guessed.",
      "examTip": "Strong password = 'Long + Complex + Unique'—never use common words!"
    },
    {
      "id": 32,
      "question": "Which security principle ensures that only authorized users can access sensitive information?",
      "options": [
        "Confidentiality",
        "Integrity",
        "Availability",
        "Non-repudiation"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Confidentiality ensures that only authorized users can access sensitive data. Integrity (option 2) ensures data is not altered. Availability (option 3) ensures data is accessible when needed. Non-repudiation (option 4) prevents denial of actions.",
      "examTip": "Confidentiality = 'Keep it secret'—only authorized users can see it."
    },
    {
      "id": 33,
      "question": "Which security measure is used to detect and prevent unauthorized access attempts?",
      "options": [
        "Intrusion Prevention System (IPS)",
        "Antivirus software",
        "Access control list (ACL)",
        "Data encryption"
      ],
      "correctAnswerIndex": 0,
      "explanation": "IPS detects and blocks unauthorized access attempts in real-time. Antivirus software (option 2) detects malware. ACLs (option 3) define permissions but do not actively prevent attacks. Encryption (option 4) secures data but does not detect intrusions.",
      "examTip": "IPS = 'Detect & Block'—stops unauthorized access instantly."
    },
    {
      "id": 34,
      "question": "Which of the following BEST describes a denial-of-service (DoS) attack?",
      "options": [
        "An attacker overwhelms a system with excessive traffic to make it unavailable",
        "An attacker steals sensitive information from a database",
        "An attacker uses stolen credentials to gain unauthorized access",
        "An attacker modifies a website’s content without authorization"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A DoS attack overwhelms a system with excessive traffic, making it unavailable. Data theft (option 2) is different from DoS. Unauthorized access (option 3) is not a DoS attack. Website modification (option 4) is known as defacement, not DoS.",
      "examTip": "DoS = 'Overwhelm the system'—denies service by flooding it with traffic."
    },
    {
      "id": 35,
      "question": "Which of the following security controls is used to enforce least privilege?",
      "options": [
        "Role-Based Access Control (RBAC)",
        "Virtual Private Network (VPN)",
        "Firewall",
        "Antivirus software"
      ],
      "correctAnswerIndex": 0,
      "explanation": "RBAC assigns permissions based on user roles, enforcing least privilege. VPNs (option 2) encrypt connections but do not control access. Firewalls (option 3) filter network traffic. Antivirus software (option 4) protects against malware.",
      "examTip": "RBAC = 'Only what you need'—users get access based on job role."
    },
    {
      "id": 36,
      "question": "Which type of attack involves injecting malicious code into a website to target visitors?",
      "options": [
        "Cross-site scripting (XSS)",
        "Phishing",
        "Brute force",
        "SQL injection"
      ],
      "correctAnswerIndex": 0,
      "explanation": "XSS injects malicious scripts into a website to attack visitors. Phishing (option 2) tricks users into revealing data. Brute force (option 3) guesses passwords. SQL injection (option 4) manipulates database queries.",
      "examTip": "XSS = 'Attacks website visitors'—malicious scripts run in the browser."
    },
    {
      "id": 37,
      "question": "Which of the following is an example of physical security?",
      "options": [
        "Biometric scanner",
        "Firewalls",
        "Encryption",
        "Antivirus software"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A biometric scanner is a physical security control that verifies identity. Firewalls (option 2) filter network traffic. Encryption (option 3) secures data. Antivirus software (option 4) detects malware.",
      "examTip": "Biometric scanner = 'Physical control'—uses fingerprints, retina, etc."
    },
    {
      "id": 38,
      "question": "Which of the following BEST describes a vulnerability scan?",
      "options": [
        "An automated tool that checks for security weaknesses in a system",
        "A method of tricking users into revealing sensitive information",
        "A tool used to block unauthorized access",
        "A technique used to encrypt sensitive data"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A vulnerability scan automatically detects security weaknesses in a system. Trickery (option 2) describes social engineering. Blocking access (option 3) is handled by firewalls. Encryption (option 4) secures data but does not scan for weaknesses.",
      "examTip": "Vulnerability scan = 'Finds weaknesses' before hackers do."
    },
    {
      "id": 39,
      "question": "Which of the following is a benefit of using multi-factor authentication (MFA)?",
      "options": [
        "It adds an extra layer of security beyond just a password",
        "It eliminates the need for passwords",
        "It makes passwords stronger",
        "It allows users to bypass authentication"
      ],
      "correctAnswerIndex": 0,
      "explanation": "MFA requires an additional authentication factor beyond a password, increasing security. Eliminating passwords (option 2) is incorrect. Making passwords stronger (option 3) is unrelated to MFA. Bypassing authentication (option 4) is insecure.",
      "examTip": "MFA = 'Extra layer'—password + something else (e.g., phone, fingerprint)."
    },
    {
      "id": 40,
      "question": "Which of the following is a characteristic of a zero-day attack?",
      "options": [
        "It exploits an unknown vulnerability before a fix is available",
        "It requires social engineering to be successful",
        "It only affects outdated software",
        "It is always detected by antivirus software"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A zero-day attack exploits unknown vulnerabilities before a fix is available. Social engineering (option 2) is unrelated. Outdated software (option 3) is vulnerable, but zero-days can affect any system. Antivirus software (option 4) may not detect new zero-day attacks.",
      "examTip": "Zero-day = 'No fix yet'—attackers exploit unknown flaws."
    },
    {
      "id": 41,
      "question": "Which type of attack attempts to overwhelm a system by sending a massive amount of traffic to it?",
      "options": [
        "Denial-of-Service (DoS)",
        "Phishing",
        "Brute force",
        "Cross-site scripting (XSS)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A DoS attack floods a system with excessive traffic, making it unavailable. Phishing (option 2) tricks users into revealing information. Brute force (option 3) guesses passwords repeatedly. XSS (option 4) injects malicious scripts into websites.",
      "examTip": "DoS = 'Overload the system'—flooding it with traffic."
    },
    {
      "id": 42,
      "question": "Which of the following is the MOST effective way to prevent brute force attacks?",
      "options": [
        "Account lockout policies",
        "Using default passwords",
        "Disabling encryption",
        "Allowing unlimited login attempts"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Account lockout policies limit the number of incorrect login attempts, preventing brute force attacks. Default passwords (option 2) are a security risk. Disabling encryption (option 3) makes data vulnerable. Allowing unlimited login attempts (option 4) enables brute force attacks.",
      "examTip": "Brute force prevention = 'Lock accounts' after failed attempts."
    },
    {
      "id": 43,
      "question": "Which of the following security features ensures that a user cannot deny performing an action?",
      "options": [
        "Non-repudiation",
        "Confidentiality",
        "Integrity",
        "Availability"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Non-repudiation ensures that a user cannot deny their actions (e.g., digital signatures, audit logs). Confidentiality (option 2) protects data from unauthorized access. Integrity (option 3) ensures data remains unaltered. Availability (option 4) ensures system uptime.",
      "examTip": "Non-repudiation = 'No denial'—proof of user actions."
    },
    {
      "id": 44,
      "question": "Which protocol is used to encrypt web traffic and ensure secure communication between a browser and a website?",
      "options": [
        "TLS",
        "HTTP",
        "FTP",
        "SNMP"
      ],
      "correctAnswerIndex": 0,
      "explanation": "TLS (Transport Layer Security) encrypts web traffic, ensuring secure communication. HTTP (option 2) is unencrypted. FTP (option 3) is used for file transfers. SNMP (option 4) manages network devices but does not encrypt web traffic.",
      "examTip": "TLS = 'Secure web traffic' (used in HTTPS)."
    },
    {
      "id": 45,
      "question": "Which type of security control is used to monitor and analyze network activity for suspicious behavior?",
      "options": [
        "Intrusion Detection System (IDS)",
        "Firewall",
        "Virtual Private Network (VPN)",
        "Access Control List (ACL)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "An IDS detects and monitors network traffic for suspicious activity. Firewalls (option 2) block or allow traffic but do not analyze it for anomalies. VPNs (option 3) encrypt connections but do not monitor threats. ACLs (option 4) define access permissions.",
      "examTip": "IDS = 'Network security camera'—detects suspicious behavior."
    },
    {
      "id": 46,
      "question": "Which of the following is the BEST method to protect a Wi-Fi network from unauthorized access?",
      "options": [
        "Enabling WPA3 encryption",
        "Using open Wi-Fi",
        "Disabling encryption",
        "Using WEP encryption"
      ],
      "correctAnswerIndex": 0,
      "explanation": "WPA3 encryption provides the highest level of Wi-Fi security. Open Wi-Fi (option 2) is insecure. Disabling encryption (option 3) exposes the network. WEP (option 4) is outdated and vulnerable to attacks.",
      "examTip": "Wi-Fi Security = 'Use WPA3'—never WEP or open networks!"
    },
    {
      "id": 47,
      "question": "Which type of attack involves tricking users into providing sensitive information through fake websites or emails?",
      "options": [
        "Phishing",
        "Ransomware",
        "Brute force",
        "Man-in-the-Middle (MITM)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Phishing scams trick users into revealing sensitive information via fake emails or websites. Ransomware (option 2) encrypts files and demands payment. Brute force (option 3) guesses passwords. MITM (option 4) intercepts and manipulates communication.",
      "examTip": "Phishing = 'Fake emails & websites'—always verify before clicking!"
    },
    {
      "id": 48,
      "question": "Which of the following is the BEST way to secure an account against unauthorized access?",
      "options": [
        "Enabling multi-factor authentication (MFA)",
        "Using short, simple passwords",
        "Reusing passwords across multiple sites",
        "Disabling automatic updates"
      ],
      "correctAnswerIndex": 0,
      "explanation": "MFA adds an extra layer of security by requiring multiple authentication factors. Short passwords (option 2) are weak. Reusing passwords (option 3) makes accounts vulnerable. Disabling updates (option 4) increases security risks.",
      "examTip": "MFA = 'Extra protection'—always enable it!"
    },
    {
      "id": 49,
      "question": "Which security concept ensures that only authorized individuals have access to sensitive information?",
      "options": [
        "Confidentiality",
        "Integrity",
        "Availability",
        "Non-repudiation"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Confidentiality ensures that only authorized users can access sensitive data. Integrity (option 2) ensures data is not altered. Availability (option 3) ensures data is accessible when needed. Non-repudiation (option 4) prevents denial of actions.",
      "examTip": "Confidentiality = 'Keep it secret'—only authorized users can see it."
    },
    {
      "id": 50,
      "question": "Which type of encryption is used to protect files stored on a hard drive?",
      "options": [
        "Full-disk encryption",
        "TLS",
        "SSH",
        "SNMP"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Full-disk encryption protects stored data on a hard drive. TLS (option 2) secures web traffic. SSH (option 3) encrypts remote logins. SNMP (option 4) manages network devices but does not encrypt files.",
      "examTip": "Full-disk encryption = 'Protects stored data'—even if the device is lost."
    },
    {
      "id": 51,
      "question": "Which type of malware is designed to spread across a network without user interaction?",
      "options": [
        "Worm",
        "Trojan",
        "Spyware",
        "Rootkit"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A worm spreads across a network automatically, without requiring user action. A Trojan (option 2) disguises itself as legitimate software. Spyware (option 3) collects user data secretly. A rootkit (option 4) hides inside a system to avoid detection.",
      "examTip": "Worm = 'Self-spreading'—moves across networks on its own."
    },
    {
      "id": 52,
      "question": "Which of the following is a preventive security control?",
      "options": [
        "Firewall",
        "Intrusion Detection System (IDS)",
        "Security audit",
        "Incident response plan"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A firewall is a preventive control that blocks unauthorized access. IDS (option 2) is a detective control. Security audits (option 3) review past security measures. Incident response plans (option 4) are corrective controls used after an incident occurs.",
      "examTip": "Firewall = 'Blocks threats before they happen'—a preventive measure."
    },
    {
      "id": 53,
      "question": "Which authentication factor is based on something a user has?",
      "options": [
        "Smart card",
        "Password",
        "Fingerprint scan",
        "Security question"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A smart card is a 'something you have' authentication factor. Passwords (option 2) are 'something you know.' Fingerprint scans (option 3) are 'something you are.' Security questions (option 4) also fall under 'something you know.'",
      "examTip": "'Something you have' = Smart card, security token, authentication app."
    },
    {
      "id": 54,
      "question": "Which type of cyberattack tricks users into providing sensitive information by impersonating a legitimate entity?",
      "options": [
        "Phishing",
        "Denial-of-Service (DoS)",
        "Brute force",
        "SQL injection"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Phishing uses fake emails or websites to steal user credentials. DoS (option 2) overwhelms a system with traffic. Brute force (option 3) guesses passwords repeatedly. SQL injection (option 4) manipulates databases via input fields.",
      "examTip": "Phishing = 'Fake email/website'—always verify before clicking!"
    },
    {
      "id": 55,
      "question": "Which of the following is an example of a strong password?",
      "options": [
        "C0mp!exP@ssw0rd#78",
        "123456",
        "password",
        "qwerty123"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A strong password includes uppercase and lowercase letters, numbers, and symbols. '123456' (option 2), 'password' (option 3), and 'qwerty123' (option 4) are weak and commonly guessed.",
      "examTip": "Strong password = 'Long + Complex + Unique'—never use common words!"
    },
    {
      "id": 56,
      "question": "Which encryption method is commonly used to protect data in transit?",
      "options": [
        "Transport Layer Security (TLS)",
        "Full-disk encryption",
        "MD5",
        "SHA-256"
      ],
      "correctAnswerIndex": 0,
      "explanation": "TLS encrypts data in transit, such as web traffic and emails. Full-disk encryption (option 2) protects stored data. MD5 (option 3) and SHA-256 (option 4) are hashing algorithms, not encryption methods.",
      "examTip": "TLS = 'Secures data in transit'—used in HTTPS, VPNs, email encryption."
    },
    {
      "id": 57,
      "question": "Which of the following is a characteristic of multi-factor authentication (MFA)?",
      "options": [
        "It requires two or more authentication factors",
        "It replaces passwords with a single sign-on (SSO)",
        "It only uses passwords",
        "It allows unlimited login attempts"
      ],
      "correctAnswerIndex": 0,
      "explanation": "MFA requires at least two authentication factors (e.g., password + fingerprint). SSO (option 2) allows users to log in once but is not MFA. Password-only authentication (option 3) is not MFA. Allowing unlimited login attempts (option 4) is a security risk.",
      "examTip": "MFA = 'Two or more ways' to verify identity (password + phone code, fingerprint, etc.)."
    },
    {
      "id": 58,
      "question": "Which network security tool monitors and analyzes incoming and outgoing traffic to detect threats?",
      "options": [
        "Intrusion Detection System (IDS)",
        "Firewall",
        "Router",
        "Access control list (ACL)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "An IDS detects and analyzes suspicious network activity. Firewalls (option 2) block or allow traffic but do not analyze threats. Routers (option 3) direct network traffic but do not detect threats. ACLs (option 4) control access but do not analyze threats.",
      "examTip": "IDS = 'Detects network threats'—like a security camera for traffic."
    },
    {
      "id": 59,
      "question": "Which of the following is a benefit of using a Virtual Private Network (VPN)?",
      "options": [
        "It encrypts internet traffic for secure remote access",
        "It speeds up internet connections",
        "It eliminates the need for strong passwords",
        "It allows users to bypass all security controls"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A VPN encrypts internet traffic, securing remote access. VPNs (option 2) do not improve speed; they may slow it down. VPNs (option 3) do not replace strong passwords. VPNs (option 4) do not bypass security controls; they enhance security.",
      "examTip": "VPN = 'Secure tunnel'—encrypts traffic for safe remote access."
    },
    {
      "id": 60,
      "question": "Which of the following BEST describes the purpose of an access control list (ACL)?",
      "options": [
        "To define permissions for users and systems",
        "To encrypt network traffic",
        "To block malicious software",
        "To scan for security vulnerabilities"
      ],
      "correctAnswerIndex": 0,
      "explanation": "ACLs define which users or systems can access specific resources. Encryption (option 2) secures data but does not control access. Blocking malware (option 3) is done by antivirus software. Vulnerability scanning (option 4) identifies security weaknesses.",
      "examTip": "ACL = 'Who gets access to what'—defines permissions for resources."
    },
    {
      "id": 61,
      "question": "Which of the following is an example of a social engineering attack?",
      "options": [
        "Phishing",
        "Denial-of-Service (DoS)",
        "Brute force attack",
        "Cross-site scripting (XSS)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Phishing is a social engineering attack where attackers trick users into revealing sensitive information. DoS (option 2) overwhelms systems with traffic. Brute force (option 3) guesses passwords. XSS (option 4) injects malicious scripts into web pages.",
      "examTip": "Social engineering = 'Manipulating people'—not hacking systems."
    },
    {
      "id": 62,
      "question": "Which security concept ensures that data remains unaltered and trustworthy?",
      "options": [
        "Integrity",
        "Confidentiality",
        "Availability",
        "Non-repudiation"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Integrity ensures that data remains unchanged and accurate. Confidentiality (option 2) protects sensitive data. Availability (option 3) ensures data is accessible. Non-repudiation (option 4) prevents users from denying actions they performed.",
      "examTip": "Integrity = 'No unauthorized changes'—data remains accurate."
    },
    {
      "id": 63,
      "question": "Which of the following is an example of multi-factor authentication (MFA)?",
      "options": [
        "Password + fingerprint scan",
        "Two different passwords",
        "Using a long, complex password",
        "A security question"
      ],
      "correctAnswerIndex": 0,
      "explanation": "MFA requires two or more different authentication factors, such as a password and a fingerprint scan. Two passwords (option 2) are the same factor ('something you know'). A long password (option 3) is strong but not MFA. A security question (option 4) is another 'something you know' factor.",
      "examTip": "MFA = 'Two or more different factors'—not just two passwords!"
    },
    {
      "id": 64,
      "question": "Which of the following is a best practice for securing a web application?",
      "options": [
        "Input validation",
        "Using default credentials",
        "Disabling encryption",
        "Allowing all network traffic"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Input validation helps prevent attacks like SQL injection and XSS by verifying user input. Default credentials (option 2) create security risks. Disabling encryption (option 3) exposes data to attacks. Allowing all network traffic (option 4) is insecure.",
      "examTip": "Input validation = 'Check user input'—stops malicious code."
    },
    {
      "id": 65,
      "question": "Which security tool is used to scan a system for vulnerabilities?",
      "options": [
        "Vulnerability scanner",
        "Firewall",
        "Access control list (ACL)",
        "Antivirus software"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A vulnerability scanner identifies weaknesses in a system. Firewalls (option 2) block or allow traffic but do not scan for vulnerabilities. ACLs (option 3) control access but do not detect weaknesses. Antivirus software (option 4) detects malware but does not scan for vulnerabilities.",
      "examTip": "Vulnerability scanner = 'Find weaknesses before hackers do.'"
    },
    {
      "id": 66,
      "question": "Which type of malware disguises itself as legitimate software to trick users into installing it?",
      "options": [
        "Trojan",
        "Worm",
        "Spyware",
        "Ransomware"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A Trojan appears as legitimate software but contains malicious code. A worm (option 2) spreads without user interaction. Spyware (option 3) collects user data. Ransomware (option 4) encrypts files and demands payment.",
      "examTip": "Trojan = 'Looks legit but is dangerous'—never download unverified software!"
    },
    {
      "id": 67,
      "question": "Which of the following is a characteristic of a strong password?",
      "options": [
        "At least 12 characters with a mix of letters, numbers, and symbols",
        "Using common words for easy memorization",
        "Reusing the same password for multiple accounts",
        "Short and simple for convenience"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A strong password has at least 12 characters and includes uppercase/lowercase letters, numbers, and symbols. Using common words (option 2) makes passwords easy to guess. Reusing passwords (option 3) is risky. Short and simple passwords (option 4) are weak.",
      "examTip": "Strong password = 'Long + Complex + Unique'—never reuse passwords!"
    },
    {
      "id": 68,
      "question": "Which of the following BEST describes a role-based access control (RBAC) system?",
      "options": [
        "Permissions are assigned based on a user’s job function",
        "Users can choose their own access levels",
        "Access is granted to anyone who requests it",
        "All users have the same access rights"
      ],
      "correctAnswerIndex": 0,
      "explanation": "RBAC assigns permissions based on job roles, ensuring least privilege. Allowing users to choose access levels (option 2) is insecure. Granting access to anyone (option 3) is not RBAC. Giving all users the same access (option 4) ignores security principles.",
      "examTip": "RBAC = 'Only what you need'—access based on job role."
    },
    {
      "id": 69,
      "question": "Which of the following is a benefit of encrypting sensitive data?",
      "options": [
        "It protects data from unauthorized access",
        "It speeds up network performance",
        "It eliminates the need for passwords",
        "It makes data publicly accessible"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Encryption protects data by making it unreadable without the decryption key. It does not improve network speed (option 2). Passwords (option 3) are still needed for authentication. Encryption (option 4) does not make data public; it protects it.",
      "examTip": "Encryption = 'Data protection'—only authorized users can access it."
    },
    {
      "id": 70,
      "question": "Which security tool is used to detect and respond to suspicious activity on a network?",
      "options": [
        "Intrusion Detection System (IDS)",
        "Firewall",
        "Access control list (ACL)",
        "Load balancer"
      ],
      "correctAnswerIndex": 0,
      "explanation": "An IDS monitors network traffic and alerts administrators about suspicious activity. Firewalls (option 2) block traffic but do not analyze behavior. ACLs (option 3) define access permissions but do not detect threats. Load balancers (option 4) distribute network traffic but do not detect attacks.",
      "examTip": "IDS = 'Network security camera'—detects suspicious activity."
    },
    {
      "id": 71,
      "question": "Which of the following is the BEST way to protect against phishing attacks?",
      "options": [
        "User education and awareness training",
        "Using a simple password",
        "Disabling antivirus software",
        "Clicking on all email links to verify authenticity"
      ],
      "correctAnswerIndex": 0,
      "explanation": "User education and awareness training help employees recognize and avoid phishing attacks. Simple passwords (option 2) do not prevent phishing. Disabling antivirus software (option 3) increases risk. Clicking on all email links (option 4) increases exposure to phishing.",
      "examTip": "Phishing prevention = 'User awareness'—think before clicking!"
    },
    {
      "id": 72,
      "question": "Which of the following BEST describes the principle of least privilege?",
      "options": [
        "Users only receive the minimum access needed to perform their job",
        "All users have full administrative rights",
        "Users decide their own access levels",
        "All employees have the same permissions"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Least privilege ensures users only have the access required for their job. Full admin rights (option 2) increase security risks. Letting users decide access (option 3) is insecure. Equal permissions for all employees (option 4) ignores security policies.",
      "examTip": "Least privilege = 'Only what you need'—reduces security risks."
    },
    {
      "id": 73,
      "question": "Which of the following BEST describes a brute force attack?",
      "options": [
        "An attacker systematically tries every possible password combination",
        "An attacker sends fake emails to steal login credentials",
        "An attacker manipulates database queries to gain access",
        "An attacker floods a server with excessive traffic"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A brute force attack attempts every possible password combination until the correct one is found. Phishing (option 2) uses fake emails. SQL injection (option 3) manipulates database queries. A denial-of-service attack (option 4) floods a server with traffic.",
      "examTip": "Brute force = 'Tries everything'—longer passwords help prevent it."
    },
    {
      "id": 74,
      "question": "Which type of attack involves inserting malicious SQL code into a database query?",
      "options": [
        "SQL injection",
        "Phishing",
        "Denial-of-service (DoS)",
        "Brute force"
      ],
      "correctAnswerIndex": 0,
      "explanation": "SQL injection exploits vulnerabilities in database queries by inserting malicious code. Phishing (option 2) tricks users into revealing data. DoS (option 3) overwhelms a system with traffic. Brute force (option 4) guesses passwords repeatedly.",
      "examTip": "SQL injection = 'Injects malicious code into a database.'"
    },
    {
      "id": 75,
      "question": "Which of the following is a common method to secure wireless networks?",
      "options": [
        "Enabling WPA3 encryption",
        "Using open Wi-Fi",
        "Disabling all encryption",
        "Using WEP encryption"
      ],
      "correctAnswerIndex": 0,
      "explanation": "WPA3 encryption provides strong security for wireless networks. Open Wi-Fi (option 2) is insecure. Disabling encryption (option 3) exposes networks to attacks. WEP encryption (option 4) is outdated and vulnerable.",
      "examTip": "Wi-Fi security = 'Always use WPA3'—never WEP or open networks!"
    },
    {
      "id": 76,
      "question": "Which of the following is the BEST way to protect sensitive data stored on a laptop?",
      "options": [
        "Full-disk encryption",
        "Using a strong password",
        "Keeping the laptop in a locked drawer",
        "Disabling automatic updates"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Full-disk encryption ensures that even if the laptop is stolen, data remains protected. Strong passwords (option 2) help but do not encrypt data. Physical security (option 3) is important but does not protect stored data. Disabling updates (option 4) increases security risks.",
      "examTip": "Lost laptop? 'Full-disk encryption' = No data access without the key."
    },
    {
      "id": 77,
      "question": "Which of the following BEST describes two-factor authentication (2FA)?",
      "options": [
        "Using two different authentication factors to verify identity",
        "Using two passwords for added security",
        "Using a single password but requiring longer length",
        "Allowing users to log in without authentication"
      ],
      "correctAnswerIndex": 0,
      "explanation": "2FA requires two different authentication factors (e.g., password + fingerprint). Two passwords (option 2) are the same factor. Longer passwords (option 3) are stronger but do not make it 2FA. Option 4 is insecure.",
      "examTip": "2FA = 'Two different ways' to verify identity (password + phone code)."
    },
    {
      "id": 78,
      "question": "Which of the following is an example of a physical security control?",
      "options": [
        "Security camera",
        "Firewall",
        "Antivirus software",
        "Encryption"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A security camera is a physical security control. Firewalls (option 2) filter network traffic. Antivirus software (option 3) detects malware. Encryption (option 4) protects data but is not a physical control.",
      "examTip": "Physical security = 'Cameras, locks, fences'—not software!"
    },
    {
      "id": 79,
      "question": "Which of the following is the BEST way to secure a mobile device?",
      "options": [
        "Enabling biometric authentication",
        "Using a simple four-digit PIN",
        "Disabling automatic updates",
        "Connecting to open Wi-Fi networks"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Biometric authentication (e.g., fingerprint or face scan) enhances security. Simple PINs (option 2) are weak. Disabling updates (option 3) exposes devices to vulnerabilities. Open Wi-Fi (option 4) is insecure.",
      "examTip": "Mobile security = 'Biometric authentication' + strong passwords!"
    },
    {
      "id": 80,
      "question": "Which security concept ensures that a system remains available and operational even during a failure?",
      "options": [
        "Fault tolerance",
        "Confidentiality",
        "Access control",
        "Non-repudiation"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Fault tolerance ensures that systems remain operational even if a component fails. Confidentiality (option 2) protects sensitive data. Access control (option 3) regulates permissions. Non-repudiation (option 4) ensures actions cannot be denied.",
      "examTip": "Fault tolerance = 'No downtime'—keeps systems running."
    },
    {
      "id": 81,
      "question": "Which of the following is the BEST way to prevent unauthorized access to a laptop?",
      "options": [
        "Enable full-disk encryption and strong passwords",
        "Use a simple password for convenience",
        "Disable software updates",
        "Write the password on a sticky note"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Enabling full-disk encryption and using strong passwords protect data even if the laptop is stolen. Simple passwords (option 2) are easy to guess. Disabling updates (option 3) increases security risks. Writing passwords down (option 4) makes them vulnerable to theft.",
      "examTip": "Laptop security = 'Encryption + Strong password'—never write it down!"
    },
    {
      "id": 82,
      "question": "Which type of attack floods a network with excessive traffic to make resources unavailable?",
      "options": [
        "Denial-of-Service (DoS)",
        "Phishing",
        "Brute force",
        "Man-in-the-Middle (MITM)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A DoS attack overwhelms a system with traffic, preventing legitimate access. Phishing (option 2) tricks users into revealing credentials. Brute force (option 3) attempts to guess passwords. MITM (option 4) intercepts and manipulates communication.",
      "examTip": "DoS = 'Flood the network'—denies service to real users."
    },
    {
      "id": 83,
      "question": "Which security control is used to restrict access to a network based on user identity?",
      "options": [
        "Access control list (ACL)",
        "Firewall",
        "Intrusion detection system (IDS)",
        "Antivirus software"
      ],
      "correctAnswerIndex": 0,
      "explanation": "An ACL defines permissions for users and devices accessing a network. Firewalls (option 2) filter traffic but do not enforce identity-based rules. IDS (option 3) detects threats but does not restrict access. Antivirus software (option 4) protects against malware but does not control access.",
      "examTip": "ACL = 'Who gets access to what'—controls network permissions."
    },
    {
      "id": 84,
      "question": "Which of the following is an example of biometric authentication?",
      "options": [
        "Fingerprint scan",
        "Security question",
        "Password",
        "One-time passcode"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A fingerprint scan is a form of biometric authentication ('something you are'). Security questions (option 2) and passwords (option 3) are 'something you know.' One-time passcodes (option 4) are 'something you have,' not biometric.",
      "examTip": "Biometric = 'Something you ARE'—fingerprint, retina, face scan."
    },
    {
      "id": 85,
      "question": "Which type of encryption is commonly used to secure data in transit?",
      "options": [
        "TLS",
        "SHA-256",
        "Full-disk encryption",
        "MD5"
      ],
      "correctAnswerIndex": 0,
      "explanation": "TLS (Transport Layer Security) encrypts data in transit (e.g., HTTPS, VPNs). SHA-256 (option 2) and MD5 (option 4) are hashing algorithms, not encryption. Full-disk encryption (option 3) protects stored data, not data in transit.",
      "examTip": "TLS = 'Encrypts data in transit'—used for HTTPS, email, and VPNs."
    },
    {
      "id": 86,
      "question": "Which of the following is the BEST way to prevent unauthorized physical access to a server room?",
      "options": [
        "Implementing biometric access controls",
        "Using default passwords on servers",
        "Allowing all employees to enter",
        "Disabling logging for access attempts"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Biometric access controls (e.g., fingerprint or retina scans) ensure only authorized personnel enter the server room. Default passwords (option 2) are a security risk. Allowing all employees access (option 3) weakens security. Disabling logging (option 4) removes the ability to track access attempts.",
      "examTip": "Server room security = 'Biometric access + Logging'—track who enters!"
    },
    {
      "id": 87,
      "question": "Which of the following BEST describes a zero-day attack?",
      "options": [
        "An exploit that takes advantage of a vulnerability before a fix is available",
        "An attack that relies on outdated software",
        "A brute force attack on a password",
        "An attack that only affects cloud environments"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A zero-day attack exploits a vulnerability before a fix is available. Outdated software (option 2) can be vulnerable, but zero-day exploits affect even updated systems. Brute force attacks (option 3) involve guessing passwords, not exploiting unknown vulnerabilities. Zero-day attacks (option 4) can target any environment, not just the cloud.",
      "examTip": "Zero-day = 'No fix yet'—attackers exploit unknown flaws."
    },
    {
      "id": 88,
      "question": "Which of the following BEST describes the purpose of a firewall?",
      "options": [
        "To filter network traffic based on security rules",
        "To detect malware on a computer",
        "To encrypt stored data",
        "To monitor user behavior"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A firewall filters network traffic, blocking or allowing connections based on security rules. Malware detection (option 2) is handled by antivirus software. Encryption (option 3) protects data but does not filter traffic. Monitoring user behavior (option 4) is typically done by security logs or behavior analytics tools.",
      "examTip": "Firewall = 'Traffic cop'—controls what enters and leaves the network."
    },
    {
      "id": 89,
      "question": "Which of the following BEST describes a social engineering attack?",
      "options": [
        "An attack that manipulates people into revealing sensitive information",
        "A brute force attack to guess passwords",
        "A denial-of-service (DoS) attack to overwhelm a server",
        "An attack that exploits software vulnerabilities"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Social engineering attacks manipulate people into revealing confidential information. Brute force attacks (option 2) systematically guess passwords. DoS attacks (option 3) overwhelm a system with traffic. Software exploitation (option 4) involves attacking vulnerabilities, not people.",
      "examTip": "Social engineering = 'Hacking people'—not systems!"
    },
    {
      "id": 90,
      "question": "Which of the following is the MOST secure way to authenticate a user?",
      "options": [
        "Multi-factor authentication (MFA)",
        "Using only a password",
        "Relying on a security question",
        "Using the same password for multiple accounts"
      ],
      "correctAnswerIndex": 0,
      "explanation": "MFA provides the highest level of security by requiring multiple authentication factors (e.g., password + fingerprint). Password-only authentication (option 2) is weaker. Security questions (option 3) can be guessed or found online. Reusing passwords (option 4) is a major security risk.",
      "examTip": "MFA = 'More than one factor'—adds extra security!"
    },
    {
      "id": 91,
      "question": "Which of the following is an example of a strong authentication method?",
      "options": [
        "Multi-factor authentication (MFA)",
        "Using a short, simple password",
        "Relying only on a security question",
        "Using the same password across multiple accounts"
      ],
      "correctAnswerIndex": 0,
      "explanation": "MFA enhances security by requiring multiple authentication factors. Short passwords (option 2) are easy to crack. Security questions (option 3) can be guessed or found online. Reusing passwords (option 4) increases security risks.",
      "examTip": "MFA = 'More than one factor'—best way to secure accounts!"
    },
    {
      "id": 92,
      "question": "Which of the following is a common way attackers gain unauthorized access to accounts?",
      "options": [
        "Credential stuffing",
        "Using complex passwords",
        "Keeping software up to date",
        "Enabling multi-factor authentication"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Credential stuffing involves using leaked usernames and passwords from previous breaches. Complex passwords (option 2) help prevent unauthorized access. Updating software (option 3) patches vulnerabilities. MFA (option 4) adds extra security.",
      "examTip": "Credential stuffing = 'Using leaked passwords'—never reuse passwords!"
    },
    {
      "id": 93,
      "question": "Which of the following helps prevent unauthorized access to mobile devices?",
      "options": [
        "Biometric authentication",
        "Disabling security updates",
        "Connecting to open Wi-Fi networks",
        "Using a simple four-digit PIN"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Biometric authentication (e.g., fingerprint or face scan) adds an extra layer of security. Disabling updates (option 2) increases risk. Open Wi-Fi (option 3) is insecure. A simple PIN (option 4) is easy to guess.",
      "examTip": "Mobile security = 'Use biometrics + strong passwords'!"
    },
    {
      "id": 94,
      "question": "Which of the following BEST describes an insider threat?",
      "options": [
        "A current or former employee misusing access to cause harm",
        "A hacker exploiting a software vulnerability",
        "An attacker launching a phishing campaign",
        "A botnet launching a distributed denial-of-service (DDoS) attack"
      ],
      "correctAnswerIndex": 0,
      "explanation": "An insider threat comes from someone within the organization who misuses their access. Software exploits (option 2), phishing (option 3), and botnets (option 4) are external threats.",
      "examTip": "Insider threat = 'The danger is inside'—employees misusing access."
    },
    {
      "id": 95,
      "question": "Which of the following is a primary benefit of encryption?",
      "options": [
        "Protects data from unauthorized access",
        "Increases system speed",
        "Eliminates the need for strong passwords",
        "Makes data publicly accessible"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Encryption protects data by making it unreadable without the decryption key. It does not increase system speed (option 2). Strong passwords (option 3) are still necessary. Encryption (option 4) secures data, not makes it public.",
      "examTip": "Encryption = 'Data stays safe'—only authorized users can read it."
    },
    {
      "id": 96,
      "question": "Which of the following BEST describes the purpose of a honeypot?",
      "options": [
        "To lure and detect attackers",
        "To prevent phishing attacks",
        "To encrypt network traffic",
        "To store sensitive company data"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A honeypot is a decoy system designed to attract and study attackers. Phishing prevention (option 2) is done through email filters and training. Encryption (option 3) secures data but does not detect attacks. Storing sensitive data (option 4) should be done in secure environments, not honeypots.",
      "examTip": "Honeypot = 'Fake system'—used to bait and track hackers."
    },
    {
      "id": 97,
      "question": "Which of the following BEST describes the role of an intrusion prevention system (IPS)?",
      "options": [
        "Detects and blocks malicious activity in real-time",
        "Encrypts sensitive data",
        "Monitors physical security",
        "Manages firewall rules"
      ],
      "correctAnswerIndex": 0,
      "explanation": "An IPS detects and actively blocks threats in real time. Encryption (option 2) secures data but does not detect attacks. Physical security (option 3) is handled by surveillance and access controls. Firewalls (option 4) filter traffic but do not always actively prevent intrusions.",
      "examTip": "IPS = 'Detect & Block'—stops threats before they spread!"
    },
    {
      "id": 98,
      "question": "Which of the following is an effective way to protect a network from malware?",
      "options": [
        "Using endpoint protection software",
        "Clicking on unknown email attachments",
        "Disabling antivirus updates",
        "Using weak passwords"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Endpoint protection software detects and removes malware from systems. Clicking unknown attachments (option 2) increases infection risk. Disabling antivirus updates (option 3) leaves systems vulnerable. Weak passwords (option 4) do not prevent malware.",
      "examTip": "Malware protection = 'Use endpoint security + Avoid suspicious links.'"
    },
    {
      "id": 99,
      "question": "Which of the following is the BEST way to secure cloud-based data?",
      "options": [
        "Enable encryption and access controls",
        "Use weak passwords",
        "Disable security monitoring",
        "Allow all users unrestricted access"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Encrypting data and using strict access controls protect cloud-based data. Weak passwords (option 2) reduce security. Disabling monitoring (option 3) removes threat detection. Allowing unrestricted access (option 4) increases risks.",
      "examTip": "Cloud security = 'Encryption + Access controls'—never leave it open!"
    },
    {
      "id": 100,
      "question": "Which of the following BEST describes the CIA triad in cybersecurity?",
      "options": [
        "Confidentiality, Integrity, Availability",
        "Cybersecurity, Internet, Authentication",
        "Cloud, Identity, Access",
        "Control, Intelligence, Analysis"
      ],
      "correctAnswerIndex": 0,
      "explanation": "The CIA triad stands for Confidentiality (data privacy), Integrity (data accuracy), and Availability (system uptime). The other options are unrelated to cybersecurity principles.",
      "examTip": "CIA triad = 'Keep data safe, accurate, and available'!"
    }
  ]
});   
