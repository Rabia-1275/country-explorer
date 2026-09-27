<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories. -->


# 🌍 Country Explorer

A React + TypeScript app for discovering countries around the world — search, compare, and save your favorites, built with an MVVM architecture and powered by the REST Countries API and Firebase.

---

## ✨ Features

- 🔍 **Search** countries by name, with a random selection of countries shown on load
- 🗺️ **Filter by region** (Africa, Americas, Asia, Europe, Oceania) and **sort** by name or population
- 📄 **Country detail pages** — capital, currencies, languages, timezones, calling code, driving side, and clickable neighboring/border countries
- ❤️ **Favorites** and 🔖 **Wishlist** — save countries to two separate lists, backed by Firebase
- ⚖️ **Compare** up to 3 countries side by side in a comparison table
- 🔐 **Authentication** — register/login with email & password (Firebase Auth)
- 🌗 **Dark / Light mode** — persisted, with OS preference detected on first visit
- 💀 **Skeleton loaders** for a polished loading experience
- 📱 Fully **responsive** design

---

## 🧱 Architecture

The app follows an **MVVM (Model–View–ViewModel)** pattern per screen:

```
src/
├── components/        # Reusable UI (Header, CountryCard, SkeletonCard)
├── context/            # ThemeContext, AuthContext
├── services/            # countriesService, authService, firebaseService
├── types/               # Shared TypeScript types (Country, etc.)
└── pages/
    ├── home/             # HomeModel · useHomeViewModel · HomeView
    ├── detail/           # DetailModel · useDetailViewModel · DetailView
    ├── auth/             # AuthModel · useAuthViewModel · AuthView
    ├── favorites/        # FavoritesModel · useFavoritesViewModel · FavoritesView
    ├── wishlist/         # WishlistModel · useWishlistViewModel · WishlistView
    └── compare/          # CompareModel · useCompareViewModel · CompareView
```

- **Model** — pure business logic, no React
- **ViewModel** — a custom hook managing state and actions
- **View** — renders the UI using the ViewModel

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Routing | React Router |
| Backend | Firebase (Authentication + Realtime Database) |
| Data source | [REST Countries API (v5)](https://restcountries.com) |
| Styling | Plain CSS with CSS variables (theming) |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd countryExplorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
# REST Countries API (https://restcountries.com/sign-up)
VITE_COUNTRIES_API_KEY=your_restcountries_api_key
VITE_COUNTRIES_API_URL=https://api.restcountries.com

# Firebase (https://console.firebase.google.com)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ `.env` is included in `.gitignore` and should never be committed. Each contributor needs their own REST Countries API key and Firebase project config.

### 4. Set up Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication → Email/Password**
3. Enable **Realtime Database** (start in test mode for development)
4. In the API key settings on [restcountries.com](https://restcountries.com), add `localhost:5173` (or your dev URL) to **CORS Allowed Origins**

### 5. Run the app

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

---

## 🗂️ Firebase Data Structure

```
favorites/
  {userId}/
    {countryAlpha3Code}: { ...country data }

wishlist/
  {userId}/
    {countryAlpha3Code}: { ...country data }
```

---

## 🧑‍💻 Development Notes

This project was built iteratively using AI-assisted, prompt-driven development (Cursor / Google Antigravity), following the MVVM pattern for each screen. See `Country-Explorer-Submission.md` for the full list of prompts used, an explanation of how AI assisted throughout, and examples of manual debugging and corrections made along the way.

---

## 📄 License

This project was built for educational purposes as part of an internship assignment.