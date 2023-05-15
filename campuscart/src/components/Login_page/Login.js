import React, { useState } from 'react';
// import connection from '../backend/db.js';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppState } from '../user_data';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const {userData, setUserData} = React.useContext(AppState);

  const handleSubmit = async event => {
    event.preventDefault();
    await axios.post('http://127.0.0.1:5000/login', { email, password })
      .then(response => {
        setUserData(response.data);
        setMessage(response.data.userid);
        console.log(userData)
        localStorage.setItem('userData', JSON.stringify(response.data));
      })
      .catch(error => {
        setError(error);
      });
  }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   connection.query(
  //     `SELECT * FROM Users WHERE Email = '${email}' AND Password = '${password}'`,
  //     (error, results, fields) => {
  //       if (error) throw error;
  //       console.log(results);
  //     }
  //   );
  // };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <div className="head">
          <b>Login</b>
        </div>

        <label htmlFor="email" className="inholder">
          <input type="text" id="email" className="in email" required  value={email} onChange={(e) => setEmail(e.target.value)} name='email'/>
          <div className="label">Email</div>
        </label>

        <label htmlFor="password" className="inholder">
          <input type="password" id="password" className="in pass" value={password} onChange={(e) => setPassword(e.target.value)} required name='password'/>
          <div className="label">Password</div>
        </label>

        <button type="submit" className="submit">
          Login
        </button>

        <div className="signup">
          Don't have an account?{' '}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;