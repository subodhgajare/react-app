import React from 'react';
import Navbar from './components/Navbar'
import SignUp from "./components/SignUp";
import CakeList from './components/CakeList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import SignIn from './components/SignIn';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem('user'))
    }
  }

  details = {
    projectName: 'React Cake Shop',
  }

  setUser = (user) => {
    this.setState({user: user});
  }

  render() {
    return (
      <Router>
        <Navbar details={this.details} user={this.state.user} setUser={this.setUser} />
        <Switch>
            <Route exact path="/"> <Home /> </Route>
            <Route exact path="/home"> <Home /> </Route>
            <Route exact path="/sign-in" component={(props) => <SignIn {...props} user={this.state.user} setUser={this.setUser} />} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/cakes" component={CakeList} />
            <Route path="/*" component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
