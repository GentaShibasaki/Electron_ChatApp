import React from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
// import Room from "./Room";
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyBaLwlZm-5rREQ9x7FQLtgpjnMsYOz7gS0",
  authDomain: "electron-85b81.firebaseapp.com",
  databaseURL: "https://electron-85b81.firebaseio.com",
  projectId: "electron-85b81",
  storageBucket: "electron-85b81.appspot.com",
  messagingSenderId: "558321993080",
  appId: "1:558321993080:web:e1f457f223cdfe4f19b48d",
  measurementId: "G-D0H77TVTSD"
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
