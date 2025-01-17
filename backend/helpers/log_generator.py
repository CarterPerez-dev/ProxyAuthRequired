import random
import json
from faker import Faker
from datetime import datetime
from typing import List
from models.log_models import (
    SecurityLog, FirewallLog, VulnerabilityLog, IntrusionLog, AccessControlLog,
    EventLog, SystemEvent, ApplicationEvent, AuthenticationEvent, NetworkEvent,
    ErrorLog, DatabaseErrorLog, FileSystemErrorLog, NetworkErrorLog, ApplicationErrorLog,
    DebugLog, QueryDebugLog, ApiDebugLog, ConfigDebugLog, ProcessDebugLog,
    InfoLog, SystemInfoLog, UserActivityLog, DeploymentLog, ServiceStatusLog,
    Log
)

fake = Faker()

def generate_firewall_log() -> FirewallLog:
    severity = random.choice(["critical", "high", "medium", "low"])
    geolocation = {
        "source_latitude": f"{fake.latitude()}",
        "source_longitude": f"{fake.longitude()}",
        "destination_latitude": f"{fake.latitude()}",
        "destination_longitude": f"{fake.longitude()}"
    }
    device_info = {
        "source_device": fake.user_agent(),
        "destination_device": fake.user_agent()
    }
    # Added a few more rule choices
    rule_triggered = random.choice([
        "Rule 101 - Suspicious Activity", "Rule 202 - High Traffic Volume", "Rule 303 - Unauthorized Scanning",
        "Rule 404 - Known Malicious IP", "Rule 505 - Protocol Anomaly"
    ])
    attack_vector_choices = ["Brute-force", "Phishing", "SQL Injection", "Cross-Site Scripting", "RFI", "LFI"]
    return FirewallLog(
        type="security",
        source="Firewall",
        event="Traffic Control",
        message=f"Blocked {random.choice(['incoming', 'outgoing'])} traffic from {fake.ipv4()} to {fake.ipv4()} due to rule violation.",
        severity=severity,
        source_ip=fake.ipv4(),
        destination_ip=fake.ipv4(),
        action=random.choice(["Allowed", "Blocked"]),
        protocol=random.choice(["TCP", "UDP", "ICMP"]),
        port=random.randint(1, 65535),
        rule_triggered=rule_triggered,
        traffic_volume=f"{random.randint(100, 10000)}MB",
        session_id=fake.uuid4() if random.choice([True, False]) else None,
        destination_country=fake.country(),
        source_country=fake.country(),
        ip_address=fake.ipv4(),
        username=fake.user_name(),
        attack_vector=random.choice(attack_vector_choices),
        status=random.choice(["Successful", "Failed"]),
        geolocation=geolocation,
        device_info=device_info
    )

def generate_vulnerability_log() -> VulnerabilityLog:
    severity_level = random.choice(["Low", "Medium", "High", "Critical"])
    geolocation = {
        "scanner_location": fake.city(),
        "target_location": fake.city()
    }
    device_info = {
        "scanner_device": fake.user_agent(),
        "target_device": fake.user_agent()
    }
    # More vulnerability names and tools
    vuln_name_choices = [
        "SQL injection flaw", "XSS vulnerability", "Privilege escalation bug", "Directory traversal issue",
        "Open redirect", "Command injection hole", "Insecure deserialization"
    ]
    tool_choices = ["Burp Suite", "Nessus", "Qualys", "OpenVAS", "Acunetix"]
    return VulnerabilityLog(
        type="security",
        source="Vulnerability Scanner",
        event="Scan Result",
        message=f"{random.choice(vuln_name_choices)} found on {fake.hostname()} affecting {random.choice(['database', 'API endpoint', 'user interface', 'authentication flow'])}.",
        severity=severity_level.lower(),
        tool=random.choice(tool_choices),
        vulnerability_name=fake.catch_phrase(),
        cve_id=f"CVE-{random.randint(1999, 2024)}-{random.randint(1000, 9999)}",
        severity_level=severity_level,
        remediation_steps=[
            f"Apply patch {fake.numerify('##')}",
            f"Restrict access to {fake.domain_word()}",
            f"Update configuration files for {fake.bs()}",
            "Implement input validation", "Enable WAF rules"
        ],
        discovery_date=fake.date_time_between(start_date='-60d', end_date='now'),
        patch_available=random.choice([True, False]),
        geolocation=geolocation,
        device_info=device_info,
        ip_address=fake.ipv4(),
        username=fake.user_name(),
        attack_vector=random.choice(["Brute-force", "Phishing", "SQL Injection", "XSS", "LFI", "RCE"]),
        status=random.choice(["Successful", "Failed"]),
        affected_components=[fake.bs().capitalize() for _ in range(random.randint(1, 4))]
    )

