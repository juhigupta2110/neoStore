import React, {Component} from 'react';

import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './src/redux/auth/reducers/index';
import loginReducer from './src/redux/auth/reducers/authReducer';
import allReducers from './src/redux/auth/reducers/index';
import {rootSaga} from './src/redux/auth/sagas/authSaga';
import Toast from 'react-native-toast-message';

import DrawerNavigations from './src/containers/navigation/AppNavigations';
import Login from './src/containers/screens/login';
import createSagaMiddleware from '@redux-saga/core';

const SagaMiddleware = createSagaMiddleware();

const store = createStore(allReducers, applyMiddleware(SagaMiddleware));

SagaMiddleware.run(rootSaga);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DrawerNavigations />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    );
  }
}
