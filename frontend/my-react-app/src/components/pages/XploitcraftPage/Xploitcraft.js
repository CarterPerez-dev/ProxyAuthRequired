// components/xploitcraft.js
import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo5.png';
import loadingIcon from './loading3.png';
import './App.css';

import SubscriptionErrorHandler from '../../SubscriptionErrorHandler';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';

import { pojoaque } from 'react-syntax-highlighter/dist/esm/styles/hljs';


import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
SyntaxHighlighter.registerLanguage('python', python);

const ENDPOINT = "/api";

const vulnerabilitiesList = [
  "SQL Injection example",
  "Blind SQL Injection example",
  "Union-based SQL Injection example",
  "Error-based SQL Injection example",
  "Time-based SQL Injection example",
  "Stored XSS example",
  "Reflected XSS example",
  "DOM-based XSS example",
  "CSRF (Cross-Site Request Forgery) example",
  "LFI (Local File Inclusion) example",
  "RFI (Remote File Inclusion) example",
  "Command Injection example",
  "LDAP Injection example",
  "XML External Entity (XXE) example",
  "Server-Side Request Forgery (SSRF) example",
  "Open Redirect example",
  "Directory Traversal example",
  "Buffer Overflow example",
  "Format String Vulnerability example",
  "Insecure Deserialization example",
  "Clickjacking example",
  "Cross-Site Scripting via JSONP example",
  "Header Injection example",
  "HTTP Response Splitting example",
  "Path Traversal example",
  "Host Header Injection example",
  "SMTP Injection example",
  "XPath Injection example",
  "FTP Bounce Vulnerability example",
  "PHP Object Injection example",
  "Race Conditions example",
  "Session Fixation example",
  "HTTP Parameter Pollution example",
  "Subdomain Takeover example",
  "XXE with DTD example",
  "Template Injection example",
  "CRLF Injection example",
  "Unvalidated Redirects and Forwards example",
  "Padding Oracle Vulnerability example",
  "Insecure Cryptographic Storage example",
  "Information Disclosure example",
  "Broken Access Control example",
  "Insecure Direct Object References example",
  "Cross-Site Script Inclusion example",
  "Memory Corruption example",
  "Integer Overflow example",
  "Heap Overflow example",
  "Stack Overflow example",
  "Use-After-Free example",
  "Privilege Escalation example",
  "XML Injection example",
  "SSJS Injection example",
  "Command Injection via RCE example",
  "Server-Side Template Injection example",
  "Prototype Pollution example",
  "Cross-Origin Resource Sharing Misconfigurations example",
  "Clickjacking via Frame Injection example",
  "Cache Poisoning example",
  "HTTP Request Smuggling example",
  "DNS Rebinding example",
  "Man-in-the-Middle Vulnerability example",
  "JQuery Prototype Pollution example",
  "Remote Code Execution via Deserialization example",
  "HTTP Host Header Vulnerability example",
  "Broken Session Management example",
  "Weak Password Recovery Mechanisms example",
  "Insufficient SSL/TLS Validation example",
  "Misconfigured S3 Buckets example",
  "Misconfigured CORS leading to data exfiltration example",
  "Stored CSRF example",
  "Cross-Site Flashing example",
  "Authentication Bypass via SQLi example",
  "Race Condition in File Upload example",
  "Object Injection in PHP apps example",
  "Deserialization in Java apps example",
  "Log4Shell (CVE-2021-44228) example",
  "Shellshock (CVE-2014-6271) example",
  "Heartbleed (CVE-2014-0160) example",
  "SambaCry example",
  "BlueKeep (CVE-2019-0708) example",
  "EternalBlue (MS17-010) example",
  "Spectre example",
  "Meltdown example",
  "ZombieLoad example",
  "L1 Terminal Fault example",
  "Foreshadow example",
  "Rowhammer example",
  "Cache Side-Channel Vulnerabilities example",
  "Timing Vulnerabilities on Crypto example",
  "BREACH Vulnerability example",
  "CRIME Vulnerability example",
  "POODLE Vulnerability example",
  "DROWN Vulnerability example",
  "FREAK Vulnerability example",
  "Reflection Vulnerability on Cryptosystems example",
  "DES Weak Key Vulnerability example",
  "Insecure YAML Deserialization example",
  "Cross-Site WebSocket Hijacking example",
  "Shattered Vulnerability on SHA-1 example",
  "MD5 Collision Adversarial Tests example",
  "MD5 Collision Vulnerabilities example",
  "Resource Exhaustion (DoS Vulnerabilities) example",
  "Zip Slip Vulnerability example",
  "HQL Injection example",
  "CSV Injection example",
  "SSRF via DNS Pinning example",
  "SSTI in Django Templates example",
  "Injection via .htaccess Misconfigurations example",
  "Insecure File Permissions example",
  "Unencrypted Sensitive Data at Rest example",
  "Exposed AWS Keys in Code example",
  "Exposed GCP Credentials in Git Repos example",
  "Privilege Escalation via SUID Binaries example",
  "Kernel Demonstrations (DirtyCow) example",
  "Symbolic Link (Symlink) Vulnerabilities example",
  "DNS Cache Poisoning example",
  "DNS Amplification Vulnerabilities example",
  "Rogue Access Point Vulnerabilities example",
  "ARP Spoofing Vulnerability example",
  "SMB Relay Vulnerabilities example",
  "NTLM Relay Vulnerabilities example",
  "Kerberoasting (Windows Kerberos Vulnerability) example",
  "ASREP Roasting example",
  "Pass-the-Hash Vulnerabilities example",
  "Pass-the-Ticket Vulnerabilities example",
  "Golden Ticket Vulnerabilities example",
  "Silver Ticket Vulnerabilities example",
  "Skeleton Key Vulnerabilities example",
  "Insecure JWT Implementations example",
  "Signature Stripping Vulnerability on JWT example",
  "Cross-Tenant Data Leakage in SaaS example",
  "Pivoting via Compromised Hosts example",
  "ICMP Tunneling example",
  "SSH Tunneling for Data Exfiltration example",
  "SSL Stripping Vulnerability example",
  "SSL Renegotiation Vulnerability example",
  "Insecure FTP Configurations example",
  "Telnet-based Vulnerabilities example",
  "RDP Demonstration Scenario (CVE-based RCEs) example",
  "Insecure SNMP Configurations example",
  "Deserialization in .NET example",
  "XXE with Parameter Entities example",
  "Broken Authentication in SAML example",
  "OpenSAMLSIG Vulnerability example",
  "Key-Reinstallation Vulnerabilities (KRACK) on WPA2 example",
  "Evil Twin AP Vulnerabilities example",
  "Watering Hole Vulnerabilities example",
  "Supply Chain Vulnerabilities example",
  "Malicious Dependency Injection (e.g. npm packages) example",
  "Exposed Docker Daemon example",
  "Insecure Kubernetes Configurations example",
  "Kubernetes API Server Demonstration example",
  "Etcd Database Exposure example",
  "Container Breakout Demonstrations example",
  "Runtime Injection in Serverless Environments example",
  "Insecure Serverless Functions Permissions example",
  "SSRF via Cloud Metadata example",
  "Poison Null Byte in File Paths example",
  "Insecure Handling of `/proc` filesystem example",
  "Directory Indexing Vulnerability example",
  "Hidden Form Field Tampering example",
  "Session Puzzling Vulnerabilities example",
  "Reflected File Download Vulnerability example",
  "Backdoor in Web Application example",
  "MITM via WPAD example",
  "Exposed Redis Instances example",
  "MongoDB No-Auth Access example",
  "Insecure Elasticsearch Cluster example",
  "Insecure Memcached Servers example",
  "Clickjacking via Flash Embeds example",
  "Insecure Deserialization in Ruby YAML example",
  "Insecure Deserialization in Python pickle example",
  "Insecure Deserialization in Java Hessian example",
  "Billion Laughs Vulnerability (XXE expansion) example",
  "Parameter Pollution in SOAP example",
  "Malicious SVG Injection example",
  "XSLT Injection example",
  "Insecure WSDL Exposure example",
  "CSRF with JSON-based Requests example",
  "Deserialization in AMF example",
  "Deserialization in PHP unserialize() example",
  "Covert Timing Channels example",
  "Chained Demonstrations (Multi-step Vulnerabilities) example",
  "Shiro Authentication Bypass example",
  "Apache Struts RCE (CVE-2017-5638) example",
  "PhpMyAdmin RCE example",
  "MySQL UDF Demonstration example",
  "MSSQL xp_cmdshell Demonstrations example",
  "Oracle TNS Poisoning example",
  "Postgres Copy Demonstrations example",
  "Misconfigured WP REST APIs example",
  "Exposed Jenkins Consoles example",
  "Exposed JMX Interfaces example",
  "JNDI Injection (Log4Shell Type) example",
  "PHP ZipArchive Deserialization example",
  "Spring4Shell (CVE-2022-22965) example",
  "Expression Language Injection example",
  "SSRF via PDF Generation Tools example",
  "SSRF via Image Libraries example",
  "Blind SSRF via DNS Timing example",
  "Email Header Injection example",
  "LDAP Injection via Search Filters example",
  "Serialization Vulnerabilities on IoT Devices example",
  "Buffer Overflows in Firmware example",
  "Hardcoded Credentials in IoT example",
  "Command Injection in Router Web Interfaces example",
  "UPnP Demonstration Scenario on Home Routers example",
  "ICS/SCADA Modbus Vulnerabilities example",
  "DNP3 Protocol Vulnerabilities example",
  "OPC UA Demonstrations example",
  "BACnet Vulnerabilities example",
  "VxWorks OS Vulnerabilities example",
  "Wind River TCP/IP Stack Flaws example",
  "Ripple20 (Treck TCP/IP Stack) Vulnerabilities example",
  "Uncontrolled Format String in C Applications example",
  "Stack Canary Bypass example",
  "SafeSEH Bypass example",
  "ASLR Bypass example",
  "DEP Bypass with ROP Chains example",
  "Web Cache Poisoning example",
  "CRLF Injection in Redis example",
  "CRLF Injection in InfluxDB example",
  "Insecure Cross-Domain JSONP endpoints example",
  "DNS TXT Record Injection example",
  "Exposed Management Interfaces example",
  "SMTP Open Relay example",
  "MTA Command Injection example",
  "IMAP/POP3 Injection example",
  "XSRF in SOAP Services example",
  "Insecure CSR Generation example",
  "Insecure Key Storage in Source Control example",
  "Side-Channel via CPU Cache example",
  "Rowhammer-induced Bitflips to Escalate Privileges example",
  "Thunderbolt DMA Vulnerabilities example",
  "Firewire DMA Vulnerabilities example",
  "PCI-based Vulnerabilities example",
  "Bluetooth Replay Vulnerabilities example",
  "Wi-Fi Deauthentication Vulnerability example",
  "LTE Network Vulnerabilities example",
  "5G Core Network Misconfigurations example",
  "VoIP SIP Injection example",
  "H.323 Injection example",
  "SS7 Vulnerabilities on Telecom Networks example",
  "Insecure Industrial Protocol Gateways example",
  "Spear Phishing Code Injection example",
  "Social Engineering-based Credential Harvesting example",
  "Rogue DHCP Server Vulnerabilities example",
  "Network Time Protocol Manipulation example",
  "GSM Base Station Spoofing example",
  "Rogue DNS Server Vulnerabilities example",
  "WLAN Krack Vulnerabilities example",
  "Supply Chain Vulnerabilities via Dependencies example",
  "Resource Injection in Web Framework example",
  "Abusing JWT Algorithms (e.g. 'none') example",
  "Re-submission of Nonces example",
  "Signature Forging in OAuth example",
  "Cookie Forcing Vulnerability example",
  "Marlinspike Vulnerability example",
  "Traffic Injection in TOR example",
  "RepoJacking on GitHub example",
  "Typosquatting Package Demonstrations example",
  "Malicious Browser Extensions example",
  "Demonstration Scenario of Data URI example",
  "Exploitation of \"javascript:\" URLs example",
  "Demonstration Scenario of \"javascript:\" URLs example",
  "Path-based SSRF example",
  "Insecure Handling of 3XX Redirects example",
  "Fragment Identifier Injection example",
  "IDOR via Secondary Keys example",
  "IDOR in GraphQL Queries example",
  "GraphQL Query Injection example",
  "GraphQL Introspection Abuse example",
  "Binary Planting example",
  "DLL Hijacking example",
  "Abusing PATH Environment Variable example",
  "Insecure Shell Escape in Scripts example",
  "CSV Formula Injection example",
  "Insecure Rancher Configurations example",
  "Command Injection in Helm Charts example",
  "Insecure Istio Config example",
  "HTTP/2 Demonstrations (HPACK Bomb) example",
  "ACME Protocol Demonstration example",
  "SAML Response Tampering example",
  "SPNEGO/Kerberos Downgrade Vulnerabilities example",
  "OAuth Implicit Flow Vulnerabilities example",
  "Confused Deputy Problem example",
  "SSRF via SSRF Blacklist Bypass example",
  "BGP Route Injection example",
  "Locating Hidden Admin Panels example",
  "Demonstration Scenario Unquoted Service Paths on Windows example",
  "Malicious Link in Intranet example",
  "Cookie Tossing Vulnerability example",
  "Abusing WebDAV Methods example",
  "Abusing OPTIONS Method example",
  "Cross-Site Script Inclusion with JSONP example",
  "File Upload Bypass via Content-Type example",
  "Filename Obfuscation in Upload example",
  "Storing Code in EXIF Data example",
  "RCE via ImageMagick (ImageTragick) example",
  "SSRF via Redis/HTTP example",
  "Misinformed JSON Parsing Demonstration example",
  "Insecure Handling of Null Characters example",
  "Abusing ASCII Control Characters example",
  "Stenographic Channels in Images example",
  "Exfiltration via DNS Tunneling example",
  "Exfiltration via ICMP Tunneling example",
  "Exfiltration via Covert TCP Channels example",
  "Insecure Handling of Signals in UNIX example",
  "Renegotiation Vulnerability in TLS example",
  "SNI Injection Vulnerability example",
  "X.509 Parsing Vulnerabilities example",
  "Compromising Weak Ciphersuites example",
  "Cross-Host Vulnerabilities via Shared Hosting example",
  "Misuse of .git/.svn/.hg Folders on Web Servers example",
  "Reverse Proxy Misdirection example",
  "WAF Bypass Vulnerabilities example",
  "Forced Browsing Vulnerabilities example",
  "JSON Injection via callback parameters example",
  "Insecure Handling of JWT Kid Parameter example",
  "HTTP Desync Vulnerabilities example",
  "Abusing Vary Headers in HTTP example",
  "WebSocket Injection example",
  "Exposed DEBUG endpoints example",
  "API Key Leakage via Referer Headers example",
  "SSRF via File:// Protocol example",
  "Insecure Access to .env Files example",
  "Insecure Access to Backup Files (.bak) example",
  "Insecure Handling of .DS_Store Files example",
  "DNS Reverse Lookup Vulnerability example",
  "Abusing HEAD Method example",
  "Cross-Site Request Forgery with Flash example",
  "POC to Vulnerabilty JSON Hijacking example",
  "POC to Vulnerabilty JSON Hijacking example",
  "Reverse Tabnabbing example",
  "Mousejacking Vulnerabilities example",
  "Physical Vulnerabilities: USB Drops example",
  "Rogue Charging Stations Vulnerabilities example",
  "Browser Extension CSRF example",
  "DOM Clobbering Vulnerabilities example",
  "Mutation XSS example",
  "Insecure Filter Regex example",
  "Script Gadget Injection in Templates example",
  "Insecure Handling of Window.opener example",
  "Reflected File Download example",
  "Pharming Vulnerability example",
  "Man-in-the-Browser Vulnerability example",
  "Drive-by Download Demonstrations example",
  "Insecure Content Security Policy example",
  "Insecure CORS Configuration example",
  "Unrestricted File Upload example",
  "Malicious Zip Bomb example",
  "Abusing Flaws in PDF Renderers example",
  "Abusing Flaws in OCR Tools example",
  "SVG Files as Test Vectors example",
  "XSLT Server-Side Injection example",
  "SSRF via Headless Browser example",
  "Abusing Serverless Billing with Demonstration example",
  "Insecure SSRF via Cloud Functions example",
  "Lateral Movement via Compromised Instances example",
  "Abusing Code Comments for Injection example",
  "CSS Injection (exfiltrating data through CSS) example",
  "Data Exfiltration via Email Protocols example",
  "Insecure TLS Certificate Validation example",
  "Insecure Cipher Negotiation example",
  "Click Event Hijacking on Mobile example",
  "Compromising IoT Medical Devices example",
  "Vulnerabilities on Automotive CAN Bus example",
  "SCADA PLC Command Injection example",
  "Insecure BACnet Config example",
  "Fake Mobile App Updates example",
  "Demonstrations in Industrial Protocol Converters example",
  "Drone/Robot Telemetry Injection example",
  "Rogue Firmware Updates example",
  "BleedingTooth Bluetooth Demonstration example",
  "WPS PIN Brute Force example",
  "Vulnerabilities on WPA3 (Dragonblood) example"
];