def generate_intrusion_log() -> IntrusionLog:
    risk_level = random.choice(["Low", "Medium", "High", "Critical"])
    geolocation = {
        "source_latitude": f"{fake.latitude()}",
        "source_longitude": f"{fake.longitude()}",
        "target_latitude": f"{fake.latitude()}",
        "target_longitude": f"{fake.longitude()}"
    }
    device_info = {
        "source_device": fake.user_agent(),
        "target_device": fake.user_agent()
    }
    attempted_payloads = [fake.word() for _ in range(random.randint(1, 3))]
    response_actions = [random.choice(["Alert Sent", "Connection Terminated", "IP Banned", "Session Terminated"]) for _ in range(random.randint(1,2))]

    return IntrusionLog(
        type="security",
        source="IDS",
        event="Unauthorized Access Attempt",
        message=f"Detected unauthorized access attempt from {fake.ipv4()} targeting {fake.hostname()}.",
        severity=random.choice(["critical", "high", "medium", "low"]),
        source_ip=fake.ipv4(),
        destination_ip=fake.ipv4(),
        username=fake.user_name(),
        attack_vector=random.choice(["Phishing", "Brute Force", "SQL Injection", "RCE", "LFI", "XSS"]),
        status=random.choice(["Blocked", "Failed", "Successful"]),
        detection_system=random.choice(["Snort", "Suricata", "OSSEC", "Zeek"]),
        intrusion_method=random.choice(["Exploit", "Privilege Escalation", "RDP Bruteforce", "SMB Lateral Movement"]),
        risk_level=risk_level,
        attempted_payloads=attempted_payloads,
        response_actions=response_actions,
        breach_confirmed=random.choice([True, False]),
        compromised_data=[fake.word() for _ in range(random.randint(1, 5))] if random.choice([True, False]) else None,
        geolocation=geolocation,
        device_info=device_info
    )

def generate_access_control_log() -> AccessControlLog:
    reason_choices = ["Unauthorized user", "Incorrect credentials", "Policy violation", "Resource locked", "MFA required"]
    return AccessControlLog(
        type="security",
        source="Access Control",
        event="Access Attempt",
        message=f"Access {'granted' if random.choice([True, False]) else 'denied'} to {fake.user_name()} for {fake.file_path()}.",
        severity=random.choice(["critical", "high", "medium", "low"]),
        ip_address=fake.ipv4(),
        username=fake.user_name(),
        attack_vector=random.choice(["Brute-force", "Privilege Escalation"]),
        status=random.choice(["Failed", "Successful"]),
        access_type=random.choice(["Granted", "Denied"]),
        resource=fake.file_path(),
        access_reason=random.choice(reason_choices),
        access_time=fake.date_time_between(start_date='-30d', end_date='now'),
        access_location=fake.city(),
        authentication_method=random.choice(["Password", "MFA", "Biometric", "Certificate"]),
        user_agent=fake.user_agent(),
        session_duration=f"{random.randint(5, 480)} minutes"
    )

def generate_security_logs(count: int) -> List[SecurityLog]:
    logs = []
    for _ in range(count):
        logs.append(generate_firewall_log())
        logs.append(generate_vulnerability_log())
        logs.append(generate_intrusion_log())
        logs.append(generate_access_control_log())
    return logs

