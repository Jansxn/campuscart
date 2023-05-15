import React, {useState} from 'react';
import './Intro.css';
import { Link, useNavigate, Redirect } from 'react-router-dom';
import Navbar from "../Navbar/Navbar"
import CardContainer from './Cards';
import { AppState } from '../user_data';
import axios from 'axios';


function Intro(){
    const {userData, setUserData} = React.useContext(AppState)
    var ud = JSON.parse(localStorage.getItem('userData'))
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [cards, setCards] = useState([])

    const handleSubmit = async event => {
        event.preventDefault();
        await axios.post('http://127.0.0.1:5000/search_by_name', { search })
          .then(response => {
            setCards(response.data);
            console.log(response.data)
          })
          .catch(error => {
            setError(error);
            console.log (search)
          });
      }

    if ((ud['userid'] === '') || (ud['userid'] == null)) {
        return (<div className = 'intro-nl'>
            Welcome to CampusCart
            <Link to="/login" className="goto">
        Log In
      </Link>
      <Link to="/signup" className="goto">
        Sign Up
      </Link>
        </div>);
    }

    return (
        <div className="intro">
            <button className="logout" onClick = {(e) => {
                    localStorage.setItem('userData', JSON.stringify(''));
                    window.location.reload();
                  }}>Log out</button>
            <Link to="/additem">
                    <button className="additem">Profile</button>
                </Link>
            <div className='intro-container'>
            <div className="intro-content"> What will you be buying today? </div>
            <div class="wrap">
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="What are you looking for?" name = 'search' onChange={(e) => setSearch(e.target.value)}/>
                    <button type="submit" class="searchButton" onClick={handleSubmit}>
                        <i class="fa fa-search"></i>
                    </button>
                </div>

            
            </div>
            <CardContainer cards={cards} />
            </div>
        </div>
    )
}

export default Intro;