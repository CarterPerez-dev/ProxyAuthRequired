# helpers/celery_app.py

import os
import logging
from celery import Celery
from celery.schedules import crontab
from dotenv import load_dotenv


load_dotenv()
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

logger.debug(f"SendGrid API Key: {SENDGRID_API_KEY}")

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://redis:6379/0")

app = Celery(
    'tasks',
    broker=CELERY_BROKER_URL,
    backend=CELERY_RESULT_BACKEND,
    broker_connection_retry_on_startup=True,
    include=[
        'helpers.async_tasks',
        'helpers.daily_newsletter_task'  
    ]
)

app.conf.update({
    'worker_prefetch_multiplier': 1,
    'task_acks_late': True,
    'worker_concurrency': 8,
    'timezone': 'America/New_York',  
    'enable_utc': True,  
})


app.conf.beat_schedule = {
    'send-daily-newsletter-midnight': {
        'task': 'helpers.daily_newsletter_task.send_daily_newsletter',
        'schedule': crontab(hour=0, minute=0),  
    },
}

app.autodiscover_tasks(['helpers'])

logger.info("Celery app initialized with broker %s and backend %s", CELERY_BROKER_URL, CELERY_RESULT_BACKEND)

