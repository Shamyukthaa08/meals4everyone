import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Optional: Add your token validation logic here
    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
        if(role=='user'){
          navigate('/userboard', { replace: true });
        }else if(role=='admin'){
          navigate('/adminboard', { replace: true });
        }
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
