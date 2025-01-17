import json
import logging
import re
from API.AI import client  

logger = logging.getLogger(__name__)

def generate_scenario(industry, attack_type, skill_level, threat_intensity):
    """
    Generate a scenario using OpenAI based on the provided inputs,
    returning a generator that yields partial text chunks as soon as they're generated.
    """
    try:
        prompt = (
            f"Imagine a cybersecurity incident involving the {industry} industry. "
            f"The attack is of type {attack_type}, performed by someone with a skill level of {skill_level}, "
            f"and the threat intensity is rated as {threat_intensity} on a scale from 1-100. "
            "Provide enough details and a thorough story/scenario to explain the context/story as well as thoroughly "
            "explain the attack in a technical way and how it works in 3 paragraphs with a minimum of 7 sentences each. "
            "Then output actors in another paragraph (at least 5 sentences), then potential risks in another paragraph (at least 5 sentences), "
            "then mitigation steps in another paragraph (at least 5 sentences). Use paragraph breaks (new lines '\\n') between each section, "
            "so it is easy to read. Each section should be easy to understand but also in depth, technical, and educational."
        )

        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="gpt-4o",
            max_tokens=1200,
            temperature=0.6,
            stream=True
        )

        def generator():
            try:
                for chunk in response:
                    if chunk.choices and chunk.choices[0].delta:
                        content = getattr(chunk.choices[0].delta, "content", None)
                        if content:
                            yield content
            except Exception as e:
                logger.error(f"Error while streaming scenario: {str(e)}")
                yield f"\n[Error occurred during streaming: {str(e)}]\n"

        return generator()

    except Exception as e:
        logger.error(f"Error generating scenario: {str(e)}")
        def err_gen():
            yield f"[Error generating scenario: {str(e)}]"
        return err_gen()

def break_down_scenario(scenario_text):
    """
    Break down the generated scenario into structured components.
    """
    return {
        "context": extract_context(scenario_text),
        "actors": extract_actors(scenario_text),
        "risks": extract_risks(scenario_text),
        "mitigation_steps": extract_mitigation(scenario_text)
    }

def extract_context(scenario_text):
    context_match = re.search(r"(.*?)(?:The attack|The adversary|The threat)", scenario_text, re.IGNORECASE)
    return context_match.group(0).strip() if context_match else "Context not found."

def extract_actors(scenario_text):
    actors_match = re.findall(r"\b(?:threat actor|adversary|attacker|insider)\b.*?", scenario_text, re.IGNORECASE)
    return actors_match if actors_match else ["Actors not found."]

def extract_risks(scenario_text):
    risks_match = re.findall(r"(risk of .*?)(\.|;|:)", scenario_text, re.IGNORECASE)
    risks = [risk[0] for risk in risks_match]
    return risks if risks else ["Risks not found."]

def extract_mitigation(scenario_text):
    mitigation_match = re.findall(r"(mitigation step|to mitigate|response step): (.*?)(\.|;|:)", scenario_text, re.IGNORECASE)
    mitigations = [step[1] for step in mitigation_match]
    return mitigations if mitigations else ["Mitigation steps not found."]

def generate_interactive_questions(scenario_text, retry_count=0):
    """
    Generate interactive multiple-choice questions based on scenario_text, streaming by default.
    Retries up to 2 times if the response doesn't meet the criteria.
    """
    system_instructions = (
        "You are a highly intelligent cybersecurity tutor. You must follow formatting instructions exactly, "
        "with no extra disclaimers or commentary."
    )

    user_prompt = f"""
Below is a detailed cyberattack scenario:

{scenario_text}

Your task:
1) Generate exactly THREE advanced, non-trivial multiple-choice questions based on the scenario, requiring critical thinking or specialized cybersecurity knowledge beyond merely re-reading the text.
2) Each question must have four options labeled 'A', 'B', 'C', and 'D' (no extra letters or symbols).
3) Indicate the correct answer with a key 'correct_answer' whose value is a single letter (e.g., 'B').
4) Provide a concise 'explanation' focusing on why the correct answer is correct (and relevant to the scenario or cybersecurity concepts).
5) Your output MUST be a valid JSON array with exactly three objects. No disclaimers, no extra text, and no surrounding characters.

Example format:

[
  {{
    "question": "Given the company's reliance on AI, which method best defends against membership inference?",
    "options": {{
      "A": "Basic encryption",
      "B": "Differential privacy",
      "C": "Physical access controls",
      "D": "Frequent model re-training"
    }},
    "correct_answer": "B",
    "explanation": "Differential privacy adds noise to the data, making it harder for attackers to infer membership."
  }},
  // ... two more questions
]

Nothing else.
"""

    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_instructions},
                {"role": "user", "content": user_prompt},
            ],
            model="gpt-4o",
            max_tokens=1200,
            temperature=0.3,
            stream=True
        )

        accumulated_response = ""
        try:
            for chunk in response:
                if chunk.choices and chunk.choices[0].delta:
                    content = getattr(chunk.choices[0].delta, "content", None)
                    if content:
                        accumulated_response += content
        except Exception as e:
            logger.error(f"Error streaming interactive questions: {str(e)}")
            if retry_count < 2:
                logger.info(f"Retrying interactive questions generation (Attempt {retry_count + 2})")
                return generate_interactive_questions(scenario_text, retry_count + 1)
            else:
                return [{"error": f"Error occurred: {str(e)}"}]


        try:

            cleaned_response = accumulated_response.strip()


            if cleaned_response.startswith("```"):

                closing_fence = cleaned_response.find("```", 3)
                if closing_fence != -1:
                    cleaned_response = cleaned_response[3:closing_fence].strip()
                else:

                    cleaned_response = cleaned_response[3:].strip()


            if cleaned_response.lower().startswith("json"):
                cleaned_response = cleaned_response[4:].strip()


            parsed = json.loads(cleaned_response)
            if isinstance(parsed, list) and len(parsed) == 3:
                logger.debug("Successfully generated three interactive questions.")
                return parsed
            else:
                logger.error("Model did not generate exactly three questions.")
                if retry_count < 2:
                    logger.info(f"Retrying interactive questions generation (Attempt {retry_count + 2})")
                    return generate_interactive_questions(scenario_text, retry_count + 1)
                else:
                    return [{"error": "Failed to generate exactly three questions."}]
        except json.JSONDecodeError as je:
            logger.error(f"JSON decode error: {je}")
            logger.error(f"Content received: {accumulated_response}")
            if retry_count < 2:
                logger.info(f"Retrying interactive questions generation (Attempt {retry_count + 2})")
                return generate_interactive_questions(scenario_text, retry_count + 1)
            else:
                return [{"error": "JSON decoding failed."}]

    except Exception as e:
        logger.error(f"Error generating interactive questions: {e}")
        if retry_count < 2:
            logger.info(f"Retrying interactive questions generation (Attempt {retry_count + 2})")
            return generate_interactive_questions(scenario_text, retry_count + 1)
        else:
            return [{"error": f"Error generating interactive questions: {str(e)}"}]

