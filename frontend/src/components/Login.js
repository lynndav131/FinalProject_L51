import React, { useState } from 'react';
import api from '../utils/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Login failed. Try username: Lynnox and password: Lynnox for demo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>L51 Login</h2>
        <input
          aria-label="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          aria-label="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
      <div className="card">
        <p>Demo credentials: username <strong>Lynnox</strong>, password <strong>Lynnox</strong>.</p>
      </div>
    </div>
  );
}

export default Login;
