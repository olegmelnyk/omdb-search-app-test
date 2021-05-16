/*
 *
 * MoviesSearch actions
 *
 */

import * as constants from './constants';

export function search({ title, type, y }) {
  return {
    type: constants.SEARCH,
    payload: { title, type, y }
  };
}

export function searchSuccess({ Search, totalResults }) {
  return {
    type: constants.SEARCH_SUCCESS,
    payload: { list: Search, totalResults }
  };
}

export function searchFail({ error }) {
  return {
    type: constants.SEARCH_FAIL,
    payload: { error }
  };
}