import React, {Component} from 'react';

// Components
import Header from './components/Header'
import Footer from './components/Footer'

import Router from "./routes";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Router/>
        <Footer/>
      </div>
    );
  }
}

