import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const apiKey = 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjA0ZWY4MmMtYjY0My00NzdhLWJmZjQtNzIyYzVhMTVlZjk3IiwidHlwZSI6ImFwaV90b2tlbiJ9.mLmk3z9gEg5LLKbqezhqXdjogmWTec2ksQ-6C1MuH8k'; // Replace with your actual Eden AI API key
      
      const url = 'https://api.edenai.run/v2/text/question_answer';

      const payload = {
        texts: [input],
        temperature: 0.8,
        examples: [
          ["What is human life expectancy in the United States?", "78 years."],
        ],
        providers: "openai",
        question: "What is a competitor of Linux?",
        examples_context: "In 2017, U.S. life expectancy was 78.6 years.",
        fallback_providers: "",
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + {apiKey},
      };

      const { data } = await axios.post(url, payload, { headers });
      setResponse(data.answers[0]);

    } catch (error) {
      console.error('Error calling Eden AI API', error);
    }
  };

  return (
    
    <div>
        <Navbar />
        <h2 style={{ color: '#3a9b96',display: 'flex',flexDirection:"column", alignItems: 'center', justifyContent: 'center' }}>AI Problem Solver</h2>
        <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your search..."
          style={{padding: '10px',
          
            
          }}
        />
        <button
          style={{
            backgroundColor:'#6ab04c',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex'
          }}
          onClick={handleSendMessage}
        >
          Search
        </button>
      
      </div>
      <div>
       <p style={{  fontSize: '1.2rem' }}>Response: {response}</p>
      </div>
    </div>
  );
};

export default ChatComponent;

