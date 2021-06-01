import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: {value: '', isValid: '', feedback: ''},
      role: {value: '', isValid: '', feedback: ''},
      email: {value: '', isValid: '', feedback: ''},
    }
  }

  handleChangeFullName = (event) => {
    this.setState({
      fullName: {value: event.target.value, isValid: '', feedback: ''}
    });
    this.validateFullName(event.target.value);
  }

  handleChangeRole = (event) => {
    this.setState({
      role: {value: event.target.value, isValid: '', feedback: ''}
    });
    this.validateRole(event.target.value);
  }

  handleChangeEmail = (event) => {
    this.setState({
      email: {value: event.target.value, isValid: '', feedback: ''}
    });
    this.validateEmail(event.target.value);
  }

  validateFullName = (fullName) => {
    if (fullName === "") {
      this.setState({
        fullName: {
          value: fullName,
          isValid: 'invalid',
          feedback: 'Full Name is required.',
        }
      })
    } else {
      this.setState({
        fullName: {
          value: fullName,
          isValid: 'valid',
          feedback: 'Looks Good!',
        }
      })
    }
  }

  validateRole = (role) => {
    if (role === "") {
      this.setState({
        role: {
          value: role,
          isValid: 'invalid',
          feedback: 'Role is required.',
        }
      })
    } else {
      this.setState({
        role: {
          value: role,
          isValid: 'valid',
          feedback: 'Looks Good!',
        }
      })
    }
  }

  validateEmail = (email) => {
    let isValid = false;

    if (email === "") {
      this.setState({
        email: {
          value: email,
          isValid: 'invalid',
          feedback: 'Email address is required.',
        }
      });
    } else {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = re.test(String(email).toLowerCase())
      if (isValid) {
        this.setState({
          email: {
            value: email,
            isValid: 'valid',
            feedback: 'Looks Good!',
          }
        })
      } else {
        this.setState({
          email: {
            value: email,
            isValid: 'invalid',
            feedback: 'Please enter valid email.',
          }
        })
      }
    }

    return isValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.validateForm();
  }

  validateForm = () => {
    this.validateFullName(this.state.fullName.value);
    this.validateRole(this.state.role.value);
    this.validateEmail(this.state.email.value);
  }

  render() {
    return (
      <div className="row justify-content-md-center mt-3">
        <div className="col col-lg-4  ">
          <div className="card card-info">
            <div className="card-header">
              <h4 className="card-title text-center">
                Sign Up Form
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group mb-3">
                  <label>Full Name</label>
                  <input type="text" className={`form-control is-${this.state.fullName.isValid}`} name="fullName" value={this.state.fullName.value}  onChange={this.handleChangeFullName} />
                  <div className={`${this.state.fullName.isValid}-feedback`}>{this.state.fullName.feedback}</div>
                </div>
                <div className="form-group mb-3">
                  <label>Role</label>
                  <input type="text" className={`form-control is-${this.state.role.isValid}`} name="role" value={this.state.role.value}  onChange={this.handleChangeRole} />
                  <div className={`${this.state.role.isValid}-feedback`}>{this.state.role.feedback}</div>
                </div>
                <div id="email" className="form-group mb-3">
                  <label>Email address</label>
                  <input type="text" className={`form-control is-${this.state.email.isValid}`} value={this.state.email.value} onChange={this.handleChangeEmail} />
                  <div className={`${this.state.email.isValid}-feedback`}>{this.state.email.feedback}</div>
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input type="password" className="form-control" name="password" />
                </div>
                <div className="form-group mb-3">
                  <label>Confirm Password</label>
                  <input type="password" className="form-control" name="confPassword" />
                </div>
                <br />
                <button type="submit" className="btn btn-block btn-primary" onClick={this.handleSubmit}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp