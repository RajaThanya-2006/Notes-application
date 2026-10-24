# 📝 Notes Application

A full-stack Notes Application built using **React, Node.js, Express.js, and MongoDB**. Users can create, view, edit, delete, and search notes through a clean and responsive interface.

## 🚀 Features

- **Create Notes** – Add notes with a title and content.
- **View Notes** – Display saved notes on the dashboard.
- **Edit Notes** – Update existing notes.
- **Delete Notes** – Remove notes that are no longer needed.
- **Search Notes** – Search notes by title or content.
- **Database Integration** – Store notes in MongoDB.
- **REST API** – Communicate between the frontend and backend.
- **Responsive UI** – Use the application on different screen sizes.

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS
- Axios
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Deployment**
- GitHub – Source code management
- Render – Backend hosting
- Vercel – Frontend hosting (planned)

## 📁 Project Structure

```text
notes-application/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

*Note: The folder structure may vary slightly depending on your implementation.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RajaThanya-2006/notes-application.git
cd notes-application
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.

Start the backend:

```bash
npm start
```

If your `package.json` does not define a `start` script, run `node server.js` instead.

### 3. Set Up the Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

## 🔗 API Endpoints

Base URL: `http://localhost:5000/api/notes`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notes` | Retrieve all notes |
| GET | `/api/notes/:id` | Retrieve a specific note |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

### Example: Create a Note

**Request**

```http
POST /api/notes
Content-Type: application/json
```

```json
{
  "title": "My First Note",
  "content": "This is my first note."
}
```

## 🗄️ Database

The application uses MongoDB to store notes. Each note contains a title, content, and timestamps indicating when it was created and last updated.

## 🌐 Deployment

The project source code is hosted on GitHub.

- **Backend:** Deploy using Render.
- **Database:** MongoDB Atlas.
- **Frontend:** Deploy using Vercel.

For production, configure the frontend API URL to point to the deployed backend and configure the backend's CORS settings to allow the deployed frontend origin.

## 🔐 Security

- Keep database credentials and secrets in environment variables.
- Never commit `.env` files to GitHub.
- Configure production CORS to allow only trusted origins.
- Validate and sanitize incoming API data.

## 🎯 Project Objective

The objective of this project is to develop a full-stack web application that demonstrates frontend development, REST API integration, database operations, and deployment.

## 👩‍💻 Author

**Raja Thanya**

GitHub: [RajaThanya-2006](https://github.com/RajaThanya-2006)

---

⭐ If you find this project useful, consider giving the repository a star.
