import React from 'react';

import {View, Text, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

import {Colors} from '../assets/styles/colors';

const Header = (props) => {
  return (
    <View>
      <View style={styles.mainViewStyle}>
        <View style={styles.leftViewStyle}>
          <Icon
            name="menu"
            size={30}
            onPress={() => props.navigation.openDrawer()}
          />
        </View>
        <View style={styles.rightViewStyle}>
          <Icons
            name="cart-outline"
            size={30}
            onPress={() => props.navigation.navigate('Cart')}
          />
          <Icons
            name="md-person-outline"
            size={28}
            onPress={() => props.navigation.navigate('CreateAccount')}
          />
        </View>
      </View>

      <View style={styles.searchViewStyle}>
        <TextInput
          style={styles.searchStyle}
          placeholder="Search NeoStore"
          maxLength={30}
        />
        <Icons name="search-outline" size={30} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainViewStyle: {
    // backgroundColor: Colors.HeaderColor1,
    height: hp('9%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('5%'),
  },
  leftViewStyle: {
    flex: 4,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  rightViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.DisabledButton,
    width: wp('93%'),
    height: hp('4.5%'),
    borderRadius: 2,
    marginLeft: wp('3%'),
    marginBottom: hp('1.5%'),
  },
  searchStyle: {
    width: wp('80%'),
    height: hp('4.5%'),

    paddingHorizontal: wp('2%'),
    fontSize: 18,
  },
});
