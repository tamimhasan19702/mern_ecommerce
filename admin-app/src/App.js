import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/Home/Home';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';
import Test from './containers/test/Test';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/test" component={Test} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
