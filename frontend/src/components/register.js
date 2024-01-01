import React, { useState, useEffect } from "react";
import "./loginregister.css"
/*import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";*/
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';


function RegistrationForm() {
  /*const [name, setName] = useState("");*/
  /*const [email, setEmail] = useState("");*/
  const [isRegistering, setIsRegistering] = useState(false);
  /*const [password, setPassword] = useState("");*/
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = values;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleNameChange = (event) => {
    /*setName(event.target.value);*/
  };

  /*const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  */
  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/register', values);
      navigate('/Login'); // Navigate to login page immediately after successful signup
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  }
   
    /*try {
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
  */
  useEffect(() => {
    /*setEmail("");
    setPassword("");*/
  }, [isRegistering]);

  return (
    <div>
      <p className="form-header">Registration Form</p>
      <form className="App" onSubmit={handleRegistrationSubmit}>
        <label>Your Name:</label>
        <input
          type="text"
         
          
          /*onChange={handleNameChange}*/
          placeholder="Enter your name"
          value={name}
          onChange={e => setValues({...values, name: e.target.value})}
          
        />

        <label>Email:</label>
        <input
          type="email"
          /*value={email}
          onChange={handleEmailChange}*/
          placeholder="Enter your email"
          value={email}
          onChange={e => setValues({...values, email: e.target.value})}
        />

        <label>Password:</label>
        <input
          type="password"
          /*value={password}
          onChange={handlePasswordChange}*/
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