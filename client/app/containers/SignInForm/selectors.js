import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signInForm state domain
 */

const selectSignInFormDomain = state => state.signInForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignInForm
 */

const makeSelectSignInForm = () =>
  createSelector(
    selectSignInFormDomain,
    substate => substate,
  );

export default makeSelectSignInForm;
export { selectSignInFormDomain };
