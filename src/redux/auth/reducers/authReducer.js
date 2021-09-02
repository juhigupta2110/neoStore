import * as types from '../actions/actionTypes';
const initialState = {name: '', token: ''};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        name: action.payload.name,
        token: action.payload.token,
      };

    case types.ERROR:
      return state;

    default:
      return state;
  }
};

export default loginReducer;
