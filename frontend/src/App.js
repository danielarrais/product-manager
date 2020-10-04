import React, {Component} from 'react';
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";


// Components
import Header from './components/Header'
import Main from './pages/Main'
import Footer from './components/Footer'

import Router from "./routes";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
        <Footer/>

        <Router/>
      </div>
    );
  }
}

