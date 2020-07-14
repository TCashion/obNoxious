import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import userService from '../../services/userService';
import NavBar from '../../components/NavBar/NavBar'
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import AddReport from '../../pages/AddReport/AddReport';

class App extends Component {

  state = {
    user: userService.getUser(),
    plants: this.getPlants(),
  }

  getPlants() {
    return [
      // hardcoded for development 
      {commonName: 'kudzu', scientificName: 'Pueraria lobata'},
      {commonName: 'common tumbleweed', scientificName: 'kali tragus'},
      {commonName: 'garlic mustard', scientificName: 'alliaria petiolata'},
      {commonName: 'purple loosestrife', scientificName: 'lythrum salicaria'},
    ]
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
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
              userService.getUser() ?
                <HomePage user={this.state.user}/>
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/signup' render={({ history }) =>
              userService.getUser() ?
                <Redirect to='/' />
                :
                <SignupPage
                  handleSignupOrLogin={this.handleSignupOrLogin}
                  history={history}
                />
            } />
            <Route exact path='/login' render={({ history }) =>
              userService.getUser() ?
                <Redirect to='/' />
                :
                <LoginPage
                  handleSignupOrLogin={this.handleSignupOrLogin}
                  history={history}
                />
            } />
            <Route exact path='/reports/new' render={({ history }) =>
                <AddReport />
            } />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
