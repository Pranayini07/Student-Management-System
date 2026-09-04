# Student Management System

A student information management application for Andhra Polytechnic. The project contains a React frontend and an Express backend connected to PostgreSQL.

## Features

- Student admission form and dashboard
- Student filtering, editing, deletion, and year updates
- Semester result data entry and management
- B.Tech admission data management
- Job placement data management
- Excel export for dashboard data
- Admin login with email OTP verification
- Forgot-password flow with email OTP verification

## Project Structure

```text
.
├── backend/          Express API and PostgreSQL integration
└── student_details/  React client application
```

## Prerequisites

- Node.js 16 or later
- npm
- PostgreSQL 12 or later
- A Gmail account or SMTP provider for OTP emails

## Database Setup

Create a PostgreSQL database named `studentdetails` and configure the backend connection for your local environment. The API expects these tables:

- `admission`
- `semdata`
- `btechform`
- `jobform`
- `login`

The table columns can be derived from the fields in the forms and SQL statements in `backend/App.js`. Add an administrator record to `login` before using the login flow.

> The current backend contains local database and email credentials directly in `backend/App.js`. Replace them with environment variables before sharing or deploying the application, and rotate any credentials that have been committed.

## Installation

Install dependencies for both applications:

```bash
cd backend
npm install

cd ../student_details
npm install
```

## Running Locally

Start the API in one terminal:

```bash
cd backend
node App.js
```

The API runs at `http://localhost:3000`.

Start the React application in a second terminal:

```bash
cd student_details
npm start
```

The frontend opens at `http://localhost:3000` by default. Because the frontend and backend currently use the same port, run the backend first and configure the React development server to use another port when both need to run simultaneously, for example:

```bash
PORT=3001 npm start
```

The frontend currently sends API requests to `http://localhost:3000`.

## API Overview

| Area | Main endpoints |
| --- | --- |
| Admission | `POST /details`, `GET /dashboard`, `PUT /updateRow/:icrno`, `DELETE /deleteRow/:icrno` |
| Semester data | `POST /semdata`, `GET /semdatadashboard`, `PUT /semdataupdateRow/:pin`, `DELETE /semdatadeleteRow/:pin` |
| B.Tech | `POST /btechform`, `GET /btechdashboard`, `PUT /btechformupdateRow/:diplomapin`, `DELETE /btechformdeleteRow/:diplomapin` |
| Jobs | `POST /jobform`, `GET /jobdashboard`, `PUT /jobformupdateRow/:diplomapin`, `DELETE /jobformdeleteRow/:diplomapin` |
| Authentication | `GET /login/:email/:password`, `POST /verifyotp`, `GET /forgot/:email`, `POST /verifying` |

The backend also provides bulk update endpoints for admission years and semester values.

## Available Scripts

Run these from `student_details/`:

```bash
npm start    # Start the React development server
npm test     # Run the React test suite
npm run build # Create a production build
```

The backend currently has no automated test script. Start it with `node App.js`.

## Notes

- CORS is enabled by the backend for local frontend development.
- The API uses `body-parser` for JSON and URL-encoded request bodies.
- Excel exports are generated in the frontend using SheetJS (`xlsx`).
