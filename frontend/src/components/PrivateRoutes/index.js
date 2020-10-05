import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from "react-redux";

const PrivateRoute = (props) => {
  const { component: Component, isLoggedIn, ...rest } = props

  return (
    <Route
      {...rest}
      render={propsChild =>
        isLoggedIn !== undefined ? (
          <Component {...propsChild} />
        ) : (
          <Redirect to={'/login'}/>
        )
      }
    />
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);