
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './Containers/HomePage';
import ProductListPage from './Containers/ProductListPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/:slug" component={ProductListPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
