"use strict";

import React from "react";
import ReactRouter from "react-router";
import { IndexRoute, Router, Route, hashHistory } from "react-router";
import App from "./components/app";

const Routes = (
    <Router history={hashHistory}>
        <Route name="app" path="/" component={App}>
            
        </Route>
    </Router>
);

export default Routes;