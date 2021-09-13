import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  RadioButton,
  Image,
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
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

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
      loggersMobile: this.props.loggerName.mobile.toString(),
      image: this.props.loggerName.img,
    };
  }

  showToastMsg = (msg) => {
    Toast.show({
      text1: 'Profile updated',
      visibilityTime: 800,
      position: 'bottom',
    });
  };

  handleClick = () => {
    let mobileNum = parseInt(this.state.mobile);

    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobile: mobileNum,
    };

    if (
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.mobile === ''
    ) {
      Toast.show({
        text1: 'Please fill in the details',
        visibilityTime: 800,
        position: 'bottom',
      });
    } else {
      this.props.addImg(this.state.image);
      setTimeout(() => this.props.navigation.navigate('MyAccount'), 1000);
    }
  };

  onImageClick = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      this.setState({image: image.path});
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.mainViewStyle}>
        <TouchableOpacity
          style={styles.imgStyle}
          onPress={() => {
            this.onImageClick();
          }}>
          <Image source={{uri: this.state.image}} style={styles.imgStyle} />
        </TouchableOpacity>
        <Text style={styles.helloTextStyle}>edit picture</Text>

        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="First name"
            autoCapitalize="none"
            maxLength={20}
            defaultValue={this.props.loggerName.name}
            onChangeText={(text) => this.setState({firstName: text})}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Last name"
            maxLength={25}
            autoCapitalize="none"
            defaultValue={this.props.loggerName.lastName}
            onChangeText={(text) => this.setState({lastName: text})}
          />

          <TextInput
            style={styles.textInputStyle}
            keyboardType="numeric"
            placeholder="Mobile number"
            maxLength={10}
            defaultValue={this.state.loggersMobile}
            onChangeText={(text) => this.setState({mobile: text})}
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
  loggerName: state.loginReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addImg: (data) => {
      dispatch(authActions.addImgProfile(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

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
  imgStyle: {
    width: wp('30%'),
    height: hp('14%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: Colors.GREY,
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
