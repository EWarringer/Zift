/*
import React, { useState } from 'react';
import './App.css'; // Assuming you want to add styles later

function App() {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('User Input:', input);
    // You can replace this with code to store input or send it to an API
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="Zift Logo" style={{ width: '500px' }} />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Start typing your thoughts here..."
          />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
*/

// src/App.js
import React from 'react';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default App;
