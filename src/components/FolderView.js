
import React from 'react';
import { useParams, Link } from 'react-router-dom';

function FolderView({ folders }) {
  const { folderName } = useParams();
  const folder = folders.find(f => f.name === folderName) || { notes: [] };

  return (
    <div style={{
      textAlign: 'center',
      color: 'white',
      padding: '20px',
      backgroundColor: '#282c34',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', marginBottom: '20px' }}>
        <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="Zift Logo" style={{ width: '300px' }} />
      </Link>
      
      <h2>{folder.name}</h2>
      
      <div style={{ width: '80%', maxWidth: '800px' }}>
        {folder.notes.map((note, index) => (
          <div key={index} style={{ 
            marginBottom: '10px',
            padding: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            textAlign: 'left'
          }}>
            <div>{note.content}</div>
            <small style={{ color: '#61dafb' }}>Label: {note.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FolderView;
