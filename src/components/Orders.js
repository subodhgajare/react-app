import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../apis/Api";
import Loader from './Loader';

function Orders(props) {
  let [orders, setOrders] = useState();

  useEffect(() => {
    getOrders().then(response => {
      setOrders(response.cakeorders)
    })
  }, [])

  if (!orders) {
    return <Loader text="Please wait loading cake orders" />
  }

  return (
    <section id="orders">
            <div className="container">
              <div className="breadcrumbs">
                <ol className="breadcrumb">
                  <li><Link to="/home">Home</Link></li>
                  <li className="active">Orders</li>
                </ol>
              </div>
              <h2 className="title text-center">My orders</h2>
              <div className="panel-group" id="accordion">
                {orders.length === 0 ? <h5>No order found</h5> : orders.map((order, index) => {
                  return (
                    <div className="panel panel-default" key={index}>
                      <div className="panel-heading" id={"heading-" + index}>
                        <h4 className="panel-title">
                          <a data-toggle="collapse" data-parent="#accordion" href={`#collapse-${index}`}>Order #{order.orderid}</a>
                        </h4>
                      </div>
                      <div id={`collapse-${index}`} className={`panel-collapse ${index === 0 ? 'in' : 'collapse'}`}>
                        <div className="panel-body">
                          <div className="row">
                            <div className="col-md-6">
                              <b>Order Information</b>
                              <div>Price: &#x20B9; {order.price}</div>
                              <div>Payment mode: {order.mode}</div>
                              <div>Status: {order.pending ? 'Pending' : 'Completed'}</div>
                              <div>Purchased on: {order.orderdate}</div>
                            </div>
                            <div className="col-md-6">
                              <b>Shipping Address:</b>
                              <div>{order.name}</div>
                              <div>Phone: {order.phone}</div>
                              <div>{order.address}, {order.city}, {order.pincode}</div>
                            </div>
                          </div>
                          <hr style={{ margin: '0' }} />
                          <div className="col-md-12">
                            <div className="title">
                              <div className="row">
                                <div className="col-md-12">
                                  <h6><b>Items</b></h6>
                                </div>
                              </div>
                            </div>
                            {order.cakes.map((item, index) => {
                              let className = index % 2 ? "row" : "row border-top border-bottom"
                              if (order.cakes.length === index + 1 && index % 2 !== 0) {
                                className = "row border-bottom"
                              }
                              return <div className={className} key={index}>
                                <div className="row main align-items-center">
                                  <div className="col-md-4"><img className="" src={item.image} alt="" width="60" height="60" /></div>
                                  <div className="col-md-4">
                                    <div className="row">{item.name}</div>
                                  </div>
                                  <div className="col-md-4">Qty: <span className="btn btn-sm border ml-2 mr-2 qty">{item.quantity}</span></div>
                                  <div className="col-md-4">&#x20B9; {item.price}</div>
                                </div>
                              </div>
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
    </section>
          )
}

          export default connect()(Orders)