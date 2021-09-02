import * as React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

import {Colors} from '../assets/styles/colors';

class RenderCartItems extends React.Component {
  constructor(props) {
    super(props);
  }

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
                {this.props.productName}
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
            <Icon name="remove" size={22} />
          </View>
          <View
            style={[
              styles.minusQuantityViewStyle,
              {backgroundColor: Colors.WHITE},
            ]}>
            <Text>{this.props.quantity}</Text>
          </View>
          <View style={styles.minusQuantityViewStyle}>
            <Icon name="add" size={22} />
          </View>
        </View>
      </View>
    );
  }
}

export default RenderCartItems;

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
