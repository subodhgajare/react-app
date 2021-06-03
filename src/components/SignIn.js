import React, { useState } from "react";
import axios from "axios";

function SignIn(props) {
  let [email, setEmail] = useState({value: '', isValid: '', feedback: ''});
  let [password, setPassword] = useState({value: '', isValid: '', feedback: ''});
  let [loginError, setLoginError] = useState('');

  let handleSubmit = () => {
    if (email.isValid === 'valid' && password.isValid === 'valid') {
      axios.post('https://apibyashu.herokuapp.com/api/login', {email: email.value, password: password.value})
        .then(res => {
          if (res.data.token !== undefined) {
            props.setUser(res.data);
            setLoginError('');
            localStorage.setItem('user', JSON.stringify(res.data));
            props.history.push('/home');
          } else {
            setLoginError(res.data.message);
          }
        });
    }
  }

  let handleChangeEmail = (event) => {
    let email = {
      value: event.target.value,
      isValid: 'valid',
      feedback: 'Looks Good!',
    };

    setEmail(validateEmail(email));
  }

  let validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.value === "") {
      email.isValid = 'invalid';
      email.feedback = 'Email is required';
    } else if (! re.test(String(email.value).toLowerCase())) {
      email.isValid = 'invalid';
      email.feedback = 'Please enter valid email.';
    }

    return email;
  }

  let handleChangePassword = (event) => {
    let password = {
      value: event.target.value,
      isValid: 'valid',
      feedback: 'Looks Good!',
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
    <div className="row justify-content-md-center mt-3">
      <div className="col col-lg-4  ">
        <div className="card card-info">
          <div className="card-header">
            <h4 className="card-title text-center">Sign In Form</h4>
          </div>
          <div className="card-body">
            <form id="sign-in-form" onSubmit={handleSubmit}>
              <div id="email" className="form-group mb-3">
                <label>Email address</label>
                <input type="text" className={`form-control is-${email.isValid}`} value={email.value} onChange={handleChangeEmail} />
                <div className={`${email.isValid}-feedback`}>{email.feedback}</div>
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input type="password" className={`form-control is-${password.isValid}`} name="password" value={password.value} onChange={handleChangePassword} />
                <div className={`${password.isValid}-feedback`}>{password.feedback}</div>
              </div>
              <div className="form-group mb-3">
                <h5 className="text-danger">{loginError}</h5>
              </div>
              <br />
              <button type="button" className="btn btn-block btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn