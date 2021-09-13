import * as React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RenderCartItems from '../../components/renderCartItems';
import {Colors} from '../../assets/styles/colors';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    setTimeout(this.myFunction, 1500);
    this.state = {
      grandTotal: 0,
      products: [],
      refresh: 0,
      showFiterModal: false,
    };
    this.refreshScreen = this.refreshScreen.bind(this);
  }
  myFunction = () => {
    this.setState({
      grandTotal: this.props.cartItems.grandTotal,
      products: this.props.cartItems.products,
    });
  };

  reRenderScreen = () => {
    this.setState({refresh: this.state.refresh + 1});
  };

  refreshScreen = () => {
    // this.reRenderScreen();
  };

  render() {
    return (
      <SafeAreaView>
        {console.log(
          'product details coming in cart...',
          this.props.cartItems.products,
        )}
        {!this.props.cartItems.products ? (
          <Image
            source={require('../../assets/images/no_data_available.png')}
            style={styles.imgStyle}
          />
        ) : (
          <View>
            <FlatList
              style={styles.flatlistStyle}
              data={this.props.cartItems.products}
              renderItem={({item}) => (
                <RenderCartItems
                  productName={item.productId.name}
                  id={item.id}
                  imageUrl={item.productId.mainImage}
                  quantity={item.quantity}
                  price={item.productId.price}
                  totalAmt={item.totalAmount}
                  //refreshScreen={this.refreshScreen}
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
              onPress={() =>
                this.props.navigation.navigate('PlaceOrder', {
                  addressLine: '',
                  city: '',
                  pincode: '',
                  state: '',
                  country: '',
                  id: '',
                })
              }>
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.getCartReducer,
});

export default connect(mapStateToProps)(Cart);

const styles = StyleSheet.create({
  modalViewStyle: {
    width: wp('40%'),
    height: hp('50%'),
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: wp('10%'),
    marginTop: hp('20%'),
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
    height: hp('75%'),
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
    backgroundColor: Colors.ORANGE,
  },
  placeOrderText: {
    fontSize: 26,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  imgStyle: {
    width: wp('60%'),
    height: hp('30%'),
    marginRight: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: hp('20%'),
  },
});
