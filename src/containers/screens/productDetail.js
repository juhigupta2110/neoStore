import * as React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

import {Colors} from '../../assets/styles/colors';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subImages: [],
      newImages: [],
    };
  }

  sliceImageUrl = (img) => {
    let newImg = img.slice(35, img.length);
    return newImg;
  };

  render() {
    if (this.state.subImages.length === 0) {
      this.setState({subImages: this.props.route.params.subImages});
    }

    if (this.state.subImages.length > 0 && this.state.newImages.length === 0) {
      var images = this.state.subImages.map(this.sliceImageUrl);
      this.setState({newImages: images});
    }

    console.log('newImages....', this.state.newImages);

    return (
      //   <View>
      //     <Text>Product Detail</Text>
      //     <Text>{this.props.route.params.productName}</Text>
      //   </View>

      <View style={styles.mainCompStyle}>
        <View>
          <Image
            source={{
              uri: this.state.newImages[0],
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

          <View style={styles.addToCartViewStyle}>
            <Text style={styles.addToCartTextStyle}>Add To Cart</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ProductDetail;

const styles = StyleSheet.create({
  mainView: {
    width: wp('80%'),
    height: hp('30%'),
    alignSelf: 'center',
    marginVertical: hp('1%'),
    backgroundColor: Colors.HeaderColor5,
  },
  mainCompStyle: {
    width: wp('95%'),
    height: hp('40%'),
    borderWidth: 0.5,
    borderColor: Colors.GreyBorder,
    shadowRadius: 1,
    shadowColor: Colors.GREY,
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    alignItems: 'center',
  },
  imgStyle: {
    width: wp('60%'),
    height: hp('25%'),
    marginRight: 10,
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
});
