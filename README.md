# Task Manager App

A full stack web application for managing tasks with secure user authentication, built with React, Node.js, Express, and MongoDB. This project demonstrates proficiency in modern web development, RESTful API design, and cybersecurity practices, including JWT-based authentication and password hashing. Developed as part of a CS/cybersecurity portfolio to showcase skills aligned with CompTIA Security+ certification goals.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Progress](#progress)
- [Screenshots](#screenshots)
- [Setup Instructions](#setup-instructions)
- [Future Improvements](#future-improvements)
- [Contact](#contact)
- [License](#license)

## Project Overview
The Task Manager App allows users to register, log in, and manage personal tasks (create, read, update, delete) through a secure, user-friendly interface. Built with a React front-end and Node.js/Express back-end, it uses MongoDB Atlas for persistent storage and implements JWT-based authentication to protect routes. The project emphasizes secure coding practices, error handling, and a seamless user experience, making it a strong addition to a CS/cybersecurity portfolio.

## Features
- **User Authentication**:
  - Secure registration and login with email and password.
  - Passwords hashed using bcrypt for enhanced security.
  - JSON Web Tokens (JWT) for session management and protected API routes.
  - Automatic redirect to task view after login.
  - Logout functionality clearing session data.
- **Task Management**:
  - Create tasks with title, description, and status (To Do, In Progress, Done).
  - View all tasks in a list, with options to update status or delete.
  - Persistent storage in MongoDB Atlas.
- **Security**:
  - Protected API routes requiring JWT authentication.
  - CORS configured to allow only trusted origins (`http://localhost:3000`).
  - Environment variables for sensitive data (MongoDB URI, JWT secret).
- **Front-End**:
  - Responsive routing with React Router for navigation between register, login, and task views.
  - Task form and list components for intuitive task management.
- **Back-End**:
  - RESTful API endpoints for user and task operations.
  - MongoDB Atlas integration for cloud-based data storage.

## Tech Stack
- **Front-End**:
  - React: Component-based UI development.
  - React Router: Client-side routing.
  - Axios: HTTP requests to back-end APIs.
- **Back-End**:
  - Node.js: Server-side runtime.
  - Express: Web framework for RESTful APIs.
  - Mongoose: MongoDB object modeling.
  - MongoDB Atlas: Cloud database.
- **Security**:
  - bcrypt: Password hashing.
  - jsonwebtoken: JWT authentication.
  - CORS: Cross-origin resource sharing control.
- **Tools**:
  - Postman: API testing.
  - Git/GitHub: Version control.
  - MongoDB Atlas: Database management.
  - Windows: Development environment.

## Progress
The project was developed over two days, with the following milestones achieved by June 14, 2025:

### Day 1: Back-End Setup and Authentication
- Initialized Node.js/Express server with `server.js`, configuring Express and CORS.
- Set up MongoDB Atlas connection using Mongoose, with `.env` for sensitive data (`MONGODB_URI`, `JWT_SECRET`).
- Implemented user authentication:
  - Built `/api/users/register` endpoint with bcrypt for password hashing.
  - Created `/api/users/login` endpoint generating JWTs.
  - Added middleware (`auth.js`) to protect routes with JWT verification.
- Developed task management APIs:
  - Created `/api/tasks` endpoints for CRUD operations (GET, POST, PUT, DELETE).
  - Integrated tasks with MongoDB `tasks` collection, requiring JWT authentication.
- **Challenges Overcome**:
  - Fixed MongoDB connection errors by ensuring correct `MONGODB_URI` in `.env` and adding `dotenv`.
  - Resolved bcrypt and Mongoose model issues for user registration.
  - Addressed CORS errors by configuring `allowedHeaders` in `server.js`.

### Day 2: Front-End Development and Authentication Integration
- Set up React front-end with `create-react-app`.
- Created `TaskForm.js` and `TaskList.js` for task management UI.
- Built `Register.js` and `Login.js` components, integrated with `/api/users/register` and `/api/users/login` endpoints.
- Configured `react-router-dom` in `App.js` for navigation (`/`, `/login`, `/register`).
- Implemented authentication in front-end:
  - Stored JWT in `localStorage` for session persistence.
  - Used `useNavigate` in `Login.js` for redirect to `/` after login.
  - Added protected routes in `App.js` to render task view only when authenticated.
- Fixed `useEffect` dependency warnings in `App.js` using `useCallback`.
- Removed deprecated Mongoose options (`useNewUrlParser`, `useUnifiedTopology`) in `server.js` to eliminate warnings.
- **Challenges Overcome**:
  - Fixed `react-scripts` and dependency installation issues.
  - Resolved CORS errors by adding `Authorization` to `allowedHeaders`.
  - Addressed login redirect failure by implementing `useNavigate`.
  - Verified token handling in `App.js` for seamless task view rendering.

## Screenshots
*(Screenshots to be added after Day 3 UX polish. Planned:)*
- Login page with error handling.
- Registration form.
- Task view with form and task list.
- MongoDB Atlas dashboard showing `tasks` collection.

*Placeholder*: See `/screenshots` folder or live demo (to be deployed).

## Setup Instructions
To run the Task Manager App locally on a Windows machine:

### Prerequisites
- Node.js (v16 or later)
- MongoDB Atlas account
- Git
- Text editor (e.g., VS Code)
- Postman (optional, for API testing)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/task-manager-app.git
   cd task-manager-app