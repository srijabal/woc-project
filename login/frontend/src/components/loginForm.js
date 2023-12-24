import React, { useState } from "react";
import "../App.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      alert("login successful")
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      alert("Login failed: " + errorMessage);
    }
  };

  return (
    <div>
      <p className="form-header">Login Form</p>
      <form className="App" onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />

        <input
          type="submit"
          style={{ backgroundColor: "#a1eafb" }}
          value="Login"
        />
      </form>
    </div>
  );
}

export default LoginForm;