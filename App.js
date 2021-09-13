import React, {Component} from 'react';

import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import rootReducer from './src/redux/auth/reducers/index';
import loginReducer from './src/redux/auth/reducers/authReducer';
import allReducers from './src/redux/auth/reducers/index';
import {rootSaga} from './src/redux/auth/sagas/authSaga';
import Toast from 'react-native-toast-message';

import DrawerNavigations from './src/containers/navigation/AppNavigations';
import Login from './src/containers/screens/login';
import createSagaMiddleware from '@redux-saga/core';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const SagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(persistedReducer, applyMiddleware(SagaMiddleware));

SagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DrawerNavigations />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </PersistGate>
      </Provider>
    );
  }
}
