import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {value: '', isValid: '', feedback: ''},
      email: {value: '', isValid: '', feedback: ''},
      password: {value: '', isValid: '', feedback: ''},
      confPassword: {value: '', isValid: '', feedback: ''},
    }
  }

  handleChangeName = (event) => {
    this.validateName(event.target.value);
  }

  handleChangeEmail = (event) => {
    this.validateEmail(event.target.value);
  }

  handleChangePassword = (event) => {
    this.validatePassword(event.target.value);
  }

  handleChangeConfPassword = (event) => {
    this.validateConfPassword(event.target.value);
  }

  validateName = (val) => {
    let name = {
      value: val,
      isValid: 'valid',
      feedback: 'Looks Good!',
    };

    if (val === "") {
      name.isValid = 'invalid';
      name.feedback = 'Name is required.';
    }

    this.setState({name: name});

    return name.isValid === 'valid';
  }

  validateEmail = (val) => {
    let email = {
      value: val,
      isValid: 'valid',
      feedback: 'Looks Good!',
    };

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "") {
      email.isValid = 'invalid';
      email.feedback = 'Email address is required.';
    } else if (! re.test(String(val).toLowerCase())) {
      email.isValid = 'invalid';
      email.feedback = 'Please enter valid email.';
    }

    this.setState({email: email});

    return email.isValid === 'valid';
  }

  validatePassword = (val) => {
    let password = {
      value: val,
      isValid: 'valid',
      feedback: 'Looks Good!',
    };

    if (val === "") {
      password.isValid = 'invalid';
      password.feedback = 'Password is required.';
    }

    this.setState({password: password});

    return password.isValid === 'valid';
  }

  validateConfPassword = (val) => {
    let confPassword = {
      value: val,
      isValid: 'valid',
      feedback: 'Looks Good!',
    };

    if (val === "") {
      confPassword.isValid = 'invalid';
      confPassword.feedback = 'Confirm password is required.';
    } else if (val !== this.state.password.value) {
      confPassword.isValid = 'invalid';
      confPassword.feedback = 'Passwords did not match.';
    }

    this.setState({confPassword: confPassword});

    return confPassword.isValid === 'valid';
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      axios({
        method: 'post',
        url: 'https://apibyashu.herokuapp.com/api/register',
        data: {
          name: this.state.name.value,
          email: this.state.email.value,
          password: this.state.password.value,
        }
      }).then(res => {
        console.log(res.data);
        alert(res.data.message);
      });
    }
  }

  validateForm = () => {
    let validName = this.validateName(this.state.name.value);
    let validEmail = this.validateEmail(this.state.email.value);
    let validPassword = this.validatePassword(this.state.password.value);
    let validConfPassword = this.validateConfPassword(this.state.confPassword.value);

    return validName && validEmail && validPassword && validConfPassword;
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
              <form id="sign-up-form" onSubmit={this.handleSubmit}>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input type="text" className={`form-control is-${this.state.name.isValid}`} name="Name" value={this.state.name.value}  onChange={this.handleChangeName} />
                  <div className={`${this.state.name.isValid}-feedback`}>{this.state.name.feedback}</div>
                </div>
                <div id="email" className="form-group mb-3">
                  <label>Email address</label>
                  <input type="text" className={`form-control is-${this.state.email.isValid}`} value={this.state.email.value} onChange={this.handleChangeEmail} />
                  <div className={`${this.state.email.isValid}-feedback`}>{this.state.email.feedback}</div>
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input type="password" className={`form-control is-${this.state.password.isValid}`} name="password" value={this.state.password.value}  onChange={this.handleChangePassword} />
                  <div className={`${this.state.password.isValid}-feedback`}>{this.state.password.feedback}</div>
                </div>
                <div className="form-group mb-3">
                  <label>Confirm Password</label>
                  <input type="password" className={`form-control is-${this.state.confPassword.isValid}`} name="confPassword" value={this.state.confPassword.value}  onChange={this.handleChangeConfPassword} />
                  <div className={`${this.state.confPassword.isValid}-feedback`}>{this.state.confPassword.feedback}</div>
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