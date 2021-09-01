import * as types from '../actions/actionTypes';

const loginReducer = (state = {email: ''}, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        email: action.payload,
      };

    case types.ERROR:
      return state;

    default:
      return state;
  }
};

export default loginReducer;
