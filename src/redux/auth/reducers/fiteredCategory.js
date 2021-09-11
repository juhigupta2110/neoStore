import * as types from '../actions/actionTypes';
const initialState = '';
const filteredCategory = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SELECTED_CATEGORY:
      return action.payload;

    default:
      return state;
  }
};

export default filteredCategory;
