import React from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
// import Room from "./Room";
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

let firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

if (!location.hash.length) {
  location.hash = "#/login";
}

render(
  <HashRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/rooms" component={Rooms} />
    </Switch>
  </HashRouter>,
  document.getElementById("app")
);
