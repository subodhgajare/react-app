import React, { useEffect } from 'react';
import Navbar from './components/Navbar'
import Register from "./components/Register";
import CakeList from './components/CakeList';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';
import CakeDetails from './components/CakeDetails';
import Search from './components/Search';
import { connect } from 'react-redux';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AddCake from './components/cake/AddCake';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import { getCartMiddleware } from './middlewares/cart';

function App(props) {
  const { user, dispatch } = props;
  let adminUsers = ['ashu.lekhi0540@gmail.com', 'subodh.gajare@gmail.com']
  useEffect(() => {
    if (user) {
      dispatch(getCartMiddleware());
    }
  }, [user, dispatch])

  let details = {
    projectName: 'Cake Shop',
  }

  return (
    <Router>
      <Navbar details={details} adminUsers={adminUsers} />
      <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/search" component={Search}></Route>
          <Route exact path="/cakes" component={CakeList}></Route>
          <Route exact path="/cake/:cakeid" component={CakeDetails} />
          {props.user && <Route exact path="/cart"><Cart /></Route>}
          {props.user && props.cart?.items.length > 0 && <Route path="/checkout"><Checkout /></Route>}
          {props.user && <Route path="/orders"><Orders /></Route>}
          {props.user?.email && adminUsers.indexOf(props.user?.email) !== -1 && <Route exact path="/admin/cake/add">{!props.user?.token && !localStorage.token ? <Redirect to="/" /> : <AddCake />}</Route>}
          <Route path="/*" component={PageNotFound} />
      </Switch>
      <Footer details={details} />
    </Router>
  );
}

export default connect(state => {
  return {
    user: state.AuthReducer.user,
    cart: state.CartReducer,
  }
})(App);
