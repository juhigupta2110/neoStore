import {combineReducers} from 'redux';
import loginReducer from './authReducer';
import allProductsReducer from './allProducts';
import allCategoryReducer from './allCategory';
import allColorReducer from './allColor';
import getCartReducer from './getCart';

export default combineReducers({
  loginReducer,
  allProductsReducer,
  allCategoryReducer,
  allColorReducer,
  getCartReducer,
});
