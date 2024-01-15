import React, { useState, useEffect } from "react";
import "./loginregister.css"

import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';


function RegistrationForm() {
   
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const {name, email, password } = values;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegistrationSubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3001/register', values);
        console.log(response);
        if (response.status == 200) {
          navigate('/login');
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred. Please try again.");
      }
  }
   

  return (
    <div  style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      flexDirection: "column",
      margin: "auto",
      marginTop: "10%",
      width: "20%",
      padding: "10px",
      border: "2px solid #000",
    }}>
      <p className="form-header">Registration Form</p>
      <form className="App" onSubmit={handleRegistrationSubmit}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setValues({...values, name: e.target.value})}
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setValues({...values, email: e.target.value})}
        />

        <label>Password:</label>
        <input
          type="password"
          
          placeholder="Enter your password"
          value={password}
          onChange={e => setValues({...values, password: e.target.value})}
        />

        <input
          type="submit"
          style={{ backgroundColor: "#0db2e8" }}
          value="Register"
        />
      </form>
    </div>
  );
}

export default RegistrationForm;