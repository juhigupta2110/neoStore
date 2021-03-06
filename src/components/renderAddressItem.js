import * as React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import * as authActions from '../redux/auth/actions/authActions';

import {Colors} from '../assets/styles/colors';

class RenderAddressItems extends React.Component {
  constructor(props) {
    super(props);
  }

  editAddress = () => {
    let pin = this.props.pincode;
    let strPincode = pin.toString();

    this.props.navigation.navigate('EditAddress', {
      addressLine: this.props.addressLine,
      city: this.props.city,
      pincode: strPincode,
      state: this.props.state,
      country: this.props.country,
      id: this.props.id,
    });
  };

  deleteAddress = () => {
    let authKey = this.props.logger.token;
    this.props.deleteAddress(authKey, this.props.id, this.refresh);
  };

  refresh = () => {
    let authKey = this.props.logger.token;
    this.props.getAddress(authKey);
  };

  onSelectingAddress = () => {
    let pin = this.props.pincode;
    let strPincode = pin.toString();

    this.props.navigation.navigate('PlaceOrder', {
      addressLine: this.props.addressLine,
      city: this.props.city,
      pincode: strPincode,
      state: this.props.state,
      country: this.props.country,
      id: this.props.id,
    });
  };

  render() {
    return (
      <View style={styles.topMainCompStyle}>
        <View style={styles.mainCompStyle}>
          <TouchableOpacity
            style={{marginBottom: hp('2%')}}
            onPress={() => this.onSelectingAddress()}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {this.props.addressLine}--{this.props.city}
            </Text>
            <Text style={{textAlign: 'left'}}> {this.props.pincode}</Text>
            <Text>
              {this.props.state},{this.props.country}
            </Text>
          </TouchableOpacity>
          <View style={styles.iconViewStyle}>
            <Icon
              name="trash-outline"
              size={22}
              onPress={() => {
                Alert.alert('Delete this address?', '', [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      //this.setState({logout: false});
                      //this.onClick();
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      //this.setState({logout: true});
                      this.deleteAddress();
                    },
                  },
                ]);
              }}
            />
            <Icon
              name="create-outline"
              size={22}
              onPress={() => this.editAddress()}
            />
          </View>
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
    deleteAddress: (authKey, addressId, refresh) => {
      dispatch(authActions.deleteAddressAsync(authKey, addressId, refresh));
    },
    getAddress: (authKey) => {
      dispatch(authActions.getAddressAsync(authKey));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RenderAddressItems);

const styles = StyleSheet.create({
  topMainCompStyle: {
    height: hp('12%'),
    width: wp('93%'),
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
  },
  mainCompStyle: {
    flexDirection: 'row',
    width: wp('93%'),
    height: hp('10%'),
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconViewStyle: {
    justifyContent: 'space-between',
    width: wp('8%'),
    height: hp('10%'),
    alignItems: 'center',
  },
  minusQuantityViewStyle: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHTGREY,
  },
  updateViewStyle: {
    flexDirection: 'row',
    width: wp('30%'),
    height: hp('5%'),
    marginTop: -60,
    marginLeft: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
