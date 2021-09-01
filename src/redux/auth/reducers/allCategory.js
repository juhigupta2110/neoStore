import * as types from '../actions/actionTypes';
const initialState = [];
const allCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY:
      return [...action.payload];

    default:
      return state;
  }
};

export default allCategoryReducer;
