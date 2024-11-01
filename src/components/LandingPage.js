// src/components/LandingPage.js
import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [inputValue, setInputValue] = useState('');  // Holds the current text input
  const [notes, setNotes] = useState([]);            // Stores saved notes

  // Handle changes to the input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //Function to Handle Saving Notes
  const handleSaveNote = () => {
    if (inputValue.trim() !== '') {
      setNotes([...notes, inputValue]);
      setInputValue('');  // Clear the input field
    }
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
      <button onClick={handleSaveNote} className="micButton">
        Save Note
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
};

export default LandingPage;
