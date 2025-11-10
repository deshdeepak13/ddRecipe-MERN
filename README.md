
# 🧑‍🍳 ddRecipe-MERN

A **full-stack recipe management app** built using the **MERN stack (MongoDB, Express, React, Node.js)** with user authentication, recipe CRUD, saved recipes, and image upload via **Cloudinary**.  

🚀 **Live API:** [https://ddrecipe-mern.onrender.com](https://ddrecipe-mern.onrender.com)

---

## 📋 Table of Contents
- [✨ Features](#-features)
- [🧠 Project Overview](#-project-overview)
- [🧱 Tech Stack](#-tech-stack)
- [🗂️ Project Structure](#️-project-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🔑 Environment Variables](#-environment-variables)
- [📡 API Endpoints](#-api-endpoints)
- [🧩 Core Components](#-core-components)
- [🧰 Utility Files](#-utility-files)
- [🧑‍💻 Redux State Flow](#-redux-state-flow)
- [🚀 Deployment Notes](#-deployment-notes)
- [🧩 Possible Improvements](#-possible-improvements)
- [📸 Screenshots (optional)](#-screenshots-optional)
- [📜 License](#-license)

---

## ✨ Features

✅ **User Authentication**
- Register, Login with JWT-based authentication  
- Tokens stored in cookies & localStorage  
- Secure password hashing with bcrypt  

✅ **Recipe Management**
- Create, Read, Update, Delete (CRUD) recipes  
- Upload recipe images with **Cloudinary Upload Widget**  
- Save/Unsave recipes for personalized lists  

✅ **Dynamic Dashboard**
- Browse all recipes  
- View “My Recipes” (user-created)  
- View “Saved Recipes” (bookmarked by user)  

✅ **Modern UI**
- Built with **React + Ant Design UI**
- Responsive & interactive layout  

✅ **Persistent Login**
- State management using **Redux Toolkit** + **redux-persist**

---

## 🧠 Project Overview

**ddRecipe-MERN** is a full-stack web application that allows users to:
- Register and log in to an account  
- Create their own recipes with descriptions, ingredients, and images  
- Browse, edit, and delete their own recipes  
- Save other users’ recipes for later  
- Manage data via a secure Express + MongoDB backend  

**Architecture:**  
Monorepo with two subfolders:
```

ddRecipe-MERN/
│
├── client/  →  React + Vite frontend
└── server/  →  Express + MongoDB backend

```

---

## 🧱 Tech Stack

**Frontend:**
- ⚛️ React (Vite)
- 🧭 React Router DOM
- 🧰 Redux Toolkit + redux-persist
- 💅 Ant Design
- 🍪 react-cookie
- ⚡ Axios for API calls

**Backend:**
- 🌐 Node.js + Express
- 🗄️ MongoDB + Mongoose
- 🔐 JWT Authentication
- 🔑 bcryptjs for password hashing
- 🧩 cookie-parser
- 🌥️ Cloudinary (image upload)

---

## 🗂️ Project Structure

```

ddRecipe-MERN/
│
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page views (Home, CreateRecipe, MyRecipes, etc.)
│   │   ├── redux/            # userSlice.js, store.js
│   │   ├── App.jsx           # Routing setup
│   │   ├── constant.js       # API base URL
│   │   └── main.jsx          # Entry point
│   └── package.json
│
└── server/
├── controllers/          # recipe.controller.js, user.controller.js
├── models/               # recipe.model.js, user.model.js
├── routes/               # recipe.route.js, user.route.js
├── utils/                # ApiError, ApiResponse, asyncHandler
├── app.js                # Express middleware setup
├── index.js              # Server entrypoint
├── constants.js          # DB name constants
└── package.json

````

---

## ⚙️ Installation & Setup

### 🖥️ 1. Clone Repository
```bash
git clone https://github.com/<your-username>/ddRecipe-MERN.git
cd ddRecipe-MERN
````

### 🧩 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net
ACCESS_TOKEN_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=1d
PORT=3001
```

Start the server:

```bash
npm start
```

*Server will run on* **[http://localhost:3001](http://localhost:3001)**

---

### 💻 3. Setup Frontend

```bash
cd client
npm install
```

(Optional) Edit `src/constant.js`:

```js
export const API_BASE_URL = "http://localhost:3001"; // or your deployed API
```

Start client (Vite):

```bash
npm run dev
```

*Open app at* **[http://localhost:5173](http://localhost:5173)**

---

## 🔑 Environment Variables

| Variable              | Location | Description                       |
| --------------------- | -------- | --------------------------------- |
| `MONGODB_URI`         | Server   | MongoDB connection string         |
| `ACCESS_TOKEN_SECRET` | Server   | Secret for JWT signing            |
| `ACCESS_TOKEN_EXPIRY` | Server   | Token expiry duration (e.g. "1d") |
| `PORT`                | Server   | Port for Express server           |
| `DB_NAME`             | Server   | Database name (default: `recipe`) |

---

## 📡 API Endpoints

### 👤 User Routes (`/api/v1/users`)

| Method | Endpoint    | Description            |
| ------ | ----------- | ---------------------- |
| POST   | `/register` | Register new user      |
| POST   | `/login`    | Login user and get JWT |

### 🍳 Recipe Routes (`/api/v1/recipe`)

| Method | Endpoint                         | Description                 |
| ------ | -------------------------------- | --------------------------- |
| GET    | `/`                              | Get all recipes             |
| POST   | `/create`                        | Create new recipe           |
| PUT    | `/save`                          | Save recipe for user        |
| GET    | `/savedRecipes/ids/:userId`      | Get saved recipe IDs        |
| GET    | `/savedRecipes/:userId`          | Get saved recipes (details) |
| GET    | `/userRecipes/:userId`           | Get user’s own recipes      |
| GET    | `/:id`                           | Get recipe by ID            |
| PUT    | `/update/:recipeId`              | Update recipe               |
| DELETE | `/delete/:recipeId`              | Delete recipe               |
| PUT    | `/removeSaved/:recipeId/:userId` | Remove from saved recipes   |

---

## 🧩 Core Components

### Client-Side Highlights

* **`Navbar.jsx`** – Navigation bar with logout, cookie management
* **`PrivateRoute.jsx`** – Route guard for authenticated users
* **`UploadWidget.jsx`** – Cloudinary integration for image uploads
* **`RecipeDetailsModal.jsx` / `RecipeEditModal.jsx`** – Modals for viewing/editing recipes
* **`home.jsx`** – Displays all recipes + save functionality
* **`myRecipes.jsx`** – CRUD for user’s own recipes
* **`savedRecipes.jsx`** – User’s saved recipe list

---

## 🧰 Utility Files

| File              | Purpose                        |
| ----------------- | ------------------------------ |
| `ApiResponse.js`  | Standard response format       |
| `ApiError.js`     | Custom error class for Express |
| `asyncHandler.js` | Wrapper to handle async errors |
| `constants.js`    | Global constants (DB name)     |

---

## 🧑‍💻 Redux State Flow

**State Shape:**

```js
{
  user: {
    currentUser: { data: { user, access_token } },
    loading: false,
    error: false
  }
}
```

**Flow:**

1. `LoginForm` dispatches → `logInStart()`
2. On success → `logInSuccess(response)`
3. Redux persists `currentUser` using `redux-persist`
4. `PrivateRoute` reads `currentUser` to allow/deny access

---

## 🚀 Deployment Notes

* Backend can be deployed on **Render**, **Railway**, or **Vercel Functions**
* Frontend deployed via **Vercel**, **Netlify**, or **GitHub Pages**
* Update `API_BASE_URL` in `client/src/constant.js` with deployed API link
* Ensure **Cloudinary widget** script is added in `index.html`:

  ```html
  <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
  ```

---

## 🧩 Possible Improvements

* ✅ Fix `select(" --password")` → `select("-password")`
* ✅ Add `errorHandler` middleware for `ApiError`
* 🔐 Add `authMiddleware` to protect recipe routes
* 🧠 Improve Redux store to only store `{ user, token }`
* 🌍 Configure environment-based API URLs via `import.meta.env`
* 🧪 Add Jest tests for controllers and reducers

---

## 📸 Screenshots (optional)

> You can add screenshots here once available.

```
/client/src/assets/
├── home.png
├── createRecipe.png
├── savedRecipes.png
└── auth.png
```

---

## 📜 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

## 💡 Author

**👨‍💻 Desh Deepak Verma**

📧 https://www.linkedin.com/in/deshdeepakverma/

🌐 https://github.com/deshdeepak13/

> *Made with ❤️ using the MERN stack.*
