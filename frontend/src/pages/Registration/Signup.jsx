import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';  // Importing Axios
import './Registration.css';
import { handleError, handleSuccess } from "./util";

function Signup() {
  const [selectRole, setSelectRole] = useState('');
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    city:'',
    email: '',
    password: '',
    role: ''
  });
  const [confirmPass, setConfirmPass] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }

  const handleRoleSelect = (role) => {
    setSelectRole(role);
    setSignupInfo(prevInfo => ({ ...prevInfo, role })); // Update the role in signupInfo
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, city, email, password, role } = signupInfo;
    if (!name || !city || !email || !password || !role) {
      return handleError('Name, email, password, and role are required');
    }
    if (confirmPass !== password) {
      return handleError('The passwords don\'t match. Try again!');
    }
    if (password.length < 6) {
      return handleError('Password should be at least 6 characters long.');
    }
    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await axios.post(url, signupInfo, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { success, message, error } = response.data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.error?.details[0]?.message || 'An unexpected error occurred';
        handleError(errorMessage);
      } else {
        handleError(err.message || 'An unexpected error occurred');
      }
    }
  }

  return (
    <div className="container">
      <div className="registration-container">
        <h1 className="registration-title">Signup</h1>
        <form onSubmit={handleSignup}>
          <div className="registration-div choice">
            <button
              type="button"
              className={`role-btn1 ${selectRole === 'admin' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('admin')}
            >
              Business
            </button>
            <button
              type="button"
              className={`role-btn2 ${selectRole === 'user' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('user')}
            >
              Buyer
            </button>
          </div>
          <div className="registration-div">
            <label htmlFor="name">Name</label>
            <input
              className='input-field'
              onChange={handleChange}
              type='text'
              name='name'
              autoFocus
              placeholder="Enter your name"
            />
          </div>
          <div className="registration-div">
            <label htmlFor="city">City</label>
            <input
              className='input-field'
              onChange={handleChange}
              type='text'
              name='city'
              autoFocus
              placeholder="Enter city"
            />
          </div>

          <div className="registration-div">
            <label htmlFor="email">Email</label>
            <input
              className='input-field'
              onChange={handleChange}
              type='email'
              name='email'
              placeholder="Enter your email"
            />
          </div>

          <div className="registration-div">
            <label htmlFor="password">Password</label>
            <input
              className='input-field'
              onChange={handleChange}
              type='password'
              name='password'
              placeholder="Enter password"
            />
          </div>

          <div className="registration-div">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className='input-field'
              onChange={(e) => setConfirmPass(e.target.value)}
              type='password'
              name='confirmpassword'
              placeholder="Re-enter password"
            />
          </div>
          
          <button className="btn" type='submit'>Signup</button>
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Signup;
