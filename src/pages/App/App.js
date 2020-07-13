import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact path='/' render={() => 
              <HomePage />
            } />
            <Route exact path='/signup' render={() => 
              <SignupPage />
            } />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
