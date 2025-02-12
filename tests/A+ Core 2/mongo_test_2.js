db.tests.insertOne({
  "category": "aplus2",
  "testId": 2,
  "testName": "A+ Practice Test #2 (Very Easy)",
  "xpPerCorrect": 10,
  "questions": [
    {
      "id": 1,
      "question": "Which Windows tool can be used to manage startup applications and boot processes for troubleshooting purposes?",
      "options": [
        "Event Viewer",
        "Device Manager",
        "System Configuration (msconfig)",
        "Disk Management"
      ],
      "correctAnswerIndex": 2,
      "explanation": "System Configuration (msconfig) is correct because it enables you to manage boot options and startup items, making it a primary tool for quick troubleshooting. Event Viewer is incorrect because it only shows system logs and error events; it does not control startup processes. Device Manager is incorrect because it manages device drivers and hardware, not startup items. Disk Management is incorrect because it manages partitions and volumes, not boot or startup entries.",
      "examTip": "msconfig helps isolate problematic startup processes quickly. Use it early when troubleshooting slow boots or strange startup behaviors."
    },
    {
      "id": 2,
      "question": "A user wants to check the version of Windows installed on their PC using a command line. Which command is the MOST straightforward way to obtain this information?",
      "options": [
        "ipconfig /all",
        "winver",
        "diskpart",
        "hostname"
      ],
      "correctAnswerIndex": 1,
      "explanation": "winver is correct because running it opens a window displaying the exact Windows version and build number. ipconfig /all is incorrect because it only displays network configuration details. diskpart is incorrect because it is used for disk partitioning tasks and does not provide the Windows version. hostname is incorrect because it only shows the system’s network name, not the OS version.",
      "examTip": "Use winver in the Run dialog or command line to quickly verify the Windows version and build without digging into settings."
    },
    {
      "id": 3,
      "question": "Which of the following is a security best practice when creating user passwords in Windows?",
      "options": [
        "Use only letters for simplicity",
        "Use at least 8 characters with mixed complexity",
        "Write passwords on a sticky note to remember",
        "Use the same password for every account"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Use at least 8 characters with mixed complexity is correct because strong passwords typically require multiple character types (uppercase, lowercase, numbers, special symbols) to reduce the chance of being easily guessed. Using only letters is incorrect because it reduces password complexity and makes it more vulnerable to attacks. Writing passwords on a sticky note is incorrect because it creates a physical security risk. Using the same password for every account is incorrect because it increases the impact of any single account compromise.",
      "examTip": "Always encourage users to create long, complex passwords and change them regularly to mitigate security risks."
    },
    {
      "id": 4,
      "question": "In Windows, which of the following user accounts has the HIGHEST level of local privileges by default?",
      "options": [
        "Guest user",
        "Power user",
        "Administrator",
        "Standard user"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Administrator is correct because it has full local privileges to install software, change system settings, and manage other accounts on the local machine. Guest user is incorrect because it is severely limited and often turned off by default. Power user is incorrect because it does have elevated rights compared to standard users but not as extensive as Administrator. Standard user is incorrect because it has the least privileges and can only perform basic tasks.",
      "examTip": "To limit unauthorized changes or accidental system damage, do not use the Administrator account for daily tasks; instead, use a standard account and escalate privileges as needed."
    },
    {
      "id": 5,
      "question": "A technician needs to configure a laptop so that closing the lid will not put it to sleep. Which Control Panel utility in Windows 10 allows adjusting these settings?",
      "options": [
        "Network and Sharing Center",
        "Power Options",
        "Ease of Access",
        "File Explorer Options"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Power Options is correct because it controls how the system manages power, including configuring behavior when closing the lid. Network and Sharing Center is incorrect because it manages network connections and sharing settings. Ease of Access is incorrect because it primarily deals with accessibility features. File Explorer Options is incorrect because it controls how files and folders are displayed and managed, not power behavior.",
      "examTip": "Use Power Options to configure lid close actions, sleep settings, and custom power plans to optimize battery usage or performance."
    },
    {
      "id": 6,
      "question": "Which file system is typically used by modern versions of Windows for internal hard drives by default?",
      "options": [
        "FAT32",
        "NTFS",
        "exFAT",
        "ext4"
      ],
      "correctAnswerIndex": 1,
      "explanation": "NTFS is correct because it is the default file system for Windows internal drives, offering security permissions and larger file size support. FAT32 is incorrect because it is limited in file size capacity and mostly used for smaller partitions or removable media. exFAT is incorrect because it is mainly designed for flash drives requiring compatibility with both Windows and other devices. ext4 is incorrect because it is a common file system for Linux, not Windows.",
      "examTip": "NTFS is preferred for Windows due to robust security features and support for large volumes; it’s the standard for most modern Windows installations."
    },
    {
      "id": 7,
      "question": "Which of these is a BEST practice to help secure a Windows workstation against unauthorized logins?",
      "options": [
        "Use auto-login for user convenience",
        "Enable password-protected screensaver",
        "Disable mandatory password complexity",
        "Store your password in a text file on the desktop"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Enabling a password-protected screensaver is correct because it ensures the system locks after a period of inactivity, requiring user authentication to regain access. Using auto-login is incorrect because it bypasses the login prompt, reducing security. Disabling mandatory password complexity is incorrect because it weakens password strength. Storing your password in a text file on the desktop is incorrect because it creates a significant security risk if someone gains access to the computer.",
      "examTip": "Locking the workstation and requiring a password after inactivity is a fundamental step in protecting against casual insider threats or unauthorized physical access."
    },
    {
      "id": 8,
      "question": "A user reports that their Windows system is running extremely slow after a recent software installation. Which built-in tool can they use to see which processes are consuming high CPU or memory?",
      "options": [
        "Task Manager",
        "System Configuration (msconfig)",
        "Windows Defender Firewall",
        "File Explorer Options"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Task Manager is correct because it allows users to view running processes and monitor CPU, memory, and other resource usage. System Configuration (msconfig) is incorrect because it is more focused on startup programs and boot settings. Windows Defender Firewall is incorrect because it controls inbound/outbound traffic rules, not process resource usage. File Explorer Options is incorrect because it configures how files and folders are displayed, not resource use.",
      "examTip": "Use Task Manager to pinpoint programs consuming excessive resources; you can end tasks, adjust startup, or investigate further if a process is suspicious."
    },
    {
      "id": 9,
      "question": "Which of the following is the MOST common method to secure data stored on a USB flash drive in a Windows environment?",
      "options": [
        "Using chmod 777 on the USB drive",
        "Using BitLocker To Go",
        "Formatting the drive in exFAT",
        "Enabling Windows Firewall"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Using BitLocker To Go is correct because it is specifically designed for encrypting data on removable drives such as USB flash drives. Using chmod 777 is incorrect because that is a Linux-based permission command and it would grant wide-open permissions, not secure data. Formatting the drive in exFAT is incorrect because it only addresses file system compatibility, not encryption. Enabling Windows Firewall is incorrect because it filters network traffic, not data storage security.",
      "examTip": "When working in a Windows domain environment, BitLocker To Go is the simplest built-in tool for encrypting removable drives without extra software."
    },
    {
      "id": 10,
      "question": "Which Windows feature allows remote control of a desktop session to assist another user with troubleshooting?",
      "options": [
        "Remote Desktop Connection",
        "Task Scheduler",
        "Windows Update",
        "Performance Monitor"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Remote Desktop Connection is correct because it enables a user to log into and control another Windows system remotely. Task Scheduler is incorrect because it automates tasks based on triggers and schedules. Windows Update is incorrect because it manages OS updates and patches, not remote sessions. Performance Monitor is incorrect because it is used to track and analyze system performance, not remotely control a session.",
      "examTip": "Remote Desktop is invaluable for support and management. However, ensure the target machine permits remote connections, or use Microsoft Remote Assistance for user-initiated help sessions."
    },
    {
      "id": 11,
      "question": "Which user group in Windows typically has sufficient privileges to install software but not to manage system-wide security settings?",
      "options": [
        "Administrators",
        "Standard Users",
        "Power Users",
        "Guests"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Power Users is correct because, in some Windows versions, they have higher privileges than Standard Users, such as installing software, but still do not hold full administrative rights. Administrators is incorrect because they can manage every aspect of the system. Standard Users is incorrect because they usually cannot install software system-wide. Guests is incorrect because they have extremely limited privileges and often cannot install software at all.",
      "examTip": "Power Users is an older group primarily seen in legacy systems. Modern Windows often encourages Standard User + UAC prompts or full Administrator roles."
    },
    {
      "id": 12,
      "question": "A system frequently displays a 'No Operating System Found' error on boot. Which of the following is the MOST likely initial troubleshooting step for a technician to take?",
      "options": [
        "Reinstall Windows immediately",
        "Check if the hard drive is recognized in the BIOS/UEFI",
        "Replace the motherboard",
        "Disable Fast Boot in the BIOS/UEFI"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Checking if the hard drive is recognized in the BIOS/UEFI is correct because if the BIOS does not detect the drive, the operating system cannot load, causing this error. Reinstalling Windows immediately is incorrect because it’s a drastic step without confirming hardware detection. Replacing the motherboard is incorrect as an immediate step because it is more drastic and expensive; it should be a last resort after simpler checks. Disabling Fast Boot is incorrect because while it can affect POST checks, it is less likely to cause a complete OS not found issue compared to a missing drive.",
      "examTip": "Always verify hardware detection in the BIOS/UEFI before attempting OS reinstallation. Basic hardware checks come before advanced troubleshooting steps."
    },
    {
      "id": 13,
      "question": "Which of the following is a characteristic of the NTFS file system compared to FAT32?",
      "options": [
        "NTFS supports files only up to 4GB in size",
        "NTFS does not support file permissions",
        "NTFS provides encryption and compression features",
        "NTFS is exclusively for removable USB drives"
      ],
      "correctAnswerIndex": 2,
      "explanation": "NTFS provides encryption and compression features, along with better security capabilities, which is why it is more robust than FAT32. FAT32's file size limit is 4GB, so the statement that NTFS supports files only up to 4GB is incorrect. NTFS absolutely supports file permissions, so saying it does not is incorrect. NTFS is not exclusively for removable USB drives; it is the default for Windows internal drives and can be used on various storage media.",
      "examTip": "NTFS remains the default Windows file system for modern drives because it offers advanced features like permissions, encryption, and larger file size support than FAT32."
    },
    {
      "id": 14,
      "question": "Which Windows feature allows you to schedule regular maintenance tasks like disk defragmentation or running scripts?",
      "options": [
        "Task Scheduler",
        "Resource Monitor",
        "System Information",
        "gpedit.msc"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Task Scheduler is correct because it lets you automate tasks at specified times or events, such as running scripts or defragging drives. Resource Monitor is incorrect because it displays real-time resource usage, not scheduling. System Information is incorrect because it only shows hardware and software configuration details. gpedit.msc is incorrect because it is the Local Group Policy Editor, primarily used to configure policy settings, not scheduling tasks.",
      "examTip": "Task Scheduler is your go-to for automating repetitive tasks and maintenance. It can trigger tasks based on time, events, or even conditions like system idle."
    },
    {
      "id": 15,
      "question": "A technician wants to limit which programs a certain user can run in Windows. Which built-in feature can achieve this?",
      "options": [
        "Group Policy",
        "Disk Cleanup",
        "Event Viewer",
        "Windows Firewall"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Group Policy is correct because it can be used to implement software restriction policies or AppLocker to limit which applications specific users can run. Disk Cleanup is incorrect because it frees up disk space by removing temporary files. Event Viewer is incorrect because it only logs and reviews system events. Windows Firewall is incorrect because it primarily controls network traffic, not which local programs can run.",
      "examTip": "Through Group Policy or AppLocker rules, administrators can define which executables or scripts are allowed or denied for specific users or groups."
    },
    {
      "id": 16,
      "question": "A technician suspects a malware infection on a user’s PC due to unusual network traffic. Which of the following steps should be done FIRST in accordance with malware removal best practices?",
      "options": [
        "Disable all scheduled backups",
        "Update anti-malware software definitions",
        "Enable System Restore points",
        "Notify the user to ignore the issue until it’s confirmed"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Updating anti-malware software definitions is correct because ensuring you have the latest definitions is crucial before scanning and removing suspected malware. Disabling all scheduled backups is not a typical first step; you might disable System Restore after confirming infection, but quarantine comes first. Notifying the user to ignore the issue is dangerous and not part of best practices.",
      "examTip": "Always ensure anti-malware tools are up to date before scanning. Outdated definitions might fail to catch newer threats."
    },
    {
      "id": 17,
      "question": "Which Windows feature allows you to encrypt individual files or folders on an NTFS-formatted drive to protect data at rest?",
      "options": [
        "Group Policy Editor",
        "BitLocker To Go",
        "Encrypting File System (EFS)",
        "OneDrive Sync"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Encrypting File System (EFS) is correct because it encrypts files or folders at the file system level on NTFS volumes. Group Policy Editor manages OS policies, not direct file encryption. BitLocker To Go is used to encrypt entire removable drives rather than individual files. OneDrive Sync is a cloud-based syncing solution and does not natively encrypt files locally by default.",
      "examTip": "EFS is user-specific file encryption; if you need to protect entire drives (including OS drives), you’d use BitLocker. Both can run on NTFS but serve different use cases."
    },
    {
      "id": 18,
      "question": "A user keeps getting a User Account Control prompt whenever they change system settings. Which of the following is the MOST likely reason Windows displays these prompts?",
      "options": [
        "Windows is incorrectly installed",
        "The user is on a domain",
        "UAC is warning about changes requiring elevated privileges",
        "Hardware drivers are out of date"
      ],
      "correctAnswerIndex": 2,
      "explanation": "UAC is warning about changes requiring elevated privileges is correct because User Account Control is designed to prevent unauthorized modifications by prompting for confirmation. Incorrect Windows installation does not specifically cause UAC prompts. Being on a domain might impose group policies, but it does not directly trigger UAC prompts for system changes. Out-of-date drivers do not generate UAC prompts; they cause other error messages.",
      "examTip": "UAC is a core security feature. Reducing its severity can lower prompts but also increases risk. It's best practice to keep UAC at a recommended level."
    },
    {
      "id": 19,
      "question": "Which of the following Windows 10 editions is MOST likely to include BitLocker for full disk encryption and the ability to join a domain?",
      "options": [
        "Windows 10 Home",
        "Windows 10 Pro",
        "Windows 10 S",
        "Windows 10 Education"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows 10 Pro is correct because it supports BitLocker and can join a domain, making it suitable for business environments. Windows 10 Home does not have BitLocker or domain join functionality natively. Windows 10 S is a streamlined version restricted to Microsoft Store apps. Windows 10 Education is similar to Enterprise in some features, but Windows 10 Pro is the more common choice for domain join and BitLocker in standard business deployments.",
      "examTip": "Always check the edition’s feature list before selecting a Windows license for corporate environments requiring encryption and domain management."
    },
    {
      "id": 20,
      "question": "After upgrading the RAM in a Windows PC, the user notices the OS is still reporting the old memory amount. Which of the following is the MOST likely step to confirm the new RAM is recognized by the system?",
      "options": [
        "Check the RAM usage in Task Manager’s Performance tab",
        "Run Windows Disk Cleanup",
        "Update the antivirus definitions",
        "Disable Windows Update"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Checking the RAM usage in Task Manager’s Performance tab is correct because it shows the total physical memory recognized by Windows, confirming whether the new RAM is usable. Running Disk Cleanup helps free disk space and is unrelated to RAM. Updating antivirus definitions is important for security but irrelevant to hardware recognition. Disabling Windows Update does nothing to verify RAM detection.",
      "examTip": "Whenever you upgrade RAM, confirm it in both BIOS/UEFI and Windows (e.g., Task Manager or System properties) to ensure compatibility and recognition."
    },
    {
      "id": 21,
      "question": "A manager needs to remotely log in to an office PC using Remote Desktop but cannot connect. Which firewall configuration is MOST likely required?",
      "options": [
        "An outbound rule for TCP port 22",
        "An inbound rule for TCP port 3389",
        "An inbound rule for UDP port 53",
        "A custom rule blocking all inbound traffic"
      ],
      "correctAnswerIndex": 1,
      "explanation": "An inbound rule for TCP port 3389 is correct because RDP (Remote Desktop Protocol) uses TCP 3389 by default for inbound connections. Outbound rule for TCP 22 relates to SSH, not RDP. UDP port 53 is DNS, not RDP. Blocking all inbound traffic would prevent the connection entirely rather than allow it.",
      "examTip": "For Windows Remote Desktop, ensure port 3389 is open inbound on the target system’s firewall if connections fail."
    },
    {
      "id": 22,
      "question": "A user tries to open a folder on their Windows PC and receives an 'Access Denied' error. They are a local administrator. Which is the BEST next step to investigate the cause of the permission issue?",
      "options": [
        "Immediately disable UAC",
        "Use the 'Take Ownership' feature under folder properties",
        "Repair the OS with sfc /scannow",
        "Run Disk Defragmenter"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Using the 'Take Ownership' feature under folder properties is correct because sometimes folders belong to the system or another user, requiring the new owner to set or change permissions. Disabling UAC is too broad and does not address ownership directly. Repairing the OS with sfc /scannow is for corrupted system files, not file ownership or permissions. Disk Defragmenter is performance-related and irrelevant to permission issues.",
      "examTip": "Even local administrators may need to take ownership for certain protected system folders, then reassign permissions to gain full control."
    },
    {
      "id": 23,
      "question": "Which type of backup method only copies files that have changed since the last full backup, but does NOT clear the archive bit?",
      "options": [
        "Full",
        "Incremental",
        "Differential",
        "Synthetic full"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Differential is correct because it copies files changed since the last full backup and leaves the archive bit set, meaning each subsequent differential grows in size until another full backup. A full backup resets the archive bit and copies all data. An incremental backup copies changes since the last backup (full or incremental) and resets the archive bit. Synthetic full is a process that consolidates incrementals and a previous full to create a new full.",
      "examTip": "Differential backups rely on the last full backup; incremental backups rely on the last full or incremental. Know their differences to design efficient backup strategies."
    },
    {
      "id": 24,
      "question": "A small business wants to test software in an isolated environment on a Windows 10 machine. Which feature allows them to quickly create a separate OS instance without additional hardware?",
      "options": [
        "Disk Management partitioning",
        "Windows Sandbox (or Hyper-V)",
        "User Account Control adjustments",
        "Multi-booting with Linux"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Sandbox (or enabling Hyper-V) is correct because it allows creating virtual machines or a disposable environment for testing within Windows 10 (Pro or higher). Disk Management partitioning alone will not provide an isolated environment unless you install another OS. Adjusting User Account Control does not create a separate OS instance. Multi-booting with Linux is possible but requires reboots and separate OS partitions, not a quick test environment.",
      "examTip": "Hyper-V or Windows Sandbox (where available) offers a fast way to test software or changes safely without affecting the host OS. Ensure hardware virtualization is enabled in BIOS."
    },
    {
      "id": 25,
      "question": "A technician needs to allow an internal website to be accessed externally over a specific TCP port. Which firewall action is typically required on the Windows server hosting the site?",
      "options": [
        "Create a new inbound rule",
        "Create a new outbound rule",
        "Disable all firewall profiles",
        "Limit ephemeral ports"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Creating an inbound rule for the application is correct because inbound traffic on that specific port must be allowed from external sources to reach the website. Creating a new outbound rule is incorrect since the server is receiving requests. Disabling all firewall profiles is highly insecure. Limiting ephemeral ports is unrelated to explicitly allowing a specific TCP port for a service.",
      "examTip": "When hosting a website or service, inbound firewall rules define what traffic can enter. Outbound rules limit what your server sends out."
    },
    {
      "id": 26,
      "question": "A user reports that they cannot access shared folders on the local network, even though they can browse the internet. Which Windows utility is the FIRST place to check for network discovery and sharing settings?",
      "options": [
        "Windows Defender Firewall",
        "Network and Sharing Center",
        "Power Options",
        "Device Manager"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Network and Sharing Center is correct because it provides controls for network discovery, file sharing, and other sharing options that may be disabled, causing inaccessibility to shared folders. Windows Defender Firewall is incorrect as a first place to check; while firewall rules can block traffic, the primary discovery settings are in the Network and Sharing Center. Power Options is unrelated to network discovery settings. Device Manager helps manage drivers, not sharing configurations.",
      "examTip": "Always verify basic network discovery and sharing settings in the Network and Sharing Center when troubleshooting local file-sharing issues."
    },
    {
      "id": 27,
      "question": "A new user in an office environment complains they cannot install any software on their Windows workstation. The computer prompts for an admin password. Which of the following is the MOST likely explanation?",
      "options": [
        "The user's domain password is expired",
        "The user is logged into a Guest account",
        "The user has a corrupted profile",
        "The system is missing Windows updates"
      ],
      "correctAnswerIndex": 1,
      "explanation": "The user is logged into a Guest account is correct because Guest accounts have extremely limited privileges, which typically include blocking software installations. An expired domain password would prompt the user to change it, not block software installation with an admin credential prompt. A corrupted profile usually exhibits inconsistent behavior or inability to load settings, rather than installation restrictions. Missing Windows updates might cause security or compatibility issues, but not typically an admin password prompt for software installation.",
      "examTip": "Guest and standard accounts lack installation privileges. Users generally need administrative rights or UAC approval to install system-wide software."
    },
    {
      "id": 28,
      "question": "Which of the following is the BEST description of a strong password policy in Windows?",
      "options": [
        "Passwords never expire and have no complexity requirements",
        "Passwords must be exactly 6 characters and consist of only letters",
        "Passwords expire periodically and require a mix of character types",
        "Passwords must match the user’s email address for easy recall"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Passwords that expire periodically and require a mix of character types is correct because frequent changes and complexity help deter unauthorized access. Having no expiration or complexity is a significant security risk. Limiting to only letters and exactly 6 characters is too weak. Matching the user’s email address is a terrible idea, as it’s predictable and insecure.",
      "examTip": "Implementing password expiration, length, and complexity requirements is standard in corporate environments to reduce brute force and guessing attacks."
    },
    {
      "id": 29,
      "question": "A technician suspects a malware infection on a user’s PC due to unusual network traffic. Which of the following steps should be done FIRST in accordance with malware removal best practices?",
      "options": [
        "Disable all scheduled backups",
        "Update anti-malware software definitions",
        "Enable System Restore points",
        "Notify the user to ignore the issue until it’s confirmed"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Updating anti-malware software definitions is correct because ensuring you have the latest definitions is crucial before scanning and removing suspected malware. Disabling all scheduled backups is not a typical first step; you might disable System Restore after confirming infection, but not backups. Notifying the user to ignore the issue is dangerous and not part of best practices.",
      "examTip": "Always ensure anti-malware tools are up to date before scanning. Outdated definitions might fail to catch newer threats."
    },
    {
      "id": 30,
      "question": "Which Windows feature allows you to encrypt individual files or folders on an NTFS-formatted drive to protect data at rest?",
      "options": [
        "Group Policy Editor",
        "BitLocker To Go",
        "Encrypting File System (EFS)",
        "OneDrive Sync"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Encrypting File System (EFS) is correct because it encrypts files or folders at the file system level on NTFS volumes. Group Policy Editor manages OS policies, not direct file encryption. BitLocker To Go is used to encrypt entire removable drives rather than individual files. OneDrive Sync is a cloud-based syncing solution and does not natively encrypt files locally by default.",
      "examTip": "EFS is user-specific file encryption; if you need to protect entire drives (including OS drives), you’d use BitLocker. Both can run on NTFS but serve different use cases."
    },
    {
      "id": 31,
      "question": "A user keeps getting a User Account Control prompt whenever they change system settings. Which of the following is the MOST likely reason Windows displays these prompts?",
      "options": [
        "Windows is incorrectly installed",
        "The user is on a domain",
        "UAC is warning about changes requiring elevated privileges",
        "Hardware drivers are out of date"
      ],
      "correctAnswerIndex": 2,
      "explanation": "UAC is warning about changes requiring elevated privileges is correct because User Account Control is designed to prevent unauthorized modifications by prompting for confirmation. Incorrect Windows installation does not specifically cause UAC prompts. Being on a domain might impose group policies, but it does not directly trigger UAC prompts for system changes. Out-of-date drivers do not generate UAC prompts; they cause other error messages.",
      "examTip": "UAC is a core security feature. Reducing its severity can lower prompts but also increases risk. It's best practice to keep UAC at a recommended level."
    },
    {
      "id": 32,
      "question": "Which of the following Windows 10 editions is MOST likely to include BitLocker for full disk encryption and the ability to join a domain?",
      "options": [
        "Windows 10 Home",
        "Windows 10 Pro",
        "Windows 10 S",
        "Windows 10 Education"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows 10 Pro is correct because it supports BitLocker and can join a domain, making it suitable for business environments. Windows 10 Home does not have BitLocker or domain join functionality natively. Windows 10 S is a streamlined version restricted to Microsoft Store apps. Windows 10 Education is similar to Enterprise in some features, but Windows 10 Pro is the more common choice for domain join and BitLocker in standard business deployments.",
      "examTip": "Always check the edition’s feature list before selecting a Windows license for corporate environments requiring encryption and domain management."
    },
    {
      "id": 33,
      "question": "After upgrading the RAM in a Windows PC, the user notices the OS is still reporting the old memory amount. Which of the following is the MOST likely step to confirm the new RAM is recognized by the system?",
      "options": [
        "Check the RAM usage in Task Manager’s Performance tab",
        "Run Windows Disk Cleanup",
        "Update the antivirus definitions",
        "Disable Windows Update"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Checking the RAM usage in Task Manager’s Performance tab is correct because it shows the total physical memory recognized by Windows, confirming whether the new RAM is usable. Running Disk Cleanup helps free disk space and is unrelated to RAM. Updating antivirus definitions is important for security but irrelevant to hardware recognition. Disabling Windows Update does nothing to verify RAM detection.",
      "examTip": "Whenever you upgrade RAM, confirm it in both BIOS/UEFI and Windows (e.g., Task Manager or System properties) to ensure compatibility and recognition."
    },
    {
      "id": 34,
      "question": "A manager needs to remotely log in to an office PC using Remote Desktop but cannot connect. Which firewall configuration is MOST likely required?",
      "options": [
        "An outbound rule for TCP port 22",
        "An inbound rule for TCP port 3389",
        "An inbound rule for UDP port 53",
        "A custom rule blocking all inbound traffic"
      ],
      "correctAnswerIndex": 1,
      "explanation": "An inbound rule for TCP port 3389 is correct because RDP (Remote Desktop Protocol) uses TCP 3389 by default for inbound connections. Outbound rule for TCP 22 relates to SSH, not RDP. UDP port 53 is DNS, not RDP. Blocking all inbound traffic would prevent the connection entirely rather than allow it.",
      "examTip": "For Windows Remote Desktop, ensure port 3389 is open inbound on the target system’s firewall if connections fail."
    },
    {
      "id": 35,
      "question": "A technician wants to examine application logs for errors and possible causes of frequent crashes. Which Windows tool can you use for this purpose?",
      "options": [
        "Event Viewer",
        "Device Manager",
        "Local Security Policy",
        "Disk Management"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Event Viewer is correct because it contains logs for applications, security, and system events, helping identify causes of crashes. Device Manager deals with hardware issues, not application logs. Local Security Policy configures security settings, not crash logs. Disk Management handles partition and volume tasks, unrelated to direct application error details.",
      "examTip": "Event Viewer’s Application log is often your first stop when tracking down reasons for software crashes, unhandled exceptions, or compatibility issues."
    },
    {
      "id": 36,
      "question": "A technician needs to verify disk usage and available space on a Linux system from a terminal. Which command is typically used for this purpose?",
      "options": [
        "ipconfig",
        "df",
        "whoami",
        "pwd"
      ],
      "correctAnswerIndex": 1,
      "explanation": "df is correct because it reports file system disk space usage. ipconfig is a Windows network command (the Linux equivalent is ifconfig or ip). whoami shows the current user. pwd prints the current working directory. Thus, df is the primary tool for checking how much disk space is used and free on Linux.",
      "examTip": "On Linux, df -h (for ‘human-readable’) is often used to quickly see free/used space in GB or MB instead of blocks."
    },
    {
      "id": 37,
      "question": "A technician wants to delay a major feature update temporarily on a Windows 10 machine. Which settings menu is the MOST direct way to pause or defer updates?",
      "options": [
        "System > Storage",
        "Update and Security",
        "Apps > Default Apps",
        "Network and Internet > VPN"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Update and Security is correct because Windows Update settings (including pausing updates) reside there. System > Storage manages disk usage, not Windows updates. Apps > Default Apps sets default programs for file types. Network and Internet > VPN is about VPN configuration, not updates.",
      "examTip": "Windows 10 offers update deferral and pause options under Settings > Update & Security. This is useful when you want stability over new features or to wait on potential bug fixes."
    },
    {
      "id": 38,
      "question": "A technician needs to modify a registry key to fix an application issue on a Windows machine. Which utility is used to edit the Windows Registry?",
      "options": [
        "regedit",
        "msconfig",
        "perfmon",
        "gpedit.msc"
      ],
      "correctAnswerIndex": 0,
      "explanation": "regedit is correct because it directly accesses and edits the Registry. msconfig (System Configuration) manages boot configurations and startup items. perfmon (Performance Monitor) tracks system performance. gpedit.msc (Local Group Policy Editor) modifies local group policies, not the Registry directly (though policies can indirectly affect Registry keys).",
      "examTip": "Editing the Registry can be risky. Always back up keys before making changes, and proceed with caution to avoid system instability."
    },
    {
      "id": 39,
      "question": "Which of the following commands in Windows displays the Resultant Set of Policy (RSoP) for the local machine or a user to see which Group Policies are applied?",
      "options": [
        "gpupdate",
        "gpresult",
        "sfc",
        "chkdsk"
      ],
      "correctAnswerIndex": 1,
      "explanation": "gpresult is correct because it shows the Resultant Set of Policy for a user or computer, detailing which group policies are in effect. gpupdate is used to refresh group policies, not display them. sfc checks and repairs system files. chkdsk checks disk integrity. None of these show the RSoP except gpresult.",
      "examTip": "Use gpresult /R or gpresult /H <filename.html> for a clearer report on how Group Policy affects the system or user account."
    },
    {
      "id": 40,
      "question": "A user wants to block a specific malicious website on their Windows 10 machine without relying on third-party software. Which method is MOST appropriate to implement a manual block for that domain?",
      "options": [
        "Disable the domain in Windows Firewall inbound rules",
        "Edit the HOSTS file",
        "Disable DNS in Services.msc",
        "Enable the proxy setting in Internet Options"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Editing the HOSTS file is correct because you can map the malicious domain to 127.0.0.1 (local loopback), effectively blocking access. Disabling the domain in Windows Firewall inbound rules targets incoming traffic, not outbound requests to a website. Disabling DNS in Services.msc would break all domain name resolution, not just the malicious site. Enabling a proxy setting can control traffic, but simply editing the HOSTS file is more direct for blocking a single domain.",
      "examTip": "The HOSTS file can override DNS lookups. Point malicious domains to 127.0.0.1 or a non-routable IP address to block them effectively without extra tools."
    },
    {
      "id": 41,
      "question": "A user discovers that all their internet browsers show 'Certificate Not Trusted' errors for most websites. Which is the MOST likely root cause?",
      "options": [
        "Local firewall blocking secure traffic",
        "Incorrect system date and time",
        "Malware actively removing certificates",
        "DNS server is not responding"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Incorrect system date and time is correct because certificates rely on valid dates for trust validation. If the date/time is far off, browsers reject certificates. A local firewall blocking secure traffic would typically result in connection timeouts, not trust errors. Malware could remove certificates, but widespread immediate errors across many sites typically indicate a date/time issue. A DNS server not responding leads to inability to resolve hostnames, not certificate trust failures.",
      "examTip": "Always check system clock accuracy when facing widespread SSL certificate trust issues. Certificates are time-sensitive and break if the clock drifts too much."
    },
    {
      "id": 42,
      "question": "A user's laptop keeps prompting for a password right after the manufacturer logo appears during startup, before Windows boots. Which of the following passwords is MOST likely being requested?",
      "options": [
        "Windows user account password",
        "BIOS/UEFI supervisor password",
        "Wi-Fi network password",
        "Domain administrator password"
      ],
      "correctAnswerIndex": 1,
      "explanation": "The BIOS/UEFI supervisor password is correct because it is requested during the initial power-on sequence, before the operating system loads. The Windows user account password appears after the OS loads. The Wi-Fi network password is only requested once Windows has started and attempts to connect to a wireless network. The domain administrator password is unrelated to this scenario, as domain credentials are entered at the OS login screen, not during boot.",
      "examTip": "When a password prompt appears before Windows loads, it typically indicates a BIOS/UEFI or drive encryption password. Configuring these helps prevent unauthorized users from even booting the machine."
    },
    {
      "id": 43,
      "question": "Which of the following tools can help a technician identify real-time CPU and memory usage, as well as specific processes consuming the most resources in Windows?",
      "options": [
        "Performance Monitor",
        "Disk Management",
        "File Explorer Options",
        "Windows Defender Firewall"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Performance Monitor is correct because it provides real-time and logged performance data on CPU, memory, and other resources at a detailed level. Disk Management only deals with drive partitions and volumes. File Explorer Options changes how files and folders are displayed. Windows Defender Firewall monitors and controls network traffic, not CPU or memory usage specifics.",
      "examTip": "Use built-in tools like Performance Monitor for detailed system metrics and logging. Task Manager is also useful for quick real-time process monitoring."
    },
    {
      "id": 44,
      "question": "A user wants to deploy the same customized Windows configuration across multiple new PCs. Which of the following methods BEST achieves this goal?",
      "options": [
        "Copy user profiles manually to each computer via USB",
        "Create a system image and deploy it to each PC",
        "Install Windows on each PC one by one using setup DVDs",
        "Use a file-level backup solution on each PC individually"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Creating a system image and deploying it to each PC is correct because it efficiently replicates the entire OS configuration, drivers, and applications. Copying user profiles manually could miss important system-level settings and is time-consuming. Installing Windows on each PC individually is also time-consuming and inconsistent. A file-level backup solution doesn't capture the entire OS and configuration uniformly for deployment.",
      "examTip": "For uniformity and efficiency in corporate environments, imaging is a preferred method to ensure consistent OS and application setups across multiple machines."
    },
    {
      "id": 45,
      "question": "A user encounters an error stating the Master Boot Record (MBR) is corrupted. Which of the following Windows utilities in the Recovery Environment can help repair the MBR?",
      "options": [
        "bootrec /fixmbr",
        "format C:",
        "ipconfig /release",
        "chkdsk /r"
      ],
      "correctAnswerIndex": 0,
      "explanation": "bootrec /fixmbr is correct because it specifically repairs a damaged master boot record. The format C: command wipes the partition, which is not ideal if you intend to preserve data. ipconfig /release manages IP addresses and is unrelated to boot sectors. chkdsk /r checks for disk errors and bad sectors but does not fix the MBR specifically.",
      "examTip": "Bootrec is key for fixing Windows bootloader problems: /fixmbr fixes the MBR, /fixboot fixes the boot sector, and /rebuildbcd can rebuild the boot configuration data."
    },
    {
      "id": 46,
      "question": "A technician needs to ensure that user data is protected on a removable hard drive in case it is lost. Which Windows technology is BEST suited for encrypting removable drives?",
      "options": [
        "Windows Firewall",
        "Disk Cleanup",
        "BitLocker To Go",
        "NTFS Permissions"
      ],
      "correctAnswerIndex": 2,
      "explanation": "BitLocker To Go is correct because it encrypts removable drives, ensuring data is unreadable if lost or stolen. Windows Firewall only manages network traffic. Disk Cleanup frees up space by removing temporary files. NTFS Permissions help control access locally or in a domain environment, but removable drives can still be accessed outside that environment without encryption.",
      "examTip": "BitLocker To Go integrates seamlessly for removable media encryption. Regular BitLocker is intended for fixed OS drives."
    },
    {
      "id": 47,
      "question": "A technician wants to set a system-wide environment variable in Windows. Which location in the Control Panel is BEST for editing environment variables?",
      "options": [
        "System > Advanced system settings",
        "Network and Sharing Center > Adapter Settings",
        "Programs and Features > Windows Features",
        "Ease of Access > Keyboard Settings"
      ],
      "correctAnswerIndex": 0,
      "explanation": "System > Advanced system settings is correct because that section contains the Environment Variables button, letting you define system and user variables. Network and Sharing Center is for network-related options. Programs and Features is for installing or uninstalling software. Ease of Access adjusts accessibility settings, not environment variables.",
      "examTip": "Environment variables affect processes and can be set at the system or user level. Access them via System Properties for Windows or with commands like setx in a terminal."
    },
    {
      "id": 48,
      "question": "A technician wishes to ensure that all laptops in a small office apply the same Windows Updates at the same time without manually initiating each update. Which Windows technology facilitates this for a centralized approach?",
      "options": [
        "Group Policy loopback",
        "Windows Server Update Services (WSUS)",
        "Windows Defender Application Guard",
        "Network and Sharing Center"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Server Update Services (WSUS) is correct because it centrally manages and deploys updates to Windows clients within a domain. Group Policy loopback merges user policies under certain conditions but does not handle Windows Updates specifically. Windows Defender Application Guard is about sandboxing the browser, not deploying updates. Network and Sharing Center manages network connections, not update distribution.",
      "examTip": "WSUS is commonly used in corporate environments for controlled rollout of patches, ensuring all machines receive approved updates consistently and on schedule."
    },
    {
      "id": 49,
      "question": "A user opens a suspicious email attachment, and their browser subsequently opens multiple unwanted tabs with ads. They suspect malware. According to best practices, which step should be taken FIRST?",
      "options": [
        "Disconnect the computer from the network",
        "Reinstall the operating system immediately",
        "Perform a full disk wipe",
        "Replace the computer’s hard drive"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Disconnecting the computer from the network is correct because it prevents the spread of any malware to other machines and stops additional malicious downloads. Reinstalling the operating system immediately is premature; proper identification and scanning should occur first. A full disk wipe is an extreme step typically performed only if other remediation attempts fail. Replacing the hard drive is not necessary unless the drive is damaged or cannot be effectively cleaned of malware.",
      "examTip": "Isolate first, then remediate. If malware is suspected, protect the rest of the network by removing the infected system from any wired or wireless connections."
    },
    {
      "id": 50,
      "question": "Which built-in Windows tool allows you to add, remove, and configure printers on a local system?",
      "options": [
        "Devices and Printers",
        "Internet Options",
        "Resource Monitor",
        "Disk Management"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Devices and Printers is correct because it provides a centralized interface to manage printer installations and settings. Internet Options only deals with browser and internet configurations. Resource Monitor shows real-time CPU, memory, and disk usage. Disk Management handles partitions and volumes, not printer management.",
      "examTip": "For quick printer setup on Windows, Devices and Printers is your go-to. You can add local or network printers and tweak print preferences here."
    },
    {
      "id": 51,
      "question": "A user encounters an error stating the Master Boot Record (MBR) is corrupted. Which of the following tools in Windows Recovery Environment can help repair the MBR?",
      "options": [
        "bootrec /fixmbr",
        "format C:",
        "ipconfig /release",
        "chkdsk /r"
      ],
      "correctAnswerIndex": 0,
      "explanation": "bootrec /fixmbr is correct because it specifically repairs a damaged master boot record. The format C: command wipes the partition, which is not ideal if you intend to preserve data. ipconfig /release manages IP addresses and is unrelated to boot sectors. chkdsk /r checks for disk errors and bad sectors but does not fix the MBR specifically.",
      "examTip": "Bootrec is key for fixing Windows bootloader problems: /fixmbr fixes the MBR, /fixboot fixes the boot sector, and /rebuildbcd can rebuild the boot configuration data."
    },
    {
      "id": 52,
      "question": "A technician needs to ensure that user data is protected on a removable hard drive in case it is lost. Which Windows technology is BEST suited for encrypting removable drives?",
      "options": [
        "Windows Firewall",
        "Disk Cleanup",
        "BitLocker To Go",
        "NTFS Permissions"
      ],
      "correctAnswerIndex": 2,
      "explanation": "BitLocker To Go is correct because it encrypts removable drives, ensuring data is unreadable if lost or stolen. Windows Firewall only manages network traffic. Disk Cleanup frees up space by removing temporary files. NTFS Permissions help control access locally or in a domain environment, but removable drives can still be accessed outside that environment without encryption.",
      "examTip": "BitLocker To Go integrates seamlessly for removable media encryption. Regular BitLocker is intended for fixed OS drives."
    },
    {
      "id": 53,
      "question": "A technician wants to run a diagnostic tool automatically every time Windows starts, but only for one specific user. Which approach is BEST?",
      "options": [
        "Place a shortcut to the tool in the Startup folder of that user’s Start Menu",
        "Enable automatic login for the Administrator account",
        "Modify advanced startup options in System Configuration (msconfig)",
        "Create a GPO at the domain level to launch the tool"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Placing a shortcut in the user’s Startup folder is correct because it will only launch after that user logs in. Enabling automatic login for the Administrator account is a separate approach and not secure. Modifying advanced startup options in msconfig affects all users on that computer. Creating a GPO at the domain level affects more than just one user unless specifically filtered, and it’s more complex than needed for a single user’s personal startup item.",
      "examTip": "Remember, the Startup folder approach is local to the user profile, ensuring only that user triggers the software on login, not system-wide."
    },
    {
      "id": 54,
      "question": "Which of the following is considered a BEST practice for handling user data when performing a Windows OS upgrade?",
      "options": [
        "Delete user data first to ensure a clean install",
        "Use a backup tool or migration utility to preserve personal files",
        "Rely on the OS upgrade process alone to transfer all data",
        "Disable System Restore before starting"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Using a backup tool or migration utility to preserve personal files is correct because it ensures data safety during the upgrade. Deleting user data is counterproductive unless doing a totally clean install (and the user is aware). Relying solely on the OS upgrade’s built-in process can be risky if errors occur. Disabling System Restore before starting is typically part of malware removal, not a best practice for OS upgrades.",
      "examTip": "Always back up critical data before an upgrade, even if you plan an in-place upgrade. Unexpected issues can arise, so a reliable backup is essential."
    },
    {
      "id": 55,
      "question": "Which of the following backup types will reset the archive bit after copying only the files that changed since the last backup of any kind?",
      "options": [
        "Full backup",
        "Differential backup",
        "Incremental backup",
        "Snapshot backup"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Incremental backup is correct because it includes files changed since the last backup—whether full or incremental—and then clears the archive bit. A full backup copies all data and resets the bit. A differential backup does not reset the bit; it copies changes since the last full backup. A snapshot backup is a point-in-time image of a system or volume, conceptually different from the typical incremental approach.",
      "examTip": "Remember: incrementals build on each other from the last backup (any type), while differentials only reference the last full backup."
    },
    {
      "id": 56,
      "question": "A technician is assisting a user who regularly stands up from their desk and forgets to lock their Windows workstation. Which Windows feature can help enforce an automatic lockout after a certain period of inactivity?",
      "options": [
        "Automatic Repair",
        "Task Manager Startup",
        "Local Security Policy > Screen saver timeout",
        "Windows Update scheduling"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Local Security Policy > Screen saver timeout is correct because it ensures the system locks after the specified inactivity period, prompting for a password on resume. Automatic Repair fixes boot and startup issues, not user session timeouts. Task Manager Startup deals with applications that launch when Windows boots. Windows Update scheduling manages the timing of updates, not workstation lockouts.",
      "examTip": "Use a password-protected screen saver with a short timeout to automatically secure an unattended workstation, reducing the risk of unauthorized access."
    },
    {
      "id": 57,
      "question": "A user opens a suspicious email attachment, and their browser subsequently opens multiple unwanted tabs with ads. They suspect malware. According to best practices, which step should be taken FIRST?",
      "options": [
        "Disconnect the computer from the network",
        "Reinstall the operating system immediately",
        "Perform a full disk wipe",
        "Replace the computer’s hard drive"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Disconnecting the computer from the network is correct because it prevents the spread of any malware to other machines and stops additional malicious downloads. Reinstalling the operating system immediately is premature; proper identification and scanning should occur first. A full disk wipe is an extreme step typically performed only if other remediation attempts fail. Replacing the hard drive is not necessary unless the drive is damaged or cannot be effectively cleaned of malware.",
      "examTip": "Isolate first, then remediate. If malware is suspected, protect the rest of the network by removing the infected system from any wired or wireless connections."
    },
    {
      "id": 58,
      "question": "Which built-in Windows tool allows you to add, remove, and configure printers on a local system?",
      "options": [
        "Devices and Printers",
        "Internet Options",
        "Resource Monitor",
        "Disk Management"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Devices and Printers is correct because it provides a centralized interface to manage printer installations and settings. Internet Options only deals with browser and internet configurations. Resource Monitor shows real-time CPU, memory, and disk usage. Disk Management handles partitions and volumes, not printer management.",
      "examTip": "For quick printer setup on Windows, Devices and Printers is your go-to. You can add local or network printers and tweak print preferences here."
    },
    {
      "id": 59,
      "question": "A user encounters an error stating the Master Boot Record (MBR) is corrupted. Which of the following tools in Windows Recovery Environment can help repair the MBR?",
      "options": [
        "bootrec /fixmbr",
        "format C:",
        "ipconfig /release",
        "chkdsk /r"
      ],
      "correctAnswerIndex": 0,
      "explanation": "bootrec /fixmbr is correct because it specifically repairs a damaged master boot record. The format C: command wipes the partition, which is not ideal if you intend to preserve data. ipconfig /release manages IP addresses and is unrelated to boot sectors. chkdsk /r checks for disk errors and bad sectors but does not fix the MBR specifically.",
      "examTip": "Bootrec is key for fixing Windows bootloader problems: /fixmbr fixes the MBR, /fixboot fixes the boot sector, and /rebuildbcd can rebuild the boot configuration data."
    },
    {
      "id": 60,
      "question": "A technician needs to ensure that user data is protected on a removable hard drive in case it is lost. Which Windows technology is BEST suited for encrypting removable drives?",
      "options": [
        "Windows Firewall",
        "Disk Cleanup",
        "BitLocker To Go",
        "NTFS Permissions"
      ],
      "correctAnswerIndex": 2,
      "explanation": "BitLocker To Go is correct because it encrypts removable drives, ensuring data is unreadable if lost or stolen. Windows Firewall only manages network traffic. Disk Cleanup frees up space by removing temporary files. NTFS Permissions help control access locally or in a domain environment, but removable drives can still be accessed outside that environment without encryption.",
      "examTip": "BitLocker To Go integrates seamlessly for removable media encryption. Regular BitLocker is intended for fixed OS drives."
    },
    {
      "id": 61,
      "question": "On a macOS system, where are user passwords and certificates MOST commonly stored for secure access?",
      "options": [
        "Spotlight",
        "Finder",
        "Terminal",
        "Keychain"
      ],
      "correctAnswerIndex": 3,
      "explanation": "Keychain is correct because it safely stores passwords, certificates, and other sensitive credentials in macOS. Spotlight is a system-wide search utility, not a credential store. Finder is the file management interface. Terminal is the command-line environment, not a place for storing passwords by default.",
      "examTip": "macOS Keychain is like a built-in password vault. It also integrates with Safari for website logins and supports certificate storage for applications."
    },
    {
      "id": 62,
      "question": "A user wants to protect their smartphone from unauthorized physical access. Which of the following methods provides the MOST secure lock screen?",
      "options": [
        "Face recognition or fingerprint lock",
        "A simple 4-digit PIN",
        "A pattern lock with only three moves",
        "No lock screen at all"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Face recognition or fingerprint lock is correct because biometrics add a strong layer of security that is more difficult to replicate compared to a short PIN or simple pattern. A simple 4-digit PIN is less secure because it has fewer combinations and can be more easily guessed. A three-move pattern lock is even easier to shoulder surf or guess. Having no lock screen leaves the phone entirely unprotected.",
      "examTip": "Biometrics, especially modern face/fingerprint systems, offer quick convenience and robust security. Always combine them with a strong fallback passcode."
    },
    {
      "id": 63,
      "question": "A user's Windows 10 PC keeps crashing with memory-related errors. Which built-in diagnostic tool is BEST to check for faulty RAM modules?",
      "options": [
        "Disk Defragmenter",
        "Windows Memory Diagnostic",
        "chkdsk /f",
        "System Information (msinfo32)"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Memory Diagnostic is correct because it runs tests on RAM at reboot to detect memory issues. Disk Defragmenter optimizes hard drive data placement but doesn’t test RAM. chkdsk /f checks for file system and disk errors, not RAM errors. System Information only displays hardware and OS information; it doesn’t diagnose faulty components.",
      "examTip": "If you suspect bad RAM, run Windows Memory Diagnostic or third-party tools like MemTest86. Persistent crashes can often be tied to memory failures."
    },
    {
      "id": 64,
      "question": "Which of the following physical security measures helps prevent tailgating attacks in a secure building?",
      "options": [
        "Biometric logins on each computer",
        "A firewall configured with strict rules",
        "An access control vestibule (mantrap)",
        "Auto-locking screen savers"
      ],
      "correctAnswerIndex": 2,
      "explanation": "An access control vestibule (mantrap) is correct because it uses two interlocking doors, restricting entry to one person at a time, thus preventing unauthorized individuals from following someone in. Biometric logins on each computer protect digital access, not physical entry. A firewall with strict rules secures network traffic, not building entrances. Auto-locking screen savers prevent unauthorized computer access when users step away, but do not stop physical tailgating.",
      "examTip": "Tailgating is a social engineering trick of slipping into a restricted area behind an authorized person. Physical barriers like mantraps are highly effective in countering it."
    },
    {
      "id": 65,
      "question": "A small business wants to implement a reliable data backup strategy ensuring multiple recovery points, multiple copies of data, and an off-site backup. Which principle BEST describes this approach?",
      "options": [
        "Incremental-only backups",
        "3-2-1 backup rule",
        "Single full backup per month",
        "Auto-sync to a personal flash drive"
      ],
      "correctAnswerIndex": 1,
      "explanation": "The 3-2-1 backup rule is correct because it states you should keep at least three copies of your data, stored on two different media, with one copy off-site. Incremental-only backups do not inherently ensure off-site storage or multiple forms of media. A single full backup per month leaves data at risk for the rest of the month. Auto-sync to one personal flash drive is not robust enough if that single drive is lost or damaged.",
      "examTip": "Following the 3-2-1 principle significantly reduces the risk of data loss. Diversify backup media and locations for maximum resilience."
    },
    {
      "id": 66,
      "question": "A technician is disposing of a client's old printer that may still contain stored documents. Which is the BEST practice to ensure data privacy during disposal?",
      "options": [
        "Wipe down the exterior with isopropyl alcohol",
        "Remove and wipe any internal storage or hard drive",
        "Donate the printer to a local thrift store",
        "Simply power off the device before discarding"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Removing and wiping any internal storage or hard drive is correct because some printers store recent print jobs or address book data on internal memory. Wiping the exterior cleans only the surface and does not address data retention. Donating the printer is not safe without data removal. Simply powering off does nothing to protect stored data.",
      "examTip": "Printers, copiers, and multifunction devices may store documents locally. Erase or destroy internal storage to secure sensitive information before disposal."
    },
    {
      "id": 67,
      "question": "Which of the following is NOT typically part of a well-structured change-management process?",
      "options": [
        "Testing proposed changes in a sandbox environment",
        "Obtaining proper approvals before implementing the change",
        "Having a documented rollback plan if changes fail",
        "Implementing emergency changes without documentation"
      ],
      "correctAnswerIndex": 3,
      "explanation": "Implementing emergency changes without documentation is NOT typically part of best practices, as every change should still be documented even if it’s urgent. Testing changes in a sandbox, obtaining approvals, and planning rollbacks are standard steps in change-management. Lack of documentation can lead to confusion and untraceable issues later.",
      "examTip": "Even emergency fixes should be logged. Documentation ensures accountability, rollback strategies, and knowledge transfer, preventing repeated mistakes."
    },
    {
      "id": 68,
      "question": "A user with a Windows laptop complains the built-in speakers produce no sound, but headphones work fine. Which is the BEST initial troubleshooting step?",
      "options": [
        "Perform a factory reset on the operating system",
        "Replace the motherboard",
        "Check the default playback device in Sound settings",
        "Increase the processor speed in BIOS"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Checking the default playback device in Sound settings is correct because the system may still be routing audio to headphones or a disabled device. A factory reset is too drastic for an initial step. Replacing the motherboard is rarely the first step unless a thorough diagnosis confirms it. Increasing CPU speed in BIOS will not fix sound routing issues.",
      "examTip": "When sound issues arise, always verify the selected audio output device first. Windows may keep sending audio to a disconnected or muted device."
    },
    {
      "id": 69,
      "question": "Which of the following backup types will reset the archive bit after copying only the files that changed since the last backup of any kind?",
      "options": [
        "Full backup",
        "Differential backup",
        "Incremental backup",
        "Snapshot backup"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Incremental backup is correct because it includes files changed since the last backup—whether full or incremental—and then clears the archive bit. A full backup copies all data and resets the bit. A differential backup does not reset the bit; it copies changes since the last full backup. A snapshot backup is a point-in-time image of a system or volume, conceptually different from the typical incremental approach.",
      "examTip": "Remember: incrementals build on each other from the last backup (any type), while differentials only reference the last full backup."
    },
    {
      "id": 70,
      "question": "A technician is tasked with giving a user remote support via text-based commands in a secure manner. Which protocol is MOST appropriate if the target system is a Linux machine?",
      "options": [
        "Remote Desktop Protocol (RDP)",
        "Telnet",
        "SSH",
        "FTP"
      ],
      "correctAnswerIndex": 2,
      "explanation": "SSH is correct because it provides encrypted text-based remote terminal access to Linux systems. RDP is graphical and primarily for Windows. Telnet is unencrypted and insecure. FTP is for file transfers, not interactive shell sessions.",
      "examTip": "When dealing with remote command-line access on Linux or other Unix-like systems, SSH is the standard for secure communication, unlike Telnet which sends data in plain text."
    },
    {
      "id": 71,
      "question": "A user downloads a productivity program from an unknown website and sees a 'publisher cannot be verified' warning. Which of the following is the BEST action to ensure safety before installing?",
      "options": [
        "Cancel the installation and locate a trusted source",
        "Disable antivirus to avoid false positives",
        "Proceed with the installation without caution",
        "Install the software in Safe Mode"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Cancel the installation and locate a trusted source is correct because unknown or unverified publishers pose a high risk of malware. Disabling antivirus is extremely risky and potentially exposes the system further. Blindly proceeding is unsafe. Installing in Safe Mode does not guarantee safety from malicious code; it only limits system drivers, not the potential threat from the software itself.",
      "examTip": "Always verify software from a reputable source or publisher. A “cannot be verified” message is a strong red flag for potential malicious or tampered software."
    },
    {
      "id": 72,
      "question": "A technician is attempting to connect a user’s laptop to a domain, but the option is missing under System > About. Which Windows edition is the user MOST likely running?",
      "options": [
        "Windows 10 Home",
        "Windows 10 Pro",
        "Windows 10 Enterprise",
        "Windows 10 Education"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Windows 10 Home is correct because it does not have the option to join a domain. Windows 10 Pro, Enterprise, and Education all include domain join functionality. If the domain join option is absent, it strongly indicates the Home edition.",
      "examTip": "Windows domain features require Pro, Enterprise, or Education editions. Home editions lack domain join capability unless upgraded."
    },
    {
      "id": 73,
      "question": "A user calls the help desk complaining that all their internet browsers show 'Certificate Not Trusted' errors for most websites. Which is the MOST likely root cause?",
      "options": [
        "Local firewall blocking secure traffic",
        "Incorrect system date and time",
        "Malware actively removing certificates",
        "DNS server is not responding"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Incorrect system date and time is correct because certificates rely on valid dates for trust validation. If the date/time is far off, browsers reject certificates. A local firewall blocking secure traffic would typically result in connection timeouts, not trust errors. Malware could remove certificates, but widespread immediate errors across many sites typically indicate a date/time issue. A DNS server not responding leads to inability to resolve hostnames, not certificate trust failures.",
      "examTip": "Always check system clock accuracy when facing widespread SSL certificate trust issues. Certificates are time-sensitive and break if the clock drifts too much."
    },
    {
      "id": 74,
      "question": "A user discovers that their laptop's battery drains too quickly even when idle. Which of the following settings would MOST likely help conserve battery power?",
      "options": [
        "Enable 3D screen savers",
        "Set the display brightness to maximum",
        "Use the Balanced or Power Saver power plan",
        "Disable all sleep modes"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Using the Balanced or Power Saver power plan is correct because these modes adjust CPU performance, screen brightness, and other factors to conserve energy. Enabling 3D screen savers consumes more battery. Setting display brightness to maximum reduces battery life. Disabling all sleep modes would keep the system fully active, draining the battery faster.",
      "examTip": "Power-saving modes automatically lower resource usage when possible. This is crucial on laptops for extending battery life without major performance sacrifices."
    },
    {
      "id": 75,
      "question": "A manager wants to connect to an internal web server using SSH from home. Which port must be open on the firewall to allow an SSH connection inbound to that server by default?",
      "options": [
        "TCP 22",
        "TCP 443",
        "TCP 25",
        "TCP 3389"
      ],
      "correctAnswerIndex": 0,
      "explanation": "TCP 22 is correct because SSH uses port 22 for secure remote connections. TCP 443 is for HTTPS. TCP 25 is for SMTP email transmissions. TCP 3389 is for RDP (Remote Desktop Protocol).",
      "examTip": "Remember core ports: SSH is 22, RDP is 3389, HTTPS is 443, and SMTP (simple mail transfer) is 25."
    },
    {
      "id": 76,
      "question": "A technician is attempting to connect a user’s laptop to a domain, but the option is missing under System > About. Which Windows edition is the user MOST likely running?",
      "options": [
        "Windows 10 Home",
        "Windows 10 Pro",
        "Windows 10 Enterprise",
        "Windows 10 Education"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Windows 10 Home is correct because it does not have the option to join a domain. Windows 10 Pro, Enterprise, and Education all include domain join functionality. If the domain join option is absent, it strongly indicates the Home edition.",
      "examTip": "Windows domain features require Pro, Enterprise, or Education editions. Home editions lack domain join capability unless upgraded."
    }
  ]
});



db.tests.insertOne({
  "category": "aplus2",
  "testId": 2,
  "testName": "A+ Practice Test #2 (Very Easy)",
  "xpPerCorrect": 10,
  "questions": [
    {
      "id": 77,
      "question": "A user downloads a productivity program from an unknown website and sees a 'publisher cannot be verified' warning. Which of the following is the BEST action to ensure safety before installing?",
      "options": [
        "Cancel the installation and locate a trusted source",
        "Disable antivirus to avoid false positives",
        "Proceed with the installation without caution",
        "Install the software in Safe Mode"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Cancel the installation and locate a trusted source is correct because unknown or unverified publishers pose a high risk of malware. Disabling antivirus is extremely risky and potentially exposes the system further. Blindly proceeding is unsafe. Installing in Safe Mode does not guarantee safety from malicious code; it only limits system drivers, not the potential threat from the software itself.",
      "examTip": "Always verify software from a reputable source or publisher. A “cannot be verified” message is a strong red flag for potential malicious or tampered software."
    },
    {
      "id": 78,
      "question": "A technician is attempting to connect a user’s laptop to a domain, but the option is missing under System > About. Which Windows edition is the user MOST likely running?",
      "options": [
        "Windows 10 Home",
        "Windows 10 Pro",
        "Windows 10 Enterprise",
        "Windows 10 Education"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Windows 10 Home is correct because it does not have the option to join a domain. Windows 10 Pro, Enterprise, and Education all include domain join functionality. If the domain join option is absent, it strongly indicates the Home edition.",
      "examTip": "Windows domain features require Pro, Enterprise, or Education editions. Home editions lack domain join capability unless upgraded."
    },
    {
      "id": 79,
      "question": "A user calls the help desk complaining that all their internet browsers show 'Certificate Not Trusted' errors for most websites. Which is the MOST likely root cause?",
      "options": [
        "Local firewall blocking secure traffic",
        "Incorrect system date and time",
        "Malware actively removing certificates",
        "DNS server is not responding"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Incorrect system date and time is correct because certificates rely on valid dates for trust validation. If the date/time is far off, browsers reject certificates. A local firewall blocking secure traffic would typically result in connection timeouts, not trust errors. Malware could remove certificates, but widespread immediate errors across many sites typically indicate a date/time issue. A DNS server not responding leads to inability to resolve hostnames, not certificate trust failures.",
      "examTip": "Always check system clock accuracy when facing widespread SSL certificate trust issues. Certificates are time-sensitive and break if the clock drifts too much."
    },
    {
      "id": 80,
      "question": "A user's Windows 10 PC keeps crashing with memory-related errors. Which built-in diagnostic tool is BEST to check for faulty RAM modules?",
      "options": [
        "Disk Defragmenter",
        "Windows Memory Diagnostic",
        "chkdsk /f",
        "System Information (msinfo32)"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Memory Diagnostic is correct because it runs tests on RAM at reboot to detect memory issues. Disk Defragmenter optimizes hard drive data placement but doesn’t test RAM. chkdsk /f checks for file system and disk errors, not RAM errors. System Information only displays hardware and OS information; it doesn’t diagnose faulty components.",
      "examTip": "If you suspect bad RAM, run Windows Memory Diagnostic or third-party tools like MemTest86. Persistent crashes can often be tied to memory failures."
    },
    {
      "id": 81,
      "question": "A technician needs to set a system-wide environment variable in Windows. Which location in the Control Panel is BEST for editing environment variables?",
      "options": [
        "System > Advanced system settings",
        "Network and Sharing Center > Adapter Settings",
        "Programs and Features > Windows Features",
        "Ease of Access > Keyboard Settings"
      ],
      "correctAnswerIndex": 0,
      "explanation": "System > Advanced system settings is correct because that section contains the Environment Variables button, letting you define system and user variables. Network and Sharing Center is for network-related options. Programs and Features is for installing or uninstalling software. Ease of Access adjusts accessibility settings, not environment variables.",
      "examTip": "Environment variables affect processes and can be set at the system or user level. Access them via System Properties for Windows or with commands like setx in a terminal."
    },
    {
      "id": 82,
      "question": "A technician wishes to ensure that all laptops in a small office apply the same Windows Updates at the same time without manually initiating each update. Which Windows technology facilitates this for a centralized approach?",
      "options": [
        "Group Policy loopback",
        "Windows Server Update Services (WSUS)",
        "Windows Defender Application Guard",
        "Network and Sharing Center"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Server Update Services (WSUS) is correct because it centrally manages and deploys updates to Windows clients within a domain. Group Policy loopback merges user policies under certain conditions but does not handle Windows Updates specifically. Windows Defender Application Guard is about sandboxing the browser, not deploying updates. Network and Sharing Center manages network connections, not update distribution.",
      "examTip": "WSUS is commonly used in corporate environments for controlled rollout of patches, ensuring all machines receive approved updates consistently and on schedule."
    },
    {
      "id": 83,
      "question": "A user opens a suspicious email attachment, and their browser subsequently opens multiple unwanted tabs with ads. They suspect malware. According to best practices, which step should be taken FIRST?",
      "options": [
        "Disconnect the computer from the network",
        "Reinstall the operating system immediately",
        "Perform a full disk wipe",
        "Replace the computer’s hard drive"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Disconnecting the computer from the network is correct because it prevents the spread of any malware to other machines and stops additional malicious downloads. Reinstalling the operating system immediately is premature; proper identification and scanning should occur first. A full disk wipe is an extreme step typically performed only if other remediation attempts fail. Replacing the hard drive is not necessary unless the drive is damaged or cannot be effectively cleaned of malware.",
      "examTip": "Isolate first, then remediate. If malware is suspected, protect the rest of the network by removing the infected system from any wired or wireless connections."
    },
    {
      "id": 84,
      "question": "Which built-in Windows tool allows you to add, remove, and configure printers on a local system?",
      "options": [
        "Devices and Printers",
        "Internet Options",
        "Resource Monitor",
        "Disk Management"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Devices and Printers is correct because it provides a centralized interface to manage printer installations and settings. Internet Options only deals with browser and internet configurations. Resource Monitor shows real-time CPU, memory, and disk usage. Disk Management handles partitions and volumes, not printer management.",
      "examTip": "For quick printer setup on Windows, Devices and Printers is your go-to. You can add local or network printers and tweak print preferences here."
    },
    {
      "id": 85,
      "question": "A user encounters an error stating the Master Boot Record (MBR) is corrupted. Which of the following tools in Windows Recovery Environment can help repair the MBR?",
      "options": [
        "bootrec /fixmbr",
        "format C:",
        "ipconfig /release",
        "chkdsk /r"
      ],
      "correctAnswerIndex": 0,
      "explanation": "bootrec /fixmbr is correct because it specifically repairs a damaged master boot record. The format C: command wipes the partition, which is not ideal if you intend to preserve data. ipconfig /release manages IP addresses and is unrelated to boot sectors. chkdsk /r checks for disk errors and bad sectors but does not fix the MBR specifically.",
      "examTip": "Bootrec is key for fixing Windows bootloader problems: /fixmbr fixes the MBR, /fixboot fixes the boot sector, and /rebuildbcd can rebuild the boot configuration data."
    },
    {
      "id": 86,
      "question": "A technician needs to ensure that user data is protected on a removable hard drive in case it is lost. Which Windows technology is BEST suited for encrypting removable drives?",
      "options": [
        "Windows Firewall",
        "Disk Cleanup",
        "BitLocker To Go",
        "NTFS Permissions"
      ],
      "correctAnswerIndex": 2,
      "explanation": "BitLocker To Go is correct because it encrypts removable drives, ensuring data is unreadable if lost or stolen. Windows Firewall only manages network traffic. Disk Cleanup frees up space by removing temporary files. NTFS Permissions help control access locally or in a domain environment, but removable drives can still be accessed outside that environment without encryption.",
      "examTip": "BitLocker To Go integrates seamlessly for removable media encryption. Regular BitLocker is intended for fixed OS drives."
    },
    {
      "id": 87,
      "question": "A technician wants to run a diagnostic tool automatically every time Windows starts, but only for one specific user. Which approach is BEST?",
      "options": [
        "Place a shortcut to the tool in the Startup folder of that user’s Start Menu",
        "Enable automatic login for the Administrator account",
        "Modify advanced startup options in System Configuration (msconfig)",
        "Create a GPO at the domain level to launch the tool"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Placing a shortcut in the user’s Startup folder is correct because it will only launch after that user logs in. Enabling automatic login for the Administrator account is a separate approach and not secure. Modifying advanced startup options in msconfig affects all users on that computer. Creating a GPO at the domain level affects more than just one user unless specifically filtered, and it’s more complex than needed for a single user’s personal startup item.",
      "examTip": "Remember, the Startup folder approach is local to the user profile, ensuring only that user triggers the software on login, not system-wide."
    },
    {
      "id": 88,
      "question": "Which of the following is considered a BEST practice for handling user data when performing a Windows OS upgrade?",
      "options": [
        "Delete user data first to ensure a clean install",
        "Use a backup tool or migration utility to preserve personal files",
        "Rely on the OS upgrade process alone to transfer all data",
        "Disable System Restore before starting"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Using a backup tool or migration utility to preserve personal files is correct because it ensures data safety during the upgrade. Deleting user data is counterproductive unless doing a totally clean install (and the user is aware). Relying solely on the OS upgrade’s built-in process can be risky if errors occur. Disabling System Restore before starting is typically part of malware removal, not a best practice for OS upgrades.",
      "examTip": "Always back up critical data before an upgrade, even if you plan an in-place upgrade. Unexpected issues can arise, so a reliable backup is essential."
    },
    {
      "id": 89,
      "question": "Which of the following backup types will reset the archive bit after copying only the files that changed since the last backup of any kind?",
      "options": [
        "Full backup",
        "Differential backup",
        "Incremental backup",
        "Snapshot backup"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Incremental backup is correct because it includes files changed since the last backup—whether full or incremental—and then clears the archive bit. A full backup copies all data and resets the bit. A differential backup does not reset the bit; it copies changes since the last full backup. A snapshot backup is a point-in-time image of a system or volume, conceptually different from the typical incremental approach.",
      "examTip": "Remember: incrementals build on each other from the last backup (any type), while differentials only reference the last full backup."
    },
    {
      "id": 90,
      "question": "A technician is tasked with giving a user remote support via text-based commands in a secure manner. Which protocol is MOST appropriate if the target system is a Linux machine?",
      "options": [
        "Remote Desktop Protocol (RDP)",
        "Telnet",
        "SSH",
        "FTP"
      ],
      "correctAnswerIndex": 2,
      "explanation": "SSH is correct because it provides encrypted text-based remote terminal access to Linux systems. RDP is graphical and primarily for Windows. Telnet is unencrypted and insecure. FTP is for file transfers, not interactive shell sessions.",
      "examTip": "When dealing with remote command-line access on Linux or other Unix-like systems, SSH is the standard for secure communication, unlike Telnet which sends data in plain text."
    },
    {
      "id": 91,
      "question": "A user downloads a productivity program from an unknown website and sees a 'publisher cannot be verified' warning. Which of the following is the BEST action to ensure safety before installing?",
      "options": [
        "Cancel the installation and locate a trusted source",
        "Disable antivirus to avoid false positives",
        "Proceed with the installation without caution",
        "Install the software in Safe Mode"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Cancel the installation and locate a trusted source is correct because unknown or unverified publishers pose a high risk of malware. Disabling antivirus is extremely risky and potentially exposes the system further. Blindly proceeding is unsafe. Installing in Safe Mode does not guarantee safety from malicious code; it only limits system drivers, not the potential threat from the software itself.",
      "examTip": "Always verify software from a reputable source or publisher. A “cannot be verified” message is a strong red flag for potential malicious or tampered software."
    },
    {
      "id": 92,
      "question": "A technician is attempting to connect a user’s laptop to a domain, but the option is missing under System > About. Which Windows edition is the user MOST likely running?",
      "options": [
        "Windows 10 Home",
        "Windows 10 Pro",
        "Windows 10 Enterprise",
        "Windows 10 Education"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Windows 10 Home is correct because it does not have the option to join a domain. Windows 10 Pro, Enterprise, and Education all include domain join functionality. If the domain join option is absent, it strongly indicates the Home edition.",
      "examTip": "Windows domain features require Pro, Enterprise, or Education editions. Home editions lack domain join capability unless upgraded."
    },
    {
      "id": 93,
      "question": "A user calls the help desk complaining that all their internet browsers show 'Certificate Not Trusted' errors for most websites. Which is the MOST likely root cause?",
      "options": [
        "Local firewall blocking secure traffic",
        "Incorrect system date and time",
        "Malware actively removing certificates",
        "DNS server is not responding"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Incorrect system date and time is correct because certificates rely on valid dates for trust validation. If the date/time is far off, browsers reject certificates. A local firewall blocking secure traffic would typically result in connection timeouts, not trust errors. Malware could remove certificates, but widespread immediate errors across many sites typically indicate a date/time issue. A DNS server not responding leads to inability to resolve hostnames, not certificate trust failures.",
      "examTip": "Always check system clock accuracy when facing widespread SSL certificate trust issues. Certificates are time-sensitive and break if the clock drifts too much."
    },
    {
      "id": 94,
      "question": "A user's Windows 10 PC keeps crashing with memory-related errors. Which built-in diagnostic tool is BEST to check for faulty RAM modules?",
      "options": [
        "Disk Defragmenter",
        "Windows Memory Diagnostic",
        "chkdsk /f",
        "System Information (msinfo32)"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Memory Diagnostic is correct because it runs tests on RAM at reboot to detect memory issues. Disk Defragmenter optimizes hard drive data placement but doesn’t test RAM. chkdsk /f checks for file system and disk errors, not RAM errors. System Information only displays hardware and OS information; it doesn’t diagnose faulty components.",
      "examTip": "If you suspect bad RAM, run Windows Memory Diagnostic or third-party tools like MemTest86. Persistent crashes can often be tied to memory failures."
    },
    {
      "id": 95,
      "question": "A technician needs to set a system-wide environment variable in Windows. Which location in the Control Panel is BEST for editing environment variables?",
      "options": [
        "System > Advanced system settings",
        "Network and Sharing Center > Adapter Settings",
        "Programs and Features > Windows Features",
        "Ease of Access > Keyboard Settings"
      ],
      "correctAnswerIndex": 0,
      "explanation": "System > Advanced system settings is correct because that section contains the Environment Variables button, letting you define system and user variables. Network and Sharing Center is for network-related options. Programs and Features is for installing or uninstalling software. Ease of Access adjusts accessibility settings, not environment variables.",
      "examTip": "Environment variables affect processes and can be set at the system or user level. Access them via System Properties for Windows or with commands like setx in a terminal."
    },
    {
      "id": 96,
      "question": "A technician wishes to ensure that all laptops in a small office apply the same Windows Updates at the same time without manually initiating each update. Which Windows technology facilitates this for a centralized approach?",
      "options": [
        "Group Policy loopback",
        "Windows Server Update Services (WSUS)",
        "Windows Defender Application Guard",
        "Network and Sharing Center"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Server Update Services (WSUS) is correct because it centrally manages and deploys updates to Windows clients within a domain. Group Policy loopback merges user policies under certain conditions but does not handle Windows Updates specifically. Windows Defender Application Guard is about sandboxing the browser, not deploying updates. Network and Sharing Center manages network connections, not update distribution.",
      "examTip": "WSUS is commonly used in corporate environments for controlled rollout of patches, ensuring all machines receive approved updates consistently and on schedule."
    },
    {
      "id": 97,
      "question": "A user opens a suspicious email attachment, and their browser subsequently opens multiple unwanted tabs with ads. They suspect malware. According to best practices, which step should be taken FIRST?",
      "options": [
        "Disconnect the computer from the network",
        "Reinstall the operating system immediately",
        "Perform a full disk wipe",
        "Replace the computer’s hard drive"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Disconnecting the computer from the network is correct because it prevents the spread of any malware to other machines and stops additional malicious downloads. Reinstalling the operating system immediately is premature; proper identification and scanning should occur first. A full disk wipe is an extreme step typically performed only if other remediation attempts fail. Replacing the hard drive is not necessary unless the drive is damaged or cannot be effectively cleaned of malware.",
      "examTip": "Isolate first, then remediate. If malware is suspected, protect the rest of the network by removing the infected system from any wired or wireless connections."
    },
    {
      "id": 98,
      "question": "Which built-in Windows tool allows you to add, remove, and configure printers on a local system?",
      "options": [
        "Devices and Printers",
        "Internet Options",
        "Resource Monitor",
        "Disk Management"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Devices and Printers is correct because it provides a centralized interface to manage printer installations and settings. Internet Options only deals with browser and internet configurations. Resource Monitor shows real-time CPU, memory, and disk usage. Disk Management handles partitions and volumes, not printer management.",
      "examTip": "For quick printer setup on Windows, Devices and Printers is your go-to. You can add local or network printers and tweak print preferences here."
    },
    {
      "id": 99,
      "question": "A user encounters an error stating the Master Boot Record (MBR) is corrupted. Which of the following tools in Windows Recovery Environment can help repair the MBR?",
      "options": [
        "bootrec /fixmbr",
        "format C:",
        "ipconfig /release",
        "chkdsk /r"
      ],
      "correctAnswerIndex": 0,
      "explanation": "bootrec /fixmbr is correct because it specifically repairs a damaged master boot record. The format C: command wipes the partition, which is not ideal if you intend to preserve data. ipconfig /release manages IP addresses and is unrelated to boot sectors. chkdsk /r checks for disk errors and bad sectors but does not fix the MBR specifically.",
      "examTip": "Bootrec is key for fixing Windows bootloader problems: /fixmbr fixes the MBR, /fixboot fixes the boot sector, and /rebuildbcd can rebuild the boot configuration data."
    },
    {
      "id": 100,
      "question": "A technician is assisting a user who regularly stands up from their desk and forgets to lock their Windows workstation. Which Windows feature can help enforce an automatic lockout after a certain period of inactivity?",
      "options": [
        "Automatic Repair",
        "Task Manager Startup",
        "Local Security Policy > Screen saver timeout",
        "Windows Update scheduling"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Local Security Policy > Screen saver timeout is correct because it ensures the system locks after the specified inactivity period, prompting for a password on resume. Automatic Repair fixes boot and startup issues, not user session timeouts. Task Manager Startup deals with applications that launch when Windows boots. Windows Update scheduling manages the timing of updates, not workstation lockouts.",
      "examTip": "Use a password-protected screen saver with a short timeout to automatically secure an unattended workstation, reducing the risk of unauthorized access."
    }
  ]
});










   
