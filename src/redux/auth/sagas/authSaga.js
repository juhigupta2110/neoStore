import {takeEvery, put, call, takeLatest, all} from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import {apiService} from '../../../libs/apiCalls';
import axios from 'axios';
import Toast, {BaseToast} from 'react-native-toast-message';

var responseCode;

function onResponseRegister(res) {
  console.log('logging register response...', res);
  responseCode = res.status;
}

//WORKER SAGA

export function* workerGetCartAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.get(
        'https://neostore-api.herokuapp.com/api/cart',

        {
          headers: {
            Authorization: action.authKey,
          },
        },
      );
      return result;
    });
    if (response.status == 200) {
      console.log('response from GETTING from cart', response.data.data);

      yield put({type: types.GET_CART, payload: response.data.data});
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
    });
    console.log('error in getting from cart...', e.response.data.message);
  }
}

export function* workerAddToCartAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.post(
        'https://neostore-api.herokuapp.com/api/cart',
        action.payload,
        {
          headers: {
            Authorization: action.authKey,
          },
        },
      );
      return result;
    });
    if (response.status == 200) {
      console.log('response from additn to cart', response);
      Toast.show({
        text1: 'Product added to cart !!',
      });
      // yield put({type: types.ADD_T0_CART});
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
    });
    console.log('error in adding to cart...', e.response.data.message);
  }
}

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
    console.log('error in get color worker...', e.response);
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
    console.log('error in get category worker...', e.response);
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
    console.log('error in all products worker...', e.response);
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
      Toast.show({
        text1: 'Login successful',
      });
      yield put({
        type: types.LOGIN,
        payload: {
          name: response.data.data.firstName,
          token: response.data.data.token,
        },
      });

      action.navigation.navigate('AllProducts');
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
    });
    console.log('error is...', e.response);
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

export function* watchAddToCartAsync() {
  yield takeEvery(types.ADD_T0_CART_ASYNC, workerAddToCartAsync);
}

export function* watchGetCartAsync() {
  yield takeEvery(types.GET_CART_ASYNC, workerGetCartAsync);
}

// COMBINING SAGAS
export function* rootSaga() {
  yield all([
    watchLoginAsync(),
    watchRegisterAsync(),
    watchAllProductsAsync(),
    watchGetCategoryAsync(),
    watchGetColorAsync(),
    watchAddToCartAsync(),
    watchGetCartAsync(),
  ]);
}
