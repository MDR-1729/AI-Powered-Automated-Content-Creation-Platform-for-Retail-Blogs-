import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
    const navigate = useNavigate()
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const endpoint = isLoginView ? '/login' : '/signup';
      const response = await axios.post(`${API_URL}${endpoint}`, formData);

      if (isLoginView) {
        setSuccess('Login successful!');
        navigate("home")
        console.log('JWT Token:', response.data.token);
      } else {
        setSuccess('Registration successful! Please login.');
        setIsLoginView(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setSuccess('');
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLoginView ? 'login' : 'signup'}`}>
        <h1 className="auth-title">{isLoginView ? 'Login' : 'Sign Up'}</h1>
        
        {(error || success) && (
          <div className={`message ${error ? 'error' : 'success'}`}>
            {error || success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Username"
              required
              className="auth-input"
            />
            <span className="input-border"></span>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="auth-input"
            />
            <span className="input-border"></span>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              isLoginView ? 'Login' : 'Register'
            )}
          </button>
        </form>

        <p className="toggle-text">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleView} className="toggle-button">
            {isLoginView ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;