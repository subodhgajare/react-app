import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isValidEmail: '',
      emailFeedback: '',
    }
  }

  handleChangeEmail = (event) => {
    this.validateEmail(event.target.value)
    this.setState({
      email: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.validateEmail(this.state.email)
  }

  validateEmail = (email) => {
    let isValid = false;

    if (email === "") {
      this.setState({
        isValidEmail: 'invalid',
        emailFeedback: 'Email address is required.',
      });
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = re.test(String(email).toLowerCase())
      if (isValid) {
        this.setState({
          isValidEmail: 'valid',
          emailFeedback: 'Looks Good!',
        })
      } else {
        this.setState({
          isValidEmail: 'invalid',
          emailFeedback: 'Please enter valid email.',
        })
      }
    }

    return isValid;
  }

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col col-lg-4  ">
          <div className="panel">
            <h4 className="panel-title text-center">
              Sign Up Form
            </h4>
            <div className="panel-body">
              <form onSubmit={this.handleSubmit}>
                <div id="email" className="form-group mb-3">
                  <label>Email address</label>
                  <input type="text" className={`form-control is-${this.state.isValidEmail}`} value={this.state.email.value} onChange={this.handleChangeEmail} />
                  <div className={`${this.state.isValidEmail}-feedback`}>{this.state.emailFeedback}</div>
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input type="password" className="form-control" />
                </div>
                <div className="form-group mb-3">
                  <label>Confirm Password</label>
                  <input type="password" className="form-control" />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp