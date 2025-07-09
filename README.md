# HealthLingo
# HealthLingo 🏥

*Transform Complex Medical Documents into Simple Language*

HealthLingo is an AI-powered web application that helps patients understand their medical reports and prescriptions by converting complex medical terminology into clear, easy-to-understand explanations.

## 🌟 What HealthLingo Does

### 📊 Medical Report Analysis
- Upload lab reports, blood tests, X-rays, or any medical document
- AI automatically reads and extracts test results using OCR technology
- Get simple explanations for each test result and what it means for your health
- Ask follow-up questions about your results using voice or text

### 💊 Prescription Explanation  
- Upload prescription images from doctors
- AI identifies medicines, dosages, and instructions
- Receive clear explanations about what each medicine does
- Understand how and when to take your medications

### 🎤 Interactive Features
- *Voice Questions*: Ask questions about your results using voice commands
- *Text-to-Speech*: Listen to explanations instead of reading
- *Follow-up Chat*: Get answers to specific health questions
- *Secure Storage*: Save your medical documents safely

## 🚀 Key Features

### 🤖 Advanced AI Technology
- *OCR Processing*: Automatically reads text from uploaded images
- *Mistral AI Integration*: Uses advanced language models for medical analysis
- *Image Enhancement*: Improves image quality for better text recognition
- *Smart Parsing*: Extracts structured data from unstructured medical text

### 👤 User Management
- *Secure Registration*: Create accounts with medical history and allergies
- *Safe Login*: Protected user authentication system
- *Personal Dashboard*: Track your health documents and history
- *Privacy First*: Your medical data stays secure and private

### 🔍 Smart Analysis
- *Test Result Interpretation*: Explains what normal/abnormal results mean
- *Reference Range Comparison*: Shows if results are within healthy limits
- *Status Indicators*: Clear normal/high/low indicators for each test
- *Personalized Explanations*: Tailored to your medical history

## 💻 Technology Stack

### Backend (Server Side)
- *FastAPI*: Modern, fast web framework for APIs
- *Python*: Core programming language
- *Tesseract OCR*: Optical Character Recognition for reading images
- *OpenCV*: Image processing and enhancement
- *Ollama + Mistral*: Local AI model for medical text analysis
- *MongoDB*: Database for storing user data
- *PassLib*: Secure password hashing

### Frontend (User Interface)
- *React*: Modern JavaScript framework for user interfaces
- *Vite*: Fast development and build tool
- *Tailwind CSS*: Utility-first CSS framework for styling
- *React Router*: Navigation between different pages
- *Axios*: HTTP client for API communication
- *Web Speech API*: Voice recognition and text-to-speech

## 📋 System Requirements

