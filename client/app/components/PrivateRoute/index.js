/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const validCreds = () => {
  return !!localStorage.getItem('key');
}

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        validCreds() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {};

export default PrivateRoute;
