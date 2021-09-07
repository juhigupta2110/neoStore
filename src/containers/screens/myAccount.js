import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  RadioButton,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Toast, {BaseToast} from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';

import {Colors} from '../../assets/styles/colors';
import * as authActions from '../../redux/auth/actions/authActions';
import {apiService} from '../../libs/apiCalls';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainViewStyle}>
        <View>
          <Text style={styles.createAccountStyle}>My Account </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.props.navigation.navigate('ViewOrder')}>
            <Text style={styles.signUpTextStyle}>Order History</Text>
            <Icon name="arrow-forward" size={22} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.props.navigation.navigate('Cart')}>
            <Text style={styles.signUpTextStyle}>My Cart</Text>
            <Icon name="arrow-forward" size={22} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.props.navigation.navigate('ShippingAddresses')}>
            <Text style={styles.signUpTextStyle}>Shipping Address</Text>
            <Icon name="arrow-forward" size={22} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.props.navigation.navigate('EditProfile')}>
            <Text style={styles.signUpTextStyle}>Edit Profile</Text>
            <Icon name="arrow-forward" size={22} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.props.navigation.navigate('ResetPassword')}>
            <Text style={styles.signUpTextStyle}>Reset Password</Text>
            <Icon name="arrow-forward" size={22} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(null, mapDispatchToProps)(MyAccount);

const styles = StyleSheet.create({
  mainViewStyle: {
    paddingTop: hp('2%'),
    alignItems: 'center',
  },
  helloTextStyle: {
    color: Colors.GREY,
  },
  createAccountStyle: {
    fontSize: 22,

    marginBottom: hp('3%'),
  },
  textInputStyle: {
    marginVertical: hp('1%'),
    width: wp('90%'),
    height: hp('5%'),
    paddingLeft: wp('0.5%'),
    fontSize: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GREY,
  },
  errorInputViewStyle: {
    alignSelf: 'flex-start',
  },
  errorFormInputStyle: {
    color: Colors.RED,
  },
  signUpStyle: {
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    width: wp('90%'),
    height: hp('6%'),
    borderRadius: 5,
    marginVertical: hp('3%'),
    backgroundColor: Colors.ORANGE,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  signUpTextStyle: {
    fontSize: 18,
    color: Colors.WHITE,
  },
  radioButtonViewStyle: {
    marginVertical: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonIconStyle: {
    marginLeft: wp('2%'),
  },
});
