import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Simple classification function
const classifyNote = (note) => {
  const text = note.toLowerCase();
  if (text.includes('todo') || text.includes('task') || text.includes('need to')) {
    return ['Task', 'Tasks'];
  } else if (text.includes('idea') || text.includes('think') || text.includes('maybe')) {
    return ['Idea', 'Ideas'];
  } else if (text.includes('meeting') || text.includes('call') || text.includes('discuss')) {
    return ['Meeting Note', 'Meetings'];
  } else {
    return ['General Note', 'General'];
  }
};

function LandingPage() {
  const [inputValue, setInputValue] = useState('');
  const [folders, setFolders] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processNoteWithAI = async (note) => {
    try {
      setIsProcessing(true);

      // Use local classification instead of OpenAI
      const [label, suggestedFolder] = classifyNote(note);

      // Create folder if it doesn't exist
      if (!folders.some(f => f.name === suggestedFolder)) {
        setFolders(prev => [...prev, { name: suggestedFolder, notes: [] }]);
      }

      // Add note to appropriate folder
      setFolders(prev => prev.map(folder => 
        folder.name === suggestedFolder 
          ? { ...folder, notes: [...folder.notes, { content: note, label }] }
          : folder
      ));

      setInputValue('');
    } catch (error) {
      console.error('Error processing note:', error);
      alert('Error processing note. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      await processNoteWithAI(inputValue);
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      color: 'white',
      padding: '20px',
      backgroundColor: '#282c34',
      minHeight: '100vh',
      maxHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto'
    }}>
      <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="Zift Logo" style={{ width: '500px' }} />

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your note here..."
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
          disabled={isProcessing}
        />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Save Note'}
        </button>
      </form>

      <div style={{ 
        marginTop: '40px', 
        width: '80%',
        maxHeight: 'calc(100vh - 250px)',
        overflowY: 'auto'
      }}>
        {folders.map((folder) => (
          <div key={folder.name} style={{ 
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px'
          }}>
            <h3>
              <Link 
                to={`/folder/${folder.name}`} 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {folder.name}
                <span style={{ fontSize: '0.8em', color: '#61dafb' }}>
                  View All ({folder.notes.length}) →
                </span>
              </Link>
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {folder.notes.map((note, index) => (
                <li key={index} style={{ 
                  marginBottom: '10px',
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '4px'
                }}>
                  <div>{note.content}</div>
                  <small style={{ color: '#61dafb' }}>Label: {note.label}</small>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;