import React from 'react'
import { Link } from 'react-router-dom'
// import { addToCartMiddleware } from '../middlewares/cart';

function Cake(props) {
  return (
    <div className="col-sm-4">
      <div className="product-image-wrapper">
        <div className="single-products">
          <div className="productinfo text-center">
            <div className="img-container">
              <img src={props.cake.image} alt="" />
            </div>
            <h2>₹ {props.cake.price}</h2>
            <p>{props.cake.name}</p>
            <Link className="btn btn-default add-to-cart" to={`/cake/${props.cake.cakeid}`}><i className="fa fa-eye"></i> View Details</Link>
          </div>
          <div className="product-overlay">
            <div className="overlay-content">
              <h2>₹ {props.cake.price}</h2>
              <p>{props.cake.name}</p>
              <Link className="btn btn-default add-to-cart" to={`/cake/${props.cake.cakeid}`}><i className="fa fa-eye"></i> View Details</Link>
            </div>
          </div>
        </div>
        {/* <div className="choose">
          <ul className="nav nav-pills nav-justified">
            <li><a href="#"><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
            <li><a href="#"><i className="fa fa-shopping-cart"></i>Add to cart</a></li>
            <li><span>test</span></li>
          </ul>
        </div> */}
      </div>
    </div>
  )
}

export default Cake