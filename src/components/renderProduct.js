import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

import {Colors} from '../assets/styles/colors';
import allProducts from '../containers/screens/allProducts';

class RenderProduct extends React.Component {
  constructor(props) {
    super(props);

    let img = this.props.imageUrl || '';
    let newImg = img.slice(35, img.length);

    let subImgs = this.props.subImages || [];
    let newSubImg = [];

    for (var i = 0; i < subImgs.length; i++) {
      let k = subImgs[i].slice(35, subImgs[i].length);
      newSubImg.push(k);
    }

    this.state = {
      img: newImg,
      subs: newSubImg,
    };
  }

  render() {
    return (
      <View style={styles.mainCompStyle}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ProductDetail', {
              ...this.props,
              subs: this.state.subs,
            })
          }>
          <View>
            {this.state.img == '' ? (
              <Image
                source={require('../assets/images/img_na.png')}
                style={styles.imgStyle}
              />
            ) : (
              <Image
                source={{
                  uri: this.state.img,
                }}
                style={styles.imgStyle}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.contentStyle}>
          <View>
            <Text style={styles.contentTextStyle}>
              {this.props.productName}
            </Text>
            <Text style={styles.contentDescriptionStyle}>
              {this.props.description}
            </Text>
            <Text style={styles.contentPriceStyle}>Rs. {this.props.price}</Text>
          </View>
        </View>

        <View style={styles.cartRatingViewStyle}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.props.stars}
            starSize={18}
            fullStarColor={Colors.tabYellowColor}
            //selectedStar={(rating) => this.onStarRatingPress(rating)}
          />

          <TouchableOpacity
            style={styles.addToCartViewStyle}
            onPress={() =>
              this.props.navigation.navigate('ProductDetail', {
                ...this.props,
                subs: this.state.subs,
              })
            }>
            <Text style={styles.addToCartTextStyle}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RenderProduct;

const styles = StyleSheet.create({
  mainView: {
    width: wp('80%'),
    height: hp('30%'),
    alignSelf: 'center',
    marginVertical: hp('1%'),
    backgroundColor: Colors.HeaderColor5,
  },
  mainCompStyle: {
    flex: 1,
    // width: wp('95%'),
    // height: hp('50%'),
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
