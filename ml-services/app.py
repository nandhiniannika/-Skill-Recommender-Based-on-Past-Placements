from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
import pdfplumber
from PIL import Image
import io
from pdf2image import convert_from_bytes
from extract_skills import extract_skills_from_text

# Path to your Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

app = Flask(__name__)
CORS(app, resources={r"/upload-resume": {"origins": "http://localhost:3000"}}) # Enable Cross-Origin requests

# === Extract text from PDF using pdfplumber or OCR fallback ===
def extract_text_from_pdf(pdf_bytes):
    try:
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            text = ''
            for page in pdf.pages:
                text += page.extract_text() or ''
            if text.strip():
                return text
    except Exception as e:
        print("⚠️ pdfplumber failed, falling back to OCR:", e)

    # OCR fallback using Tesseract
    images = convert_from_bytes(pdf_bytes)
    text = ''
    for img in images:
        text += pytesseract.image_to_string(img)
    return text

# === API: Extract skills from plain text ===
@app.route('/extract-skills', methods=['POST'])
def extract_skills_api():
    data = request.get_json()
    resume_text = data.get("text")
    if not resume_text:
        return jsonify({"error": "No text provided"}), 400

    skills = extract_skills_from_text(resume_text)
    return jsonify({"skills": skills})

# === API: Extract skills from uploaded PDF file ===
@app.route('/extract-skills-file', methods=['POST'])
def extract_skills_from_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in request'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        pdf_bytes = file.read()
        print("📄 File received, size:", len(pdf_bytes))

        resume_text = extract_text_from_pdf(pdf_bytes)
        print("📜 Extracted text preview:", resume_text[:300])  # Optional preview

        skills = extract_skills_from_text(resume_text)
        print("✅ Extracted skills:", skills)

        return jsonify({"skills": skills})

    except Exception as e:
        print("❌ Exception during extraction:", str(e))
        return jsonify({"error": str(e)}), 500

# === Start the Flask app ===
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
