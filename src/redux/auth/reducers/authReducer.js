import * as types from '../actions/actionTypes';
const initialState = {name: ''};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        name: action.payload,
      };

    case types.ERROR:
      return state;

    default:
      return state;
  }
};

export default loginReducer;
