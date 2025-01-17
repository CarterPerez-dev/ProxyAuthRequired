# models/log_history.py
from datetime import datetime
from pydantic import BaseModel, Field
from typing import Union
from uuid import UUID, uuid4

from .log_models import (
    Log,
    FirewallLog, VulnerabilityLog, IntrusionLog, AccessControlLog,
    SystemEvent, ApplicationEvent, AuthenticationEvent, NetworkEvent,
    DatabaseErrorLog, FileSystemErrorLog, NetworkErrorLog, ApplicationErrorLog,
    QueryDebugLog, ApiDebugLog, ConfigDebugLog, ProcessDebugLog,
    SystemInfoLog, UserActivityLog, DeploymentLog, ServiceStatusLog
)


LogType = Union[
    FirewallLog, VulnerabilityLog, IntrusionLog, AccessControlLog,
    SystemEvent, ApplicationEvent, AuthenticationEvent, NetworkEvent,
    DatabaseErrorLog, FileSystemErrorLog, NetworkErrorLog, ApplicationErrorLog,
    QueryDebugLog, ApiDebugLog, ConfigDebugLog, ProcessDebugLog,
    SystemInfoLog, UserActivityLog, DeploymentLog, ServiceStatusLog
]

class LogHistory(BaseModel):
    id: UUID = Field(default_factory=uuid4, description="Unique identifier for the log history entry")
    log: LogType = Field(..., description="The log entry associated with this history record")
    analysis: str = Field(..., description="Result or summary of the log analysis")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Timestamp when the analysis was performed")

