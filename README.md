# Quotation Analysis System

A full-stack application for analyzing PDF quotations using AI. Upload PDF files and extract structured data automatically.

## Prerequisites

- **Node.js** 
- **Python** 
- **npm** 

## Project Structure

```
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express backend
└── ai-engine/         # Python Flask AI service
```

## Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

### 3. AI Engine Setup

```bash
cd ai-engine
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

## Running the Application

You need to run all 3 services simultaneously in separate terminal windows.

### Terminal 1 - Backend (Port 3000)

```bash
cd backend
node server.js
```

You should see: `Server running on http://localhost:3000`

### Terminal 2 - Frontend (Port 5173)

```bash
cd frontend
npm run dev
```

You should see: `Local: http://localhost:5173/`

### Terminal 3 - AI Engine (Port 8000)

```bash
cd ai-engine
venv\Scripts\activate    # Windows
# or
source venv/bin/activate  # Mac/Linux

python app.py
```

You should see: `Running on http://127.0.0.1:8000`

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Upload a PDF quotation file
3. The system will analyze it and display the results

## Stopping the Services

Press `Ctrl+C` in each terminal window to stop the respective service.

## Troubleshooting

- **Port already in use**: Make sure no other applications are using ports 3000, 5173, or 8000
- **Module not found**: Run `npm install` or `pip install -r requirements.txt` again
- **Upload fails**: Ensure all 3 services are running before uploading files
