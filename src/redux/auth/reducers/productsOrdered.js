import * as types from '../actions/actionTypes';
const initialState = [];
const productsOrdered = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCTS_ORDERED:
      return [...action.payload];

    case types.CLEAR_STATE:
      return [];

    case types.ERROR:
      return state;

    default:
      return state;
  }
};

export default productsOrdered;
