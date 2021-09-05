import * as types from '../actions/actionTypes';
const initialState = [];
const getAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ADDRESS:
      return [...action.payload];

    default:
      return state;
  }
};

export default getAddressReducer;