def generate_system_event() -> SystemEvent:
    resource_usage = {
        "CPU": f"{random.randint(10, 90)}%",
        "RAM": f"{random.randint(20, 80)}%",
        "Disk": f"{random.randint(30, 95)}%"
    }
    network_interfaces = [f"eth{random.randint(0,3)}: {fake.ipv4()} - {'Up' if random.choice([True, False]) else 'Down'}" for _ in range(random.randint(1,4))]
    running_services = [fake.bs().capitalize() for _ in range(random.randint(2, 5))]
    hardware_health = {
        "CPU_Temperature": f"{random.randint(30, 90)}°C",
        "RAM_Usage": f"{random.randint(20, 80)}%",
        "Disk_Health": random.choice(["Good", "Warning", "Critical"]),
        "Battery_Level": f"{random.randint(20, 100)}%"
    }
    software_updates = [f"{fake.word().capitalize()} v{random.randint(1,5)}.{random.randint(0,9)}.{random.randint(0,9)}" for _ in range(random.randint(1,3))]
    system_component = random.choice(["System Manager", "Monitor Module", "Health Checker"])
    action_performed = random.choice(["System Check", "Health Assessment", "Status Update"])
    result = random.choice(["Success", "Partial Success", "Failure"])
    

    return SystemEvent(
        type="event",
        source="System Monitor",
        event="System Reboot",
        message="System rebooted successfully.",
        severity="info",
        summary="System Check Completed",
        details="All systems are running smoothly without any detected issues.",
        system_component=system_component,
        action_performed=action_performed,
        result=result,
        additional_info={
            "environment": random.choice(["Production", "Staging", "Development"]),
            "monitoring_tool": random.choice(["Nagios", "Prometheus", "Zabbix"])
        },
        os_version=fake.windows_platform_token(),
        uptime=f"{random.randint(1, 72)} hours",
        resource_usage=resource_usage,
        network_interfaces=network_interfaces,
        running_services=running_services,
        last_patch_applied=str(fake.date_between(start_date='-60d', end_date='today')) if random.choice([True, False]) else None,
        scheduled_maintenance=random.choice([True, False]),
        hardware_health=hardware_health,
        software_updates=software_updates
    )

def generate_application_event() -> ApplicationEvent:
    stack_trace = fake.text(max_nb_chars=500) if random.choice([True, False]) else None
    app_name = fake.company()
    version = fake.numerify("#.#.#")
    severity_choices = ["info", "debug", "low", "critical", "medium", "high"]

    return ApplicationEvent(
        type="event",
        source="AppManager",
        event="App Crash",
        message=f"{app_name} application crashed unexpectedly during {random.choice(['data processing', 'user request', 'background task'])}.",
        severity=random.choice(severity_choices),
        application_name=app_name,
        version=version,
        action_details=fake.sentence(),
        system_component="Application Layer",
        action_performed="Crash",
        result="Failure",
        error_code=f"APP-{random.randint(1000, 9999)}",
        stack_trace=stack_trace,
        deployment_version=f"{random.randint(1, 10)}.{random.randint(0, 9)}.{random.randint(0, 9)}",
        rollback_occurred=random.choice([True, False]),
        affected_users=[fake.user_name() for _ in range(random.randint(1, 5))] if stack_trace else None
    )

def generate_authentication_event() -> AuthenticationEvent:
    return AuthenticationEvent(
        type="event",
        source="AuthService",
        event="Login Attempt",
        message=f"User {fake.user_name()} attempted to log in from {fake.ipv4()} using {random.choice(['Password', 'MFA', 'Biometric'])}.",
        severity=random.choice(["info", "debug", "low", "critical", "medium", "high"]),
        auth_method=random.choice(["OAuth", "SAML", "LDAP"]),
        auth_status=random.choice(["Success", "Failure"]),
        user_role=random.choice(["Admin", "User", "Guest"]),
        system_component="Authentication Module",
        action_performed=random.choice(["Login", "Logout", "Password Change"]),
        result=random.choice(["Success", "Failure"]),
        session_id=fake.uuid4(),
        login_attempts=random.randint(1, 5),
        lockout_status=random.choice([True, False]),
        last_login_time=fake.date_time_between(start_date='-30d', end_date='now') if random.choice([True, False]) else None
    )

def generate_network_event() -> NetworkEvent:
    return NetworkEvent(
        type="event",
        source="Network Manager",
        event="Traffic Anomaly Detected",
        message=f"Traffic anomaly detected between {fake.ipv4()} and {fake.ipv4()} involving {random.choice(['suspicious', 'excessive'])} data transfer.",
        severity=random.choice(["info", "critical", "medium", "low", "high", "debug"]),
        system_component="Network Interface",
        action_performed="Traffic Analysis",
        result=random.choice(["Monitored", "Blocked"]),
        src_ip=fake.ipv4(),
        dest_ip=fake.ipv4(),
        protocol=random.choice(["TCP", "UDP", "ICMP"]),
        action_taken=random.choice(["Monitored", "Blocked"]),
        bytes_transferred=f"{random.randint(100, 10000)}MB",
        connection_duration=f"{random.randint(1, 120)} seconds",
        traffic_type=random.choice(["Inbound", "Outbound"]),
        network_device=random.choice(["Router", "Switch", "Firewall"]),
        bandwidth_utilization=f"{random.randint(10, 90)}%",
        latency=f"{random.uniform(1.0, 100.0):.2f}ms"
    )

