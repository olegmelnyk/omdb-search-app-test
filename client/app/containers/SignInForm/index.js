/**
 *
 * SignInForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import serialize from 'form-serialize';

import {
  Box,
  Paper,
  TextField,
  Button
} from '@material-ui/core';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSignInForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import messages from './messages';

export function SignInForm({
  state,
  onLogin
}) {
  useInjectReducer({ key: 'signInForm', reducer });
  useInjectSaga({ key: 'signInForm', saga });

  return (
    <Box display="flex" justifyContent="center">
      <Box width="20%" p={2}>
        <Paper>
          <Box textAlign="center" pt={2}>
            <FormattedMessage {...messages.header} />
          </Box>
          {state.error && (
            <Box textAlign="center" pt={2}>
              <p>{state.error}</p>
            </Box>
          )}
          <Box p={2}>
            <form onSubmit={onLogin}>
              <Box mb={2}>
                <TextField
                  name="login"
                  defaultValue="user"
                  fullWidth
                  placeholder="Login"
                  variant="outlined"
                />
              </Box>
              <Box mb={2}>
                <TextField
                  name="password"
                  type="password"
                  defaultValue="password"
                  fullWidth
                  placeholder="Password"
                  variant="outlined"
                />
              </Box>
              <Box display="flex" justifyContent="center">
                <Button variant="outlined" type="submit">
                  Sign In
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

SignInForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectSignInForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLogin: e => {
      e.preventDefault();
      const { login, password } = serialize(e.target, { hash: true });
      dispatch(actions.login({ login, password }));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SignInForm);
