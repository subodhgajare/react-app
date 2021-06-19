import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, withRouter } from "react-router-dom";
import Summary from "./checkout/Summary";
import Address from "./checkout/Address";
import Confirm from "./checkout/Confirm";

function Checkout(props) {
  let { path } = useRouteMatch();

  useEffect(() => {
    console.log(props.cart.newOrder);
    if (props.cart.newOrder) {
      props.history.push('/orders');
      return
    }

    if (!props.cart?.items.length) {
      props.dispatch({type: 'CART_IS_EMPTY'})
      props.history.push('/')
    }
  }, [props.cart.newOrder?.orderid, props.cart?.items.length])

  let [address, setAddress] = useState({
    fullname: {value: props.cart.address?.fullname || props.user?.name, error: null},
    phone: {value: props.cart.address?.phone || '', error: null},
    addressLine: {value: props.cart.address?.addressLine || '', error: null},
    city: {value: props.cart.address?.city || '', error: null},
    pincode: {value: props.cart.address?.pincode || '', error: null},
  })

  return(
    <section id="cart_items">
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li className="active">Checkout</li>
          </ol>
        </div>

        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <Link to={`${path}/summary`} className="nav-link active">Summery</Link>
          </li>
          <li className="nav-item">
            <Link to={`${path}/address`} className="nav-link">Address</Link>
          </li>
          <li className="nav-item">
            <Link to={`${path}/confirm`} className="nav-link">Confirm</Link>
          </li>
        </ul>

        <Route exact path={`${path}/summary`}><Summary /></Route>
        <Route exact path={`${path}/address`}><Address address={address} setAddress={setAddress}/></Route>
        <Route exact path={`${path}/confirm`}><Confirm /></Route>
        <div className="payment-options"></div>
      </div>
    </section>
  )
}

export default connect(state => {
  return {
    cart: {...state.CartReducer},
    user: state.AuthReducer.user
  }
})(withRouter(Checkout))