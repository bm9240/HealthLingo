# ai_explainer.py
import subprocess

def generate_explanation(test, result, status):
    prompt = (
        f"Explain to a patient in simple terms:\n\n"
        f"Test: {test}\nResult: {result}\nStatus: {status}\n\n"
        f"Give a short explanation of what this means for their health, in 2-3 lines."
    )
    try:
        result = subprocess.run(
            ["ollama", "run", "mistral"],
            input=prompt.encode(),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=120
        )
        output = result.stdout.decode().strip()
        return output if output else "AI could not generate explanation."
    except Exception as e:
        return f"AI error: {str(e)}"
