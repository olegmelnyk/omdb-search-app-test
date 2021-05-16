import { takeEvery, call, put, select } from 'redux-saga/effects';
import api from 'api';
import * as constants from './constants';
import * as actions from './actions';

export function* searchMovies({ payload }) {
  const { title, type, y } = payload;

  try {
    const params = { title };

    if(type && type !== 'any') {
      params.type = type;
    }
    if(y && y !== 'any') {
      params.y = y;
    }
    const { data } = yield call(api.get, '/search', { params });

    yield put(actions.searchSuccess(data));
  } catch (error) {
    console.error(error)
  }
}

// Individual exports for testing
export default function* moviesSearchSaga() {
  yield takeEvery(constants.SEARCH, searchMovies);
}
