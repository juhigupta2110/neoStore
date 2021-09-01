import {takeEvery, put, call, takeLatest, all} from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import {apiService} from '../../../libs/apiCalls';
import axios from 'axios';

var responseCode;

function onResponseRegister(res) {
  console.log('logging register response...', res);
  responseCode = res.status;
}

//WORKER SAGA

export function* workerAllColorAsync() {
  try {
    const response = yield call(async () => {
      const result = await axios.get(
        'https://neostore-api.herokuapp.com/api/color',
      );
      return result;
    });

    if (response.status == 200) {
      let data = response.data.data;
      yield put({type: types.GET_COLOR, payload: data});
    }
  } catch (e) {
    console.log('error in get color worker...', e);
  }
}

export function* workerAllCategoryAsync() {
  try {
    const response = yield call(async () => {
      const result = await axios.get(
        'https://neostore-api.herokuapp.com/api/category',
      );
      return result;
    });

    if (response.status == 200) {
      let data = response.data.data;
      yield put({type: types.GET_CATEGORY, payload: data});
    }
  } catch (e) {
    console.log('error in get category worker...', e);
  }
}

export function* workerAllProductsAsync() {
  try {
    const response = yield call(async () => {
      const result = await axios.get(
        'https://neostore-api.herokuapp.com/api/product',
      );
      return result;
    });

    if (response.status == 200) {
      let data = response.data.data.docs;

      yield put({type: types.ALL_PRODUCTS, payload: data});
    }
  } catch (e) {
    console.log('error in all products worker...', e);
  }
}

export function* workerLoginAsyncTesting(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.post(
        'https://neostore-api.herokuapp.com/api/auth/login',
        action.payload,
      );
      return result;
    });
    console.log('resonse...', response);
    if (response.status == 200) {
      yield put({type: types.LOGIN, payload: response.data.data.firstName});

      action.navigation.navigate('AllProducts');
    }
  } catch (e) {
    console.log('error is...', e);
  }
}

export function* workerRegisterAsync(action) {
  yield call(apiService.register, action.payload, onResponseRegister, 'post');

  responseCode == 200
    ? action.navigation.navigate('Login')
    : alert('registration failed');
}

// WATCHER SAGA
export function* watchLoginAsync() {
  yield takeEvery(types.LOGIN_ASYNC, workerLoginAsyncTesting);
}

export function* watchRegisterAsync() {
  yield takeEvery(types.REGISTER_ASYNC, workerRegisterAsync);
}

export function* watchAllProductsAsync() {
  yield takeEvery(types.ALL_PRODUCTS_ASYNC, workerAllProductsAsync);
}

export function* watchGetCategoryAsync() {
  yield takeEvery(types.GET_CATEGORY_ASYNC, workerAllCategoryAsync);
}
export function* watchGetColorAsync() {
  yield takeEvery(types.GET_COLOR_ASYNC, workerAllColorAsync);
}

// COMBINING SAGAS
export function* rootSaga() {
  yield all([
    watchLoginAsync(),
    watchRegisterAsync(),
    watchAllProductsAsync(),
    watchGetCategoryAsync(),
    watchGetColorAsync(),
  ]);
}
