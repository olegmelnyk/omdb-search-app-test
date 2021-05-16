import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import api from 'api';
import { push } from 'connected-react-router';
import * as actions from './actions';
import * as constants from './constants';

export function* authenticate({ payload }) {
  const { login, password } = payload;

  try {
    const { data } = yield call(api.post, '/authenticate', { login, password });

    if (data) {
      localStorage.setItem('key', data);
      yield put(actions.loginSuccess({ key: data }));
      yield put(push('/search'));
    } else {
      yield put(actions.loginFail({ error: 'Wrong password' }));
    }
  } catch (error) {
    console.error(error);
    yield put(actions.loginFail({ error: error.message }));
  }
}

// Individual exports for testing
export default function* signInFormSaga() {
  yield takeEvery(constants.LOGIN, authenticate);
}
