db.tests.insertOne({
  "category": "serverplus",
  "testId": 4,
  "testName": "Server+ Practice Test #4 (Moderate)",
  "xpPerCorrect": 10,
  "questions": [
    {
      "id": 1,
      "question": "A server with dual power supplies experiences intermittent shutdowns despite both PSUs being connected. What is the most likely issue?",
      "options": [
        "Both PSUs are connected to the same circuit",
        "The server’s BIOS is overriding redundancy settings",
        "The PSUs have mismatched firmware versions",
        "The cooling fans are causing voltage drops"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Connecting both PSUs to the same circuit undermines redundancy; if that circuit fails or is overloaded, both PSUs lose power, causing shutdowns. BIOS settings might affect detection, firmware mismatches could cause errors, and fans don’t typically drop voltage enough to shut down a server.",
      "examTip": "Ensure redundant PSUs use separate circuits to avoid single-point failures."
    },
    {
      "id": 2,
      "question": "Which RAID configuration offers the best write performance for a database server while maintaining fault tolerance?",
      "options": [
        "RAID 5 with a hardware controller",
        "RAID 6 with write-back caching",
        "RAID 10 with SSDs",
        "RAID 1 with a software controller"
      ],
      "correctAnswerIndex": 2,
      "explanation": "RAID 10 combines striping and mirroring, delivering superior write performance with fault tolerance, especially with SSDs. RAID 5 and 6 suffer from parity calculation overhead, and software RAID 1 lacks hardware acceleration.",
      "examTip": "RAID 10 shines for performance-critical apps like databases—speed and safety."
    },
    {
      "id": 3,
      "question": "A technician notices a server’s SSD performance degrades over time. What factor is most likely responsible?",
      "options": [
        "High read-intensive workloads",
        "Wear from excessive write operations",
        "Insufficient RAID parity updates",
        "Overheating due to poor ventilation"
      ],
      "correctAnswerIndex": 1,
      "explanation": "SSDs degrade due to wear from write operations, as flash memory cells have limited write cycles. Read-intensive loads don’t wear SSDs, RAID parity isn’t a factor here, and overheating affects function, not gradual degradation.",
      "examTip": "Monitor SSD write endurance for long-term performance planning."
    },
    {
      "id": 4,
      "question": "Which network configuration ensures uninterrupted connectivity if a single switch fails in a server rack?",
      "options": [
        "NIC teaming with failover",
        "Single NIC with VLAN tagging",
        "Round-robin load balancing",
        "Static IP assignment"
      ],
      "correctAnswerIndex": 0,
      "explanation": "NIC teaming with failover links multiple NICs to different switches, ensuring connectivity if one switch fails. VLAN tagging organizes traffic, round-robin balances load, and static IPs don’t address hardware failure.",
      "examTip": "NIC teaming boosts network resilience—key for high availability."
    },
    {
      "id": 5,
      "question": "During a server audit, you find sensitive data unencrypted on a SAN. Which mitigation directly secures this data at rest?",
      "options": [
        "Enable SAN Fibre Channel zoning",
        "Implement AES-256 encryption on the drives",
        "Restrict SAN access with VLANs",
        "Deploy multifactor authentication for admins"
      ],
      "correctAnswerIndex": 1,
      "explanation": "AES-256 encryption secures data at rest on the SAN drives, making it unreadable without keys. Zoning and VLANs control access, and MFA secures admin logins, but only encryption protects the data itself.",
      "examTip": "Encryption is the ultimate safeguard for data at rest—prioritize it."
    },
    {
      "id": 6,
      "question": "A server running multiple VMs experiences high CPU utilization. What should be adjusted first to alleviate this?",
      "options": [
        "Increase VM memory allocation",
        "Reduce CPU overcommitment ratio",
        "Upgrade to faster SSD storage",
        "Add a second physical NIC"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Reducing CPU overcommitment limits the number of vCPUs assigned, easing the physical CPU load. Memory, storage, and NICs address different bottlenecks, not CPU overuse.",
      "examTip": "Overcommitted CPUs slow everything—balance resource allocation."
    },
    {
      "id": 7,
      "question": "Which backup strategy minimizes RPO for a critical server with frequent data changes?",
      "options": [
        "Daily full backups",
        "Hourly incremental backups",
        "Weekly differential backups",
        "Nightly synthetic full backups"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Hourly incremental backups reduce the Recovery Point Objective (RPO) by capturing changes frequently, minimizing potential data loss. Full, differential, and synthetic backups have larger gaps between captures.",
      "examTip": "Frequent backups shrink RPO—time matters for critical data."
    },
    {
      "id": 8,
      "question": "A server’s BIOS fails to detect a new RAID controller. What should you check first?",
      "options": [
        "RAID controller firmware version",
        "BIOS boot order settings",
        "PCIe slot compatibility",
        "RAID array configuration"
      ],
      "correctAnswerIndex": 2,
      "explanation": "PCIe slot compatibility (e.g., version, lane width) ensures the RAID controller is recognized by the BIOS. Firmware mismatches, boot order, and array config come after hardware detection.",
      "examTip": "Hardware recognition starts with physical compatibility—check the slot first."
    },
    {
      "id": 9,
      "question": "Which physical security measure most effectively prevents unauthorized access to a server rack during maintenance?",
      "options": [
        "CCTV monitoring with motion alerts",
        "Biometric locks on the rack door",
        "RFID badge entry to the data center",
        "Security guards at the facility entrance"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Biometric locks on the rack door provide direct, immediate access control during maintenance. CCTV monitors, RFID controls entry, and guards oversee the facility, but only biometrics secure the rack itself.",
      "examTip": "Layered security is key, but focus on the closest control point."
    },
    {
      "id": 10,
      "question": "A server’s network latency spikes during peak hours. What should you investigate first?",
      "options": [
        "CPU utilization on the server",
        "Network switch port saturation",
        "RAID controller cache settings",
        "Storage IOPS limits"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Network switch port saturation during peak hours can bottleneck traffic, increasing latency. CPU, RAID, and storage affect internal performance, not network latency directly.",
      "examTip": "Network issues often stem from infrastructure—start with the switch."
    },
    {
      "id": 11,
      "question": "Which file system supports snapshots and data integrity checks for a Linux server?",
      "options": [
        "NTFS",
        "ext4",
        "ZFS",
        "ReFS"
      ],
      "correctAnswerIndex": 2,
      "explanation": "ZFS offers snapshots and built-in data integrity checks, ideal for Linux. NTFS and ReFS are Windows-focused, and ext4 lacks native snapshot support.",
      "examTip": "ZFS stands out for advanced features—know its strengths."
    },
    {
      "id": 12,
      "question": "A server fails to boot after a power outage, displaying a CMOS error. What should you replace?",
      "options": [
        "RAID controller battery",
        "System RAM modules",
        "CMOS battery",
        "Power supply unit"
      ],
      "correctAnswerIndex": 2,
      "explanation": "A CMOS error after a power outage indicates a failed CMOS battery, which maintains BIOS settings. RAID batteries, RAM, and PSUs don’t store CMOS data.",
      "examTip": "CMOS errors point to the battery—quick fix for boot issues."
    },
    {
      "id": 13,
      "question": "Which high-availability feature ensures automatic failover between two servers?",
      "options": [
        "Load balancing with round-robin",
        "Active-passive clustering",
        "NIC teaming with aggregation",
        "RAID 5 parity"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Active-passive clustering automatically fails over to a standby server if the primary fails. Load balancing distributes traffic, NIC teaming enhances networking, and RAID protects storage.",
      "examTip": "Clustering ensures uptime—active-passive is failover-ready."
    },
    {
      "id": 14,
      "question": "A server’s iSCSI SAN connection drops intermittently. What should you check first?",
      "options": [
        "RAID controller firmware",
        "Network switch jumbo frame settings",
        "SAN disk array health",
        "Server BIOS settings"
      ],
      "correctAnswerIndex": 1,
      "explanation": "iSCSI relies on network stability; misconfigured jumbo frames on the switch can cause drops. RAID firmware, SAN health, and BIOS are secondary checks for this network issue.",
      "examTip": "iSCSI issues often trace back to network config—start there."
    },
    {
      "id": 15,
      "question": "Which disaster recovery site type requires the longest setup time after a failure?",
      "options": [
        "Hot site",
        "Warm site",
        "Cold site",
        "Cloud site"
      ],
      "correctAnswerIndex": 2,
      "explanation": "A cold site has minimal pre-configured equipment, requiring significant setup time post-failure. Hot sites are ready instantly, warm sites need some setup, and cloud sites vary but are typically faster.",
      "examTip": "Cold sites are cheap but slow—know recovery tradeoffs."
    },
    {
      "id": 16,
      "question": "A server’s application hangs, but the OS remains responsive. Where should you look first for clues?",
      "options": [
        "System event logs",
        "Application event logs",
        "BIOS error codes",
        "Network switch logs"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Application event logs record app-specific issues like crashes or hangs. System logs cover OS/hardware, BIOS codes indicate boot errors, and switch logs track networking.",
      "examTip": "Application hangs mean app logs first—target the problem source."
    },
    {
      "id": 17,
      "question": "Which storage interface supports higher bandwidth and is commonly used in enterprise SANs?",
      "options": [
        "SATA",
        "SAS",
        "Fibre Channel",
        "USB"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Fibre Channel provides high bandwidth and low latency, making it standard for enterprise SANs. SATA and SAS are for local drives, and USB is external, not SAN-suited.",
      "examTip": "Fibre Channel rules SANs—high speed for enterprise needs."
    },
    {
      "id": 18,
      "question": "A server’s NIC fails, but connectivity persists. What configuration is likely in place?",
      "options": [
        "VLAN tagging on a single NIC",
        "NIC teaming with failover",
        "Static routing tables",
        "Bridged virtual networking"
      ],
      "correctAnswerIndex": 1,
      "explanation": "NIC teaming with failover switches to a backup NIC if one fails, maintaining connectivity. VLANs, routing, and bridging don’t provide this redundancy.",
      "examTip": "Failover in NIC teaming keeps you connected—redundancy rules."
    },
    {
      "id": 19,
      "question": "Which scripting language is native to Windows for automating server administration tasks?",
      "options": [
        "Bash",
        "Python",
        "PowerShell",
        "Perl"
      ],
      "correctAnswerIndex": 2,
      "explanation": "PowerShell is Microsoft’s native scripting language for Windows automation. Bash is Linux-based, Python and Perl are cross-platform but not native to Windows.",
      "examTip": "PowerShell is Windows’ automation king—learn its commands."
    },
    {
      "id": 20,
      "question": "A server’s RAID 5 array reports slow write performance. What is the most likely cause?",
      "options": [
        "Insufficient CPU resources",
        "Parity calculation overhead",
        "Overloaded network bandwidth",
        "Faulty RAID controller battery"
      ],
      "correctAnswerIndex": 1,
      "explanation": "RAID 5’s parity calculations slow write performance due to additional processing. CPU, network, and battery issues affect other aspects, not write speed directly.",
      "examTip": "RAID 5 trades write speed for redundancy—parity is the culprit."
    },
    {
      "id": 21,
      "question": "Which security practice ensures only necessary ports are open on a server?",
      "options": [
        "Applying OS patches",
        "Configuring firewall rules",
        "Using strong passwords",
        "Enabling MFA"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Firewall rules restrict open ports to only what’s needed, reducing the attack surface. Patching, passwords, and MFA enhance security but don’t control ports.",
      "examTip": "Firewalls lock down ports—tighten them up."
    },
    {
      "id": 22,
      "question": "A server’s memory errors cause random crashes. What should you do first?",
      "options": [
        "Update the BIOS firmware",
        "Reseat the RAM modules",
        "Increase swap space",
        "Replace the CPU"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Reseating RAM modules fixes loose connections, a common cause of memory errors. BIOS updates, swap space, and CPU replacement are less immediate solutions.",
      "examTip": "Memory issues? Reseat first—simple fixes save time."
    },
    {
      "id": 23,
      "question": "Which virtualization networking mode assigns VMs their own IP addresses on the physical network?",
      "options": [
        "NAT",
        "Bridged",
        "Host-only",
        "Internal"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Bridged mode connects VMs directly to the physical network, assigning unique IPs. NAT shares the host’s IP, host-only isolates VMs, and internal limits to VM-to-VM.",
      "examTip": "Bridged VMs act like physical devices—full network integration."
    },
    {
      "id": 24,
      "question": "A server’s backup fails due to insufficient space. What should you adjust?",
      "options": [
        "Increase RAID array capacity",
        "Reduce backup retention period",
        "Upgrade network bandwidth",
        "Add more VM CPU cores"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Reducing the retention period frees up space by deleting older backups. RAID capacity adds storage, but retention directly addresses space usage; bandwidth and CPU are unrelated.",
      "examTip": "Backup space issues? Trim retention—quick and effective."
    },
    {
      "id": 25,
      "question": "Which command verifies network connectivity to a remote server?",
      "options": [
        "ipconfig",
        "netstat",
        "ping",
        "tracert"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Ping tests connectivity by sending packets to a remote server and awaiting a response. ipconfig shows config, netstat shows connections, and tracert traces routes.",
      "examTip": "Ping is your first network test—simple and fast."
    },
    {
      "id": 26,
      "question": "A server’s disk IOPS are consistently maxed out. What should you upgrade first?",
      "options": [
        "CPU clock speed",
        "RAM capacity",
        "Storage to faster SSDs",
        "Network to 10GbE"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Upgrading to faster SSDs increases IOPS, directly addressing disk performance. CPU, RAM, and network upgrades help other areas, not IOPS.",
      "examTip": "IOPS bottlenecks need storage speed—SSDs are the fix."
    },
    {
      "id": 27,
      "question": "Which physical control best prevents tailgating into a server room?",
      "options": [
        "Security cameras",
        "Mantrap entry system",
        "RFID card readers",
        "Perimeter fencing"
      ],
      "correctAnswerIndex": 1,
      "explanation": "A mantrap allows only one person through at a time, preventing tailgating. Cameras monitor, RFID controls access, and fencing secures perimeters, but none stop tailgating directly.",
      "examTip": "Mantraps enforce single entry—anti-tailgating champs."
    },
    {
      "id": 28,
      "question": "A server’s RAID 6 array loses two drives. What is the operational impact?",
      "options": [
        "Array fails, data is lost",
        "Array remains operational",
        "Performance drops significantly",
        "Rebuild starts automatically"
      ],
      "correctAnswerIndex": 1,
      "explanation": "RAID 6 tolerates two drive failures with dual parity, keeping the array operational. Data isn’t lost, performance may dip slightly, and rebuild requires replacement drives.",
      "examTip": "RAID 6 handles two failures—redundancy at its best."
    },
    {
      "id": 29,
      "question": "Which protocol secures data in transit between a server and a client?",
      "options": [
        "HTTP",
        "HTTPS",
        "FTP",
        "SNMP"
      ],
      "correctAnswerIndex": 1,
      "explanation": "HTTPS (HTTP Secure) encrypts data in transit using SSL/TLS. HTTP, FTP, and SNMP lack inherent encryption for this purpose.",
      "examTip": "HTTPS means secure transit—look for the ‘S’."
    },
    {
      "id": 30,
      "question": "A server’s fans run at maximum speed unexpectedly. What should you check first?",
      "options": [
        "RAID controller status",
        "Temperature sensor readings",
        "BIOS fan control settings",
        "Power supply voltage"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Faulty temperature sensors can trigger fans to max out as a failsafe. RAID, BIOS, and PSU issues are less likely to cause this directly.",
      "examTip": "Fan spikes often mean sensor trouble—check temps first."
    },
    {
      "id": 31,
      "question": "Which licensing model suits a server hosting multiple VMs with varying workloads?",
      "options": [
        "Per-core licensing",
        "Per-user licensing",
        "Per-server licensing",
        "Per-socket licensing"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Per-core licensing scales with VM workloads, leveraging multi-core CPUs efficiently. Per-user fits concurrent users, per-server limits flexibility, and per-socket is less granular.",
      "examTip": "Per-core licensing flexes with virtualization—ideal for VMs."
    },
    {
      "id": 32,
      "question": "A server’s OS installation fails due to hardware incompatibility. Where should you verify compatibility?",
      "options": [
        "RAID controller logs",
        "Hardware Compatibility List (HCL)",
        "System event logs",
        "Vendor firmware notes"
      ],
      "correctAnswerIndex": 1,
      "explanation": "The HCL lists supported hardware for an OS, ensuring compatibility. Logs and firmware notes help post-install, not pre-check.",
      "examTip": "HCL is your pre-install checklist—avoid compatibility woes."
    },
    {
      "id": 33,
      "question": "Which replication method ensures zero data loss between two sites?",
      "options": [
        "Asynchronous replication",
        "Synchronous replication",
        "Incremental replication",
        "Snapshot replication"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Synchronous replication writes data to both sites simultaneously, ensuring zero loss. Asynchronous allows lag, incremental is backup-based, and snapshots are point-in-time.",
      "examTip": "Synchronous means no lag—no loss."
    },
    {
      "id": 34,
      "question": "A server’s virtual switch fails to pass traffic. What should you check first?",
      "options": [
        "Physical NIC link status",
        "VM guest OS settings",
        "Hypervisor firewall rules",
        "RAID array status"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A virtual switch relies on the physical NIC; if the link is down, traffic stops. Guest OS, firewall, and RAID are downstream issues.",
      "examTip": "Virtual networking starts with physical links—check NICs first."
    },
    {
      "id": 35,
      "question": "Which decommissioning step ensures data cannot be recovered from a server’s drives?",
      "options": [
        "Formatting the drives",
        "Multiple-pass disk wiping",
        "Removing drives from RAID",
        "Reinstalling the OS"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Multiple-pass disk wiping overwrites data, making recovery nearly impossible. Formatting, RAID removal, and OS reinstalls leave data recoverable.",
      "examTip": "Wipe drives thoroughly—security demands it."
    },
    {
      "id": 36,
      "question": "A server’s application performance drops after a patch. What should you do first?",
      "options": [
        "Roll back the patch",
        "Increase VM resources",
        "Check application logs",
        "Upgrade the hardware"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Application logs reveal why performance dropped post-patch (e.g., errors or incompatibilities). Rolling back, adding resources, or upgrading come after diagnosis.",
      "examTip": "Logs are your first clue post-patch—diagnose before acting."
    },
    {
      "id": 37,
      "question": "Which network cable type supports 10GbE over 100 meters?",
      "options": [
        "Cat5e",
        "Cat6",
        "Cat6a",
        "Cat7"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Cat6a supports 10GbE up to 100 meters reliably. Cat5e tops at 1GbE, Cat6 at 55 meters for 10GbE, and Cat7 is overkill for most uses.",
      "examTip": "Cat6a is the sweet spot for 10GbE—range and speed."
    },
    {
      "id": 38,
      "question": "A server’s RAID controller battery fails. What is the immediate impact?",
      "options": [
        "Array goes offline",
        "Write performance decreases",
        "Data is lost on reboot",
        "Read speeds drop"
      ],
      "correctAnswerIndex": 1,
      "explanation": "A failed RAID battery disables write-back caching, forcing write-through mode and slowing writes. The array stays online, data isn’t lost, and reads are unaffected.",
      "examTip": "Battery failure hits write speed—cache matters."
    },
    {
      "id": 39,
      "question": "Which access control model assigns permissions based on job roles?",
      "options": [
        "DAC",
        "MAC",
        "RBAC",
        "Rule-based"
      ],
      "correctAnswerIndex": 2,
      "explanation": "RBAC (Role-Based Access Control) ties permissions to roles, simplifying management. DAC is discretionary, MAC is mandatory, and rule-based uses conditions.",
      "examTip": "RBAC aligns with jobs—streamlines permissions."
    },
    {
      "id": 40,
      "question": "A server’s SAN performance drops. What should you check first?",
      "options": [
        "RAID parity settings",
        "Fibre Channel HBA status",
        "Server CPU utilization",
        "Network switch logs"
      ],
      "correctAnswerIndex": 1,
      "explanation": "The Fibre Channel HBA connects the server to the SAN; if it’s failing, performance drops. RAID, CPU, and switch issues are secondary for SAN-specific problems.",
      "examTip": "SAN issues? Check the HBA—your SAN lifeline."
    },
    {
      "id": 41,
      "question": "Which backup method combines incremental backups into a single file for faster restores?",
      "options": [
        "Differential",
        "Synthetic full",
        "Snapshot",
        "Full"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Synthetic full backups merge incremental backups into one file, speeding up restores. Differential grows over time, snapshots are instant copies, and full is standalone.",
      "examTip": "Synthetic full speeds restores—efficiency in action."
    },
    {
      "id": 42,
      "question": "A server’s disk fails in a RAID 1 array. What should you do first?",
      "options": [
        "Rebuild the array immediately",
        "Replace the failed disk",
        "Back up the remaining data",
        "Update the RAID firmware"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Backing up the remaining data protects against a second failure during replacement. Replacing or rebuilding without backup risks total loss, and firmware isn’t urgent.",
      "examTip": "Backup first in RAID failures—safety over speed."
    },
    {
      "id": 43,
      "question": "Which network troubleshooting tool traces the path packets take to a destination?",
      "options": [
        "ping",
        "netstat",
        "tracert",
        "nslookup"
      ],
      "correctAnswerIndex": 2,
      "explanation": "tracert (traceroute) maps the packet path, identifying latency or failures. Ping tests reachability, netstat shows connections, and nslookup resolves DNS.",
      "examTip": "tracert finds the route—great for pinpointing network issues."
    },
    {
      "id": 44,
      "question": "A server’s VM fails to start after a hypervisor update. What should you check first?",
      "options": [
        "VM guest OS patches",
        "Hypervisor compatibility with VM",
        "Physical NIC status",
        "Storage array health"
      ],
      "correctAnswerIndex": 1,
      "explanation": "A hypervisor update may break VM compatibility (e.g., version mismatch), preventing startup. Guest OS, NIC, and storage are downstream issues.",
      "examTip": "Post-update VM issues? Check hypervisor compatibility first."
    },
    {
      "id": 45,
      "question": "Which physical security feature protects against electromagnetic interference (EMI) in a server room?",
      "options": [
        "Biometric locks",
        "Faraday cage shielding",
        "Mantrap systems",
        "CCTV cameras"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Faraday cage shielding blocks EMI, protecting sensitive equipment. Locks, mantraps, and cameras secure access, not EMI.",
      "examTip": "EMI needs shielding—Faraday is your friend."
    },
    {
      "id": 46,
      "question": "A server’s RAID 10 array loses one drive. What is the operational status?",
      "options": [
        "Array fails completely",
        "Array remains fully operational",
        "Performance drops significantly",
        "Data is inaccessible until rebuilt"
      ],
      "correctAnswerIndex": 1,
      "explanation": "RAID 10 mirrors and stripes; one drive loss per mirror set leaves the array operational, though redundancy is reduced. Performance may dip slightly, but data stays accessible.",
      "examTip": "RAID 10 survives single failures—mirrors save the day."
    },
    {
      "id": 47,
      "question": "Which protocol ensures secure management of network devices with encryption?",
      "options": [
        "SNMPv1",
        "SNMPv3",
        "Telnet",
        "FTP"
      ],
      "correctAnswerIndex": 1,
      "explanation": "SNMPv3 provides encrypted management of network devices. SNMPv1 lacks security, Telnet is insecure, and FTP transfers files.",
      "examTip": "SNMPv3 secures device management—v3 is the key."
    },
    {
      "id": 48,
      "question": "A server’s performance degrades during backups. What should you adjust?",
      "options": [
        "Increase CPU cores",
        "Schedule backups off-peak",
        "Upgrade to faster RAM",
        "Add a second NIC"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Scheduling backups during off-peak hours reduces contention with live workloads. Hardware upgrades help but don’t address timing conflicts directly.",
      "examTip": "Timing backups avoids peak load—plan wisely."
    },
    {
      "id": 49,
      "question": "Which documentation type tracks server hardware lifecycle and warranty details?",
      "options": [
        "Network diagrams",
        "Asset inventory",
        "Performance baselines",
        "Disaster recovery plans"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Asset inventory logs hardware details like serial numbers, warranties, and lifecycle status. Diagrams map networks, baselines track performance, and DR plans outline recovery.",
      "examTip": "Asset inventory is your hardware ledger—track everything."
    },
    {
      "id": 50,
      "question": "A server’s NTP sync fails, causing log timestamp issues. What should you check first?",
      "options": [
        "Firewall port 123 status",
        "DNS resolution for NTP server",
        "Server BIOS clock settings",
        "Network switch latency"
      ],
      "correctAnswerIndex": 0,
      "explanation": "NTP uses UDP port 123; a blocked firewall port prevents sync. DNS, BIOS, and latency are secondary if the port is closed.",
      "examTip": "NTP needs port 123 open—firewall is the first stop."
    },
    {
      "id": 1,
      "question": "A server with dual power supplies experiences intermittent shutdowns despite both PSUs being connected. What is the most likely issue?",
      "options": [
        "Both PSUs are connected to the same circuit",
        "The server’s BIOS is overriding redundancy settings",
        "The PSUs have mismatched firmware versions",
        "The cooling fans are causing voltage drops"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Connecting both PSUs to the same circuit undermines redundancy; if that circuit fails or is overloaded, both PSUs lose power, causing shutdowns. BIOS settings might affect detection, firmware mismatches could cause errors, and fans don’t typically drop voltage enough to shut down a server.",
      "examTip": "Ensure redundant PSUs use separate circuits to avoid single-point failures."
    },
    {
      "id": 2,
      "question": "Which RAID configuration offers the best write performance for a database server while maintaining fault tolerance?",
      "options": [
        "RAID 5 with a hardware controller",
        "RAID 6 with write-back caching",
        "RAID 10 with SSDs",
        "RAID 1 with a software controller"
      ],
      "correctAnswerIndex": 2,
      "explanation": "RAID 10 combines striping and mirroring, delivering superior write performance with fault tolerance, especially with SSDs. RAID 5 and 6 suffer from parity calculation overhead, and software RAID 1 lacks hardware acceleration.",
      "examTip": "RAID 10 shines for performance-critical apps like databases—speed and safety."
    },
    {
      "id": 3,
      "question": "A technician notices a server’s SSD performance degrades over time. What factor is most likely responsible?",
      "options": [
        "High read-intensive workloads",
        "Wear from excessive write operations",
        "Insufficient RAID parity updates",
        "Overheating due to poor ventilation"
      ],
      "correctAnswerIndex": 1,
      "explanation": "SSDs degrade due to wear from write operations, as flash memory cells have limited write cycles. Read-intensive loads don’t wear SSDs, RAID parity isn’t a factor here, and overheating affects function, not gradual degradation.",
      "examTip": "Monitor SSD write endurance for long-term performance planning."
    },
    {
      "id": 4,
      "question": "Which network configuration ensures uninterrupted connectivity if a single switch fails in a server rack?",
      "options": [
        "NIC teaming with failover",
        "Single NIC with VLAN tagging",
        "Round-robin load balancing",
        "Static IP assignment"
      ],
      "correctAnswerIndex": 0,
      "explanation": "NIC teaming with failover links multiple NICs to different switches, ensuring connectivity if one switch fails. VLAN tagging organizes traffic, round-robin balances load, and static IPs don’t address hardware failure.",
      "examTip": "NIC teaming boosts network resilience—key for high availability."
    },
    {
      "id": 5,
      "question": "During a server audit, you find sensitive data unencrypted on a SAN. Which mitigation directly secures this data at rest?",
      "options": [
        "Enable SAN Fibre Channel zoning",
        "Implement AES-256 encryption on the drives",
        "Restrict SAN access with VLANs",
        "Deploy multifactor authentication for admins"
      ],
      "correctAnswerIndex": 1,
      "explanation": "AES-256 encryption secures data at rest on the SAN drives, making it unreadable without keys. Zoning and VLANs control access, and MFA secures admin logins, but only encryption protects the data itself.",
      "examTip": "Encryption is the ultimate safeguard for data at rest—prioritize it."
    },
    {
      "id": 6,
      "question": "A server running multiple VMs experiences high CPU utilization. What should be adjusted first to alleviate this?",
      "options": [
        "Increase VM memory allocation",
        "Reduce CPU overcommitment ratio",
        "Upgrade to faster SSD storage",
        "Add a second physical NIC"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Reducing CPU overcommitment limits the number of vCPUs assigned, easing the physical CPU load. Memory, storage, and NICs address different bottlenecks, not CPU overuse.",
      "examTip": "Overcommitted CPUs slow everything—balance resource allocation."
    },
    {
      "id": 7,
      "question": "Which backup strategy minimizes RPO for a critical server with frequent data changes?",
      "options": [
        "Daily full backups",
        "Hourly incremental backups",
        "Weekly differential backups",
        "Nightly synthetic full backups"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Hourly incremental backups reduce the Recovery Point Objective (RPO) by capturing changes frequently, minimizing potential data loss. Full, differential, and synthetic backups have larger gaps between captures.",
      "examTip": "Frequent backups shrink RPO—time matters for critical data."
    },
    {
      "id": 8,
      "question": "A server’s BIOS fails to detect a new RAID controller. What should you check first?",
      "options": [
        "RAID controller firmware version",
        "BIOS boot order settings",
        "PCIe slot compatibility",
        "RAID array configuration"
      ],
      "correctAnswerIndex": 2,
      "explanation": "PCIe slot compatibility (e.g., version, lane width) ensures the RAID controller is recognized by the BIOS. Firmware mismatches, boot order, and array config come after hardware detection.",
      "examTip": "Hardware recognition starts with physical compatibility—check the slot first."
    },
    {
      "id": 9,
      "question": "Which physical security measure most effectively prevents unauthorized access to a server rack during maintenance?",
      "options": [
        "CCTV monitoring with motion alerts",
        "Biometric locks on the rack door",
        "RFID badge entry to the data center",
        "Security guards at the facility entrance"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Biometric locks on the rack door provide direct, immediate access control during maintenance. CCTV monitors, RFID controls entry, and guards oversee the facility, but only biometrics secure the rack itself.",
      "examTip": "Layered security is key, but focus on the closest control point."
    },
    {
      "id": 10,
      "question": "A server’s network latency spikes during peak hours. What should you investigate first?",
      "options": [
        "CPU utilization on the server",
        "Network switch port saturation",
        "RAID controller cache settings",
        "Storage IOPS limits"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Network switch port saturation during peak hours can bottleneck traffic, increasing latency. CPU, RAID, and storage affect internal performance, not network latency directly.",
      "examTip": "Network issues often stem from infrastructure—start with the switch."
    },
    {
      "id": 11,
      "question": "Which file system supports snapshots and data integrity checks for a Linux server?",
      "options": [
        "NTFS",
        "ext4",
        "ZFS",
        "ReFS"
      ],
      "correctAnswerIndex": 2,
      "explanation": "ZFS offers snapshots and built-in data integrity checks, ideal for Linux. NTFS and ReFS are Windows-focused, and ext4 lacks native snapshot support.",
      "examTip": "ZFS stands out for advanced features—know its strengths."
    },
    {
      "id": 12,
      "question": "A server fails to boot after a power outage, displaying a CMOS error. What should you replace?",
      "options": [
        "RAID controller battery",
        "System RAM modules",
        "CMOS battery",
        "Power supply unit"
      ],
      "correctAnswerIndex": 2,
      "explanation": "A CMOS error after a power outage indicates a failed CMOS battery, which maintains BIOS settings. RAID batteries, RAM, and PSUs don’t store CMOS data.",
      "examTip": "CMOS errors point to the battery—quick fix for boot issues."
    },
    {
      "id": 13,
      "question": "Which high-availability feature ensures automatic failover between two servers?",
      "options": [
        "Load balancing with round-robin",
        "Active-passive clustering",
        "NIC teaming with aggregation",
        "RAID 5 parity"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Active-passive clustering automatically fails over to a standby server if the primary fails. Load balancing distributes traffic, NIC teaming enhances networking, and RAID protects storage.",
      "examTip": "Clustering ensures uptime—active-passive is failover-ready."
    },
    {
      "id": 14,
      "question": "A server’s iSCSI SAN connection drops intermittently. What should you check first?",
      "options": [
        "RAID controller firmware",
        "Network switch jumbo frame settings",
        "SAN disk array health",
        "Server BIOS settings"
      ],
      "correctAnswerIndex": 1,
      "explanation": "iSCSI relies on network stability; misconfigured jumbo frames on the switch can cause drops. RAID firmware, SAN health, and BIOS are secondary checks for this network issue.",
      "examTip": "iSCSI issues often trace back to network config—start there."
    },
    {
      "id": 15,
      "question": "Which disaster recovery site type requires the longest setup time after a failure?",
      "options": [
        "Hot site",
        "Warm site",
        "Cold site",
        "Cloud site"
      ],
      "correctAnswerIndex": 2,
      "explanation": "A cold site has minimal pre-configured equipment, requiring significant setup time post-failure. Hot sites are ready instantly, warm sites need some setup, and cloud sites vary but are typically faster.",
      "examTip": "Cold sites are cheap but slow—know recovery tradeoffs."
    },
    {
      "id": 16,
      "question": "A server’s application hangs, but the OS remains responsive. Where should you look first for clues?",
      "options": [
        "System event logs",
        "Application event logs",
        "BIOS error codes",
        "Network switch logs"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Application event logs record app-specific issues like crashes or hangs. System logs cover OS/hardware, BIOS codes indicate boot errors, and switch logs track networking.",
      "examTip": "Application hangs mean app logs first—target the problem source."
    },
    {
      "id": 17,
      "question": "Which storage interface supports higher bandwidth and is commonly used in enterprise SANs?",
      "options": [
        "SATA",
        "SAS",
        "Fibre Channel",
        "USB"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Fibre Channel provides high bandwidth and low latency, making it standard for enterprise SANs. SATA and SAS are for local drives, and USB is external, not SAN-suited.",
      "examTip": "Fibre Channel rules SANs—high speed for enterprise needs."
    },
    {
      "id": 18,
      "question": "A server’s NIC fails, but connectivity persists. What configuration is likely in place?",
      "options": [
        "VLAN tagging on a single NIC",
        "NIC teaming with failover",
        "Static routing tables",
        "Bridged virtual networking"
      ],
      "correctAnswerIndex": 1,
      "explanation": "NIC teaming with failover switches to a backup NIC if one fails, maintaining connectivity. VLANs, routing, and bridging don’t provide this redundancy.",
      "examTip": "Failover in NIC teaming keeps you connected—redundancy rules."
    },
    {
      "id": 19,
      "question": "Which scripting language is native to Windows for automating server administration tasks?",
      "options": [
        "Bash",
        "Python",
        "PowerShell",
        "Perl"
      ],
      "correctAnswerIndex": 2,
      "explanation": "PowerShell is Microsoft’s native scripting language for Windows automation. Bash is Linux-based, Python and Perl are cross-platform but not native to Windows.",
      "examTip": "PowerShell is Windows’ automation king—learn its commands."
    },
    {
      "id": 20,
      "question": "A server’s RAID 5 array reports slow write performance. What is the most likely cause?",
      "options": [
        "Insufficient CPU resources",
        "Parity calculation overhead",
        "Overloaded network bandwidth",
        "Faulty RAID controller battery"
      ],
      "correctAnswerIndex": 1,
      "explanation": "RAID 5’s parity calculations slow write performance due to additional processing. CPU, network, and battery issues affect other aspects, not write speed directly.",
      "examTip": "RAID 5 trades write speed for redundancy—parity is the culprit."
    },
    {
      "id": 21,
      "question": "Which security practice ensures only necessary ports are open on a server?",
      "options": [
        "Applying OS patches",
        "Configuring firewall rules",
        "Using strong passwords",
        "Enabling MFA"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Firewall rules restrict open ports to only what’s needed, reducing the attack surface. Patching, passwords, and MFA enhance security but don’t control ports.",
      "examTip": "Firewalls lock down ports—tighten them up."
    },
    {
      "id": 22,
      "question": "A server’s memory errors cause random crashes. What should you do first?",
      "options": [
        "Update the BIOS firmware",
        "Reseat the RAM modules",
        "Increase swap space",
        "Replace the CPU"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Reseating RAM modules fixes loose connections, a common cause of memory errors. BIOS updates, swap space, and CPU replacement are less immediate solutions.",
      "examTip": "Memory issues? Reseat first—simple fixes save time."
    },
    {
      "id": 23,
      "question": "Which virtualization networking mode assigns VMs their own IP addresses on the physical network?",
      "options": [
        "NAT",
        "Bridged",
        "Host-only",
        "Internal"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Bridged mode connects VMs directly to the physical network, assigning unique IPs. NAT shares the host’s IP, host-only isolates VMs, and internal limits to VM-to-VM.",
      "examTip": "Bridged VMs act like physical devices—full network integration."
    },
    {
      "id": 24,
      "question": "A server’s backup fails due to insufficient space. What should you adjust?",
      "options": [
        "Increase RAID array capacity",
        "Reduce backup retention period",
        "Upgrade network bandwidth",
        "Add more VM CPU cores"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Reducing the retention period frees up space by deleting older backups. RAID capacity adds storage, but retention directly addresses space usage; bandwidth and CPU are unrelated.",
      "examTip": "Backup space issues? Trim retention—quick and effective."
    },
    {
      "id": 25,
      "question": "Which command verifies network connectivity to a remote server?",
      "options": [
        "ipconfig",
        "netstat",
        "ping",
        "tracert"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Ping tests connectivity by sending packets to a remote server and awaiting a response. ipconfig shows config, netstat shows connections, and tracert traces routes.",
      "examTip": "Ping is your first network test—simple and fast."
    },
    {
      "id": 26,
      "question": "A server’s disk IOPS are consistently maxed out. What should you upgrade first?",
      "options": [
        "CPU clock speed",
        "RAM capacity",
        "Storage to faster SSDs",
        "Network to 10GbE"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Upgrading to faster SSDs increases IOPS, directly addressing disk performance. CPU, RAM, and network upgrades help other areas, not IOPS.",
      "examTip": "IOPS bottlenecks need storage speed—SSDs are the fix."
    },
    {
      "id": 27,
      "question": "Which physical control best prevents tailgating into a server room?",
      "options": [
        "Security cameras",
        "Mantrap entry system",
        "RFID card readers",
        "Perimeter fencing"
      ],
      "correctAnswerIndex": 1,
      "explanation": "A mantrap allows only one person through at a time, preventing tailgating. Cameras monitor, RFID controls access, and fencing secures perimeters, but none stop tailgating directly.",
      "examTip": "Mantraps enforce single entry—anti-tailgating champs."
    },
    {
      "id": 28,
      "question": "A server’s RAID 6 array loses two drives. What is the operational impact?",
      "options": [
        "Array fails, data is lost",
        "Array remains operational",
        "Performance drops significantly",
        "Rebuild starts automatically"
      ],
      "correctAnswerIndex": 1,
      "explanation": "RAID 6 tolerates two drive failures with dual parity, keeping the array operational. Data isn’t lost, performance may dip slightly, and rebuild requires replacement drives.",
      "examTip": "RAID 6 handles two failures—redundancy at its best."
    },
    {
      "id": 29,
      "question": "Which protocol secures data in transit between a server and a client?",
      "options": [
        "HTTP",
        "HTTPS",
        "FTP",
        "SNMP"
      ],
      "correctAnswerIndex": 1,
      "explanation": "HTTPS (HTTP Secure) encrypts data in transit using SSL/TLS. HTTP, FTP, and SNMP lack inherent encryption for this purpose.",
      "examTip": "HTTPS means secure transit—look for the ‘S’."
    },
    {
      "id": 30,
      "question": "A server’s fans run at maximum speed unexpectedly. What should you check first?",
      "options": [
        "RAID controller status",
        "Temperature sensor readings",
        "BIOS fan control settings",
        "Power supply voltage"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Faulty temperature sensors can trigger fans to max out as a failsafe. RAID, BIOS, and PSU issues are less likely to cause this directly.",
      "examTip": "Fan spikes often mean sensor trouble—check temps first."
    },
    {
      "id": 31,
      "question": "Which licensing model suits a server hosting multiple VMs with varying workloads?",
      "options": [
        "Per-core licensing",
        "Per-user licensing",
        "Per-server licensing",
        "Per-socket licensing"
      ],
      "correctAnswerIndex": 0,
      "explanation": "Per-core licensing scales with VM workloads, leveraging multi-core CPUs efficiently. Per-user fits concurrent users, per-server limits flexibility, and per-socket is less granular.",
      "examTip": "Per-core licensing flexes with virtualization—ideal for VMs."
    },
    {
      "id": 32,
      "question": "A server’s OS installation fails due to hardware incompatibility. Where should you verify compatibility?",
      "options": [
        "RAID controller logs",
        "Hardware Compatibility List (HCL)",
        "System event logs",
        "Vendor firmware notes"
      ],
      "correctAnswerIndex": 1,
      "explanation": "The HCL lists supported hardware for an OS, ensuring compatibility. Logs and firmware notes help post-install, not pre-check.",
      "examTip": "HCL is your pre-install checklist—avoid compatibility woes."
    },
    {
      "id": 33,
      "question": "Which replication method ensures zero data loss between two sites?",
      "options": [
        "Asynchronous replication",
        "Synchronous replication",
        "Incremental replication",
        "Snapshot replication"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Synchronous replication writes data to both sites simultaneously, ensuring zero loss. Asynchronous allows lag, incremental is backup-based, and snapshots are point-in-time.",
      "examTip": "Synchronous means no lag—no loss."
    },
    {
      "id": 34,
      "question": "A server’s virtual switch fails to pass traffic. What should you check first?",
      "options": [
        "Physical NIC link status",
        "VM guest OS settings",
        "Hypervisor firewall rules",
        "RAID array status"
      ],
      "correctAnswerIndex": 0,
      "explanation": "A virtual switch relies on the physical NIC; if the link is down, traffic stops. Guest OS, firewall, and RAID are downstream issues.",
      "examTip": "Virtual networking starts with physical links—check NICs first."
    },
    {
      "id": 35,
      "question": "Which decommissioning step ensures data cannot be recovered from a server’s drives?",
      "options": [
        "Formatting the drives",
        "Multiple-pass disk wiping",
        "Removing drives from RAID",
        "Reinstalling the OS"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Multiple-pass disk wiping overwrites data, making recovery nearly impossible. Formatting, RAID removal, and OS reinstalls leave data recoverable.",
      "examTip": "Wipe drives thoroughly—security demands it."
    },
    {
      "id": 36,
      "question": "A server’s application performance drops after a patch. What should you do first?",
      "options": [
        "Roll back the patch",
        "Increase VM resources",
        "Check application logs",
        "Upgrade the hardware"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Application logs reveal why performance dropped post-patch (e.g., errors or incompatibilities). Rolling back, adding resources, or upgrading come after diagnosis.",
      "examTip": "Logs are your first clue post-patch—diagnose before acting."
    },
    {
      "id": 37,
      "question": "Which network cable type supports 10GbE over 100 meters?",
      "options": [
        "Cat5e",
        "Cat6",
        "Cat6a",
        "Cat7"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Cat6a supports 10GbE up to 100 meters reliably. Cat5e tops at 1GbE, Cat6 at 55 meters for 10GbE, and Cat7 is overkill for most uses.",
      "examTip": "Cat6a is the sweet spot for 10GbE—range and speed."
    },
    {
      "id": 38,
      "question": "A server’s RAID controller battery fails. What is the immediate impact?",
      "options": [
        "Array goes offline",
        "Write performance decreases",
        "Data is lost on reboot",
        "Read speeds drop"
      ],
      "correctAnswerIndex": 1,
      "explanation": "A failed RAID battery disables write-back caching, forcing write-through mode and slowing writes. The array stays online, data isn’t lost, and reads are unaffected.",
      "examTip": "Battery failure hits write speed—cache matters."
    },
    {
      "id": 39,
      "question": "Which access control model assigns permissions based on job roles?",
      "options": [
        "DAC",
        "MAC",
        "RBAC",
        "Rule-based"
      ],
      "correctAnswerIndex": 2,
      "explanation": "RBAC (Role-Based Access Control) ties permissions to roles, simplifying management. DAC is discretionary, MAC is mandatory, and rule-based uses conditions.",
      "examTip": "RBAC aligns with jobs—streamlines permissions."
    },
    {
      "id": 40,
      "question": "A server’s SAN performance drops. What should you check first?",
      "options": [
        "RAID parity settings",
        "Fibre Channel HBA status",
        "Server CPU utilization",
        "Network switch logs"
      ],
      "correctAnswerIndex": 1,
      "explanation": "The Fibre Channel HBA connects the server to the SAN; if it’s failing, performance drops. RAID, CPU, and switch issues are secondary for SAN-specific problems.",
      "examTip": "SAN issues? Check the HBA—your SAN lifeline."
    },
    {
      "id": 41,
      "question": "Which backup method combines incremental backups into a single file for faster restores?",
      "options": [
        "Differential",
        "Synthetic full",
        "Snapshot",
        "Full"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Synthetic full backups merge incremental backups into one file, speeding up restores. Differential grows over time, snapshots are instant copies, and full is standalone.",
      "examTip": "Synthetic full speeds restores—efficiency in action."
    },
    {
      "id": 42,
      "question": "A server’s disk fails in a RAID 1 array. What should you do first?",
      "options": [
        "Rebuild the array immediately",
        "Replace the failed disk",
        "Back up the remaining data",
        "Update the RAID firmware"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Backing up the remaining data protects against a second failure during replacement. Replacing or rebuilding without backup risks total loss, and firmware isn’t urgent.",
      "examTip": "Backup first in RAID failures—safety over speed."
    },
    {
      "id": 43,
      "question": "Which network troubleshooting tool traces the path packets take to a destination?",
      "options": [
        "ping",
        "netstat",
        "tracert",
        "nslookup"
      ],
      "correctAnswerIndex": 2,
      "explanation": "tracert (traceroute) maps the packet path, identifying latency or failures. Ping tests reachability, netstat shows connections, and nslookup resolves DNS.",
      "examTip": "tracert finds the route—great for pinpointing network issues."
    },
    {
      "id": 44,
      "question": "A server’s VM fails to start after a hypervisor update. What should you check first?",
      "options": [
        "VM guest OS patches",
        "Hypervisor compatibility with VM",
        "Physical NIC status",
        "Storage array health"
      ],
      "correctAnswerIndex": 1,
      "explanation": "A hypervisor update may break VM compatibility (e.g., version mismatch), preventing startup. Guest OS, NIC, and storage are downstream issues.",
      "examTip": "Post-update VM issues? Check hypervisor compatibility first."
    },
    {
      "id": 45,
      "question": "Which physical security feature protects against electromagnetic interference (EMI) in a server room?",
      "options": [
        "Biometric locks",
        "Faraday cage shielding",
        "Mantrap systems",
        "CCTV cameras"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Faraday cage shielding blocks EMI, protecting sensitive equipment. Locks, mantraps, and cameras secure access, not EMI.",
      "examTip": "EMI needs shielding—Faraday is your friend."
    },
    {
      "id": 46,
      "question": "A server’s RAID 10 array loses one drive. What is the operational status?",
      "options": [
        "Array fails completely",
        "Array remains fully operational",
        "Performance drops significantly",
        "Data is inaccessible until rebuilt"
      ],
      "correctAnswerIndex": 1,
      "explanation": "RAID 10 mirrors and stripes; one drive loss per mirror set leaves the array operational, though redundancy is reduced. Performance may dip slightly, but data stays accessible.",
      "examTip": "RAID 10 survives single failures—mirrors save the day."
    },
    {
      "id": 47,
      "question": "Which protocol ensures secure management of network devices with encryption?",
      "options": [
        "SNMPv1",
        "SNMPv3",
        "Telnet",
        "FTP"
      ],
      "correctAnswerIndex": 1,
      "explanation": "SNMPv3 provides encrypted management of network devices. SNMPv1 lacks security, Telnet is insecure, and FTP transfers files.",
      "examTip": "SNMPv3 secures device management—v3 is the key."
    },
    {
      "id": 48,
      "question": "A server’s performance degrades during backups. What should you adjust?",
      "options": [
        "Increase CPU cores",
        "Schedule backups off-peak",
        "Upgrade to faster RAM",
        "Add a second NIC"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Scheduling backups during off-peak hours reduces contention with live workloads. Hardware upgrades help but don’t address timing conflicts directly.",
      "examTip": "Timing backups avoids peak load—plan wisely."
    },
    {
      "id": 49,
      "question": "Which documentation type tracks server hardware lifecycle and warranty details?",
      "options": [
        "Network diagrams",
        "Asset inventory",
        "Performance baselines",
        "Disaster recovery plans"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Asset inventory logs hardware details like serial numbers, warranties, and lifecycle status. Diagrams map networks, baselines track performance, and DR plans outline recovery.",
      "examTip": "Asset inventory is your hardware ledger—track everything."
    },
    {
      "id": 50,
      "question": "A server’s NTP sync fails, causing log timestamp issues. What should you check first?",
      "options": [
        "Firewall port 123 status",
        "DNS resolution for NTP server",
        "Server BIOS clock settings",
        "Network switch latency"
      ],
      "correctAnswerIndex": 0,
      "explanation": "NTP uses UDP port 123; a blocked firewall port prevents sync. DNS, BIOS, and latency are secondary if the port is closed.",
      "examTip": "NTP needs port 123 open—firewall is the first stop."
    }
  ]
});
