import logging
from API.AI import client

logger = logging.getLogger(__name__)

def generate_analogy_stream(analogy_type, concept1, concept2, concept3, category):
    """
    Streams the analogy text in partial chunks (NOT forcibly splitting by word),
    so the front-end can handle how to display it (word-by-word or otherwise).
    """


    if analogy_type == "comparison" and concept2:
        concept_part = f"Compare {concept1} and {concept2}"
    elif analogy_type == "triple" and concept2 and concept3:
        concept_part = f"Compare {concept1}, {concept2}, and {concept3}"
    else:

        concept_part = f"Generate an analogy for the concept {concept1}"


    prompt = (
        f"{concept_part} using the context of {category}. "
        "Make it easy to understand yet informative, in a teaching style, concise but in depth, and entertaining, "
        "with a final memory hook. Do NOT say 'Sure, let's dive in'; just provide the analogy only."
    )

    try:
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="gpt-4o",
            max_tokens=1200,
            temperature=0.7,
            stream=True
        )

        def generator():
            try:
                for chunk in response:
                    delta = chunk.choices[0].delta
                    if delta:
                        content = getattr(delta, "content", None)
                        if content:

                            yield content
            except Exception as e:
                logger.error(f"Error streaming analogy: {e}")

                yield ""

        return generator()

    except Exception as e:
        logger.error(f"Error generating analogy stream: {e}")

        def err_gen():
            yield ""
        return err_gen()

