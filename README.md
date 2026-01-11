<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
</p>

<h1 align="center">✨ Eleva</h1>

<p align="center">
  <strong>Transform simple descriptions into powerful, structured prompts.</strong>
  <br />
  Get 10x better LLM outputs with every AI interaction.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

---

## 🎯 What is Eleva?

Eleva is an AI-powered prompt engineering tool that transforms your basic ideas into well-structured, detailed prompts. Whether you're working with ChatGPT, Claude, Gemini, or any other LLM, Eleva helps you get better results every time.

**The Problem:** Most people write vague prompts and get mediocre AI responses.

**The Solution:** Eleva enhances your prompts with proper structure, context, and constraints - turning "write me an email" into a comprehensive prompt that gets exactly what you need.

---

## ⚡ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Enhancement** | Transforms basic prompts into detailed, structured prompts using Gemini AI |
| 💬 **Chat Interface** | Modern chat-based UI with full conversation history |
| 🧠 **Context Awareness** | AI remembers previous messages for consistent enhancements |
| 🎤 **Voice Input** | Speech-to-Text support using Web Speech API |
| 💾 **Persistent Storage** | Chat history saved locally - never lose your prompts |
| 📋 **One-Click Copy** | Instantly copy enhanced prompts to clipboard |
| 📱 **Fully Responsive** | Beautiful experience on desktop, tablet, and mobile |

---

## 🎬 Demo

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│  Your Input                                                 │
│  "write an email to my boss about vacation"                 │
└─────────────────────────────────────────────────────────────┘
                              ⬇️
                         ✨ Eleva AI ✨
                              ⬇️
┌─────────────────────────────────────────────────────────────┐
│  Enhanced Prompt                                            │
│                                                             │
│  "Act as a professional communication expert. Write a      │
│  formal yet friendly email to request vacation time from   │
│  my supervisor. Include: specific dates, coverage plan,    │
│  reason (if appropriate), and express gratitude. Maintain  │
│  a respectful tone while being clear about the request.    │
│  Format with proper greeting and sign-off."                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Gemini API key ([Get one free](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/DarkkkSoul/prompt-enhancer.git

# Navigate to directory
cd prompt-enhancer

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Add your Gemini API key to .env
# VITE_GEMINI_API_KEY=your_key_here

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start enhancing your prompts!

---

## 🛠️ Tech Stack

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
      <br>React 19
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
      <br>Vite
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
      <br>Tailwind 4
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=js" width="48" height="48" alt="JavaScript" />
      <br>JavaScript
    </td>
  </tr>
</table>

**Additional Libraries:**
- `@google/genai` - Gemini AI integration
- `react-router-dom` - Client-side routing
- `react-markdown` - Markdown rendering
- `lucide-react` - Beautiful icons

---

## 📁 Project Structure

```
src/
├── 📂 components/
│   ├── 📂 common/
│   │   └── Header.jsx          # Navigation header
│   ├── 📂 enhancepage/
│   │   ├── ChatMessages.jsx    # Chat message bubbles
│   │   ├── ChatSidebar.jsx     # Chat history sidebar
│   │   └── ViewPrompt.jsx      # Prompt display component
│   └── 📂 landingpage/
│       └── Window.jsx          # Feature showcase window
├── 📂 hooks/
│   └── useChatHistory.js       # Chat state management
├── 📂 pages/
│   ├── Enhance.jsx             # Main chat page
│   └── Landing.jsx             # Landing page
├── 📂 utils/
│   └── generate.js             # Gemini AI integration
├── 📂 arrays/
│   └── features.js             # Feature list data
└── 📂 styles/
    └── fonts.css               # Custom fonts
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/DarkkkSoul">DarkkkSoul</a>
</p>