def generate_event_logs(count: int) -> List[EventLog]:
    logs = []
    for _ in range(count):
        logs.append(generate_system_event())
        logs.append(generate_application_event())
        logs.append(generate_authentication_event())
        logs.append(generate_network_event())
    return logs

def generate_database_error_log() -> DatabaseErrorLog:
    affected_tables = [fake.word().capitalize() for _ in range(random.randint(1, 3))]
    replication_status = random.choice(["Synchronous", "Asynchronous", "Delayed", "Not Configured"])
    return DatabaseErrorLog(
        type="error",
        source="Database",
        event="Query Failure",
        message="Database query failed during operation due to syntax error.",
        severity="critical",
        error_message="Query could not execute due to missing field.",
        module="Query Executor",
        error_code=f"DB-{random.randint(1000, 9999)}",
        query="SELECT * FROM users WHERE active=1",
        database_name=fake.company(),
        db_engine=random.choice(["PostgreSQL", "MySQL", "MongoDB", "SQLite"]),
        affected_tables=affected_tables,
        transaction_id=fake.uuid4(),
        affected_rows=random.randint(0, 1000),
        replication_status=replication_status
    )

def generate_filesystem_error_log() -> FileSystemErrorLog:
    return FileSystemErrorLog(
        type="error",
        source="FileSystem",
        event="File Not Found",
        message=f"File {fake.file_path()} not found during {random.choice(['read', 'write', 'delete'])} operation.",
        severity=random.choice(["critical", "high", "medium", "low"]),
        file_path=fake.file_path(),
        file_operation=random.choice(["Read", "Write", "Delete"]),
        error_code=f"FS-{random.randint(1000, 9999)}",
        error_message=f"Unable to access file at {fake.file_path()}",
        error_details=f"Permission issue with {fake.file_path()}",
        user_id=fake.uuid4(),
        disk_space_remaining=f"{random.randint(10, 500)}GB",
        file_size=f"{random.randint(1, 1000)}MB",
        file_type=random.choice([".txt", ".exe", ".log", ".cfg"])
    )

def generate_network_error_log() -> NetworkErrorLog:
    return NetworkErrorLog(
        type="error",
        source="Network Interface",
        event="Connection Timeout",
        message="Network interface experienced timeout during data transfer.",
        severity=random.choice(["critical", "high", "medium", "low"]),
        interface=random.choice(["eth0", "eth1", "wlan0", "wlan1"]),
        error_cause="Connection Timeout",
        affected_service=random.choice(["Web Server", "Database Service", "API Gateway", "Email Service"]),
        retry_attempts=random.randint(1, 5),
        resolution_status=random.choice(["Resolved", "Unresolved"]),
        error_code=f"NET-{random.randint(1000, 9999)}",
        error_message="Connection timed out after multiple attempts.",
        packet_loss=f"{random.uniform(0.0, 10.0):.2f}%",
        throughput=f"{random.randint(100, 1000)}Mbps"
    )

def generate_application_error_log() -> ApplicationErrorLog:
    dependencies_affected = [fake.word() for _ in range(random.randint(1, 3))]
    logs_generated = [fake.sentence() for _ in range(random.randint(1, 3))]
    # Ensure app_name and version always provided
    app_name = fake.company()
    version = fake.numerify("#.#.#")

    return ApplicationErrorLog(
        type="error",
        source="Application Service",
        event="Service Crash",
        message=f"Application {app_name} crashed unexpectedly during {random.choice(['data processing', 'user request'])}.",
        severity=random.choice(["critical", "high", "medium", "low"]),
        error_code=f"APP-{random.randint(1000, 9999)}",
        error_message="Unexpected service termination",
        module=random.choice(["Auth Module", "Payment Gateway", "Notification Service", "Data Processor"]),
        crash_report=fake.text(max_nb_chars=1000) if random.choice([True, False]) else None,
        user_feedback=fake.sentence() if random.choice([True, False]) else None,
        last_user_action=fake.sentence() if random.choice([True, False]) else None,
        session_id=fake.uuid4() if random.choice([True, False]) else None,
        dependencies_affected=dependencies_affected if random.choice([True, False]) else None,
        logs_generated=logs_generated if random.choice([True, False]) else None,
        app_name=app_name,
        version=version
    )

