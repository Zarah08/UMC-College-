// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../users";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Save user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "admin") navigate("/admin");
      if (user.role === "teacher") navigate("/teacher");
      if (user.role === "student") navigate("/student");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ marginTop: 20 }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
