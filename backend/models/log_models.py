from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict
from datetime import datetime

class Log(BaseModel):
    type: str
    source: str
    event: str
    message: str
    severity: str = Field(..., description="Severity level")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    metadata: Optional[Dict[str, str]] = None

    @validator('severity')
    def validate_severity(cls, v):
        allowed = {"critical", "high", "medium", "low", "info", "debug"}
        if v.lower() not in allowed:
            raise ValueError(f"Severity must be one of {allowed}")
        return v.lower()

class SecurityLog(Log):
    ip_address: Optional[str] = None
    username: Optional[str] = None
    attack_vector: Optional[str] = None
    status: Optional[str] = None
    geolocation: Optional[Dict[str, str]] = None
    device_info: Optional[Dict[str, str]] = None

class FirewallLog(SecurityLog):
    source_ip: str
    destination_ip: str
    action: str
    protocol: str
    port: int
    rule_triggered: str
    traffic_volume: str
    session_id: Optional[str] = None
    destination_country: Optional[str] = None
    source_country: Optional[str] = None

class VulnerabilityLog(SecurityLog):
    tool: str
    vulnerability_name: str
    cve_id: Optional[str] = None
    severity_level: str
    affected_components: List[str]
    remediation_steps: List[str]
    discovery_date: datetime
    patch_available: bool

class IntrusionLog(SecurityLog):
    detection_system: str
    intrusion_method: str
    risk_level: str
    source_ip: str
    destination_ip: str
    attempted_payloads: List[str]
    response_actions: List[str]
    breach_confirmed: bool
    compromised_data: Optional[List[str]] = None

class AccessControlLog(SecurityLog):
    access_type: str
    resource: str
    access_reason: str
    access_time: datetime
    access_location: str
    authentication_method: str
    user_agent: Optional[str] = None
    session_duration: Optional[str] = None

class EventLog(Log):
    system_component: str
    action_performed: str
    result: str
    additional_info: Optional[Dict[str, str]] = None
    user_id: Optional[str] = None
    related_processes: Optional[List[str]] = None
    event_type: Optional[str] = None

class SystemEvent(EventLog):
    os_version: str
    kernel_version: Optional[str] = None
    uptime: str
    resource_usage: Dict[str, str]
    network_interfaces: List[str]
    running_services: List[str]
    last_patch_applied: Optional[str] = None
    scheduled_maintenance: Optional[bool] = None
    hardware_health: Optional[Dict[str, str]] = None
    software_updates: Optional[List[str]] = None

class ApplicationEvent(EventLog):
    application_name: str
    version: str
    action_details: str
    error_code: Optional[str] = None
    stack_trace: Optional[str] = None
    deployment_version: Optional[str] = None
    rollback_occurred: Optional[bool] = None
    affected_users: Optional[List[str]] = None

class AuthenticationEvent(EventLog):
    auth_method: str
    auth_status: str
    user_role: Optional[str] = None
    session_id: Optional[str] = None
    device_info: Optional[str] = None
    login_attempts: Optional[int] = None
    lockout_status: Optional[bool] = None
    last_login_time: Optional[datetime] = None

class NetworkEvent(EventLog):
    src_ip: str
    dest_ip: str
    protocol: str
    action_taken: str
    bytes_transferred: str
    connection_duration: str
    traffic_type: str
    network_device: Optional[str] = None
    bandwidth_utilization: Optional[str] = None
    latency: Optional[str] = None

class ErrorLog(Log):
    error_code: str
    error_message: str
    module: Optional[str] = None
    error_details: Optional[str] = None
    stack_trace: Optional[str] = None
    user_impact: Optional[str] = None
    resolution_steps: Optional[List[str]] = None
    reported_by: Optional[str] = None

class DatabaseErrorLog(ErrorLog):
    query: str
    database_name: str
    db_engine: str
    affected_tables: List[str]
    transaction_id: Optional[str] = None
    affected_rows: Optional[int] = None
    replication_status: Optional[str] = None

