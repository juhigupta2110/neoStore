import * as React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import * as authActions from '../redux/auth/actions/authActions';

import {Colors} from '../assets/styles/colors';

class RenderCartItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.quantity,
    };
  }

  updateQuantity = (todo) => {
    //this.props.refreshScreen();
    let data;
    if (todo === 'plus') {
      data = {
        quantity: this.props.quantity + 1,
      };
    } else if (todo === 'minus') {
      data = {
        quantity: this.props.quantity - 1,
      };
    }

    this.props.updateQuant(
      this.props.logger.token,
      this.props.id,
      data,
      this.refreshCart,
    );
  };

  refreshCart = () => {
    this.props.getCart(this.props.logger.token);
  };

  deleteProduct = () => {
    this.props.deleteFromCart(
      this.props.logger.token,
      this.props.id,
      this.refreshCart,
    );
  };

  render() {
    return (
      <View style={styles.topMainCompStyle}>
        <View style={styles.mainCompStyle}>
          <View style={styles.imgStyle}>
            <Image
              source={{
                uri: this.props.imageUrl,
              }}
              style={styles.imgStyle}
            />
          </View>

          <View style={styles.contentStyle}>
            <View style={{marginBottom: hp('2%')}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {this.props.productName}--{this.props.id}
              </Text>
            </View>
            <Text style={{textAlign: 'left'}}>price: {this.props.price}</Text>
          </View>

          <View style={styles.iconViewStyle}>
            <Icon
              name="trash-outline"
              size={22}
              onPress={() => this.deleteProduct()}
            />
          </View>
        </View>

        <View style={styles.updateViewStyle}>
          <View style={styles.minusQuantityViewStyle}>
            <Icon
              name="remove"
              size={22}
              onPress={() => this.updateQuantity('minus')}
            />
          </View>
          <View
            style={[
              styles.minusQuantityViewStyle,
              {backgroundColor: Colors.WHITE},
            ]}>
            <Text>{this.props.quantity}</Text>
          </View>
          <View style={styles.minusQuantityViewStyle}>
            <Icon
              name="add"
              size={22}
              onPress={() => this.updateQuantity('plus')}
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
    updateQuant: (authKey, productId, data, refreshCart) => {
      dispatch(
        authActions.updateQuantityAsync(authKey, productId, data, refreshCart),
      );
    },
    getCart: (authKey) => {
      dispatch(authActions.getCart(authKey));
    },
    deleteFromCart: (authKey, productId, refreshCart) => {
      dispatch(
        authActions.deleteCartItemAsync(authKey, productId, refreshCart),
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderCartItems);

const styles = StyleSheet.create({
  topMainCompStyle: {
    height: hp('17%'),
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
    height: hp('15%'),
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
  },
  imgStyle: {
    width: wp('20%'),
    height: hp('15%'),
    backgroundColor: '#c6c2c2',
    borderRadius: 10,
    marginRight: wp('2%'),
  },

  contentStyle: {
    width: 210,
    marginLeft: 10,
  },
  iconViewStyle: {
    alignSelf: 'flex-start',
    width: 26,
    height: 26,
    borderRadius: 5,
    marginLeft: wp('5%'),
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
