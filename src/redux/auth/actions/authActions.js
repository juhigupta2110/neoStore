import * as types from '../actions/actionTypes';

export const login = () => {
  return {
    type: types.LOGIN,
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
