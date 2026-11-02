# InteriorStudio - MERN CRUD Project

A full-stack Interior Design Project Management application built with MongoDB, Express, React (Vite), and Node.js.

## Features
- View all interior design projects
- Create, edit, and delete projects
- Search by project name or location
- Filter by category
- Responsive interior-design themed UI
- REST API with MongoDB persistence

## Requirements
- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas connection string

## 1. Backend setup
```bash
cd backend
npm install
```
Create `backend/.env` from `.env.example` and set `MONGO_URI`.
```bash
npm run dev
```
Backend runs at http://localhost:5000

## 2. Frontend setup
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal (normally http://localhost:5173).

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/projects | Get all projects |
| GET | /api/projects/:id | Get one project |
| POST | /api/projects | Create project |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |

## Sample project data
Use the website's **Add Project** button to create records. The database is populated by your own submissions; no external API is required.

## Submission note
Before submitting, start MongoDB, run both servers, and demonstrate Create, Read, Update, and Delete operations.
