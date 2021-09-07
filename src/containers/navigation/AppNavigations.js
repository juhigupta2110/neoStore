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
import PlaceOrder from '../screens/placeOrder';
import ViewOrder from '../screens/viewOrders';
import ViewOrderProducts from '../screens/viewOrderProducts';
import ShippingAddresses from '../screens/shippingAddresses';
import ResetPassword from '../screens/resetPassword';
import EditProfile from '../screens/editProfile';
import AddAddress from '../screens/addAddress';
import EditAddress from '../screens/editAddress';
import myAccount from '../screens/myAccount';
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
        headerShown: true,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="AllProducts"
        component={AllProducts}
        options={{header: (props) => <Header {...props} />}}
      />

      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="PlaceOrder"
        component={PlaceOrder}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="ShippingAddresses"
        component={ShippingAddresses}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddress}
        options={{header: (props) => <PlainHeader {...props} />}}
      />

      <Stack.Screen
        name="ViewOrder"
        component={ViewOrder}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="ViewOrderProducts"
        component={ViewOrderProducts}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="MyAccount"
        component={myAccount}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{header: (props) => <PlainHeader {...props} />}}
      />
    </Stack.Navigator>
  );
};

// const StackCartNavigations = () => {
//   <Stack.Navigator
//     initialRouteName="Cart"
//     screenOptions={{
//       headerShown: false,
//     }}>
//     <Stack.Screen name="Cart" component={Cart} options={{}} />
//     <Stack.Screen name="PlaceOrder" component={PlaceOrder} options={{}} />
//     <Stack.Screen
//       name="ShippingAddresses"
//       component={ShippingAddresses}
//       options={{}}
//     />
//     <Stack.Screen name="AddAddress" component={AddAddress} options={{}} />
//     <Stack.Screen name="EditAddress" component={EditAddress} options={{}} />
//   </Stack.Navigator>;
// };

// const StackOrderNavigations = () => {
//   <Stack.Navigator
//     initialRouteName="ViewOrder"
//     screenOptions={{
//       headerShown: false,
//     }}>
//     <Stack.Screen name="ViewOrder" component={ViewOrder} options={{}} />
//     <Stack.Screen
//       name="ViewOrderProducts"
//       component={ViewOrderProducts}
//       options={{}}
//     />
//   </Stack.Navigator>;
// };

const DrawerNavigations = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="StackNavigations"
        screenOptions={{headerShown: false}}
        drawerContent={(props) => <DrawableContent {...props} />}>
        <Drawer.Screen
          name="StackNavigations"
          component={StackNavigations}
          options={
            {
              // header: (props) => <Header {...props} />,
            }
          }
        />

        {/* <Drawer.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            header: (props) => <PlainHeader {...props} />,
          }}
        /> */}
        {/* <Drawer.Screen
          name="Cart"
          component={Cart}
          options={{
            header: (props) => <PlainHeader {...props} />,
          }}
        />
        <Drawer.Screen
          name="PlaceOrder"
          component={PlaceOrder}
          options={{
            header: (props) => <PlainHeader {...props} />,
          }}
        />
        <Drawer.Screen
          name="ShippingAddresses"
          component={ShippingAddresses}
          options={{
            header: (props) => <PlainHeader {...props} />,
          }}
        />
        <Drawer.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            header: (props) => <PlainHeader {...props} />,
          }}
        />
        <Drawer.Screen
          name="EditAddress"
          component={EditAddress}
          options={{
            header: (props) => <PlainHeader {...props} />,
          }}
        /> */}
        {/* <Drawer.Screen
          name="ViewOrder"
          component={ViewOrder}
          options={{
            header: (props) => <PlainHeader {...props} />,
          }}
        />
        <Drawer.Screen
          name="ViewOrderProducts"
          component={ViewOrderProducts}
          options={{
            header: (props) => <PlainHeader {...props} />,
          }}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigations;
