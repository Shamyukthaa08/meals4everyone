import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import {  handleSuccess } from '../Registration/util';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState('');
  
 const navigate = useNavigate();

 useEffect(() => {
  const storedName = localStorage.getItem("role");
  setRole(storedName);
  
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('role');
    localStorage.removeItem('city');
    handleSuccess('User logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <nav>
      <Link to={role==='user'?'/userboard':'/adminboard'} className="title">
        meals<span style={{color: "#a9cd5c"}}>4</span>everyone
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to={role==='user'?'/orderbag':'/surprisebag'}>{role==='user'?'SURPRISE-BAG':'CREATE'}</NavLink>
        </li>
        <li>
          <NavLink to="/managebags">MANAGE</NavLink>
        </li>
        <li>
          <NavLink to="/">Contact</NavLink>
        </li>
        
        <button className="navbar-btn" onClick={handleLogout}>Logout</button>
        
      </ul>
    </nav>
  );
};