import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import image from "../assests/time.jpg";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Send the login request to the backend
    axios.post('https://PlanYourSchedule.render.com/api/users/login', { username, password })
      .then((response) => {
        // Save token to local storage
        localStorage.setItem('token', response.data.token);
        // Redirect to the home page after successful login
        navigate('/home');
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
      });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit">Login</button>
        </form>
        <p>Create an account? <Link to="/register">Register</Link></p>
      </div>
      <div>
        <img className='time' src={image} alt='Login' />
      </div>
    </div>
  );
}

export default LoginPage;
