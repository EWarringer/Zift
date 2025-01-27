import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import FolderView from './components/FolderView';
import AuthButtons from './components/AuthButtons';

const App = () => {
  const [folders, setFolders] = useState([]);

  return (
    <AuthProvider>
      <Router>
        <AuthButtons />
        <Routes>
        <Route path="/" element={<LandingPage folders={folders} setFolders={setFolders} />} />
        <Route path="/folder/:folderName" element={<FolderView folders={folders} />} />
      </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;