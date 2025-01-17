import React, { useState } from 'react';
import './Resources.css'; 


const cyberSecurityTools = [
  { name: 'Nmap', url: 'https://nmap.org/' },
  { name: 'Burp Suite', url: 'https://portswigger.net/burp' },
  { name: 'Wireshark', url: 'https://www.wireshark.org/' },
  { name: 'Nessus', url: 'https://www.tenable.com/products/nessus' },
  { name: 'Nikto', url: 'https://cirt.net/Nikto2' },
  { name: 'OWASP ZAP', url: 'https://www.zaproxy.org/' },
  { name: 'Metasploit', url: 'https://www.metasploit.com/' },
  { name: 'Hydra', url: 'https://github.com/vanhauser-thc/thc-hydra' },
  { name: 'John the Ripper', url: 'https://www.openwall.com/john/' },
  { name: 'Aircrack-ng', url: 'https://www.aircrack-ng.org/' },
  { name: 'SQLmap', url: 'https://sqlmap.org/' },
  { name: 'Mimikatz', url: 'https://github.com/gentilkiwi/mimikatz' },
  { name: 'Gobuster', url: 'https://github.com/OJ/gobuster' },
  { name: 'Hashcat', url: 'https://hashcat.net/hashcat/' },
  { name: 'Impacket', url: 'https://github.com/fortra/impacket' },
  { name: 'BloodHound', url: 'https://github.com/BloodHoundAD/BloodHound' },
  { name: 'Cuckoo Sandbox', url: 'https://cuckoosandbox.org/' },
  { name: 'Suricata', url: 'https://suricata.io/' },
  { name: 'Wfuzz', url: 'https://github.com/xmendez/wfuzz' },
  { name: 'OSSEC', url: 'https://www.ossec.net/' },
  { name: 'Acunetix', url: 'https://www.acunetix.com/' },
  { name: 'WPScan', url: 'https://wpscan.com/' },
  { name: 'SkipFish', url: 'https://github.com/spinkham/skipfish' },
  { name: 'Ncrack', url: 'https://github.com/nmap/ncrack' },
  { name: 'OWASP D4N155', url: 'https://github.com/OWASP/D4N155' },
  { name: 'Kismet', url: 'https://github.com/kismetwireless/kismet' },
  { name: 'Searchsploit', url: 'https://github.com/dev-angelist/Ethical-Hacking-Tools/blob/main/practical-ethical-hacker-notes/tools/searchsploit.md' },
  { name: 'Maltego', url: 'https://www.maltego.com/' },
  { name: 'legion', url: 'https://github.com/Abacus-Group-RTO/legion' },
  { name: 'recon-ng', url: 'https://github.com/lanmaster53/recon-ng' },
  { name: 'evil-winrm', url: 'https://github.com/Hackplayers/evil-winrm' },
  { name: 'Kali Linux tools', url: 'https://www.kali.org/tools/' },
  { name: 'Social-Engineer Toolkit (SET)', url: 'https://github.com/trustedsec/social-engineer-toolkit' },
  { name: 'Ghidra', url: 'https://ghidra-sre.org/' },
  { name: 'Binwalk', url: 'https://github.com/ReFirmLabs/binwalk' },
  { name: 'Volatility', url: 'https://www.volatilityfoundation.org/' },
  { name: 'Radare2', url: 'https://github.com/radareorg/radare2' },
  { name: 'BeEF (Browser Exploitation Framework)', url: 'https://github.com/beefproject/beef' },
  { name: 'Empire', url: 'https://github.com/EmpireProject/Empire' },
  { name: 'Bettercap', url: 'https://github.com/bettercap/bettercap' },
  { name: 'Responder', url: 'https://github.com/SpiderLabs/Responder' },
  { name: 'CrackMapExec', url: 'https://github.com/Porchetta-Industries/CrackMapExec' },
  { name: 'Fierce', url: 'https://github.com/mschwager/fierce' },
  { name: 'SSLstrip', url: 'https://github.com/moxie0/sslstrip' },
  { name: 'Ettercap', url: 'https://github.com/Ettercap/ettercap' },
  { name: 'Fiddler', url: 'https://www.telerik.com/fiddler' },
  { name: 'theHarvester', url: 'https://github.com/laramies/theHarvester' },
  { name: 'Wapiti', url: 'https://github.com/wapiti-scanner/wapiti' },
  { name: 'Arachni', url: 'https://github.com/Arachni/arachni' },
  { name: 'Shellter', url: 'https://www.shellterproject.com/' },
  { name: 'Yersinia', url: 'https://github.com/tomac/yersinia' },
  { name: 'Amass', url: 'https://github.com/owasp-amass/amass' },
  { name: 'mitmproxy', url: 'https://github.com/mitmproxy/mitmproxy' },
  { name: 'Nuclei', url: 'https://github.com/projectdiscovery/nuclei' },
  { name: 'Sublist3r', url: 'https://github.com/aboul3la/Sublist3r' },
  { name: 'EyeWitness', url: 'https://github.com/FortyNorthSecurity/EyeWitness' },
  { name: 'RouterSploit', url: 'https://github.com/threat9/routersploit' },
];


const redditSubreddits = [
  { name: 'r/CompTIA', url: 'https://www.reddit.com/r/CompTIA/' },
  { name: 'r/CyberSecurity', url: 'https://www.reddit.com/r/cybersecurity/' },
  { name: 'r/AskNetsec', url: 'https://www.reddit.com/r/AskNetsec/' },
  { name: 'r/Casp', url: 'https://www.reddit.com/r/casp/' },
  { name: 'r/ITCareerQuestions', url: 'https://www.reddit.com/r/ITCareerQuestions/' },
  { name: 'r/WGU', url: 'https://www.reddit.com/r/WGU/' },
  { name: 'r/CCNA', url: 'https://www.reddit.com/r/ccna/' },
  { name: 'r/sysadmin', url: 'https://www.reddit.com/r/sysadmin/' },
  { name: 'r/linuxquestions/', url: 'https://www.reddit.com/r/linuxquestions/' },
  { name: 'r/netsec', url: 'https://www.reddit.com/r/netsec/' },
  { name: 'r/ReverseEngineering', url: 'https://www.reddit.com/r/ReverseEngineering/' },
  { name: 'r/BlueTeamSec', url: 'https://www.reddit.com/r/BlueTeamSec/' },
  { name: 'r/RedTeam', url: 'https://www.reddit.com/r/RedTeam/' },
  { name: 'r/InformationSecurity', url: 'https://www.reddit.com/r/InformationSecurity/' },
  { name: 'r/ethicalhacking', url: 'https://www.reddit.com/r/ethicalhacking/' },
  { name: 'r/ITsecurity', url: 'https://www.reddit.com/r/ITsecurity/' },
  { name: 'r/netsecstudents', url: 'https://www.reddit.com/r/netsecstudents/' },
];

