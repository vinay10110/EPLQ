# Efficient Privacy-Preserving Location Query (EPLQ)

People want to discover interesting places without giving up privacy (e.g., sharing precise device location or behavioral history). Many apps over-collect data to drive personalization.

Live demo: https://eplq.vercel.app

## Project Overview
A full‑stack web app for discovering, filtering, and recommending locations with user authentication, comments/ratings, and profile management. The backend exposes a REST API with a tag‑based recommendation engine; the frontend is built with React and PrimeReact.

- __No device geolocation required__: Users browse and filter by city/tags; the app does not ask for or store precise user coordinates.
- __Tag‑based recommendations, not tracking__: When a user views a location, recommendations are computed from that location’s tags using cosine similarity in `server/utils/recommendationEngine.js`. No cross‑session behavioral profiling is needed.
- __Minimal personal data__: Accounts store only basic profile info; auth uses JWT (see `server/routes/users.js`). Recommendations saved are only location IDs per user in `Recommend` (no raw activity logs).
- __Transparent data flow__: API endpoints expose just what the UI needs (e.g., city/tag filters, comments/ratings). Admins can curate locations; normal users can engage via comments and ratings.

These choices provide useful discovery while limiting personal data collection, aligning with the project’s privacy-aware goals.

## Features
- **Authentication**: Register/Login with JWT. User types: `User`, `Admin`.
- **Profile Management**: Edit name/password and profile image in a sidebar.
- **Locations**:
  - Browse all locations and view details
  - Filter by city/tags
  - Post/Update/Delete locations (Admin UI)
  - My Locations view (Admin UI)
- **Comments & Ratings** on locations
- **Recommendations**: Tag‑based cosine similarity recommendations generated on location view

## Tech Stack
- **Frontend**: React 18, Vite, PrimeReact, PrimeFlex, PrimeIcons, React Router, Leaflet/OL, Firebase Storage
- **Backend**: Node.js, Express, Mongoose, JWT, bcrypt, CORS, dotenv
- **Database**: MongoDB (Atlas or self‑hosted)

## Project Structure
```
client/
  src/
    components/
      EditProfileSidebar.jsx
      Navbar.jsx
      ...
    pages/
      Dashboard.jsx
      Landing.jsx
      Login.jsx
      LocationPage.jsx
      PostLocation.jsx
      Register.jsx
    App.jsx
server/
  routes/
    users.js
    locations.js
    comments.js
    recommendations.js
  models/
    User.js
    Location.js
    Comment.js
    Recommend.js
  utils/
    recommendationEngine.js
  server.js
```

## Environment Variables
Create `.env` files for both `client/` and `server/`.

- `server/.env` (see also `server/.env.example`):
  - `HOST_ADDRESS` – Frontend origin for CORS (e.g., `http://localhost:5173` or your Vercel domain)
  - `MONGO_URL` – MongoDB connection string
  - `SECRET` – JWT secret used in `server/routes/users.js`

- `client/.env`:
  - `VITE_API_URL` – Backend base URL (e.g., `http://localhost:5000` or your deployed API URL)
  - `VITE_API_APIKEY` – Firebase API key
  - `VITE_API_AUTHDOMAIN` – Firebase auth domain
  - `VITE_API_PROJECTID` – Firebase project ID
  - `VITE_API_STORAGEBUCKET` – Firebase storage bucket
  - `VITE_API_SENDERID` – Firebase messaging sender ID
  - `VITE_API_APPID` – Firebase app ID

Example:
```
# server/.env
HOST_ADDRESS=http://localhost:5173
MONGO_URL=mongodb+srv://<user>:<pass>@cluster0.../test
SECRET=super_secret_key

# client/.env
VITE_API_URL=http://localhost:5000
VITE_API_APIKEY=your_api_key
VITE_API_AUTHDOMAIN=your_auth_domain
VITE_API_PROJECTID=your_project_id
VITE_API_STORAGEBUCKET=your_storage_bucket
VITE_API_SENDERID=your_sender_id
VITE_API_APPID=your_app_id
```

## Quick Start (Local Development)
- Prerequisites: Node.js 18+, npm, MongoDB (Atlas or local)

1) Install dependencies
```
# In server/
npm install

# In client/
npm install
```

2) Configure environment
- Create `server/.env` and `client/.env` as above

3) Run the apps
```
# Start backend (port 5000)
npm run dev --prefix server

# Start frontend (port 5173)
npm run dev --prefix client
```
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Overview
Base URL: `${VITE_API_URL}` (frontend) or your backend host

- Auth (`/users`)
  - `POST /users/register` – { name, email, password, type }
  - `POST /users/login` – { email, password, type } → { token }
  - `PUT /users/profile` – headers: Authorization: token; body: { name, password }
  - `PUT /users/profile/image` – headers: Authorization; body: { image }
  - `GET /users/profile` – headers: Authorization

- Locations (`/locations`)
  - `POST /locations` – headers: Authorization; body: location payload
  - `PUT /locations` – headers: Authorization; body: { locationUpdate: { id }, location }
  - `DELETE /locations` – headers: Authorization; body: { id }
  - `GET /locations` – list of all locations
  - `GET /locations/:id` – get a single location; when userType is `User`, recommendations are generated in background

- Comments (`/comments`)
  - `POST /comments` – headers: Authorization; body: { text, rating, locId }
  - `PUT /comments` – headers: Authorization; body: { id, text, rating }
  - `DELETE /comments` – headers: Authorization; body: { id }
  - `GET /comments` – list comments

- Recommendations (`/recommendations`)
  - `GET /recommendations` – headers: Authorization; returns user’s recommended locations (populated)

- Health (`/health`)
  - `GET /health` – returns `{ status: 'ok' }`

## Acknowledgements
- PrimeReact, PrimeFlex, PrimeIcons
- React Router
- Leaflet / OpenLayers
- MongoDB, Mongoose
