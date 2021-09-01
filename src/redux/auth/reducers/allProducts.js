import * as types from '../actions/actionTypes';
const initialState = [];
const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ALL_PRODUCTS:
      return [...action.payload];

    case types.CLEAR_STATE:
      return [];

    case types.ERROR:
      return state;

    default:
      return state;
  }
};

export default allProductsReducer;
