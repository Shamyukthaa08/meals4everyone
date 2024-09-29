import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Optional: Add your token validation logic here
    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
        navigate('/home', { replace: true });
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
