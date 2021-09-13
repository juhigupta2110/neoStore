import * as types from '../actions/actionTypes';
const initialState = {
  name: '',
  token: '',
  lastName: '',
  mobile: 0,
  img: 'https://cdn3.vectorstock.com/i/thumb-large/17/97/human-icon-vector-2761797.jpg',
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        name: action.payload.name,
        token: action.payload.token,
        lastName: action.payload.lastName,
        mobile: action.payload.mobile,
        img: 'https://cdn3.vectorstock.com/i/thumb-large/17/97/human-icon-vector-2761797.jpg',
      };

    case types.ADD_IMG:
      return {
        ...state,
        img: action.payload,
      };

    case types.LOGOUT:
      return {
        name: '',
        token: '',
      };

    case types.ERROR:
      return state;

    default:
      return state;
  }
};

export default loginReducer;
