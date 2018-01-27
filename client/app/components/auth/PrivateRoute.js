import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable react/prop-types */
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }}
        />
    )
  )}
  />
);
/* eslint-enable react/prop-types */

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
