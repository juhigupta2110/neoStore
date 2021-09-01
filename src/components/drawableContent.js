import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, StyleSheet} from 'react-native';

import {Colors} from '../assets/styles/colors';

class DrawableContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainViewStyle}>
        <View style={styles.drawerItemStyle}>
          <Text
            style={styles.textStyle}
            onPress={() => this.props.navigation.navigate('Login')}>
            Home
          </Text>
        </View>
        <View style={styles.drawerItemStyle}>
          <Text
            style={styles.textStyle}
            onPress={() => this.props.navigation.navigate('Register')}>
            Register
          </Text>
        </View>
      </View>
    );
  }
}

export default DrawableContent;

const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginTop: hp('5%'),
  },
  drawerItemStyle: {
    height: hp('5%'),
    justifyContent: 'center',
    // backgroundColor: Colors.drawerItemColor,

    borderBottomWidth: hp('0.03%'),
    borderBottomColor: Colors.GREY,
  },
  textStyle: {
    fontSize: hp('1.75%'),
    marginHorizontal: wp('2.5%'),
    color: Colors.drawerItemTextColor,
  },
});
