
import { useEffect, useState } from "react";
import {
  Plus, Search, FileText, Pencil, Trash2, X, StickyNote
} from "lucide-react";
import api from "./services/api";
import "./index.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function fetchNotes() {
    try {
      setError("");
      const response = await api.get("/notes");
      setNotes(response.data);
    } catch {
      setError("Could not load notes. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setError("");
    setShowForm(true);
  }

  function openEditForm(note) {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Please enter both a title and content.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingId) {
        await api.put(`/notes/${editingId}`, {
          title: title.trim(),
          content: content.trim(),
        });
        setMessage("Note updated successfully.");
      } else {
        await api.post("/notes", {
          title: title.trim(),
          content: content.trim(),
        });
        setMessage("Note created successfully.");
      }

      setShowForm(false);
      setTitle("");
      setContent("");
      setEditingId(null);
      await fetchNotes();
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not save the note."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      setError("");
      await api.delete(`/notes/${id}`);
      setNotes((current) => current.filter((note) => note._id !== id));
      setMessage("Note deleted successfully.");
    } catch {
      setError("Could not delete the note. Please try again.");
    }
  }

  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-icon"><StickyNote size={23} /></span>
          <span>NoteSpace</span>
        </a>
        <span className="topbar-label">Your personal workspace</span>
      </header>

      <main className="main-content">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>My Notes<span>.</span></h1>
            <p className="subtitle">
              Your thoughts, ideas and plans — all in one place.
            </p>
          </div>
          <button className="primary-button" onClick={openCreateForm}>
            <Plus size={19} /> New Note
          </button>
        </section>

        <section className="stats-row">
          <div className="stat-card">
            <span className="stat-icon"><FileText size={20} /></span>
            <div>
              <p>Total notes</p>
              <h2>{notes.length}</h2>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon lavender"><Search size={20} /></span>
            <div>
              <p>Search results</p>
              <h2>{filteredNotes.length}</h2>
            </div>
          </div>
        </section>

        <section className="notes-section">
          <div className="section-heading">
            <div>
              <h2>All notes</h2>
              <p>Capture something worth remembering.</p>
            </div>

            <label className="search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search notes..."
                aria-label="Search notes"
              />
              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </label>
          </div>

          {message && (
            <div className="success-message">
              {message}
              <button onClick={() => setMessage("")} aria-label="Dismiss">
                <X size={16} />
              </button>
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError("")} aria-label="Dismiss">
                <X size={16} />
              </button>
            </div>
          )}

          {loading ? (
            <div className="empty-state">
              <p>Loading your notes...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon"><StickyNote size={30} /></span>
              <h3>{search ? "No matching notes" : "Your page is waiting"}</h3>
              <p>
                {search
                  ? "Try another search term."
                  : "Create your first note and start collecting your ideas."}
              </p>
              {!search && (
                <button className="primary-button" onClick={openCreateForm}>
                  <Plus size={18} /> Create your first note
                </button>
              )}
            </div>
          ) : (
            <div className="notes-grid">
              {filteredNotes.map((note, index) => (
                <article className={`note-card color-${index % 4}`} key={note._id}>
                  <div className="note-card-top">
                    <span className="note-symbol"><FileText size={19} /></span>
                    <div className="note-actions">
                      <button
                        onClick={() => openEditForm(note)}
                        aria-label={`Edit ${note.title}`}
                        title="Edit note"
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        aria-label={`Delete ${note.title}`}
                        title="Delete note"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>

                  <h3>{note.title}</h3>
                  <p className="note-content">{note.content}</p>
                  <time>
                    Updated {new Date(note.updatedAt).toLocaleDateString()}
                  </time>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {showForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
              setError("");
            }
          }}
        >
          <section
            className="note-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-heading"
          >
            <div className="modal-heading">
              <div>
                <p className="eyebrow">{editingId ? "EDIT NOTE" : "NEW NOTE"}</p>
                <h2 id="form-heading">
                  {editingId ? "Update your note" : "Create a note"}
                </h2>
              </div>
              <button
                className="close-button"
                onClick={() => {
                  setShowForm(false);
                  setError("");
                }}
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="note-title">Title</label>
              <input
                id="note-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Give your note a title"
                maxLength={150}
                required
                autoFocus
              />

              <label htmlFor="note-content">Content</label>
              <textarea
                id="note-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Start writing your thoughts..."
                rows={7}
                required
              />

              {error && <p className="form-error">{error}</p>}

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="primary-button"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? "Saving..." : editingId ? "Save changes" : "Save note"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
