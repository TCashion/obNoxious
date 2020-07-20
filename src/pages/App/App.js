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
    plants: [],
    user: userService.getUser(),
  }

  getAllPlants = async () => {
    const plants = await plantsService.getPlants();
    this.setState({
      plants
    });
  }

  getAllReports = async () => {
    const reports = await reportsService.getReports();
    return reports;
  }

  getOneReport = async (_id) => {
    const report = await reportsService.getOne(_id)
    return report;
  }

  getTodaysDate = () => {
    const today = new Date();
    return this.parseDate(today);
  }

  handleAddPlant = async (plant) => {
    await plantsService.createPlant(plant);
  }

  handleAddReport = async (report) => {
    const newReport = await reportsService.createReport(report);
    return newReport;
  }

  handleDeleteReport = async (report) => {
    await reportsService.deleteReport(report);
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  parseDate(date) {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    const dd = date.getDate();
    return `${yyyy}-${mm}-${dd}`
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

  sortByDateAscending = (a, b) => {
    const firstDate = new Date(a.date);
    const secondDate = new Date(b.date);
    return firstDate - secondDate;
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
                <ReportIndexPage 
                  getAllReports={this.getAllReports}
                  sortByDateAscending={this.sortByDateAscending}
                  parseDate={this.parseDate}
                />
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/reports/new' render={({ history }) =>
              userService.getUser() ?
                <AddReportPage
                  getOneReport={this.getOneReport}
                  getTodaysDate={this.getTodaysDate}
                  handleAddReport={this.handleAddReport}
                  history={history}
                  parseDate={this.parseDate}
                  plants={this.state.plants}
                  user={this.state.user}
                />
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/reports/detail' render={({ history, location }) =>
              userService.getUser() ?
                <ReportShowPage
                  getTodaysDate={this.getTodaysDate}
                  handleDeleteReport={this.handleDeleteReport}
                  history={history}
                  location={location}
                  parseDate={this.parseDate}
                  sortByDateAscending={this.sortByDateAscending}
                  user={this.state.user}
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
