import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, StyleSheet, Modal, Pressable, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors} from '../assets/styles/colors';
import * as authActions from '../redux/auth/actions/authActions';

class DrawableContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logout: false,
    };
  }

  onClick = () => {
    if (this.state.logout === true) {
      this.props.logout();
      this.props.navigation.navigate('AllProducts');
    } else {
      this.props.navigation.navigate('AllProducts');
    }
  };

  render() {
    return (
      <View style={styles.mainViewStyle}>
        {this.props.loggerName.name.length > 0 ? (
          <View>
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
                onPress={() => this.props.navigation.navigate('MyAccount')}>
                My Account
              </Text>
            </View>

            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => this.props.navigation.navigate('Cart')}>
                My Cart
              </Text>
            </View>

            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => this.props.navigation.navigate('ViewOrder')}>
                My Orders
              </Text>
            </View>

            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => this.props.navigation.navigate('StoreLocator')}>
                Store Locator
              </Text>
            </View>

            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={
                  () => {
                    Alert.alert('Do you wish to logout?', '', [
                      {
                        text: 'Cancel',
                        onPress: () => {
                          this.setState({logout: false});
                          this.onClick();
                        },
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          this.setState({logout: true});
                          this.onClick();
                        },
                      },
                    ]);
                  }
                  //alert('clicked on logout');
                  // this.props.navigation.navigate('AllProducts');
                }>
                Logout
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
                onPress={() => {
                  this.props.filterCategorySelected('');
                  setTimeout(
                    () => this.props.navigation.navigate('AllProducts'),
                    500,
                  );
                }}>
                Home
              </Text>
            </View>
            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => this.props.navigation.navigate('Dashboard')}>
                Dashboard
              </Text>
            </View>
            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => this.props.navigation.navigate('CreateAccount')}>
                Login
              </Text>
            </View>
            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => {
                  this.props.filterCategorySelected('');
                  setTimeout(
                    () => this.props.navigation.navigate('AllProducts'),
                    500,
                  );
                }}>
                All Products
              </Text>
            </View>
            <View style={styles.drawerItemStyle}>
              <Text
                style={styles.textStyle}
                onPress={() => this.props.navigation.navigate('StoreLocator')}>
                Store Locator
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(authActions.logout());
    },
    filterCategorySelected: (category) => {
      dispatch(authActions.filterCategory(category));
    },
    FilteredData: (data) => {
      dispatch(authActions.getFilteredData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawableContent);

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
    marginBottom: hp('5%'),
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
  modalViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
