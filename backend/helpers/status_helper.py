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
    status.
    """

    return {
        "backend": "Running",
        "mongodb": "Running",
        "redis": "Running",
        "celery_worker": "Running",
        "celery_beat": "Running"
    }

