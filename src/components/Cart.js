import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCartMiddleware, removeItemFromCartMiddleware, removeOneQtyItemFromCartMiddleware } from "../middlewares/cart";
import Loader from "./Loader";

function Cart(props) {
  let addCake = (item, e) => {
    props.dispatch(addToCartMiddleware({
      cakeid: item.cakeid,
      name: item.name,
      image: item.image,
      weight: item.weight,
      price: item.price
    }))
  }

  let minusCake = (item) => {
    props.dispatch(removeOneQtyItemFromCartMiddleware(item.cakeid));
  }

  let removeCartItem = (item) => {
    props.dispatch(removeItemFromCartMiddleware(item.cakeid));
  }

  if (!props.cart?.items) {
    return <Loader text="Loading..."></Loader>
  }

  return (
    <>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li><Link to="/home">Home</Link></li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image" width="15%">Item</td>
                  <td className="description"></td>
                  <td>Weight</td>
                  <td className="quantity">Quantity</td>
                  <td className="price">Price</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {
                  props.cart?.items?.length !== 0 && props.cart?.items.map((item, index) =>
                    <tr key={index}>
                      <td className="cart_product">
                        <Link to={`/cake/${item.cakeid}`}><img src={item.image} alt="" style={{ width:'100px' }} /></Link>
                      </td>
                      <td className="cart_description">
                        <h4><Link to={`/cake/${item.cakeid}`}>{item.name}</Link></h4>
                        <p>{item.description}</p>
                      </td>
                      <td className="cart_price">
                        <p>{item.weight} kg</p>
                      </td>
                      <td className="cart_quantity">
                        <div className="cart_quantity_button">
                          <a className="cart_quantity_up" href={"#addCake"} onClick={addCake.bind(this, item)}> + </a>
                          <input className="cart_quantity_input" type="text" name="quantity" value={item.quantity} autoComplete="off" size="2" readOnly={true} />
                          <a className="cart_quantity_down" href="#removeCake" onClick={minusCake.bind(this, item)}> - </a>
                        </div>
                      </td>
                      <td className="cart_price">
                        <p>₹ {item.price}</p>
                      </td>
                      <td className="cart_delete">
                        <button className="cart_quantity_delete" onClick={removeCartItem.bind(this, item)}><i className="fa fa-times"></i></button>
                      </td>
                    </tr>
                  )
                }
                {
                  props.cart?.items?.length === 0 &&
                  <tr>
                    <td colSpan="7"><div className="alert alert-danger">Cart is Empty</div></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="do_action">
        <div className="container">
          {/* <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
          </div> */}
          <div className="row">
            <div className="col-sm-6">
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>Cart Sub Total <span>{props.cart?.totalPrice}</span></li>
                  <li>Shipping Cost <span>{props.cart?.shippingPrice === 0 ? 'Free' : '' + props.cart?.shippingPrice}</span></li>
                  <li>Total <span>{props.cart?.totalPrice + props.cart?.shippingPrice}</span></li>
                </ul>
                <Link className="btn btn-default check_out" to="/checkout/summary" >Check Out</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default connect(state => {
  return {
    user: state.AuthReducer.user,
    cart: state.CartReducer,
  }
})(Cart)