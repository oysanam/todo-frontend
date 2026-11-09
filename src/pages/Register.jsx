import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { request } from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Username" value={username}
        onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password (min 6)" value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button>Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
