import logging
import json
import re
import traceback
from typing import Generator

# This is your custom client that presumably sets up the OpenAI API key from env vars
# or any other config. We are using "client.chat.completions.create" as requested.
from API.AI import client

logger = logging.getLogger(__name__)


def generate_advanced_pbq(category: str, difficulty: str, user_performance_level: str = "average") -> str:
    """
    Non-streaming function: calls client.chat.completions.create(...) once,
    returns entire PBQ JSON as a string. We do minimal post-processing and let the
    route handle final JSON parsing.
    """
    prompt = f"""
You are an expert in cybersecurity education, specializing in creating Performance-Based Questions (PBQs).
Generate an advanced PBQ focusing on Nmap usage in a CLI environment, with multiple sub-tasks that include:
- "taskTitle"
- "taskDescription"
- "expectedCommand"
- "simulatedOutput"
- "followUpQuestion"
- "possibleAnswers"
- "correctAnswerIndex"
- "explanation"
At the end, an "overallSummary".
Incorporate advanced Nmap flags (e.g., -sV, -sS, -A, -p, -Pn, -O, -sU, etc.).
Ensure output is valid JSON with no extra text.
Category: {category}
Difficulty: {difficulty}
User Performance Level: {user_performance_level}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=3000
        )
        content = response.choices[0].message.content.strip()

        # Remove any code fences if present
        content = re.sub(r'^```[a-z]*\s*', '', content)
        content = re.sub(r'```$', '', content)

        return content  # Return raw string (hopefully valid JSON)
    except Exception as e:
        logger.error("Error in generate_advanced_pbq: %s\n%s", e, traceback.format_exc())
        raise


def generate_advanced_pbq_stream(category: str, difficulty: str, user_performance_level: str = "average") -> Generator[str, None, None]:
    """
    Streaming function: calls client.chat.completions.create(..., stream=True)
    Yields partial text chunks, which the route sends as SSE lines.
    Front-end must accumulate and parse the final JSON.
    """
    prompt = f"""
You are an expert in cybersecurity education, specializing in creating Performance-Based Questions (PBQs).
Generate an advanced PBQ focusing on Nmap usage in a CLI environment, with multiple sub-tasks that include:
- "taskTitle"
- "taskDescription"
- "expectedCommand"
- "simulatedOutput"
- "followUpQuestion"
- "possibleAnswers"
- "correctAnswerIndex"
- "explanation"
At the end, an "overallSummary".
Incorporate advanced Nmap flags (e.g., -sV, -sS, -A, -p, -Pn, -O, -sU, etc.).
Ensure output is valid JSON with no extra text.
Category: {category}
Difficulty: {difficulty}
User Performance Level: {user_performance_level}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=3000,
            stream=True
        )
        for chunk in response:
            # chunk is typically a dict with "choices" -> [ { "delta": { "content": "..."} } ]
            if 'choices' in chunk and len(chunk['choices']) > 0:
                delta = chunk['choices'][0].get('delta', {})
                text = delta.get('content', '')
                if text:
                    yield text
    except Exception as e:
        logger.error("Error in generate_advanced_pbq_stream: %s\n%s", e, traceback.format_exc())
        # yield an error in JSON format so front-end can see it
        error_json = json.dumps({"error": f"Failed to stream PBQ: {str(e)}"})
        yield error_json


def simulate_nmap_command_openai(user_cmd: str) -> str:
    """
    Simulate Nmap command using your existing 'client.chat.completions.create'.
    We feed a system prompt or user prompt that asks for realistic Nmap-like output.
    """
    prompt = f"""
You are an expert network security analyst. Simulate the output of the following Nmap command as accurately as possible:
Command: {user_cmd}

Requirements:
- Only produce realistic Nmap output (e.g., "Starting Nmap...", "Nmap scan report for...")
- If the command includes OS detection (-O), or aggressive scanning (-A), or other flags, include relevant details.
- No extra commentary, just the simulated CLI output.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=1500
        )
        content = response.choices[0].message.content.strip()

        content = re.sub(r'^```[a-z]*\s*', '', content)
        content = re.sub(r'```$', '', content)

        return content
    except Exception as e:
        logger.error("Error in simulate_nmap_command_openai: %s\n%s", e, traceback.format_exc())
        raise

