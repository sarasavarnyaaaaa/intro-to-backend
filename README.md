# Intro to Backend — Assignment Project

This project follows the supplied tutorial transcript and implements a basic backend with **Node.js, Express, MongoDB Atlas, and Mongoose**. It includes project setup, Git/GitHub workflow, environment configuration, model–controller–route structure, Postman testing, user register/login/logout APIs, and post CRUD APIs.

> **Tutorial scope note:** The tutorial demonstrates basic authentication and mentions JWT access/refresh tokens as a possible next step, but does not implement JWT. This code keeps the tutorial's beginner-level behavior. The demo stores passwords as plain text and is not safe for production. Never use real passwords in this demo.

## Included project structure

```text
intro-to-backend-assignment/
├── README.md
└── backend/
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── src/
        ├── app.js
        ├── index.js
        ├── config/
        │   ├── constants.js
        │   └── database.js
        ├── models/
        │   ├── user.model.js
        │   └── post.model.js
        ├── controllers/
        │   ├── user.controller.js
        │   └── post.controller.js
        └── routes/
            ├── user.route.js
            └── post.route.js
```

## What the tutorial explains

### Backend basics
- A backend receives requests, handles data and authentication, communicates with a database, and returns responses.
- Programming language: JavaScript.
- Runtime: Node.js, which executes JavaScript outside the browser.
- Framework: Express.js, which provides tools to build a server and routes.
- Database: MongoDB, a NoSQL database that stores data as documents.
- API: the interface through which a client (browser/Postman) sends requests to the server.

### Request flow
A client sends an HTTP request → Express receives it → route directs it to a controller → controller performs logic and interacts with a Mongoose model → MongoDB stores or returns data → Express sends an HTTP response.

### HTTP methods and status codes used
- `GET`: read data.
- `POST`: create or submit data.
- `PATCH`: update some fields.
- `DELETE`: remove data.
- `200`: request succeeded.
- `201`: resource created.
- `400`: invalid/missing request data.
- `404`: requested user/post/route not found.
- `500`: server-side error.

## Step-by-step setup

### 1. Requirements
Install:
- Node.js (LTS) and npm
- Visual Studio Code (or another editor)
- Git
- Postman

Verify Node and npm in a terminal:
```bash
node -v
npm -v
git --version
```

### 2. Create project and install dependencies
Open a terminal and run:
```bash
mkdir intro-to-backend
cd intro-to-backend
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv
npm install --save-dev nodemon
```

Replace `backend/package.json` with the supplied `package.json`, then run:
```bash
npm install
```

`"type": "module"` enables ES module syntax (`import` and `export`). `nodemon` restarts the server when code changes.

### 3. Create MongoDB Atlas database
1. Visit https://www.mongodb.com/atlas/database and sign up/sign in.
2. Create a free cluster.
3. In **Database Access**, create a database username and password.
4. In **Network Access**, add your current IP address. For a class demo, follow the instructor's instructions if they require a different setting; avoid leaving broad access enabled.
5. Open the cluster and choose **Connect → Drivers**.
6. Copy the connection URI and replace its username/password placeholders.
7. Include a database name at the end of the URI, for example `intro-to-backend`.

The URI format should resemble:
```text
mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/intro-to-backend
```

### 4. Configure environment variables
Copy `.env.example` to a new file named `.env` in the `backend` folder. Fill in your own MongoDB URI:
```env
PORT=4000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/intro-to-backend
```

Keep `.env` private. The `.gitignore` prevents it and `node_modules` from being committed.

### 5. Start the backend
From inside `backend`:
```bash
npm run dev
```

Expected console output includes a MongoDB connection message and:
```text
Server is running on port 4000
```

Open `http://localhost:4000/` in a browser to see the health response.

If MongoDB does not connect, verify the URI, Atlas database credentials, allowed IP address, and that `.env` is in the backend root. If the password contains reserved URL characters (such as `@` or `/`), URL-encode them in the URI.

## API endpoints

Base URL: `http://localhost:4000`

