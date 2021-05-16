/*
 *
 * SignInForm actions
 *
 */

import * as constants from './constants';

export function login({ login, password }) {
  return {
    type: constants.LOGIN,
    payload: { login, password }
  };
}

export function loginSuccess({ key }) {
  return {
    type: constants.LOGIN_SUCCESS,
    payload: { key }
  };
}

export function loginFail({ error }) {
  return {
    type: constants.LOGIN_FAIL,
    payload: { error }
  };
}