const evasionTechniquesList = [
  "URL Encoding example",
  "Double URL Encoding example",
  "Base64 Encoding example",
  "Hex Encoding example",
  "HTML Entity Encoding example",
  "Case Variation example",
  "Mixed Case Evasion example",
  "UTF-8 Encoding example",
  "URL Parameter Pollution example",
  "Obfuscated JavaScript example",
  "Reverse String Encoding example",
  "Polyglot Codes example",
  "Whitespace Obfuscation example",
  "Comment Insertion example",
  "String Concatenation example",
  "Character Padding example",
  "Null Byte Injection example",
  "Mixed Protocol Injection example",
  "Fake Parameter Injection example",
  "Redundant Path Segments example",
  "IP Address Obfuscation example",
  "Octal/Decimal IP Encoding example",
  "Reverse DNS Lookup example",
  "DNS CNAME Chaining example",
  "Long URL Obfuscation example",
  "Fragmentation of Code example",
  "Excessive URL Length example",
  "Confusing Similar Characters example",
  "Homoglyph Vulnerabilities example",
  "Unicode Normalization Forms example",
  "Double Decoding example",
  "ROT13 Encoding example",
  "Quoted Printable Encoding example",
  "Ambiguous Grammar Injection example",
  "Fake Content-Type Headers example",
  "Fake Content-Length Headers example",
  "HTTP Verb Tunneling example",
  "Parameter Hiding in JSON example",
  "Parameter Hiding in XML example",
  "Base36/Base32 Encoding example",
  "Hexify ASCII Characters example",
  "Using Non-Standard Ports example",
  "Chunked Transfer Evasion example",
  "Multiple Encodings Combined example",
  "Command Spacing Evasion example",
  "Command Comments Evasion example",
  "Split Vulnerabilities into Two Requests example",
  "URLEncode + Double Decode example",
  "Nested Encoded Codes example",
  "Invisible Character Injection example",
  "Zero-Width Spaces Injection example",
  "Encoded Slashes in URL example",
  "Path Normalization Tricks example",
  "Double Compression Encoding example",
  "Demonstrating Browser Parsing Differences example",
  "Demonstration Scenario of Browser Parsing Differences example",
  "Case Randomization in Keywords example",
  "Macro-based Encoding example",
  "Hash-based Obfuscation example",
  "Leetspeak Substitution example",
  "Non-ASCII Homoglyph Replacement example",
  "Base85 Encoding example",
  "UTF-7 Encoding example",
  "Multibyte Character Confusion example",
  "Misleading File Extensions example",
  "JavaScript Unicode Escapes example",
  "IP Fragmentation Evasion example",
  "TLS Fingerprint Spoofing example",
  "HTTP Header Randomization example",
  "Duck Typing Codes example",
  "Non-Printable Character Injection example",
  "Base91 Encoding example",
  "Base92 Encoding example",
  "Base122 Encoding example",
  "Emoji-based Encoding example",
  "Custom Hash-based Encoding example",
  "Compression + Encryption Hybrid example",
  "Encrypted Code Delivery via HTTPS example",
  "CDN-based Delivery Evasion example",
  "DOM Property Overwriting example",
  "Steganographic Codes in Images example",
  "Steganographic Codes in Audio example",
  "Steganographic Codes in Video example",
  "Chunked Encoding Mixup example",
  "Misleading Parameter Names example",
  "Relying on Browser Quirks example",
  "Escaping Through Double Quotes example",
  "Escaping Through Backticks example",
  "Triple Encoding example",
  "Recursive Encoding Loops example",
  "URL Path Confusion example",
  "Hiding Code in CSS Content example",
  "Data URI Schemes example",
  "RFC-Compliant but Unexpected Headers example",
  "Exotic Unicode Normalization example",
  "IDN Homograph Vulnerabilities example",
  "Injecting Zero-Width Joiners example",
  "Zero-Width Non-Joiner Injection example",
  "Obfuscation via CSS Selectors example",
  "Malicious DOM Events example",
  "Shifting Code between GET and POST example",
  "Polyglot PDFs example",
  "Polyglot Images (JPEG + HTML) example",
  "Header Confusion with MIME Boundaries example",
  "Breaking Signatures with Extra Whitespace example",
  "Hiding Code in PDF Comments example",
  "Invisible iframes for Code Delivery example",
  "Hiding Code in DNS Queries example",
  "Hiding Code in NTP Traffic example",
  "Obfuscation via Morse Code example",
  "Obfuscation via Bacon's Cipher example",
  "Obfuscation with Braille Patterns example",
  "Confusing Whitespaces (Tabs vs Spaces) example",
  "Replacing Characters with Similar Unicode example",
  "Base58 Encoding example",
  "Base32hex Encoding example",
  "UUEncoding Codes example",
  "xxencoding Codes example",
  "yEncoding Codes example",
  "Quoted-Printable + Double URL Encoding example",
  "Invisible Div Layers example",
  "Multi-stage Code Delivery example",
  "Code in HTTP Trailer Fields example",
  "Confusing Content-Length with Transfer-Encoding example",
  "Malicious SVG Filters example",
  "Abusing XML Namespaces example",
  "Nested Iframes from Multiple Domains example",
  "Code Delivery via Flash Variables example",
  "Obfuscation via Redundant DNS lookups example",
  "Code in TLS Extensions example",
  "Abusing SSL Session Resumption example",
  "TLS Record Layer Obfuscation example",
  "Fragmenting JSON Codes example",
  "Obfuscation via HTML5 Polyfills example",
  "Data Smuggling in WebSockets example",
  "Binary-to-Text Shuffling example",
  "Obfuscation via RLE Encoding example",
  "Inserting Fake Unicode BOM example",
  "Escaping through Double Encoded Slashes example",
  "Redirection through multiple Shortened URLs example",
  "Abusing LFI for Evading Signatures example",
  "Using Alternate Data Streams (ADS) on Windows example",
  "Storing Code in Windows Registry example",
  "Command Obfuscation via PowerShell Aliases example",
  "Command Obfuscation in Bash using eval example",
  "Abusing WAF Whitelists example",
  "Modifying Case in Shell Commands example",
  "Inserting Line Feeds in Keywords example",
  "Combining CRLF with URL Encoding example",
  "Obfuscating SQL Code with Comments example",
  "Using Stored Procedures Instead of Raw SQL example",
  "Reordering SQL Keywords example",
  "Command Obfuscation via Environmental Variables example",
  "Encoding code in base64 multiple times example",
  "Chunked XSS Codes example",
  "Obfuscation via Excessive URL Parameters example",
  "Utilizing Browser Autocomplete example",
  "Utilizing Browser Bugs for Code Execution example",
  "Abusing Tab Characters in JSON example",
  "HTML Polyglot (HTML + JS) example",
  "XSS Code in SVG OnLoad example",
  "Open Redirect Chains example",
  "Stealth Code in DNS TXT Records example",
  "Header Injection via Non-ASCII separators example",
  "Padding Code with Zero-Length Chars example",
  "Abusing Proxy Configurations example",
  "Obfuscation with External Entity Injections example",
  "Hiding Code in Image EXIF example",
  "Hiding Code in PDF Metadata example",
  "Hiding Code in ZIP Comment example",
  "Inserting Code into ICC Profiles example",
  "Base104 Encoding (emoji, special chars) example",
  "Abusing Quoted Strings in HTTP example",
  "Misusing Cache-Control Headers example",
  "Encoding with punycode example",
  "Using Rare Encodings like EBCDIC example",
  "Inserting Code in Hostname parts example",
  "Using IPv6 short notation example",
  "Hex-encoded slashes for path evasion example",
  "UTF-16 Encoding example",
  "UTF-32 Encoding example",
  "Double Rotations (ROT13+ROT47) example",
  "Deflate then Base64 example",
  "Gzip then Hex example",
  "Chaining Multiple Compressors (Zlib, LZMA...) example",
  "Spacing Out Code with Non-breaking spaces example",
  "Zero-Breadth Joiners between Characters example",
  "Overlong UTF-8 sequences example",
  "Non-UTF encodings (Shift-JIS, Big5) example",
  "Inserting Code inside a harmless GIF example",
  "Hiding Code in WOFF font files example",
  "Renaming Parameters to look safe example",
  "Spelling Keywords Backwards example",
  "Splitting Vulnerability across multiple requests example",
  "Using PATH_INFO in URLs example",
  "Appending random query strings ignored by server example",
  "Hiding code in rarely used HTML tags example",
  "Obfuscating JavaScript code with arrays example",
  "Encoding JavaScript strings char by char example",
  "Mixing character sets example",
  "Reordering JSON keys to bypass signatures example",
  "Combining multiple small codes client-side example",
  "Inserting Code in CSS pseudo-selectors example",
  "Abusing CSS escapes for ASCII chars example",
  "Inserting Code in an XPI or CRX file example",
  "Using multipart/form-data cleverly example",
  "Abusing boundary strings in multipart requests example",
  "Code in Protocol Downgrade Demonstration example",
  "Code in Protocol Downgrade Vulnerability example",
  "Code in WebDAV PROPFIND request example",
  "Abusing Range headers to evade scanning example",
  "Inserting Code in the ETag header example",
  "Misleading via overly long TTL in DNS example",
  "Injecting Code in OData queries example",
  "Smuggling Code in GraphQL Query Variables example",
  "Chained Encodings (Base64+URL+Hex) example",
  "Using obscure cipher methods example",
  "Encrypting code with a known key example",
  "Stenographically hiding code in whitespace patterns example",
  "Base32768 Encoding example",
  "Faux Cyrillic Substitution example",
  "Reordering code points in Unicode example",
  "Using confusable Unicode characters for keywords example",
  "Injecting Code in CSS calc() example",
  "Using CSS url() imports example",
  "Dynamic imports in JavaScript example",
  "Obfuscation via WebAssembly Encoded Code example",
  "Hosting Code on a Trusted CDN example",
  "Abusing Document.write() in HTML example",
  "Injecting code in Data Binding Expressions example",
  "Abusing user agent-based code paths example",
  "Obfuscation via delayed execution example",
  "Splitting strings into multiple variables and recombining example",
  "Requiring multiple conditions to trigger code example",
  "Breaking signatures by inserting random tokens example",
  "Inserting Null bytes in keywords example",
  "Encoding code in base45 example",
  "Encoding code in base62 example",
  "Abusing JSONP call to fetch code example",
  "Timing-based delivery (only after delay) example",
  "Fragmenting Code across DNS queries example",
  "Inserting Non-Latin alphabets that look similar example",
  "Switching between GET and POST randomly example",
  "Faking known safe parameters to distract WAF example",
  "Using a known good domain as decoy example",
  "Abusing template engines for code injection example",
  "Inserting code in JWT kid field and forging signature example",
  "Chaining multiple WAF bypass techniques example",
  "Misreporting Content-Length to confuse parsers example",
  "Sending partial code in HEAD then finishing in GET example",
  "Combining upper/lower case at random example",
  "Abusing chunk extensions in HTTP/1.1 example",
  "Encoding commands inside environment variables example",
  "Using a proxy hop to re-encode code example",
  "Inserting code in XLSX metadata example",
  "Inserting code in docx metadata example",
  "Inserting code in rar comments example",
  "Encoding code as Morse code then decoding client-side example",
  "Utilizing EICAR test string as a decoy example",
  "Inlining JavaScript in unusual HTML attributes example",
  "UTF-7 encoded XSS code example",
  "Custom Base conversion (Base100 ASCII codes) example",
  "Inserting code in CSS keyframes example",
  "Padding code with random unicode emoticons example",
  "Decomposing words into char codes and reassembling example",
  "Aliasing dangerous functions to safe names example",
  "Redefining built-in functions at runtime example",
  "Hiding code in user-supplied language translations example",
  "Abusing password fields to store code example",
  "Injecting code into logs and re-reading them example",
  "HTTP Method Override (X-HTTP-Method-Override) example",
  "Inserting commands in SSH banners example",
  "LZMA compression then hex encoding example",
  "Zstandard compression + base64 example",
  "Inserting code in a TLS SNI field example",
  "Confusing analyzers with overly long domain names example",
  "Using parent directory references to appear harmless example",
  "Storing code in DNS CAA records example",
  "Encoding code in IPv6 literal example",
  "Hiding code in data:application/octet-stream URL example",
  "Demonstration scenario of differences in URL parsing client/server example",
  "Inserting code in a JSON array expecting object example",
  "Misleading WAF by using multiple Host headers example",
  "Inserting Code in Accept-Language header example",
  "Leveraging incomplete UTF-8 sequences example",
  "Breaking code into multiple code points that combine example",
  "Base122 encoding with obscure alphabets example",
  "Inserting code in a CSS animation name example",
  "Double Gzip encoding example",
  "Using HTML entities for all characters example",
  "Substitute chars with fullwidth forms example",
  "Inserting control characters like BEL or BS example",
  "Pausing code execution until certain time example"
];


