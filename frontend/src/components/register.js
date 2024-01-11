import React, { useState, useEffect } from "react";
import "./loginregister.css"

import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';


function RegistrationForm() {
  
  const [isRegistering, setIsRegistering] = useState(false);
 
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = values;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleNameChange = (event) => {
    
  };

 
  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/register', values);
      navigate('/Login'); 
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  }
   
    
  useEffect(() => {
    
  }, [isRegistering]);

  return (
    <div>
      <p className="form-header">Registration Form</p>
      <form className="App" onSubmit={handleRegistrationSubmit}>
        <label>Your Name:</label>
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
          style={{ backgroundColor: "#7FFF00" }}
          value="Register"
        />
      </form>
    </div>
  );
}

export default RegistrationForm;