import * as types from '../actions/actionTypes';
const initialState = {};
const getCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CART:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

export default getCartReducer;
