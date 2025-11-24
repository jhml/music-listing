import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../config';

interface AuthProps {
  setToken: (t: string | null) => void;
}

const Auth: React.FC<AuthProps> = ({ setToken }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegister ? '/auth/register' : '/auth/login';

    try {
      const res = await axios.post(`${API}${endpoint}`, { username, password });
      if (isRegister) {
        alert('Registration successful! Please login.');
        setIsRegister(false);
      } else {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
      }
    } catch (err: any) {
      setError(err.response?.data || 'An error occurred');
    }
  };

  return (
    <div className='auth-container'>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>{isRegister ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <p onClick={() => setIsRegister(!isRegister)} className='switch-auth'>
        {isRegister
          ? 'Already have an account? Login'
          : 'Need an account? Register'}
      </p>
    </div>
  );
};

export default Auth;
