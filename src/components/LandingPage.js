// src/components/LandingPage.js
import React, { useState } from 'react';

const LandingPage = () => {
  const [inputValue, setInputValue] = useState('');  // State for text input

  // Handle changes to the input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Temporary function for the microphone button (we'll expand this later)
  const handleMicClick = () => {
    alert("Voice input is not set up yet!");  // Just a placeholder
  };

  return (
    <div style={styles.container}>
      <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="Zift Logo" style={{ width: '500px' }} />
      <input
        type="text"
        placeholder="Type or speak your idea..."
        value={inputValue}
        onChange={handleInputChange}
        style={styles.inputBox}
      />
      <button onClick={handleMicClick} style={styles.micButton}>
        🎤
      </button>
    </div>
  );
};

// Basic styling for layout
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#282c34',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  inputBox: {
    width: '300px',
    padding: '10px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  micButton: {
    padding: '10px 20px',
    fontSize: '1em',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default LandingPage;
