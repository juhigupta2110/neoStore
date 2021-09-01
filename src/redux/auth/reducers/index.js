import {combineReducers} from 'redux';
import loginReducer from './authReducer';
import allProductsReducer from './allProducts';
import allCategoryReducer from './allCategory';
import allColorReducer from './allColor';

export default combineReducers({
  loginReducer,
  allProductsReducer,
  allCategoryReducer,
  allColorReducer,
});
