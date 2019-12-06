import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckToken from '../utils/CheckToken'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      CheckToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);
