import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Redirect, Switch } from "react";
// import Home from "./home";
// import Result from "./result";
if (process.env.NODE_ENV === 'production') disableReactDevTools()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    // document.getElementById("root")
);

