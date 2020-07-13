import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from '../../components/NavBar/NavBar'
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import userService from '../../services/userService';

class App extends Component {

  state = {
    user: userService.getUser()
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  render() {
    return (
      <div className="App">
        <main>
          <NavBar 
            handleLogout={this.handleLogout}
            handleSignupOrLogin={this.handleSignupOrLogin}
            user={this.state.user}
          />
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
