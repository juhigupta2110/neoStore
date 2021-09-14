import * as types from '../actions/actionTypes';
const initialState = {};
const orderPlacedIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ORDER_PLACED_ID:
      return action.payload;

    default:
      return state;
  }
};

export default orderPlacedIdReducer;
