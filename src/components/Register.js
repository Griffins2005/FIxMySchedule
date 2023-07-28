import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://planyourschedule.onrender.com/api/users/register', { username, password})
      .then((response) => {
        // After successful registration, redirect to home page
        navigate('/home');
      })
      .catch((error) => {
        console.error(error.response.data);
      });      
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
