import * as types from '../actions/actionTypes';
const initialState = [];
const allColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COLOR:
      return [...action.payload];

    default:
      return state;
  }
};

export default allColorReducer;
