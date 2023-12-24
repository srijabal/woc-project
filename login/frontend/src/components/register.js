import React, { useState, useEffect } from "react";
import "../App.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    // Registration logic
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      alert("You have successfully registered");
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      alert("Something went wrong. please Try again: " + errorMessage);
    }
  };
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isRegistering]);

  return (
    <div>
      <p className="form-header">Registration Form</p>
      <form className="App" onSubmit={handleRegistrationSubmit}>
        <label>Your Name:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />

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
          value="Register"
        />
      </form>
    </div>
  );
}

export default RegistrationForm;