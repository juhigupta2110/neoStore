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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

import {Colors} from '../../assets/styles/colors';
import * as authActions from '../../redux/auth/actions/authActions';
import {apiService} from '../../libs/apiCalls';

class Register extends React.Component {
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
    };
  }

  handleClick = () => {
    let mobileNum = parseInt(this.state.mobile);

    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobile: mobileNum,
      gender: this.state.checked,
      password: this.state.password,
      confirm_password: this.state.confirmPassword,
    };

    console.log('data going...', data);

    this.props.registerFunction(data, this.props.navigation);
  };

  handleRadioButtonClick = (gender) => {
    if (gender == 'male') {
      this.setState({
        checked: 'male',
      });
    } else if (gender == 'female') {
      this.setState({
        checked: 'female',
      });
    }
  };

  render() {
    return (
      <View style={styles.mainViewStyle}>
        <Text style={styles.helloTextStyle}>Hello there!</Text>
        <Text style={styles.createAccountStyle}>Create a new Account</Text>
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
            maxLength={20}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({lastName: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Email Address"
            maxLength={25}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Password"
            maxLength={15}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({password: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Confirm Password"
            maxLength={15}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({confirmPassword: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            keyboardType="numeric"
            placeholder="Mobile number"
            maxLength={10}
            onChangeText={(text) => this.setState({mobile: text})}
          />

          <View>
            {this.state.checked == 'male' ? (
              <View style={styles.radioButtonViewStyle}>
                <Icon
                  name="radio-button-on"
                  size={24}
                  onPress={() => this.handleRadioButtonClick('male')}
                />
                <Text>Male</Text>
                <Icon
                  name="radio-button-off"
                  size={24}
                  style={styles.radioButtonIconStyle}
                  onPress={() => this.handleRadioButtonClick('female')}
                />
                <Text>Female</Text>
              </View>
            ) : this.state.checked == 'female' ? (
              <View style={styles.radioButtonViewStyle}>
                <Icon
                  name="radio-button-off"
                  size={24}
                  onPress={() => this.handleRadioButtonClick('male')}
                />
                <Text>Male</Text>
                <Icon
                  name="radio-button-on"
                  size={24}
                  style={styles.radioButtonIconStyle}
                  onPress={() => this.handleRadioButtonClick('female')}
                />
                <Text>Female</Text>
              </View>
            ) : (
              <View style={styles.radioButtonViewStyle}>
                <Icon
                  name="radio-button-off"
                  size={24}
                  onPress={() => this.handleRadioButtonClick('male')}
                />
                <Text>Male</Text>
                <Icon
                  name="radio-button-off"
                  size={24}
                  style={styles.radioButtonIconStyle}
                  onPress={() => this.handleRadioButtonClick('female')}
                />
                <Text>Female</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.handleClick()}>
            <Text style={styles.signUpTextStyle}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerFunction: (data, navigation) =>
      dispatch(authActions.registerAsync(data, navigation)),
  };
};

export default connect(null, mapDispatchToProps)(Register);

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