### Required Software
1. *Python 3.8+* - [Download here](https://python.org)
2. *Node.js 16+* - [Download here](https://nodejs.org)
3. *Tesseract OCR* - [Download here](https://github.com/UB-Mannheim/tesseract/wiki)
4. *Ollama* - [Download here](https://ollama.ai)
5. *MongoDB* - Local installation or cloud service

### Python Dependencies
All required packages are in requirements.txt:

fastapi==0.116.0
uvicorn==0.35.0
pytesseract==0.3.13
opencv-python
pillow==11.3.0
pymongo==4.13.2
python-multipart==0.0.20
passlib
bcrypt
python-dotenv
transformers==4.53.1


## 🏁 Installation & Setup

### 1. Clone the Repository
bash
git clone <repository-url>
cd HealthLingo


### 2. Backend Setup
bash
cd backend
pip install -r requirements.txt


### 3. Install Tesseract OCR
- *Windows*: Download installer from GitHub and install to C:\Program Files\Tesseract-OCR\
- *macOS*: brew install tesseract
- *Linux*: sudo apt install tesseract-ocr

### 4. Setup Ollama and AI Model
bash
# Install Ollama from ollama.ai
# Then pull the Mistral model
ollama pull mistral


### 5. Database Configuration
Create a .env file in the backend directory:

MONGO_URI=mongodb://localhost:27017/


### 6. Frontend Setup
bash
cd frontend
npm install


### 7. Run the Application

*Start Backend:*
bash
cd backend
python main.py


*Start Frontend:*
bash
cd frontend
npm run dev


*Access Application:*
Open your browser and go to http://localhost:5173

## 📱 How to Use

### Getting Started
1. *Create Account*: Register with your name, email, and basic medical information
2. *Login*: Access your personal dashboard
3. *Choose Upload Type*: Select medical report or prescription analysis

### For Medical Reports
1. Click "Upload Medical Report" on the home page
2. Select or drag-drop your lab report image
3. Wait for AI processing (usually 15-30 seconds)
4. Review extracted test results with explanations
5. Ask follow-up questions using voice or text
6. Listen to explanations using text-to-speech

### For Prescriptions
1. Click "Upload Prescription" on the home page  
2. Upload clear image of your prescription
3. AI will extract medicine names, dosages, and frequencies
4. Read simple explanations for each medication
5. Understand proper usage instructions

## 🔒 Security & Privacy

- *Encrypted Storage*: All personal data is securely encrypted
- *Temporary Processing*: Uploaded images are processed temporarily and not permanently stored
- *Local AI*: Medical analysis happens locally using Ollama (no data sent to external AI services)
- *Secure Authentication*: Passwords are hashed using industry-standard bcrypt
- *No Data Sharing*: Your medical information is never shared with third parties

## 🎯 Perfect For

- *Patients* who receive complex lab reports
- *Elderly Individuals* who need simple explanations
- *Caregivers* helping family members understand medical documents
- *Anyone* confused by medical terminology
- *Health-Conscious People* wanting to understand their health data better

## ⚠ Important Disclaimers

- *Educational Tool Only*: HealthLingo provides educational explanations, not medical advice
- *Consult Healthcare Providers*: Always discuss results with your doctor or healthcare provider
- *Not a Replacement*: This tool supplements but never replaces professional medical consultation
- *Accuracy Notice*: While we strive for accuracy, always verify important medical information with healthcare professionals

## 🔧 Project Structure


HealthLingo/
├── backend/
│   ├── main.py                 # Main FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── ai_explainer.py        # AI explanation generator
│   ├── pres_exp.py           # Prescription explanation module
│   ├── routes/
│   │   ├── auth.py           # User authentication
│   │   ├── upload.py         # File upload handling
│   │   └── save.py           # Data saving utilities
│   └── utils/
│       ├── db.py             # Database connection
│       ├── ocr.py            # OCR utilities
│       └── nlp.py            # Natural language processing
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React application
│   │   ├── components/       # React components
│   │   │   ├── Home.jsx      # Landing page
│   │   │   ├── UploadReport.jsx     # Medical report upload
│   │   │   ├── UploadPrescription.jsx # Prescription upload
│   │   │   ├── Dashboard.jsx # User dashboard
│   │   │   ├── Login.jsx     # User login
│   │   │   └── Register.jsx  # User registration
│   │   └── assets/           # Static assets
│   ├── package.json          # Node.js dependencies
│   └── vite.config.js        # Vite configuration
└── README.md                 # This file


## 🚧 Current Features

- ✅ User registration and authentication
- ✅ Medical report upload and OCR processing
- ✅ AI-powered test result analysis
- ✅ Prescription upload and medicine explanation
- ✅ Voice questions and text-to-speech
- ✅ Follow-up question system
- ✅ Responsive web interface
- ✅ Secure data handling

## 🔮 Future Enhancements

- 📱 Mobile app development
- 🌐 Multi-language support
- 📊 Health tracking over time
- 🔔 Medication reminders
- 📈 Health trends visualization
- 🤝 Healthcare provider integration

## 🤝 Support & Contact

For questions, issues, or support:
- Check the in-app Resources page
- Report bugs through the application
- Contact the development team

---

*Madecfor better health understanding*
