import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Errors from "./Errors";
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration

const FORM_STYLE = {
  margin: "0 auto",
  padding: 30
};

const SIGNUP_LINK_STYLE = {
  display: "inline-block",
  marginLeft: 10
};

export default function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function handleOnChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleOnChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleOnSubmit(e) {
    let isValid = true;
    const errorsArray = [];
    e.preventDefault();

    if (!email.length) {
      isValid = false;
      errorsArray.push("Email can't be blank");
    }
    if (!password.length) {
      isValid = false;
      errorsArray.push("Password can't be blank");
    }

    if (!isValid) {
      setErrors(errorsArray);
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.replace("/rooms");
      })
      .catch(() => {
        setErrors(["Incorrect email or password"]);
      });
  }

  return (
    <form style={FORM_STYLE} onSubmit={handleOnSubmit}>
      <Errors errorMessages={errors} />

      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="email"
          onChange={handleOnChangeEmail}
          value={email}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="password"
          onChange={handleOnChangePassword}
          value={password}
        />
      </div>

      <div className="form-group">
        <button className="btn btn-large btn-default" type="submit">
          Login
        </button>
        <div style={SIGNUP_LINK_STYLE}>
          <Link to="/signup">create new account</Link>
        </div>
      </div>
    </form>
  );
}
