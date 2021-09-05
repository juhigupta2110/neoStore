import React, {useEffect, useState} from 'react';

import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as authActions from '../../redux/auth/actions/authActions';
import {Colors} from '../../assets/styles/colors';
import RenderAddressItem from '../../components/renderAddressItem';

export default function ViewOrder(props) {
  console.log('i think it restarted...');
  console.log('inside view orders');
  const dispatch = useDispatch();

  //const addresses = useSelector((state) => state.getAddressReducer);
  const authKey = useSelector((state) => state.loginReducer.token);

  useEffect(() => {
    dispatch(authActions.viewOrdersAsync(authKey));
  }, [dispatch]);

  setTimeout(() => {
    const orders = useSelector((state) => state.allOrdersReducer);
  }, 3000);

  //   const handleAddAddress = () => {
  //     props.navigation.navigate('AddAddress');
  //   };

  return (
    <View style={styles.flatlistStyle}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <RenderOrderItem
            id={item._id}
            items={item.items}
           
            {...props}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addAddressViewStyle}
        onPress={() => handleAddAddress()}>
        <Text style={styles.addAddressTextStyle}>Add Another Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addAddressViewStyle: {
    width: wp('60%'),
    height: hp('4%'),
    backgroundColor: Colors.ORANGE,
    alignSelf: 'center',
    marginVertical: hp('2%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAddressTextStyle: {
    fontSize: 20,
    color: Colors.WHITE,
  },
  flatlistStyle: {
    height: hp('85%'),
  },
});
