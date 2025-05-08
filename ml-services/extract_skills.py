import re

# === Define soft skill keywords ===
soft_keywords = [
    "communication", "teamwork", "leadership", "presentation", "time management",
    "problem solving", "decision making", "team collaboration", "public speaking",
    "client handling", "organizational behavior", "business communication",
    "customer interaction", "customer service", "team management", "sales",
    "marketing", "analytical thinking", "strategic planning", "entrepreneurship",
    "data interpretation", "business analysis", "business forecasting"
]

# === Define technical skill keywords ===
technical_keywords = [
    # Programming Languages
    "java", "python", "c++", "javascript", "typescript", "c", "go", "kotlin", "dart",

    # CS Concepts
    "oop", "object oriented programming", "algorithms", "data structures",

    # Web Development
    "html", "css", "react", "angular", "vue", "node.js", "express", "next.js",
    "frontend development", "backend development", "full stack development", "web development",

    # Databases
    "sql", "mysql", "mongodb", "postgresql", "oracle",

    # Dev Tools
    "git", "github", "vscode", "intellij", "eclipse", "docker", "jenkins",

    # Data Science & Analytics
    "excel", "power bi", "tableau", "data analysis", "data visualization", 
    "pandas", "numpy", "scikit-learn", "matplotlib",

    # AI / ML
    "machine learning", "deep learning", "tensorflow", "keras", 
    "artificial intelligence", "opencv",

    # Cloud & Networking
    "aws", "azure", "gcp", "cloud computing", "networking", "cybersecurity",

    # Testing & QA
    "testing", "unit testing", "automation", "selenium",

    # Electronics / Embedded
    "electronics", "digital systems", "vlsi", "pcb design", "microcontrollers",
    "circuit design", "signal processing", "embedded systems"
]

# Normalize keyword sets
soft_keywords_set = set(soft_keywords)
technical_keywords_set = set(technical_keywords)

# === Extract skills from text ===
def extract_skills_from_text(text):
    text = text.lower()
    extracted_soft = set()
    extracted_technical = set()

    # Match skills using word boundaries
    for skill in technical_keywords_set:
        if re.search(r'\b' + re.escape(skill) + r'\b', text):
            extracted_technical.add(skill.title())

    for skill in soft_keywords_set:
        if re.search(r'\b' + re.escape(skill) + r'\b', text):
            extracted_soft.add(skill.title())

    return {
        "technical_skills": sorted(extracted_technical),
        "soft_skills": sorted(extracted_soft)
    }
