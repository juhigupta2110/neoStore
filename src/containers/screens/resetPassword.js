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
import {apiService} from '../../libs/apiCalls';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: '',
      new_password: '',
      confirmNewPassword: '',
      eye: false,
      eyeOldPswd: false,
      eyeNewPswd: false,
      eyeCnfrmPswd: false,
    };
  }

  handleEyeClick = (val) => {
    if (val === 'eyeOldPswd') {
      this.setState({
        eyeOldPswd: !this.state.eyeOldPswd,
      });
    } else if (val === 'eyeNewPswd') {
      this.setState({
        eyeNewPswd: !this.state.eyeNewPswd,
      });
    } else if (val === 'eyeCnfrmPswd') {
      this.setState({
        eyeCnfrmPswd: !this.state.eyeCnfrmPswd,
      });
    }
  };

  handleClick = () => {
    if (
      this.state.new_password === this.state.confirmNewPassword &&
      this.state.new_password !== '' &&
      this.state.old_password !== null
    ) {
      let authKey = this.props.logger.token;
      let data = {
        password: this.state.old_password,
        newPassword: this.state.confirmNewPassword,
      };
      this.props.changePassword(data, authKey);
    } else {
      Toast.show({
        text1: 'enter valid credentials',
        visibilityTime: 800,
        position: 'bottom',
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.mainViewStyle}>
        <View>
          <View style={styles.passwordViewStyle}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Old password"
              autoCapitalize="none"
              secureTextEntry={this.state.eyeOldPswd ? false : true}
              maxLength={20}
              onChangeText={(text) => this.setState({old_password: text})}
            />
            {this.state.eyeOldPswd ? (
              <Icons
                name="eye"
                color="grey"
                size={hp('2.5%')}
                style={styles.eyeIconStyle}
                onPress={() => this.handleEyeClick('eyeOldPswd')}
              />
            ) : (
              <Icons
                name="eye-off"
                color="grey"
                size={hp('2.5%')}
                style={styles.eyeIconStyle}
                onPress={() => this.handleEyeClick('eyeOldPswd')}
              />
            )}
          </View>

          <View style={styles.passwordViewStyle}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="New password"
              maxLength={25}
              secureTextEntry={this.state.eyeNewPswd ? false : true}
              autoCapitalize="none"
              onChangeText={(text) => this.setState({new_password: text})}
            />

            {this.state.eyeNewPswd ? (
              <Icons
                name="eye"
                color="grey"
                size={hp('2.5%')}
                style={styles.eyeIconStyle}
                onPress={() => this.handleEyeClick('eyeNewPswd')}
              />
            ) : (
              <Icons
                name="eye-off"
                color="grey"
                size={hp('2.5%')}
                style={styles.eyeIconStyle}
                onPress={() => this.handleEyeClick('eyeNewPswd')}
              />
            )}
          </View>

          <View style={styles.passwordViewStyle}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Confirm new password"
              maxLength={10}
              secureTextEntry={this.state.eyeCnfrmPswd ? false : true}
              onChangeText={(text) => this.setState({confirmNewPassword: text})}
            />
            {this.state.eyeCnfrmPswd ? (
              <Icons
                name="eye"
                color="grey"
                size={hp('2.5%')}
                style={styles.eyeIconStyle}
                onPress={() => this.handleEyeClick('eyeCnfrmPswd')}
              />
            ) : (
              <Icons
                name="eye-off"
                color="grey"
                size={hp('2.5%')}
                style={styles.eyeIconStyle}
                onPress={() => this.handleEyeClick('eyeCnfrmPswd')}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.signUpStyle}
            onPress={() => this.handleClick()}>
            <Text style={styles.signUpTextStyle}>Reset</Text>
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
    changePassword: (data, authKey) =>
      dispatch(authActions.changePasswordAsync(data, authKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

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
  eyeIconStyle: {
    marginLeft: -wp('10%'),
  },
  passwordViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
