import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//setup axios
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

//authorization
axios.defaults.headers.common["authorization"] = localStorage.getItem("user") == undefined ? null : JSON.parse(localStorage.getItem("user")).token;

//cors
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;

//axios gets 401 error then delete token and redirect to login
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
