import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Errors from "./Errors";

import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

const SIGNUP_FORM_STYLE = {
  margin: "0 auto",
  padding: 30
};

const CANCEL_BUTTON_STYLE = {
  marginLeft: 10
};

export default function Signup() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [errors, setErrors] = useState("");

  function handleOnChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleOnChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleOnChangeName(e) {
    setName(e.target.value);
  }
  function handleOnChangePhotoURL(e) {
    setPhotoURL(e.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    let isValid = true;
    const errorsArray = [];

    if (!email.length) {
      isValid = false;
      errorsArray.push("Email address can't be blank");
    }
    if (!password.length) {
      isValid = false;
      errorsArray.push("Password can't be blank");
    }
    if (!name.length) {
      isValid = false;
      errorsArray.push("Name can't be blank");
    }
    if (!isValid) {
      setErrors(errorsArray);
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        let user = firebase.auth().currentUser;
        await user.updateProfile({
          displayName: name,
          photoURL
        });
      })
      .then(() => {
        history.replace("/login");
      })
      .catch(err => {
        setErrors([err.message]);
      });
  }

  return (
    <form style={SIGNUP_FORM_STYLE} onSubmit={handleOnSubmit}>
      <Errors errorMessages={errors} />
      <div className="form-group">
        <label>Email Address*</label>
        <input
          type="email"
          className="form-control"
          placeholder="email"
          onChange={handleOnChangeEmail}
          value={email}
        />
      </div>

      <div className="form-group">
        <label>Password*</label>
        <input
          type="password"
          className="form-control"
          placeholder="password"
          onChange={handleOnChangePassword}
          value={password}
        />
      </div>

      <div className="form-group">
        <label>User Name*</label>
        <input
          type="text"
          className="form-control"
          placeholder="user name"
          onChange={handleOnChangeName}
          value={name}
        />
      </div>

      <div className="form-group">
        <label>Photo URL</label>
        <input
          type="text"
          className="form-control"
          placeholder="photo URL"
          onChange={handleOnChangePhotoURL}
          value={photoURL}
        />
      </div>

      <div className="form-group">
        <button className="btn btn-large btn-primary" type="submit">
          Create new account
        </button>
        <Link to="/login">
          <button
            type="button"
            style={CANCEL_BUTTON_STYLE}
            className="btn btn-large btn-default"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}
