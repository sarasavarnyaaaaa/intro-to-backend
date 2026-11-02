# Project Presentation & Teacher Explanation Guide 🎓

**Project Name**: Intro to Backend — User Authentication & Post CRUD System  
**Student GitHub Repository**: [https://github.com/sarasavarnyaaaaa/intro-to-backend](https://github.com/sarasavarnyaaaaa/intro-to-backend)  
**Live Server URL**: `http://localhost:4000`  
**Database**: MongoDB Atlas Cloud (`cluster0.escyimf.mongodb.net`)  

---

## 1. Project Overview & Objectives

This project is a complete RESTful backend application built from scratch with **Node.js, Express.js, MongoDB Atlas, and Mongoose**.

It fulfills all 5 core assignment objectives:
1. **Node.js Project Setup & GitHub Version Control**: Structured with ES Module syntax, clean commit history, and pushed to a public GitHub repository.
2. **Online Cloud Database**: Connected to a live, cloud-hosted MongoDB Atlas cluster with secure authentication and network firewall configuration.
3. **Mongoose Schemas & Data Modeling**: Modeled both `User` and `Post` collections with validation rules and timestamps.
4. **RESTful APIs**: Developed modular controllers and routes handling authentication (`register`, `login`, `logout`) and full CRUD for posts (`create`, `read all`, `read one`, `update`, `delete`).
5. **Testing & Quality Assurance**: Verified through a complete Postman collection and an automated 9-point integration test suite (`npm test`).

---

## 2. Checklist Verification (100% Completed)

| Requirement | Implementation & Proof | Status |
|---|---|---|
| **Node.js, npm, Git, Postman installed** | Verified Node `v24.20.0`, npm `11.19.0`, Git `2.56.0`. | ✅ Done |
| **MongoDB Atlas Cluster & Network Access** | Created `Cluster0`, database user `sarasavarnya19_db_user`, whitelisted IP access (`0.0.0.0/0`). | ✅ Done |
| **Local `.env` Configuration** | Configured `PORT=4000` and `MONGODB_URI` securely in local `.env`. | ✅ Done |
| **Server Starts & Connects to MongoDB** | Terminal outputs: `MongoDB connected: ...` and `Server is running on port 4000`. | ✅ Done |
| **Tested Register, Login, Logout** | Automated tests passed; Postman collection verified. | ✅ Done |
| **Tested Create, Read-All, Read-One, Update, Delete** | All 5 Post CRUD endpoints tested with MongoDB ObjectIDs. | ✅ Done |
| **Committed & Pushed to GitHub** | Pushed to [github.com/sarasavarnyaaaaa/intro-to-backend](https://github.com/sarasavarnyaaaaa/intro-to-backend). | ✅ Done |
| **Confirmed `.env` & `node_modules` not in Git** | Strictly excluded via `.gitignore` to prevent credential leaks. | ✅ Done |

---

## 3. Architecture & Request Lifecycle

Explain this diagram to your teacher to demonstrate architectural understanding:

```
[Client / Postman]
       │
       ▼ (HTTP Request: JSON Body / URL Params)
[Express Server (src/app.js)]
       │
       ▼ (Middleware: express.json(), express.urlencoded())
[Express Router (src/routes/*.route.js)]
       │
       ▼ (Path matching: /api/v1/users, /api/v1/posts)
[Controller (src/controllers/*.controller.js)]
       │  (Business logic, input validation, status codes)
       ▼
[Mongoose Model (src/models/*.model.js)]
       │  (Schema validation, document creation, queries)
       ▼
[MongoDB Atlas Cloud Database]
       │  (Stores BSON documents)
       ▲
       │ (Returns MongoDB Document)
[Controller sends JSON Response]
       │
       ▼ (HTTP Status Code: 200, 201, 400, 404, 500)
[Client receives JSON]
```

---

## 4. API Endpoints Reference

### 🔐 User Authentication Endpoints (`/api/v1/users`)

| Method | Endpoint | Description | Request Body | Expected Status |
|---|---|---|---|---|
| `POST` | `/api/v1/users/register` | Creates a new user in MongoDB | `{"username", "email", "password"}` | `201 Created` |
| `POST` | `/api/v1/users/login` | Verifies credentials and sets `isLoggedIn = true` | `{"email", "password"}` | `200 OK` |
| `POST` | `/api/v1/users/logout` | Sets `isLoggedIn = false` | `{"email"}` | `200 OK` |

### 📝 Post CRUD Endpoints (`/api/v1/posts`)

| Method | Endpoint | Description | Request Body / Param | Expected Status |
|---|---|---|---|---|
| `POST` | `/api/v1/posts/create` | Creates a new post document | `{"name", "description", "age"}` | `201 Created` |
| `GET` | `/api/v1/posts/` | Retrieves all post documents | None | `200 OK` |
| `GET` | `/api/v1/posts/:id` | Retrieves a single post by MongoDB ObjectID | URL parameter `:id` | `200 OK` |
| `PATCH` | `/api/v1/posts/update/:id` | Updates fields on an existing post | `{"name", "description", ...}` | `200 OK` |
| `DELETE` | `/api/v1/posts/delete/:id` | Removes post from the database | URL parameter `:id` | `200 OK` |

---

## 5. Database Schemas

### 1. User Schema (`src/models/user.model.js`)
- `username` (String, required, trimmed)
- `email` (String, required, unique, lowercase, trimmed)
- `password` (String, required)
- `isLoggedIn` (Boolean, default: `false`)
- `timestamps`: automatically creates `createdAt` and `updatedAt`.

### 2. Post Schema (`src/models/post.model.js`)
- `name` (String, required, trimmed)
- `description` (String, required, trimmed)
- `age` (Number, required, min: 1, max: 150)
- `timestamps`: automatically creates `createdAt` and `updatedAt`.

---

## 6. How to Give a Live Demo to Your Teacher

1. **Show the Server Running**:
   Open terminal inside the `backend` folder and run:
   ```bash
   npm run dev
   ```
   Point out to your teacher:
   - `MongoDB connected: ac-yjgc981-shard-00-00.escyimf.mongodb.net`
   - `Server is running on port 4000`

2. **Run the Automated Test Suite**:
   Open a second terminal and run:
   ```bash
   npm test
   ```
   Show them the green `✅ PASS` output across all 9 tests.

3. **Demonstrate with Postman**:
   - Open Postman.
   - Show the imported collection `intro-to-backend.postman_collection.json`.
   - Send `POST /api/v1/users/register` to create a user.
   - Send `POST /api/v1/posts/create` to create a post and show the generated `_id`.
   - Send `GET /api/v1/posts/` to show the data stored in MongoDB Atlas.

---

## 7. Common Teacher Questions & Answers (Viva Prep)

**Q1: Why did you use `"type": "module"` in `package.json`?**  
> **Answer**: It enables standard ES6 Module syntax (`import` and `export`) instead of legacy CommonJS (`require` and `module.exports`), making the codebase modern and aligned with standard JavaScript practices.

**Q2: What is the purpose of `dotenv`? Why isn't `.env` committed to GitHub?**  
> **Answer**: `dotenv` loads sensitive configuration (port numbers, database connection URIs with secret passwords) from a local `.env` file into `process.env`. We never commit `.env` to GitHub because committing secrets is a critical security vulnerability. Instead, we provide `.env.example` as a template.

**Q3: What is the difference between `PUT` and `PATCH`?**  
> **Answer**: `PUT` is used to completely replace an entire resource. `PATCH` is used to apply partial modifications to specific fields of a resource without replacing the entire document. Our project uses `PATCH` for post updates.

**Q4: How does Mongoose connect to MongoDB?**  
> **Answer**: Mongoose connects asynchronously using `mongoose.connect(process.env.MONGODB_URI)`. It establishes a connection pool to MongoDB Atlas over TLS/SSL on port `27017` and provides schema-based modeling on top of MongoDB's document store.

**Q5: What are the security considerations mentioned in the README?**  
> **Answer**: As an introductory tutorial, passwords are stored in plain text and compared directly for educational clarity. In a production application, we would hash passwords using `bcrypt`, use JSON Web Tokens (JWT) for stateless authentication, validate inputs with libraries like Joi/Zod, and implement rate limiting.