def generate_error_logs(count: int) -> List[ErrorLog]:
    logs = []
    for _ in range(count):
        logs.append(generate_database_error_log())
        logs.append(generate_filesystem_error_log())
        logs.append(generate_network_error_log())
        logs.append(generate_application_error_log())
    return logs

def generate_query_debug_log() -> QueryDebugLog:
    records_returned = random.randint(0, 1000)
    query_plan = fake.paragraph(nb_sentences=3) if random.choice([True, False]) else None
    return QueryDebugLog(
        type="debug",
        source="Query Executor",
        event="Query Execution",
        message="SQL query executed successfully.",
        severity="debug",
        debug_level=random.choice(["low", "medium", "high"]),
        debug_message=f"Execution time: {random.uniform(10.0, 500.0):.2f}ms",
        module_name="DatabaseManager",
        sql_query="SELECT * FROM products WHERE active=True",
        execution_time=random.uniform(10.0, 500.0),
        records_returned=records_returned,
        database_connection=fake.uuid4(),
        query_plan=query_plan,
        affected_rows=random.randint(0, 1000)
    )

def generate_api_debug_log() -> ApiDebugLog:
    response_time = random.uniform(100.0, 2000.0)
    # Convert response_payload and request_payload to strings
    response_payload = {
        "status": "success",
        "data": json.dumps({"id": str(fake.uuid4()), "name": fake.word()})
    }
    request_payload = {
        "user_id": str(fake.uuid4()),
        "action": random.choice(["create", "update", "delete"])
    }
    # All values must be strings
    response_payload_str = {k:str(v) for k,v in response_payload.items()}
    request_payload_str = {k:str(v) for k,v in request_payload.items()}

    headers_sent = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {fake.sha256()}",
        "User-Agent": fake.user_agent()
    }
    headers_received = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Set-Cookie": f"session={fake.uuid4()}; HttpOnly"
    }
    return ApiDebugLog(
        type="debug",
        source="API Gateway",
        event="API Request",
        message=f"API request to {fake.uri()} completed.",
        severity="debug",
        debug_level=random.choice(["low", "medium", "high"]),
        debug_message=f"Response time: {response_time:.2f}ms",
        module_name="APIService",
        api_endpoint=fake.uri(),
        http_method=random.choice(["GET", "POST", "PUT", "DELETE"]),
        response_time=response_time,
        status_code=random.choice([200, 201, 400, 401, 403, 404, 500, 502, 503]),
        request_payload=request_payload_str,
        response_payload=response_payload_str,
        headers_sent=headers_sent,
        headers_received=headers_received
    )

def generate_config_debug_log() -> ConfigDebugLog:
    settings_applied = [fake.word().capitalize() for _ in range(random.randint(1, 5))]
    previous_settings = {setting: fake.word() for setting in settings_applied}
    validation_results = {
        "Syntax Check": "Passed",
        "Schema Validation": "Passed",
        "Dependency Check": random.choice(["Passed", "Failed"]),
        "Security Audit": random.choice(["Passed", "Failed"])
    }
    return ConfigDebugLog(
        type="debug",
        source="Config Manager",
        event="Config Update",
        message="Configuration file updated successfully.",
        severity="debug",
        debug_level=random.choice(["low", "medium", "high"]),
        debug_message="Settings applied successfully.",
        module_name="SystemConfigurator",
        config_file=fake.file_path(),
        settings_applied=settings_applied,
        previous_settings=previous_settings,
        update_method=random.choice(["Manual", "Automated"]),
        rollback_performed=random.choice([True, False]),
        validation_results=validation_results
    )

