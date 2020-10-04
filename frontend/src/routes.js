import React, {Component} from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Main from "./pages/Main";
import Login from "./pages/Login";

export default class Routes extends Component {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/home"]} component={Main}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  }
}