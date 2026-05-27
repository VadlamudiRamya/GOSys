# GOSys – Academic & Alumni Management System

GOSys is a full-stack Academic & Alumni Management System built using the MERN stack (MongoDB, Express.js, React, Node.js). The platform enables colleges to manage students, alumni details, placements, departments, and skill analytics in a centralized hub. It also allows students to connect with alumni, track placement opportunities, and view analytics via an interactive dashboard.

---

## 📌 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Installation & Setup](#️-installation-setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [▶️ Running the Project](#️-running-the-project)
- [🔑 Environment Variables](#-environment-variables)
- [👨‍💼 Admin User Creation](#-admin-user-creation)
- [🎯 Future Enhancements](#-future-enhancements)
- [👩‍💻 Author](#-author)

---

## 🚀 Features

- 🔐 **User Authentication & Authorization**: Secure JWT-based registration, login, and protected routes.
- 👨‍🎓 **Student & Alumni Management**: Maintain detailed records of current students and graduated alumni.
- 📊 **Placement Analytics**: Interactive dashboard with visual charts showing placements, average salary trends, and recruiter stats.
- 🏫 **Department Tracking**: Track academic performance and profiles organized by departments.
- 💡 **In-demand Skills Monitoring**: Track skills required in the industry and map them against student skillsets.
- 🔎 **Search & Filter**: Find alumni and students based on name, skills, graduation year, and company.
- 📱 **Responsive Interface**: Mobile-friendly dashboard designed with React and CSS modules.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: Single Page Application framework
- **Vite**: Ultra-fast build tool and dev server
- **Recharts**: Data visualization charts
- **React Router DOM**: Declarative routing
- **React Icons**: Standard icons
- **Vanilla CSS Modules**: Scoped components styling

### Backend
- **Node.js**: Runtime environment
- **Express.js**: REST API server framework
- **MongoDB & Mongoose**: Database and ODM mapping
- **JWT (JSON Web Tokens)**: Authentication
- **bcryptjs**: Password hashing

---

## 📂 Project Structure

```bash
GOSys/
├── backend/                  # Express API Server
│   ├── config/               # Database connection
│   ├── controllers/          # Business logic handlers
│   ├── middleware/           # Auth and error middleware
│   ├── models/               # MongoDB models (User, Alumni, Academics, Status)
│   ├── routes/               # Express API routes
│   ├── createAdmin.js        # Script to create initial administrator
│   └── server.js             # Main server entrypoint
│
└── frontend/                 # React Frontend Client (Vite)
    ├── src/
    │   ├── components/       # Reusable layout elements (Navbar, Footer, etc.)
    │   ├── context/          # Global state management
    │   ├── pages/            # View pages (Home, Login, Academics, Alumni, Analysis)
    │   ├── App.jsx           # Root layout and routes
    │   └── main.jsx          # App entrypoint
    ├── index.html            # SPA main HTML file
    └── vite.config.js        # Vite configuration
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/VadlamudiRamya/GOSys.git
cd GOSys
```

### 2. Backend Setup

Navigate to the `backend` directory, install dependencies, and configure the environment:

```bash
cd backend
npm install
```

### 3. Frontend Setup

Navigate to the `frontend` directory and install dependencies:

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Project

To run GOSys locally:

### Start the Backend Server
Navigate to the `backend` folder and start the server:
```bash
cd backend
npm start
```
The server will start on port `5000` (or the port defined in your `.env` file).

### Start the Frontend Client
In a new terminal window, navigate to the `frontend` folder and start the dev server:
```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 🔑 Environment Variables

Create a file named `.env` in the `backend` directory and add the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_secret
```

---

## 👨‍💼 Admin User Creation

You can seed an initial administrative user into the database by running the following command from the `backend` folder:

```bash
npm run create-admin
```

---

## 🎯 Future Enhancements

- 📧 **Automated Email Notifications** for placement drives and alumni invitations.
- 🤖 **AI-based Placement Recommendations** matching student skills with current openings.
- 📈 **Advanced Analytics** reports downloadable as PDFs/Excel files.
- 💬 **Real-time Chat** interface for direct communication between students and alumni.

---

## 👩‍💻 Author

**Ramya Vadlamudi**
- GitHub: [VadlamudiRamya](https://github.com/VadlamudiRamya)
