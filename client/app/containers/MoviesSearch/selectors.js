import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the moviesSearch state domain
 */

const selectMoviesSearchDomain = state => state.moviesSearch || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MoviesSearch
 */

const makeSelectMoviesSearch = () =>
  createSelector(
    selectMoviesSearchDomain,
    substate => substate,
  );

export default makeSelectMoviesSearch;
export { selectMoviesSearchDomain };
