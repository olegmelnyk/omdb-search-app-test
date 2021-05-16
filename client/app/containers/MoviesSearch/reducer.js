/*
 *
 * MoviesSearch reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const moviesSearchReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case constants.SEARCH_SUCCESS:
        draft.list = payload.list;
        draft.totalResults = payload.totalResults;
        break;
    }
  });

export default moviesSearchReducer;
