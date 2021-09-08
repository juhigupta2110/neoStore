import React, {useState} from 'react';

import {View, Text, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';

import {Colors} from '../assets/styles/colors';
import * as authActions from '../redux/auth/actions/authActions';

const Header = (props) => {
  const clickHandler = () => {
    if (props.logger.token === '') {
      Toast.show({
        text1: 'Please login first',
        visibilityTime: 800,
        position: 'bottom',
      });
    } else {
      props.getCart(props.logger.token);
      props.navigation.navigate('Cart');
    }
  };

  return (
    <View>
      <View style={styles.mainViewStyle}>
        <View style={styles.leftViewStyle}>
          <Icon
            name="menu"
            size={30}
            onPress={() => props.navigation.openDrawer()}
          />
        </View>
        <View style={styles.rightViewStyle}>
          <Icons name="cart-outline" size={30} onPress={() => clickHandler()} />
        </View>
      </View>

      {/* <View style={styles.searchViewStyle}>
        <TextInput
          style={styles.searchStyle}
          placeholder="Search NeoStore"
          maxLength={30}
        />

        <Icons name="search-outline" size={30} />
      </View> */}
    </View>
  );
};

const mapStateToProps = (state) => ({
  logger: state.loginReducer,
  data: state.allProductsReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (authKey) => {
      dispatch(authActions.getCart(authKey));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  mainViewStyle: {
    // backgroundColor: Colors.HeaderColor1,
    height: hp('5%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('1%'),
    marginTop: hp('3%'),
  },
  leftViewStyle: {
    flex: 4,
    flexDirection: 'row',
  },
  rightViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  searchViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.DisabledButton,
    width: wp('93%'),
    height: hp('5.5%'),
    borderRadius: 2,
    marginLeft: wp('3%'),
    marginVertical: hp('1%'),
  },
  searchStyle: {
    width: wp('80%'),
    height: hp('6.5%'),
    paddingHorizontal: wp('2%'),
    paddingTop: hp('2%'),
    fontSize: 18,
    //marginTop: hp('1%'),
  },
});
