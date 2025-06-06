
---

## 🌐 Pages & Features

### 1. Home Page (`/`)  
- Displays a paginated list of GitHub users  
- SearchBar with debounced input to search users  
- Pagination controls (Prev/Next)  
- Grid layout with `UserCard` components  
- Loading and error handling states  

### 2. User Profile Page (`/user/:username`)  
- Detailed view of a selected GitHub user  
- Displays avatar, name, username, bio, location, followers, following, and public repos  
- Optional display of recent repositories  
- Loading and error states  

### 3. Favorites Page (`/favorites`)  
- Shows a grid of favorited developers  
- Uses Context API and useReducer for state management  
- Persists favorites list in `localStorage`  
- Displays a message when favorites list is empty  

---

## 🧱 Components Overview

- **UserCard.tsx**  
  Displays user avatar, username, and buttons for profile navigation and toggling favorites  

- **SearchBar.tsx**  
  Input component with debounced search functionality  

- **Loader.tsx**  
  Shows a spinner during data fetching  

---

## 🔐 GitHub API Integration

- Base URL: `https://api.github.com`  
- Endpoints used:  
  - `GET /users` - List users (paginated)  
  - `GET /search/users?q={username}` - Search users  
  - `GET /users/:username` - User details  
  - `GET /users/:username/repos` - User repositories (optional)  

- Rate limiting:  
  - 60 requests/hr for unauthenticated calls  
  - Optionally use a personal access token via `Authorization: token YOUR_TOKEN` header for higher limits  

---

## 📝 How to Run

1. Clone the repository  
2. Install dependencies  
   ```bash
   npm install
   # or
   yarn install
