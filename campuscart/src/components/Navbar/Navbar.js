import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <nav className = "nav">
              <input id="menu__toggle" type="checkbox" />
              <label className ="menu__btn" htmlFor="menu__toggle"><span></span></label>
              <span className = "nav-links">
                  <Link to="/" className= "nav-item i1">Home</Link>
                  <div className = "nav-item meet i2">
                    <label htmlFor = "expand-box" className= " meet">Meet</label>
                    <span className = "meet-items">
                      <div className = "meet-item">
                        <a href='https://www.logintohealth.com/' style={{textDecoration:'none' , color:'black'}}>Physchiatrist </a>
                      </div>
                      <div className = "meet-item">
                      <a href='https://www.logintohealth.com/' style={{textDecoration:'none' , color:'black'}}>People</a>
                      </div> 
                    </span>
                  </div>
                  <a className= "nav-item i3" href='https://volunteersindia.org/volunteer-programs-india.htm'>Volunteer</a>
                  <a className = "nav-item i4" href='https://www.mentalup.co/blog/free-brain-games-for-seniors'>Games</a>
                  <a className = "nav-item i4" href = 'https://www.coursera.org/'>Learn</a>
                  <a className="nav-item i5 contact" onClick = {(e) => {
                    localStorage.setItem('userData', JSON.stringify(''));
                  }}>Log Out</a>
              </span>
            </nav>
        </div>
      );
  }
  
  export default Navbar;