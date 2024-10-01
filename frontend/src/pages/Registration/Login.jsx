import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';  // Importing Axios
import './Registration.css';
import { handleError, handleSuccess } from "./util";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
      const { name, value } = e.target;
      const copyLoginInfo = { ...loginInfo };
      copyLoginInfo[name] = value;
      setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) => {
      e.preventDefault();
      const { email, password } = loginInfo;
      if (!email || !password) {
          return handleError('Email and password are required');
      }
      try {
          const url = `http://localhost:8080/auth/login`;
          const response = await axios.post(url, loginInfo, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          const { success, message, jwtToken, name, role} = response.data;

          if (success) {
              handleSuccess(message);
              localStorage.setItem('token', jwtToken);
              localStorage.setItem('loggedInUser', name);
              localStorage.setItem('role', role);
              setTimeout(() => {
                  navigate('/home');
              }, 1000);
          } else {
              handleError(message);
          }
      } catch (err) {
          if (err.response && err.response.data) {
              // Handle specific error messages from the server
              const errorMessage = err.response.data.error?.details[0]?.message || 'An error occurred';
              handleError(errorMessage);
          } else {
              handleError(err.message || 'An unexpected error occurred');
          }
      }
  }

  return (
    <div className="container">
      <div className="registration-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="registration-div">
            <label htmlFor="email">Email</label>
            <input
              className='input-field'
              onChange={handleChange}
              type='email'
              name='email'
              autoFocus
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
          
          <button className="btn" type='submit'>Login</button>
          <span>Dont have an account? <Link to="/signup">Signup</Link></span>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login;
