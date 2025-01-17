# helpers/daily_newsletter_helper.py

import logging
from models.newsletter_content import (
    get_current_newsletter_db,
    set_current_newsletter_db
)

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

def set_newsletter_content(content):
    set_current_newsletter_db(content)

def get_newsletter_content():
    doc = get_current_newsletter_db()
    return doc.get("content", "")