def generate_process_debug_log() -> ProcessDebugLog:
    return ProcessDebugLog(
        type="debug",
        source="Process Manager",
        event="Process Monitoring",
        message=f"Process {fake.word()} is running with optimal performance.",
        severity="debug",
        debug_level=random.choice(["low", "medium", "high"]),
        debug_message="Execution status: Running",
        module_name="ProcessMonitor",
        process_id=random.randint(1000, 9999),
        process_name=fake.word(),
        execution_status="Running",
        memory_usage=f"{random.randint(50, 500)}MB",
        cpu_usage=f"{random.uniform(0.0, 100.0):.2f}%",
        parent_process_id=random.randint(1000, 9999) if random.choice([True, False]) else None,
        thread_ids=[random.randint(100, 999) for _ in range(random.randint(1, 5))],
        open_files=[fake.file_path() for _ in range(random.randint(1, 3))],
        network_connections=[f"{fake.ipv4()}:{random.randint(1024, 65535)}" for _ in range(random.randint(1, 3))]
    )

def generate_debug_logs(count: int) -> List[DebugLog]:
    logs = []
    for _ in range(count):
        logs.append(generate_query_debug_log())
        logs.append(generate_api_debug_log())
        logs.append(generate_config_debug_log())
        logs.append(generate_process_debug_log())
    return logs

def generate_system_info_log() -> SystemInfoLog:
    resource_usage = {
        "CPU": f"{random.randint(10, 90)}%",
        "RAM": f"{random.randint(20, 80)}%",
        "Disk": f"{random.randint(30, 95)}%"
    }
    network_interfaces = [f"eth{random.randint(0,3)}: {fake.ipv4()} - {'Up' if random.choice([True, False]) else 'Down'}" for _ in range(random.randint(1,4))]
    running_services = [fake.bs().capitalize() for _ in range(random.randint(2, 5))]
    hardware_health = {
        "CPU_Temperature": f"{random.randint(30, 90)}°C",
        "RAM_Usage": f"{random.randint(20, 80)}%",
        "Disk_Health": random.choice(["Good", "Warning", "Critical"]),
        "Battery_Level": f"{random.randint(20, 100)}%"
    }
    software_updates = [f"{fake.word().capitalize()} v{random.randint(1,5)}.{random.randint(0,9)}.{random.randint(0,9)}" for _ in range(random.randint(1,3))]

    return SystemInfoLog(
        type="info",
        source="System Monitor",
        event="System Check",
        message="System operational with optimal performance.",
        severity="info",
        summary="System Check Completed",
        details="All systems are running smoothly without any detected issues.",
        os_version=fake.windows_platform_token(),
        uptime=f"{random.randint(1, 72)} hours",
        resource_usage=resource_usage,
        network_interfaces=network_interfaces,
        running_services=running_services,
        last_patch_applied=str(fake.date_between(start_date='-60d', end_date='today')) if random.choice([True, False]) else None,
        scheduled_maintenance=random.choice([True, False]),
        hardware_health=hardware_health,
        software_updates=software_updates
    )

def generate_user_activity_log() -> UserActivityLog:
    return UserActivityLog(
        type="info",
        source="Activity Tracker",
        event="User Login",
        message=f"User {fake.user_name()} logged in successfully from {fake.ipv4()} using {random.choice(['Password', 'MFA', 'Biometric'])}.",
        severity="info",
        summary="User Login Activity",
        details=f"User performed {random.randint(1, 10)} actions during this session.",
        user_id=str(fake.uuid4()),
        activity_type="Login",
        activity_details="Accessed dashboard, viewed reports, and updated profile settings.",
        location=fake.city(),
        device_used=random.choice(["Mobile", "Desktop", "Tablet"]),
        login_time=fake.date_time_between(start_date='-30d', end_date='now'),
        logout_time=fake.date_time_between(start_date='now', end_date='+1d') if random.choice([True, False]) else None,
        actions_performed=[
            random.choice(["Viewed Dashboard", "Edited Profile", "Downloaded Report", "Uploaded File", "Sent Message"])
            for _ in range(random.randint(1, 5))
        ],
        session_duration=f"{random.randint(5, 480)} minutes",
        additional_context={
            "session_ip": fake.ipv4(),
            "session_device": fake.user_agent()
        }
    )

