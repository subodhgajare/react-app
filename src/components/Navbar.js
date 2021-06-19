import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

function Navbar(props) {
  let currentPath = window.location.pathname;
  let [searchText, setSearchText] = useState('');

  let getSearchText = (event) => {
    setSearchText(event.target.value);
  }

  let search = (e) => {
    if (e.key === 'Enter' && searchText !== "") {
      props.history.push('/search?q=' + searchText);
    }
  }

  let logout = () => {
    props.dispatch({
      type: "LOGOUT"
    })
    props.history.push('/');
  }

  return (
    <header id="header">
      <div className="header-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="logo pull-left">
                <Link to="/"><img src="/images/home/logo.png" alt="" /></Link>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="shop-menu pull-right">
                <ul className="nav navbar-nav">
                  {props.user && <li><a href="#Welcome">Welcome {props.user.name}</a></li>}
                  {props.user && <li><Link to="/orders" className={currentPath.includes("/orders") ? 'active' : ''}><i className="fa fa-list"></i>My Orders</Link></li>}
                  {/* <li><a href="#user"><i className="fa fa-user"></i> Account</a></li> */}
                  {props.user && <li><Link to='/cart' className={currentPath.includes("/cart") ? 'active' : ''}><i className="fa fa-shopping-cart"></i> Cart {props.cartItems?.length > 0 && <span className="badge badge-primary">{props.cartItems.length}</span>}</Link></li>}
                  {props.user && props.cartItems?.length > 0 && <li><Link to='/checkout/summary' className={currentPath.includes("/checkout") ? 'active' : ''}><i className="fa fa-crosshairs"></i> Checkout</Link></li>}
                  {props.user && props.adminUsers.indexOf(props.user?.email) !== -1 && <li><Link to="/admin/cake/add"><i className="fa fa-plus-circle"></i>Add New Cake</Link></li>}
                  {!props.user && <><li><Link to='/login' className={currentPath.includes("/login") ? 'active' : ''}><i className="fa fa-lock"></i> Login</Link></li><li><Link to='/register' className={currentPath.includes("/register") ? 'active' : ''}>Register</Link></li></>}
                  {props.user && <li><a href="#logout" onClick={logout}><i className="fa fa-unlock"></i> Logout</a></li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="mainmenu pull-left">
                <ul className="nav navbar-nav collapse navbar-collapse">
                  <li><Link to="/home" className={currentPath === '/' || currentPath.includes("/home")  ? 'active' : ''}>{props.details.projectName}</Link></li>
                  <li><Link to="/cakes" className={currentPath.includes("/cake") ? 'active' : ''}>Shop</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="search_box pull-right">
                <input type="text" placeholder="Search" onChange={getSearchText} onKeyDown={search} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default connect((state) => {
  return {
    user: state.AuthReducer.user,
    cartItems: state.CartReducer.items
  }
})(withRouter(Navbar));