const redditPosts = [
  { title: 'Master List: I Compiled and Ranked Every Major Studying Resource for A+, Network+, and Security+ Here!', url: 'https://www.reddit.com/r/CompTIA/comments/i7hx4t/master_list_i_compiled_and_ranked_every_major/' },
  { title: 'How a dumdum like me passed sec+', url: 'https://www.reddit.com/r/CompTIA/comments/zkjs1d/how_a_dumdum_like_me_passed_sec/' },
  { title: 'How I passed COMPTIA A+ N+ S+', url: 'https://www.reddit.com/r/CompTIA/comments/1cra3cg/how_i_passed_comptia_a_n_s/' },
  { title: 'ChatGPT explained DHCP to me in gangsta terms', url: 'https://www.reddit.com/r/CompTIA/comments/11ytgbz/chatgpt_explained_dhcp_to_me_in_gangsta_terms/' },
  { title: 'Don’t Pay for Udemy Courses! Access them for Free! Legally & Ethically', url: 'https://www.reddit.com/r/CompTIA/comments/12aug8f/dont_pay_for_udemy_courses_access_them_for_free/' },
  { title: 'For Those Of You Wondering if COMPTIA is Worth it; Just Do it', url: 'https://www.reddit.com/r/CompTIA/comments/1f11fbc/for_those_of_you_wondering_if_comptia_is_worth_it/' },
  { title: '[UPDATE] 34 years old, posted a month ago about passing the A+, no IT experience, no college degree -- just got hired today after 2 weeks of sending out resumes. Wanted to share my experience and tips.', url: 'https://www.reddit.com/r/CompTIA/comments/m38lb8/update_34_years_old_posted_a_month_ago_about/' },
  { title: 'Just passed Network+! How I did it...', url: 'https://www.reddit.com/r/CompTIA/comments/1gfmkqf/just_passed_network_how_i_did_it/' },
  { title: 'Just passed Network+, got the trifecta in about 6 months, study tips I learned that I want to share since everyone was so helpful on this sub.', url: 'https://www.reddit.com/r/CompTIA/comments/1fmjb2p/just_passed_network_got_the_trifecta_in_about_6/' },
  { title: 'I passed CASP+ - This is what I did to prepare', url: 'https://www.reddit.com/r/casp/comments/1ft2qjr/i_passed_casp_this_is_what_i_did_to_prepare/' },
  { title: 'PBQs guidance (comments)', url: 'https://www.reddit.com/r/casp/comments/1cuhbmw/pbqs_guidance/' },
  { title: 'Passed Sec+, Pentest+, CYSA+ in 2 months 22 days without prior experience or any other certs. My detailed study path below.', url: 'https://www.reddit.com/r/CompTIA/comments/1f5cofp/passed_sec_pentest_cysa_in_2_months_22_days/' },
  { title: 'General advice from a hiring manager and 23 year industry veteran to newbies', url: 'https://www.reddit.com/r/ITCareerQuestions/comments/ni4vnm/general_advice_from_a_hiring_manager_and_23_year/' },
];


