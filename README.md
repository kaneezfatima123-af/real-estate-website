# RealEstate PK

A full-stack real estate website built by **Kaneez Fatima**. Users can browse properties, sign up, list their own homes, and contact agents.

---

## Tech Stack

| Part | Technology |
|------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Images | Cloudinary |
| Auth | JWT (JSON Web Token) |

---

## Project Structure

```
real-estate/
├── client/          → React frontend (website UI)
│   └── src/pages/   → All pages (Home, Login, etc.)
└── server/          → Node.js backend (API + database)
    ├── models/      → Database schemas
    └── routes/      → API endpoints
```

---

## How to Run the Website

You need **two terminals** running at the same time.

### 1. Start the Backend (Server)

```bash
cd server
npm install
node index.js
```

You should see:
- `MongoDB Connected`
- `Server running port 5000`

### 2. Start the Frontend (Website)

Open a **new terminal**:

```bash
cd client
npm install
npm run dev
```

Open the link shown in terminal (usually `http://localhost:5173`)

---

## How the Website Works

### 1. Home Page (`/`)

- Shows all properties from the database
- **Search bar** — filter by city, area, or type
- **Filters** — property type and number of bedrooms
- **Featured Properties** — highlighted listings at the top
- **WhatsApp Share** — share any property on WhatsApp
- Login / Sign Up buttons in the navbar

### 2. Sign Up & Login

- **Sign Up** (`/signup`) — create a new account (name, email, password)
- **Login** (`/login`) — login with email and password
- After login, your name appears in the navbar

### 3. View Property Details

- Click any property card to open full details
- See all photos (bedroom, bathroom, kitchen, etc.)
- **Contact Agent** form — sends a message to the database
- **WhatsApp** button to share the property

> You must be logged in to view property details. If not logged in, you are redirected to Sign Up.

### 4. Add Property (`/add-property`)

- Only logged-in users can add a property
- Fill in title, price, location, beds, baths, area, type, description
- Upload up to 6 photos (main, bedroom, bathroom, kitchen, living, lawn)
- Images are uploaded to **Cloudinary** automatically
- Property is saved in **MongoDB**

**Featured checkbox** — only visible when logged in as:
`kaneezfatima15078@gmail.com`

Ticking it shows the property in the **Featured** section on the home page.

### 5. My Properties (`/my-properties`)

- See all properties you have added
- **View** — open property details
- **Delete** — remove your own property

### 6. All Properties Page (`/properties`)

- Separate page with search and filters
- Same listings as the home page

### 7. About Page (`/about`)

- Information about RealEstate PK
- Mission, vision, and stats

### 8. Contact Page (`/contact`)

- Contact form (name, email, phone, message)
- Messages are saved in the database

---

## API Endpoints (Backend)

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/properties` | Get all properties |
| GET | `/api/properties/:id` | Get one property |
| GET | `/api/properties/my` | Get logged-in user's properties |
| POST | `/api/properties/add` | Add new property |
| DELETE | `/api/properties/:id` | Delete own property |
| POST | `/api/contact` | Send contact message |

---

## Environment Variables

File: `server/.env`

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Never share your `.env` file publicly.

---

## Pages Summary

| Page | URL | Who can access |
|------|-----|----------------|
| Home | `/` | Everyone |
| Login | `/login` | Everyone |
| Sign Up | `/signup` | Everyone |
| Property Detail | `/property/:id` | Logged-in users |
| Add Property | `/add-property` | Logged-in users |
| My Properties | `/my-properties` | Logged-in users |
| All Properties | `/properties` | Everyone |
| About | `/about` | Everyone |
| Contact | `/contact` | Everyone |

---

## Built By

**Kaneez Fatima** — RealEstate PK © 2026
