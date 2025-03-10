db.tests.insertOne({
  "category": "aplus2",
  "testId": 2,
  "testName": "A+ Core 2 Practice Test #2 (Very Easy)",
  "xpPerCorrect": 10,
  "questions": [
    {
      "id": 1,
      "question": "Which Windows tool can be used to manage startup applications and boot processes for troubleshooting purposes?",
      "options": [
        "Event Viewer, which displays detailed system logs and error reports",
        "Device Manager, for managing hardware devices and their drivers",
        "System Configuration (msconfig), for managing boot and startup settings",
        "Disk Management, used to manage hard drives and their partitions"
      ],
      "correctAnswerIndex": 2,
      "explanation": "System Configuration (msconfig) is correct because it enables you to manage boot options and startup items, making it a primary tool for quick troubleshooting. Event Viewer is incorrect because it only shows system logs and error events; it does not control startup processes. Device Manager is incorrect because it manages device drivers and hardware, not startup items. Disk Management is incorrect because it manages partitions and volumes, not boot or startup entries.",
      "examTip": "Remember msconfig as your first stop for controlling which apps and services launch at boot."
    },
    {
      "id": 2,
      "question": "A user wants to check the version of Windows installed on their PC using a command line. Which command is the MOST straightforward way to obtain this information?",
      "options": [
        "ipconfig /all, a command that displays detailed network configuration",
        "winver, a command that displays the Windows version and build",
        "diskpart, a command-line utility for managing disk partitions",
        "hostname, a command that displays the computer's network name"
      ],
      "correctAnswerIndex": 1,
      "explanation": "winver is correct because running it opens a window displaying the exact Windows version and build number. ipconfig /all is incorrect because it only displays network configuration details. diskpart is incorrect because it is used for disk partitioning tasks and does not provide the Windows version. hostname is incorrect because it only shows the system’s network name, not the OS version.",
      "examTip": "For quick Windows version checks, 'winver' is your best friend—simple, direct, and foolproof."
    },
    {
      "id": 3,
      "question": "Which of the following is a security best practice when creating user passwords in Windows?",
      "options": [
        "Use only lowercase letters to ensure password simplicity and ease of recall",
        "Use a combination of at least 8 characters, including different types",
        "Affix a sticky note with the password to the monitor for easy access",
        "Use one universal password for all accounts to streamline login"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Use at least 8 characters with mixed complexity is correct because strong passwords typically require multiple character types (uppercase, lowercase, numbers, special symbols) to reduce the chance of being easily guessed. Using only letters is incorrect because it reduces password complexity and makes it more vulnerable to attacks. Writing passwords on a sticky note is incorrect because it creates a physical security risk. Using the same password for every account is incorrect because it increases the impact of any single account compromise.",
      "examTip": "Use a mix of uppercase, lowercase, numbers, and symbols—your future self will thank you."
    },
    {
      "id": 4,
      "question": "In Windows, which of the following user accounts has the HIGHEST level of local privileges by default?",
      "options": [
        "Guest user, with highly restricted access to system resources",
        "Power user, with elevated permissions for specific tasks",
        "Administrator, with full control over the local system",
        "Standard user, with limited permissions for daily tasks"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Administrator is correct because it has full local privileges to install software, change system settings, and manage other accounts on the local machine. Guest user is incorrect because it is severely limited and often turned off by default. Power user is incorrect because it does have elevated rights compared to standard users but not as extensive as Administrator. Standard user is incorrect because it has the least privileges and can only perform basic tasks.",
      "examTip": "Reserve that Administrator account for system-level changes—daily tasks should stay on a Standard account."
    },
    {
      "id": 5,
      "question": "A technician needs to configure a laptop so that closing the lid will not put it to sleep. Which Control Panel utility in Windows 10 allows adjusting these settings?",
      "options": [
        "Network and Sharing Center, for configuring network connectivity",
        "Power Options, to manage system power settings and behavior",
        "Ease of Access, for configuring accessibility features",
        "File Explorer Options, to manage file and folder display"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Power Options is correct because it controls how the system manages power, including configuring behavior when closing the lid. Network and Sharing Center is incorrect because it manages network connections and sharing settings. Ease of Access is incorrect because it primarily deals with accessibility features. File Explorer Options is incorrect because it controls how files and folders are displayed and managed, not power behavior.",
      "examTip": "Always check Power Options for controlling sleep, hibernation, and lid-close settings on laptops."
    },
    {
      "id": 6,
      "question": "Which file system is typically used by modern versions of Windows for internal hard drives by default?",
      "options": [
        "FAT32, commonly used for older systems and removable media",
        "NTFS, the standard file system for modern Windows installations",
        "exFAT, designed for flash drives and external storage devices",
        "ext4, a file system commonly used in Linux distributions"
      ],
      "correctAnswerIndex": 1,
      "explanation": "NTFS is correct because it is the default file system for Windows internal drives, offering security permissions and larger file size support. FAT32 is incorrect because it is limited in file size capacity and mostly used for smaller partitions or removable media. exFAT is incorrect because it is mainly designed for flash drives requiring compatibility with both Windows and other devices. ext4 is incorrect because it is a common file system for Linux, not Windows.",
      "examTip": "NTFS is your Windows workhorse, with file-level security and wide capacity—don’t confuse it with FAT32 or exFAT."
    },
    {
      "id": 7,
      "question": "Which of these is a BEST practice to help secure a Windows workstation against unauthorized logins?",
      "options": [
        "Configure the system to automatically log in for user convenience",
        "Require a password upon resuming from a screensaver",
        "Disable password complexity requirements for easier access",
        "Save the login password in a text file on the desktop"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Enabling a password-protected screensaver is correct because it ensures the system locks after a period of inactivity, requiring user authentication to regain access. Using auto-login is incorrect because it bypasses the login prompt, reducing security. Disabling mandatory password complexity is incorrect because it weakens password strength. Storing your password in a text file on the desktop is incorrect because it creates a significant security risk if someone gains access to the computer.",
      "examTip": "Lock your workstation automatically with a password-protected screensaver—simple step, huge security boost."
    },
    {
      "id": 8,
      "question": "A user reports that their Windows system is running extremely slow after a recent software installation. Which built-in tool can they use to see which processes are consuming high CPU or memory?",
      "options": [
        "Task Manager, for monitoring system performance and resource usage",
        "System Configuration (msconfig), for managing startup and boot settings",
        "Windows Defender Firewall, for controlling network traffic",
        "File Explorer Options, for customizing file and folder views"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Task Manager is correct because it allows users to view running processes and monitor CPU, memory, and other resource usage. System Configuration (msconfig) is incorrect because it is more focused on startup programs and boot settings. Windows Defender Firewall is incorrect because it controls inbound/outbound traffic rules, not process resource usage. File Explorer Options is incorrect because it configures how files and folders are displayed, not resource use.",
      "examTip": "When sluggish performance hits, pop open Task Manager and see exactly which process is hogging resources."
    },
    {
      "id": 9,
      "question": "Which of the following is the MOST common method to secure data stored on a USB flash drive in a Windows environment?",
      "options": [
        "Apply Linux-based permissions using chmod 777 on the drive",
        "Encrypt the drive using BitLocker To Go",
        "Format the USB flash drive using the exFAT file system",
        "Activate Windows Firewall to protect the USB drive"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Using BitLocker To Go is correct because it is specifically designed for encrypting data on removable drives such as USB flash drives. Using chmod 777 is incorrect because that is a Linux-based permission command and it would grant wide-open permissions, not secure data. Formatting the drive in exFAT is incorrect because it only addresses file system compatibility, not encryption. Enabling Windows Firewall is incorrect because it filters network traffic, not data storage security.",
      "examTip": "BitLocker To Go is your friend when it comes to encrypting USBs in a Windows ecosystem."
    },
    {
      "id": 10,
      "question": "Which Windows feature allows remote control of a desktop session to assist another user with troubleshooting?",
      "options": [
        "Remote Desktop Connection, for accessing and controlling a remote PC",
        "Task Scheduler, for automating tasks and running scripts",
        "Windows Update, for managing operating system updates",
        "Performance Monitor, for tracking system performance metrics"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Remote Desktop Connection is correct because it enables a user to log into and control another Windows system remotely. Task Scheduler is incorrect because it automates tasks based on triggers and schedules. Windows Update is incorrect because it manages OS updates and patches, not remote sessions. Performance Monitor is incorrect because it is used to track and analyze system performance, not remotely control a session.",
      "examTip": "RD is the key for quick remote fixes—just ensure the service and firewall rules are set up properly."
    },
    {
      "id": 11,
      "question": "Which user group in Windows typically has sufficient privileges to install software but not to manage system-wide security settings?",
      "options": [
        "Administrators, who have complete control over the system",
        "Standard Users, who have limited permissions for daily tasks",
        "Power Users, with permissions to install software and make some changes",
        "Guests, who have highly restricted access to the system"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Power Users is correct because, in some Windows versions, they have higher privileges than Standard Users, such as installing software, but still do not hold full administrative rights. Administrators is incorrect because they can manage every aspect of the system. Standard Users is incorrect because they usually cannot install software system-wide. Guests is incorrect because they have extremely limited privileges and often cannot install software at all.",
      "examTip": "Power Users can do more than a Standard User, but they’re not the same as full-blown Administrators."
    },
    {
      "id": 12,
      "question": "A system frequently displays a 'No Operating System Found' error on boot. Which of the following is the MOST likely initial troubleshooting step for a technician to take?",
      "options": [
        "Immediately reinstall the Windows operating system",
        "Verify hard drive detection within the BIOS/UEFI settings",
        "Replace the motherboard as the likely cause of the error",
        "Disable Fast Boot in the BIOS/UEFI to improve compatibility"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Checking if the hard drive is recognized in the BIOS/UEFI is correct because if the BIOS does not detect the drive, the operating system cannot load, causing this error. Reinstalling Windows immediately is incorrect because it’s a drastic step without confirming hardware detection. Replacing the motherboard is incorrect as an immediate step because it is more drastic and expensive; it should be a last resort after simpler checks. Disabling Fast Boot is incorrect because while it can affect POST checks, it is less likely to cause a complete OS not found issue compared to a missing drive.",
      "examTip": "When BIOS can’t see the drive, the OS can’t load—so always double-check hardware detection first."
    },
    {
      "id": 13,
      "question": "Which of the following is a characteristic of the NTFS file system compared to FAT32?",
      "options": [
        "NTFS is limited to a maximum file size of 4GB",
        "NTFS lacks support for file-level permissions",
        "NTFS offers encryption, compression, and enhanced security features",
        "NTFS is designed exclusively for use with removable USB drives"
      ],
      "correctAnswerIndex": 2,
      "explanation": "NTFS provides encryption and compression features, along with better security capabilities, which is why it is more robust than FAT32. FAT32’s file size limit is 4GB, so the statement that NTFS supports only up to 4GB is incorrect. NTFS absolutely supports file permissions, so saying it does not is incorrect. NTFS is not exclusively for removable USB drives; it is the default for Windows internal drives and can be used on various storage media.",
      "examTip": "NTFS remains Windows’ powerhouse—offering advanced features you just don’t get with FAT32."
    },
    {
      "id": 14,
      "question": "Which Windows feature allows you to schedule regular maintenance tasks like disk defragmentation or running scripts?",
      "options": [
        "Task Scheduler, for automating tasks and running scripts on a schedule",
        "Resource Monitor, for viewing real-time system resource usage",
        "System Information, for displaying hardware and software details",
        "gpedit.msc, for configuring Local Group Policy settings"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Task Scheduler is correct because it lets you automate tasks at specified times or events, such as running scripts or defragging drives. Resource Monitor is incorrect because it displays real-time resource usage, not scheduling. System Information is incorrect because it only shows hardware and software configuration details. gpedit.msc is incorrect because it is the Local Group Policy Editor, primarily used to configure policy settings, not scheduling tasks.",
      "examTip": "Remember to set up tasks in Task Scheduler for hands-off maintenance—your system will thank you."
    },
    {
      "id": 15,
      "question": "A technician wants to limit which programs a certain user can run in Windows. Which built-in feature can achieve this?",
      "options": [
        "Group Policy, for configuring user and computer settings",
        "Disk Cleanup, for removing temporary files and freeing disk space",
        "Event Viewer, for viewing system, application, and security logs",
        "Windows Firewall, for controlling network traffic and connections"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Group Policy is correct because it can be used to implement software restriction policies or AppLocker to limit which applications specific users can run. Disk Cleanup is incorrect because it frees up disk space by removing temporary files. Event Viewer is incorrect because it only logs and reviews system events. Windows Firewall is incorrect because it primarily controls network traffic, not which local programs can run.",
      "examTip": "Lock down user app usage with Group Policy or AppLocker—simple policies, big security gains."
    },
    {
      "id": 16,
      "question": "A technician suspects a malware infection on a user’s PC due to unusual network traffic. Which of the following steps should be done FIRST in accordance with malware removal best practices?",
      "options": [
        "Disable all scheduled backups to prevent potential malware spread",
        "Update anti-malware definitions to ensure the latest threat detection",
        "Enable System Restore points to facilitate rollback if needed",
        "Instruct the user to disregard the unusual network traffic temporarily"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Updating anti-malware software definitions is correct because ensuring you have the latest definitions is crucial before scanning and removing suspected malware. Disabling all scheduled backups is not a typical first step; you might disable System Restore after confirming infection, but not backups. Notifying the user to ignore the issue is dangerous and not part of best practices.",
      "examTip": "Always arm your antivirus with the latest definitions—outdated tools risk missing new threats."
    },
    {
      "id": 17,
      "question": "Which Windows feature allows you to encrypt individual files or folders on an NTFS-formatted drive to protect data at rest?",
      "options": [
        "Group Policy Editor, for managing operating system policies",
        "BitLocker To Go, for encrypting entire removable drives",
        "Encrypting File System (EFS), for file and folder-level encryption",
        "OneDrive Sync, for cloud-based file synchronization and storage"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Encrypting File System (EFS) is correct because it encrypts files or folders at the file system level on NTFS volumes. Group Policy Editor manages OS policies, not direct file encryption. BitLocker To Go is used to encrypt entire removable drives rather than individual files. OneDrive Sync is a cloud-based syncing solution and does not natively encrypt files locally by default.",
      "examTip": "Need file-level protection on NTFS? EFS is your go-to solution—personalized encryption on a per-file basis."
    },
    {
      "id": 18,
      "question": "A user keeps getting a User Account Control prompt whenever they change system settings. Which of the following is the MOST likely reason Windows displays these prompts?",
      "options": [
        "The Windows operating system is installed incorrectly",
        "The user account is part of a Windows domain",
        "UAC is prompting for changes that require elevated permissions",
        "The system's hardware drivers are outdated or corrupted"
      ],
      "correctAnswerIndex": 2,
      "explanation": "UAC is warning about changes requiring elevated privileges is correct because User Account Control is designed to prevent unauthorized modifications by prompting for confirmation. Incorrect Windows installation does not specifically cause UAC prompts. Being on a domain might impose group policies, but it does not directly trigger UAC prompts for system changes. Out-of-date drivers do not generate UAC prompts; they cause other error messages.",
      "examTip": "UAC is that safety net preventing silent system changes—embrace the prompt, don’t just kill it."
    },
    {
      "id": 19,
      "question": "Which Windows 10 edition is MOST likely to include BitLocker for full disk encryption and the ability to join a domain?",
      "options": [
        "Windows 10 Home, designed for basic home user needs",
        "Windows 10 Pro, suitable for small businesses and advanced users",
        "Windows 10 S, a streamlined version focused on security",
        "Windows 10 Education, designed for academic institutions"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows 10 Pro is correct because it supports BitLocker and can join a domain, making it suitable for business environments. Windows 10 Home does not have BitLocker or domain join functionality natively. Windows 10 S is a streamlined version restricted to Microsoft Store apps. Windows 10 Education is similar to Enterprise in some features, but Windows 10 Pro is the more common choice for domain join and BitLocker in standard business deployments.",
      "examTip": "If you need domain join or BitLocker, Windows 10 Pro (or higher) is the must-have edition."
    },
    {
      "id": 20,
      "question": "After upgrading the RAM in a Windows PC, the user notices the OS is still reporting the old memory amount. Which of the following is the MOST likely step to confirm the new RAM is recognized by the system?",
      "options": [
        "Verify RAM capacity within Task Manager's Performance section",
        "Execute Windows Disk Cleanup to remove temporary files",
        "Update antivirus definitions to enhance system security",
        "Disable Windows Update to prevent automatic driver changes"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Checking the RAM usage in Task Manager’s Performance tab is correct because it shows the total physical memory recognized by Windows, confirming whether the new RAM is usable. Running Disk Cleanup helps free disk space and is unrelated to RAM. Updating antivirus definitions is important for security but irrelevant to hardware recognition. Disabling Windows Update does nothing to verify RAM detection.",
      "examTip": "Always double-check new RAM in Task Manager or System Info to ensure it’s actually recognized."
    },
    {
      "id": 21,
      "question": "A manager needs to remotely log in to an office PC using Remote Desktop but cannot connect. Which firewall configuration is MOST likely required?",
      "options": [
        "Configure an outbound rule specifically for TCP port 22",
        "Configure an inbound rule specifically for TCP port 3389",
        "Configure an inbound rule specifically for UDP port 53",
        "Implement a custom rule that blocks all incoming traffic"
      ],
      "correctAnswerIndex": 1,
      "explanation": "An inbound rule for TCP port 3389 is correct because RDP (Remote Desktop Protocol) uses TCP 3389 by default for inbound connections. Outbound rule for TCP 22 relates to SSH, not RDP. UDP port 53 is DNS, not RDP. Blocking all inbound traffic would prevent the connection entirely rather than allow it.",
      "examTip": "Know your port numbers: RDP = 3389 inbound if you want remote desktop to succeed."
    },
    {
      "id": 22,
      "question": "A user tries to open a folder on their Windows PC and receives an 'Access Denied' error. They are a local administrator. Which is the BEST next step to investigate the cause of the permission issue?",
      "options": [
        "Temporarily disable User Account Control (UAC)",
        "Utilize the 'Take Ownership' option within the folder's properties",
        "Execute the System File Checker (sfc /scannow) to repair the OS",
        "Run Disk Defragmenter to optimize file system performance"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Using the 'Take Ownership' feature under folder properties is correct because sometimes folders belong to the system or another user, requiring the new owner to set or change permissions. Disabling UAC is too broad and does not address ownership directly. Repairing the OS with sfc /scannow is for corrupted system files, not file ownership or permissions. Disk Defragmenter is performance-related and irrelevant to permission issues.",
      "examTip": "Even an admin might need to take ownership of certain folders—NTFS permissions can override local admin rights."
    },
    {
      "id": 23,
      "question": "Which type of backup method only copies files that have changed since the last full backup, but does NOT clear the archive bit?",
      "options": [
        "Full backup, which copies all selected data",
        "Incremental backup, which backs up changes since the last backup",
        "Differential backup, which backs up changes since the last full backup",
        "Synthetic full backup, which combines incrementals with a full backup"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Differential is correct because it copies files changed since the last full backup and leaves the archive bit set, meaning each subsequent differential grows in size until another full backup. A full backup resets the archive bit and copies all data. An incremental backup copies changes since the last backup (full or incremental) and resets the archive bit. A synthetic full is a process that consolidates incrementals and a previous full to create a new full.",
      "examTip": "Differential = only changed files since last full, archive bit stays put—makes for easier one-step restores."
    },
    {
      "id": 24,
      "question": "A small business wants to test software in an isolated environment on a Windows 10 machine. Which feature allows them to quickly create a separate OS instance without additional hardware?",
      "options": [
        "Create new partitions using Disk Management",
        "Utilize Windows Sandbox or Hyper-V for virtualization",
        "Modify User Account Control settings for testing",
        "Set up a dual-boot configuration with Linux"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Sandbox (or enabling Hyper-V) is correct because it allows creating virtual machines or a disposable environment for testing within Windows 10 (Pro or higher). Disk Management partitioning alone will not provide an isolated environment unless you install another OS. Adjusting User Account Control does not create a separate OS instance. Multi-booting with Linux is possible but requires reboots and separate OS partitions, not a quick test environment.",
      "examTip": "For a quick, risk-free testing bubble, spin up Windows Sandbox or a Hyper-V VM—no extra hardware needed."
    },
    {
      "id": 25,
      "question": "A technician needs to allow an internal website to be accessed externally over a specific TCP port. Which firewall action is typically required on the Windows server hosting the site?",
      "options": [
        "Configure a new inbound rule to permit external access.",
        "Configure a new outbound rule to allow internal connections.",
        "Disable all configured firewall profiles for testing.",
        "Restrict the range of ephemeral ports used by the system."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Creating an inbound rule for the application is correct because inbound traffic on that specific port must be allowed from external sources to reach the website. Creating a new outbound rule is incorrect since the server is receiving requests. Disabling all firewall profiles is highly insecure. Limiting ephemeral ports is unrelated to explicitly allowing a specific TCP port for a service.",
      "examTip": "Opening the inbound port on the server firewall is key for external clients to reach your internal service."
    },
    {
      "id": 26,
      "question": "A user reports that they cannot access shared folders on the local network, even though they can browse the internet. Which Windows utility is the FIRST place to check for network discovery and sharing settings?",
      "options": [
        "Windows Defender Firewall, for configuring network security",
        "Network and Sharing Center, for managing network connections",
        "Power Options, for configuring power management settings",
        "Device Manager, for managing hardware devices and drivers"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Network and Sharing Center is correct because it provides controls for network discovery, file sharing, and other sharing options that may be disabled, causing inaccessibility to shared folders. Windows Defender Firewall is incorrect as a first place to check; while firewall rules can block traffic, the primary discovery settings are in the Network and Sharing Center. Power Options is unrelated to network discovery settings. Device Manager helps manage drivers, not sharing configurations.",
      "examTip": "Check Network and Sharing Center when shared folders vanish—discovery settings or sharing options are often the culprit."
    },
    {
      "id": 27,
      "question": "A new user in an office environment complains they cannot install any software on their Windows workstation. The computer prompts for an admin password. Which of the following is the MOST likely explanation?",
      "options": [
        "The user's domain account password has expired",
        "The user is currently logged into a Guest account",
        "The user's profile has become corrupted",
        "The system is missing critical Windows updates"
      ],
      "correctAnswerIndex": 1,
      "explanation": "The user is logged into a Guest account is correct because Guest accounts have extremely limited privileges, which typically include blocking software installations. An expired domain password would prompt the user to change it, not block software installation with an admin credential prompt. A corrupted profile usually exhibits inconsistent behavior or inability to load settings, rather than installation restrictions. Missing Windows updates might cause security or compatibility issues, but not typically an admin password prompt for software installation.",
      "examTip": "Guest accounts are intentionally crippled—if you need to install software, move to Standard or Admin privileges."
    },
    {
      "id": 28,
      "question": "Which of the following is the BEST description of a strong password policy in Windows?",
      "options": [
        "Passwords should never expire and have no complexity requirements",
        "Passwords should be exactly 6 characters and consist only of letters",
        "Passwords should expire regularly and require diverse character types",
        "Passwords should match the user's email for easy memorization"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Passwords that expire periodically and require a mix of character types is correct because frequent changes and complexity help deter unauthorized access. Having no expiration or complexity is a significant security risk. Limiting to only letters and exactly 6 characters is too weak. Matching the user’s email address is a terrible idea, as it’s predictable and insecure.",
      "examTip": "Frequent changes + strong complexity = an effective layer against brute force and guessing attacks."
    },
    {
      "id": 29,
      "question": "A user’s laptop trackpad occasionally stops responding after a recent Windows update. Which action should the technician take FIRST to troubleshoot this issue?",
      "options": [
        "Reinstall the entire operating system to eliminate software conflicts.",
        "Check Device Manager for updated or missing drivers specific to the trackpad.",
        "Advise the user to use an external USB mouse until a permanent fix is found.",
        "Disable Windows Update entirely to prevent driver updates."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Examining Device Manager for driver issues is the first step. If the trackpad driver became outdated or replaced, reinstalling or rolling back the driver often resolves the intermittent issues. Reinstalling the OS is too extreme as an initial step, and disabling Windows Update is not recommended as it leaves the system vulnerable. Using an external mouse is a temporary workaround but does not solve the root cause.",
      "examTip": "Always hunt driver issues first—rollbacks or updates usually fix recent hardware malfunctions."
    },
    {
      "id": 30,
      "question": "Which Windows feature allows you to encrypt individual files or folders on an NTFS-formatted drive to protect data at rest?",
      "options": [
        "Group Policy Editor, for managing operating system policies",
        "BitLocker To Go, for encrypting entire removable drives",
        "Encrypting File System (EFS), for file and folder-level encryption",
        "OneDrive Sync, for cloud-based file synchronization and storage"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Encrypting File System (EFS) is correct because it encrypts files or folders at the file system level on NTFS volumes. Group Policy Editor manages OS policies, not direct file encryption. BitLocker To Go is used to encrypt entire removable drives rather than individual files. OneDrive Sync is a cloud-based syncing solution and does not natively encrypt files locally by default.",
      "examTip": "EFS is ideal for securing sensitive files on your local NTFS drive—lightweight and user-specific."
    },
    {
      "id": 31,
      "question": "A user complains that the Windows 10 search function no longer finds any local documents. Which initial step is MOST likely to fix the issue?",
      "options": [
        "Rebuild the Windows Search index from Indexing Options.",
        "Convert the system from NTFS to exFAT for faster indexing.",
        "Perform a full system restore to revert to a previous Windows installation.",
        "Install a third-party search tool to replace Windows Search."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Rebuilding the Windows Search index often resolves issues where files or folders are not being indexed properly. Changing file systems is not needed just to fix indexing. A full system restore is too drastic for a search malfunction. Installing a third-party tool is not necessary when Windows Search index can be fixed in built-in settings.",
      "examTip": "When Search breaks, refresh or rebuild the index—usually the simplest and quickest fix."
    },
    {
      "id": 32,
      "question": "A user wishes to encrypt sensitive files using EFS, but the target folder is on a FAT32-formatted partition. Which step is required FIRST?",
      "options": [
        "Use a file-level antivirus scan on the FAT32 partition to ensure it’s malware-free.",
        "Convert or move the folder to an NTFS-formatted partition before enabling EFS.",
        "Rename the folder to indicate that it holds encrypted data for better clarity.",
        "Upgrade the operating system to Windows 10 Enterprise, as EFS is only available there."
      ],
      "correctAnswerIndex": 1,
      "explanation": "EFS works exclusively on NTFS volumes, so the user must either convert the partition from FAT32 to NTFS or move the files to an NTFS volume first. An antivirus scan does not enable encryption, nor does simply renaming a folder. EFS is available on Windows 10 Pro and higher, not just Enterprise.",
      "examTip": "No NTFS, no EFS—that’s the bottom line. Convert or move your data to an NTFS drive."
    },
    {
      "id": 33,
      "question": "A user wants to share a folder with another local account on the same Windows 10 PC, but the account doesn't appear in the Sharing Wizard. What should the user do FIRST?",
      "options": [
        "Use File Explorer’s 'Map network drive' to map a local folder for the other account.",
        "Convert both accounts to Microsoft accounts to enable local sharing.",
        "Create or enable a password for the other local account, as blank passwords restrict sharing in some configurations.",
        "Disable the Windows Firewall so the other account becomes visible on the network."
      ],
      "correctAnswerIndex": 2,
      "explanation": "On Windows systems, accounts without passwords or with blank passwords are often restricted from receiving shared resources. Assigning a password to the other account typically allows it to show up in sharing scenarios. Mapping a drive or converting accounts to Microsoft accounts is unnecessary. Disabling the firewall is not recommended and unrelated to local account visibility.",
      "examTip": "Windows is picky about password-less accounts for sharing—set a password if you want true local share access."
    },
    {
      "id": 34,
      "question": "A user wants to enable Hyper-V on Windows 10 but cannot find it under 'Turn Windows features on or off.' Which of the following is the MOST likely reason?",
      "options": [
        "The user’s system has an unsupported CPU that lacks hardware virtualization technology.",
        "Hyper-V is automatically enabled on all Windows 10 Home installations.",
        "The user’s PC is joined to a domain that restricts virtualization through Group Policy.",
        "Windows automatically hides Hyper-V if less than 4 GB of RAM is installed."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Hyper-V requires hardware virtualization features (Intel VT-x or AMD-V) and sufficient hardware resources to appear in Windows 10 Pro and higher. On unsupported CPUs or in Windows 10 Home, the option will be missing. Domain policies typically don’t remove the feature from the Windows Feature list, and the 4 GB memory requirement is recommended but not an absolute condition for the feature to appear.",
      "examTip": "Check if your CPU supports VT-x/AMD-V and that you’re on Pro or higher—no virtualization support means no Hyper-V menu."
    },
    {
      "id": 35,
      "question": "A user’s Windows 10 PC displays repeated low disk space warnings on drive C:. After investigating, the technician notices the Windows.old folder is taking significant space. Which of the following is the MOST appropriate action?",
      "options": [
        "Delete Windows.old manually using File Explorer to free space.",
        "Use Disk Cleanup to remove previous Windows installation files safely.",
        "Compress the Windows.old folder to reduce used disk space.",
        "Rename Windows.old to Windows_backup to preserve data."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Using Disk Cleanup and selecting “Previous Windows Installations” is the safest way to remove the Windows.old folder. Manually deleting might cause permission issues or partial deletion. Compressing or renaming does not address the core space issue fully, and the OS still sees the folder as an older installation.",
      "examTip": "When cleaning up Windows.old, trust Disk Cleanup for a clean, worry-free removal process."
    },
    {
      "id": 36,
      "question": "A technician is configuring remote access on multiple Windows machines. Which built-in Windows group should be granted permissions to allow users to initiate Remote Desktop sessions?",
      "options": [
        "Administrators, which grant unrestricted access to the system",
        "Remote Desktop Users, specifically for RDP connections",
        "Backup Operators, typically for performing system backups and restores",
        "Power Users, which have elevated privileges for certain tasks"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Adding users to the Remote Desktop Users group is the recommended method for granting RDP permissions without giving full administrative rights. Administrators already can connect, but that’s often too broad. Backup Operators handle backup tasks, and Power Users is a legacy role not specifically for Remote Desktop.",
      "examTip": "Keep it clean—give RDP rights via Remote Desktop Users group rather than making everyone an admin."
    },
    {
      "id": 37,
      "question": "A user reports that Windows is displaying a blue screen of death (BSOD) citing a storage driver issue. Which is the FIRST place to look for more details or error codes related to this crash?",
      "options": [
        "The Reliability Monitor, which focuses on software install and update histories",
        "Device Manager, to see if any devices are disabled or missing drivers",
        "Event Viewer (System or Application logs), where detailed crash information is recorded",
        "Network and Sharing Center, to check if network connections caused the crash"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Event Viewer is the most direct way to find detailed information about BSODs, including stop codes and driver names. Reliability Monitor can show an overview but not as much detail about crash codes. Device Manager helps identify driver issues, but it does not record crash logs. Network and Sharing Center deals with network configuration rather than crash analysis.",
      "examTip": "Event Viewer is your crash forensic detective—look there for stop codes and faulty driver names."
    },
    {
      "id": 38,
      "question": "A technician wants to ensure that any system change on a Windows PC can be easily reversed. Which built-in feature provides a snapshot of the OS configuration at a specific point in time?",
      "options": [
        "File History, which backs up user documents and libraries",
        "System Restore, creating restore points to revert system files and settings",
        "Windows Backup (wbAdmin), performing full system backups",
        "System Image Recovery, restoring the entire OS from an image file"
      ],
      "correctAnswerIndex": 1,
      "explanation": "System Restore is designed to revert the operating system to a previous state, focusing on critical system files, registry, and settings. File History mainly protects personal files. Windows Backup (wbAdmin) or System Image Recovery can restore the entire OS but are heavier solutions and do not provide the quick “snapshot” functionality that System Restore does.",
      "examTip": "Before major tweaks, set a restore point—simple insurance if things go sideways."
    },
    {
      "id": 39,
      "question": "Which of the following commands in the Windows Command Prompt can be used to repair a corrupted Boot Configuration Data (BCD) store?",
      "options": [
        "chkdsk /f, to check the filesystem integrity on a drive",
        "bootrec /rebuildbcd, to scan for Windows installations and rebuild the BCD",
        "sfc /scannow, to verify and repair protected system files",
        "diskpart, to manage partitions and volumes"
      ],
      "correctAnswerIndex": 1,
      "explanation": "bootrec /rebuildbcd scans for Windows installs and rebuilds the Boot Configuration Data. chkdsk /f repairs disk-related errors, sfc /scannow repairs system files, and diskpart manages partitions but does not directly fix bootloader or BCD issues.",
      "examTip": "When the BCD is toast, 'bootrec /rebuildbcd' is your lifeline to revive Windows boot."
    },
    {
      "id": 40,
      "question": "A user wants to prevent specific software from running on their Windows machine for security reasons. Which feature in Group Policy can be used to block certain applications by their filenames or hashes?",
      "options": [
        "AppLocker or Software Restriction Policies",
        "Event Viewer, to monitor when the applications run",
        "Windows Firewall, to block the application’s outbound traffic",
        "System Configuration (msconfig), to disable startup items"
      ],
      "correctAnswerIndex": 0,
      "explanation": "AppLocker or Software Restriction Policies let administrators define rules to prevent or allow specific executables. Event Viewer logs events but does not block software. Windows Firewall restricts network traffic rather than blocking an application from running locally. System Configuration focuses on startup items and services, not actively blocking any app at all times.",
      "examTip": "Use AppLocker or SRP to ban those problematic EXEs—far more secure than relying on user caution alone."
    },
    {
      "id": 41,
      "question": "A user logs into a Windows domain from a laptop but keeps getting time synchronization errors. Which built-in Windows service is responsible for syncing the system clock with the domain controller?",
      "options": [
        "Windows Time service (w32time)",
        "Secondary Logon service",
        "Server service",
        "Workstation service"
      ],
      "correctAnswerIndex": 0,
      "explanation": "The Windows Time service (w32time) handles time synchronization with domain controllers or external time sources. Secondary Logon allows running processes as different users. The Server and Workstation services relate to file and print sharing, not clock sync.",
      "examTip": "In a domain, correct time is crucial for Kerberos—trust w32time to keep everyone in sync."
    },
    {
      "id": 42,
      "question": "Which of the following is TRUE regarding local user accounts in Windows 10 compared to Microsoft accounts?",
      "options": [
        "Local user accounts cannot access any network shares within the local LAN.",
        "Local user accounts are stored on Microsoft’s servers for synchronization purposes.",
        "Local user accounts do not require internet connectivity and store credentials locally.",
        "Local user accounts automatically sync settings and files across multiple devices."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Local accounts store credentials on the PC itself and do not require internet connectivity for authentication. Microsoft accounts leverage cloud features like settings sync across devices. Local accounts can still access network shares if properly configured. They are not stored on Microsoft’s servers.",
      "examTip": "Local accounts = purely local. Microsoft accounts = cloud-based features and sync. Choose wisely."
    },
    {
      "id": 43,
      "question": "A technician is asked to set up a client’s machine to dual-boot Windows 10 and Linux. Which partitioning scheme is MOST commonly used to support modern dual-boot configurations on UEFI-based systems?",
      "options": [
        "MBR (Master Boot Record) with up to 4 primary partitions",
        "GPT (GUID Partition Table), supporting more partitions and larger drives",
        "Dynamic disk configuration for spanning volumes across multiple disks",
        "Extended partitions within MBR for additional OS installations"
      ],
      "correctAnswerIndex": 1,
      "explanation": "GPT is the recommended partition style on UEFI systems because it allows for more partitions and supports large capacity drives. MBR is limited to 4 primary partitions unless you create extended/logical partitions. Dynamic disks are typically for software RAID or spanning/striping volumes, not dual-boot OS installations specifically.",
      "examTip": "GPT + UEFI is the modern standard for flexible, large-capacity disks and easy dual-boot setups."
    },
    {
      "id": 44,
      "question": "A user suspects that certain system files are missing or corrupted after a power outage. Which built-in command-line utility can verify and repair protected system files in Windows?",
      "options": [
        "sfc /scannow",
        "chkdsk /r",
        "diskpart",
        "ipconfig /flushdns"
      ],
      "correctAnswerIndex": 0,
      "explanation": "sfc /scannow (System File Checker) verifies the integrity of protected system files and repairs them if they’re corrupted. chkdsk /r checks the file system and sectors on the disk. diskpart manages disks and partitions. ipconfig /flushdns resets the local DNS resolver cache, unrelated to missing system files.",
      "examTip": "Use sfc /scannow whenever the OS behaves oddly—this utility can fix many system file woes."
    },
    {
      "id": 45,
      "question": "Which of the following scenarios would MOST likely require booting into Safe Mode for troubleshooting?",
      "options": [
        "A user needs to reset the time synchronization service",
        "A GPU driver update is causing continuous BSOD on normal startup",
        "The user wants to run the Disk Cleanup utility more efficiently",
        "An external hard drive is not recognized in File Explorer"
      ],
      "correctAnswerIndex": 1,
      "explanation": "When a problematic driver update causes crashes, Safe Mode starts Windows with a minimal set of drivers, allowing you to roll back or uninstall the driver safely. Resetting the time service doesn’t typically require Safe Mode. Disk Cleanup can run in normal mode. Troubleshooting an external drive often involves driver updates or cable checks, not necessarily Safe Mode.",
      "examTip": "Safe Mode is your minimal environment to remove suspect drivers or software causing boot-loop mayhem."
    },
    {
      "id": 46,
      "question": "A small business uses Windows Pro PCs joined to a local domain. The manager wants stricter password policies than the default. Where should the technician configure these policies so they apply to all domain users?",
      "options": [
        "Local Security Policy on each Windows PC",
        "Group Policy at the Domain Controller level",
        "Control Panel > User Accounts on each workstation",
        "The BIOS/UEFI settings for the domain server"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Group Policy at the Domain Controller affects all domain-joined users. Configuring each machine’s Local Security Policy or User Accounts is time-consuming and inconsistent. BIOS/UEFI does not manage Windows domain password complexity. Centralizing via Group Policy ensures uniform enforcement across the domain.",
      "examTip": "Domain password rules? Always set them via Group Policy on the Domain Controller—central control is king."
    },
    {
      "id": 47,
      "question": "A technician wants to hide specific user folders (like Documents or Pictures) from being visible on a shared Windows PC, without deleting them. Which is the MOST straightforward method?",
      "options": [
        "Disable folder indexing in Windows Search for those folders",
        "Encrypt the folders with EFS, preventing other users from accessing them",
        "Modify folder attributes to 'hidden' and remove 'read' permissions for other users",
        "Use the 'Take Ownership' feature, denying all other users’ access"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Marking a folder as hidden and properly adjusting NTFS permissions means other users cannot easily see or open them. Disabling indexing only affects search, not folder visibility. EFS encrypts the contents, but it doesn’t inherently hide the folder’s existence. Taking ownership is not just about hiding; it’s about controlling permissions, which might be overly complex compared to hidden+permission changes.",
      "examTip": "Hiding a folder plus locking it down with NTFS permissions keeps prying eyes away—simple and effective."
    },
    {
      "id": 48,
      "question": "Which tool can generate a custom Windows installation image with pre-installed drivers or software for deployment across multiple computers?",
      "options": [
        "Sysprep (System Preparation) for generalizing Windows installations",
        "Windows Imaging and Configuration Designer (ICD) or DISM for creating custom images",
        "BCDEdit for editing the boot configuration data",
        "chkdsk for verifying file system integrity"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows ICD (part of the Windows ADK) or DISM can capture and deploy custom images with integrated drivers or software. Sysprep is often used prior to imaging so the system is generalized. BCDEdit modifies boot loader entries, not full OS images. chkdsk checks the disk, unrelated to imaging.",
      "examTip": "Use DISM or ICD to build one golden image, then Sysprep if needed—your deployment process becomes a breeze."
    },
    {
      "id": 49,
      "question": "A Windows 10 workstation is regularly freezing. The user suspects a hardware fault but wants to confirm. Which built-in tool can show hardware errors or critical events in chronological order?",
      "options": [
        "Device Manager, to list devices and drivers",
        "Reliability Monitor, to visualize system stability history and error events",
        "Performance Monitor, to collect performance counters over time",
        "Task Scheduler, to automate system tasks"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Reliability Monitor offers a timeline of hardware/software errors, warning events, and other reliability metrics. Device Manager only flags devices with driver issues but does not provide a timeline. Performance Monitor helps track CPU/RAM usage but won’t present a straightforward chronological error list. Task Scheduler automates tasks, not logs errors.",
      "examTip": "Reliability Monitor is a hidden gem for seeing stability dips—watch for hardware or driver error patterns."
    },
    {
      "id": 50,
      "question": "A user’s Windows laptop displays a notification that it must be restarted to finish installing critical security patches. The user ignores it. Which strategy ensures the device cannot indefinitely postpone critical updates?",
      "options": [
        "Configure Windows Update to 'Notify only,' which simply alerts but never forces installation",
        "Enable Automatic Updates in Group Policy, forcing installations after a deadline",
        "Disable Windows Update service so the user is never prompted again",
        "Rely on the user to click 'Check for updates' manually when free"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Using Group Policy to enforce automatic updates ensures that after a certain timeframe, updates will install and prompt for restart if needed. Simply notifying the user can result in indefinite postponement. Disabling Windows Update is insecure. Relying on manual checks is unreliable if the user continually ignores prompts.",
      "examTip": "Corporate environments typically rely on enforced updates—set deadlines so users can’t dodge crucial patches forever."
    },
    {
      "id": 51,
      "question": "A technician notices multiple failed login attempts in the Security log on a Windows 10 PC. Which setting can lock a user account after a certain number of invalid password attempts to prevent brute-force attacks?",
      "options": [
        "Account Lockout Policy in Local Security Policy or Group Policy",
        "Enable BitLocker to encrypt the user’s home directory",
        "Enable Windows Hello biometric authentication",
        "Use the 'Encrypting File System (EFS)' on the user’s profile folder"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Account Lockout Policy sets thresholds for invalid login attempts before locking the account for a specified duration. BitLocker and EFS encrypt data but do not affect login attempt limits. Windows Hello is a convenience for authentication, not a brute-force lockout policy by itself.",
      "examTip": "Set an Account Lockout Policy—effective deterrent against repeated password guessing on Windows."
    },
    {
      "id": 52,
      "question": "Which Windows 10 feature allows a technician to revert to an earlier OS build if a new feature update causes issues, provided it’s still within the rollback window?",
      "options": [
        "Reset this PC, which reinstalls a fresh copy of Windows",
        "Go Back to the Previous Version of Windows 10",
        "System Restore using a pre-update restore point",
        "Disk Management for rolling back partition changes"
      ],
      "correctAnswerIndex": 1,
      "explanation": "“Go back to the previous version of Windows 10” is the dedicated feature for rolling back a major update if within the allowed time period (usually 10 days by default). Reset this PC reverts to factory-like conditions, removing apps. System Restore may help if there’s a restore point, but it’s not the standard approach for rolling back a full feature update. Disk Management doesn’t handle OS rollbacks directly.",
      "examTip": "Windows allows a short rollback grace—if an update breaks things, revert quickly before that window closes."
    },
    {
      "id": 53,
      "question": "A technician configures a Windows system to perform daily incremental backups to an external drive. What is the MAIN advantage of an incremental backup strategy versus full backups every day?",
      "options": [
        "Incremental backups include changes since the last full backup but preserve the archive bit",
        "Incremental backups do not require a previous full backup to restore data",
        "Incremental backups save time and storage space by copying only new or changed files",
        "Incremental backups require significantly less security configuration"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Incrementals copy only the changes since the last backup (full or incremental), drastically reducing backup time and storage usage. They do reset the archive bit (differential does not). They *do* require at least an initial full backup. Security configurations are generally the same for any backup type.",
      "examTip": "Incrementals are quick and storage-friendly—but keep that chain intact for a complete restore."
    },
    {
      "id": 54,
      "question": "While installing a Windows update, the process fails. The system reboots and repeatedly attempts the update. Which advanced startup option can help prevent automatic rollback loops and allow manual troubleshooting?",
      "options": [
        "Safe Mode with Networking, to update over the internet",
        "Last Known Good Configuration, to revert to the last successful boot",
        "Disable automatic restart on system failure, to see the BSOD error",
        "Enable Boot Logging, which tracks driver loading in ntbtlog.txt"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Disabling automatic restart on system failure lets you see the specific error or BSOD details without immediately rebooting, which can help identify the root cause. Safe Mode can be helpful but doesn’t necessarily stop the rollback loop. Last Known Good Configuration is no longer a prominent feature in newer Windows. Boot Logging helps with driver issues, not specifically update rollback loops.",
      "examTip": "Turn off automatic restart to catch that error code—knowing the BSOD details is half the battle."
    },
    {
      "id": 55,
      "question": "A technician needs to configure BitLocker on a system without a TPM chip. Which approach is required for BitLocker to work properly?",
      "options": [
        "Use BitLocker Network Unlock and store the key on a domain controller",
        "Configure USB flash drive-based key storage or enable 'Allow BitLocker without a compatible TPM' in policy",
        "Set the drive to exFAT and run BitLocker To Go",
        "Install a third-party encryption tool because BitLocker requires TPM"
      ],
      "correctAnswerIndex": 1,
      "explanation": "BitLocker can function without TPM if you enable the policy to allow it and use a USB key (or password) for startup authentication. Network Unlock only works in certain scenarios with a domain environment and still typically requires TPM. BitLocker can work on NTFS, not exFAT for an OS drive. A third-party tool isn’t necessary if you configure BitLocker properly.",
      "examTip": "No TPM? No problem. Just allow BitLocker without TPM in Group Policy and use a USB or password at boot."
    },
    {
      "id": 56,
      "question": "Which method is BEST for distributing software updates across multiple Windows 10 Pro laptops in a small office without setting up a full WSUS server?",
      "options": [
        "Use Delivery Optimization and configure PCs to share updates on the local network",
        "Disable Windows Update and rely on manual patching from official ISO files",
        "Deploy third-party imaging software to re-image machines monthly",
        "Schedule daily forced reboots to ensure updates apply automatically"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Delivery Optimization allows PCs to obtain updates from each other, reducing internet bandwidth usage. Disabling Windows Update is insecure. Re-imaging monthly is cumbersome and overkill for daily updates. Scheduling reboots ensures updates finish once downloaded but doesn’t help with more efficient distribution.",
      "examTip": "Delivery Optimization can keep your update bandwidth usage in check by letting local PCs share patches peer-to-peer."
    },
    {
      "id": 57,
      "question": "A Windows 10 user complains their workstation loses all network connectivity after waking from sleep mode. Which is the FIRST step to diagnose the issue?",
      "options": [
        "Disable and re-enable the network adapter driver in Device Manager",
        "Check the Power Management settings for the network adapter",
        "Delete and re-create the user profile to reset all settings",
        "Perform a factory reset of the BIOS/UEFI configuration"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Power Management settings often allow Windows to turn off the device to save power. Ensuring the adapter is not power-cycled or is properly reactivated on wake can fix the connectivity issue. Disabling/re-enabling the driver might work temporarily but doesn’t address the root cause. Deleting the user profile or resetting the BIOS is unnecessarily drastic.",
      "examTip": "Check if the OS is 'helpfully' turning off your NIC to save power—common cause of lost connectivity post-sleep."
    },
    {
      "id": 58,
      "question": "A user suspects the Windows operating system is infected with a rootkit that starts before the OS. Which of the following scanning methods is MOST effective at catching pre-boot malware?",
      "options": [
        "Running a quick scan with an installed antivirus",
        "Performing a scan in Safe Mode with Networking",
        "Using a specialized bootable antivirus or rescue media",
        "Utilizing Windows Defender Firewall to block malicious ports"
      ],
      "correctAnswerIndex": 2,
      "explanation": "A bootable antivirus or rescue environment scans without relying on the infected OS, enabling detection of bootkits or rootkits that could hide during normal operation. Quick or Safe Mode scans are helpful but might miss advanced rootkits. Blocking ports is unrelated to pre-boot infections.",
      "examTip": "Suspect rootkits? Go offline with a bootable AV disc—malware can’t hide if the OS never boots."
    },
    {
      "id": 59,
      "question": "Which of the following provides the BEST immediate protection against malicious software masquerading as legitimate email attachments on a Windows 10 domain-joined PC?",
      "options": [
        "Windows Defender Exploit Guard with Attack Surface Reduction rules",
        "Remote Desktop with Network Level Authentication",
        "Enabling fast startup and secure boot in the BIOS/UEFI",
        "Using a local guest account for opening attachments"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Windows Defender Exploit Guard’s Attack Surface Reduction can block or scan suspicious attachments before they execute. RDP with NLA is about remote connection security. Fast startup and Secure Boot help with boot integrity, not scanning attachments. A guest account is extremely limited but doesn’t actively scan or block attachments by default.",
      "examTip": "When attachments appear shady, Attack Surface Reduction rules can nip them in the bud before they do harm."
    },
    {
      "id": 60,
      "question": "A technician is configuring UAC settings via Group Policy for a large organization. What is the PRIMARY reason for leaving UAC enabled?",
      "options": [
        "It speeds up boot times by pre-loading system services",
        "It prevents user-level applications from writing to the Registry",
        "It reduces the attack surface by prompting for elevation on admin-level changes",
        "It automatically encrypts user data to protect from unauthorized access"
      ],
      "correctAnswerIndex": 2,
      "explanation": "UAC’s primary goal is to reduce unauthorized system changes by prompting for administrative credentials or confirmation. It does not inherently encrypt data. UAC has no effect on boot times or user-level registry writes (beyond protected system areas).",
      "examTip": "UAC might annoy some users, but it’s a critical checkpoint for blocking silent admin-level exploits."
    },
    {
      "id": 61,
      "question": "A user’s Windows 10 system cannot boot normally, showing a 'BCD is missing or corrupt' error. Which recovery command is BEST to attempt first?",
      "options": [
        "bcdedit /deletevalue",
        "bootrec /fixmbr",
        "bootrec /fixboot",
        "bootrec /rebuildbcd"
      ],
      "correctAnswerIndex": 3,
      "explanation": "bootrec /rebuildbcd scans for installed operating systems and recreates a fresh BCD store if it’s missing or corrupt. /fixmbr and /fixboot fix the master boot record and boot sector, respectively, but may not rebuild the entire BCD. bcdedit /deletevalue modifies an existing BCD entry, which won’t help if it’s missing or fully corrupted.",
      "examTip": "When the BCD itself is gone, /rebuildbcd is your best shot at resurrecting the boot path."
    },
    {
      "id": 62,
      "question": "A user complains that their Windows 10 machine randomly shuts down after a few minutes. Checking Event Viewer reveals a critical thermal event. Which is the BEST next step?",
      "options": [
        "Run sfc /scannow to check for system file corruption",
        "Examine hardware cooling components, like fans and heatsinks, for proper function",
        "Replace the system’s power supply with a higher wattage unit",
        "Run chkdsk /r to detect disk read errors"
      ],
      "correctAnswerIndex": 1,
      "explanation": "A critical thermal event suggests overheating is causing the shutdown. Inspect fans, heatsinks, thermal paste, and airflow. System file checks (sfc) or disk checks (chkdsk) won’t address a thermal issue. Replacing the power supply might help if it’s failing or underpowered, but usually you should verify cooling first.",
      "examTip": "If the system’s cooking itself, fix the cooling—BSODs and random shutdowns often point to overheating."
    },
    {
      "id": 63,
      "question": "A technician is helping a user who needs to run older 16-bit legacy software on Windows 10. The software won’t install under normal conditions. Which approach is MOST likely to work?",
      "options": [
        "Enable 'Hyper-V' and run a virtual machine with an older Windows version that supports 16-bit apps",
        "Use Disk Management to shrink the partition and install a second copy of Windows 10",
        "Disable all antivirus software to prevent blocking older installers",
        "Remove all existing user accounts and create a local administrator account"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Running a virtual machine with a compatible older OS is usually the simplest way to run 16-bit software not natively supported by 64-bit Windows 10. Shrinking the partition and installing a second Windows 10 is redundant if the OS doesn’t support 16-bit anyway. Disabling antivirus or removing accounts doesn’t address 16-bit incompatibility.",
      "examTip": "When 16-bit apps won’t play nice on 64-bit Windows, spin up a VM—best of both worlds."
    },
    {
      "id": 64,
      "question": "A Windows 10 workstation frequently displays notifications about 'low virtual memory.' Which action is MOST likely to resolve this without adding physical RAM?",
      "options": [
        "Increase the size of the paging file (virtual memory) on the system drive",
        "Disable system restore to reclaim disk space",
        "Enable BitLocker on the drive to improve memory usage",
        "Replace the system’s hard disk with an SSD"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Increasing or allowing Windows to manage a larger paging file can help alleviate low virtual memory issues. Disabling system restore frees disk space but doesn’t directly affect paging file capacity. BitLocker encrypts the drive but doesn’t add memory. Upgrading to an SSD improves performance but doesn’t inherently increase available virtual memory.",
      "examTip": "If you’re always hitting the memory ceiling, bump up your paging file to ease those 'low virtual memory' nags."
    },
    {
      "id": 65,
      "question": "A small business wants to implement a reliable data backup strategy ensuring multiple recovery points, multiple copies of data, and an off-site backup. Which principle BEST describes this approach?",
      "options": [
        "A strategy using mirrored RAID arrays for redundancy and daily incremental backups to a local server.",
        "The 3-2-1 backup rule: maintain three copies of data on two different media with one copy offsite.",
        "A plan involving weekly full backups to an external hard drive and replication to a secondary local server.",
        "Continuous data replication to a cloud storage provider with geo-redundancy enabled for disaster recovery."
      ],
      "correctAnswerIndex": 1,
      "explanation": "The 3-2-1 backup rule is correct because it states you should keep at least three copies of your data, stored on two different media, with one copy off-site. Incremental-only backups do not inherently ensure off-site storage or multiple forms of media. A single full backup per month leaves data at risk for the rest of the month. Auto-sync to one personal flash drive is not robust enough if that single drive is lost or damaged.",
      "examTip": "Three copies, two media, one off-site—that’s the classic 3-2-1 strategy for bulletproof backups."
    },
    {
      "id": 66,
      "question": "A technician is disposing of a client's old printer that may still contain stored documents. Which is the BEST practice to ensure data privacy during disposal?",
      "options": [
        "Factory reset the printer to clear its settings and wipe the configuration data.",
        "Remove and physically destroy any internal storage (hard drive or flash memory).",
        "Overwrite the printer's internal memory using a specialized data erasure utility.",
        "Return the printer to the manufacturer for secure recycling and data destruction."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Removing and wiping any internal storage or hard drive is correct because some printers store recent print jobs or address book data on internal memory. Wiping the exterior cleans only the surface and does not address data retention. Donating the printer is not safe without data removal. Simply powering off does nothing to protect stored data.",
      "examTip": "Never forget printers can store data—pull or shred the internal drive to avoid leaks upon disposal."
    },
    {
      "id": 67,
      "question": "Which of the following is NOT typically part of a well-structured change-management process?",
      "options": [
        "Conducting thorough testing of proposed changes in a representative test environment.",
        "Obtaining formal approval from stakeholders before implementing any changes.",
        "Developing a detailed rollback plan to revert changes if issues arise after implementation.",
        "Bypassing documentation for emergency changes to expedite critical fixes."
      ],
      "correctAnswerIndex": 3,
      "explanation": "Implementing emergency changes without documentation is NOT typically part of best practices, as every change should still be documented even if it’s urgent. Testing changes in a sandbox, obtaining approvals, and planning rollbacks are standard steps in change-management. Lack of documentation can lead to confusion and untraceable issues later.",
      "examTip": "Even urgent fixes need some documentation—skipping it entirely is a recipe for chaos."
    },
    {
      "id": 68,
      "question": "A user with a Windows laptop complains the built-in speakers produce no sound, but headphones work fine. Which is the BEST initial troubleshooting step?",
      "options": [
        "Update the audio drivers in Device Manager and reboot the system.",
        "Check the default playback device and volume mixer settings in Sound settings.",
        "Run the Windows Audio Troubleshooter to automatically diagnose and fix sound problems.",
        "Perform a system restore to revert to a previous state before the issue occurred."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Checking the default playback device in Sound settings is correct because the system may still be routing audio to headphones or a disabled device. A factory reset is too drastic for an initial step. Replacing the motherboard is rarely the first step unless a thorough diagnosis confirms it. Increasing CPU speed in BIOS will not fix sound routing issues.",
      "examTip": "When speakers go silent, look at your default playback device and volume mixer first—it’s often a simple fix."
    },
    {
      "id": 69,
      "question": "Which of the following backup types will reset the archive bit after copying only the files that changed since the last backup of *any* kind?",
      "options": [
        "Full backup, copying all files and clearing the archive bit, marking them as backed up.",
        "Differential backup, copying files changed since the last *full* backup and preserving the archive bit.",
        "Incremental backup, copying files changed since the last backup (full or incremental) and clearing the archive bit.",
        "Snapshot backup, creating a point-in-time copy of the entire volume without modifying archive bits."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Incremental backup is correct because it includes files changed since the last backup—whether full or incremental—and then clears the archive bit. A full backup copies all data and resets the bit. A differential backup does not reset the bit; it copies changes since the last full backup. A snapshot backup is a point-in-time image of a system or volume, conceptually different from the typical incremental approach.",
      "examTip": "Incrementals build on every previous backup, clearing the archive bit each time—they’re fast but require the entire chain for restores."
    },
    {
      "id": 70,
      "question": "A technician is tasked with giving a user remote support via text-based commands in a secure manner. Which protocol is MOST appropriate if the target system is a Linux machine?",
      "options": [
        "Telnet, providing unencrypted remote access for executing commands.",
        "FTP, primarily used for transferring files between systems.",
        "SSH, providing an encrypted remote terminal connection.",
        "RDP, providing a graphical remote desktop interface."
      ],
      "correctAnswerIndex": 2,
      "explanation": "SSH is correct because it provides encrypted text-based remote terminal access to Linux systems. RDP is graphical and primarily for Windows. Telnet is unencrypted and insecure. FTP is for file transfers, not interactive shell sessions.",
      "examTip": "Use SSH for secure command-line remote administration on Linux—Telnet is ancient and wide open."
    },
    {
      "id": 71,
      "question": "A user downloads a productivity program from an unknown website and sees a 'publisher cannot be verified' warning. Which of the following is the BEST action to ensure safety before installing?",
      "options": [
        "Cancel the installation and locate a trusted source (e.g., the official vendor or a reputable app store).",
        "Temporarily disable antivirus software to avoid potential false positive detections during installation.",
        "Proceed with the installation while carefully monitoring system activity for suspicious behavior.",
        "Install the software in Safe Mode to limit potential damage from malicious code."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Cancel the installation and locate a trusted source is correct because unknown or unverified publishers pose a high risk of malware. Disabling antivirus is extremely risky and potentially exposes the system further. Blindly proceeding is unsafe. Installing in Safe Mode does not guarantee safety from malicious code; it only limits system drivers, not the potential threat from the software itself.",
      "examTip": "When Windows can’t verify a publisher, it’s your sign to back off and find a reputable alternative."
    },
    {
      "id": 72,
      "question": "A technician is attempting to connect a user’s laptop to a domain, but the option is missing under System > About. Which Windows edition is the user MOST likely running?",
      "options": [
        "Windows 10 Home, which lacks native domain join capabilities.",
        "Windows 10 Pro, which supports domain join but may require specific network configurations.",
        "Windows 10 Enterprise, typically used in large organizations with domain-based networks.",
        "Windows 10 Education, which supports domain join for academic environments."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Windows 10 Home is correct because it does not have the option to join a domain. Windows 10 Pro, Enterprise, and Education all include domain join functionality. If the domain join option is absent, it strongly indicates the Home edition.",
      "examTip": "For domain join, Home edition won’t cut it—upgrade to Pro or beyond to see that domain option."
    },
    {
      "id": 73,
      "question": "A user calls the help desk complaining that all their internet browsers show 'Certificate Not Trusted' errors for most websites. Which is the MOST likely root cause?",
      "options": [
        "The web browser's certificate revocation list (CRL) is outdated or corrupted.",
        "Incorrect system date and time, causing certificate validity checks to fail.",
        "A firewall is configured to perform SSL inspection, but the root CA is not trusted.",
        "The user's DNS settings are misconfigured, leading to incorrect hostname resolution."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Incorrect system date and time is correct because certificates rely on valid dates for trust validation. If the date/time is far off, browsers reject certificates. A local firewall blocking secure traffic would typically result in connection timeouts, not trust errors. Malware could remove certificates, but widespread immediate errors across many sites typically indicate a date/time issue. A DNS server not responding leads to inability to resolve hostnames, not certificate trust failures.",
      "examTip": "SSL depends on accurate system time—if your clock is off, expect widespread certificate trust issues."
    },
    {
      "id": 74,
      "question": "A user discovers that their laptop's battery drains too quickly even when idle. Which of the following settings would MOST likely help conserve battery power?",
      "options": [
        "Enable high-performance mode in Power Options to maximize system responsiveness.",
        "Set the display brightness to the highest level for optimal visibility.",
        "Use the Balanced or Power Saver power plan in Windows Power Options.",
        "Disable all sleep and hibernation modes to prevent unexpected interruptions."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Using the Balanced or Power Saver power plan is correct because these modes adjust CPU performance, screen brightness, and other factors to conserve energy. Enabling 3D screen savers consumes more battery. Setting display brightness to maximum reduces battery life. Disabling all sleep modes would keep the system fully active, draining the battery faster.",
      "examTip": "Switch to Balanced or Power Saver when on battery—no need to run on max performance while idle."
    },
    {
      "id": 75,
      "question": "A manager wants to connect to an internal web server using SSH from home. Which port must be open on the firewall to allow an SSH connection inbound to that server by default?",
      "options": [
        "TCP port 21, used for FTP (File Transfer Protocol).",
        "TCP port 22, the standard port for SSH (Secure Shell).",
        "TCP port 80, commonly used for HTTP (web traffic).",
        "TCP port 443, typically used for HTTPS (secure web traffic)."
      ],
      "correctAnswerIndex": 0,
      "explanation": "TCP 22 is correct because SSH uses port 22 for secure remote connections. TCP 443 is for HTTPS. TCP 25 is for SMTP email transmissions. TCP 3389 is for RDP (Remote Desktop Protocol).",
      "examTip": "SSH listens on 22 by default—be sure your firewall has inbound TCP/22 open for remote shell access."
    },
    {
      "id": 76,
      "question": "A remote worker with Windows 10 Pro complains they cannot synchronize their work files offline. Which Windows feature must be configured to allow Offline Files?",
      "options": [
        "Switch to a Microsoft account to enable cloud synchronization automatically.",
        "In Control Panel > Sync Center, enable Offline Files and select which network folders to sync.",
        "Disable Windows Firewall to permit file syncing through the local domain connection.",
        "Use Device Manager to enable the network adapter’s offline caching mode."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Offline Files is managed via Sync Center in the Control Panel. The user must enable it and specify which network folders to be available offline. Microsoft account sync is different, focusing on OneDrive. Disabling the firewall is not typically required for offline file sync, and network adapters don’t have an 'offline caching mode.'",
      "examTip": "Configure Sync Center’s Offline Files for work-from-anywhere access to network shares—no network needed."
    },
    {
      "id": 77,
      "question": "A user downloads a productivity program from an unknown website and sees a 'publisher cannot be verified' warning. Which of the following is the BEST action to ensure safety before installing?",
      "options": [
        "Cancel the installation and locate a trusted source (e.g., the official vendor or a reputable app store).",
        "Temporarily disable antivirus software to avoid potential false positive detections during installation.",
        "Proceed with the installation while carefully monitoring system activity for suspicious behavior.",
        "Install the software in Safe Mode to limit potential damage from malicious code."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Cancel the installation and locate a trusted source is correct because unknown or unverified publishers pose a high risk of malware. Disabling antivirus is extremely risky and potentially exposes the system further. Blindly proceeding is unsafe. Installing in Safe Mode does not guarantee safety from malicious code; it only limits system drivers, not the potential threat from the software itself.",
      "examTip": "Always favor reputable sources—unknown publishers often mean potential malware in disguise."
    },
    {
      "id": 78,
      "question": "A user reports their system drive is nearly full, causing slow performance. Which built-in tool in Windows 10 can quickly free up disk space by removing unneeded files?",
      "options": [
        "Disk Cleanup, which targets temporary files, Recycle Bin contents, and other unnecessary data",
        "Device Manager, which can uninstall device drivers to save storage space",
        "Group Policy Editor, which can enforce disk space quotas",
        "Windows Defender Firewall, which deletes cached firewall logs automatically"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Disk Cleanup is specifically designed to reclaim disk space by removing temporary files, old updates, and Recycle Bin data. Device Manager removes drivers but that’s minimal. Group Policy Editor can enforce quotas but not actively clean. Windows Defender Firewall doesn’t handle disk cleanup tasks.",
      "examTip": "Disk Cleanup is your go-to for clearing out junk in a pinch—fast and built right into Windows."
    },
    {
      "id": 79,
      "question": "A Windows 10 user sees repeated notifications that their OneDrive is full, but they still have space on their local disk. Which action addresses this problem?",
      "options": [
        "Upgrade to a higher OneDrive storage plan or remove files from OneDrive to free cloud space.",
        "Run Disk Defragmenter on the local drive to compress data into free blocks.",
        "Convert the partition to GPT to allow more file entries in OneDrive.",
        "Disable Windows Firewall to prevent OneDrive from scanning for large files."
      ],
      "correctAnswerIndex": 0,
      "explanation": "OneDrive storage limits are independent of local disk space. If the cloud quota is reached, upgrading the plan or removing unnecessary files is required. Defragmentation or partition type changes do not affect OneDrive’s cloud capacity. Disabling the firewall does not help with OneDrive space issues.",
      "examTip": "Remember that local disk space and OneDrive cloud space are separate—freeing one doesn’t free the other."
    },
    {
      "id": 80,
      "question": "A user's Windows 10 PC keeps crashing with memory-related errors. Which built-in diagnostic tool is BEST to check for faulty RAM modules?",
      "options": [
        "System File Checker (sfc /scannow), to repair corrupted system files that might cause crashes.",
        "Windows Memory Diagnostic, specifically designed to test RAM for errors.",
        "Resource Monitor, to observe real-time memory usage and identify potential issues.",
        "Deployment Image Servicing and Management (DISM), to repair the Windows image."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Memory Diagnostic is correct because it runs tests on RAM at reboot to detect memory issues. Disk Defragmenter optimizes hard drive data placement but doesn’t test RAM. chkdsk /f checks for file system and disk errors, not RAM errors. System Information only displays hardware and OS information; it doesn’t diagnose faulty components.",
      "examTip": "Suspect bad memory? Boot up Windows Memory Diagnostic for a thorough RAM check."
    },
    {
      "id": 81,
      "question": "A technician wants to set a system-wide environment variable in Windows. Which location in the Control Panel is BEST for editing environment variables?",
      "options": [
        "System > Advanced system settings > Environment Variables, for both user and system variables.",
        "System > Device Manager, to configure hardware-related environment variables.",
        "System and Security > Windows Defender Firewall, to set firewall-related environment variables.",
        "User Accounts > Change your environment variables, which only affects the current user."
      ],
      "correctAnswerIndex": 0,
      "explanation": "System > Advanced system settings is correct because that section contains the Environment Variables button, letting you define system and user variables. Network and Sharing Center is for network-related options. Programs and Features is for installing or uninstalling software. Ease of Access adjusts accessibility settings, not environment variables.",
      "examTip": "System-wide environment variables reside under System Properties—always go there for global path changes."
    },
    {
      "id": 82,
      "question": "A technician wishes to ensure that all laptops in a small office apply the same Windows Updates at the same time without manually initiating each update. Which Windows technology facilitates this for a centralized approach?",
      "options": [
        "Configure Group Policy to define a specific update schedule for all domain-joined computers.",
        "Windows Server Update Services (WSUS), for centralized management and deployment of updates.",
        "Utilize a third-party patch management solution to control update distribution.",
        "Manually configure Windows Update settings on each laptop to check for updates simultaneously."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Server Update Services (WSUS) is correct because it centrally manages and deploys updates to Windows clients within a domain. Group Policy loopback merges user policies under certain conditions but does not handle Windows Updates specifically. Windows Defender Application Guard is about sandboxing the browser, not deploying updates. Network and Sharing Center manages network connections, not update distribution.",
      "examTip": "For a small domain environment, WSUS is the simplest way to unify and schedule all patch installations."
    },
    {
      "id": 83,
      "question": "A user opens a suspicious email attachment, and their browser subsequently opens multiple unwanted tabs with ads. They suspect malware. According to best practices, which step should be taken FIRST?",
      "options": [
        "Disconnect the computer from the network to prevent further spread or data exfiltration.",
        "Run a quick scan with the installed antivirus software to attempt immediate removal.",
        "Isolate the affected user account by disabling network access for that specific account.",
        "Back up all user data before taking any further action to prevent data loss."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Disconnecting the computer from the network is correct because it prevents the spread of any malware to other machines and stops additional malicious downloads. Reinstalling the operating system immediately is premature; proper identification and scanning should occur first. A full disk wipe is an extreme step typically performed only if other remediation attempts fail. Replacing the hard drive is not necessary unless the drive is damaged or cannot be effectively cleaned of malware.",
      "examTip": "Always pull an infected machine off the network first—cutting off malware’s exit or entry routes is critical."
    },
    {
      "id": 84,
      "question": "Which built-in Windows tool allows you to add, remove, and configure printers on a local system?",
      "options": [
        "Devices and Printers, providing a central location for managing printers and other devices.",
        "Print Management, a more advanced tool for managing multiple printers and print servers.",
        "Device Manager, primarily for managing hardware drivers, including printer drivers.",
        "Add a Printer Wizard, a guided process specifically for installing new printers."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Devices and Printers is correct because it provides a centralized interface to manage printer installations and settings. Internet Options only deals with browser and internet configurations. Resource Monitor shows real-time CPU, memory, and disk usage. Disk Management handles partitions and volumes, not printer management.",
      "examTip": "Devices and Printers is a one-stop interface to see and tweak your installed printer setups in Windows."
    },
    {
      "id": 85,
      "question": "A user encounters an error stating the Master Boot Record (MBR) is corrupted. Which of the following tools in Windows Recovery Environment can help repair the MBR?",
      "options": [
        "`bootrec /fixmbr`, which writes a new MBR to the system partition.",
        "`bootrec /fixboot`, which writes a new boot sector to the system partition.",
        "`bootrec /scanos`, which scans all disks for Windows installations.",
        "`diskpart`, followed by manual selection and repair of the MBR using low-level commands."
      ],
      "correctAnswerIndex": 0,
      "explanation": "bootrec /fixmbr is correct because it specifically repairs a damaged master boot record. The format C: command wipes the partition, which is not ideal if you intend to preserve data. ipconfig /release manages IP addresses and is unrelated to boot sectors. chkdsk /r checks for disk errors and bad sectors but does not fix the MBR specifically.",
      "examTip": "Use /fixmbr when the MBR goes bad—just be careful to avoid overwriting the wrong drive!"
    },
    {
      "id": 86,
      "question": "A technician needs to ensure that user data is protected on a removable hard drive in case it is lost. Which Windows technology is BEST suited for encrypting removable drives?",
      "options": [
        "Encrypting File System (EFS), to encrypt individual files and folders on the removable drive.",
        "BitLocker To Go, designed specifically for encrypting entire removable drives.",
        "Windows Defender Device Guard, to control which applications can access the drive.",
        "A combination of NTFS permissions and a strong password on the user account."
      ],
      "correctAnswerIndex": 1,
      "explanation": "BitLocker To Go is correct because it encrypts removable drives, ensuring data is unreadable if lost or stolen. Windows Firewall only manages network traffic. Disk Cleanup frees up space by removing temporary files. NTFS Permissions help control access locally or in a domain environment, but removable drives can still be accessed outside that environment without encryption.",
      "examTip": "BitLocker To Go is your top choice for full-drive encryption on USB and other removable disks."
    },
    {
      "id": 87,
      "question": "A technician wants to run a diagnostic tool automatically every time Windows starts, but *only* for one specific user. Which approach is BEST?",
      "options": [
        "Place a shortcut to the tool in the Startup folder within that specific user's Start Menu.",
        "Create a scheduled task in Task Scheduler, configured to run the tool on user login.",
        "Modify the 'Run' registry key for that user to include the diagnostic tool.",
        "Use Group Policy (if on a domain) with a user-specific logon script to launch the tool."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Placing a shortcut in the user’s Startup folder is correct because it will only launch after *that* user logs in. Enabling automatic login for the Administrator account is a separate approach and not secure. Modifying advanced startup options in msconfig affects all users on that computer. Creating a GPO at the domain level affects more than just one user unless specifically filtered, and it’s more complex than needed for a single user’s personal startup item.",
      "examTip": "For a single user’s auto-start, drop a shortcut into their personal Startup folder—simple and specific."
    },
    {
      "id": 88,
      "question": "Which of the following is considered a BEST practice for handling user data when performing a Windows OS upgrade?",
      "options": [
        "Instruct the user to manually copy important files to a USB drive before starting the upgrade.",
        "Use a dedicated backup tool or the built-in Windows migration utility to preserve personal files.",
        "Rely on cloud synchronization services (like OneDrive) as the sole method of data preservation.",
        "Inform the user that all data will be automatically preserved during the in-place upgrade process."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Using a backup tool or migration utility to preserve personal files is correct because it ensures data safety during the upgrade. Deleting user data is counterproductive unless doing a totally clean install (and the user is aware). Relying solely on the OS upgrade’s built-in process can be risky if errors occur. Disabling System Restore before starting is typically part of malware removal, not a best practice for OS upgrades.",
      "examTip": "Always have a backup plan—never trust an in-place upgrade to perfectly preserve user data without fail."
    },
    {
      "id": 89,
      "question": "Which of the following backup types will reset the archive bit after copying only the files that changed since the last backup of *any* kind?",
      "options": [
        "Full backup, copying all files and clearing the archive bit, marking them as backed up.",
        "Differential backup, copying files changed since the last *full* backup and preserving the archive bit.",
        "Incremental backup, copying files changed since the last backup (full or incremental) and clearing the archive bit.",
        "Daily backup, which copies all files that have been modified on the day the backup is run."
      ],
      "correctAnswerIndex": 2,
      "explanation": "Incremental backup is correct because it includes files changed since the last backup—whether full or incremental—and then clears the archive bit. A full backup copies all data and resets the bit. A differential backup does not reset the bit; it copies changes since the last full backup. A snapshot backup is a point-in-time image of a system or volume, conceptually different from the typical incremental approach.",
      "examTip": "Incremental backups are nimble—just don’t lose track of any link in the backup chain or restoration gets messy."
    },
    {
      "id": 90,
      "question": "A technician is tasked with giving a user remote support via text-based commands in a secure manner. Which protocol is MOST appropriate if the target system is a Linux machine?",
      "options": [
        "Telnet, providing unencrypted remote access for executing commands.",
        "FTP, primarily used for transferring files between systems.",
        "SSH, providing an encrypted remote terminal connection.",
        "RDP, providing a graphical remote desktop interface."
      ],
      "correctAnswerIndex": 2,
      "explanation": "SSH is correct because it provides encrypted text-based remote terminal access to Linux systems. RDP is graphical and primarily for Windows. Telnet is unencrypted and insecure. FTP is for file transfers, not interactive shell sessions.",
      "examTip": "SSH is essential for secure CLI access on Linux—never rely on Telnet’s plaintext approach."
    },
    {
      "id": 91,
      "question": "A user downloads a productivity program from an unknown website and sees a 'publisher cannot be verified' warning. Which of the following is the BEST action to ensure safety before installing?",
      "options": [
        "Cancel the installation and locate a trusted source (e.g., the official vendor or a reputable app store).",
        "Temporarily disable antivirus software to avoid potential false positive detections during installation.",
        "Proceed with the installation while carefully monitoring system activity for suspicious behavior.",
        "Install the software in Safe Mode to limit potential damage from malicious code."
      ],
      "correctAnswerIndex": 0,
      "explanation": "Cancel the installation and locate a trusted source is correct because unknown or unverified publishers pose a high risk of malware. Disabling antivirus is extremely risky and potentially exposes the system further. Blindly proceeding is unsafe. Installing in Safe Mode does not guarantee safety from malicious code; it only limits system drivers, not the potential threat from the software itself.",
      "examTip": "Can’t verify the publisher? That’s your flashing red light to back away and find a legitimate source."
    },
    {
      "id": 92,
      "question": "A user can print to a locally connected USB printer but cannot print to a network printer. All other network functions (web browsing, email) work. Which step is MOST likely to resolve the issue?",
      "options": [
        "Run 'chkdsk /r' on the user's system drive to repair file system errors.",
        "Update or reinstall the network printer’s driver from the manufacturer's website.",
        "Convert the user’s file system from FAT32 to NTFS to allow network printing.",
        "Disable the Windows Firewall to permit printer traffic on the local network."
      ],
      "correctAnswerIndex": 1,
      "explanation": "If the network connection is functioning for internet and email, the main difference is the printer driver or print spooler configuration. Updating the driver often fixes compatibility or corrupted driver issues. Converting FAT32 to NTFS or disabling the firewall are not typical first steps for printing issues. Chkdsk addresses disk errors, not network printing problems.",
      "examTip": "Network printer fails but everything else is online? Driver issues are suspect—update or reinstall first."
    },
    {
      "id": 93,
      "question": "A user with a Windows 10 laptop equipped with a fingerprint reader wants to enable Windows Hello for sign-in, but the option is unavailable. Which is the MOST likely reason?",
      "options": [
        "The user needs to disable the local firewall to allow biometric data processing.",
        "Windows Hello is only available on Windows 10 Pro or higher editions.",
        "The laptop's fingerprint driver is not installed or is out of date, preventing Hello setup.",
        "The user must have a Microsoft account instead of a local account."
      ],
      "correctAnswerIndex": 2,
      "explanation": "If Windows Hello doesn’t detect any compatible biometric device, it won’t allow setup. Ensuring that the correct fingerprint reader driver is installed and recognized typically resolves this. Windows Hello is supported on Home edition as well. A Microsoft account is not strictly required for biometric sign-in, and firewall rules do not affect local biometric enrollment.",
      "examTip": "For Hello to work, your device drivers must be up-to-date—no recognized sensor, no Hello."
    },
    {
      "id": 94,
      "question": "A user's Windows 10 PC keeps crashing with memory-related errors. Which built-in diagnostic tool is BEST to check for faulty RAM modules?",
      "options": [
        "System File Checker (sfc /scannow), to repair corrupted system files that might cause crashes.",
        "Windows Memory Diagnostic, specifically designed to test RAM for errors.",
        "Resource Monitor, to observe real-time memory usage and identify potential issues.",
        "Deployment Image Servicing and Management (DISM), to repair the Windows image."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Memory Diagnostic is correct because it runs tests on RAM at reboot to detect memory issues. Disk Defragmenter optimizes hard drive data placement but doesn’t test RAM. chkdsk /f checks for file system and disk errors, not RAM errors. System Information only displays hardware and OS information; it doesn’t diagnose faulty components.",
      "examTip": "RAM errors can mimic software issues—use Windows Memory Diagnostic to confirm if the sticks are going bad."
    },
    {
      "id": 95,
      "question": "A technician wants to set a system-wide environment variable in Windows. Which location in the Control Panel is BEST for editing environment variables?",
      "options": [
        "System > Advanced system settings > Environment Variables, for both user and system variables.",
        "System > Device Manager, to configure hardware-related environment variables.",
        "System and Security > Windows Defender Firewall, to set firewall-related environment variables.",
        "User Accounts > Change your environment variables, which only affects the current user."
      ],
      "correctAnswerIndex": 0,
      "explanation": "System > Advanced system settings is correct because that section contains the Environment Variables button, letting you define system and user variables. Network and Sharing Center is for network-related options. Programs and Features is for installing or uninstalling software. Ease of Access adjusts accessibility settings, not environment variables.",
      "examTip": "Environment Variables for everyone? Head to 'Advanced system settings' to set them globally."
    },
    {
      "id": 96,
      "question": "A technician wishes to ensure that all laptops in a small office apply the same Windows Updates at the same time without manually initiating each update. Which Windows technology facilitates this for a centralized approach?",
      "options": [
        "Configure Group Policy to define a specific update schedule for all domain-joined computers.",
        "Windows Server Update Services (WSUS), for centralized management and deployment of updates.",
        "Utilize a third-party patch management solution to control update distribution.",
        "Manually configure Windows Update settings on each laptop to check for updates simultaneously."
      ],
      "correctAnswerIndex": 1,
      "explanation": "Windows Server Update Services (WSUS) is correct because it centrally manages and deploys updates to Windows clients within a domain. Group Policy loopback merges user policies under certain conditions but does not handle Windows Updates specifically. Windows Defender Application Guard is about sandboxing the browser, not deploying updates. Network and Sharing Center manages network connections, not update distribution.",
      "examTip": "WSUS is a light-touch, centralized approach for distributing approved updates across a domain environment."
    },
    {
      "id": 97,
      "question": "A technician needs to diagnose intermittent network connectivity issues on a Windows 10 PC. Which built-in tool provides real-time network statistics and detailed information about active connections?",
      "options": [
        "Task Manager",
        "Resource Monitor",
        "Performance Monitor",
        "Event Viewer"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Resource Monitor offers detailed, real-time data on network usage by processes, active TCP connections, and overall network activity, making it ideal for diagnosing connectivity issues.",
      "examTip": "Resource Monitor is often overlooked—use it to pinpoint which process is saturating or dropping your network."
    },
    {
      "id": 98,
      "question": "Which command-line utility is used to view and modify the Boot Configuration Data (BCD) store on a Windows system?",
      "options": [
        "bcdedit",
        "bootrec",
        "diskpart",
        "sfc"
      ],
      "correctAnswerIndex": 0,
      "explanation": "bcdedit is specifically designed to view and modify the Boot Configuration Data store, which contains boot configuration parameters for Windows.",
      "examTip": "bcdedit gives you full control of your boot data—just tread carefully to avoid locking out your OS."
    },
    {
      "id": 99,
      "question": "Which Windows tool provides a graphical interface to monitor resource usage including CPU, memory, disk, and network activity, and can also be used to end tasks?",
      "options": [
        "Task Manager",
        "Performance Monitor",
        "Event Viewer",
        "Disk Management"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Task Manager offers real-time monitoring of system resources and the ability to terminate unresponsive processes, making it a fundamental tool for troubleshooting.",
      "examTip": "Task Manager is your quick fix for out-of-control processes—one click to end them and see resource stats."
    },
    {
      "id": 100,
      "question": "Which built-in Windows feature allows encryption of individual files and folders on an NTFS drive, helping to protect sensitive data?",
      "options": [
        "BitLocker",
        "Encrypted File System (EFS)",
        "Windows Defender",
        "SMB Encryption"
      ],
      "correctAnswerIndex": 1,
      "explanation": "EFS (Encrypted File System) enables users to encrypt specific files and folders on NTFS volumes, offering file-level security without encrypting the entire drive.",
      "examTip": "EFS is straightforward file-level encryption—no need to lock the entire disk if you just want a few folders safe."
    }
  ]
});
