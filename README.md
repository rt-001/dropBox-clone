# 📦 Project Setup Guide

This guide helps you set up and run the project locally.

---

## 🔧 Setup Instructions

1. **Clone the Repository and Setup Backend and Frontend**

   ```bash
   # Clone the repository
   git clone <your-repo-url>
   cd <project-directory>

   # Setup Backend
   cd backend
   npm install
   npm run build
   npm run start

   # Setup Frontend
   cd ../frontend
   npm install
   npm start
2. **Setup Environment Variables**

   - **Backend (`backend/.env`)**  
     Create a file named `.env` inside the `backend` folder with the following content:
     ```env
     PORT=8000
     MONGOURL=mongodb://localhost:27017/yourdbname
     UPLOADDIR=uploads
     ```
     - `PORT` — Port where the backend will run (8000)  
     - `MONGOURL` — Your MongoDB connection string  
     - `UPLOADDIR` — Directory name for storing uploaded files  

   - **Frontend (`frontend/.env`)**  
     Create a file named `.env` inside the `frontend` folder with the following content:
     ```env
     REACT_APP_API_URL=http://localhost:8000/api
     ```
     - `REACT_APP_API_URL` — Base URL for all frontend API calls (points to your backend)

