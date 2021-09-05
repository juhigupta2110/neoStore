import * as types from '../actions/actionTypes';
const initialState = [];
const allOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.VIEW_ORDERS:
      return [...action.payload];

    default:
      return state;
  }
};

export default allOrdersReducer;
