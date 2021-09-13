import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Colors} from '../../assets/styles/colors';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.mainViewStyle}>
        <Text style={styles.helloTextStyle}>Hello there!</Text>
        <Text style={styles.createAccountStyle}>CREATE AN ACCOUNT</Text>

        <View>
          <TouchableOpacity
            style={[styles.loginLinkStyle, {backgroundColor: Colors.RED}]}>
            <Icon name="logo-google" size={25} color={Colors.WHITE} />
            <Text style={styles.loginLinkTextStyle}>Login with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginLinkStyle, {backgroundColor: Colors.BLUE}]}>
            <Icon name="logo-facebook" size={25} color={Colors.WHITE} />
            <Text style={styles.loginLinkTextStyle}>Login with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.loginLinkStyle,
              {backgroundColor: Colors.LIGHTBLUE},
            ]}>
            <Icon name="logo-twitter" size={25} color={Colors.WHITE} />
            <Text style={[styles.loginLinkTextStyle, {}]}>
              Login with Twitter
            </Text>
          </TouchableOpacity>
          <View style={styles.usingEmailViewStyle}>
            <Text>Or use your e-mail</Text>
          </View>
          <View style={styles.buttonViewStyle}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.buttonTextStyle}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default CreateAccount;

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    paddingTop: hp('2%'),
    alignItems: 'center',
    backgroundColor: Colors.LIGHTGREY,
  },
  helloTextStyle: {
    color: Colors.GREY,
  },
  createAccountStyle: {
    fontSize: 22,
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
  },
  loginLinkStyle: {
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    marginVertical: hp('2%'),
    width: wp('75%'),
    height: hp('5%'),
    flexDirection: 'row',
  },
  loginLinkTextStyle: {
    color: Colors.WHITE,
    paddingLeft: wp('5%'),
    letterSpacing: 1,
    fontSize: 18,
  },
  usingEmailViewStyle: {
    justifyContent: 'center',
    marginTop: hp('1%'),
    flexDirection: 'row',
  },
  buttonViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp('2.5%'),
  },
  buttonStyle: {
    width: wp('32%'),
    height: hp('5%'),
    borderWidth: 1,
    borderColor: Colors.GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    letterSpacing: 1,
    fontSize: 18,
  },
});
