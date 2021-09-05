import * as React from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import Toast, {BaseToast} from 'react-native-toast-message';

import {Colors} from '../../assets/styles/colors';
import * as authActions from '../../redux/auth/actions/authActions';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  clickHandler = () => {
    let data = {
      productId: this.props.route.params.id,
      quantity: this.state.quantity,
    };
    let authKey = this.props.logger.token;

    this.props.addThisToCart(data, authKey);
  };

  render() {
    return (
      <View style={styles.mainCompStyle}>
        <View>
          <Image
            source={{
              uri: this.props.route.params.subs[0],
            }}
            style={styles.imgStyle}
          />
        </View>

        <View style={styles.contentStyle}>
          <View>
            <Text style={styles.contentTextStyle}>
              {this.props.route.params.productName}
            </Text>
            <Text style={styles.contentDescriptionStyle}>
              {this.props.route.params.description}
            </Text>
            <Text style={styles.contentDescriptionStyle}>
              {this.props.route.params.features}
            </Text>
            <Text style={styles.contentPriceStyle}>
              Rs. {this.props.route.params.price}
            </Text>
          </View>
        </View>

        <View style={styles.cartRatingViewStyle}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.props.route.params.stars}
            starSize={18}
            fullStarColor={Colors.tabYellowColor}
            //selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
        </View>

        <View style={styles.addQuantityViewStyle}>
          <Text style={styles.incrementTextStyle}>Add quantity</Text>
          <View style={styles.incrementViewStyle}>
            <TouchableOpacity
              style={[styles.incrementStyle, {flex: 1}]}
              onPress={() => {
                if (this.state.quantity < 5) {
                  this.setState({quantity: this.state.quantity + 1});
                }
              }}>
              <Text style={styles.incrementTextStyle}>+</Text>
            </TouchableOpacity>
            <View style={[styles.quantityTextViewStyle, {flex: 1}]}>
              <Text style={styles.incrementTextStyle}>
                {this.state.quantity}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.incrementStyle, {flex: 1}]}
              onPress={() => {
                if (this.state.quantity > 1) {
                  this.setState({quantity: this.state.quantity - 1});
                }
              }}>
              <Text style={styles.incrementTextStyle}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.addToCartButtonViewStyle}>
          <TouchableOpacity
            style={styles.addToCartButtonViewStyle}
            onPress={() => this.clickHandler()}>
            <Text style={styles.addToCartButtonTextStyle}>Add to cart</Text>
          </TouchableOpacity>
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
    addThisToCart: (data, authKey) => {
      dispatch(authActions.addToCartAsync(data, authKey));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

const styles = StyleSheet.create({
  mainView: {
    width: wp('80%'),
    height: hp('30%'),
    alignSelf: 'center',
    marginVertical: hp('1%'),
    backgroundColor: Colors.HeaderColor5,
  },
  mainCompStyle: {
    // width: wp('95%'),
    // height: hp('60%'),
    flex: 1,
    borderWidth: 0.5,
    borderColor: Colors.GreyBorder,
    shadowRadius: 1,
    shadowColor: Colors.GREY,
    backgroundColor: 'white',
    margin: 10,
    //marginTop: '20%',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  imgStyle: {
    width: wp('85%'),
    height: hp('40%'),
    marginRight: 10,
    marginBottom: 10,
  },
  contentStyle: {
    width: wp('90%'),
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
  },
  contentTextStyle: {
    fontSize: 18,
  },
  contentDescriptionStyle: {
    fontSize: 16,
    color: Colors.GREY,
    marginTop: hp('0.7%'),
  },
  contentPriceStyle: {
    fontSize: 16,
    marginTop: hp('0.3%'),
  },

  addToCartViewStyle: {
    borderWidth: 2.5,
    borderColor: Colors.ORANGE,
    alignSelf: 'flex-end',
    width: wp('40%'),
    marginBottom: hp('1.5%'),
    height: hp('3.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartTextStyle: {
    fontSize: 16,
    color: Colors.ORANGE,
  },

  cartRatingViewStyle: {
    width: wp('90%'),
    height: hp('3.5%'),
    marginTop: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addQuantityViewStyle: {
    flexDirection: 'row',

    marginTop: hp('5%'),
    marginRight: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('60%'),
    height: hp('5%'),
  },
  incrementViewStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.GREY,
    marginLeft: wp('2%'),
    width: wp('30%'),

    alignItems: 'center',
  },
  incrementTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  incrementStyle: {
    backgroundColor: Colors.GREY,
    width: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityTextViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonViewStyle: {
    width: wp('80%'),
    height: hp('4%'),
    backgroundColor: Colors.ORANGE,
    marginVertical: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: wp('2%'),
  },
  addToCartButtonTextStyle: {
    fontSize: 18,
    color: Colors.WHITE,
  },
});
