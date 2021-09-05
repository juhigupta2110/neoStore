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

    console.log('props in renderItems...', this.props);

    this.state = {
      quantity: this.props.quantity,
    };
  }

  updateQuantity = (todo) => {
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

    console.log('quantity going for update cart....', data);
    console.log('token going for update cart....', this.props.logger.token);
    console.log('product id going for update cart....', this.props.id);

    this.props.updateQuant(
      this.props.logger.token,
      this.props.id,
      data,
      this.refreshCart,
    );

    //setTimeout(this.props.onChange, 3000);
  };

  refreshCart = () => {
    console.log('refreshCart called..');
    this.props.getCart(this.props.logger.token);
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
            <View style={{marginBottom: 5}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {this.props.productName}--{this.props.id}
              </Text>
            </View>
            <Text style={{textAlign: 'left'}}>price: {this.props.price}</Text>
          </View>

          <View style={styles.iconViewStyle}>
            <Icon name="trash-outline" size={22} />
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
