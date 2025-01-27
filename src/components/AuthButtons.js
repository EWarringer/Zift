
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function AuthButtons() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call to backend for auth
    setShowModal(false);
  };

  return (
    <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
      {!user ? (
        <>
          <button onClick={() => { setIsLogin(true); setShowModal(true); }}>Sign In</button>
          <button onClick={() => { setIsLogin(false); setShowModal(true); }} style={{ marginLeft: '10px' }}>Sign Up</button>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>{user.username}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}

      {showModal && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#282c34',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          zIndex: 1000
        }}>
          <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                style={{ marginBottom: '10px', display: 'block' }}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{ marginBottom: '10px', display: 'block' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{ marginBottom: '10px', display: 'block' }}
            />
            <button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</button>
            <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AuthButtons;
