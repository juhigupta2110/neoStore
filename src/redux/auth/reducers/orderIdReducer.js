import * as types from '../actions/actionTypes';
const initialState = '';
const orderIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ORDER_ID_FOR_HEADER:
      return action.payload;

    default:
      return state;
  }
};

export default orderIdReducer;
