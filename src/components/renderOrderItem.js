import * as React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
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

class RenderOrderItems extends React.Component {
  constructor(props) {
    super(props);
    console.log('props coming in here...', this.props);
  }

  onClick = () => {
    this.props.navigation.navigate('ViewOrderProducts', {
      products: this.props.products,
    });
  };

  render() {
    return (
      <View style={styles.topMainCompStyle}>
        <View style={styles.mainCompStyle}>
          <TouchableOpacity
            style={{marginBottom: 5}}
            onPress={() => this.onClick()}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              ORDER ID--{this.props.id}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              ORDER Date--{this.props.orderDate}
            </Text>

            {/* <FlatList
              data={this.props.items}
              renderItem={({item}) => <RenderOrderItemProduct />}
              keyExtractor={(item) => item._id}
            /> */}
          </TouchableOpacity>
          {/* <View style={styles.iconViewStyle}>
            <Icon
              name="trash-outline"
              size={22}
              onPress={() => this.deleteAddress()}
            />
            <Icon
              name="create-outline"
              size={22}
              onPress={() => this.editAddress()}
            />
          </View> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(RenderOrderItems);

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
  imgStyle: {
    width: 80,
    height: 90,
    backgroundColor: '#c6c2c2',
    borderRadius: 10,
    marginRight: 10,
  },

  contentStyle: {
    width: 210,
    marginLeft: 10,
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
