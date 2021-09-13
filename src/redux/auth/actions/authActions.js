import * as types from '../actions/actionTypes';

export const login = () => {
  return {
    type: types.LOGIN,
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};

export const allProducts = () => {
  return {
    type: types.ALL_PRODUCTS,
  };
};

export const loginAsync = (data, navigation) => {
  return {
    type: types.LOGIN_ASYNC,
    payload: data,
    navigation,
  };
};

export const registerAsync = (data, navigation) => {
  return {
    type: types.REGISTER_ASYNC,
    payload: data,
    navigation,
  };
};

export const allProductsAsyc = () => {
  return {
    type: types.ALL_PRODUCTS_ASYNC,
  };
};

export const clearState = () => {
  return {
    type: types.CLEAR_STATE,
  };
};

export const getCategory = () => {
  return {
    type: types.GET_CATEGORY_ASYNC,
  };
};

export const getColor = () => {
  return {
    type: types.GET_COLOR_ASYNC,
  };
};

export const addToCartAsync = (data, authKey) => {
  return {
    type: types.ADD_T0_CART_ASYNC,
    payload: data,
    authKey,
  };
};

export const getCart = (authKey) => {
  return {
    type: types.GET_CART_ASYNC,
    authKey,
  };
};

export const clearAddToCart = () => {
  return {
    type: types.CLEAR_ADDED_TO_CART,
  };
};

export const updateQuantityAsync = (authKey, productId, data, refreshCart) => {
  return {
    type: types.UPDATE_QUANTITY_ASYNC,
    payload: data,
    authKey,
    productId,
    refreshCart,
  };
};

export const deleteCartItemAsync = (authKey, productId, refreshCart) => {
  return {
    type: types.DELETE_FROM_CART_ASYNC,
    authKey,
    productId,
    refreshCart,
  };
};

export const getAddressAsync = (authKey) => {
  return {
    type: types.GET_ADDRESS_ASYNC,
    authKey,
  };
};

export const addAddressAsync = (authKey, data, navigation, refresh) => {
  return {
    type: types.ADD_ADDRESS_ASYNC,
    payload: data,
    navigation,
    authKey,
    refresh,
  };
};

export const deleteAddressAsync = (authKey, addressId, refresh) => {
  return {
    type: types.DELETE_ADDRESS_ASYNC,
    authKey,
    refresh,
    addressId,
  };
};

export const editAddressAsync = (
  authKey,
  addressId,
  data,
  navigation,
  refresh,
) => {
  return {
    type: types.EDIT_ADDRESS_ASYNC,
    payload: data,
    navigation,
    refresh,
    authKey,
    addressId,
  };
};

export const placeOrderAsync = (authKey, data, refresh) => {
  return {
    type: types.PLACE_ORDER_ASYNC,
    payload: data,
    refresh,
    authKey,
  };
};

export const viewOrdersAsync = (authKey) => {
  return {
    type: types.VIEW_ORDERS_ASYNC,
    authKey,
  };
};

export const productsOrdered = (data) => {
  return {
    type: types.PRODUCTS_ORDERED,
    payload: data,
  };
};

export const changePasswordAsync = (data, authKey) => {
  return {
    type: types.CHANGE_PASSWORD_ASYNC,
    payload: data,
    authKey,
  };
};

export const filterCategory = (data) => {
  return {
    type: types.GET_SELECTED_CATEGORY,
    payload: data,
  };
};

export const getFilteredData = (data) => {
  return {
    type: types.GET_FILTERED_DATA,
    payload: data,
  };
};

export const addImgProfile = (data) => {
  return {
    type: types.ADD_IMG,
    payload: data,
  };
};

export const saveOrderId = (data) => {
  return {
    type: types.ORDER_ID_FOR_HEADER,
    payload: data,
  };
};
