import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
// import "core-js/modules/es7.array.includes";
// import "core-js/modules/es6.array.fill";
// import "core-js/modules/es6.string.includes";
// import "core-js/modules/es6.string.trim";
// import "core-js/modules/es7.object.values";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzpcpdeEQrW6BERIDq1yCdyTPVxtBmGEM",
  authDomain: "park-22003.firebaseapp.com",
  databaseURL: "https://park-22003.firebaseio.com",
  projectId: "park-22003",
  storageBucket: "park-22003.appspot.com",
  messagingSenderId: "10303431139",
  appId: "1:10303431139:web:5f95c7ed9f57836d2540d6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
