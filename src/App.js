import { useState } from "react";
import "./App.css";

function App() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        setNameError(data.errors.name);
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }
    } catch (error) {
      console.log(error);
      console.log("Test");
    }
  };
  return (
    <div className="App">
      <form autoComplete="off" onSubmit={register}>
        <h1>Signup</h1>
        <input
          type="text"
          value={username}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <div className="error">{nameError}</div>}
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="error">{emailError}</div>}
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="error">{passwordError}</div>}
        <button type="submit" className="btn btn__signup">
          Signup
        </button>
      </form>
    </div>
  );
}

export default App;