| Method | Endpoint | Function |
|---|---|---|
| POST | `/api/v1/users/register` | Register a user |
| POST | `/api/v1/users/login` | Log in a user |
| POST | `/api/v1/users/logout` | Log out a user |
| POST | `/api/v1/posts/create` | Create a post |
| GET | `/api/v1/posts/` | Get all posts |
| GET | `/api/v1/posts/:id` | Get a post by ID |
| PATCH | `/api/v1/posts/update/:id` | Update a post |
| DELETE | `/api/v1/posts/delete/:id` | Delete a post |

### Postman test sequence

For requests with a body, choose **Body → raw → JSON**. Postman usually adds the `Content-Type: application/json` header automatically.

#### Register
`POST http://localhost:4000/api/v1/users/register`
```json
{
  "username": "demo_user",
  "email": "demo@example.com",
  "password": "demo123"
}
```
Expected: `201 Created`. Use a unique email if you repeat the request.

#### Login
`POST http://localhost:4000/api/v1/users/login`
```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```
Expected: `200 OK`.

#### Logout
`POST http://localhost:4000/api/v1/users/logout`
```json
{
  "email": "demo@example.com"
}
```
Expected: `200 OK`.

#### Create a post
`POST http://localhost:4000/api/v1/posts/create`
```json
{
  "name": "Kina",
  "description": "Martial arts artist",
  "age": 26
}
```
Expected: `201 Created`. Copy the `_id` in the response; it is the MongoDB document ID.

#### Get all posts
`GET http://localhost:4000/api/v1/posts/`

#### Get one post
`GET http://localhost:4000/api/v1/posts/PASTE_POST_ID_HERE`

#### Update a post
`PATCH http://localhost:4000/api/v1/posts/update/PASTE_POST_ID_HERE`
```json
{
  "name": "Lily",
  "description": "A cute flower",
  "age": 2
}
```
Expected: `200 OK` with the updated document.

#### Delete a post
`DELETE http://localhost:4000/api/v1/posts/delete/PASTE_POST_ID_HERE`

Expected: `200 OK` and a deletion confirmation. No body is required.

## Git and GitHub workflow

### Initial push
Create a new empty repository on GitHub. From the `backend` folder:
```bash
git init
git add .
git commit -m "Initial backend project"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

### Commit subsequent features
After implementing/testing authentication:
```bash
git add .
git commit -m "Add register login and logout APIs"
git push
```

After implementing/testing CRUD:
```bash
git add .
git commit -m "Add CRUD APIs"
git push
```

If Git prompts for identity, configure your own name/email:
```bash
git config --global user.name "Your Name"
git config --global user.email "YOUR_EMAIL"
```

Before pushing, check that `.env` is not staged:
```bash
git status
```

## Files and responsibilities
- `src/index.js`: loads environment variables, connects to MongoDB, starts server.
- `src/app.js`: configures Express middleware and mounts routes.
- `src/config/constants.js`: database name constant.
- `src/config/database.js`: establishes the Mongoose connection.
- `src/models/`: defines MongoDB document schemas/models.
- `src/controllers/`: contains API logic and responses.
- `src/routes/`: maps HTTP methods and URL paths to controller functions.
- `.env`: local secrets and configuration (not included in this project archive).
- `.gitignore`: excludes private and generated files from Git.

## Final submission checklist
- [ ] Installed Node.js, npm, Git, and Postman
- [ ] Created Atlas cluster, database user, and network access
- [ ] Added the real connection URI to local `.env`
- [ ] Server starts and connects to MongoDB
- [ ] Tested register, login, logout
- [ ] Tested create, read-all, read-one, update, delete
- [ ] Committed and pushed source to GitHub
- [ ] Confirmed `.env` and `node_modules` are not in GitHub

## Important learning / security note
This is a basic tutorial project. Plain-text password storage, password comparison, and the `isLoggedIn` flag are only illustrative. The tutorial transcript explains that JWT access and refresh tokens can be added later but does not build them in this project. A production application must hash passwords, use proper session/token management, validate inputs, protect private routes, and use secure configuration.
