import * as React from 'react';

import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

import * as authActions from '../../redux/auth/actions/authActions';
import {Colors} from '../../assets/styles/colors';
import RenderAddressItem from '../../components/renderAddressItem';
import RenderOrderItem from '../../components/renderOrderItem';
import RenderOrderItemProduct from '../../components/renderOrderItemProduct';

const htmlContent = (
  <html>
    <body>
      <h1>NeoStore Invoice</h1>
    </body>
  </html>
);

const ViewOrderProducts = (props) => {
  const createPDF = async () => {
    let options = {
      html: `htmlContent`,
      fileName: 'test2',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file);

    try {
      const resp = FileViewer.open(file.filePath);
      console.log('resp from file viewer', resp);
    } catch (e) {
      console.log('error in fileView..', e);
    }

    // FileViewer.open(file.filePath)
    //   .then((data) => {
    //     console.log('FileView Data: ', data);
    //   })
    //   .catch((error) => {
    //     console.log('FileView Error: ', error);
    //     // alert(`File save to your local storage but, ${error}`);
    //   });
  };

  return (
    <View style={styles.flatlistStyle}>
      <TouchableOpacity onPress={createPDF}>
        <Text>Create PDF</Text>
      </TouchableOpacity>

      <FlatList
        data={props.route.params.products}
        keyExtractor={(item) => item.productId.id}
        renderItem={({item}) => (
          <RenderOrderItemProduct
            quantity={item.quantity}
            img={item.productId.mainImage}
            name={item.productId.name}
            price={item.productId.price}
          />
        )}
      />
      <TouchableOpacity style={styles.placeOrderStyle} onPress={createPDF}>
        <Text style={styles.placeOrderText}>Download Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ViewOrderProducts;

const styles = StyleSheet.create({
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
    flex: 1,
    height: hp('85%'),
  },
  pdf: {
    flex: 1,
    width: wp('80%'),
    height: hp('70%'),
  },
  placeOrderStyle: {
    width: wp('60%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.ORANGE,
    marginBottom: hp('5%'),
    borderRadius: 5,
  },
  placeOrderText: {
    fontSize: 18,
    color: Colors.WHITE,
  },
});
