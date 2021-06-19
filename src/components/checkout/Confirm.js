import { useEffect } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { placeOrderMiddleware } from "../../middlewares/cart"

function Confirm(props) {
  useEffect(() => {
    if (!props.cart.address) {
      props.history.push('/checkout/address')
    }
  }, [])

  const placeOrder = (event) => {
    event.preventDefault()
    if (window.confirm('Are you sure, you want to place order?')) {
      props.dispatch(placeOrderMiddleware(props.cart, props.cart.address))
    }
  }

  return (
    <>
      <div className="review-payment">
        <h2>Confirm</h2>
      </div>
      <div className="shopper-informations">
        <div className="row">
          <div className="col-sm-6">
            <div className="shopper-info">
              <div className="col">
                <h6>Shipping Address:</h6>
                <div>Name: {props.cart.address?.fullname}</div>
                <div>Phone: {props.cart.address?.phone}</div>
                <div>{props.cart.address?.addressLine}, {props.cart.address?.city}, {props.cart.address?.pincode}</div>
              </div>
              <hr />
              <div className="col">
                <h6>Delivery: </h6>Cash On delivery
              </div>
              <hr />
              <div>
                <br />
                <Link to="/checkout/address"><button type="button" className="btn btn-primary">Go back</button></Link>
                <button onClick={placeOrder} className="btn btn-primary">Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default connect(state => {
  return {
    cart: state.CartReducer
  }
})(withRouter(Confirm))