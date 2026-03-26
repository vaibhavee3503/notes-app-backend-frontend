import React, { useState, useEffect } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const API = "http://127.0.0.1:8000";

  const [message, setMessage] = useState("");
  useEffect(() => {
  if (message) {
    const timer = setTimeout(() => setMessage(""), 2000);
    return () => clearTimeout(timer);
  }
}, [message]);

  const register = async () => {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setMessage("Registered successfully 🎉");
  };

  const login = async () => {
  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (data.access_token) {
      setToken(data.access_token);
      setMessage("Login successful ✅");
    } else {
      setMessage(data.detail || "Login failed ❌");
    }

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    setMessage("Backend not reachable ❌");
  }
};

  const createNote = async () => {
    const res = await fetch(`${API}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
   setMessage("Note created 📝");
  };

 const getNotes = async () => {
  const res = await fetch(`${API}/notes`, {
    headers: { token: token },
  });

  const data = await res.json();

  // ✅ ensure it's always array
  if (Array.isArray(data)) {
    setNotes(data);
  } else {
    setNotes([]);
    setMessage("Failed to load notes ❌");
  }
};

  const deleteNote = async (id) => {
  await fetch(`${API}/notes/${id}`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  setMessage("Note deleted ❌");

  // refresh notes
  getNotes();
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const btn = {
  padding: "8px 15px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer"
};

  return (
  <div style={{
    fontFamily: "Segoe UI",
    background: "linear-gradient(135deg, #221c3b, #764ba2)",
    minHeight: "100vh",
    padding: "30px"
  }}>
    <div style={{
      maxWidth: "700px",
      margin: "auto",
      backgroundColor: "#f2eff1cd",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    }}>
      {message && (
  <div style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  }}>
    {message}
  </div>
)}
      
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🚀 Notes Dashboard
      </h1>

      {/* AUTH */}
      <div style={{ marginBottom: "20px" }}>
        <h3>🔐 Login / Register</h3>

        <input
          placeholder="Email"
          style={inputStyle}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <button style={btn} onClick={register}>Register</button>
          <button style={{ ...btn, marginLeft: "10px" }} onClick={login}>
            Login
          </button>
        </div>
      </div>

      {/* CREATE NOTE */}
      <div style={{ marginBottom: "20px" }}>
        <h3>➕ Create Note</h3>

        <input
          placeholder="Title"
          style={inputStyle}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          style={{ ...inputStyle, height: "70px" }}
          onChange={(e) => setContent(e.target.value)}
        />

        <div>
          <button style={btn} onClick={createNote}>Create</button>
          <button style={{ ...btn, marginLeft: "10px" }} onClick={getNotes}>
            Load Notes
          </button>
        </div>
      </div>

      {/* NOTES LIST */}
      <div>
        <h3>📋 Your Notes</h3>

        {notes.length === 0 ? (
          <p style={{ color: "gray" }}>No notes yet...</p>
        ) : (
          Array.isArray(notes) && notes.map((n) => (
            <div key={n.id} style={{
    background: "#f9fafc",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  }}>
    <strong>{n.title}</strong>
    <p>{n.content}</p>

    <button
      onClick={() => deleteNote(n.id)}
      style={{
        background: "linear-gradient(135deg, #ff4b5c, #ff6a88)",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Delete
    </button>
  </div>
))
        )}
      </div>

    </div>
  </div>
);
}

export default App;