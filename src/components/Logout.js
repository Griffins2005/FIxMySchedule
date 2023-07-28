import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/');
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
