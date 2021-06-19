import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router"
import { getCake } from "../apis/Api";
import { addToCartMiddleware } from "../middlewares/cart";
import { Link } from "react-router-dom";
import Loader from './Loader';

function CakeDetails(props) {
  let { cakeid } = useParams();
  let [cake, setCake] = useState(null);

  useEffect(() => {
    getCake(cakeid).then(
      (response) => setCake(response.data),
    )
  }, [cakeid]);

  let addCakeToCart = () => {
    if (props.user) {
      props.dispatch(addToCartMiddleware({
        cakeid: cake.cakeid,
        name: cake.name,
        image: cake.image,
        weight: cake.weight,
        price: cake.price
      }));
    } else {
      props.history.push('/login');
    }
  }

  return (
    <section>
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cakes">Shop</Link></li>
            <li className="active">Cake Details</li>
          </ol>
        </div>
        {!cake && <Loader text="loading..." />}
        {
          cake &&
          <div className="row">
            <div className="col-sm-9 padding-right">
              <div className="product-details">
                <div className="col-sm-5">
                  <div className="view-product">
                    <img src={cake.image} alt="..." />
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="product-information">
                    <img src="/images/product-details/new.jpg" className="newarrival" alt="" />
                    <h2>{cake.name}</h2>
                    <p>{cake.description}</p>
                    <span>
                      <span>₹ {cake.price}</span>
                      <label>Weight: {cake.weight} Kg</label>
                    </span>
                    <p><b>Flavour:</b> {cake.flavour}</p>
                    <p><b>Eggless:</b> {cake.eggless ? 'Yes' : 'No'}</p>
                    <p><b>Ingredients:</b> {cake.ingredients.join(", ")}</p>
                    <div>
                      <button type="button" className="btn btn-fefault cart" style={{ marginLeft: 'unset' }} onClick={addCakeToCart}>
                        <i className="fa fa-shopping-cart"></i> Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  )
}

export default connect((state) => {
  return {
    user: state.AuthReducer.user
  }
})(CakeDetails)