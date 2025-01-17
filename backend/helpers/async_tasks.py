# helpers/async_tasks.py

import logging
from helpers.celery_app import app

from helpers.analogy_helper import (
    generate_single_analogy as _generate_single_analogy,
    generate_comparison_analogy as _generate_comparison_analogy,
    generate_triple_comparison_analogy as _generate_triple_comparison_analogy
)

from helpers.scenario_helper import (
    generate_scenario as _generate_scenario,
    break_down_scenario as _break_down_scenario,
    generate_interactive_questions as _generate_interactive_questions  
)

from helpers.xploitcraft_helper import Xploits as _Xploits

from helpers.grc_helper import generate_grc_question as _generate_grc_question

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_single_analogy_task(self, concept, category):
    try:
        return _generate_single_analogy(concept, category)
    except Exception as e:
        logger.error(f"Celery generate_single_analogy_task error: {e}")
        self.retry(exc=e)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_comparison_analogy_task(self, concept1, concept2, category):
    try:
        return _generate_comparison_analogy(concept1, concept2, category)
    except Exception as e:
        logger.error(f"Celery generate_comparison_analogy_task error: {e}")
        self.retry(exc=e)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_triple_comparison_analogy_task(self, concept1, concept2, concept3, category):
    try:
        return _generate_triple_comparison_analogy(concept1, concept2, concept3, category)
    except Exception as e:
        logger.error(f"Celery generate_triple_comparison_analogy_task error: {e}")
        self.retry(exc=e)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_scenario_task(self, industry, attack_type, skill_level, threat_intensity):
    """
    If _generate_scenario now returns a generator (streaming), we can consume it fully here,
    returning a single string to Celery.
    """
    try:
        scenario_gen = _generate_scenario(industry, attack_type, skill_level, threat_intensity)
        scenario_text = "".join(scenario_gen)
        return scenario_text
    except Exception as e:
        logger.error(f"Celery generate_scenario_task error: {e}")
        self.retry(exc=e)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def break_down_scenario_task(self, scenario_text):
    try:
        return _break_down_scenario(scenario_text)
    except Exception as e:
        logger.error(f"Celery break_down_scenario_task error: {e}")
        self.retry(exc=e)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_interactive_questions_task(self, scenario_text):
    """
    If _generate_interactive_questions now yields streaming tokens, 
    we just gather them into one final string here.
    """
    try:
        questions_gen = _generate_interactive_questions(scenario_text)
        questions_text = "".join(questions_gen)
        return questions_text
    except Exception as e:
        logger.error(f"Celery generate_interactive_questions_task error: {e}")
        self.retry(exc=e)


_xploit = _Xploits()

@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_exploit_payload_task(self, vulnerability, evasion_technique):
    try:
        return _xploit.generate_exploit_payload(vulnerability, evasion_technique)
    except Exception as e:
        logger.error(f"Celery generate_exploit_payload_task error: {e}")
        self.retry(exc=e)


@app.task(bind=True, max_retries=3, default_retry_delay=10)
def generate_grc_question_task(self, category, difficulty):
    try:
        return _generate_grc_question(category, difficulty)
    except Exception as e:
        logger.error(f"Celery generate_grc_question_task error: {e}")
        self.retry(exc=e)

