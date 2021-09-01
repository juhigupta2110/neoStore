import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors} from '../assets/styles/colors';

class DrawableContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainViewStyle}>
        {console.log('logger name is ...', this.props.loggerName.name)}
        {this.props.loggerName.name.length > 0 ? (
          <View style={styles.userStyle}>
            <Avatar.Image
              size={hp('8%')}
              source={require('../assets/images/user.png')}
            />
            <View style={styles.welcomeUserStyle}>
              <Text style={styles.welcomeTextStyle}>Welcome!!</Text>
              <Text style={styles.userNameTextStyle}>
                {this.props.loggerName.name}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <Text style={styles.neoStoreHeadingStyle}> NeoStore</Text>
            </View>
            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => this.props.navigation.navigate('AllProducts')}>
                Home
              </Text>
            </View>
            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => this.props.navigation.navigate('Login')}>
                Login
              </Text>
            </View>
            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => this.props.navigation.navigate('AllProducts')}>
                All Products
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loggerName: state.loginReducer,
});

export default connect(mapStateToProps)(DrawableContent);

const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginTop: hp('5%'),
  },
  drawerItemStyle: {
    height: hp('5%'),
    flexDirection: 'row',
    marginVertical: hp('1%'),
    borderBottomWidth: hp('0.03%'),
    borderBottomColor: Colors.GREY,
  },
  textStyle: {
    fontSize: hp('2.5%'),
    marginHorizontal: wp('2.5%'),
    color: Colors.BLACK,
  },
  neoStoreHeadingStyle: {
    justifyContent: 'center',
    color: Colors.ORANGE,
    fontWeight: 'bold',
    fontSize: 26,
    marginVertical: hp('2%'),
    paddingLeft: wp('15%'),
  },
  userStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeUserStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },
  welcomeTextStyle: {
    fontSize: 16,
  },
  userNameTextStyle: {
    fontSize: 24,
    color: Colors.BLACK,
  },
});
