# 🗳️ Voting_Application

A secure RESTful Voting Application built with **Node.js**, **Express.js**, and **MongoDB**. The application allows users to register, log in, cast a vote for their preferred candidate, and enables administrators to manage candidates securely using JWT authentication.

---

# 📌 Features

* 👤 User Registration & Login
* 🔐 JWT Authentication & Authorization
* 🔒 Password Hashing using bcrypt.js
* 🛡️ Role-Based Access Control (Admin/User)
* 🗳️ One Vote Per User
* 👥 Candidate Management (Admin Only)
* 📊 Vote Counting System
* 💾 MongoDB Database Integration
* 🌐 RESTful API Architecture

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Community Server
* MongoDB Compass
* Mongoose
* JSON Web Token (JWT)
* bcrypt.js
* dotenv

---

# 📂 Project Structure

```text
Voting_Application/
│
├── models/
│   ├── user.js
│   └── candidate.js
│
├── routes/
│   ├── userRoutes.js
│   └── candidateRoutes.js
│
├── jwt.js
├── db.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env
└── README.md
```

> **Note:** The `.env` file should not be committed to GitHub. Add it to `.gitignore`.

---

# ⚙️ Prerequisites

Before running the project, make sure you have installed:

* Node.js
* MongoDB Community Server
* MongoDB Compass (optional, for managing the database)
* Git

---

# 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Voting_Application.git
```

### 2. Navigate to the project folder

```bash
cd Voting_Application
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Create a `.env` file in the project root and add:

```env
PORT=3000
MONGO_URL=xyz................
JWT_SECRET=your_secret_key
```

### 5. Start MongoDB

Ensure your local MongoDB service is running.

### 6. Run the application

```bash
npm start
```

If you're using Nodemon:

```bash
npm run dev
```

---

# 🔐 Environment Variables

| Variable   | Description                            |
| ---------- | -------------------------------------- |
| PORT       | Port number for the server             |
| MONGO_URL  | MongoDB connection string              |
| JWT_SECRET | Secret key used for signing JWT tokens |

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/person/signup` | Register a new user |
| POST   | `/person/login`  | Login user          |

---

## User

| Method | Endpoint                   | Description                      |
| ------ | -------------------------- | -------------------------------- |
| GET    | `/person/profile`          | Get logged-in user's profile     |
| PUT    | `/person/profile/password` | Update logged-in user's password |

---

## Candidate

| Method | Endpoint                       | Description                           |
| ------ | ------------------------------ | ------------------------------------- |
| POST   | `/candidate`                   | Add a new candidate (Admin Only)      |
| PUT    | `/candidate/:candidateID`      | Update candidate details (Admin Only) |
| DELETE | `/candidate/:candidateID`      | Delete a candidate (Admin Only)       |
| GET    | `/candidate`                   | Retrieve all candidates               |
| POST   | `/candidate/vote/:candidateID` | Cast a vote                           |
| GET    | `/candidate/vote/count`        | View vote count                       |

---

# 🔑 Authentication

Protected routes require a valid JWT token.

Include the token in the request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 🗃️ Database

This project uses **MongoDB Community Server** as the database and **MongoDB Compass** to view and manage collections.

Example collections:

* users
* candidates

---

# 📷 Sample Response

```json
{
  "message": "Vote recorded successfully."
}
```

---

# 📈 Future Improvements

* Email Verification
* Forgot Password Feature
* Admin Dashboard
* Election Scheduling
* Real-Time Vote Statistics
* API Documentation using Swagger
* Unit & Integration Testing

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Mohd Saquib**

If you found this project helpful, consider giving it a ⭐ on GitHub.
