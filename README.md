# 🌊 Ocean: Your Journey to Calm

An AI-powered journaling companion that makes self-reflection a seamless and insightful daily habit.

## ✨ Features

- **🤖 AI-Powered Prompts** - Context-aware reflection questions based on your journal history and personal goals
- **📖 Interactive Journal** - Beautiful page-like interface to review past entries
- **📅 Streak Tracking** - Visual calendar with streak counter to build consistent habits
- **🎯 Goal Management** - Set and track personal wellness objectives
- **📊 Sentiment Analysis** - AI-powered insights into your emotional patterns and themes
- **🔒 Privacy-First** - All data stored locally

## 🚀 Setup

### Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js** 16.0 or higher ([Download](https://nodejs.org/))
- **npm** 8.0 or higher (comes with Node.js)
- **Ollama** ([Install instructions](https://ollama.com/download))

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/oceanAI.git
cd oceanAI
```

#### 2. Install Frontend Dependencies
```bash
npm install
```

#### 3. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

#### 4. Set Up Ollama

**Install Ollama** (if not already installed):

- **macOS**: `brew install ollama`
- **Linux**: `curl -fsSL https://ollama.com/install.sh | sh`
- **Windows**: Download from [ollama.com](https://ollama.com/download)

**Download the AI model**:
```bash
# Start Ollama service (keep this terminal open)
ollama serve
```

In a **new terminal**:
```bash
# Download Llama 3.2 (recommended, ~2GB)
ollama pull llama3.2

# Verify installation
ollama list
```

#### 5. Configure Backend
```bash
cd server
cp .env.example .env
```

The default `.env` settings should work:
```
OLLAMA_URL=http://127.0.0.1:11434
MODEL=llama3.2
PORT=3001
```

## ▶️ Running the Application

You'll need **three terminal windows**:

### Terminal 1: Start Ollama
```bash
ollama serve
```

Keep this running. You should see:
```
Ollama is running
```

### Terminal 2: Start Backend Server
```bash
cd server
npm run dev
```

You should see:
```
🌊 Ocean Backend running on http://localhost:3001
Using AI Model: llama3.2
Ollama URL: http://127.0.0.1:11434
```

### Terminal 3: Start Frontend
From the root directory:
```bash
npm run dev
```

You should see:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 🎉 Open the App

Visit **http://localhost:5173** in your browser!