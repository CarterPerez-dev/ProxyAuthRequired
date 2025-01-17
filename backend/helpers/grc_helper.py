import os
import json
import logging
import re  
from API.AI import client

logger = logging.getLogger(__name__)

def generate_grc_question(category, difficulty):
    """
    Generates a GRC-related multiple-choice question in JSON format.
    The model returns a JSON object with keys:
      question (string)
      options (array of 4 strings)
      correct_answer_index (int)
      explanations (dict of strings for "0","1","2","3")
      exam_tip (string)
    """

    prompt = f""" 
You are an expert in concepts found in certifications like CISSP, CompTIA Advanced Security Practitioner (CASP+), CISM, CRISC, and others. Your role is to generate 
challenging and diverse test questions using advanced mult-layered reasoning, related to governance, risk management, risk thresholds, types of risk, Audit, Management, Policy, Cyber Security Ethics, Threat Assessment, 
Leadership, Business Continuity, compliance, regulations, incident resposne, Incident Response and more. focusing on preparing for exams like CISSP/ISC2 and CompTIA certifications. Ensure the questions cover a wide range of scenarios,
principles, and concepts, with multiple-choice answers that are nuanced and complex and specific, avoiding repetitive patterns or overly simplified examples.

CONTEXT: The user has selected:
- Category: {category} (e.g., 'Regulation', 'Risk Management', 'Compliance', 'Audit', 'Governance', 'Management', 'Policy', 'Ethics', 'Threat Assessment', 'Leadership', 'Business Continuity', 'Incident Response', 'Random')
- Difficulty: {difficulty} (e.g., 'Easy', 'Medium', 'Hard')

REQUIREMENTS
1. Four options (0, 1, 2, 3) total, one correct answer. The incorrect options should be very plausible but not correct, requiring the test-taker to carefully differentiate.

2. Explanations:
   - For the correct answer: Provide multiple sentences detailing exactly why it’s correct, clearly tying it back to the question’s scenario or concept. Show how it fulfills the requirements asked in the question as well as why the other answer choices are incorrect/not the correct answer..
   - For each incorrect answer: Provide multiple sentences detailing why it is NOT correct aswell as why the other incorrect answer choices are incorrect, and why then tell the user what the correct answer is and why it is correct using advanced multi-layered reasoning. 
     Do not just say it’s incorrect; fully explain why it falls short. 
     Highlight conceptual differences, limitations, or focus areas that differ from the question’s criteria.
   - Regardless of user choice, the generated output must contain full explanations for all answer choices provided. The explanations are produced in advance as part of the JSON object. Each explanation should be at least 3 sentences, rich in detail and conceptual clarity using advanced multi-layered reasoning.

3. Include an "exam_tip" field that provides a short, memorable takeaway or mnemonic to help differentiate the correct concept from the others. The exam tip should help the user recall why the correct answer stands out using advanced multi-layered reasoning.

4. Return ONLY a JSON object with the fields:
   "question", "options", "correct_answer_index", "explanations", and "exam_tip"
   No extra text, no Markdown, no commentary outside the JSON.

5. For each explanation (correct and incorrect):
   - At minimum of 3 sentences for the correct answer.
   - if the user gets the answer correct provide minium 3 senetence answer as to why it is correct, but also why the other answer choices listed are not the correct answer using advanced multi-layered reasoning.
   - Substantial detail.
   - Clearly articulate conceptual reasons, not just factual statements using advanced multi-layered reasoning.

EXAMPLE FORMAT (this is not real content, just structure, make sure to use all topics not just the topic provided in this example):
{{
  "question": "The question",
  "options": ["Option 0","Option 1","Option 2","Option 3"],
  "correct_answer_index": 2,
  "explanations": {{
    "0": "Explain thoroughly why option 0 fails. Mention its scope, focus areas, and why that doesn't meet the question criteria and then explain what the correct answer is and why it is correct aswell as why the other answer choices are incorrect using advanced multi-layered reasoning.",
    "1": "Explain thoroughly why option 1 fails. Mention its scope, focus areas, and why that doesn't meet the question criteria and then explain what the correct answer is and why it is correct aswell as why the other answer choices are incorrect using advanced multi-layered reasoning.",
    "2": "Explain thoroughly why option 2 is correct, linking its characteristics to the question scenario and why the other answer choices are incorrect using advanced multi-layered reasoning",
    "3": "Explain thoroughly why option 3 fails. Mention its scope, focus areas, and why that doesn't meet the question criteria and then explain what the correct answer is and why it is correct aswell as why the other answer choices are incorrect using advanced multi-layered reasoning."
  }},
  "exam_tip": "A short, memorable hint or mnemonic that differentiates the correct approach from others using advanced multi-layered reasoning."
}}

Now generate the JSON object following these instructions.
"""



    try:
        response = client.chat.completions.create(
            model="gpt-4o",  
            messages=[{"role": "user", "content": prompt}],
            max_tokens=900,
            temperature=0.6,
        )

        content = response.choices[0].message.content.strip()

      
        content = re.sub(r'^```.*\n', '', content)
        content = re.sub(r'\n```$', '', content)

        try:
            generated_question = json.loads(content)
        except json.JSONDecodeError as e:
            logger.error("JSON parsing error in generate_grc_question: %s", e)
            logger.error("Model returned: %s", content)
            raise ValueError("Model did not return valid JSON.") from e

        logger.info("Generated GRC question successfully.")
        return generated_question

    except Exception as e:
        logger.error(f"Error generating GRC question: {str(e)}")
        raise
