# MezmurFlow ✨ 

> *Ever spent more time searching for the right Mezmur than actually listening to it?*

**MezmurFlow** is an AI-powered web app that curates daily Ethiopian Orthodox Tewahedo hymns (Mezmurs) based on the spiritual meaning of each day — so you can focus on worship instead of searching.

---

## ✨ Features

- **Daily Hymn Discovery** — Select a day of the week or an Ethiopian Calendar date to receive AI-curated Mezmur recommendations tailored to that day's spiritual theme.
- **Senkessar Stories** — Read a concise summary of the Synaxarium (Senkessar) entry for each date, straight from the Ethiopian Orthodox tradition.
- **Daily Reflection** — Receive a spiritual reflection or scripture verse aligned with the day's theme.
- **YouTube Playback** — Stream recommended Mezmurs directly within the app via embedded YouTube videos.
- **Favorites / Sanctuary** — Save hymns to your personal favorites list and revisit them anytime.
- **Authentication** — Secure user accounts with JWT-based sign up and sign in.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Role |
|---|---|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| Vite | Build tool & dev server |
| CSS Modules | Component-level styling |

### Backend
| Technology | Role |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcryptjs | Password hashing |

### AI & External APIs
| Service | Role |
|---|---|
| Groq API (LLaMA 3.3 70B) | Generates spiritual content, themes, and hymn recommendations |
| YouTube Data API v3 | Fetches video IDs for in-app playback |

### Deployment
| Platform | Role |
|---|---|
| Vercel | Backend serverless deployment |
| MongoDB Atlas | Cloud database |

---

## 🗂️ Project Structure

```
MezmurFlow/
├── frontend/
│   └── src/
│       ├── Components/
│       │   ├── Home.jsx          # Landing page
│       │   ├── DaySelector.jsx   # Core hymn discovery UI
│       │   ├── Favorites.jsx     # Saved hymns (/Sanctuary)
│       │   ├── Navbar.jsx
│       │   ├── SignIn.jsx        # /Commune
│       │   ├── SignUp.jsx        # /Haven
│       │   └── Origin.jsx        # About page
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── hooks/
│       │   └── useAuth.js
│       └── App.jsx
│
└── mezmurflow-backend/
    ├── controllers/
    │   └── mezmurController.js   # Orchestrates AI + YouTube pipeline
    ├── routes/
    │   ├── mezmurRoutes.js
    │   ├── authRoutes.js
    │   └── favoriteRoutes.js
    ├── services/
    │   ├── grokService.js        # Groq AI integration
    │   └── youtubeService.js     # YouTube Data API integration
    ├── models/
    │   ├── User.js
    │   └── Favorite.js
    ├── middleware/
    │   └── authMiddleware.js     # JWT verification
    └── server.js
```

---

##  Getting Started

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account
- A [Groq API key](https://console.groq.com/)
- A [YouTube Data API v3 key](https://console.cloud.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/sambee-coding/MezmurFlow.git
cd MezmurFlow
```

### 2. Set up the Backend

```bash
cd mezmurflow-backend
npm install
```

Create a `.env` file in `mezmurflow-backend/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_jwt_secret
GROQ_API_KEY=your_groq_api_key
YOUTUBE_API_KEY=your_youtube_data_api_key
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in `frontend/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/signin` | Sign in and receive a JWT |

### Mezmur
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/mezmur?day=Monday` | Get hymns by day of week |
| `GET` | `/api/mezmur?month=Tahsas&ethDay=12` | Get hymns by Ethiopian calendar date |

> All Mezmur endpoints require a valid `Authorization: Bearer <token>` header.

### Favorites
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/favorites` | Get all saved favorites |
| `POST` | `/api/favorites` | Add a hymn to favorites |
| `DELETE` | `/api/favorites/:videoId` | Remove a hymn from favorites |

---

## 🙏 About the App

MezmurFlow was built with deep respect for the Ethiopian Orthodox Tewahedo tradition. The AI is specifically instructed to recommend only authentic Orthodox Mezmurs from the Tewahedo tradition, citing real and well-known zemaris (cantors) such as Zemari Tewodros Yosef, Zemari Yilma Hailu and many more.

The app uses the **Ethiopian Calendar** for date-based lookups, honoring the liturgical framework of the church.

---

## 👤 Author

**Samrawit Bitew (Sambee)**  
[GitHub: @sambee-coding](https://github.com/sambee-coding)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
