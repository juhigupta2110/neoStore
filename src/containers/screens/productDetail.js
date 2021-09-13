import * as React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import Toast, {BaseToast} from 'react-native-toast-message';
import Share from 'react-native-share';
import Swiper from 'react-native-swiper';
import {BlurView} from '@react-native-community/blur';
import Stars from 'react-native-stars';

import {Colors} from '../../assets/styles/colors';
import * as authActions from '../../redux/auth/actions/authActions';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      giveStars: false,
    };
  }

  clickHandler = () => {
    if (this.props.logger.token === '') {
      Toast.show({
        text1: 'Please login',
        visibilityTime: 800,
        position: 'bottom',
      });
    } else {
      let data = {
        productId: this.props.route.params.id,
        quantity: this.state.quantity,
      };
      let authKey = this.props.logger.token;

      this.props.addThisToCart(data, authKey);
    }
  };

  clickRatingHandler = () => {
    if (this.props.logger.token === '') {
      Toast.show({
        text1: 'Please login',
        visibilityTime: 800,
        position: 'bottom',
      });
    } else {
      this.setState({
        giveStars: true,
      });
    }
  };

  myCustomeShare = async () => {
    const shareOptions = {
      message: this.props.route.params.productName,
    };

    try {
      const shareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(shareResponse));
    } catch (e) {
      console.log('error in share', e);
    }
  };

  render() {
    console.log('props coming in....', this.props);
    return (
      <SafeAreaView style={styles.mainCompStyle}>
        <Swiper
          autoplay={false}
          loop={false}
          showsButtons={true}
          width={wp('100%')}
          height={hp('60%')}
          style={styles.swiperStyle}>
          <Image
            source={{
              uri: this.props.route.params.subs[0],
            }}
            style={styles.imgStyle}
          />
          <Image
            source={{
              uri: this.props.route.params.subs[1],
            }}
            style={styles.imgStyle}
          />
        </Swiper>

        {this.state.giveStars ? (
          <View style={styles.giveStarView}>
            <Stars
              default={this.props.route.params.stars}
              count={5}
              half={true}
              starSize={50}
              fullStar={
                <Icon name={'star'} style={[styles.myStarStyle]} size={30} />
              }
              emptyStar={
                <Icon
                  name={'star-outline'}
                  size={30}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon
                  name={'star-half'}
                  size={30}
                  style={[styles.myStarStyle]}
                />
              }
            />
            <Button
              title="Done"
              onPress={() => {
                Toast.show({
                  text1: 'Thankyou for your feedback !',
                  visibilityTime: 800,
                  position: 'bottom',
                });
                this.setState({giveStars: false});
              }}
            />
          </View>
        ) : null}

        <TouchableOpacity
          onPress={this.myCustomeShare}
          style={styles.shareViewStyle}>
          <Icon name="share-outline" size={35} />
        </TouchableOpacity>

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
        <View style={styles.addToCartBottomViewStyle}>
          <TouchableOpacity
            style={styles.addToCartButtonViewStyle}
            onPress={() => this.clickRatingHandler()}>
            <Text style={styles.addToCartButtonTextStyle}>Give Rating</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addToCartButtonViewStyle}
            onPress={() => this.clickHandler()}>
            <Text style={styles.addToCartButtonTextStyle}>Add to cart</Text>
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
    justifyContent: 'center',
    marginVertical: hp('1%'),
    backgroundColor: Colors.HeaderColor5,
  },
  giveStarView: {
    width: wp('40%'),
    height: hp('10%'),
    backgroundColor: Colors.LIGHTGREY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GREY,
  },

  mainCompStyle: {
    height: hp('85%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperStyle: {
    marginLeft: wp('7%'),
    marginTop: hp('2%'),
  },

  imgStyle: {
    width: wp('85%'),
    height: hp('40%'),
    marginRight: 10,
  },
  contentStyle: {
    width: wp('90%'),
    marginLeft: wp('2%'),
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addQuantityViewStyle: {
    flexDirection: 'row',
    marginBottom: hp('2%'),
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
  addToCartBottomViewStyle: {
    flexDirection: 'row',
    width: wp('80%'),
    height: hp('4%'),
    justifyContent: 'space-between',
    // marginTop: hp('5%'),
  },
  addToCartButtonViewStyle: {
    width: wp('38%'),
    backgroundColor: Colors.ORANGE,
    // marginVertical: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    // marginRight: wp('2%'),
  },
  addToCartButtonTextStyle: {
    fontSize: 18,
    color: Colors.WHITE,
  },
  shareViewStyle: {
    alignItems: 'flex-end',
    width: wp('85%'),
    marginTop: hp('2%'),
  },

  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});
