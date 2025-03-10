db.tests.insertOne({
  "category": "aplus",
  "testId": 7,
  "testName": "A+ Core 1 Practice Test #7 (Challenging)",
  "xpPerCorrect": 10,
  "questions": [
    {
      "id": 1,
      "question": "A user reports their workstation is experiencing intermittent network connectivity issues, but only when transferring large files. Basic connectivity tests (ping, tracert) pass. Which of the following is the MOST likely cause?",
      "options": [
        "DNS server malfunction.",
        "DHCP lease expiration.",
        "Network congestion or bandwidth saturation.",
        "Faulty network interface card (NIC) driver."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Network congestion or bandwidth saturation is the MOST likely cause. Intermittent issues specifically during large file transfers suggest bandwidth limitations or congestion are being hit, while basic connectivity tests pass because they use minimal bandwidth. DNS and DHCP issues would typically affect all connectivity, not just large transfers. Faulty NIC drivers could cause general instability, but congestion is more specific to high-bandwidth scenarios.",
      "examTip": "Intermittent network issues under heavy load often point to bandwidth problems or congestion. Consider network usage patterns and bandwidth capacity when troubleshooting such issues."
    },
    {
      "id": 2,
      "question": "Which of the following BEST describes the 'Community Cloud' deployment model in terms of cost and security responsibility?",
      "options": [
        "Higher cost and full security responsibility by a single organization.",
        "Lower cost and shared security responsibility among participating organizations.",
        "Highest cost but security fully managed by a third-party provider.",
        "Lowest cost with security entirely outsourced to a public cloud provider."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Lower cost and shared security responsibility among participating organizations BEST describes a Community Cloud. Community clouds are shared by multiple organizations, allowing them to share infrastructure costs. Security responsibility is also typically shared among the community members, tailored to their common needs and compliance requirements. Private clouds have higher costs and full responsibility, public clouds have variable costs and provider-managed security (but less customization), and hybrid clouds blend cost and responsibility models.",
      "examTip": "Community clouds are about cost and responsibility sharing. They offer a middle ground for organizations with shared needs, pooling resources and security efforts."
    },
    {
      "id": 3,
      "question": "A technician is troubleshooting a laser printer that is producing completely black pages. After replacing the toner cartridge, the issue persists. Which component is MOST likely the next point of failure?",
      "options": [
        "Fuser Assembly.",
        "High-Voltage Power Supply (HVPS).",
        "Paper Feed Mechanism.",
        "Formatter Board."
      ],
      "correctAnswerIndex": 1,
      "explanation": "The High-Voltage Power Supply (HVPS) is the MOST likely next point of failure. If the printer is producing completely black pages even after toner replacement, it suggests an issue with the charging or exposure process, which is controlled by the HVPS. A failure in the HVPS can cause the drum to be uniformly charged, attracting toner across the entire page. Fuser issues cause smearing, paper feed issues cause jams, and formatter board issues are more likely to cause garbled prints or no printing at all.",
      "examTip": "Completely black pages, especially after toner replacement, often indicate a failure in the high-voltage charging system. The HVPS or related components are key suspects in this scenario."
    },
    {
      "id": 4,
      "question": "A workstation is suspected of being part of a botnet. Which network activity pattern is MOST indicative of botnet communication?",
      "options": [
        "High volume of DNS requests to known, legitimate DNS servers.",
        "Sporadic bursts of traffic to a single, well-known website.",
        "Consistent communication with a known Command and Control (C&C) server IP or domain.",
        "Excessive bandwidth usage during system idle times for peer-to-peer file sharing."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Consistent communication with a known Command and Control (C&C) server IP or domain is MOST indicative of botnet activity. Botnets are controlled by C&C servers, and infected machines (bots) regularly communicate with these servers to receive commands and upload data. High DNS requests to legitimate servers are normal, sporadic traffic to websites could be user browsing, and P2P file sharing is not necessarily botnet related. Consistent C&C communication is a strong sign of botnet infection.",
      "examTip": "Look for consistent outbound communication to suspicious or known Command and Control (C&C) servers when hunting for botnet activity. This persistent communication is a hallmark of botnet-infected machines."
    },
    {
      "id": 5,
      "question": "Which of the following memory error types is typically correctable by ECC (Error-Correcting Code) RAM?",
      "options": [
        "Parity errors.",
        "Hard errors (permanent memory cell failures).",
        "Addressing errors.",
        "Soft errors (random, non-repeating bit flips)."
      ],
      "correctAnswerIndex": 3,
      "explanation": "Soft errors (random, non-repeating bit flips) are typically correctable by ECC RAM. ECC RAM is designed to detect and correct single-bit errors (soft errors) that occur randomly due to background radiation or electrical noise. Parity errors can be detected but not always corrected by basic parity RAM (ECC is more advanced). Hard errors and addressing errors usually indicate physical memory module damage or more severe issues that ECC cannot fix.",
      "examTip": "ECC RAM is primarily for correcting 'soft errors' – those random, transient bit flips that can corrupt data but don't indicate permanent hardware failure. ECC significantly improves data integrity by correcting these errors on-the-fly."
    },
    {
      "id": 6,
      "question": "A technician needs to configure a router to prioritize voice traffic over other types of network traffic. Which router feature is BEST suited for implementing this?",
      "options": [
        "Port Forwarding.",
        "MAC Address Filtering.",
        "Quality of Service (QoS).",
        "Access Control Lists (ACLs)."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Quality of Service (QoS) is the BEST router feature for prioritizing voice traffic. QoS allows administrators to prioritize certain types of network traffic, like VoIP (Voice over IP), ensuring they receive preferential bandwidth and lower latency compared to less time-sensitive traffic. Port forwarding is for directing traffic, MAC filtering for device access control, and ACLs for access rules, but QoS is specifically for traffic prioritization.",
      "examTip": "QoS is your tool for traffic prioritization. Use QoS settings on routers to give priority to latency-sensitive applications like VoIP and video conferencing, ensuring smooth and clear communication."
    },
    {
      "id": 7,
      "question": "Which of the following is NOT needed for a basic virtual machine setup on a desktop PC?",
      "options": [
        "Sufficient RAM",
        "Virtualization support in BIOS/UEFI",
        "GPU passthrough card",
        "Ample hard disk space"
      ],
      "correctAnswerIndex": 2,
      "explanation": "GPU passthrough card is correct to exclude because basic virtualization doesn’t require specialized GPU passthrough. Sufficient RAM is wrong because memory is essential for hosting virtual machines. Virtualization support in BIOS/UEFI is wrong because hardware-assisted virtualization must be enabled. Ample hard disk space is wrong because a VM requires space for virtual disks.",
      "examTip": "Basic virtualization is primarily reliant on CPU virtualization extensions, enough RAM, and disk capacity. Specialized GPU passthrough is not a requirement for most basic VM setups."
    },
    {
      "id": 8,
      "question": "A user wants to install a RAID 1 array for data redundancy. Which configuration is correct?",
      "options": [
        "Striping with no redundancy",
        "Mirroring across two drives",
        "Striping with parity across three drives",
        "Multiple drives in a spanning volume"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Mirroring across two drives is correct because RAID 1 creates an exact copy on each drive. Striping with no redundancy is RAID 0, which doesn’t provide fault tolerance. Striping with parity is RAID 5 or 6, requiring at least three drives. Spanning is JBOD (Just a Bunch Of Disks), not a fault-tolerant RAID type.",
      "examTip": "For data redundancy, RAID 1 is the go-to configuration as it mirrors data across drives. Avoid RAID 0 for redundancy purposes."
    },
    {
      "id": 9,
      "question": "A technician is installing additional RAM in a dual-channel motherboard. Which configuration is recommended?",
      "options": [
        "Populate slots in pairs of different sizes for maximum speed",
        "Install one module at a time for each channel",
        "Use matched pairs in the correct slot color coding",
        "Place all modules in adjacent slots, ignoring color"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Use matched pairs in the correct slot color coding is correct because dual-channel boards usually require identical RAM modules in specific paired slots. Different sizes or ignoring color-coded slots can reduce performance or prevent dual-channel operation. Installing one module at a time doesn’t enable dual-channel.",
      "examTip": "Matched pairs in the correct slots are essential for dual-channel operation. Consult your motherboard manual for the correct color-coded slots."
    },
    {
      "id": 10,
      "question": "Which network tool should a technician use to identify the exact location of a cable break inside a wall?",
      "options": [
        "Loopback plug",
        "Toner probe",
        "Crimper",
        "Punchdown tool"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Toner probe is correct because it helps trace and locate cable runs behind walls. Loopback plug is wrong because it tests ports by looping signals back. Crimper is wrong because it’s for attaching connectors. Punchdown tool is wrong because it secures wires into a patch panel or keystone jack.",
      "examTip": "Toner probe kits are essential for tracing cable paths and identifying breaks, especially in complex building structures."
    },
    {
      "id": 11,
      "question": "A user complains their laptop battery is draining quickly and physically bulging. Which is the BEST immediate action?",
      "options": [
        "Perform a slow full discharge and recharge",
        "Keep using until battery fails completely",
        "Replace the battery and properly dispose of the old one",
        "Freeze the battery to reset its chemistry"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Replace the battery and properly dispose of it is correct because a bulging battery can be a safety hazard. Fully discharging is wrong because it won’t fix a physically damaged or bulging battery. Continuing to use is dangerous. Freezing is wrong and can damage the battery further.",
      "examTip": "Swollen lithium-ion batteries require immediate replacement to avoid potential fire hazards. Replace and dispose of the old battery safely."
    },
    {
      "id": 12,
      "question": "Which troubleshooting step comes FIRST according to best practice methodology when a user reports a PC issue?",
      "options": [
        "Test the theory to determine the cause",
        "Establish a theory of probable cause",
        "Identify the problem by gathering information",
        "Document all findings and close the ticket"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Identify the problem by gathering information is correct because step 1 is always to collect details. Testing the theory is step 3, establishing a theory is step 2, and documentation is step 6.",
      "examTip": "Start with identifying the problem by gathering as much information as possible. This sets the stage for effective troubleshooting."
    },
    {
      "id": 13,
      "question": "A technician notices the CPU is running excessively hot. Which is the MOST likely cause?",
      "options": [
        "Faulty BIOS battery",
        "Insufficient thermal paste on the CPU",
        "Incorrect RAM timing",
        "Malfunctioning network adapter"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Insufficient thermal paste is correct because poor heat conduction can cause CPU overheating. A faulty BIOS battery typically only affects date/time. Incorrect RAM timing causes instability, and a malfunctioning network adapter doesn’t directly affect CPU heat.",
      "examTip": "Always check heatsinks and thermal compound when diagnosing overheating CPUs. Insufficient thermal paste is a common culprit."
    },
    {
      "id": 14,
      "question": "A client wants to secure a new wireless network with encryption over a 5 GHz channel. Which standard is BEST to use?",
      "options": [
        "WEP",
        "WPA",
        "WPA2/WPA3",
        "Open (no password)"
      ],
      "correctAnswerIndex": 2,
      "explanation": "WPA2/WPA3 is correct because they provide modern, robust encryption. WEP is obsolete and easily cracked, while WPA is less secure than WPA2/WPA3. An open network provides no encryption.",
      "examTip": "Always use the strongest encryption supported by both access point and client devices. WPA2/WPA3 is the current standard for robust wireless security."
    },
    {
      "id": 15,
      "question": "A user cannot access a website by its domain name, but can reach it by IP address. Which service is MOST likely malfunctioning?",
      "options": [
        "DHCP",
        "LDAP",
        "DNS",
        "SMTP"
      ],
      "correctAnswerIndex": 2,
      "explanation": "DNS is correct because domain name resolution is failing. DHCP assigns IP addresses, LDAP is for directory services, and SMTP is for sending email.",
      "examTip": "DNS issues typically manifest as domain name failures but still allow direct IP connections. Check DNS configurations when encountering this problem."
    },
    {
      "id": 16,
      "question": "Which protocol should be used to securely manage and monitor network devices?",
      "options": [
        "SNMPv3",
        "FTP",
        "Telnet",
        "SNMPv2c"
      ],
      "correctAnswerIndex": 0,
      "explanation": "SNMPv3 adds encryption and authentication for secure management of network devices. SNMPv2c lacks encryption. FTP is for file transfers and is unencrypted. Telnet provides unencrypted remote access.",
      "examTip": "SNMPv3 = Security first. Always choose v3 for encrypted device monitoring."
    },
    {
      "id": 17,
      "question": "A user reports they can access internal resources but cannot access any websites. Which of the following should be the FIRST step in troubleshooting this issue?",
      "options": [
        "Verify DNS settings on the user’s device.",
        "Check the firewall for outbound web traffic rules.",
        "Test internet connectivity from the user’s device using ping.",
        "Ensure the user’s IP configuration matches network policies."
      ],
      "correctAnswerIndex": 0,
      "explanation": "If internal resources are accessible but external websites are not, DNS resolution issues are likely. Verifying DNS settings should be the first step. Checking the firewall and testing connectivity with ping are valid, but DNS misconfigurations often cause such issues. IP configuration mismatches would affect internal connectivity too.",
      "examTip": "Website access issues + internal connectivity OK? Check DNS first — it's the usual suspect."
    },
    {
      "id": 18,
      "question": "An organization wants to ensure its cloud deployment allows for rapid scaling during peak usage while maintaining control over internal processes. Which cloud model BEST meets these requirements?",
      "options": [
        "Hybrid cloud",
        "Private cloud",
        "Public cloud",
        "Community cloud"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A hybrid cloud combines private infrastructure control with the scalability of public cloud services during peak demands. Private clouds lack the rapid scalability of public cloud resources. Public clouds provide scalability but less control. Community clouds cater to multiple organizations with shared interests but not necessarily rapid scalability.",
      "examTip": "Hybrid cloud = Control + Scalability. Ideal for fluctuating workloads needing flexibility."
    },
    {
      "id": 19,
      "question": "Which OSI layer is responsible for reliable data transfer, including error correction and flow control?",
      "options": [
        "Transport",
        "Network",
        "Session",
        "Data Link"
      ],
      "correctAnswerIndex": 0,
      "explanation": "The Transport layer (Layer 4) ensures reliable data transfer through error correction and flow control (e.g., using TCP). The Network layer (Layer 3) handles routing and addressing. The Session layer (Layer 5) manages sessions between applications but not data reliability. The Data Link layer (Layer 2) ensures data transfer across the physical link but without end-to-end reliability.",
      "examTip": "Remember TCP operates at the Transport layer for reliable delivery, while UDP also works at this layer without guaranteed delivery."
    },
    {
      "id": 20,
      "question": "Which of these best defines **Phishing**?",
      "options": [
        "The process of analyzing network traffic for threats",
        "A method of securing wireless networks",
        "A technique to trick users into revealing sensitive information",
        "A vulnerability exploitation method"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Phishing is a type of social engineering attack where attackers trick users into revealing sensitive information such as passwords or credit card numbers.",
      "examTip": "Understand common attack methods like phishing, which often exploit human error."
    },
    {
      "id": 21,
      "question": "Which of the following is a characteristic of 'Platform as a Service' (PaaS) cloud computing model in terms of vendor responsibility and user control?",
      "options": [
        "The vendor manages only the physical infrastructure; users manage everything else.",
        "The vendor manages the infrastructure, operating systems, and middleware; users manage applications and data.",
        "The vendor manages everything, including user applications and data.",
        "PaaS eliminates vendor responsibility, placing full control and management on the user."
      ],
      "correctAnswerIndex": 1,
      "explanation": "In PaaS (Platform as a Service), the cloud vendor manages the infrastructure, operating systems, and middleware. Users are responsible for managing their applications and data deployed on the platform.",
      "examTip": "PaaS is about shared responsibility. The provider manages the platform stack, while you manage your applications and data."
    },
    {
      "id": 22,
      "question": "A laser printer is producing prints with a light vertical band on one side of the page, gradually fading towards the center. Which printer component is MOST likely causing this shading issue?",
      "options": [
        "Toner Cartridge (uneven toner distribution)",
        "Fuser Assembly (uneven heat distribution)",
        "Imaging Drum (partial exposure to light or uneven wear)",
        "High-Voltage Power Supply (voltage drop on one side)"
      ],
      "correctAnswerIndex": 2,
      "explanation": "An Imaging Drum with partial exposure to light or uneven wear is MOST likely causing a light vertical band fading towards the center.",
      "examTip": "Vertical shading or fading bands, especially if they are gradual, often point to an imaging drum issue. Inspect the drum for wear or light exposure."
    },
    {
      "id": 23,
      "question": "Which of the following is a BEST practice for securely disposing of old hard drives containing sensitive corporate data?",
      "options": [
        "Deleting files and reformatting the drive.",
        "Physically destroying the drive (e.g., shredding or degaussing).",
        "Overwriting the drive with random data multiple times (data wiping).",
        "Recycling the drive at a generic electronics recycling facility."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Physically destroying the drive (e.g., shredding or degaussing) is the MOST secure practice because it ensures data is completely unrecoverable.",
      "examTip": "For ultimate data security during disposal, physical destruction of hard drives is the gold standard."
    },
    {
      "id": 24,
      "question": "Performance-Based Question (PBQ): A user reports that a laptop is completely unresponsive to power. Arrange the following diagnostic steps in the MOST logical order to identify the root cause and restore power.",
      "options": [
        "1) Check for any beep codes upon startup, 2) Replace the motherboard, 3) Test with a known-good battery, 4) Remove and reseat all RAM modules.",
        "1) Reseat the hard drive, 2) Test the charger with a multimeter, 3) Remove external peripherals, 4) Boot into BIOS and update firmware.",
        "1) Press and hold the power button for 30 seconds to discharge, 2) Connect an official or known-good AC adapter, 3) Test the DC jack for damage or looseness, 4) Attempt to power on with battery removed, then reattach battery.",
        "1) Boot from a recovery USB, 2) Swap in a brand-new SSD, 3) Reset the BIOS to defaults, 4) Replace the DC jack only if no video appears."
      ],
      "correctAnswerIndex": 3,
      "explanation": "The best sequence is to first discharge residual power and ensure the AC adapter is functional and known-good, then check the DC jack for physical damage, and finally test without the battery (some laptops can power on with adapter alone). Reattaching the battery last confirms if it’s battery-related or DC jack/adapter related. Replacing the motherboard or performing firmware updates are more advanced steps typically done after confirming simpler hardware causes aren’t at fault.",
      "examTip": "Always verify adapter functionality and basic power paths before suspecting large-scale component failure. Remove the battery to isolate whether it or the DC jack is preventing power-up."
    },
    {
      "id": 25,
      "question": "A technician is optimizing a wireless network for a high-throughput, low-latency application like real-time video editing over Wi-Fi. Which Wi-Fi standard and advanced feature combination is MOST suitable?",
      "options": [
        "802.11n with 20 MHz channel width in the 2.4 GHz band.",
        "802.11ac (Wi-Fi 5) with 40 MHz channel width in the 5 GHz band.",
        "802.11ax (Wi-Fi 6) with 80 MHz or 160 MHz channel width in the 5 GHz band, and OFDMA.",
        "802.11g with 20 MHz channel width in the 2.4 GHz band."
      ],
      "correctAnswerIndex": 3,
      "explanation": "802.11ax (Wi-Fi 6) with wide channels and OFDMA is designed for high-throughput, low-latency applications such as real-time video editing.",
      "examTip": "For demanding applications, 802.11ax in the 5 GHz band with wide channels and OFDMA is the top choice for low latency and high throughput."
    },
    {
      "id": 26,
      "question": "Which of the following is a key difference between 'Type 1' (bare-metal) and 'Type 2' (hosted) hypervisors in terms of operating system dependency?",
      "options": [
        "Type 1 hypervisors require a host operating system, while Type 2 hypervisors do not.",
        "Type 2 hypervisors require a host operating system, while Type 1 hypervisors do not.",
        "Both Type 1 and Type 2 hypervisors require a host operating system.",
        "Neither Type 1 nor Type 2 hypervisors require a host operating system."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Type 2 hypervisors run on top of an existing host operating system, whereas Type 1 hypervisors run directly on hardware.",
      "examTip": "Remember: Type 1 hypervisors are bare-metal, while Type 2 are hosted and depend on a host OS."
    },
    {
      "id": 27,
      "question": "A laser printer is producing prints with a repeating 'smudge' mark at the same location on every page, and the smudge appears as a dark, irregular blotch. Which printer component is MOST likely causing this repeating smudge mark?",
      "options": [
        "Toner Cartridge (defective wiper blade)",
        "Fuser Assembly (damaged cleaning web)",
        "Transfer Belt or Roller (contamination or defect)",
        "Laser Scanner Assembly (horizontal mirror issue)"
      ],
      "correctAnswerIndex": 2,
      "explanation": "A contaminated or defective Transfer Belt or Roller would consistently transfer a blotch on every page, causing the smudge.",
      "examTip": "Check the transfer belt or roller for contamination or damage when you see consistent smudging on prints."
    },
    {
      "id": 28,
      "question": "Which of the following is a BEST practice for securing user accounts against session hijacking or session replay attacks?",
      "options": [
        "Using persistent cookies for session management.",
        "Implementing short session timeouts and regenerating session IDs after authentication.",
        "Disabling session encryption to improve performance.",
        "Using predictable session IDs for easier session management."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Short session timeouts and session ID regeneration limit the window for attackers to exploit a session, making them best practices against hijacking.",
      "examTip": "Short session timeouts and frequent session ID regeneration are key defenses against session hijacking."
    },
    {
      "id": 29,
      "question": "Which of the following TCP ports is used by HTTPS for secure web traffic?",
      "options": [
        "Port 25",
        "Port 80",
        "Port 443",
        "Port 587"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Port 443 is the standard TCP port used by HTTPS, which encrypts web communication using SSL/TLS.",
      "examTip": "Ensure secure web browsing by using HTTPS on port 443."
    },
    {
      "id": 30,
      "question": "A technician is asked to set up a 'honeypot' on a network. What is the primary purpose of deploying a honeypot?",
      "options": [
        "To increase network bandwidth.",
        "To improve network security by actively blocking malicious traffic.",
        "To detect and study attack attempts and gather information about threat actors.",
        "To encrypt network traffic for enhanced security."
      ],
      "correctAnswerIndex": 2,
      "explanation": "The primary purpose of a honeypot is to attract attackers so that their methods can be studied and threat intelligence gathered.",
      "examTip": "Honeypots serve as decoys to lure attackers, allowing you to analyze their techniques and gather valuable threat information."
    },
    {
      "id": 31,
      "question": "Which of the following is a characteristic of 'Software as a Service' (SaaS) cloud computing model in terms of user access and management responsibility?",
      "options": [
        "Users have administrative access to the underlying operating system and server.",
        "Users primarily interact with the application software itself, with minimal management of the underlying platform or infrastructure.",
        "Users are responsible for managing the application code but not the application runtime environment.",
        "SaaS requires users to manage the application's security configurations and patches."
      ],
      "correctAnswerIndex": 1,
      "explanation": "In a SaaS model, users interact mainly with the application while the provider handles the infrastructure, platform, and maintenance.",
      "examTip": "SaaS is the most hands-off model for users, who mainly use the application while the provider manages the rest."
    },
    {
      "id": 32,
      "question": "A laser printer is producing prints with a repeating pattern of faint vertical lines across the entire page. Which printer component is MOST likely causing these faint vertical lines?",
      "options": [
        "Toner Cartridge (worn metering blade)",
        "Fuser Assembly (dirty fuser rollers)",
        "Imaging Drum (minor scratches or imperfections)",
        "High-Voltage Power Supply (slight voltage ripple)"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Minor scratches or imperfections on the imaging drum can cause faint vertical lines as the drum rotates.",
      "examTip": "Inspect the imaging drum for minor defects if you notice faint vertical lines on prints."
    },
    {
      "id": 33,
      "question": "Which of the following is a BEST practice for securing user accounts against phishing attacks?",
      "options": [
        "Regularly changing passwords.",
        "Implementing multi-factor authentication (MFA) and user education on phishing tactics.",
        "Disabling email spam filters.",
        "Storing passwords in a less secure, easily accessible location to avoid forgetting them."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Implementing MFA and educating users about phishing are effective strategies for mitigating phishing risks.",
      "examTip": "Use MFA and educate users to recognize phishing attempts to secure accounts effectively."
    },
    {
      "id": 34,
      "question": "Performance-Based Question (PBQ): A user complains of random system shutdowns in a hot office environment. Arrange these troubleshooting actions in the MOST logical order to diagnose and fix a thermal shutdown issue.",
      "options": [
        "1) Replace the thermal paste, 2) Boot into BIOS and check if CPU virtualization is enabled, 3) Run a CPU stress test, 4) Clean all fans and heatsinks of dust.",
        "1) Check the PSU wattage rating, 2) Update all device drivers, 3) Reseat expansion cards, 4) Confirm consistent CPU voltage in BIOS.",
        "1) Inspect and clean cooling components (fans, heatsinks, air vents), 2) Verify fan operation and airflow, 3) Apply or reapply high-quality thermal paste if needed, 4) Monitor CPU/GPU temps under load to confirm stability.",
        "1) Disable all power-saving features, 2) Enable maximum fan RPM in BIOS, 3) Decrease CPU core voltage, 4) Observe if the shutdowns persist during normal usage."
      ],
      "correctAnswerIndex": 3,
      "explanation": "The recommended approach is to clean out dust and verify fans first, then confirm proper airflow, reapply thermal paste if needed, and finally test under load. Random shutdowns in a hot environment often stem from overheating. Checking or replacing thermal paste prematurely, or messing with voltages, can be a later step, but verifying cooling hardware is always first. Monitoring final temperatures ensures the fix is effective.",
      "examTip": "Thermal shutdowns often have a simple cause: blocked airflow or dried-out thermal compound. Always confirm the basics—fan operation and dust removal—before more advanced interventions."
    },
    {
      "id": 35,
      "question": "A technician is optimizing a wireless network for a large area with thick walls and obstacles. Which of the following strategies is MOST effective for improving signal coverage and penetration?",
      "options": [
        "Using only 2.4 GHz band for all access points.",
        "Deploying access points using channel bonding in the 2.4 GHz band.",
        "Deploying access points on non-overlapping channels across both 2.4 GHz and 5 GHz bands.",
        "Increasing the transmit power of all access points to maximum."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Using both 2.4 GHz and 5 GHz bands with non-overlapping channels helps increase capacity and reduce interference in challenging environments.",
      "examTip": "For large areas, utilize both frequency bands and proper channel planning to optimize coverage."
    },
    {
      "id": 36,
      "question": "Which of the following is a key consideration when choosing between 'Type 1' (bare-metal) and 'Type 2' (hosted) hypervisors for a virtualization project?",
      "options": [
        "Cost of hypervisor licensing.",
        "Performance and overhead requirements.",
        "Availability of technical support.",
        "Ease of user interface for virtual machine management."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Type 1 hypervisors generally offer better performance and lower overhead since they run directly on hardware, making them preferable for performance-critical deployments.",
      "examTip": "Consider performance and overhead as primary factors when selecting between Type 1 and Type 2 hypervisors."
    },
    {
      "id": 37,
      "question": "A laser printer is producing prints with a repeating 'vertical band of faded print' on one side of the page, while the rest of the page prints normally. Which printer component is MOST likely causing this localized fading?",
      "options": [
        "Toner Cartridge (uneven toner density on one side)",
        "Fuser Assembly (uneven pressure on one side)",
        "Imaging Drum (localized wear or contamination on one side)",
        "Transfer Corona Wire or Roller (uneven charge on one side)"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Localized issues on the imaging drum, such as wear or contamination, can cause faded print on one side consistently.",
      "examTip": "Check the imaging drum for localized wear or contamination if you observe fading on one side of prints."
    },
    {
      "id": 38,
      "question": "Which of the following is a BEST practice for securing user accounts against password spraying attacks (where attackers try common passwords across many accounts)?",
      "options": [
        "Using default usernames and passwords.",
        "Disabling account lockout policies.",
        "Implementing account lockout policies with intelligent thresholding and CAPTCHA.",
        "Storing passwords in easily decryptable formats."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Account lockout policies with intelligent thresholding and CAPTCHA help protect against password spraying by limiting repeated failed attempts.",
      "examTip": "Implement account lockout and CAPTCHA to defend against automated password spraying attacks."
    },
    {
      "id": 39,
      "question": "Which of the following TCP ports is used by Microsoft Active Directory Global Catalog for replication traffic between domain controllers?",
      "options": [
        "Port 389",
        "Port 636",
        "Port 3268",
        "Port 3269"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Port 3268 is used for Global Catalog replication traffic between domain controllers.",
      "examTip": "Remember port 3268 for Global Catalog replication in Active Directory."
    },
    {
      "id": 40,
      "question": "A technician is asked to implement 'channel bonding' on a 2.4 GHz Wi-Fi network to increase bandwidth. Which of the following is a significant drawback or limitation of channel bonding in the 2.4 GHz band?",
      "options": [
        "Channel bonding reduces signal range.",
        "Channel bonding increases susceptibility to interference and reduces the number of non-overlapping channels.",
        "Channel bonding is not supported in the 2.4 GHz band.",
        "Channel bonding increases latency and jitter."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Channel bonding in the 2.4 GHz band increases interference and reduces the number of available non-overlapping channels, which can be counterproductive in congested environments.",
      "examTip": "Be cautious with channel bonding in the 2.4 GHz band due to increased interference and reduced channel availability."
    },
    {
      "id": 41,
      "question": "Which of the following is a characteristic of 'Hybrid Cloud' deployment model in terms of application portability and interoperability?",
      "options": [
        "Applications are easily portable and interoperable between public and private cloud environments due to standardized APIs and platforms.",
        "Application portability and interoperability are limited due to differences between public and private cloud environments.",
        "Hybrid clouds completely eliminate the need for application portability as applications are designed to run in a single environment.",
        "Application portability is only supported for legacy applications, not for modern cloud-native applications."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Application portability and interoperability are limited in Hybrid Cloud models due to differences between public and private cloud environments.",
      "examTip": "Expect interoperability challenges in hybrid clouds. Seamless portability often requires additional abstraction or containerization."
    },
    {
      "id": 42,
      "question": "A laser printer is producing prints with random characters or 'garbage' text instead of the expected output. Which printer component or configuration is MOST likely causing this garbled print issue?",
      "options": [
        "Toner Cartridge (incompatible toner)",
        "Fuser Assembly (incorrect fusing temperature)",
        "Print Driver (incorrect or corrupted driver)",
        "Paper Type Setting (wrong paper type selected)"
      ],
      "correctAnswerIndex": 2,
      "explanation": "An incorrect or corrupted Print Driver is MOST likely causing garbled print output, as it can cause the printer to misinterpret data.",
      "examTip": "Garbled print output often points to driver issues. Verify and reinstall the correct driver for your printer model."
    },
    {
      "id": 43,
      "question": "Which of the following is a BEST practice for securing user accounts against credential stuffing attacks (where attackers use lists of compromised credentials from other breaches)?",
      "options": [
        "Using default usernames and passwords.",
        "Disabling multi-factor authentication (MFA).",
        "Implementing multi-factor authentication (MFA) and credential monitoring for compromised passwords.",
        "Storing passwords in easily decryptable formats."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Implementing MFA and credential monitoring for compromised passwords is effective against credential stuffing, as MFA adds an extra layer of security.",
      "examTip": "MFA and credential monitoring are essential to protect against credential stuffing attacks."
    },
    {
      "id": 44,
      "question": "Which of the following TCP ports is used by Microsoft SQL Monitor service for database monitoring?",
      "options": [
        "Port 1433",
        "Port 1434 (UDP)",
        "Port 135 (RPC Endpoint Mapper)",
        "Dynamically assigned ports above 1024 (RPC Dynamic Ports)"
      ],
      "correctAnswerIndex": 3,
      "explanation": "Microsoft SQL Monitor service uses dynamically assigned ports above 1024 (RPC Dynamic Ports) for database monitoring, due to its reliance on RPC.",
      "examTip": "Be aware of dynamic port assignments when configuring firewalls for services using RPC, like SQL Monitor."
    },
    {
      "id": 45,
      "question": "A technician is optimizing Wi-Fi coverage in a multi-story building. Which of the following access point placement strategies is MOST effective for ensuring seamless roaming and minimizing signal overlap between floors?",
      "options": [
        "Placing all access points on the top floor for maximum downward coverage.",
        "Placing access points centrally on each floor, using lower transmit power and non-overlapping channels.",
        "Using a single, high-power access point to cover the entire building.",
        "Disabling band steering to force clients to connect to 2.4 GHz for better range."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Placing access points centrally on each floor, with lower transmit power and non-overlapping channels, is most effective for ensuring good coverage and minimizing interference between floors in a multi-story building.",
      "examTip": "Central placement with proper channel planning and lower power settings is key for multi-story Wi-Fi coverage."
    },
    {
      "id": 46,
      "question": "Which of the following is a characteristic of 'Hybrid Cloud' deployment model in terms of data storage and processing locations?",
      "options": [
        "All data is stored and processed exclusively in the public cloud.",
        "All data is stored and processed exclusively in the private cloud.",
        "Data storage and processing can be distributed across both public and private cloud environments based on data sensitivity and compliance needs.",
        "Hybrid clouds do not support data storage; they are only used for application hosting."
      ],
      "correctAnswerIndex": 2,
      "explanation": "In a Hybrid Cloud deployment model, data storage and processing can be distributed across both public and private cloud environments, allowing organizations to optimize for security and compliance.",
      "examTip": "Hybrid cloud strategies enable flexible data placement based on sensitivity and compliance requirements."
    },
    {
      "id": 47,
      "question": "A laser printer is producing prints with a 'shadow' image repeating faintly throughout the entire page, not just offset like ghosting, but as a subtle, consistent background pattern. Which printer component is MOST likely causing this subtle shadow image?",
      "options": [
        "Toner Cartridge (low quality toner)",
        "Fuser Assembly (residual charge on fuser rollers)",
        "Imaging Drum (general wear and tear or aging)",
        "Transfer Corona Wire or Roller (minor leakage or contamination)"
      ],
      "correctAnswerIndex": 2,
      "explanation": "General wear and tear or aging of the imaging drum can cause a subtle, repeating shadow image across prints.",
      "examTip": "Consider drum replacement if you notice a consistent shadow effect in your prints."
    },
    {
      "id": 48,
      "question": "Which of the following is a BEST practice for securing user accounts against session replay attacks (where attackers capture and reuse valid session tokens)?",
      "options": [
        "Using long-lasting session timeouts to minimize user inconvenience.",
        "Disabling session encryption to improve performance.",
        "Implementing session timeouts, regenerating session IDs, and using secure session tokens (e.g., HTTP-only, Secure flags).",
        "Storing session tokens in client-side cookies without any security flags."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Short session timeouts, session ID regeneration, and secure session tokens help mitigate session replay attacks by limiting the window of opportunity for attackers.",
      "examTip": "Use secure cookie flags and short session durations to protect against session replay."
    },
    {
      "id": 49,
      "question": "Which of the following TCP ports is used by Microsoft Active Directory DNS service for DNS queries?",
      "options": [
        "Port 53 (TCP and UDP)",
        "Port 88 (Kerberos)",
        "Port 389 (LDAP)",
        "Port 445 (SMB)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "DNS queries for Microsoft Active Directory use port 53, which supports both TCP and UDP protocols.",
      "examTip": "Port 53 is the standard port for DNS, including in Active Directory environments."
    },
    {
      "id": 50,
      "question": "A technician is optimizing a wireless network for a warehouse environment with a large open space but also metal racking and inventory that can obstruct signals. Which Wi-Fi antenna type and placement strategy is MOST effective for maximizing coverage and minimizing signal reflection issues?",
      "options": [
        "Using omnidirectional antennas placed high above the racking.",
        "Using directional antennas pointed down aisles between racking.",
        "Using high-gain omnidirectional antennas at ground level.",
        "Using patch antennas mounted directly on metal racking."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Directional antennas pointed down aisles between racking can provide targeted coverage and reduce reflections from metal surfaces.",
      "examTip": "In warehouses, use directional antennas to focus the signal along aisles and minimize interference from metal structures."
    },
    {
      "id": 51,
      "question": "Performance-Based Question (PBQ): A user complains that after upgrading their workstation for CAD usage, graphics performance is erratic. Place the following troubleshooting steps in the BEST order to isolate the issue on a new high-end GPU setup.",
      "options": [
        "1) Install the newest OS updates, 2) Increase VRAM voltage in BIOS, 3) Reseat all PCIe slots, 4) Downgrade the CAD software version.",
        "1) Run system memory tests for at least 48 hours, 2) Reinstall the entire operating system from scratch, 3) Swap to a lower-resolution monitor, 4) Check if performance normalizes.",
        "1) Verify the PSU wattage meets or exceeds GPU requirements, 2) Ensure the latest GPU drivers are installed and no errors are present, 3) Run a dedicated GPU stress tool or CAD benchmark, 4) Observe GPU temps and clock speeds under load to confirm stability.",
        "1) Disable hardware acceleration, 2) Update antivirus signatures, 3) Re-seat CPU cooler, 4) Rebuild the CAD project files."
      ],
      "correctAnswerIndex": 1,
      "explanation": "To diagnose erratic performance on a new CAD-oriented GPU, confirm the PSU is adequate, verify driver installation, then run a dedicated stress/benchmark test while monitoring temps and clock speeds. If the GPU overheats or the PSU underperforms, you’ll see dips or crashes. Steps like re-installing the OS or adjusting VRAM voltage come later. Focusing on drivers, PSU power, and GPU thermals first is the usual approach.",
      "examTip": "Always ensure your power supply and drivers are up to the task when troubleshooting new GPU setups. Stress tests under load reveal power or thermal shortfalls quickly."
    },
    {
      "id": 52,
      "question": "A laser printer is producing prints with a repeating 'smear' or 'blur' extending vertically down the page from the same horizontal position. Which printer component is MOST likely causing this vertical smear defect?",
      "options": [
        "Toner Cartridge (defective metering roller)",
        "Fuser Assembly (contamination or buildup on fuser roller)",
        "Imaging Drum (scratch or debris on drum surface)",
        "Cleaning Blade or Wiper Blade (leaving toner residue)"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Contamination or buildup on the fuser roller can cause toner to smear vertically down the page at a consistent location.",
      "examTip": "Inspect the fuser assembly for contamination or buildup if you see vertical smears in prints."
    },
    {
      "id": 53,
      "question": "Which of the following is a BEST practice for securing user accounts against brute-force attacks on web application login pages?",
      "options": [
        "Using default login page URLs (e.g., /login.php).",
        "Disabling CAPTCHA or reCAPTCHA.",
        "Implementing CAPTCHA or reCAPTCHA and account lockout policies.",
        "Storing login credentials in client-side local storage for faster authentication."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Implementing CAPTCHA, rate limiting, and strong account lockout policies are effective measures against brute-force attacks on login pages.",
      "examTip": "Combine CAPTCHA and rate limiting with account lockout policies to secure web application logins."
    },
    {
      "id": 54,
      "question": "Which of the following TCP ports is used by Microsoft Active Directory Kerberos Password Change service (kpasswd)?",
      "options": [
        "Port 88",
        "Port 464 (kpasswd/changepw)",
        "Port 749 (Kerberos v5)",
        "Port 3269 (GCoverSSL)"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Port 464 is used by the Kerberos Password Change service (kpasswd) in Active Directory environments.",
      "examTip": "Remember port 464 for password change operations in Kerberos."
    },
    {
      "id": 55,
      "question": "A technician is optimizing Wi-Fi for a public park with a large, open area. Which strategy is most effective for mitigating interference and improving network performance in a dense urban environment?",
      "options": [
        "Using only 2.4 GHz band access points with maximum channel width.",
        "Deploying access points with overlapping channels to boost signal strength.",
        "Minimizing channel width and using non-overlapping channels in the 5 GHz band.",
        "Increasing transmit power to 'overpower' neighboring networks."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Minimizing channel width and using non-overlapping channels in the 5 GHz band reduces interference in dense environments.",
      "examTip": "Opt for narrow channels and the 5 GHz band in dense, interference-prone areas for better Wi-Fi performance."
    },
    {
      "id": 56,
      "question": "Which of the following is a key security benefit of implementing 'microsegmentation' in a virtualized or cloud data center environment?",
      "options": [
        "Increased network bandwidth for virtual machines.",
        "Simplified network management through centralized VLAN configuration.",
        "Reduced attack surface and improved lateral movement containment by isolating workloads.",
        "Enhanced physical security of server hardware."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Microsegmentation reduces the attack surface by isolating workloads, thereby limiting lateral movement in case of a breach.",
      "examTip": "Use microsegmentation to contain potential breaches within small segments of your network."
    },
    {
      "id": 57,
      "question": "Performance-Based Question (PBQ): A small business’s all-in-one laser printer produces a faint secondary image (ghosting) below the primary image. Arrange the following diagnostic actions in the MOST logical order to isolate the root cause.",
      "options": [
        "1) Replace the entire formatter board, 2) Update the printer driver, 3) Restart the print spooler service, 4) Inspect the transfer roller for leftover toner.",
        "1) Inspect and clean the fuser assembly, 2) Verify if the proper media type is selected, 3) Check if the drum or rollers have residual charge, 4) Replace or clean any defective components if ghosting persists.",
        "1) Enable draft mode, 2) Switch to heavier paper, 3) Reboot the entire system, 4) Reload firmware from the manufacturer’s website.",
        "1) Update printer firmware, 2) Reseat the memory DIMMs, 3) Reroute the USB cable to avoid interference, 4) Change the default spool format to RAW."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Ghosting typically stems from leftover toner not fully discharged or fused. The correct sequence is to check/clean the fuser, ensure correct media settings (which affect heat/pressure), then check the drum or transfer components for residual charge. If ghosting persists, replace or clean those parts. Steps like driver updates or memory reseating usually won’t solve a physical ghosting issue caused by leftover toner or insufficient fusing.",
      "examTip": "When dealing with ghosting, think physically: leftover charge or poorly fused toner is the culprit. Always verify the right media settings and fusing temperature first."
    },
    {
      "id": 58,
      "question": "A laser printer is producing prints with a consistent 'smear' or 'blur' that is most pronounced at the bottom of the page and gradually fades towards the top. Which printer component is MOST likely causing this bottom-heavy smear defect?",
      "options": [
        "Toner Cartridge (overfilling or toner leakage)",
        "Fuser Assembly (uneven heating or pressure, worse at output end)",
        "Imaging Drum (contamination accumulating at the bottom edge)",
        "Cleaning Blade or Wiper Blade (ineffective cleaning at the bottom edge)"
      ],
      "correctAnswerIndex": 1,
      "explanation": "An uneven fuser assembly, particularly at the output end, can result in a bottom-heavy smear as toner is not properly fused.",
      "examTip": "Inspect the fuser assembly for uneven pressure or temperature issues if smearing is more pronounced at the bottom of the page."
    },
    {
      "id": 59,
      "question": "Performance-Based Question (PBQ): A user’s desktop frequently loses network connectivity, even though the Ethernet link light remains active. Select the BEST sequence of steps to diagnose a possible intermittent cable or port issue.",
      "options": [
        "1) Immediately replace the entire motherboard, 2) Swap to Wi-Fi, 3) Check DNS settings in Windows, 4) Rebuild network stack via netsh commands.",
        "1) Inspect cable ends for damage or loose pins, 2) Try a known-good cable, 3) Move the cable to another switch port, 4) Monitor link stability under normal load.",
        "1) Run a defragmentation on the local hard drive, 2) Check for updated GPU drivers, 3) Toggle IPv6 support, 4) Swap the NIC with a Wi-Fi adapter.",
        "1) Configure a static IP, 2) Reset the router to factory defaults, 3) Reboot the client machine, 4) Update the system BIOS."
      ],
      "correctAnswerIndex": 0,
      "explanation": "The first step is to check for physical cable or port issues: visual inspection, swapping cables, and using a different switch port. Intermittent connectivity with an active link often points to a damaged cable or failing port. Adjusting DNS or netsh commands could be relevant if cable tests fail, but verifying hardware is typically first.",
      "examTip": "Always validate physical connections—cables, ports—when diagnosing sporadic network drops. Simple checks often reveal the cause before advanced software-level troubleshooting."
    },
    {
      "id": 60,
      "question": "A technician is optimizing Wi-Fi performance in a dense apartment building with significant interference from neighboring networks. Which strategy is MOST effective for mitigating interference?",
      "options": [
        "Using only 2.4 GHz band with maximum channel width.",
        "Deploying access points with overlapping channels.",
        "Minimizing channel width and using non-overlapping channels in the 5 GHz band.",
        "Increasing transmit power to overpower interference."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Using non-overlapping channels in the 5 GHz band with minimized channel width is most effective in reducing interference in dense environments.",
      "examTip": "For dense environments, the 5 GHz band with proper channel planning helps mitigate interference effectively."
    },
    {
      "id": 61,
      "question": "Performance-Based Question (PBQ): A new IT hire must configure a Windows 10 system to host two VMs simultaneously for software testing. Arrange the following setup tasks in the CORRECT order to ensure virtualization functions properly.",
      "options": [
        "1) Allocate maximum CPU cores to each VM, 2) Disable virtualization in BIOS to allow direct OS control, 3) Install hypervisor software, 4) Patch the OS with the latest updates.",
        "1) Enable hardware virtualization (VT-x/AMD-V) in BIOS/UEFI, 2) Install or enable Hyper-V (or other hypervisor), 3) Allocate sufficient RAM/storage for each VM, 4) Create and configure the virtual machines.",
        "1) Install the operating system, 2) Immediately create two VMs with minimal resources, 3) Enable Secure Boot, 4) Update the NIC firmware.",
        "1) Disable CPU power-saving features, 2) Install a second CPU physically, 3) Install the OS as a virtual guest, 4) Copy the VM images onto the local disk."
      ],
      "correctAnswerIndex": 1,
      "explanation": "To run two VMs on Windows 10, you must first enable hardware virtualization in BIOS, then install or enable the hypervisor (like Hyper-V). After that, allocate enough RAM/disk for each VM, and finally create/configure the virtual machines. Skipping the BIOS step or the hypervisor installation would prevent VMs from functioning properly.",
      "examTip": "Always confirm virtualization is enabled at the hardware level before installing hypervisor software, or your VMs won’t even boot."
    },
    {
      "id": 62,
      "question": "A laser printer is producing prints with a repeating 'spots' or 'dots' of excess toner randomly scattered across the page. Which printer consumable is MOST likely causing this random speckling issue?",
      "options": [
        "Black Toner Cartridge.",
        "Fuser Assembly.",
        "Imaging Drum.",
        "Specific Color Toner Cartridge (e.g., Cyan Toner Cartridge)."
      ],
      "correctAnswerIndex": 3,
      "explanation": "A defective or leaking specific color toner cartridge, such as the cyan cartridge, is most likely responsible for color-specific smudges.",
      "examTip": "When a print defect is isolated to a single color, check the corresponding toner cartridge first."
    },
    {
      "id": 63,
      "question": "Which of the following is a BEST practice for securing user accounts against brute-force attacks on cloud services?",
      "options": [
        "Using easily guessable passwords to simplify cloud access.",
        "Disabling multi-factor authentication (MFA) to improve login speed.",
        "Implementing multi-factor authentication (MFA) and IP-based access restrictions.",
        "Relying solely on username and password authentication."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Multi-factor authentication combined with IP-based access restrictions significantly reduces the risk of brute-force attacks on cloud services.",
      "examTip": "Implement MFA and restrict access by IP to strengthen cloud service security against brute-force attempts."
    },
    {
      "id": 64,
      "question": "Performance-Based Question (PBQ): An office user complains about extremely slow printing from a networked laser printer. Every job eventually prints, but only after long delays. Which sequence of steps is MOST likely to isolate the bottleneck?",
      "options": [
        "1) Replace the toner immediately, 2) Swap all Ethernet cables in the building, 3) Update the office wiring schematic, 4) Print a large color photo to confirm.",
        "1) Run a traceroute to the printer IP, 2) Switch the printer to Wi-Fi mode, 3) Test for power fluctuations at the printer’s outlet, 4) Install a second spooler service.",
        "1) Check the printer's internal queue or spooler, 2) Verify the network switch port for errors or collisions, 3) Update or reinstall the print driver on the server, 4) Print a test job locally vs. over the network to compare speed.",
        "1) Power cycle the entire domain controller, 2) Rename the printer, 3) Reboot each client PC, 4) Relocate the printer to a new VLAN."
      ],
      "correctAnswerIndex": 3,
      "explanation": "Slow prints can be caused by spooler issues, network congestion, or a corrupted driver. The best approach is to check the printer’s internal queue, confirm the switch port for errors, then update drivers. Testing a local USB or direct print can differentiate server or network spooler delays from hardware issues. Replacing toner or re-cabling the entire office rarely fixes slow spooling problems.",
      "examTip": "Always confirm spooler health, network port status, and driver integrity when diagnosing slow network printing. A local test can prove if the hardware is fine."
    },
    {
      "id": 65,
      "question": "Performance-Based Question (PBQ): You must troubleshoot a newly built gaming PC that randomly shuts off during graphically intense gameplay. Arrange the following diagnostic steps in the BEST order to pinpoint the cause.",
      "options": [
        "1) Swap the OS from Windows to Linux, 2) Remove the video card, 3) Boot into Safe Mode, 4) Check all game patches.",
        "1) Confirm the PSU has adequate wattage and is delivering stable voltages under load, 2) Monitor GPU/CPU temperatures while running a stress test, 3) Update or reinstall GPU drivers, 4) Inspect and reseat power cables to the GPU.",
        "1) Reset BIOS to default settings, 2) Reinstall all motherboard chipset drivers, 3) Disable any XMP memory profiles, 4) Underclock the GPU in driver software.",
        "1) Check if the router firmware is updated, 2) Reverse any custom Windows firewall rules, 3) Disconnect the game controller, 4) Swap to an integrated GPU if available."
      ],
      "correctAnswerIndex": 2,
      "explanation": "High-load shutdowns typically come from PSU or thermal issues. First ensure the PSU is adequate and stable, then watch GPU/CPU temps with a stress test. If temps or voltages are fine, next update GPU drivers. Finally, inspect or reseat power cables. Reinstalling the OS or fiddling with the network wouldn’t solve a power/thermal shutdown.",
      "examTip": "Always verify power supply capacity and component temps under stress when a PC crashes during intense graphics tasks."
    },
    {
      "id": 66,
      "question": "Performance-Based Question (PBQ): A technician must configure RAID 5 on a workstation using three new HDDs and the built-in motherboard RAID option. Which series of steps is CORRECT for creating a functional RAID 5 array?",
      "options": [
        "1) Install a separate RAID controller card, 2) Initialize the drives, 3) Create a RAID 1 volume, 4) Set the volume as active in the OS.",
        "1) Enable SATA AHCI mode, 2) Set each drive to 'dynamic disk' in Windows, 3) Format all drives as exFAT, 4) Combine them in Disk Management as a spanned volume.",
        "1) Enable the motherboard’s RAID mode in BIOS, 2) Create a new RAID 5 volume selecting all three drives, 3) Initialize the array in the RAID BIOS utility, 4) Install/boot the OS on the RAID volume or assign it as a data disk.",
        "1) Connect the drives to separate controllers, 2) Create multiple partitions on each disk, 3) Use a software-based RAID tool to implement RAID 0, 4) Convert them to GPT for added capacity."
      ],
      "correctAnswerIndex": 2,
      "explanation": "To create RAID 5 with on-board motherboard RAID, you must first enable RAID mode in BIOS, then define a RAID 5 volume across all three drives in the RAID utility, and either install the OS onto that array or assign it as data storage. AHCI mode, spanned volumes, or purely software-based RAID 0 steps won’t yield RAID 5 fault tolerance.",
      "examTip": "Motherboard-based RAID typically requires switching from AHCI to RAID mode in BIOS, then configuring the drives in the dedicated RAID utility before installing the OS or initializing the array."
    },
    {
      "id": 67,
      "question": "Performance-Based Question (PBQ): A company’s multi-function device is printing extra toner specks on every page. Place the following diagnostic actions in the MOST logical order to fix random toner spotting.",
      "options": [
        "1) Update the device firmware, 2) Increase resolution settings, 3) Replace the device’s network cable, 4) Add more memory to the printer.",
        "1) Toggle duplex printing to single-sided, 2) Ensure the fuser is set to maximum temperature, 3) Switch to heavier paper, 4) Reboot the workstation spooler.",
        "1) Check if the transfer roller or belt is contaminated, 2) Inspect the toner cartridge for leaks or worn seals, 3) Swap the suspected toner cartridge with a known-good one, 4) Print multiple test pages to confirm the specks are gone.",
        "1) Disable SNMP monitoring, 2) Flush the DNS cache, 3) Remove advanced color profiles, 4) Force grayscale mode in driver settings."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Random toner specks frequently indicate a leaking or defective toner cartridge, or possibly contamination on the transfer roller/belt. Verifying the transfer components for contamination and testing a known-good toner can isolate which component is at fault. Changing firmware, cables, or spooler settings rarely resolves physical toner leaks. Checking heavier paper or fuser temperatures can help other print issues but not scattered specks.",
      "examTip": "Whenever you see random toner spots, suspect a leaking cartridge or a contaminated transfer assembly. Test a known-good cartridge or clean transfer parts to confirm."
    },
    {
      "id": 68,
      "question": "Which of the following is a BEST practice for securing user accounts against brute-force attacks on web application login pages?",
      "options": [
        "Using default login page URLs (e.g., /login.php).",
        "Disabling CAPTCHA to improve user experience.",
        "Implementing CAPTCHA or reCAPTCHA, rate limiting login attempts, and using strong account lockout policies.",
        "Storing login credentials in client-side local storage for faster authentication."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Implementing CAPTCHA, rate limiting, and strong account lockout policies are effective measures against brute-force attacks on login pages.",
      "examTip": "Combine CAPTCHA and rate limiting with account lockout policies to secure web application logins."
    },
    {
      "id": 69,
      "question": "Which of the following TCP ports is used by Microsoft Active Directory Global Catalog for LDAP queries to retrieve objects from the entire forest?",
      "options": [
        "Port 389",
        "Port 636",
        "Port 3268",
        "Port 3269"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Port 3268 is used for non-secure Global Catalog LDAP queries for forest-wide data retrieval.",
      "examTip": "Use port 3268 for standard Global Catalog LDAP queries in Active Directory."
    },
    {
      "id": 70,
      "question": "Performance-Based Question (PBQ): Your company wants to deploy multiple new APs in a large conference venue to support thousands of concurrent users on Wi-Fi 6. Select the BEST sequence for installing and configuring these APs for immediate readiness and load balancing.",
      "options": [
        "1) Randomly place all APs at maximum power, 2) Let them auto-negotiate channels, 3) Disable WPA3 for compatibility, 4) Set a single SSID for both 2.4 GHz and 5 GHz with no band steering.",
        "1) Perform a site survey first, 2) Mount APs with proper spacing and overlap, 3) Configure a central controller for load balancing and band steering, 4) Enable WPA3 or WPA2 Enterprise encryption, then test with pilot devices.",
        "1) Install half the APs, 2) Wait for user complaints, 3) Add more APs incrementally, 4) Set minimal encryption to reduce overhead.",
        "1) Place APs near electrical rooms, 2) Use channel bonding on all 2.4 GHz channels, 3) Manually assign each device’s IP, 4) Configure a hidden SSID."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Effective large-venue Wi-Fi deployment starts with a site survey, ensuring correct AP spacing and channel selection. A central controller for load balancing/band steering is crucial for thousands of users. Using secure encryption (WPA3 or WPA2 Enterprise) is best practice. Random placement, minimal encryption, or ignoring coverage planning typically leads to interference and poor user experience.",
      "examTip": "Always begin large Wi-Fi deployments with a thorough site survey and a controller-based approach, especially if you need to handle massive crowds simultaneously."
    },
    {
      "id": 71,
      "question": "Which of the following is a key security consideration related to 'serverless computing' or 'Function-as-a-Service (FaaS)' cloud models?",
      "options": [
        "Increased control over the underlying server operating system.",
        "Simplified patching and vulnerability management as the cloud provider handles OS security.",
        "Reduced visibility and control over the execution environment and dependencies, increasing potential blind spots.",
        "Elimination of all security concerns as serverless functions are inherently secure."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Serverless computing reduces visibility and control over the execution environment, which can create security blind spots despite provider-managed infrastructure security.",
      "examTip": "Be aware that while serverless shifts some security responsibilities to the provider, it also reduces your control over the runtime environment, requiring careful management of function-level security."
    },
    {
      "id": 72,
      "question": "Performance-Based Question (PBQ): A user complains that multiple VMs on a single hypervisor become sluggish when heavy disk I/O occurs. Arrange the following troubleshooting measures to best address the shared storage bottleneck.",
      "options": [
        "1) Increase CPU core count, 2) Disable memory overcommitment, 3) Migrate to a slower HDD array, 4) Force all VMs onto the same LUN.",
        "1) Monitor disk queue length, 2) Evaluate SSD or faster storage tiers, 3) Verify that each VM is using correct virtual disk settings, 4) Implement disk I/O throttling or QoS if needed.",
        "1) Swap the hypervisor software entirely, 2) Migrate to the latest OS patches for each VM, 3) Reinstall the NIC drivers, 4) Expand the server’s RAM capacity.",
        "1) Configure jumbo frames, 2) Update the GPU driver, 3) Consolidate snapshots, 4) Move all VMs to a USB-based enclosure."
      ],
      "correctAnswerIndex": 1,
      "explanation": "When VMs slow down under heavy I/O, first measure disk queue length to confirm a bottleneck. Next, consider moving to faster storage (SSD or RAID upgrades). Check each VM’s virtual disk settings (e.g., thin vs. thick provisioning) and if needed, implement I/O throttling or QoS. Swapping hypervisors or messing with NIC drivers doesn’t address disk throughput. USB-based enclosures aren’t suitable for production I/O loads.",
      "examTip": "Investigate disk performance metrics first. If queue length is high, upgrading storage or implementing I/O QoS can dramatically improve multi-VM performance."
    },
    {
      "id": 73,
      "question": "A technician is troubleshooting a system with intermittent 'blue screen of death' (BSOD) errors. After extensive diagnostics, the technician suspects a hardware issue related to the memory subsystem. However, standard memory tests show no errors. Which of the following tools or techniques is MOST likely to reveal subtle memory errors that might be missed by conventional tests?",
      "options": [
        "task Manager memory tab",
        "System File Checker (SFC)",
        "Memtest86+ in multi-pass mode",
        "Windows Event Viewer"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Memtest86+ in extended, multi-pass mode with strict error checking is the MOST likely to reveal subtle memory errors. While standard memory tests might pass, more rigorous testing like Memtest86+ (especially in extended modes with many passes and strict error checking) can uncover intermittent or subtle errors that only manifest under specific conditions or after prolonged stress. Disk Defragmenter is for hard drives, SFC checks system file integrity, and Event Viewer logs errors but doesn't actively test for them.",
      "examTip": "For elusive memory errors, go beyond basic tests. Memtest86+ in extended mode with multiple passes is your best bet for uncovering subtle RAM issues that can cause intermittent system instability."
    },
    {
      "id": 74,
      "question": "Performance-Based Question (PBQ): A user reports that after enabling virtualization in the BIOS, the system reboots randomly when running multiple VMs. Arrange the following steps in the BEST order to determine if the power supply (PSU) is causing instability.",
      "options": [
        "1) Immediately replace the CPU, 2) Remove all but one stick of RAM, 3) Reset BIOS to default, 4) Check system logs for CPU microcode errors.",
        "1) Connect a known-good power supply with equal or higher wattage rating, 2) Observe system behavior under the same virtualization workload, 3) Use a multimeter or PSU tester on the original PSU, 4) Compare voltage readings and stability between both PSUs.",
        "1) Disable virtualization again, 2) Reinstall the hypervisor, 3) Underclock the CPU by 25%, 4) Run a GPU-intensive benchmark.",
        "1) Swap motherboard entirely, 2) Switch from Windows to Linux, 3) Remove the optical drive to free power, 4) Boot to Safe Mode to test Virtualization overhead."
      ],
      "correctAnswerIndex": 1,
      "explanation": "To confirm if the PSU is insufficient or failing, you should test with a known-good PSU first under the same VM load, then check the original PSU with a multimeter or PSU tester. Compare voltages and stability to see if the random reboots vanish. Reinstalling hypervisors or swapping motherboards is premature if a power shortfall is suspected.",
      "examTip": "Virtualization can stress CPU/PSU more. Always test power supply rails with a known-good unit when random resets coincide with high load."
    },
    {
      "id": 75,
      "question": "A technician suspects a failing graphics card after artifacts appear on the display and random system freezes occur under GPU-intensive tasks. The standard driver update and OS logs show no obvious issue. Which test scenario is MOST likely to confirm the GPU failure definitively?",
      "options": [
        "Running a general CPU stress test (e.g., Prime95) for an hour",
        "Performing a thermal camera check on the motherboard chipsets",
        "Running a dedicated GPU benchmark or stress toolat maximum settings",
        "Reinstalling the OS and checking for new hardware wizard alerts"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Running a dedicated GPU stress tool like FurMark at maximum settings can push the graphics card to its limits and reveal instability or overheating issues specific to the GPU. CPU-only stress tests or OS reinstallation won’t isolate graphics-specific faults. Thermal imaging the motherboard chipsets won’t necessarily confirm a GPU-specific problem unless it explicitly reveals GPU overheating.",
      "examTip": "When isolating graphics card issues, use GPU-focused stress tests. They can confirm if the GPU or VRAM is producing the artifacts or crashes."
    },
    {
      "id": 76,
      "question": "A technician is optimizing Wi-Fi for a public park with a large, open area and scattered groups of users. Which Wi-Fi antenna type and deployment strategy is MOST appropriate for maximizing coverage?",
      "options": [
        "Using only omnidirectional access points placed at ground level.",
        "Deploying a few high-power omnidirectional access points in central locations.",
        "Deploying multiple lower-power access points with sector antennas, creating overlapping cells, and using channel reuse.",
        "Using directional antennas pointed towards specific user areas from a central point."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Deploying multiple lower-power access points with sector antennas and overlapping cells with channel reuse is most effective in covering a large open area like a park.",
      "examTip": "For large outdoor areas, a cellular-like deployment with multiple lower-power access points is optimal for coverage and capacity."
    },
    {
      "id": 77,
      "question": "Which of the following is a key security consideration when implementing 'Bring Your Own Device' (BYOD) policies in an organization?",
      "options": [
        "Simplified device management as users manage their own devices.",
        "Reduced risk of data breaches as personal devices are inherently more secure.",
        "Ensuring data security and compliance on personally owned devices accessing corporate resources.",
        "Lower network bandwidth consumption as BYOD devices use personal data plans."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Ensuring data security and compliance on personally owned devices is a primary challenge in BYOD policies, as personal devices are less controlled than corporate devices.",
      "examTip": "Focus on securing corporate data on personal devices with proper policies and security solutions when implementing BYOD."
    },
    {
      "id": 78,
      "question": "A laser printer is producing prints with repeating 'spots' or 'dots' of excess toner randomly scattered across the page. Which printer consumable or component is MOST likely causing this random speckling issue?",
      "options": [
        "Toner Cartridge (leaking toner or defective seals)",
        "Fuser Assembly (uneven roller pressure)",
        "Imaging Drum (surface contamination or scratches)",
        "Static Charge Eliminator Strip (ineffective static dissipation)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A leaking toner cartridge or defective seals can cause random toner spots to appear on prints.",
      "examTip": "When you see random toner spots, check the specific color toner cartridge for leaks or defects."
    },
    {
      "id": 79,
      "question": "A user complains of slow file transfers and occasional disconnects when accessing large files on a newly installed NAS. Network traffic analysis shows periods of high latency. Which of the following steps is MOST likely to diagnose the underlying bottleneck for file transfer performance in this scenario?",
      "options": [
        "Rebooting the NAS to clear potential cache issues",
        "Replacing the network cable with a Cat 5 cable",
        "Enabling jumbo frames",
        "Disabling the firewall on client machines"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Enabling jumbo frames (if the switch and NICs support it) can reduce overhead on large file transfers. High latency or slow file transfers might be due to inefficient packet handling. Jumbo frames can improve throughput if all network components are configured correctly. Simply rebooting or swapping with a lower-grade cable (Cat 5) typically won’t help; firewall settings are unlikely to cause chronic slow transfers in a LAN scenario.",
      "examTip": "For high-volume file transfers, every bit of overhead matters. Confirm end-to-end jumbo-frame support—on the NAS, the client NICs, and the switch—to achieve optimal performance."
    },
    {
      "id": 80,
      "question": "Which of the following TCP ports is used by Microsoft Active Directory Lightweight Directory Access Protocol (LDAP) for non-secure queries to domain controllers?",
      "options": [
        "Port 389",
        "Port 636",
        "Port 3268",
        "Port 3269"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Port 389 is the default port for non-secure LDAP queries to domain controllers.",
      "examTip": "Use port 389 for standard, unencrypted LDAP queries in Active Directory."
    },
    {
      "id": 81,
      "question": "Performance-Based Question (PBQ): A remote worker complains of drastically reduced laptop performance only when docking to a universal USB-C hub that also charges the laptop. Arrange the following troubleshooting steps in the BEST order to identify and resolve a possible power shortfall.",
      "options": [
        "1) Update the USB driver in Windows, 2) Connect a secondary external GPU, 3) Delete any existing Wi-Fi profiles, 4) Overclock the CPU in BIOS.",
        "1) Check the universal dock’s power delivery rating, 2) Verify that the dock’s USB-C cable is certified for full power, 3) Monitor CPU/GPU throttling under load, 4) Try the OEM charger or a higher-wattage dock to see if performance normalizes.",
        "1) Reinstall all system chipset drivers, 2) Roll back the OS to a previous restore point, 3) Confirm the user’s domain account credentials, 4) Replace the internal cooling fan.",
        "1) Disable the trackpad, 2) Put the laptop in airplane mode, 3) Remove the battery physically, 4) Swap from SSD to HDD."
      ],
      "correctAnswerIndex": 2,
      "explanation": "When performance drops with a universal dock, the device may be underpowered. Verifying the dock’s power delivery spec and cable rating is crucial. Monitoring system for CPU/GPU throttling under load can confirm insufficient power. If performance is normal with the OEM charger or a higher-wattage dock, you’ve isolated the cause. OS reinstallation, domain credentials, or trackpad settings won’t solve a power shortfall.",
      "examTip": "For docking stations, ensure it delivers adequate wattage. Insufficient power often leads to performance throttling, especially under heavy CPU or GPU loads."
    },
    {
      "id": 82,
      "question": "Performance-Based Question (PBQ): A technician suspects the new M.2 NVMe SSD is not performing at full speed in a user’s laptop. Arrange these steps to verify the SSD is fully compatible and achieving optimal throughput.",
      "options": [
        "1) Convert the disk to MBR, 2) Reinstall all chipset drivers, 3) Swap the laptop battery, 4) Check TRIM is enabled in Windows.",
        "1) Update the BIOS/UEFI to the latest version, 2) Verify the M.2 slot supports NVMe rather than SATA-only, 3) Install the latest NVMe driver or controller driver, 4) Run a benchmark tool to confirm performance metrics.",
        "1) Enable drive indexing, 2) Disable DMA in Device Manager, 3) Wipe the SSD with a Secure Erase, 4) Format it with exFAT for maximum speed.",
        "1) Reseat the RAM modules, 2) Switch the GPU driver to high performance, 3) Transfer large files over Wi-Fi, 4) Observe if speeds exceed 1 Gbps."
      ],
      "correctAnswerIndex": 1,
      "explanation": "First, ensure the laptop’s firmware supports NVMe, then confirm the slot is not SATA-only. Next, install the proper NVMe driver. Finally, benchmark to check real-world speeds. Merely enabling drive indexing or toggling DMA settings is insufficient to fix an unsupported slot or outdated BIOS. Reseating RAM or large file transfers over Wi-Fi do not confirm local SSD throughput.",
      "examTip": "Always verify slot compatibility and firmware support before concluding an NVMe drive is slow. A quick performance test with the correct drivers can confirm speeds."
    },
    {
      "id": 83,
      "question": "Which of the following is a key consideration when implementing 'Virtual Desktop Infrastructure' (VDI) in terms of user experience and resource allocation?",
      "options": [
        "Minimizing server-side hardware requirements to reduce costs.",
        "Prioritizing storage speed and latency for virtual desktop responsiveness.",
        "Maximizing the number of virtual desktops per server, even at the expense of performance.",
        "Focusing solely on network bandwidth, as processing is done on client devices."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Storage speed and latency are critical in VDI deployments to ensure responsive virtual desktops, especially during boot and application load times.",
      "examTip": "Invest in fast storage solutions when designing a VDI environment to ensure a smooth user experience."
    },
    {
      "id": 84,
      "question": "A technician is asked to design a high-availability Wi-Fi network for a critical infrastructure facility requiring seamless failover and redundancy. Which Wi-Fi architecture and feature set is MOST appropriate?",
      "options": [
        "Standalone access points with no redundancy features.",
        "A single, high-availability controller-based Wi-Fi system with redundant controllers and access points using WDS bridging.",
        "Multiple independent access points with overlapping coverage but no centralized management.",
        "A controller-based Wi-Fi system with redundant controllers, load balancing, and access point failover capabilities."
      ],
      "correctAnswerIndex": 3,
      "explanation": "A controller-based Wi-Fi system with redundant controllers, load balancing, and AP failover capabilities is best for high availability and redundancy.",
      "examTip": "For high availability, a centralized, redundant controller-based Wi-Fi system is recommended."
    },
    {
      "id": 85,
      "question": "Which of the following is a key factor influencing the choice between 'cloud-native' and 'lift-and-shift' migration strategies when moving applications to a public cloud environment?",
      "options": [
        "The physical location of the data center.",
        "The organization's internet bandwidth capacity.",
        "The application's architecture, scalability requirements, and tolerance for downtime.",
        "The color scheme of the existing application interface."
      ],
      "correctAnswerIndex": 2,
      "explanation": "The application's architecture, scalability requirements, and tolerance for downtime are critical factors in determining the appropriate migration strategy.",
      "examTip": "Assess your application’s characteristics carefully when choosing between cloud-native and lift-and-shift migration strategies."
    },
    {
      "id": 86,
      "question": "A laser printer is producing prints with a consistent 'hollow' or 'light' area in the center of solid black boxes or filled regions, creating a donut-like appearance. Which printer component is MOST likely causing this hollow print defect?",
      "options": [
        "Toner Cartridge (incompatible or low-quality toner)",
        "Fuser Assembly (center roller pressure issue)",
        "Imaging Drum (center area wear or damage)",
        "Laser Scanner Assembly (laser beam intensity drop in the center)"
      ],
      "correctAnswerIndex": 3,
      "explanation": "A drop in laser beam intensity in the center of the scan line from the Laser Scanner Assembly can cause a hollow or donut-like appearance in solid fills.",
      "examTip": "Check the laser scanner assembly if you notice a hollow or light center in prints."
    },
    {
      "id": 87,
      "question": "Which of the following is a BEST practice for securing user accounts against account takeover attacks that originate from compromised endpoints (e.g., malware-infected computers)?",
      "options": [
        "Relying solely on strong passwords and complex password policies.",
        "Disabling multi-factor authentication (MFA) for internal network access.",
        "Implementing multi-factor authentication (MFA), endpoint security measures (EDR/Antivirus), and network segmentation.",
        "Allowing users to disable security software on their workstations for performance reasons."
      ],
      "correctAnswerIndex": 2,
      "explanation": "MFA, endpoint security, and network segmentation provide a layered defense against account takeover from compromised endpoints.",
      "examTip": "Use a layered approach including MFA, EDR, and network segmentation to protect against endpoint-based account takeovers."
    },
    {
      "id": 88,
      "question": "Which of the following TCP ports is used by Microsoft Active Directory Global Catalog LDAP for secure and encrypted queries over SSL/TLS to retrieve objects from the entire forest?",
      "options": [
        "Port 389",
        "Port 636",
        "Port 3268",
        "Port 3269"
      ],
      "correctAnswerIndex": 3,
      "explanation": "Port 3269 is used for secure, encrypted Global Catalog LDAP queries over SSL/TLS.",
      "examTip": "For secure Global Catalog access, use port 3269 with SSL/TLS."
    },
    {
      "id": 89,
      "question": "A technician is asked to implement 'link aggregation control protocol' (LACP) on a managed switch. What is the primary advantage of using LACP over static link aggregation?",
      "options": [
        "LACP provides higher maximum bandwidth compared to static aggregation.",
        "LACP automatically detects and configures link aggregation, providing dynamic link management and failover.",
        "LACP simplifies network configuration by eliminating the need for manual link configuration.",
        "LACP reduces network latency by optimizing traffic distribution across aggregated links."
      ],
      "correctAnswerIndex": 1,
      "explanation": "LACP automatically detects and configures link aggregation, offering dynamic management and failover capabilities.",
      "examTip": "LACP offers dynamic, automatic link aggregation management, making it more resilient than static configurations."
    },
    {
      "id": 90,
      "question": "Performance-Based Question (PBQ): An outdoor music festival needs urgent Wi-Fi deployment for a massive crowd. Place the following steps in the BEST order to set up a high-density Wi-Fi 6/6E network with minimal interference and maximum throughput.",
      "options": [
        "1) Deploy random APs at maximum transmit power, 2) Enable only 2.4 GHz channels to cover more area, 3) Disable band steering to reduce overhead, 4) Let users auto-select the SSID.",
        "1) Mount each AP near ground level to avoid wind, 2) Assign each AP the same channel for simplicity, 3) Force WPA3-Enterprise encryption, 4) Use a single SSID for both public and staff.",
        "1) Conduct a quick site survey or predictive model, 2) Use controller-based APs with load balancing, 3) Configure multiple 5 GHz or 6 GHz channels with minimal overlap, 4) Deploy WPA2/WPA3 encryption and test with pilot users before the event.",
        "1) Switch to an ad-hoc mesh design, 2) Ask users to share hotspots, 3) Limit each AP to 20 clients, 4) Route all traffic through a single gateway router."
      ],
      "correctAnswerIndex": 2,
      "explanation": "For a large, high-density event, a site survey (even a rushed one) is crucial. Controller-based APs with load balancing and carefully planned 5 GHz or 6 GHz channels will minimize interference. Implement robust encryption and do a pilot test to ensure everything runs smoothly. Random channel assignment or single-channel setups in a huge crowd lead to chaos.",
      "examTip": "High-density Wi-Fi 6/6E deployments need careful channel planning and load balancing. Don’t skip even a basic site survey for large events."
    },
    {
      "id": 91,
      "question": "Which of the following is a key security benefit of using 'containerization' for application deployment compared to traditional virtual machines?",
      "options": [
        "Stronger isolation between containers due to full OS virtualization.",
        "Reduced attack surface due to smaller container images and shared OS kernel.",
        "Simplified security management through centralized VM-based security policies.",
        "Enhanced visibility and control over containerized application dependencies."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Containerization reduces the attack surface by using smaller images and a shared OS kernel, minimizing unnecessary components.",
      "examTip": "The lean nature of container images contributes to a reduced attack surface compared to full VMs."
    },
    {
      "id": 92,
      "question": "A laser printer is producing prints with repeating 'spots' or 'voids' of missing toner in a regular pattern across the page. Which printer component is MOST likely causing these missing toner spots?",
      "options": [
        "Toner Cartridge (clogged toner outlet or metering blade issue)",
        "Fuser Assembly (roller surface damage causing toner repulsion)",
        "Imaging Drum (repeating surface defect or obstruction causing toner dropout)",
        "High-Voltage Power Supply (intermittent voltage drop affecting toner transfer)"
      ],
      "correctAnswerIndex": 2,
      "explanation": "A repeating surface defect or obstruction on the imaging drum can cause consistent voids of missing toner in prints.",
      "examTip": "Inspect the imaging drum for defects if you observe a regular pattern of missing toner spots."
    },
    {
      "id": 93,
      "question": "Which of the following is a BEST practice for securing user accounts against password reuse across different online services and applications?",
      "options": [
        "Using the same password for all online accounts for easy management.",
        "Disabling password managers to encourage users to memorize passwords.",
        "Educating users about the risks of password reuse and promoting the use of password managers to generate and store unique, strong passwords for each account.",
        "Storing passwords in a simple spreadsheet for personal record-keeping."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Educating users about the risks of password reuse and using password managers to generate unique passwords is the best practice to prevent credential compromise across services.",
      "examTip": "Encourage the use of password managers and educate users on the dangers of password reuse."
    },
    {
      "id": 94,
      "question": "Which of the following TCP ports is used by Microsoft Active Directory Kerberos Key Distribution Center (KDC) for initial authentication requests, and is often targeted in Kerberos 'Golden Ticket' attacks?",
      "options": [
        "Port 88 (Kerberos)",
        "Port 464 (kpasswd/changepw)",
        "Port 749 (Kerberos v5)",
        "Port 3268 (GCoverSSL)"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Port 88 is the standard port for Kerberos authentication and is a common target in Golden Ticket attacks.",
      "examTip": "Port 88 (Kerberos) is critical for authentication in Active Directory and is often targeted in advanced attacks like Golden Tickets."
    },
    {
      "id": 95,
      "question": "A technician is asked to implement 'link aggregation control protocol' (LACP) on a managed switch. What is the primary advantage of using LACP over static link aggregation?",
      "options": [
        "LACP provides higher maximum bandwidth compared to static aggregation.",
        "LACP automatically detects and configures link aggregation, providing dynamic link management and failover.",
        "LACP simplifies network configuration by eliminating the need for manual link configuration.",
        "LACP reduces network latency by optimizing traffic distribution across aggregated links."
      ],
      "correctAnswerIndex": 1,
      "explanation": "LACP automatically detects and configures link aggregation, offering dynamic management and failover capabilities.",
      "examTip": "LACP offers dynamic, automatic link aggregation management, making it more resilient than static configurations."
    },
    {
      "id": 96,
      "question": "Which of the following is a key security challenge associated with 'serverless computing' or 'Function-as-a-Service (FaaS)' cloud models in terms of access control and permissions management?",
      "options": [
        "Simplified access control due to provider-managed security.",
        "Increased granularity and complexity in managing permissions for individual functions and event sources.",
        "Lack of access control options as serverless functions are inherently publicly accessible.",
        "Reduced complexity in auditing and monitoring access due to centralized function execution logs."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Serverless computing requires managing permissions for a large number of individual functions and event sources, increasing complexity.",
      "examTip": "Be prepared for granular and complex permission management in serverless architectures."
    },
    {
      "id": 97,
      "question": "A laser printer is producing prints with a repeating 'double image' or 'echo' effect, where a faint copy of the image is printed slightly offset from the main image. Which printer component is MOST likely causing this double image issue?",
      "options": [
        "Toner Cartridge (toner clumping or ghosting)",
        "Fuser Assembly (double fusing or roller bounce)",
        "Imaging Drum (double exposure or reflection)",
        "Laser Scanner Assembly (polygon mirror wobble or double scan)"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Double exposure issues with the imaging drum can create an echo effect in prints.",
      "examTip": "Inspect the imaging drum or laser scanner assembly if you notice a double image effect."
    },
    {
      "id": 98,
      "question": "Which of the following is a BEST practice for securing user accounts against credential theft attacks, such as phishing or malware-based credential harvesting?",
      "options": [
        "Storing passwords in plain text databases.",
        "Disabling multi-factor authentication (MFA).",
        "Implementing multi-factor authentication (MFA), anti-phishing training, and endpoint security measures.",
        "Relying solely on complex password policies without additional security layers."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Implementing MFA, along with user training and endpoint security, significantly reduces the risk of credential theft.",
      "examTip": "Layered security including MFA, user education, and endpoint protection is key to defending against credential theft."
    },
    {
      "id": 99,
      "question": "A company has begun migrating to Windows 11 and wants to optimize disk performance on systems with new NVMe SSDs. A senior technician suggests disabling certain Windows features that are no longer beneficial on these drives. Which of the following features is generally considered unnecessary or even detrimental on modern SSDs?",
      "options": [
        "Windows Indexing",
        "Windows Update Delivery Optimization",
        "Windows System Protection",
        "Disk Defragmentation (scheduled defrag)"
      ],
      "correctAnswerIndex": 3,
      "explanation": "While Windows Indexing, Update Delivery Optimization, and System Protection can have various performance implications, traditional scheduled disk defragmentation is typically unnecessary and can be detrimental for SSDs. Modern Windows versions automatically adjust drive optimization methods for SSDs, using TRIM rather than heavy defragmentation. Manually forcing defrag on SSDs could reduce the drive’s lifespan without providing real performance benefit.",
      "examTip": "On SSDs, TRIM replaces the need for old-school defrag. Always review advanced SSD-optimization practices when configuring new machines or upgrading to Windows 11."
    },
    {
      "id": 100,
      "question": "Performance-Based Question (PBQ): You’re tasked with deploying a massive Wi-Fi 6/6E network in a sports stadium for tens of thousands of users streaming video. Arrange these planning steps in the MOST logical order to ensure stable, high-density coverage.",
      "options": [
        "1) Buy any consumer-grade access point, 2) Set to maximum power, 3) Overlap channels in the 5 GHz band, 4) Disable WPA2 to minimize overhead.",
        "1) Determine total throughput requirements, 2) Conduct a thorough site survey (RF analysis), 3) Use controller-based Wi-Fi 6/6E APs with advanced features (OFDMA, BSS Coloring), 4) Deploy load balancing and test under expected peak usage.",
        "1) Check if 2.4 GHz alone can handle user load, 2) Delay the site survey until after installation, 3) Use minimal encryption for speed, 4) Rely on beamforming for everything.",
        "1) Install APs in random patterns, 2) Let each AP choose a channel automatically, 3) Keep transmit power medium, 4) Do final tests on event day only."
      ],
      "correctAnswerIndex": 2,
      "explanation": "First, determine how much capacity you need. Then do a site survey for correct AP placement. Wi-Fi 6/6E APs with advanced features handle dense environments best, especially when combined with a controller for load balancing. Random placements, ignoring encryption, or skipping the survey is a recipe for chaos in stadium deployments.",
      "examTip": "Stadium Wi-Fi demands methodical RF planning and advanced features (OFDMA, BSS Coloring) in Wi-Fi 6/6E. Always test thoroughly before the big event."
    }
  ]
});
