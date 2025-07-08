from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import shutil
import os
import cv2
import pandas as pd
import re
import pytesseract
from rapidfuzz import fuzz

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend is running"}


# Paths
UPLOAD_DIR = "uploads"
LOINC_PATH = "data/loinc.csv"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Tesseract path (adjust if needed)
pytesseract.pytesseract.tesseract_cmd = r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

# ---------------------------- Utils ----------------------------

def preprocess_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError("Image not found.")
    img = cv2.resize(img, None, fx=2.5, fy=2.5, interpolation=cv2.INTER_CUBIC)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    adaptive_thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                            cv2.THRESH_BINARY_INV, 35, 11)
    morph = cv2.morphologyEx(adaptive_thresh, cv2.MORPH_CLOSE,
                             cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2)))
    final = cv2.bitwise_not(morph)
    return final

def clean_line(line):
    replacements = {'me/dL': 'mg/dL', '4./': '4.7', 'l.': '1.', '|': 'I', 'O': '0'}
    line = line.strip()
    for wrong, right in replacements.items():
        line = line.replace(wrong, right)
    return re.sub(r'[^\x00-\x7F]+', '', line)

def is_junk_line(line):
    junk_keywords = ["method", "note", "dr", "interpretation", "date", "sample", "electrode", "arsenazo", "report", "unit"]
    return any(kw in line.lower() for kw in junk_keywords)

def get_status(result, ref_range):
    try:
        result_val = float(result)
        low, high = map(float, re.findall(r"[\d.]+", ref_range))
        if result_val < low:
            return "Low"
        elif result_val > high:
            return "High"
        else:
            return "Normal"
    except:
        return "Unknown"

def load_loinc(path):
    return pd.read_csv(path, dtype=str)

def match_loinc_name(test_name, loinc_df):
    best_score = 0
    best_match = ""
    for name in loinc_df["LONG_COMMON_NAME"].dropna():
        score = fuzz.partial_ratio(test_name.lower(), name.lower())
        if score > best_score:
            best_score = score
            best_match = name
    return best_match if best_score > 70 else ""

def extract_text(image_path):
    processed_img = preprocess_image(image_path)
    config = r'--oem 3 --psm 6'
    return pytesseract.image_to_string(processed_img, config=config)

def process_report(image_path, loinc_path):
    text = extract_text(image_path)
    loinc_df = load_loinc(loinc_path)
    lines = [clean_line(l) for l in text.split("\n") if l.strip()]
    results = []
    i = 0

    while i < len(lines):
        line = lines[i]
        if is_junk_line(line):
            i += 1
            continue

        next_line = lines[i + 1] if i + 1 < len(lines) else ""
        combined = f"{line} {next_line}".strip()

        match = re.match(r'^(.+?)\s+([\d.]+)\s+([\d.]+)\s*-\s*([\d.]+)\s*([a-zA-Z/%²µμmLdL]*)$', combined)
        if match:
            test = match.group(1).strip()
            result = match.group(2)
            ref_range = f"{match.group(3)} - {match.group(4)}"
            unit = match.group(5)
            status = get_status(result, ref_range)
            loinc_name = match_loinc_name(test, loinc_df)
            description = f"This test '{loinc_name or test}' is used to monitor your health and assess conditions based on lab values." if loinc_name else ""
            results.append({
                "Test": test,
                "Result": result,
                "Reference Range": ref_range,
                "Unit": unit,
                "Status": status,
                "LOINC Name": loinc_name,
                "Description": description
            })
            i += 2
            continue

        match = re.match(r'^(.+?)\s+([\d.]+)$', combined)
        if match:
            test = match.group(1).strip()
            result = match.group(2)
            loinc_name = match_loinc_name(test, loinc_df)
            description = f"This test '{loinc_name or test}' is used to monitor your health and assess conditions based on lab values." if loinc_name else ""
            results.append({
                "Test": test,
                "Result": result,
                "Reference Range": "",
                "Unit": "",
                "Status": "Unknown",
                "LOINC Name": loinc_name,
                "Description": description
            })
            i += 2
            continue

        i += 1

    return results

# ---------------------------- API Endpoint ----------------------------

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        results = process_report(file_path, LOINC_PATH)
        return JSONResponse(content={"results": results})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

