"use strict";

import React from "react";
import ReactRouter from "react-router";
import { IndexRoute, Router, Route, hashHistory } from "react-router";

import App from "./components/app";
import PhotoPage from "./components/photoPage/photoPage";

const Routes = (
    <Router history={hashHistory}>
        <Route name="app" path="/" component={App}>
            <IndexRoute component={PhotoPage} />
        </Route>
    </Router>
);

export default Routes;
