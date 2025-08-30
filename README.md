# BRTNeura – Idea & Task Management App

**BRTNeura** is a full-stack web application for managing ideas/tasks efficiently. Users can create, view, vote on, and filter ideas using a clean dashboard interface.

---

## Features
- User **Sign Up** and **Login** Using email password or **Google Account**
- **Create Idea** with title, impact, effort, and status
- **Dashboard** to view all ideas in a table format
- Filter ideas by **status**: Open, In Progress, Closed
- **Vote** for ideas and **Delete** unwanted ideas

---

## Project Structure


BRTNeura/
│
├── api/ ← FastAPI backend
│ ├── main. py ← Main backend server
│ ├── requirements.txt ← Backend dependencies
│ └── tests/ ← Backend tests
│
├── src/ ← React frontend
│ ├── Components/
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── SignUp.jsx
│ │ ├── Dashboard.jsx
│ │ └── CreateIdea.jsx
│ ├── App.jsx
│ └── ...
│
├── package.json
└── README .md



---


---

## Tech Stack
- **Frontend:** React, React Router, CSS  
- **Backend:** FastAPI (Python)

---

## Installation & Running

### Frontend
1. Navigate to frontend folder:
```bash
cd web

Install dependencies:
npm install


Start development server:
npm run dev


Open http://localhost:5173/
 in your browser

Backend

2.Navigate to backend folder:

cd api

Install dependencies:

pip install -r requirements.txt


Start FastAPI server:

uvicorn main:app --reload


Backend runs on http://127.0.0.1:8000

```



# Usage

* Sign Up → Register with name, email, and password

* Login → Enter credentials to access dashboard
 
* Create Idea → Fill in title, impact, effort, status → Submit
 
* Dashboard → View all ideas, filter by status, vote or delete ideas
 
* Notes
 
* Frontend stores data in React state; page refresh resets all ideas
 
* Backend is currently for API handling; full persistence can be added with a database
 
* This structure allows seamless full-stack integration in the future


