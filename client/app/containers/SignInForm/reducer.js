/*
 *
 * SignInForm reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const signInFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case constants.LOGIN_SUCCESS:
        draft.key = payload.key;
        break;
      case constants.LOGIN_FAIL:
        draft.error = payload.error;
        break;
    }
  });

export default signInFormReducer;
