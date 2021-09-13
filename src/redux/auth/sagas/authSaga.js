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

export function* workerChangePasswordAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.post(
        'https://neostore-api.herokuapp.com/api/user/change-password',
        action.payload,
        {
          headers: {
            Authorization: action.authKey,
          },
        },
      );
      return result;
    });
    if (response.status === 200) {
      console.log('response for change password..', response);

      Toast.show({
        text1: response.data.message,
        visibilityTime: 500,
        position: 'bottom',
      });
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
      visibilityTime: 500,
      position: 'bottom',
    });
    console.log('error in change password..', e.response);
  }
}

export function* workerViewOrdersAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.get(
        `https://neostore-api.herokuapp.com/api/order`,

        {
          headers: {
            Authorization: action.authKey,
          },
        },
      );
      return result;
    });
    if (response.status == 200) {
      console.log('response for order list...', response.data.data.orders);
      let data = response.data.data.orders;
      yield put({type: types.VIEW_ORDERS, payload: data});
    }
  } catch (e) {
    Toast.show({
      text1: e.response,
      visibilityTime: 500,
      position: 'bottom',
    });
    console.log('error in getting order list..', e.response);
  }
}

export function* workerPlaceOrderAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.post(
        'https://neostore-api.herokuapp.com/api/order/place',
        action.payload,
        {
          headers: {
            Authorization: action.authKey,
          },
        },
      );
      return result;
    });
    if (response.status === 200) {
      console.log('response for added address..', response);
      // yield put({
      //   type: types.PRODUCTS_ORDERED,
      //   payload: action.productsOrdered,
      // });
      Toast.show({
        text1: response.message,
        visibilityTime: 500,
        position: 'bottom',
      });

      action.refresh();

      // setTimeout(() => action.navigation.navigate('ShippingAddresses'), 1500);
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
      visibilityTime: 500,
      position: 'bottom',
    });
    console.log('error in add address..', e.response);
  }
}

export function* workerEditAddressAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.put(
        `https://neostore-api.herokuapp.com/api/user/address/${action.addressId}`,
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
      console.log('response for update address..', response);
      Toast.show({
        text1: response.data.message,
        visibilityTime: 500,
        position: 'bottom',
      });
      action.refresh();
      action.navigation.navigate('ShippingAddresses');
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
      visibilityTime: 500,
      position: 'bottom',
    });
    console.log('error in update address..', e.response.data.message);
  }
}

export function* workerDeleteAddressAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.delete(
        `https://neostore-api.herokuapp.com/api/user/address/${action.addressId}`,

        {
          headers: {
            Authorization: action.authKey,
          },
        },
      );
      return result;
    });
    if (response.status == 200) {
      console.log('response for delete address..', response);
      Toast.show({
        text1: response.data.message,
        visibilityTime: 500,
        position: 'bottom',
      });
      action.refresh();
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
      visibilityTime: 500,
      position: 'bottom',
    });
    console.log('error in delete address..', e.response);
  }
}

export function* workerAddAddressAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.post(
        'https://neostore-api.herokuapp.com/api/user/address',
        action.payload,
        {
          headers: {
            Authorization: action.authKey,
          },
        },
      );
      return result;
    });
    if (response.status === 200) {
      console.log('response for added address..', response);
      Toast.show({
        text1: response.data.message,
        visibilityTime: 500,
        position: 'bottom',
      });
      action.refresh();

      setTimeout(() => action.navigation.navigate('ShippingAddresses'), 1500);
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
      visibilityTime: 500,
      position: 'bottom',
    });
    console.log('error in add address..', e.response);
  }
}

export function* workerGetAdressesAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.get(
        `https://neostore-api.herokuapp.com/api/user/address`,

        {
          headers: {
            Authorization: action.authKey,
          },
        },
      );
      return result;
    });
    if (response.status == 200) {
      console.log(
        'response.dta.data for getting address list...',
        response.data.data.address,
      );
      let data = response.data.data.address;
      yield put({type: types.GET_ADDRESS, payload: data});
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
      visibilityTime: 500,
      position: 'bottom',
    });
    console.log('error in getting address list..', e.response);
  }
}

export function* workerDeleteProductFromCartAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.delete(
        `https://neostore-api.herokuapp.com/api/cart/${action.productId}`,

        {
          headers: {
            Authorization: action.authKey,
          },
        },
      );
      return result;
    });
    if (response.status == 200) {
      console.log('response for delete from cart..', response);
      Toast.show({
        text1: response.data.message,
        visibilityTime: 500,
        position: 'bottom',
      });
      action.refreshCart();
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
      visibilityTime: 500,
      position: 'bottom',
    });
    console.log('error in delete from cart..', e.response);
  }
}

export function* workerUpdateQuatityAsync(action) {
  try {
    const response = yield call(async () => {
      const result = await axios.put(
        `https://neostore-api.herokuapp.com/api/cart/${action.productId}`,
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
      console.log('response for update cart..', response);
      Toast.show({
        text1: response.data.message,
        visibilityTime: 500,
        position: 'bottom',
      });
      action.refreshCart();
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
      visibilityTime: 500,
      position: 'bottom',
    });
    console.log('error in increaseing quantity..', e.response.data.message);
  }
}

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
      text1: e.response,
      visibilityTime: 500,
      position: 'bottom',
    });
    console.log('error in getting from cart...', e.response);
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
        text1: response.data.message,
        visibilityTime: 500,
        position: 'bottom',
      });
      // yield put({type: types.ADD_T0_CART});
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
      visibilityTime: 500,
      position: 'bottom',
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
        text1: response.data.message,
        visibilityTime: 500,
        position: 'bottom',
      });
      yield put({
        type: types.LOGIN,
        payload: {
          name: response.data.data.firstName,
          token: response.data.data.token,
          lastName: response.data.data.lastName,
          mobile: response.data.data.mobile,
        },
      });

      action.navigation.navigate('AllProducts');
    }
  } catch (e) {
    Toast.show({
      text1: e.response.data.message,
      visibilityTime: 500,
      position: 'bottom',
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

export function* watchUpdateQuatityAsync() {
  yield takeEvery(types.UPDATE_QUANTITY_ASYNC, workerUpdateQuatityAsync);
}

export function* watchDeleteProductFromCartAsync() {
  yield takeEvery(
    types.DELETE_FROM_CART_ASYNC,
    workerDeleteProductFromCartAsync,
  );
}

export function* watchGetAddressesAsync() {
  yield takeEvery(types.GET_ADDRESS_ASYNC, workerGetAdressesAsync);
}

export function* watchAddAddressAsync() {
  yield takeEvery(types.ADD_ADDRESS_ASYNC, workerAddAddressAsync);
}

export function* watchDeleteAddressAsync() {
  yield takeEvery(types.DELETE_ADDRESS_ASYNC, workerDeleteAddressAsync);
}

export function* watchEditAddressAsync() {
  yield takeEvery(types.EDIT_ADDRESS_ASYNC, workerEditAddressAsync);
}

export function* watchPlaceOrderAysnc() {
  yield takeEvery(types.PLACE_ORDER_ASYNC, workerPlaceOrderAsync);
}

export function* watchViewOrdersAsync() {
  yield takeEvery(types.VIEW_ORDERS_ASYNC, workerViewOrdersAsync);
}

export function* watchChangePasswordAsync() {
  yield takeEvery(types.CHANGE_PASSWORD_ASYNC, workerChangePasswordAsync);
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
    watchUpdateQuatityAsync(),
    watchDeleteProductFromCartAsync(),
    watchGetAddressesAsync(),
    watchAddAddressAsync(),
    watchDeleteAddressAsync(),
    watchEditAddressAsync(),
    watchPlaceOrderAysnc(),
    watchViewOrdersAsync(),
    watchChangePasswordAsync(),
  ]);
}
