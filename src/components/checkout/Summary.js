import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Summary(props) {
  return(
    <>
      <div className="review-payment">
        <h2>Summery</h2>
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
            </tr>
          </thead>
          <tbody>
            {props.cart.items.map((item, index) =>
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
                  <span className="cart_quantity_input">{item.quantity}</span>
                </td>
                <td className="cart_total">
                  <p className="cart_total_price">${item.price}</p>
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="3">&nbsp;</td>
              <td colSpan="2">
                <table className="table table-condensed total-result">
                  <tbody>
                    <tr>
                      <td>Cart Sub Total</td>
                      <td>${props.cart.totalPrice}</td>
                    </tr>
                    <tr className="shipping-cost">
                      <td>Shipping Cost</td>
                      <td>{props.cart.shippingPrice > 0 ? "$" + props.cart.shippingPrice : 'Free' }</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td><span>${props.cart.totalPrice + props.cart.shippingPrice}</span></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="5" className="text-right">
                <Link to="/checkout/address"><button className="btn btn-primary m-5">Next</button></Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default connect(state => {
  return {
    cart: {...state.CartReducer}
  }
})(Summary)