class FileSystemErrorLog(ErrorLog):
    file_path: str
    file_operation: str
    error_details: str
    user_id: Optional[str] = None
    disk_space_remaining: Optional[str] = None
    file_size: Optional[str] = None
    file_type: Optional[str] = None

class NetworkErrorLog(ErrorLog):
    interface: str
    error_cause: str
    affected_service: str
    retry_attempts: int
    resolution_status: str
    packet_loss: Optional[str] = None
    throughput: Optional[str] = None

class ApplicationErrorLog(ErrorLog):
    app_name: str
    version: str
    crash_report: Optional[str] = None
    user_feedback: Optional[str] = None
    last_user_action: Optional[str] = None
    session_id: Optional[str] = None
    dependencies_affected: Optional[List[str]] = None
    logs_generated: Optional[List[str]] = None

class DebugLog(Log):
    debug_message: str
    module_name: str
    debug_level: str
    additional_data: Optional[Dict[str, str]] = None
    thread_id: Optional[str] = None
    function_name: Optional[str] = None
    execution_flow: Optional[List[str]] = None

class QueryDebugLog(DebugLog):
    sql_query: str
    execution_time: float
    records_returned: int
    database_connection: str
    query_plan: Optional[str] = None
    affected_rows: Optional[int] = None

class ApiDebugLog(DebugLog):
    api_endpoint: str
    http_method: str
    response_time: float
    status_code: int
    request_payload: Optional[Dict[str, str]] = None
    response_payload: Optional[Dict[str, str]] = None
    headers_sent: Optional[Dict[str, str]] = None
    headers_received: Optional[Dict[str, str]] = None

class ConfigDebugLog(DebugLog):
    config_file: str
    settings_applied: List[str]
    previous_settings: Optional[Dict[str, str]] = None
    update_method: str
    rollback_performed: Optional[bool] = None
    validation_results: Optional[Dict[str, str]] = None

class ProcessDebugLog(DebugLog):
    process_id: int
    process_name: str
    execution_status: str
    memory_usage: str
    cpu_usage: str
    parent_process_id: Optional[int] = None
    thread_ids: Optional[List[int]] = None
    open_files: Optional[List[str]] = None
    network_connections: Optional[List[str]] = None

class InfoLog(Log):
    summary: str
    details: str
    source_system: Optional[str] = None
    related_events: Optional[List[str]] = None
    user_id: Optional[str] = None
    affected_components: Optional[List[str]] = None
    additional_context: Optional[Dict[str, str]] = None

class SystemInfoLog(InfoLog):
    os_version: str
    uptime: str
    resource_usage: Dict[str, str]
    network_interfaces: List[str]
    running_services: List[str]
    last_patch_applied: Optional[str] = None
    scheduled_maintenance: Optional[bool] = None
    hardware_health: Optional[Dict[str, str]] = None
    software_updates: Optional[List[str]] = None

class UserActivityLog(InfoLog):
    user_id: str
    activity_type: str
    activity_details: str
    location: str
    device_used: str
    login_time: Optional[datetime] = None
    logout_time: Optional[datetime] = None
    actions_performed: Optional[List[str]] = None
    session_duration: Optional[str] = None

class DeploymentLog(InfoLog):
    environment: str
    deployment_status: str
    release_version: str
    deployment_time: datetime = Field(default_factory=datetime.utcnow)
    deployed_by: str
    rollback_needed: bool
    deployment_notes: Optional[str] = None
    impacted_services: Optional[List[str]] = None
    pre_deployment_checks: Optional[Dict[str, str]] = None

class ServiceStatusLog(InfoLog):
    service_name: str
    status: str
    last_checked: datetime = Field(default_factory=datetime.utcnow)
    response_time: float
    uptime_percentage: float
    error_count: int
    dependent_services: Optional[List[str]] = None
    maintenance_window: Optional[Dict[str, str]] = None
    health_metrics: Optional[Dict[str, str]] = None

class LogResponse(BaseModel):
    logs: List[Log]
    count: int

