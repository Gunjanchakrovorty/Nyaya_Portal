⚖️ Nyaya Portal – AI Judicial Intelligence System

Nyaya Portal is an AI-powered judicial assistance platform designed to streamline legal case tracking, lawyer discovery, and smart complaint filing through a structured 5-step legal intake system.

This project demonstrates how AI and intelligent workflows can support judicial reform, transparency, and structured legal assistance.

🚀 Features
👤 Citizen Portal

Track case by case number

View case progress timeline

View priority score and risk index

Escalation request option

Browse verified lawyers

📄 Smart 5-Step Complaint Filing

Structured legal intake system that collects:

Type of legal issue

Incident date

Financial impact

Opposing party

Urgency explanation

Generates structured summary useful for lawyers.

⚖️ Lawyer Discovery

Filter by specialization

Experience & fee range display

Delay index visualization

Rating display

🛠 Tech Stack
Frontend

React (Vite)

TypeScript

Tailwind CSS

shadcn UI

Framer Motion

Lucide Icons

Backend (Optional AI Integration)

Node.js

Express

Groq API (LLaMA 3) OR OpenAI API

📂 Project Structure
courtlytics-ai-main/
│
├── src/
│   ├── pages/
│   │   └── CitizenPortal.tsx
│   ├── components/
│   ├── data/
│   └── App.tsx
│
├── server/
│   ├── index.js
│   └── .env
│
├── package.json
└── README.md

🧑‍💻 How To Run The Project
🔹 Step 1 – Install Node.js

Make sure Node.js is installed:

node -v
npm -v


If not installed, download from:

https://nodejs.org/

🔹 Step 2 – Install Frontend Dependencies

From project root:

npm install

🔹 Step 3 – Start Frontend
npm run dev


You will see:

Local: http://localhost:8080/


Open:

http://localhost:8080

🧠 Optional: Enable AI Backend

If you want AI-powered legal analysis:

🔹 Step 4 – Setup Backend

Navigate to project root and install backend packages:

npm install express cors dotenv openai

🔹 Step 5 – Create Environment File

Create:

server/.env


Add your API key:

For Groq (recommended free tier):

GROQ_API_KEY=your_api_key_here


Get free key from:
https://console.groq.com/

🔹 Step 6 – Start Backend
node server/index.js


You should see:

Server running on http://localhost:5000

🔹 Step 7 – Connect Frontend to Backend

Ensure your AI fetch call uses:

http://localhost:5000/api/ai

🔐 Important Notes

Never expose API keys in frontend code

Add .env to .gitignore

Restart server after any .env changes

Always run backend and frontend in separate terminals

🎯 Purpose of This Project

This project demonstrates:

AI-assisted legal intake

Structured case classification

Transparent case tracking

Data-driven judicial insights

Legal workflow digitization

🚀 Future Enhancements

AI severity scoring

Automatic lawyer matching

Complaint PDF generator

Case database integration

Authentication system

Role-based dashboards

Deployment to Vercel + Render

🏁 License

For educational, research, and hackathon use.