import React, { useState } from "react";
import { withRouter } from "react-router";
import { register } from "../apis/Api";

function Register(props) {
  let [name, setName] = useState({ value: '', isValid: '', feedback: '' });
  let [email, setEmail] = useState({ value: '', isValid: '', feedback: '' });
  let [password, setPassword] = useState({ value: '', isValid: '', feedback: '' });
  let [confPassword, setConfPassword] = useState({ value: '', isValid: '', feedback: '' });
  let [registerError, setRegisterError] = useState('');

  let handleChangeName = (event) => {
    validateName(event.target.value);
  }

  let handleChangeEmail = (event) => {
    validateEmail(event.target.value);
  }

  let handleChangePassword = (event) => {
    validatePassword(event.target.value);
  }

  let handleChangeConfPassword = (event) => {
    validateConfPassword(event.target.value);
  }

  let validateName = (val) => {
    let name = {
      value: val,
      isValid: 'valid',
      feedback: '',
    };

    if (val === undefined || val === "") {
      name.isValid = 'invalid';
      name.feedback = 'Name is required.';
    }

    setName(name);

    return name.isValid === 'valid';
  }

  let validateEmail = (val) => {
    let email = {
      value: val,
      isValid: 'valid',
      feedback: '',
    };

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (val === undefined || val === "") {
      email.isValid = 'invalid';
      email.feedback = 'Email address is required.';
    } else if (! re.test(String(val).toLowerCase())) {
      email.isValid = 'invalid';
      email.feedback = 'Please enter valid email address.';
    }

    setEmail(email);

    return email.isValid === 'valid';
  }

  let validatePassword = (val) => {
    let password = {
      value: val,
      isValid: 'valid',
      feedback: '',
    };

    if (val === undefined || val === "") {
      password.isValid = 'invalid';
      password.feedback = 'Password is required.';
    }

    setPassword(password);

    return password.isValid === 'valid';
  }

  let validateConfPassword = (val) => {
    let confPassword = {
      value: val,
      isValid: 'valid',
      feedback: '',
    };

    if (val === undefined || val === "") {
      confPassword.isValid = 'invalid';
      confPassword.feedback = 'Confirm password is required.';
    } else if (val !== password.value) {
      confPassword.isValid = 'invalid';
      confPassword.feedback = 'Passwords did not match.';
    }

    setConfPassword(confPassword);

    return confPassword.isValid === 'valid';
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      register({
        name: name.value,
        email: email.value,
        password: password.value,
      }).then(
        response => {
          if (response.message !== "User Already Exists") {
            props.history.push('/login')
          } else {
            setRegisterError(response.message);
          }
        },
        error => []
      );
    }
  }

  let validateForm = () => {
    let validName = validateName(name.value);
    let validEmail = validateEmail(email.value);
    let validPassword = validatePassword(password.value);
    let validConfPassword = validateConfPassword(confPassword.value);

    return validName && validEmail && validPassword && validConfPassword;
  }

  return (
    <section id="form">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="signup-form">
              <h2>New User Signup!</h2>
              <form action="#">
                <span className={`text-danger ${name.isValid}-feedback`}>{name.feedback}</span>
                <input type="text" placeholder="Name" name="name" value={name.value}  onChange={handleChangeName}/>
                <br />
                <span className={`text-danger ${email.isValid}-feedback`}>{email.feedback}</span>
                <input type="email" placeholder="Email Address" name="email" value={email.value}  onChange={handleChangeEmail}/>
                <br />
                <span className={`text-danger ${password.isValid}-feedback`}>{password.feedback}</span>
                <input type="password" placeholder="Password" name="password" value={password.value}  onChange={handleChangePassword}/>
                <br />
                <span className={`text-danger ${confPassword.isValid}-feedback`}>{confPassword.feedback}</span>
                <input type="password" placeholder="Confirm password" name="confPassword" value={confPassword.value}  onChange={handleChangeConfPassword}/>
                <div className="form-group mb-3">
                  <h5 className="text-danger">{registerError}</h5>
                </div>
                <button type="button" className="btn btn-default" onClick={handleSubmit}>Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default withRouter(Register)