const Xploitcraft = () => {
  // Add subscription error handler
  const subscriptionErrorHandler = SubscriptionErrorHandler();
  
  const [vulnerability, setVulnerability] = useState("");
  const [evasionTechnique, setEvasionTechnique] = useState("");
  const [payload, setPayload] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [explanations, setExplanations] = useState([]);
  const outputRef = useRef(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('payload_response', (data) => {
      setPayload(data.payload);
      parsePayload(data.payload);
      setLoading(false);
    });

    socket.on('error', (data) => {
      alert(`Error: ${data.error}`);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to results when content is loaded
    if ((codeBlocks.length > 0 || explanations.length > 0) && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [codeBlocks, explanations]);

  // CHANGED: For truly incremental updates, we keep a function parsePayload
  // but be aware that frequent calls can be expensive. It's okay, though.
  const parsePayload = (text) => {
    const codeRegex = /Example \d+:?\s*```python([\s\S]*?)```/g;
    const extractedCode = [];
    let match;
    
    // Extract all code blocks
    while ((match = codeRegex.exec(text)) !== null) {
      const codeIndex = extractedCode.length + 1;
      extractedCode.push({
        title: `Example ${codeIndex}`,
        code: match[1].trim()
      });
    }
    
    // Extract explanations section
    let explanationsText = "";
    const explanationsIndex = text.indexOf("EXPLANATIONS:");
    if (explanationsIndex !== -1) {
      explanationsText = text.substring(explanationsIndex);
    } else {
      // If there's no explicit "EXPLANATIONS:", try after the last code block
      const lastCodeEnd = text.lastIndexOf("```");
      if (lastCodeEnd !== -1) {
        explanationsText = text.substring(lastCodeEnd + 3).trim();
      }
    }
    
    // Extract individual explanations
    const explanationBlocks = [];
    if (explanationsText) {
      const explRegex = /Explanation for Example \d+:?\s*([\s\S]*?)(?=Explanation for Example \d+:|$)/g;
      let explMatch;
      
      while ((explMatch = explRegex.exec(explanationsText)) !== null) {
        explanationBlocks.push({
          text: explMatch[1].trim()
        });
      }
      
      if (explanationBlocks.length === 0 && explanationsText) {
        explanationBlocks.push({
          text: explanationsText.replace("EXPLANATIONS:", "").trim()
        });
      }
    }
    
    setCodeBlocks(extractedCode);
    setExplanations(explanationBlocks);
  };

  const sanitizeInput = (input) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;',
    };
    const reg = /[&<>"'`=/]/g;
    return input.replace(reg, (match) => map[match]);
  };

  const handleGeneratePayload = () => {
    if (!vulnerability && !evasionTechnique) {
      alert("Please enter at least one of vulnerability or evasion technique");
      return;
    }

    setLoading(true);
    setPayload("");
    setCodeBlocks([]);
    setExplanations([]);

    const sanitizedVulnerability = vulnerability ? sanitizeInput(vulnerability) : "";
    const sanitizedEvasionTechnique = evasionTechnique ? sanitizeInput(evasionTechnique) : "";

    const requestData = { stream: true };
    if (sanitizedVulnerability) requestData.vulnerability = sanitizedVulnerability;
    if (sanitizedEvasionTechnique) requestData.evasion_technique = sanitizedEvasionTechnique;

    fetch(`${ENDPOINT}/payload/generate_payload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          return response.text().then((text) => {
            try {
              // Check if this is a subscription error
              const errorData = JSON.parse(text);
              if (subscriptionErrorHandler.handleApiError(errorData, 'xploitcraft')) {
                // Error was handled, no need to alert
                return;
              }
            } catch (e) {
              // Not JSON or other error
            }
            alert(`Error: ${text}`);
          });
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let accumulatedText = "";

        function readChunk() {
          reader.read().then(({ done, value }) => {
            if (done) {
              setLoading(false);
              parsePayload(accumulatedText);
              return;
            }
            // CHANGED: decode partial chunk
            const chunk = decoder.decode(value, { stream: true });

            // Sometimes chunk might contain 'undefined' from the backend
            const sanitizedChunk = chunk.replace(/undefined/g, "");

            accumulatedText += sanitizedChunk;
            // Update final text as we go (for a "GPT-style" drip):
            setPayload((prev) => prev + sanitizedChunk);

            // Re-run parse logic on partial text if you want dynamic code blocks
            parsePayload(accumulatedText);

            // Keep reading
            readChunk();
          });
        }
        readChunk();
      })
      .catch((error) => {
        console.error('Error:', error);
        
        // Check if this is a subscription error
        if (!subscriptionErrorHandler.handleApiError(error, 'xploitcraft')) {
          // Only show generic error if not a subscription error
          alert('Failed to connect to the backend server. Please check the server connection.');
        }
        
        setLoading(false);
      });
  };

  const handleCopyClick = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Content copied to clipboard.');
      })
      .catch(err => console.error('Could not copy content:', err));
  };

  const handleVulnerabilityChange = (e) => {
    const chosenValue = e.target.value;
    const found = vulnerabilitiesList.find((v) => v === chosenValue);
    setVulnerability(found ? found : chosenValue);
  };

  const handleEvasionTechniqueChange = (e) => {
    const chosenValue = e.target.value;
    const found = evasionTechniquesList.find((t) => t === chosenValue);
    setEvasionTechnique(found ? found : chosenValue);
  };

  return (
    <header className="App-header">
      {/* Render the subscription error handler UI if needed */}
      {subscriptionErrorHandler.render()}
      
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="header-title">XploitCraft</h1>

      <div className="input-container-horizontal">
        <input
          type="text"
          placeholder="Enter Vulnerability or Xploit"
          value={vulnerability.replace(/ example$/, '')}
          onChange={handleVulnerabilityChange}
          className="input-field"
          list="vulnerability-list"
        />
        <datalist id="vulnerability-list">
          {vulnerabilitiesList.map((vuln, index) => (
            <option
              key={index}
              label={vuln.replace(/ example$/, '')}
              value={vuln}
            />
          ))}
        </datalist>

        <input
          type="text"
          placeholder="Enter Evasion Technique or Delivery Method"
          value={evasionTechnique.replace(/ example$/, '')}
          onChange={handleEvasionTechniqueChange}
          className="input-field"
          list="evasion-list"
        />
        <datalist id="evasion-list">
          {evasionTechniquesList.map((tech, index) => (
            <option
              key={index}
              label={tech.replace(/ example$/, '')}
              value={tech}
            />
          ))}
        </datalist>
      </div>

      <div className="button-container">
        <button onClick={handleGeneratePayload} className="generate-button-xploit">
          Generate Payload
        </button>
        {loading && (
          <img src={loadingIcon} alt="Loading..." className="loading-icon" />
        )}
      </div>

      {(codeBlocks.length > 0 || explanations.length > 0) && (
        <div className="results-container" ref={outputRef}>
          <h2 className="generated-payload-title">Generated Output</h2>

          {/* Code Examples Section */}
          <div className="code-examples-section">
            <h3 className="section-title">Code Examples</h3>
            {codeBlocks.map((block, index) => (
              <div key={index} className="code-block-wrapper">
                <div className="code-block-header">
                  <h4>{block.title}</h4>
                  <button 
                    className="copy-button-code" 
                    onClick={() => handleCopyClick(block.code)}
                  >
                    Copy
                  </button>
                </div>
                <div className="code-block-content">
                  <SyntaxHighlighter
                    language="python"
                    style={pojoaque}
                    wrapLongLines={true}
                  >
                    {block.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            ))}
          </div>
          
          {/* Explanations Section */}
          {explanations.length > 0 && (
            <div className="explanations-section">
              <h3 className="section-title">Explanations</h3>
              {explanations.map((explanation, index) => (
                <div key={index} className="explanation-block">
                  <h4>Explanation for Example {index + 1}</h4>
                  <div className="explanation-text">
                    {explanation.text.split('\n').map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button 
            className="copy-all-button" 
            onClick={() => handleCopyClick(payload)}
          >
            Copy All Content
          </button>
        </div>
      )}
    </header>
  );
}

export default Xploitcraft;
