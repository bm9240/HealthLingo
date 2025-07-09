import subprocess  # ✅ Add this

def explain_prescription_medicine(medicine_name: str):
    prompt = f"""You are a medical assistant. Explain the medicine "{medicine_name}" in simple terms.
What is it used for, and what should a patient know about it?
"""

    result = subprocess.run(
        ["ollama", "run", "mistral"],
        input=prompt.encode(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    return result.stdout.decode().strip()


