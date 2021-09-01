import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker,
} from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

import {Colors} from '../../assets/styles/colors';
import * as authActions from '../../redux/auth/actions/authActions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      selectedValue: 'java',
    };
  }

  handleClick = () => {
    let data = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginFunction(data, this.props.navigation);
  };

  render() {
    return (
      <View style={styles.mainViewStyle}>
        <Text style={styles.helloTextStyle}>Hello there!</Text>
        <Text style={styles.createAccountStyle}>Login to your Account</Text>
        <View>
          <TextInput
            style={styles.textInputStyle}
            autoCapitalize="none"
            placeholder="Email Address"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={(text) => this.setState({password: text})}
          />

          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.handleClick()}>
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
});
