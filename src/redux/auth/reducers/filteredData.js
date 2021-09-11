import * as types from '../actions/actionTypes';
const initialState = [];
const filteredData = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FILTERED_DATA:
      return [...action.payload];

    default:
      return state;
  }
};

export default filteredData;
