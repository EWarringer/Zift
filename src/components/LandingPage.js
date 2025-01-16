
import React, { useState } from 'react';
import OpenAI from 'openai';

// Initialize OpenAI (you'll need to set up API key in environment variables)
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

function LandingPage() {
  const [inputValue, setInputValue] = useState('');
  const [folders, setFolders] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processNoteWithAI = async (note) => {
    try {
      setIsProcessing(true);
      
      // Get AI suggestions for labels and folder
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "Analyze this note and provide a category label and folder name. Response format: {label}|{folder}"
        }, {
          role: "user",
          content: note
        }],
      });

      const [label, suggestedFolder] = completion.choices[0].message.content.split('|');

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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
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

      <div style={{ marginTop: '40px', width: '80%' }}>
        {folders.map((folder) => (
          <div key={folder.name} style={{ 
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px'
          }}>
            <h3>{folder.name}</h3>
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