const youtubeChannels = [
  { name: 'Professor Messer', url: 'https://www.youtube.com/@professormesser' },
  { name: 'NetworkChuck', url: 'https://www.youtube.com/@NetworkChuck' },
  { name: 'PowerCertAnimatedVideos', url: 'https://www.youtube.com/@PowerCertAnimatedVideos' },
  { name: 'HackerSploit', url: 'https://www.youtube.com/@HackerSploit' },
  { name: 'Cyberkraft', url: 'https://www.youtube.com/@cyberkraft' },
  { name: 'howtonetwork', url: 'https://www.youtube.com/@howtonetworkcom' },
  { name: 'MyCS1', url: 'https://www.youtube.com/@MyCS1/videos' },
  { name: 'CBT Nuggets', url: 'https://www.youtube.com/user/cbtnuggets' },
  { name: 'Eli the Computer Guy', url: 'https://www.youtube.com/user/elithecomputerguy' },
  { name: 'The Cyber Mentor', url: 'https://www.youtube.com/channel/UC0ArlFuFYMpEewyRBzdLHiw' },
  { name: 'ITProTV', url: 'https://www.youtube.com/user/ITProTV' },
  { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/freecodecamp' },
  { name: 'With Sandra', url: 'https://www.youtube.com/@WithSandra' },
  { name: 'Andrew Huberman', url: 'https://www.youtube.com/@hubermanlab' },
  { name: 'The Cyberboy', url: 'https://www.youtube.com/@the_cyb3rb0y' },
  { name: 'Tech with Jono', url: 'https://www.youtube.com/@TechwithJono' },
  { name: 'Whitesec cyber security', url: 'https://www.youtube.com/@whiteseccybersecurity' },
  { name: 'Practical Networking', url: 'https://www.youtube.com/@PracticalNetworking' },
  { name: 'IT k Funde', url: 'https://www.youtube.com/@ITkFunde' },
  { name: 'Mad Hat', url: 'https://www.youtube.com/@madhatistaken' },
  { name: 'SomeOrdinaryGamers', url: 'https://www.youtube.com/@SomeOrdinaryGamers' },
  { name: 'TheBeardedITDad', url: 'https://www.youtube.com/@TheBeardedITDad' },
];


const youtubeVideos = [
  { title: 'How to Pass your 220-1101 and 220-1102 A+ Exams - CompTIA A+ 220-1101', url: 'https://www.youtube.com/watch?v=87t6P5ZHTP0&list=PLG49S3nxzAnnOmvg5UGVenB_qQgsh01uC' },
  { title: 'CompTIA A+ Full Course - FREE - [31+ Hours]', url: 'https://www.youtube.com/watch?v=1CZXXNKAY5o&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=5' },
  { title: 'CompTIA A+ Certification Practice Test 2024 (Exam 220-1101) (40 Questions with Explained Answers)', url: 'https://www.youtube.com/watch?v=e16It3eYHgc&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=10' },
  { title: 'How to Pass Your N10-008 Network+ Exam', url: 'https://www.youtube.com/watch?v=As6g6IXcVa4&list=PLG49S3nxzAnlCJiCrOYuRYb6cne864a7G' },
  { title: 'Computer Networking Course - Network Engineering [CompTIA Network+ Exam Prep]', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=6' },
  { title: 'Networking basics (2024) | What is a switch, router, gateway, subnet, gateway, firewall & DMZ', url: 'https://www.youtube.com/watch?v=_IOZ8_cPgu8&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=7' },
  { title: 'How to Pass Your SY0-701 Security+ Exam', url: 'https://www.youtube.com/watch?v=KiEptGbnEBc&list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv' },
  { title: 'Security+ Certification SY0-701 50 Practice Questions', url: 'https://www.youtube.com/watch?v=yPqSLJG8Rt0&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=2' },
  { title: 'CompTIA Security+ SY0-701. 50 Exam Practice Question', url: 'https://www.youtube.com/watch?v=2qrPJbL9G6c&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=14' },
  { title: 'CompTIA Security+ SY0-701 - Series Intro & Exam Prep Strategy', url: 'https://www.youtube.com/watch?v=1E7pI7PB4KI&list=PL7XJSuT7Dq_UDJgYoQGIW9viwM5hc4C7n' },
  { title: 'CompTIA CySA+ // 2024 Crash Course // 10+ Hours for FREE', url: 'https://www.youtube.com/watch?v=qP9x0mucwVc&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=9' },
  { title: 'COMPTIA Pentest+ Course Preparation TryHackMe', url: 'https://www.youtube.com/watch?v=cADW_cUJni0&list=PLqM63j87R5p4olmWpzqaXMhEP2zEnQhPD' },
  { title: 'What is Subnetting? - Subnetting Mastery  NOTE: I HIGHLY RECOMMEND!', url: 'https://www.youtube.com/watch?v=BWZ-MHIhqjM&list=PLIFyRwBY_4bQUE4IB5c4VPRyDoLgOdExE' },
  { title: 'IT Security Certifications: CySA+ vs PenTest+ vs CISSP', url: 'https://www.youtube.com/watch?v=YhCvNARSPo4' },
  { title: 'Ethical Hacking in 15 Hours - 2023 Edition - Learn to Hack! (Part 1)', url: 'https://www.youtube.com/watch?v=3FNYvj2U0HM&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=13' },
  { title: 'Paypal - Live bug bounty hunting on Hackerone | Live Recon | part 2', url: 'https://www.youtube.com/watch?v=Dtx4kNXj0OQ&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=11' },
  { title: 'Complete Ethical hacking course 16 hours | ethical hacking full course with practical | Zero to Hero', url: 'https://www.youtube.com/watch?v=w_oxcjPOWos&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=4' },
  { title: 'Full Ethical Hacking Course - Network Penetration Testing for Beginners (2019)', url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=3' },
  { title: 'How to Get an IT Job Without Experience', url: 'https://www.youtube.com/watch?v=XkTNQCtuRPY&list=PLG49S3nxzAnkUvxTH_ANPYQWGo9wYlz7h' },
  { title: 'Start your IT Career with the CompTIA Trifecta? A+, Net+, Sec+', url: 'https://www.youtube.com/watch?v=IBKW0s20T8o&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=12' },
  { title: 'How I Would Learn Cyber Security if I Could Start Over in 2024 (Beginner Roadmap)', url: 'https://www.youtube.com/watch?v=b12JrM-6DBY&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=15' },
  { title: 'Network Protocols - ARP, FTP, SMTP, HTTP, SSL, TLS, HTTPS, DNS, DHCP - Networking Fundamentals - L6', url: 'https://www.youtube.com/watch?v=E5bSumTAHZE&list=PLejqXniG-4qmFqpxbWd7Oo235uH1ffG2x&index=16' },
  { title: 'Network Devices - Hosts, IP Addresses, Networks - Networking Fundamentals', url: 'https://www.youtube.com/watch?v=bj-Yfakjllc&list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi' },
  { title: 'Python Full Course for free 🐍 (2024)', url: 'https://www.youtube.com/watch?v=ix9cRaBkVe0' },
  { title: 'Optimal Protocols for Studying & Learning', url: 'https://youtu.be/ddq8JIMhz7c?si=qT00KFkFBAwm7LP7' },
  { title: 'How to Study & Learn Using Active Recall | Dr. Cal Newport & Dr. Andrew Huberman', url: 'https://youtu.be/mzexJPoXBCM?si=sv-yeuIoLF9pwDRG' },
  { title: 'How to Learn Faster by Using Failures, Movement & Balance | Huberman Lab Essentials', url: 'https://youtu.be/jwChiek_aRY?si=3kyPbIAVwJWMPfnG' },
  { title: 'Best FREE Beginner Cybersecurity Courses for 2025 | Best Cybersecurity Training for Beginners 2025', url: 'https://youtu.be/SwisCiNA9eI?si=3HlXVljXHWgHhc0F' },
  { title: 'IBM IT Support - Complete Course | IT Support Technician - Full Course', url: 'https://www.youtube.com/watch?v=BNbPsiCGQzw' },
  { title: 'What is the A+ Certification? How You Can Get A+ Certified', url: 'https://www.youtube.com/watch?v=IlKRm_8EmP0' },
  { title: 'CompTIA CASP+ PBQ', url: 'https://www.youtube.com/live/eInvTuYBF3Q?si=Hbe4mWLd3X31AUkA' },
  { title: 'CompTIA Security+ 701 PBQ', url: 'https://youtu.be/zfwxSmL4n6w?si=q5lXlvmViTK6TnSI' },
  { title: 'CompTIA CySa+ PBQ', url: 'https://www.youtube.com/live/0NMffWaxlmA?si=Rm9IBkZ04OAxFJtp' },
  { title: 'CompTIA Network+ PBQ', url: 'https://www.youtube.com/live/9cdL214y-u0?si=lCSxriFy636PbOnR' },
  { title: 'CASP+ course', url: 'https://www.youtube.com/watch?v=vwNjLVpXNzk&list=PLCNmoXT8zexnJtDOdd8Owa8TAdSVVWF-J' },
  { title: 'NMAP Full Guide', url: 'https://www.youtube.com/watch?v=JHAMj2vN2oU&t=33s' },
];

const udemyCourses = [
  { title: 'CompTIA Security+ (SY0-701) Complete Course & Exam', url: 'https://www.udemy.com/course/securityplus' },
  { title: 'CompTIA Security+ (SY0-701) Practice Exams Set 1', url: 'https://www.udemy.com/course/comptia-security-sy0-701-practice-exams/' },
  { title: 'CompTIA Security+ (SY0-701) Practice Exams Set 2', url: 'https://www.udemy.com/course/comptia-security-sy0-701-practice-exams-2nd-edition/' },
  { title: 'TOTAL: CompTIA Security+ Certification Course + Exam SY0-701', url: 'https://www.udemy.com/course/total-comptia-security-plus/' },
  { title: 'CompTIA A+ Core 1 (220-1101) Complete Course & Practice Exam', url: 'https://www.udemy.com/course/comptia-a-core-1/' },
  { title: 'CompTIA A+ Core 2 (220-1102) Complete Course & Practice Exam', url: 'https://www.udemy.com/course/comptia-a-core-2/' },
  { title: 'CompTIA A+ (220-1101) Core 1 Practice Exams *New for 2023*', url: 'https://www.udemy.com/course/comptia-a-220-1101-core-1-practice-exams-new-for-2022/' },
  { title: 'CompTIA A+ (220-1102) Core 2 Practice Exams *New for 2023*', url: 'https://www.udemy.com/course/comptia-a-220-1102-core-2-practice-exams-new-for-2022/' },
  { title: 'CompTIA A+ Core 1 & Core 2 - IT Cert Doctor - 2024', url: 'https://www.udemy.com/course/it-cert-doctor-comptia-a-220-1101-1102/' },
  { title: 'TOTAL: CompTIA A+ Core 2 (220-1102) Course + Exam', url: 'https://www.udemy.com/course/comptia-aplus-core-2/' },
  { title: 'TOTAL: CompTIA A+ Core 1 (220-1101) Course + Exam', url: 'https://www.udemy.com/course/comptia-aplus-core-1/' },
  { title: 'CompTIA Network+ (N10-009) Full Course & Practice Exam', url: 'https://www.udemy.com/course/comptia-network-009/' },
  { title: 'CompTIA Network+ (N10-009) 6 Full Practice Exams Set 1', url: 'https://www.udemy.com/course/comptia-network-n10-009-6-practice-exams-and-pbqs-set-1/' },
  { title: 'CompTIA Network+ (N10-009) 6 Full Practice Exams Set 2', url: 'https://www.udemy.com/course/comptia-network-n10-009-6-practice-exams-and-pbqs-set-2/' },
  { title: 'TOTAL: CompTIA Network+ (N10-008) Course + Exam', url: 'https://www.udemy.com/course/comptia-networkplus-certification/' },
  { title: 'CompTIA CySA+ (CS0-003) Complete Course & Practice Exam', url: 'https://www.udemy.com/course/comptia-cysa-003/' },
  { title: 'CompTIA CySA+ (CS0-003) Practice Exams', url: 'https://www.udemy.com/course/comptia-cysa-cs0-003-practice-exams/' },
  { title: 'CompTIA PenTest+ (PT0-003) Full Course & Practice Exam', url: 'https://www.udemy.com/course/pentestplus/' },
  { title: 'https://www.udemy.com/course/comptia-pentest-pt0-003-6-practice-exams/', url: 'https://www.udemy.com/course/comptia-pentest-pt0-003-6-practice-exams/' },
  { title: 'CompTIA PenTest+ (PT0-002) Practice Certification Exams', url: 'https://www.udemy.com/course/comptia-pentest-exams-002/' },
  { title: 'CompTIA SecurityX (CAS-005) Complete Course & Practice Exam', url: 'https://www.udemy.com/course/casp-plus/' },
  { title: 'CompTIA SecurityX (CAS-005) Practice Exam Prep *NEW', url: 'https://www.udemy.com/course/comptia-securityx-practice-exam-prep-new/' },
  { title: 'CASP+ (CAS-004) Full-length Practice Certification Exams', url: 'https://www.udemy.com/course/casp-exams-004/' },
  { title: 'CompTIA Linux+ (XK0-005) Complete Course & Exam', url: 'https://www.udemy.com/course/comptia-linux/' },
  { title: 'CompTIA Linux+ (XK0-005) Practice Exams & Simulated PBQs', url: 'https://www.udemy.com/course/comptia-linux-exams/' },
  { title: 'TOTAL: Cloud Computing / CompTIA Cloud+ (CV0-003)', url: 'https://www.udemy.com/course/total-cloud-computing-comptia-cloud-cert-cv0-002/' },
  { title: 'TOTAL: CompTIA Cloud+ (CV0-003): 4 Practice Tests', url: 'https://www.udemy.com/course/total-comptia-cloud-cv0-003-4-practice-tests/' },
  { title: 'CompTIA Cloud+ (CV0-004) Practice Exam Prep *NEW*', url: 'https://www.udemy.com/course/comptia-cloud-plus-practice-exam-prep-course/' },
  { title: 'CompTIA Cloud Essentials+ (CL0-002) Complete Course & Exam', url: 'https://www.udemy.com/course/cloud-essentials-course' },
  { title: 'CompTIA Cloud Essentials+ (CL0-002) Practice Exams', url: 'https://www.udemy.com/course/cloud-essentials-exams/' },
  { title: 'CompTIA Project+ (PK0-005) Practice Exams', url: 'https://www.udemy.com/course/comptia-project-pk0-005-complete-course-practice-exam/' },
  { title: 'CompTIA Data+ (DA0-001) Practice Certification Exams', url: 'https://www.udemy.com/course/comptia-data/' },
  { title: 'CompTIA Server+ | CompTIA Server+ SK0-005 Certification Prep', url: 'https://www.udemy.com/course/comptia-server-comptia-server-sk0-005-certification-prep/' },
  { title: 'TOTAL: CompTIA Server+ (SK0-005): 4 Practice Tests 200 Qs', url: 'https://www.udemy.com/course/total-comptia-server-sk0-005-4-practice-tests-200qs/' },
  { title: 'CompTIA IT Fundamentals (FCO-U61) Complete Course & Exam', url: 'https://www.udemy.com/course/comptia-it-fundamentals-fco-u61-complete-course-exam/' },
  { title: 'CompTIA IT Fundamentals (FCO-U61) Six Practice Exams', url: 'https://www.udemy.com/course/comptia-it-fundamentals-fco-u61-six-practice-exams/' },
  { title: 'TOTAL: CompTIA Tech+ (FC0-U71)', url: 'https://www.udemy.com/course/it-fundamentals-fc0-u61-the-total-course/' },
  { title: 'CompTIA Tech+ (FC0-U71) Complete Course & Exam', url: 'https://www.udemy.com/course/comptia-tech-fc0-u71-complete-course-exam/' },
  { title: 'ISC2 CISSP Full Course & Practice Exam', url: 'https://www.udemy.com/course/isc2-cissp-full-course-practice-exam/' },
  { title: 'ISC2 CISSP 6 Practice Exams', url: 'https://www.udemy.com/course/isc2-cissp-6-practice-exams/' },
  { title: 'The Complete Certified in Cybersecurity CC course ISC2 2024', url: 'https://www.udemy.com/course/certifiedincybersecurity/' },
  { title: 'The Complete Cyber Security Course : Hackers Exposed!', url: 'https://www.udemy.com/course/the-complete-internet-security-privacy-course-volume-1/' },
  { title: 'The Complete Cyber Security Course : Network Security!', url: 'https://www.udemy.com/course/network-security-course/' },
  { title: 'The Complete Cyber Security Course : End Point Protection!', url: 'https://www.udemy.com/course/the-complete-cyber-security-course-end-point-protection/' },
  { title: 'Complete Ethical Hacking & Cyber Security Masterclass Course', url: 'https://www.udemy.com/course/ethicalhackingcourse/' },
  { title: 'Implementing the NIST Cybersecurity Framework (CSF)', url: 'https://www.udemy.com/course/nist-cybersecurity-framework/' },
  { title: 'Notes!! - CompTIA A+, Network+ and Security+ (Mike Meyers)', url: 'https://www.udemy.com/course/comptia-a-1001-1002-study-notes/' },
  
];


const linkedInPeople = [
  { name: 'Mike Chapple', url: 'https://www.linkedin.com/in/mikechapple/' },
  { name: 'Brian Krebs', url: 'https://www.linkedin.com/in/bkrebs/' },
  { name: 'Dale Meredith Jr', url: 'https://www.linkedin.com/in/dalemeredith/' },
  { name: 'Troy Hunt', url: 'https://www.linkedin.com/in/troyhunt/' },
  { name: 'Heath Adams', url: 'https://www.linkedin.com/in/heathadams/' },
  { name: 'Jason Dion', url: 'https://www.linkedin.com/in/jasondion/' },
  { name: 'Naomi Buckwalter', url: 'https://www.linkedin.com/in/naomi-buckwalter/' },
  { name: 'Shira Rubinoff', url: 'https://www.linkedin.com/in/shirarubinoff/' },
  { name: 'OWASP', url: 'https://www.linkedin.com/company/owasp/' },
  { name: 'COMPTIA', url: 'https://www.linkedin.com/company/comptia/posts/?feedView=all' },
  { name: 'SANS', url: 'https://www.linkedin.com/company/sans-institute/' },
  { name: 'ISACA', url: 'https://www.linkedin.com/company/isaca/' },
  { name: 'ISC2', url: 'https://www.linkedin.com/company/isc2/' },
  { name: 'SANS', url: 'https://www.linkedin.com/company/sans-institute/' },
  { name: 'Chuck Brooks', url: 'https://www.linkedin.com/in/chuckbrooks/' },
  { name: 'Steve Morgan', url: 'https://www.linkedin.com/in/cybersecuritysf/' },
];


const otherResources = [
  { name: 'CertNova (free practice tests highly recommend)', url: 'https://www.certnova.com/' },
  { name: '*VERY IMPORTANT FOR CASP* -wyzguyscybersecurity blog', url: 'https://wyzguyscybersecurity.com/new-insights-for-the-casp-cas-004-exam/' },
  { name: '50% vouchers for students', url: 'https://academic-store.comptia.org/' },
  { name: 'Official CompTIA Resources', url: 'https://www.comptia.org/resources' },
  { name: 'Cybrary', url: 'https://www.cybrary.it' },
  { name: 'OWASP Official Site', url: 'https://owasp.org' },
  { name: 'Pluralsight', url: 'https://www.pluralsight.com/' },
  { name: 'Krebs on Security', url: 'https://krebsonsecurity.com/' },
  { name: 'Dark Reading', url: 'https://www.darkreading.com/' },
  { name: 'SANS Institute', url: 'https://www.sans.org/' },
  { name: 'InfoSec Institute', url: 'https://www.infosecinstitute.com/' },
  { name: 'Hack The Box', url: 'https://www.hackthebox.com/' },
  { name: 'TryHackMe', url: 'https://tryhackme.com/' },
  { name: 'Infosec Skills', url: 'https://www.infosecinstitute.com/skills/' },
  { name: 'Offensive Security (OffSec)', url: 'https://www.offensive-security.com/' },
  { name: 'Rapid7 Blog', url: 'https://www.rapid7.com/blog/' },
  { name: 'Malwarebytes Labs', url: 'https://blog.malwarebytes.com/' },
  { name: 'nmap.org', url: 'https://nmap.org/' },
  { name: 'Professor Messer Website', url: 'https://www.professormesser.com/' },
  { name: 'linkedin Learning', url: 'https://www.linkedin.com/learning/' },
  { name: 'SYBEX Books', url: 'https://www.amazon.com/s?k=wiley+sybex+comptia' },
  { name: 'Mike Meyers practice tests', url: 'https://www.totalsem.com/total-tester-practice-tests/' },
  { name: 'Quizlet', url: 'https://quizlet.com/' },
  { name: 'CBTnuggets', url: 'https://www.cbtnuggets.com/' },
  { name: 'Free Virtual Machine', url: 'https://www.oracle.com/virtualization/technologies/vm/downloads/virtualbox-downloads.html' },
  { name: 'kali Linux', url: 'https://www.kali.org/' },
  { name: 'Ubuntu', url: 'https://ubuntu.com/' },
  { name: 'Red Hat', url: 'https://www.redhat.com/en' },
  { name: 'Github', url: 'https://github.com/' },
  { name: 'comptia.org', url: 'https://www.comptia.org/' },
  { name: 'ITPRO', url: 'https://www.acilearning.com/itpro/' },
  { name: 'Coursera', url: 'https://www.coursera.org/' },
  { name: 'TestOut', url: 'https://testoutce.com/' },
  { name: 'ExamDigest', url: 'https://examsdigest.com/' },
  { name: 'ExamCompass', url: 'https://www.examcompass.com/' },
];


const comptiaObjectives = [
  { cert: 'A+ Core 1', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-a-220-1101-exam-objectives-(3-0)' },
  { cert: 'A+ Core 2', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-a-220-1102-exam-objectives-(3-0)' },
  { cert: 'Network+ (N10-009)', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-network-n10-009-exam-objectives-(4-0)' },
  { cert: 'Security+ (701)', url: 'https://certblaster.com/wp-content/uploads/2023/11/CompTIA-Security-SY0-701-Exam-Objectives-1.pdf' },
  { cert: 'CySA+ (003)', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-cysa-cs0-003-exam-objectives-2-0.pdf' },
  { cert: 'CASP+ (004)', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-casp-cas-004-exam-objectives-(4-0)' },
  { cert: 'PenTest+ (002)', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-pentest-pt0-002-exam-objectives-(4-0)' },
  { cert: 'Cloud+ (003)', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-cloud-cv0-003-exam-objectives-(1-0)#:~:text=%EE%80%80CompTIA%EE%80%81%20exams%20result%20from%20subject%20matter' },
  { cert: 'Cloud Essentials', url: 'https://partners.comptia.org/docs/default-source/resources/cloud-essentials-certification-guide' },
  { cert: 'Linux+ (005)', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-linux-xk0-005-exam-objectives-(1-0)' },
  { cert: 'Data+ (001)', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-data-da0-001-exam-objectives-(2-0)' },
  { cert: 'DataSys+', url: 'https://partners.comptia.org/certifications/datasys' },
  { cert: 'DataX+', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-datax-dy0-001-exam-objectives-(5-0)' },
  { cert: 'Server+ (005)', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-server-sk0-005-exam-objectives' },
  { cert: 'Project+ (005)', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-project-pk0-005-exam-objectives-(2-0)' },
  { cert: 'ITF', url: 'https://www.comptia.jp/pdf/CompTIA%20IT%20Fundamentals%20FC0-U61%20Exam%20Objectives.pdf' },
  { cert: 'Tech+', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-tech-fc0-u71-exam-objectives-(1-2)' },
  { cert: 'SecurityX (CASP 005)', url: 'https://partners.comptia.org/docs/default-source/resources/comptia-securityx-cas-005-exam-objectives-(3-0)' },
];


const securityFrameworks = [
  { name: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
  { name: 'ISO/IEC 27001', url: 'https://www.iso.org/isoiec-27001-information-security.html' },
  { name: 'Lockheed Martin Cyber Kill Chain', url: 'https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html' },
  { name: 'MITRE ATT&CK Framework', url: 'https://attack.mitre.org/' },
  { name: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
  { name: 'COBIT', url: 'https://www.isaca.org/resources/cobit' },
  { name: 'ITIL (Information Technology Infrastructure Library)', url: 'https://www.itlibrary.org/' },
  { name: 'PCI-DSS (Payment Card Industry Data Security Standard)', url: 'https://www.pcisecuritystandards.org/' },
  { name: 'HIPAA Security Rule', url: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html' },
  { name: 'Sarbanes-Oxley (SOX) IT Controls', url: 'https://www.sarbanes-oxley-101.com/sarbanes-oxley-compliance.htm' },
  { name: 'FedRAMP', url: 'https://www.fedramp.gov/' },
  { name: 'CIS Controls', url: 'https://www.cisecurity.org/controls' },
  { name: 'ENISA (European Union Agency for Cybersecurity) Guidelines', url: 'https://www.enisa.europa.eu/' },
  { name: 'SANS Top 20 Critical Controls', url: 'https://www.cm-alliance.com/consultancy/compliance-gap-analysis/sans-top-20-controls/' },
  { name: 'Cybersecurity Maturity Model Certification (CMMC)', url: 'https://www.acq.osd.mil/cmmc/' },
  { name: 'FISMA (Federal Information Security Management Act)', url: 'https://www.cisa.gov/topics/cyber-threats-and-advisories/federal-information-security-modernization-act' },
  { name: 'NERC CIP', url: 'https://www.nerc.com/pa/CI/tpv5impmntnstdy/CIPV5_FAQs_Consolidated_Oct2015_Oct_13_2015.pdf' },
  { name: 'GDPR (General Data Protection Regulation)', url: 'https://gdpr.eu/' },
  { name: 'HITRUST CSF', url: 'https://hitrustalliance.net/' },
  { name: 'ISO/IEC 27002', url: 'https://www.iso.org/standard/73906.html' },
  { name: 'NIST 800-53 Security Controls', url: 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final' },
  { name: 'NIST 800-171', url: 'https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final' },
  { name: 'Unified Kill Chain', url: 'https://www.unifiedkillchain.com/assets/The-Unified-Kill-Chain.pdf' },
  { name: 'VERIS', url: 'http://veriscommunity.net/' },
  { name: 'Diamond Model of Intrusion Analysis', url: 'https://www.threatintel.academy/wp-content/uploads/2020/07/diamond-model.pdf' },
  { name: 'ATT&CK for ICS', url: 'https://collaborate.mitre.org/attackics/index.php/Main_Page' },
  { name: 'SOC2', url: 'https://www.vanta.com/products/soc-2' },
  { name: 'ISO 22301 (Business Continuity)', url: 'https://www.iso.org/iso-22301-business-continuity.html' },
  { name: 'ISO/IEC 27004 (Information Security Management — Monitoring, Measurement, Analysis, and Evaluation)', url: 'https://www.iso.org/standard/42505.html' },
  { name: 'ISO/IEC 27006 (Requirements for Bodies Providing Audit and Certification of Information Security Management Systems)', url: 'https://www.iso.org/standard/43506.html' },
  { name: 'ISO/IEC 27007 (Guidelines for Information Security Management Systems Auditing)', url: 'https://www.iso.org/standard/44375.html' },
  { name: 'ISO/IEC 27008 (Guidance for Auditors on Information Security Controls)', url: 'https://www.iso.org/standard/50518.html' },
  { name: 'ISO/IEC 27011 (Information Security Management Guidelines for Telecommunications Organizations)', url: 'https://www.iso.org/standard/43755.html' },
  { name: 'ISO/IEC 27013 (Guidance on the Integrated Implementation of ISO/IEC 27001 and ISO/IEC 20000-1)', url: 'https://www.iso.org/standard/68427.html' },
  { name: 'ISO/IEC 27014 (Governance of Information Security)', url: 'https://www.iso.org/standard/43756.html' },
  { name: 'ISO/IEC 27031 (Guidelines for Information and Communication Technology Readiness for Business Continuity)', url: 'https://www.iso.org/standard/44374.html' },
  { name: 'ISO/IEC 27032 (Guidelines for Cybersecurity)', url: 'https://www.iso.org/standard/44375.html' },
  { name: 'ISO/IEC 27033 (Network Security)', url: 'https://www.iso.org/standard/63411.html' },
  { name: 'ISO/IEC 27034 (Application Security)', url: 'https://www.iso.org/standard/44379.html' },
  { name: 'ISO/IEC 27041 (Guidelines on Assuring Suitability and Adequacy of Incident Investigative Methods)', url: 'https://www.iso.org/standard/44403.html' },
  { name: 'ISO/IEC 27042 (Guidelines on Digital Evidence Analysis)', url: 'https://www.iso.org/standard/44404.html' },
  { name: 'ISO/IEC 27043 (Incident Investigation Principles and Processes)', url: 'https://www.iso.org/standard/44405.html' },
  { name: 'ISO/IEC 27044 (Guidelines for Security Information and Event Management)', url: 'https://www.iso.org/standard/44406.html' },
  { name: 'ISO/IEC 29100 (Privacy Framework)', url: 'https://www.iso.org/standard/45123.html' },
  { name: 'ISO/IEC 29134 (Guidelines for Privacy Impact Assessment)', url: 'https://www.iso.org/standard/62289.html' },
  { name: 'ISO/IEC 29151 (Code of Practice for Personally Identifiable Information Protection)', url: 'https://www.iso.org/standard/62725.html' },
  { name: 'ISO/IEC 38500 (Governance of IT for the Organization)', url: 'https://www.iso.org/standard/51639.html' },
  { name: 'NIST SP 800-160 (Systems Security Engineering)', url: 'https://csrc.nist.gov/publications/detail/sp/800-160/vol-1/final' },
  { name: 'NIST SP 800-190 (Application Container Security Guide)', url: 'https://csrc.nist.gov/publications/detail/sp/800-190/final' },
  { name: 'NIST SP 800-207 (Zero Trust Architecture)', url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final' },
  { name: 'NIST SP 800-218 (Secure Software Development Framework)', url: 'https://csrc.nist.gov/publications/detail/sp/800-218/final' },
  { name: 'NIST SP 800-53A (Assessing Security and Privacy Controls in Federal Information Systems and Organizations)', url: 'https://csrc.nist.gov/publications/detail/sp/800-53a/rev-5/final' },
  { name: 'NIST SP 800-63 (Digital Identity Guidelines)', url: 'https://pages.nist.gov/800-63-3/' },
  { name: 'NIST SP 800-37 (Risk Management Framework for Information Systems and Organizations)', url: 'https://csrc.nist.gov/publications/detail/sp/800-37/rev-2/final' },
  { name: 'NIST SP 800-39 (Managing Information Security Risk)', url: 'https://csrc.nist.gov/publications/detail/sp/800-39/final' },
  { name: 'NIST SP 800-61 (Computer Security Incident Handling Guide)', url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final' },
  { name: 'NIST SP 800-88 (Guidelines for Media Sanitization)', url: 'https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final' },
  { name: 'NIST SP 800-115 (Technical Guide to Information Security Testing and Assessment)', url: 'https://csrc.nist.gov/publications/detail/sp/800-115/final' },
  { name: 'NIST SP 800-184 (Guide for Cybersecurity Event Recovery)', url: 'https://csrc.nist.gov/publications/detail/sp/800-184/final' },
  { name: 'NIST SP 800-30 (Guide for Conducting Risk Assessments)', url: 'https://csrc.nist.gov/publications/detail/sp/800-30/rev-a/final' },
  { name: 'NIST SP 800-64 (Security Considerations in the System Development Life Cycle)', url: 'https://csrc.nist.gov/publications/detail/sp/800-64/rev-2/final' },
  { name: 'NIST SP 800-83 (Guide to Malware Incident Prevention and Handling)', url: 'https://csrc.nist.gov/publications/detail/sp/800-83/rev-1/final' },
  { name: 'NIST SP 800-92 (Guide to Computer Security Log Management)', url: 'https://csrc.nist.gov/publications/detail/sp/800-92/final' },
  { name: 'NIST SP 800-94 (Guide to Intrusion Detection and Prevention Systems)', url: 'https://csrc.nist.gov/publications/detail/sp/800-94/rev-1/draft' },
  { name: 'NIST SP 800-100 (Information Security Handbook: A Guide for Managers)', url: 'https://csrc.nist.gov/publications/detail/sp/800-100/final' },
  { name: 'NIST SP 800-122 (Guide to Protecting the Confidentiality of Personally Identifiable Information)', url: 'https://csrc.nist.gov/publications/detail/sp/800-122/final' },
  { name: 'NIST SP 800-137 (Information Security Continuous Monitoring for Federal Information Systems and Organizations)', url: 'https://csrc.nist.gov/publications/detail/sp/800-137/final' },
  { name: 'NIST SP 800-144 (Guidelines on Security and Privacy in Public Cloud Computing)', url: 'https://csrc.nist.gov/publications/detail/sp/800-144/final' },
  { name: 'NIST SP 800-146 (Cloud Computing Synopsis and Recommendations)', url: 'https://csrc.nist.gov/publications/detail/sp/800-146/final' },
  { name: 'NIST SP 800-150 (Guide to Cyber Threat Information Sharing)', url: 'https://csrc.nist.gov/publications/detail/sp/800-150/final' },
  { name: 'NIST SP 800-160 (Systems Security Engineering: Considerations for a Multidisciplinary Approach in the Engineering of Trustworthy Secure Systems)', url: 'https://csrc.nist.gov/publications/detail/sp/800-160/vol-1/final' },
  { name: 'NIST SP 800-171A (Assessing Security Requirements for Controlled Unclassified Information)', url: 'https://csrc.nist.gov/publications/detail/sp/800-171a/final' },
  { name: 'NIST SP 800-181 (National Initiative for Cybersecurity Education (NICE) Cybersecurity Workforce Framework)', url: 'https://csrc.nist.gov/publications/detail/sp/800-181/rev-1/final' },
  { name: 'Cyber Essentials (UK Cybersecurity Standard)', url: 'https://www.ncsc.gov.uk/cyberessentials/overview' },
  { name: 'Essential Eight (Australian Cybersecurity Framework)', url: 'https://www.cyber.gov.au/acsc/view-all-content/essential-eight' },
  { name: 'Secure Controls Framework (SCF)', url: 'https://www.securecontrolsframework.com/' },
  { name: 'Factor Analysis of Information Risk (FAIR)', url: 'https://www.fairinstitute.org/' },
  { name: 'Cloud Security Alliance (CSA) STAR', url: 'https://cloudsecurityalliance.org/star/' },
  { name: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework' },
  { name: 'ISF Standard of Good Practice for Information Security', url: 'https://www.securityforum.org/solutions-and-insights/the-standard-of-good-practice-for-information-security/' },
  { name: 'TOGAF (The Open Group Architecture Framework)', url: 'https://www.opengroup.org/togaf' },
  { name: 'IEC 62443 (Industrial Automation and Control Systems Security)', url: 'https://webstore.iec.ch/publication/7028' },
  { name: 'FFIEC Cybersecurity Assessment Tool', url: 'https://www.ffiec.gov/cyberassessmenttool.htm' },
  { name: 'SWIFT Customer Security Programme (CSP)', url: 'https://www.swift.com/myswift/customer-security-programme-csp' },
  { name: 'AI Risk Management Framework (AI RMF)', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
  { name: 'BSI IT-Grundschutz (German Federal Office for Information Security)', url: 'https://www.bsi.bund.de/EN/Topics/IT-Grundschutz/it-grundschutz_node.html' },
  { name: 'Canadian Centre for Cyber Security’s IT Security Guidance', url: 'https://cyber.gc.ca/en/guidance' },
  { name: 'TISAX (Trusted Information Security Assessment Exchange)', url: 'https://enx.com/tisax/' },
  { name: 'MARISSA (Maritime Cybersecurity Standards)', url: 'https://www.maritimecybersecurity.center/' },
  { name: 'ANSI/ISA-62443 (Cybersecurity Standards for Automation)', url: 'https://www.isa.org/standards-and-publications/isa-standards/isa-62443-series-of-standards' },
  { name: 'UK Government Minimum Cyber Security Standard', url: 'https://www.gov.uk/government/publications/minimum-cyber-security-standard' },
  { name: 'Basel Committee on Banking Supervision (BCBS 239)', url: 'https://www.bis.org/bcbs/publ/d239.htm' },
  { name: 'OECD Guidelines for the Security of Information Systems and Networks', url: 'https://www.oecd.org/sti/ieconomy/15582260.pdf' },
  { name: 'CERT Resilience Management Model (CERT-RMM)', url: 'https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=508099' },
  { name: 'NESA Information Assurance Standards (UAE IAS)', url: 'https://www.nesa.ae/' },
  { name: 'Hong Kong Monetary Authority (HKMA) Cybersecurity Fortification Initiative', url: 'https://www.hkma.gov.hk/eng/key-functions/banking/cybersecurity-fortification-initiative-cfi/' },
  { name: 'K-ISMS (Korean Information Security Management System)', url: 'https://www.kisa.or.kr/eng/main.jsp' },
  { name: 'Japan Cybersecurity Framework (J-CSIP)', url: 'https://www.ipa.go.jp/security/english/jcsip.html' },
  { name: 'NATO Cyber Defence Policy Framework', url: 'https://www.nato.int/cps/en/natohq/topics_78170.htm' },
  { name: 'DHS Continuous Diagnostics and Mitigation (CDM) Program', url: 'https://www.cisa.gov/cdm' },
  { name: 'World Economic Forum (WEF) Cybersecurity Principles', url: 'https://www.weforum.org/reports/principles-for-board-governance-of-cyber-risk' },
  { name: 'HITRUST Threat Catalogue', url: 'https://hitrustalliance.net/hitrust-threat-catalog/' },
  { name: 'Digital Geneva Convention Cyber Norms', url: 'https://digitalpeace.microsoft.com/' },
  { name: 'Smart Grid Interoperability Panel (SGIP) Cybersecurity Guidelines', url: 'https://www.nist.gov/publications/nist-framework-and-roadmap-smart-grid-interoperability-standards-release-30' },
  { name: 'APEC Privacy Framework', url: 'https://www.apec.org/Publications/2017/08/APEC-Privacy-Framework-(2015)' },
  { name: 'NERC PRC Standards', url: 'https://www.nerc.com/pa/Stand/Pages/PRC-Reliability-Standards.aspx' },
  { name: 'Digital Identity Authentication and Fraud Prevention Framework', url: 'https://www.gsma.com/identity/digital-identity-programme/' },
  { name: 'Zero Trust Architecture', url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final' },
  { name: 'MITRE Shield', url: 'https://shield.mitre.org/' },
  { name: 'MITRE Engage', url: 'https://engage.mitre.org/' },
  { name: 'NIST Cybersecurity Workforce Framework', url: 'https://www.nist.gov/cyberframework/workforce' },
];


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


function getMatchingVideos(keyword) {
  return youtubeVideos
    .filter((vid) => vid.title.toLowerCase().includes(keyword.toLowerCase()))
    .map((vid) => ({ name: vid.title, url: vid.url }));
}


const pentestToolNames = [
  'Nmap',
  'Burp Suite',
  'Metasploit',
  'Hydra',
  'John the Ripper',
  'Nikto',
  'SQLmap',
  'Mimikatz',
  'Gobuster',
  'Hashcat',
  'Impacket',
  'Aircrack-ng',
  'OWASP ZAP',
];
const pentestToolsForPenTestPlus = cyberSecurityTools.filter((tool) =>
  pentestToolNames.includes(tool.name)
);


const baseResourcesData = {
  reddit: [
    ...redditSubreddits,
    ...redditPosts.map((post) => ({ name: post.title, url: post.url })),
  ],
  youtube: [
    ...youtubeChannels,
    ...youtubeVideos.map((vid) => ({ name: vid.title, url: vid.url })),
  ],
  udemy: udemyCourses.map((course) => ({ name: course.title, url: course.url })),
  frameworks: securityFrameworks.map((fw) => ({ name: fw.name, url: fw.url })),
  other: [...otherResources],
  linkedin: [...linkedInPeople],
  'CyberSecurity Tools': [...cyberSecurityTools],
  'CompTIA Certification Objectives': comptiaObjectives.map((obj) => ({
    name: obj.cert,
    url: obj.url,
  })),
};


const keywordMap = {
  'A+': {
    include: ['a+', 'a plus', '220-1101', '1101', '220-1102', '1102', 'A+', 'aplus', 'APLUS', 'A PLUS', 'A plus'],
    exclude: [
      'network+',
      'net+',
      'security+',
      'cysa+',
      'casp',
      'pentest+',
      'linux+',
      'server+',
      'project+',
      'data+',
      'cloud+',
      'cloud essentials',
    ],
  },
  'Network+': {
    include: ['network+', 'n10-008', 'n10-009', 'network plus', 'networking', 'Net Plus', 'NetPlus', 'Networkplus', 'Networking', 'Net Plus', 'net plus', 'Net+', 'net+' ],
    exclude: [
      'a+',
      'security+',
      'pentest+',
      'cysa+',
      'casp',
      'linux+',
      'data+',
      'server+',
      'project+',
      'cloud+',
    ],
  },
  'Security+': {
    include: ['security+', 'syo-701', '701', 'sec+', 'SY0', 'SY0-701', 'sy0-701', 'sy0'],
    exclude: [
      'network+',
      'n10-009',
      'a+',
      'cysa+',
      'casp',
      'pentest+',
      'linux+',
      'server+',
      'project+',
      'data+',
      'cloud+',
    ],
  },
  'CySA+': {
    include: ['cysa+', 'cs0-003', 'cybersecurity analyst', 'c y s a+', 'CYSA', 'CYSA+'],
    exclude: [
      'network+',
      'security+',
      'a+',
      'casp',
      'pentest+',
      'linux+',
      'data+',
      'server+',
      'cloud+',
      'project+',
    ],
  },
  'SecurityX/CASP': {
    include: ['casp', 'cas-004', 'securityx', 'casp+', 'casp plus', 'SECURITYX', 'SecurityX', 'Cas-005', 'CAS-004', 'CAS-005', 'Cas-004', 'cas-005'],
    exclude: [
      'network+',
      'security+',
      'a+',
      'pentest+',
      'cysa+',
      'linux+',
      'data+',
      'project+',
      'cloud+',
      'server+',
    ],
  },
  'PenTest+': {
    include: ['pentest+', 'pt0-002', 'pt0-003', 'pentest plus'],
    exclude: [
      'network+',
      'security+',
      'a+',
      'cysa+',
      'casp',
      'linux+',
      'data+',
      'project+',
      'cloud+',
      'server+',
    ],
  },
  'Cloud+/Cloud Essentials': {
    include: ['cloud+', 'cloud essentials', 'cv0-003', 'cloud plus', 'cl0-002'],
    exclude: [
      'a+',
      'network+',
      'security+',
      'pentest+',
      'cysa+',
      'casp',
      'linux+',
      'project+',
      'server+',
      'data+',
    ],
  },
  'Linux+': {
    include: ['linux+', 'xk0-005', 'kali linux', 'ubuntu', 'red hat'],
    exclude: [
      'network+',
      'security+',
      'pentest+',
      'cysa+',
      'casp',
      'a+',
      'data+',
      'cloud+',
      'server+',
      'project+',
    ],
  },
  'Data+': {
    include: ['data+', 'da0-001', 'data plus'],
    exclude: [
      'network+',
      'security+',
      'pentest+',
      'cysa+',
      'casp',
      'linux+',
      'cloud+',
      'server+',
      'project+',
      'a+',
    ],
  },
  'Server+': {
    include: ['server+', 'sk0-005', 'server plus'],
    exclude: [
      'network+',
      'security+',
      'pentest+',
      'cysa+',
      'casp',
      'linux+',
      'data+',
      'project+',
      'cloud+',
      'a+',
    ],
  },
  'Project+': {
    include: ['project+', 'pk0-005', 'project plus'],
    exclude: [
      'network+',
      'security+',
      'pentest+',
      'cysa+',
      'casp',
      'linux+',
      'data+',
      'server+',
      'cloud+',
      'a+',
    ],
  },
  'ITF/TECH+': {
    include: ['itf', 'tech+', 'fc0-u61', 'fc0-u71', 'it fundamentals'],
    exclude: [
      'network+',
      'security+',
      'pentest+',
      'cysa+',
      'casp',
      'linux+',
      'data+',
      'server+',
      'cloud+',
      'project+',
      'a+',
    ],
  },
};


function resourceMatchesCategory(resourceName, includeList, excludeList) {
  const lowerName = resourceName.toLowerCase();


  const hasInclude = includeList.some((term) =>
    lowerName.includes(term.toLowerCase())
  );
  if (!hasInclude) return false;

  
  const hasExclude = excludeList.some((term) =>
    lowerName.includes(term.toLowerCase())
  );
  if (hasExclude) return false;

  return true;
}


const allResources = [];


[...cyberSecurityTools].forEach((tool) => {
  allResources.push({ name: tool.name, url: tool.url });
});
redditSubreddits.forEach((sub) => {
  allResources.push({ name: sub.name, url: sub.url });
});
redditPosts.forEach((post) => {
  allResources.push({ name: post.title, url: post.url });
});
youtubeChannels.forEach((chan) => {
  allResources.push({ name: chan.name, url: chan.url });
});
youtubeVideos.forEach((vid) => {
  allResources.push({ name: vid.title, url: vid.url });
});
otherResources.forEach((res) => {
  allResources.push({ name: res.name, url: res.url });
});
udemyCourses.forEach((course) => {
  allResources.push({ name: course.title, url: course.url });
});
linkedInPeople.forEach((person) => {
  allResources.push({ name: person.name, url: person.url });
});
securityFrameworks.forEach((fw) => {
  allResources.push({ name: fw.name, url: fw.url });
});
comptiaObjectives.forEach((obj) => {
  allResources.push({ name: obj.cert, url: obj.url });
});


function getAllMatchesForCategory(categoryName) {
  const { include, exclude } = keywordMap[categoryName] || {
    include: [],
    exclude: [],
  };
  const matched = [];

  allResources.forEach((resource) => {
    if (resourceMatchesCategory(resource.name, include, exclude)) {
      matched.push(resource);
    }
  });

  return matched;
}


const resourcesData = {
  ...baseResourcesData,


  'A+': [
 
    ...comptiaObjectives
      .filter((obj) => obj.cert.toLowerCase().includes('a+ core'))
      .map((obj) => ({ name: obj.cert, url: obj.url })),


    { name: 'A+ Practice tests', url: 'https://www.examcompass.com/' },


    ...getAllMatchesForCategory('A+'),
  ],

  'Network+': [
    ...comptiaObjectives
      .filter((obj) => obj.cert.toLowerCase().startsWith('network+'))
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    { name: 'Network+ Practice Exams', url: 'https://www.examcompass.com/' },

    ...getAllMatchesForCategory('Network+'),
  ],

  'Security+': [
    ...comptiaObjectives
      .filter(
        (obj) =>
          obj.cert.toLowerCase().startsWith('security+') &&
          !obj.cert.toLowerCase().includes('x')
      )
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    { name: 'Security+ Practice Tests', url: 'https://www.examcompass.com/' },

    ...getAllMatchesForCategory('Security+'),
  ],

  'CySA+': [
    ...comptiaObjectives
      .filter((obj) => obj.cert.toLowerCase().startsWith('cysa+'))
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    { name: 'Practice Exams', url: 'https://www.101labs.net/free-cysa-practice-exam-cybersecurity/' },

    ...getAllMatchesForCategory('CySA+'),
  ],

  'SecurityX/CASP': [
    ...comptiaObjectives
      .filter(
        (obj) =>
          obj.cert.toLowerCase().includes('casp') ||
          obj.cert.toLowerCase().includes('securityx')
      )
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    {
      name: 'CASP+ Practice Exams',
      url: 'https://www.howtonetwork.com/free/casp-practice-exam/',
    },

    ...getAllMatchesForCategory('SecurityX/CASP'),
  ],

  'PenTest+': [
    ...comptiaObjectives
      .filter((obj) => obj.cert.toLowerCase().startsWith('pentest+'))
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    {
      name: 'PenTest+ Practice Exams',
      url: 'https://www.howtonetwork.com/free/pentest-practice-exam/',
    },



    ...getAllMatchesForCategory('PenTest+'),
  ],

  'Cloud+/Cloud Essentials': [
    ...comptiaObjectives
      .filter((obj) => obj.cert.toLowerCase().includes('cloud'))
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    { name: 'Cloud+ Practice Labs', url: 'https://www.aws.training/' },

    ...getAllMatchesForCategory('Cloud+/Cloud Essentials'),
  ],

  'Linux+': [
    ...comptiaObjectives
      .filter((obj) => obj.cert.toLowerCase().startsWith('linux+'))
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    {
      name: 'Linux+ Study Guide',
      url: 'https://www.howtonetwork.com/free/linux-practice-exam/',
    },
    { name: 'Linux+ Practice Labs', url: 'https://www.virtualbox.org/' },
    {
      name: 'Linux+ Practice Exams',
      url: 'https://certblaster.com/certification-learning-resources/linux-plus-practice-test-sample-questions/',
    },
    {
      name: 'Linux+ Training by CBT Nuggets',
      url: 'https://www.udemy.com/course/comptia-linux-plus/',
    },

    ...getAllMatchesForCategory('Linux+'),
  ],

  'Data+': [
    ...comptiaObjectives
      .filter((obj) => obj.cert.toLowerCase().startsWith('data'))
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    {
      name: 'Data+ Practice Exams',
      url: 'https://careeremployer.com/test-prep/practice-tests/comptia-data-practice-test/',
    },

    ...getAllMatchesForCategory('Data+'),
  ],

  'Server+': [
    ...comptiaObjectives
      .filter((obj) => obj.cert.toLowerCase().startsWith('server+'))
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    {
      name: 'Server+ Practice Exams',
      url: 'https://www.proprofs.com/quiz-school/story.php?title=comptia-server-practice-questions-125-set-1-4',
    },

    ...getAllMatchesForCategory('Server+'),
  ],

  'Project+': [
    ...comptiaObjectives
      .filter((obj) => obj.cert.toLowerCase().startsWith('project+'))
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    {
      name: 'Project+ Practice Exams',
      url: 'https://www.howtonetwork.com/free/comptia-project-practice-exam/',
    },

    ...getAllMatchesForCategory('Project+'),
  ],

  'ITF/TECH+': [
    ...comptiaObjectives
      .filter(
        (obj) =>
          obj.cert.toLowerCase().startsWith('itf') ||
          obj.cert.toLowerCase().includes('tech+')
      )
      .map((obj) => ({ name: obj.cert, url: obj.url })),

    {
      name: 'ITF Practice Exams',
      url: 'https://certblaster.com/it-fundamentals-practice-test/',
    },

    ...getAllMatchesForCategory('ITF/TECH+'),
  ],
};

function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sorted, setSorted] = useState(false);
  const [randomResource, setRandomResource] = useState(null);

  const handleSearch = (event) => setSearchTerm(event.target.value.toLowerCase());
  const handleCategoryChange = (event) => setSelectedCategory(event.target.value);

 
  const filteredResources = Object.entries(resourcesData)
    .filter(([category]) => selectedCategory === "all" || category === selectedCategory)
    .flatMap(([, resources]) => resources)
    .filter((resource) => resource.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => (sorted ? a.name.localeCompare(b.name) : 0));

 
  const handleRandomResource = () => {
    const currentCategoryResources =
      selectedCategory === "all"
        ? Object.values(resourcesData).flat()
        : resourcesData[selectedCategory] || [];

    if (currentCategoryResources.length === 0) {
      setRandomResource(null);
      return;
    }

    const random = currentCategoryResources[Math.floor(Math.random() * currentCategoryResources.length)];
    setRandomResource(random);
  };

  return (
    <div className="resources-background">
      <div className="resources-container">
        <h1 className="resources-header">Cybersecurity Resources Hub</h1>

        {/* Controls Section */}
        <div className="resources-controls">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />

          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="category-select"
          >
            <option value="all">All Categories</option>
            {Object.keys(resourcesData).map((category) => (
              <option key={category} value={category}>
                {capitalizeFirstLetter(category)}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSorted(!sorted)}
            className="sort-button"
          >
            {sorted ? "Unsort" : "Sort A-Z"}
          </button>

          <button
            onClick={handleRandomResource}
            className="random-button"
          >
            Random Resource
          </button>
        </div>

        {/* Random Resource Section */}
        {randomResource && (
          <div className="resources-random-resource">
            <h2>Explore This Resource:</h2>
            <a
              href={randomResource.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {randomResource.name}
            </a>
          </div>
        )}

        {/* Resources List */}
        <ul className="resources-list">
          {filteredResources.length ? (
            filteredResources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.name}
                </a>
              </li>
            ))
          ) : (
            <p>No resources found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Resources;

