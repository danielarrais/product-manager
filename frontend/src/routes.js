import React, {Component} from 'react'

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Main from "./pages/Main";
import Login from "./pages/Login";
import ProductEdit from "./pages/ProductEdit";
import PrivateRoute from "./components/PrivateRoutes";

export default class Routes extends Component {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <PrivateRoute exact path={["/", "/home"]} component={Main}/>
        <PrivateRoute exact path="/products/:id" component={ProductEdit}/>
      </Switch>
    </BrowserRouter>
  }
}