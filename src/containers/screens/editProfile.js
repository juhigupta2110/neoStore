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

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: 123456,
      emailValidate: true,
      eye: false,
    };
  }

  showToastMsg = (msg) => {
    Toast.show({
      text1: 'Profile updated',
    });
  };

  handleClick = () => {
    let mobileNum = parseInt(this.state.mobile);

    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobile: mobileNum,
    };
  };

  render() {
    return (
      <View style={styles.mainViewStyle}>
        <Text style={styles.createAccountStyle}>Edit Profile</Text>
        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="First name"
            autoCapitalize="none"
            maxLength={20}
            onChangeText={(text) => this.setState({firstName: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Last name"
            maxLength={25}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({lastName: text})}
          />

          <TextInput
            style={styles.textInputStyle}
            keyboardType="numeric"
            placeholder="Mobile number"
            maxLength={10}
            onChangeText={(text) => this.setState({mobile: text})}
          />

          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.handleClick()}>
            <Text style={styles.signUpTextStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(null, mapDispatchToProps)(EditProfile);

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
