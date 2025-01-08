import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../redux/slices/authSlice';

const AuthPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data: { token?: string; message?: string } = await response.json();
    if (response.ok && data.token) {
      localStorage.setItem('token', data.token);
      dispatch(setAuthenticated(true));
      router.push('/');
    } else {
      setMessage(data.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthPage;