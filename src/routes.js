"use strict";

import React from "react";
import ReactRouter from "react-router";
import { IndexRoute, Router, Route, browserHistory } from "react-router";

import App from "./components/app";
import PhotoPage from "./components/photoPage/photoPage";

const Routes = (
    <Router history={browserHistory}>
        <Route name="app" path="/(:tag)" component={App}>
            <IndexRoute component={PhotoPage} />
        </Route>
    </Router>
);

export default Routes;
