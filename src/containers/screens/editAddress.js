import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  RadioButton,
  SafeAreaView,
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

class EditAddress extends React.Component {
  constructor(props) {
    super(props);

    console.log('props coming in edit address...', this.props);

    this.state = {
      addressLine: '',
      city: '',
      country: '',
      pincode: '',
      state: '',
      id: '',
    };
  }

  refresh = () => {
    let authKey = this.props.logger.token;
    this.props.getAddress(authKey);
    //setTimeout(this.props.refreshScreen(), 2000);
    //  dispatch(authActions.getAddressAsync(authKey));
  };

  handleClick = () => {
    let numPincode = +this.state.pincode;
    console.log('numPincode is ...', numPincode);

    let data = {
      addressLine: this.state.addressLine,
      pincode: numPincode,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
    };

    this.props.editAddressFunction(
      this.props.logger.token,
      this.props.route.params.id,
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
    if (this.state.addressLine === '') {
      this.setState({
        addressLine: this.props.route.params.addressLine,
        city: this.props.route.params.city,
        country: this.props.route.params.country,
        pincode: this.props.route.params.pincode,
        state: this.props.route.params.state,
        id: this.props.route.params.id,
      });
    }
    return (
      <SafeAreaView style={styles.mainViewStyle}>
        <Text style={styles.createAccountStyle}>Add a new address</Text>
        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Address line"
            autoCapitalize="none"
            maxLength={20}
            defaultValue={this.props.route.params.addressLine}
            onChangeText={(text) => this.setState({addressLine: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="City"
            autoCapitalize="none"
            maxLength={30}
            autoCorrect={false}
            defaultValue={this.props.route.params.city}
            onChangeText={(text) => this.setState({city: text})}
          />

          <TextInput
            style={styles.textInputStyle}
            placeholder="Country"
            maxLength={40}
            autoCapitalize="none"
            defaultValue={this.props.route.params.country}
            onChangeText={(text) => this.setState({country: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="pincode"
            keyboardType="numeric"
            maxLength={20}
            defaultValue={this.props.route.params.pincode}
            onChangeText={(text) => this.setState({pincode: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="state"
            maxLength={15}
            autoCapitalize="none"
            defaultValue={this.props.route.params.state}
            onChangeText={(text) => this.setState({state: text})}
          />

          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.handleClick()}>
            <Text style={styles.signUpTextStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    editAddressFunction: (authKey, addressId, data, navigation, refresh) => {
      dispatch(
        authActions.editAddressAsync(
          authKey,
          addressId,
          data,
          navigation,
          refresh,
        ),
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);

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
