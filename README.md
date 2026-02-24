# Task Management System

A Full-Stack Task Management Web Application built using:

- **Frontend:** HTML, CSS (Premium SaaS UI), JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Token)  
- **Authorization:** Role-based Access Control (Admin & Employee)

---

## 🚀 Features

### 🔐 Authentication System
- Employee Registration
- Secure Login with JWT
- Role-based access (Admin / Employee)
- Protected routes using middleware
- Logout functionality

---

### 👨‍💼 Admin Features
- Create tasks
- Assign tasks to employees
- View all tasks
- Update task status
- Delete tasks
- Dashboard statistics:
  - Total Tasks
  - Completed Tasks
  - Pending Tasks

---

### 👨‍💻 Employee Features
- View assigned tasks only
- Update task status:
  - Pending
  - In Progress
  - Completed
- Premium UI dashboard
- Secure logout

---

## 🏗️ Project Structure

    employee-task-management/
    │
    ├── backend/
    │ ├── controllers/
    │ │ ├── authController.js
    │ │ └── taskController.js
    │ ├── middleware/
    │ │ └── authMiddleware.js
    │ ├── models/
    │ │ ├── User.js
    │ │ └── Task.js
    │ ├── routes/
    │ │ ├── authRoutes.js
    │ │ └── taskRoutes.js
    │ ├── server.js
    │ └── .env
    │
    ├── frontend/
    │ ├── login.html
    │ ├── register.html
    │ ├── admin-dashboard.html
    │ ├── employee-dashboard.html
    │ ├── login.js
    │ ├── register.js
    │ ├── admin.js
    │ ├── employee.js
    │ └── style.css
    │
    └── README.md

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository


    git clone https://github.com/akashsingg2005/Task-Management-System.git
    cd Task-Management-System


### 2️⃣ Install Backend Dependencies

    npm install

### 3️⃣ Create .env File
Create a .env file in the backend root directory:

    MONGO_URI=mongodb+srv://akashsingg23:password@cluster0.a1v9sjh.mongodb.net/?appName=Cluster0
    JWT_SECRET=supersecretkey
    PORT=5000

### 4️⃣ Start Server

    node server.js

Server runs on:
                          
                          
    http://localhost:5000

### 5️⃣ Run Frontend

Open frontend files using Live Server or visit:

    http://127.0.0.1:3000/login.html

## 🔒 Security Implementation

- Password hashing using bcrypt

- JWT token authentication

- Role-based route protection

- Middleware-based authorization

- Protected API endpoints    

## 🧠 Learning Outcomes

-  This project demonstrates:

- REST API Design

- JWT Authentication

- Role-based Authorization

- MongoDB Schema Design

- Frontend-Backend Integration

- Fetch API usage

- Secure state handling with localStorage    

