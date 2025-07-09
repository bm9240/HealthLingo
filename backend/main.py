from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import shutil
import os
import cv2
import pytesseract
import subprocess
import json
from pydantic import BaseModel

from ai_explainer import generate_explanation  # 💡 Your explanation generator

# ---------------------- FastAPI Setup ---------------------- #
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running"}

# ---------------------- Config ---------------------- #
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Set your Tesseract path (Windows)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# ---------------------- Image Preprocessing ---------------------- #
def preprocess_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError("Image not found.")
    img = cv2.resize(img, None, fx=2.5, fy=2.5, interpolation=cv2.INTER_CUBIC)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                   cv2.THRESH_BINARY_INV, 35, 11)
    morph = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE,
                             cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2)))
    return cv2.bitwise_not(morph)

# ---------------------- OCR ---------------------- #
def extract_text(image_path):
    processed_img = preprocess_image(image_path)
    config = r'--oem 3 --psm 6'
    return pytesseract.image_to_string(processed_img, config=config)

# ---------------------- Mistral Analysis ---------------------- #
def process_with_mistral(ocr_text):
    prompt = f"""Extract all medical tests and their values from the text below.
Return them in JSON list format. Each item must include the following keys:
"Test", "Result", "Unit", "Reference Range", "Status".

TEXT:
{ocr_text}
"""

    result = subprocess.run(
        [r"C:\Users\Anishka\AppData\Local\Programs\Ollama\ollama.exe", "run", "mistral"],
        input=prompt.encode(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=240  # Increase if needed
    )

    try:
        output = result.stdout.decode().strip()
        # If Mistral returns a code block like ```json\n...\n``` remove it
        if "```json" in output:
            output = output.split("```json")[1].split("```")[0].strip()
        return json.loads(output)
    except Exception as e:
        return [{"error": "AI parsing failed", "details": str(e), "raw_output": output}]

# ---------------------- Upload API ---------------------- #
@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Step 1: OCR
        ocr_text = extract_text(file_path)

        # Step 2: Ask Mistral to extract medical data
        extracted = process_with_mistral(ocr_text)

        # Step 3: Generate explanations for each test
        for item in extracted:
            if "Test" in item and "Result" in item and "Status" in item:
                item["Explanation"] = generate_explanation(
                    item["Test"], item["Result"], item["Status"]
                )

        return JSONResponse(content={"results": extracted})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
class FollowUpRequest(BaseModel):
    query: str
    context: str

@app.post("/follow-up")
async def follow_up(req: FollowUpRequest):
    query = req.query
    context = req.context

    prompt = f"""You are a helpful medical assistant.
Use the following extracted medical test data to answer the user's question.

Medical Test Data (in JSON): {context}

User's Question: {query}

Answer in clear and simple language:
"""

    result = subprocess.run(
        [r"C:\Users\Anishka\AppData\Local\Programs\Ollama\ollama.exe", "run", "mistral"],
        input=prompt.encode(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    try:
        answer = result.stdout.decode().strip()
        return {"explanation": answer}
    except Exception as e:
        return {"explanation": "AI error: " + str(e)}
