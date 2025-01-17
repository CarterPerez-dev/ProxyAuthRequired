import psutil

def get_system_info():
    """
    Retrieves basic system info.
    """
    return {
        "cpu_percent": psutil.cpu_percent(interval=1),
        "memory_percent": psutil.virtual_memory().percent,
        "disk_percent": psutil.disk_usage('/').percent
    }

def get_application_status():
    """
    For Docker-based processes, we might not easily 'see' the process name with psutil,
    but you can do simple checks (like attempts to connect to services).
    For simplicity, we'll mock or do minimal checks here.
    """

    return {
        "backend": "Running",
        "mongodb": "Running",
        "redis": "Running",
        "celery_worker": "Running",
        "celery_beat": "Running"
    }

