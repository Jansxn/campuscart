import { useState } from 'react';
import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [type, setType] = useState('Buyer');

  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSelectChange = (event) => setType(event.target.value);


  const handleSubmit = async event => {
    event.preventDefault();
    await axios.post('http://127.0.0.1:5000/signup', { first_name, last_name, email, password, address, type })
      .then(response => {
        setMessage(response.data['message']);
        console.log(message)
      })
      .catch(error => {
        setError(error);
        console.log(error)
      });
  }

  return (
    <div className='signup'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='head'><b>Sign Up</b></div>
        <div className='name'>
          <label htmlFor='fname' className='inholder'>
            <input type='text' id='fname' className='in fname' required  onChange={handleFirstNameChange} name='first_name'/>
            <div className='label'>First Name</div>
          </label>
          <label htmlFor='lname' className='inholder'>
            <input type='text' id='lname' className='in lname' required onChange={handleLastNameChange} name='last_name'/>
            <div className='label'>Last Name</div>
          </label>
        </div>

        <label htmlFor='email' className='inholder'>
          <input type='text' id='email' className='in email' required  onChange={handleEmailChange} name='email'/>
          <div className='label'>Email</div>
        </label>

        <label htmlFor='address' className='inholder'>
          <input type='text' id='address' className='in address' required onChange={handleAddressChange} name = 'address'/>
          <div className='label'>Address</div>
        </label>

        <div className='opt'>
        <label htmlFor='password' className='inholder'>
          <input type='password' id='password' className='in pass' required onChange={handlePasswordChange} name = 'password' />
          <div className='label'>Password</div>
        </label>

        <select required className='sel' name = 'type' onChange={handleSelectChange}>
          <option value = "Buyer">Buyer</option>
          <option value = "Seller">Seller</option>
        </select>
        </div>

        <button type='submit' className='submit'>Create Account</button>

        <div className='login'>
          Already have an account? <Link to='/login' className='link'>Log In</Link>
        </div>

      </form>
    </div>
  )
}

export default Signup;
