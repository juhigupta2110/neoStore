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

class AddAddress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addressLine: '',
      city: '',
      country: '',
      pincode: '',
      state: '',
    };
  }

  refresh = () => {
    let authKey = this.props.logger.token;
    this.props.getAddress(authKey);
    //setTimeout(this.props.refreshScreen(), 2000);
    //  dispatch(authActions.getAddressAsync(authKey));
  };

  handleClick = () => {
    let data = {
      addressLine: this.state.addressLine,
      pincode: this.state.pincode,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
    };

    this.props.addAddressFunction(
      this.props.logger.token,
      data,
      this.props.navigation,
      this.refresh,
    );
  };

  showToastMsg = (msg) => {
    Toast.show({
      text1: msg,
      visibilityTime: 800,
      position: 'bottom',
    });
  };

  render() {
    return (
      <View style={styles.mainViewStyle}>
        <Text style={styles.createAccountStyle}>Add a new address</Text>
        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Address line"
            autoCapitalize="none"
            maxLength={20}
            onChangeText={(text) => this.setState({addressLine: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="City"
            autoCapitalize="none"
            maxLength={30}
            autoCorrect={false}
            onChangeText={(text) => this.setState({city: text})}
          />

          <TextInput
            style={styles.textInputStyle}
            placeholder="Country"
            maxLength={40}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({country: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="pincode"
            keyboardType="numeric"
            maxLength={15}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({pincode: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="state"
            maxLength={15}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({state: text})}
          />

          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.handleClick()}>
            <Text style={styles.signUpTextStyle}>Add address</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  logger: state.loginReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addAddressFunction: (authKey, data, navigation, refresh) => {
      dispatch(authActions.addAddressAsync(authKey, data, navigation, refresh));
    },
    getAddress: (authKey) => {
      dispatch(authActions.getAddressAsync(authKey));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);

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
    width: wp('90%'),
    height: hp('6%'),
    marginVertical: hp('3%'),
    backgroundColor: Colors.ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
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
