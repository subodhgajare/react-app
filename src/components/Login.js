import React, { useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { loginMiddleware } from "../middlewares/login";

function Login(props) {
  let [email, setEmail] = useState({ value: '', isValid: '', feedback: '' });
  let [password, setPassword] = useState({ value: '', isValid: '', feedback: '' });
  let [loginError, setLoginError] = useState('');

  let handleSubmit = () => {
    if (email.isValid === 'valid' && password.isValid === 'valid') {
      props.dispatch(loginMiddleware({ email: email.value, password: password.value }, setLoginError));
    }
  }

  let handleChangeEmail = (event) => {
    let email = {
      value: event.target.value,
      isValid: 'valid',
      feedback: '',
    };

    setEmail(validateEmail(email));
  }

  let validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.value === undefined || email.value === "") {
      email.isValid = 'invalid';
      email.feedback = 'Email adress is required';
    } else if (!re.test(String(email.value).toLowerCase())) {
      email.isValid = 'invalid';
      email.feedback = 'Please enter valid email.';
    }

    return email;
  }

  let handleChangePassword = (event) => {
    let password = {
      value: event.target.value,
      isValid: 'valid',
      feedback: '',
    };

    setPassword(validatePassword(password));
  }

  let validatePassword = (password) => {
    if (password.value === "") {
      password.isValid = 'invalid';
      password.feedback = 'Password is required';
    }

    return password;
  }

  return (
    <section id="form">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="login-form">
              <h2>Login to your account</h2>
              <form id="login-form" onSubmit={handleSubmit}>
                <span className={`text-danger ${email.isValid}-feedback`}>{email.feedback}</span>
                <input type="email" placeholder="Email Address" className={`form-control is-${email.isValid}`} value={email.value} onChange={handleChangeEmail}/>
                <br />
                <span className={`text-danger ${password.isValid}-feedback`}>{password.feedback}</span>
                <input type="password" className={`form-control is-${password.isValid}`} name="password" value={password.value} onChange={handleChangePassword} />
                <div className="form-group mb-3">
                  <h5 className="text-danger">{loginError}</h5>
                </div>
                <button type="button" className="btn btn-default" onClick={handleSubmit}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

let LoginComp = connect((state, props) => {
  if (state.AuthReducer.user) {
    props.history.push('/home');
  }
  return {}
})(Login);

export default withRouter(LoginComp);