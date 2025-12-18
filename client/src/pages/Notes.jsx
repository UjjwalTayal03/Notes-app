import { useState, useEffect } from "react";
import api from "../services/api";
import React from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchNotes = async () => {
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const logout = () =>{
    localStorage.removeItem("token")
    window.location.href = '/'

  }

  const addNotes = async () => {
    if (!title) return;
    await api.post("/notes", { title });
    setTitle("");
    fetchNotes();
  };

  const deleteNotes = async (id) => {
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  const saveUpdate = async (id) => {
    await api.put(`/notes/${id}`, { title: editTitle });
    setEditingId(null);
    setEditTitle("");
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-10 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">My Notes</h2>
        <button className="text-sm text-red-600 hover:underline" onClick={logout}>Logut</button>

        </div>
        {/* Add note */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={title}
            placeholder="New note"
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addNotes}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Notes list */}
        <ul className="space-y-2">
          {notes.map((n) => (
            <li
              key={n._id}
              className="border rounded px-3 py-2 flex justify-between items-center"
            >
              {editingId === n._id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 border rounded px-2 py-1 mr-2"
                />
              ) : (
                <span className="flex-1">{n.title}</span>
              )}

              <div className="flex gap-2 ml-2">
                {editingId === n._id ? (
                  <>
                    <button
                      onClick={() => saveUpdate(n._id)}
                      className="text-green-600"
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditTitle("");
                      }}
                      className="text-gray-500"
                    >
                      ✖
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(n._id);
                        setEditTitle(n.title);
                      }}
                      className="text-blue-600"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteNotes(n._id)}
                      className="text-red-500"
                    >
                      ❌
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
