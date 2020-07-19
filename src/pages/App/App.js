import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import userService from '../../services/userService';
import plantsService from '../../services/plantsService';
import reportsService from '../../services/reportsService';
import NavBar from '../../components/NavBar/NavBar'
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import EditPasswordPage from '../EditPasswordPage/EditPasswordPage';
import PlantIndexPage from '../PlantIndexPage/PlantIndexPage';
import PlantShowPage from '../PlantShowPage/PlantShowPage';
import AddPlantPage from '../AddPlantPage/AddPlantPage';
import AddReportPage from '../AddReportPage/AddReportPage';
import ReportShowPage from '../ReportShowPage/ReportShowPage';
import ReportIndexPage from '../ReportIndexPage/ReportIndexPage';

class App extends Component {

  state = {
    user: userService.getUser(),
    plants: [],
  }

  getAllPlants = async () => {
    const plants = await plantsService.getPlants();
    this.setState({
      plants
    });
  }

  getOneReport = async (_id) => {
    const report = await reportsService.getOne(_id)
    return report;
  }

  handleAddPlant = async (plant) => {
    await plantsService.createPlant(plant);
  }

  handleAddReport = async (report) => {
    const newReport = await reportsService.createReport(report);
    return newReport;
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  parseDistribution = (plant) => {
    let distribution = plant.distribution.map(contaminatedState => contaminatedState);
    distribution.sort();
    return distribution.join(', ')
  }

  parseTaxonomy = (plant) => {
    let taxonomy = [];
    for (const key in plant.taxonomy) {
      const upperKey = key[0].toUpperCase() + key.substr(1);
      const pairString = `${upperKey}: ${plant.taxonomy[key]}`
      taxonomy.push(pairString)
    };
    return taxonomy.join(' > ');
  }

  componentDidMount = () => {
    this.getAllPlants();
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
                <HomePage user={this.state.user} />
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
            <Route exact path='/password' render={({ history }) =>
              userService.getUser() ?
                <EditPasswordPage
                  history={history}
                  user={this.state.user}
                />
                :
                <Redirect to='/' />
            } />
            <Route exact path='/plants' render={() =>
              userService.getUser() ?
                <PlantIndexPage plants={this.state.plants} />
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/plants/new' render={({ history }) =>
              userService.getUser() ?
                <AddPlantPage
                  handleAddPlant={this.handleAddPlant}
                  history={history}
                  parseDistribution={this.parseDistribution}
                  parseTaxonomy={this.parseDistribution}
                  plants={this.state.plants}
                  user={this.state.user}
                />
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/plants/detail' render={({ history, location }) =>
              userService.getUser() ?
                <PlantShowPage
                  location={location}
                  parseDistribution={this.parseDistribution}
                  parseTaxonomy={this.parseTaxonomy}
                />
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/reports' render={() =>
              userService.getUser() ?
                <ReportIndexPage />
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/reports/new' render={({ history }) =>
              userService.getUser() ?
                <AddReportPage
                  getOneReport={this.getOneReport}
                  handleAddReport={this.handleAddReport}
                  history={history}
                  plants={this.state.plants}
                  user={this.state.user}
                />
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/reports/detail' render={({ history, location }) =>
              userService.getUser() ?
                <ReportShowPage
                  location={location}
                />
                :
                <Redirect to='/login' />
            } />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
