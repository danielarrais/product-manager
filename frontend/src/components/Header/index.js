import React, {Component} from 'react'
import {connect} from "react-redux";
import {logout} from "../../redux/actions/auth";

import './styles.css'

class Header extends Component {
  state = {
    currentUser: undefined,
  };

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut = () => {
    this.props.dispatch(logout());
  }

  render() {
    const {currentUser} = this.state;

    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href={'/#'}>Product Manager</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href={'/#'}>Home <span className="sr-only">(current)</span></a>
                </li>
              </ul>
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <span className="nav-link user-email">
                    {currentUser.uid}
                  </span>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Logout
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href={"/login"} className="nav-link">Login</a>
                </li>
              </div>
            )}
          </div>
        </nav>
      </header>
    )
  }
}

function mapStateToProps(state) {
  const {user} = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Header);