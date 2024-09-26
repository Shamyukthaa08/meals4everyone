import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './Registration.css';
import { handleError } from "./util";

function Signup() {

  const [signupInfo, setSignupInfo] = useState({
    name:'',
    email:'',
    password:''
  })
  
  const handleChange = (e) =>{
    
    const {name, value} = e.target;
    console.log(name,value);
    const copyLoginInfo = {...signupInfo};
    copyLoginInfo[name] = value;
    setSignupInfo(copyLoginInfo);

  }

    const handleSignup = (e) =>{
      e.preventDefault();
      const {name, email,password} = signupInfo;
      if(!name || !email || !password){
        return handleError('Fill out all the fields')
      }

    }

  return (
    <div className="container">
    <div className="registration-container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>

        <div className="registration-div">
          <label htmlFor="name">Name</label>
          <input className='input-field' onChange={handleChange}
          type='text' name='name' autoFocus placeholder="Enter your name"/>
        </div>

        <div className="registration-div">
          <label htmlFor="Email">Email</label>
          <input className='input-field' onChange={handleChange}
          type='email' name='email' autoFocus placeholder="Enter your email"/>
        </div>

        <div className="registration-div">
          <label htmlFor="password">Password</label>
          <input className='input-field' onChange={handleChange}
          type='password' name='password' autoFocus placeholder="Enter password"/>
        </div>

        {/* <div className="registration-div">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input className='input-field' onChange={handleChange}
          type='password' name='confirmpassword' autoFocus placeholder="Re-enter password"/>
        </div> */}
        
        <button className="btn" type='submit'>Signup</button>
        <span>Already have an account?
        <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
    </div>
  )
}

export default Signup;