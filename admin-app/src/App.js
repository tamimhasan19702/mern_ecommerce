import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './containers/Home/Home';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
