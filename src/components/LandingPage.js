import React, { useState } from 'react';

function LandingPage() {
  // State variables for notes, folders, input value, and selected folder
  const [inputValue, setInputValue] = useState('');
  const [folders, setFolders] = useState([{ name: 'Default', notes: [] }]);
  const [selectedFolder, setSelectedFolder] = useState('Default');

  // Function to handle saving a note to a selected folder
  const handleSaveNote = () => {
    if (inputValue.trim() !== '') {
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.name === selectedFolder
            ? { ...folder, notes: [...folder.notes, inputValue] }
            : folder
        )
      );
      setInputValue(''); // Clear the input after saving
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        color: 'white',
        padding: '20px',
        backgroundColor: '#282c34',
        minHeight: '100vh', // Ensures the background color covers the full height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Logo */}
      <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="Zift Logo" style={{ width: '500px' }} />

      {/* Header */}
      <h2>Save your notes</h2>

      {/* Dropdown to select folder */}
      <select
        value={selectedFolder}
        onChange={(e) => setSelectedFolder(e.target.value)}
        style={{ marginBottom: '10px' }}
      >
        {folders.map((folder) => (
          <option key={folder.name} value={folder.name}>
            {folder.name}
          </option>
        ))}
      </select>

      {/* Input and button to add a note */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a note here"
        style={{ padding: '5px', marginRight: '10px' }}
      />
      <button onClick={handleSaveNote}>Save Note</button>

      {/* Displaying notes by folder */}
      <div style={{ marginTop: '20px', color: 'white' }}>
        <h2>Notes by Folder:</h2>
        {folders.map((folder) => (
          <div key={folder.name} style={{ marginBottom: '20px' }}>
            <h3>{folder.name}</h3>
            <ul>
              {folder.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
