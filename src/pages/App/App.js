import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <main>
        <Switch>
          <Route exact path='/' render={() => 
            <HomePage />
          } />
        </Switch>
      </main>
    </div>
  );
}

export default App;
