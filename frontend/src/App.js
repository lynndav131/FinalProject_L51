import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';
import Reports from './components/Reports';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Router>
      <nav className="card" style={{ display: 'flex', gap: 12 }}>
        <Link to="/">Login</Link>
        {token && <Link to="/dashboard">Dashboard</Link>}
        {token && <Link to="/summary">Summary</Link>}
        {token && <Link to="/reports">Reports</Link>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><Summary /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}


export default App;
