import React, {Component} from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Main from "./pages/Main";
import Login from "./pages/Login";
import ProductEdit from "./pages/ProductEdit";

export default class Routes extends Component {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/home"]} component={Main}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/products/:id" component={ProductEdit}/>
      </Switch>
    </BrowserRouter>
  }
}