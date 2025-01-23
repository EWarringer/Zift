import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FolderView from './components/FolderView';

const App = () => {
  const [folders, setFolders] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage folders={folders} setFolders={setFolders} />} />
        <Route path="/folder/:folderName" element={<FolderView folders={folders} />} />
      </Routes>
    </Router>
  );
};

export default App;