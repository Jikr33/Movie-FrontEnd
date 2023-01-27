import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Redirect, Switch } from "react";
// import Home from "./home";
// import Result from "./result";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    // <Router>
    //     {/* <Switch> */}
    //     <Route exact path="/" component={App} />
    //     <Route path="/result" component={Result} />
    //     <App />
    //     {/* </Switch> */}
    // </Router>
);
