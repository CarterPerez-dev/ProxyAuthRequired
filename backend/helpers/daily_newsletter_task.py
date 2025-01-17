# helpers/daily_newsletter_task.py

from helpers.celery_app import app
from helpers.email_helper import send_email
from models.user_subscription import get_all_subscribers
from helpers.daily_newsletter_helper import get_newsletter_content
import logging

logger = logging.getLogger(__name__)

@app.task(name="helpers.daily_newsletter_task.send_daily_newsletter")
def send_daily_newsletter():
    """
    Celery task: send daily newsletter to all subscribers.
    """
    try:
        content = get_newsletter_content()
        if not content:
            logger.warning("No newsletter content found.")
            return

        subscribers = get_all_subscribers()
        if not subscribers:
            logger.warning("No subscribers found.")
            return

        for subscriber in subscribers:
            email = subscriber.get("email")
            if email:
                success = send_email(
                    to_email=email,
                    subject="Daily Cyber Brief",
                    content=content
                )
                if success:
                    logger.info(f"Newsletter sent to {email}")
                else:
                    logger.warning(f"Failed to send newsletter to {email}")

        logger.info("Daily newsletter task completed.")
    except Exception as e:
        logger.error(f"Error sending daily newsletter: {e}")
        raise e  

