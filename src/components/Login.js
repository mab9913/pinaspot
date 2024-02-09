// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username,
        password
      }, {
        withCredentials: true // Esto es importante para el manejo de cookies
      });
  
      if (response.data.success) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError('Login fallido. Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setError('Error de servidor. Por favor, intente más tarde.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <input
          className="login-user"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
        />
        <input
          className="login-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button className="login-button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