def generate_deployment_log() -> DeploymentLog:
    deployment_notes = fake.paragraph(nb_sentences=3) if random.choice([True, False]) else None
    impacted_services = [fake.word().capitalize() for _ in range(random.randint(1, 3))]
    pre_deployment_checks = {
        "Health Check": "Passed",
        "Dependency Verification": "Passed",
        "Security Scan": random.choice(["Passed", "Failed"]),
        "Configuration Validation": random.choice(["Passed", "Failed"])
    }
    return DeploymentLog(
        type="info",
        source="Deployment Manager",
        event="Deployment Successful",
        message="New deployment completed successfully without any issues.",
        severity="info",
        summary="Deployment Process Completed",
        details="Version 2.3.4 deployed to production environment with zero downtime.",
        environment=random.choice(["Production", "Staging", "Development"]),
        deployment_status="Success",
        release_version=f"{random.randint(1, 10)}.{random.randint(0, 9)}.{random.randint(0, 9)}",
        deployment_time=fake.date_time_between(start_date='-7d', end_date='now'),
        deployed_by=fake.user_name(),
        rollback_needed=False,
        deployment_notes=deployment_notes,
        impacted_services=impacted_services if deployment_notes else None,
        additional_context={
            "rollback_strategy": random.choice(["Automated", "Manual"]),
            "deployment_tool": random.choice(["Jenkins", "GitHub Actions", "GitLab CI/CD"])
        },
        pre_deployment_checks=pre_deployment_checks
    )

def generate_service_status_log() -> ServiceStatusLog:
    alert_thresholds = {
        "CPU": "90%",
        "Memory": "85%",
        "Disk_IO": "800MB/s"
    }
    # Convert alert_thresholds to a JSON string to avoid dict -> string error
    alert_thresholds_str = json.dumps(alert_thresholds)
    return ServiceStatusLog(
        type="info",
        source="Service Monitor",
        event="Service Running",
        message=f"Service {fake.word()} is operational and responding within expected parameters.",
        severity="info",
        summary="Service Health Check Passed",
        details="No issues detected during the latest health check.",
        service_name=fake.word(),
        status="Operational",
        last_checked=fake.date_time_between(start_date='-1d', end_date='now'),
        response_time=random.uniform(50.0, 500.0),
        uptime_percentage=random.uniform(99.0, 100.0),
        error_count=random.randint(0, 5),
        dependent_services=[fake.word().capitalize() for _ in range(random.randint(1, 3))],
        maintenance_window={
            "start_time": fake.time(),
            "end_time": fake.time()
        } if random.choice([True, False]) else None,
        health_metrics={
            "CPU_Usage": f"{random.randint(10, 90)}%",
            "Memory_Usage": f"{random.randint(20, 80)}%",
            "Disk_IO": f"{random.randint(100, 1000)}MB/s"
        },
        additional_context={
            "monitoring_tool": random.choice(["Nagios", "Prometheus", "Zabbix"]),
            "alert_thresholds": alert_thresholds_str
        }
    )

def generate_info_logs(count: int) -> List[InfoLog]:
    logs = []
    for _ in range(count):
        logs.append(generate_system_info_log())
        logs.append(generate_user_activity_log())
        logs.append(generate_deployment_log())
        logs.append(generate_service_status_log())
    return logs

def generate_debug_logs(count: int) -> List[DebugLog]:
    logs = []
    for _ in range(count):
        logs.append(generate_query_debug_log())
        logs.append(generate_api_debug_log())
        logs.append(generate_config_debug_log())
        logs.append(generate_process_debug_log())
    return logs

def generate_error_logs(count: int) -> List[ErrorLog]:
    logs = []
    for _ in range(count):
        logs.append(generate_database_error_log())
        logs.append(generate_filesystem_error_log())
        logs.append(generate_network_error_log())
        logs.append(generate_application_error_log())
    return logs

def generate_event_logs(count: int) -> List[EventLog]:
    logs = []
    for _ in range(count):
        logs.append(generate_system_event())
        logs.append(generate_application_event())
        logs.append(generate_authentication_event())
        logs.append(generate_network_event())
    return logs

def generate_security_logs(count: int) -> List[SecurityLog]:
    logs = []
    for _ in range(count):
        logs.append(generate_firewall_log())
        logs.append(generate_vulnerability_log())
        logs.append(generate_intrusion_log())
        logs.append(generate_access_control_log())
    return logs

def generate_logs(category: str, count: int) -> List[Log]:
    generators = {
        "security": generate_security_logs,
        "event": generate_event_logs,
        "error": generate_error_logs,
        "debug": generate_debug_logs,
        "info": generate_info_logs,
    }
    generator_func = generators.get(category)
    if not generator_func:
        return []
    logs = generator_func(count)
    return logs

