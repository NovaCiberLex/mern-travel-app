# MYtinerary – MERN Travel App

A full-stack travel application where users can browse cities and explore their itineraries.
Built with the **MERN stack**: MongoDB, Express, React and Node.js.

## Features

- Browse all cities loaded dynamically from the API
- Search cities by name
- Select a city to see its itineraries
- Filter itineraries by maximum price and duration
- Loading, error and empty states handled on every page
- Global state management with React Context API
- Responsive, mobile-first design with Material UI

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router, Material UI, Axios |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB Atlas |
| Testing | Postman |

## Project Structure

```
mern-travel-app/
├── client/              # React frontend
│   └── src/
│       ├── assets/      # Images and icons
│       ├── context/     # AppContext (global state)
│       └── pages/       # Landing, Cities, Itineraries, Login
└── server/              # Express backend
    ├── config/          # Database connection
    ├── docs/            # Postman collection
    ├── models/          # City and Itinerary models
    ├── routes/          # API routes
    └── server.js
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cities` | Get all cities |
| POST | `/api/cities` | Create a city |
| GET | `/api/itineraries/:cityId` | Get the itineraries of a city |
| POST | `/api/itineraries` | Create an itinerary |

The Postman collection is available in `server/docs/MYtinerary.postman_collection.json`.

## Getting Started

### Prerequisites

- Node.js (LTS version)
- A MongoDB Atlas account and cluster

### 1. Clone the repository

```bash
git clone https://github.com/NovaCiberLex/mern-travel-app.git
cd mern-travel-app
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/` with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Author

Cecilia Cardenas – [NovaCiberLex](https://github.com/NovaCiberLex)
