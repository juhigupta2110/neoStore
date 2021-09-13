import * as React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

import RenderFinalCartItems from '../../components/renderFinalCartItems';
import {Colors} from '../../assets/styles/colors';
import * as authActions from '../../redux/auth/actions/authActions';

class PlaceOrder extends React.Component {
  constructor(props) {
    super(props);
    this.props.getAddresses(this.props.logger.token);
    setTimeout(this.myFunction, 1500);
    this.state = {
      grandTotal: 0,
      products: [],
      addresses: [],
      addressSelected: false,
      addressLine: this.props.route.params.addressLine,
      city: this.props.route.params.city,
      pincode: this.props.route.params.pincode,
      state: this.props.route.params.state,
      country: this.props.route.params.country,
      id: this.props.route.params.id,
      modalVisible: false,
    };
  }
  myFunction = () => {
    this.setState({
      grandTotal: this.props.cartItems.grandTotal,
      products: this.props.cartItems.products,
      addresses: this.props.addresses,
    });
  };

  handleAddAddress = () => {
    this.props.navigation.navigate('AddAddress');
  };

  handleSelectAddress = () => {
    this.props.getAddresses(this.props.logger.token);
    setTimeout(() => {
      this.props.navigation.navigate('ShippingAddresses');
    }, 1500);
  };

  refresh = () => {
    console.log('inside place order refresh...');

    this.setState({
      modalVisible: true,
    });

    setTimeout(() => this.setState({modalVisible: false}), 500);

    setTimeout(() => this.props.navigation.navigate('AllProducts'), 3000);

    //let authKey = this.props.logger.token;
    //this.props.getAddress(authKey);
  };

  placeOrder = () => {
    if (this.props.route.params.id === '') {
      Toast.show({
        text1: 'Please select an address',
        visibilityTime: 800,
        position: 'bottom',
      });
    } else {
      let data = {
        addressId: this.props.route.params.id,
      };
      let authKey = this.props.logger.token;

      this.props.placeOrderNow(authKey, data, this.refresh);
    }
  };

  render() {
    return (
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setState(!this.state.modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Order Placed !!!</Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <Text style={styles.textStyle}>ok</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <Modal transparent={true} visible={this.state.showFiterModal}>
          <View style={styles.modalViewStyle}>
            <Text style={styles.modalTextStyle}>Order Placed !!!</Text>
          </View>
        </Modal> */}
        {this.props.route.params.addressLine === '' ? null : (
          <View style={styles.topMainCompStyle}>
            <View style={styles.mainCompStyle}>
              <View style={{marginBottom: 5}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  {this.props.route.params.addressLine}--
                  {this.props.route.params.city}
                </Text>
                <Text style={{textAlign: 'left'}}>
                  {this.props.route.params.pincode}
                </Text>
                <Text>
                  {this.props.route.params.state},
                  {this.props.route.params.country}
                </Text>
              </View>
            </View>
          </View>
        )}

        {this.props.addresses === [] ? (
          <TouchableOpacity
            style={styles.addAddressViewStyle}
            onPress={() => this.handleAddAddress()}>
            <Text style={styles.addAddressTextStyle}>Add Address</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addAddressViewStyle}
            onPress={() => this.handleSelectAddress()}>
            <Text style={styles.addAddressTextStyle}>Select Address</Text>
          </TouchableOpacity>
        )}

        <FlatList
          style={styles.flatlistStyle}
          data={this.props.cartItems.products}
          renderItem={({item}) => (
            <RenderFinalCartItems
              productName={item.productId.name}
              id={item.productId.id}
              imageUrl={item.productId.mainImage}
              quantity={item.quantity}
              price={item.productId.price}
              totalAmt={item.totalAmount}
              {...this.props}
            />
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.grandTotalViewStyle}>
          <Text style={styles.totalAmountTextStyle}>Total Amount: </Text>
          <Text style={styles.amountTextStyle}>
            Rs {this.props.cartItems.grandTotal}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.placeOrderStyle}
          onPress={() => this.placeOrder()}>
          <Text style={styles.placeOrderText}>Order Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.getCartReducer,
  logger: state.loginReducer,
  addresses: state.getAddressReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAddresses: (authKey) => {
      dispatch(authActions.getAddressAsync(authKey));
    },
    placeOrderNow: (authKey, data, refresh, productsOrdered) => {
      dispatch(authActions.placeOrderAsync(authKey, data, refresh));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);

const styles = StyleSheet.create({
  modalViewStyle: {
    width: wp('40%'),
    height: hp('30%'),
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: wp('10%'),
    marginTop: hp('10%'),
    borderWidth: 1,
    borderColor: Colors.GREY,
  },

  modalTextStyle: {
    fontSize: 24,
    color: Colors.GREEN,
    fontWeight: 'bold',
  },

  addAddressViewStyle: {
    width: wp('60%'),
    height: hp('4%'),
    backgroundColor: Colors.ORANGE,
    alignSelf: 'center',
    marginVertical: hp('2%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAddressTextStyle: {
    fontSize: 20,
    color: Colors.WHITE,
  },
  flatlistStyle: {
    //flex: 1,
    height: hp('65%'),
  },
  grandTotalViewStyle: {
    width: wp('100%'),
    height: hp('5%'),
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
  },
  totalAmountTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountTextStyle: {
    fontSize: 16,
  },
  placeOrderStyle: {
    width: wp('100%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: Colors.ORANGE,
  },
  placeOrderText: {
    fontSize: 26,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },

  topMainCompStyle: {
    height: hp('12%'),
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
    height: hp('10%'),
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    width: wp('8%'),
    height: hp('10%'),
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: Colors.GREEN,
  },
});
