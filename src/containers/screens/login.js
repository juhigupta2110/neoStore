import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Toast, {BaseToast} from 'react-native-toast-message';

import {Colors} from '../../assets/styles/colors';
import * as authActions from '../../redux/auth/actions/authActions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      selectedValue: 'java',
      emailValidate: true,
      eye: false,
    };
  }

  handleValidEmail = (val) => {
    let emailChk =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailChk.test(val)) {
      this.setState({
        emailValidate: false,
      });
    } else this.setState({emailValidate: true});
  };

  handleEyeClick = () => {
    this.setState({
      eye: !this.state.eye,
    });
  };

  handleClick = () => {
    let data = {
      email: this.state.email,
      password: this.state.password,
    };

    this.state.email === '' || this.state.emailValidate === false
      ? this.showToastMsg('enter valid credentials')
      : this.props.loginFunction(data, this.props.navigation);
  };

  showToastMsg = (msg) => {
    Toast.show({
      text1: msg,
    });
  };

  render() {
    return (
      <View style={styles.mainViewStyle}>
        <Text style={styles.helloTextStyle}>Hello there!</Text>
        <Text style={styles.createAccountStyle}>Login to your Account</Text>
        <View>
          <View style={styles.passwordViewStyle}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Email"
              autoCapitalize="none"
              maxLength={30}
              autoCorrect={false}
              onEndEditing={(e) => this.handleValidEmail(e.nativeEvent.text)}
              onChangeText={(text) => this.setState({email: text})}
            />
          </View>
          {this.state.emailValidate ? null : (
            <Animatable.View
              animation="fadeInLeft"
              useNativeDriver={true}
              duration={500}
              style={styles.errorInputViewStyle}>
              <Text style={styles.errorFormInputStyle}>Invalid email</Text>
            </Animatable.View>
          )}
          <View style={styles.passwordViewStyle}>
            <TextInput
              style={styles.textInputStyle}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              secureTextEntry={this.state.eye ? false : true}
              onChangeText={(text) => this.setState({password: text})}
            />

            {this.state.eye ? (
              <Icons
                name="eye"
                color="grey"
                size={hp('2.5%')}
                style={styles.eyeIconStyle}
                onPress={this.handleEyeClick}
              />
            ) : (
              <Icons
                name="eye-off"
                color="grey"
                size={hp('2.5%')}
                style={styles.eyeIconStyle}
                onPress={this.handleEyeClick}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.handleClick()}
            //{() => this.handleClick()}
          >
            <Text style={styles.signUpTextStyle}>Login</Text>
          </TouchableOpacity>

          <View style={styles.forgetPasswordView}>
            <TouchableOpacity>
              <Text style={styles.forgetPasswordText}>Forgot passoword?</Text>
            </TouchableOpacity>
            <Text>or</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.forgetPasswordText}>
                Create a new Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {console.log(this.state.selectedValue)}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginFunction: (data, navigation) => {
      dispatch(authActions.loginAsync(data, navigation));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);

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
  errorInputViewStyle: {
    alignSelf: 'flex-start',
  },
  errorFormInputStyle: {
    color: Colors.RED,
  },
  textInputStyle: {
    marginVertical: hp('1%'),
    width: wp('80%'),
    height: hp('5%'),
    paddingLeft: wp('0.5%'),
    fontSize: 18,
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

  forgetPasswordView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetPasswordText: {
    fontSize: 16,
    color: Colors.ORANGE,
    marginHorizontal: wp('1%'),
  },
  headerText: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  menuContent: {
    color: '#000',
    fontWeight: 'bold',
    padding: 2,
    fontSize: 20,
  },
  passwordViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GREY,
  },
  eyeIconStyle: {},
});
