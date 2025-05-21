# Complaint Registration System

A full-stack web application for registering, managing, and tracking complaints, built with Node.js, Express, GraphQL (backend), and React (frontend).

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (running locally or a connection string for a remote DB)

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/complaint-registration-system.git
cd complaint-registration-system
```
---

### 2. Setup the Backend
```sh
cd complaint-system-backend
npm install
```
Create a .env file in complaint-system-backend with the following variables:

```sh
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:
```sh
node app.js
```
The backend will run on http://localhost:5000 by default.

### 3. Setup the Frontend

```sh
cd ../complaint-system-frontend
npm install
```
Start the frontend development server using:

```sh
npm start
```

The frontend will run on http://localhost:3000.

## Usage

- Open http://localhost:3000 in your browser.
- Register or log in to the system as student or admin.
- Submit, view, comment on, and upvote complaints.

## Additional Notes
- Ensure MongoDB is running and accessible via the connection string in your .env.
- The frontend expects the backend GraphQL API to be available at /graphql on port 5000 (or as configured).
