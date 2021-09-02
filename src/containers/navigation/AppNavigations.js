import React, {Component} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from '../screens/login';
import Register from '../screens/register';
import AllProducts from '../screens/allProducts';
import ProductDetail from '../screens/productDetail';
import Cart from '../screens/cart';
import Header from '../../components/header';
import PlainHeader from '../../components/plainHeader';
import CreateAccount from '../screens/createAccount';
import DrawableContent from '../../components/drawableContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigations = () => {
  return (
    <Stack.Navigator
      initialRouteName="AllProducts"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} options={{}} />
      <Stack.Screen name="Register" component={Register} options={{}} />
      <Stack.Screen name="AllProducts" component={AllProducts} options={{}} />

      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{}}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigations = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{}}
        drawerContent={(props) => <DrawableContent {...props} />}>
        <Drawer.Screen
          name="StackNavigations"
          component={StackNavigations}
          options={{
            header: (props) => <Header {...props} />,
          }}
        />
        <Drawer.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            header: (props) => <PlainHeader {...props} />,
          }}
        />
        <Drawer.Screen
          name="Cart"
          component={Cart}
          options={{
            header: (props) => <PlainHeader {...props} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigations;
