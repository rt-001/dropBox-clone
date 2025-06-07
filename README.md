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
3. **RESULT 
   - **HOMEPAGE
     <img width="1435" alt="Screenshot 2025-06-07 at 5 10 32 PM" src="https://github.com/user-attachments/assets/b3825b72-f144-4df4-9687-3e946e4c65f1" />
   - **VIEW FILE 
     <img width="1429" alt="Screenshot 2025-06-07 at 5 11 49 PM" src="https://github.com/user-attachments/assets/e923c82f-88db-408e-9698-4e8558087244" />
   - **Unsupported File 
      <img width="1275" alt="Screenshot 2025-06-07 at 5 12 34 PM" src="https://github.com/user-attachments/assets/4e01008a-7093-4af1-9cb1-b8ad71089c6e" />

     

