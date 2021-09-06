import * as React from 'react';

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
import RenderOrderItem from '../../components/renderOrderItem';
import RenderOrderItemProduct from '../../components/renderOrderItemProduct';
import {ImATeapot} from 'http-errors';

const ViewOrderProducts = (props) => {
  console.log(
    'props coming in viewOrderProducts...',
    props.route.params.products,
  );
  return (
    <View style={styles.flatlistStyle}>
      <FlatList
        data={props.route.params.products}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <RenderOrderItemProduct
            quantity={item.quantity}
            img={item.productId.mainImage}
            name={item.productId.name}
            price={item.productId.price}
          />
        )}
      />
    </View>
  );
};
export default ViewOrderProducts;

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
