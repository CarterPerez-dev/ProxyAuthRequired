import logging
import json
from API.AI import client

logger = logging.getLogger(__name__)

def generate_grc_questions_stream(category, difficulty):
    """
    Streams EXACTLY THREE advanced GRC questions in a JSON array, but chunk-by-chunk
    rather than word-by-word. This means we yield partial content from GPT as it arrives
    without splitting on spaces. The front end can display partial JSON in real time.
    """

    prompt = f"""
You are an expert in concepts found in certifications like CISSP, CompTIA Advanced Security Practitioner (CASP+), CISM, CRISC, and others. 
Your role is to generate challenging and diverse test questions related to governance, risk management, risk thresholds, types of risk, 
Audit, Management, Policy, Cyber Security Ethics, Threat Assessment, Leadership, Business Continuity, compliance, regulations, 
incident response, and more, focusing on preparing for exams like CISSP and CompTIA certifications. Ensure the questions cover a wide 
range of scenarios, principles, and concepts, with multiple-choice answers that are nuanced, complex, and specific, avoiding repetitive 
patterns or overly simplified examples.

CONTEXT: The user has selected:
- Category: {category}
- Difficulty: {difficulty}

REQUIREMENTS:
1. Generate EXACTLY 3 questions in one JSON array. Each question has:
   - "question": string,
   - "options": array of exactly 4 strings (indexes 0,1,2,3),
   - "correct_answer_index": integer (0,1,2,3),
   - "explanations": object with keys "0","1","2","3" (multi-sentence detail),
   - "exam_tip": short mnemonic/hint.

2. The correct answer's explanation has at least 3 sentences describing precisely why it is correct, 
   and also clarifies why the others are incorrect.

3. Each incorrect answer's explanation has multiple sentences explaining why it is wrong, 
   plus clarifies what the correct choice is and why the other answer choices are also incorrect or less suitable.

4. Provide an "exam_tip" as a short, memorable mnemonic or hint to help the test-taker recall the correct concept.

5. Return ONLY the JSON array with exactly 3 objects. No extra text, disclaimers, or preludes.

6. Each explanation must be at least 3 sentences, offering substantial detail and conceptual clarity.

Now generate the JSON object following these instructions. 
Remember: 3 items in the array, each question shaped as above, nothing else.
"""

    try:
        # Make the streaming request to GPT
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=3000,  # Adjust as needed
            temperature=0.7,  # Adjust as needed
            stream=True
        )

        def generator():
            try:
                for chunk in response:
                    delta = chunk.choices[0].delta
                    if delta:
                        content = getattr(delta, "content", None)
                        if content:
                            # **Chunk-based** streaming (no splitting on spaces):
                            yield content
            except Exception as e:
                logger.error(f"Error streaming GRC questions: {e}")
                yield ""

        return generator()

    except Exception as e:
        logger.error(f"Error generating GRC questions (stream): {e}")

        def err_gen():
            yield ""
        return err_gen()

