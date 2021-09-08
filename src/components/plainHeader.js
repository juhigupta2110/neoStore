import React from 'react';

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

const PlainHeader = (props) => {
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
  console.log('props in plain header..', props);
  return (
    <View>
      <View style={styles.mainViewStyle}>
        <View style={styles.leftViewStyle}>
          <Icon
            name="arrow-left"
            size={30}
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View style={styles.pageNameViewStyle}>
          <Text style={styles.pageNameTextStyle}>{props.route.name}</Text>
        </View>
        <View style={styles.rightViewStyle}>
          <Icons name="cart-outline" size={30} onPress={() => clickHandler()} />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  logger: state.loginReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (authKey) => {
      dispatch(authActions.getCart(authKey));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlainHeader);

const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: Colors.tabYellowColor,
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingHorizontal: wp('2%'),
    // paddingTop: hp('5%'),
  },
  leftViewStyle: {
    flex: 4,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  rightViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: wp('3%'),
  },
  searchViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.DisabledButton,
    width: wp('93%'),
    height: hp('4.5%'),
    borderRadius: 2,
    marginLeft: wp('3%'),
    marginBottom: hp('1.5%'),
  },
  searchStyle: {
    width: wp('80%'),
    height: hp('4.5%'),

    paddingHorizontal: wp('2%'),
    fontSize: 18,
  },
  pageNameViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('20%'),
  },
  pageNameTextStyle: {
    fontSize: 20,
  },
});
