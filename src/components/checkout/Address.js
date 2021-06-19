import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { isEmpty } from "../../lib/validation"

function Address(props) {
  const handleSubmit = (event) => {
    event.preventDefault()
    let isValid = !isEmpty(props.address.fullname.value) && !isEmpty(props.address.phone.value) &&
      !isEmpty(props.address.addressLine.value) && !isEmpty(props.address.city.value) &&
      !isEmpty(props.address.pincode.value)

    props.setAddress({
      fullname: {
        value: props.address.fullname.value,
        error: isEmpty(props.address.fullname.value) ? 'Please enter fullname': null
      },
      phone: {
        value: props.address.phone.value,
        error: isEmpty(props.address.phone.value) ? 'Please enter phone': null
      },
      addressLine: {
        value:props.address.addressLine.value,
        error: isEmpty(props.address.addressLine.value) ? 'Please enter address line': null
      },
      city: {
        value:props.address.city.value,
        error: isEmpty(props.address.city.value) ? 'Please enter city': null
      },
      pincode: {
        value:props.address.pincode.value,
        error: isEmpty(props.address.pincode.value) ? 'Please enter pincode': null
      },
    })

    if (isValid) {
      props.dispatch({type: 'CART_SET_ADDRESS', payload: {
        fullname: props.address.fullname.value,
        phone: props.address.phone.value,
        addressLine: props.address.addressLine.value,
        city: props.address.city.value,
        pincode: props.address.pincode.value
      }})
      props.history.push('/checkout/confirm')
    }
  }

  const validateFullname = (event) => {
    let fullname = event.target.value
    props.setAddress({
      ...props.address,
      fullname: {value:fullname, error: isEmpty(fullname) ? 'Please enter fullname': null}
    })
  }

  const validatePhone = (event) => {
    let phone = event.target.value
    props.setAddress({
      ...props.address,
      phone: {value:phone, error: isEmpty(phone) ? 'Please enter phone': null}
    })
  }

  const validateAddressLine = (event) => {
    let addressLine = event.target.value
    props.setAddress({
      ...props.address,
      addressLine: {value:addressLine, error: isEmpty(addressLine) ? 'Please enter address line': null}
    })
  }

  const validateCity = (event) => {
    let city = event.target.value
    props.setAddress({
      ...props.address,
      city: {value:city, error: isEmpty(city) ? 'Please enter city': null}
    })
  }

  const validatePincode = (event) => {
    let pincode = event.target.value
    props.setAddress({
      ...props.address,
      pincode: {value:pincode, error: isEmpty(pincode) ? 'Please enter pincode': null}
    })
  }

  return (
    <>
      <div className="review-payment">
        <h2>Address</h2>
      </div>
      <div className="shopper-informations">
        <div className="row">
          <div className="col-sm-6">
            <div className="shopper-info">
              <form>
                  <span className="text-danger">{props.address.fullname.error}</span>
                  <input type="email" placeholder="Full name" value={props.address.fullname.value} onChange={validateFullname}/>
                  <br />
                  <span className="text-danger">{props.address.phone.error}</span>
                  <input type="email" placeholder="Phone" value={props.address.phone.value} onChange={validatePhone}/>
                  <br />
                  <span className="text-danger">{props.address.addressLine.error}</span>
                  <input type="email" placeholder="Address" value={props.address.addressLine.value} onChange={validateAddressLine}/>
                  <br />
                  <span className="text-danger">{props.address.city.error}</span>
                  <input type="email" placeholder="City" value={props.address.city.value} onChange={validateCity}/>
                  <br />
                  <span className="text-danger">{props.address.pincode.error}</span>
                  <input type="email" placeholder="Pincode" value={props.address.pincode.value} onChange={validatePincode}/>
                  <br />
                  <Link to="/checkout/summary"><button type="button" className="btn btn-primary">Go back</button></Link>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save & Continue</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default connect(state => {
  return {
    user: state.AuthReducer.user,
    cart: state.CartReducer
  }
})(withRouter(Address))