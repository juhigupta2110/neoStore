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

// id, productName, subs[], stars, description, features, price

class RenderOrderItemProduct extends React.Component {
  constructor(props) {
    super(props);

    console.log('props coming ..', this.props);

    this.state = {
      quantity: this.props.quantity,
    };
  }

  //   quantity={item.quantity}
  //             img={item.productId.mainImage}
  //             name={item.productId.name}
  //             price={item.productId.price}

  goToProductDetail = () => {
    this.props.navigation.navigate('ProductDetail', {
      id: this.props.id,
      productName: this.props.productName,
      subs: this.props.subs,
      stars: this.props.stars,
      description: this.props.description,
      features: this.props.features,
      price: this.props.price,
    });
  };

  render() {
    return (
      <View style={styles.topMainCompStyle}>
        <View style={styles.mainCompStyle}>
          <TouchableOpacity
            style={styles.imgStyle}
            onPress={() => this.goToProductDetail()}>
            <Image
              source={{
                uri: this.props.img,
              }}
              style={styles.imgStyle}
            />
          </TouchableOpacity>

          <View style={styles.contentStyle}>
            <View style={{marginBottom: 5}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {this.props.name}
              </Text>
              <Text style={{fontSize: 18}}>{this.props.quantity}</Text>
            </View>
            <Text style={{textAlign: 'left'}}>price: {this.props.price}</Text>
          </View>
        </View>

        <View style={styles.updateViewStyle}></View>
      </View>
    );
  }
}

export default connect()(RenderOrderItemProduct);

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
