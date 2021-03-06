import {combineReducers} from 'redux';
import loginReducer from './authReducer';
import allProductsReducer from './allProducts';
import allCategoryReducer from './allCategory';
import allColorReducer from './allColor';
import getCartReducer from './getCart';
import getAddressReducer from './getAddress';
import allOrdersReducer from './allOrders';
import productsOrdered from './productsOrdered';
import filteredCategory from './fiteredCategory';
import filteredData from './filteredData';
import orderIdReducer from './orderIdReducer';
import orderPlacedIdReducer from './orderPlacedId';

export default combineReducers({
  loginReducer,
  allProductsReducer,
  allCategoryReducer,
  allColorReducer,
  getCartReducer,
  getAddressReducer,
  allOrdersReducer,
  productsOrdered,
  filteredCategory,
  filteredData,
  orderIdReducer,
  orderPlacedIdReducer,
});
