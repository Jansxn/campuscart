import {Route , Routes} from 'react-router-dom';
import './App.css';

import Login from './components/Login_page/Login';
import Signup from './components/Signup_page/Signup';
import Intro from './components/Intro_page/Intro';
import AddItem from './components/Add_Item/Add_Item';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/additem" element={<AddItem />} />
    </Routes>
  );
}

export default App;
