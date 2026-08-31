# 🚀 API Data Viewer

A simple full-stack **API Data Viewer** built with **React + FastAPI**.
The project demonstrates how a React frontend communicates with a FastAPI backend, which then fetches data from an external API using asynchronous HTTP requests.

---

## ✨ Features

* ⚛️ **React + Vite** frontend
* 🐍 **FastAPI** backend
* ⚡ Async API requests using **HTTPX**
* 🔗 React → FastAPI → External API architecture
* 🌐 CORS configuration
* ⏳ Loading state
* ❌ Error handling
* 🔍 Search posts
* 📄 Server-side pagination
* ⏮️ Previous / Next navigation
* 🔢 Page number navigation
* 📊 Clean tabular data display
* 🎨 Simple responsive UI

---

## 🏗️ Architecture

```text
┌─────────────────────┐
│     React UI        │
│                     │
│ Search + Pagination │
└──────────┬──────────┘
           │
           │ HTTP Request
           ▼
┌─────────────────────┐
│      FastAPI        │
│                     │
│ Query Params        │
│ Search              │
│ Pagination          │
│ Error Handling      │
└──────────┬──────────┘
           │
           │ HTTPX
           ▼
┌─────────────────────┐
│  JSONPlaceholder    │
│                     │
│      /posts         │
└─────────────────────┘
```

---

## 🛠️ Tech Stack

| Technology         | Purpose                      |
| ------------------ | ---------------------------- |
| ⚛️ React           | Frontend UI                  |
| ⚡ Vite             | React development/build tool |
| 🐍 FastAPI         | Backend API                  |
| 🔄 HTTPX           | Async HTTP requests          |
| 🌐 JSONPlaceholder | External API                 |
| 🎨 CSS             | Styling                      |

---

## 📂 Project Structure

```text
api-data-viewer/
│
├── backend/
│   ├── main.py
│   ├── .gitignore
│   └── venv/              # 🚫 Not committed
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 🔄 How It Works

### 1️⃣ React requests data

The frontend calls the FastAPI endpoint:

```text
GET /api/posts
```

For pagination:

```text
GET /api/posts?page=2&limit=10
```

For search:

```text
GET /api/posts?page=1&limit=10&search=qui
```

### 2️⃣ FastAPI receives the request

FastAPI accepts:

* `page`
* `limit`
* `search`

and uses these values to process the requested data.

### 3️⃣ FastAPI fetches external data

FastAPI uses `HTTPX` to communicate with JSONPlaceholder.

```python
async with httpx.AsyncClient() as client:
    response = await client.get(url)
```

### 4️⃣ Search and pagination

FastAPI filters the posts when a search term is provided and then calculates which records belong to the requested page.

```text
100 posts
   ↓
Search
   ↓
Matching posts
   ↓
Pagination
   ↓
10 posts
   ↓
React UI
```

---

## 📄 Pagination

The application displays **10 posts per page**.

Example:

```text
Page 1 → Posts 1–10
Page 2 → Posts 11–20
Page 3 → Posts 21–30
...
Page 10 → Posts 91–100
```

The UI provides:

```text
◀ Prev   1  2  3  4  5  6  7  8  9  10   Next ▶
```

The **Previous** button is disabled on page 1, and **Next** is disabled on the last page.

---

## 🔍 Search

Search works together with pagination.

For example:

```text
Search → "qui"
```

The backend:

1. 🔎 Filters matching posts
2. 🔢 Calculates the total matching records
3. 📄 Applies pagination
4. 📦 Returns the current page

When a new search is performed, the application resets pagination to **page 1**.

---

## ⏳ Loading & Error Handling

The React application displays a loading message while data is being fetched:

```text
Loading data...
```

API errors are handled on both sides.

### Backend

FastAPI checks the external API response:

```python
if response.status_code >= 400:
    raise HTTPException(
        status_code=response.status_code,
        detail="Failed to load data..."
    )
```

### Frontend

React checks the `fetch()` response:

```javascript
if (!response.ok) {
    throw new Error("Failed to load data..");
}
```

The error is then displayed to the user.

---

## 🚀 Running the Project

### Backend

Navigate to the backend:

```bash
cd backend
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install fastapi uvicorn httpx
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

Backend will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🧪 API Examples

### Get first page

```text
GET /api/posts?page=1&limit=10
```

### Get second page

```text
GET /api/posts?page=2&limit=10
```

### Search

```text
GET /api/posts?page=1&limit=10&search=qui
```

### Response format

```json
{
  "data": [],
  "total": 100
}
```

---

## 🎯 What I Learned

This project was built to practice and understand:

* ⚛️ React state management with `useState`
* 🔄 `useEffect` for API requests
* 📡 Fetching API data
* ⏳ Loading states
* ❌ Error handling
* 🐍 FastAPI endpoints
* 🔢 FastAPI query parameters
* ⚡ Async programming with `async` / `await`
* 🌐 HTTP requests using HTTPX
* 🔗 CORS
* 📄 Server-side pagination concepts
* 🔍 Search + pagination
* 🔄 React re-rendering when state changes
* 🧩 Separating API logic into a service file

---

## 🔮 Possible Future Improvements

This POC can be extended with:

* 🔄 Refresh button
* ⌨️ Debounced search
* 📊 Total result information
* 🎨 Improved UI/UX
* 📱 Better mobile responsiveness
* 🗄️ Database integration
* 🔐 Authentication
* 🧪 Automated tests
* 📦 Production deployment

---

## 👨‍💻 About

Built as a hands-on project to understand how a **React frontend and FastAPI backend work together** to fetch, process, search and paginate API data.

---

⭐ **If you find this project useful, feel free to explore the code and experiment with it!**
