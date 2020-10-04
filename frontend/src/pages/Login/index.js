import React, {Component} from "react";
import {Redirect} from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {connect} from "react-redux";
import {login} from "../../redux/actions/auth";

import './style.scss'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const {dispatch, history} = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          history.push("/");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const {isLoggedIn, message} = this.props;

    if (isLoggedIn) {
      return <Redirect to="/"/>;
    }

    return (
      <div className="col-md-12 login-card d-flex flex-column justify-content-center p-0">
        <div className="col-lg-4 col-md-6 mx-auto">
          <div className="card rounded shadow shadow-sm">
            <div className="card-header">
              <h3 className="mb-0">Login</h3>
            </div>
            <div className="card-body">
              <Form onSubmit={this.handleLogin}
                    ref={(c) => {
                      this.form = c;
                    }}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input type="text"
                         className="form-control"
                         name="email"
                         value={this.state.email}
                         onChange={this.onChangeEmail}
                         validations={[required]}/>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input type="password"
                         className="form-control"
                         name="password"
                         value={this.state.password}
                         onChange={this.onChangePassword}
                         validations={[required]}/>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block"
                          disabled={this.state.loading}>
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm mr-1"/>
                    )}
                    <span>Login</span>
                  </button>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{display: "none"}}
                             ref={(c) => {
                               this.checkBtn = c;
                             }}/>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {isLoggedIn} = state.auth;
  const {message} = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);
