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

const PlainHeader = (props) => {
  //const [orderIdPart, setOrderIdPart] = useState(props.orderId.)

  const clickHandler = () => {
    if (props.logger.token === '') {
      Toast.show({
        text1: 'Please login first',
        visibilityTime: 800,
        position: 'bottom',
      });
    } else {
      props.getCart(props.logger.token);
      props.navi.navigate('Cart');
    }
  };
  console.log('props in plain header..', props);
  return (
    <SafeAreaView style={{backgroundColor: Colors.tabYellowColor}}>
      <View style={styles.mainViewStyle}>
        <View style={styles.leftViewStyle}>
          <Icon
            name="arrow-left"
            size={30}
            onPress={() => props.navi.goBack()}
          />
        </View>
        <View style={styles.midViewStyle}>
          <Text style={styles.midTextStyle}>
            {props.headingName === 'ViewOrderProducts'
              ? `Order no. : ${props.orderId.slice(0, 8)}.....`
              : props.headingName}
          </Text>
        </View>

        <View style={styles.rightViewStyle}>
          {props.cartVisible ? (
            <Icons
              name="cart-outline"
              size={30}
              onPress={() => clickHandler()}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  logger: state.loginReducer,
  orderId: state.orderIdReducer,
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
    // backgroundColor: Colors.HeaderColor1,
    height: hp('7%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    backgroundColor: Colors.HeaderColor1,
    // paddingTop: hp('1%'),
    // marginTop: hp('3%'),
  },
  leftViewStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  rightViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  midViewStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  midTextStyle: {
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: 'bold',
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
