import * as React from 'react';

import {View, Text} from 'react-native';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props in product details..', this.props);
    return (
      <View>
        <Text>Product Detail</Text>
        <Text>{this.props.route.params.productName}</Text>
      </View>
    );
  }
}

export default ProductDetail;
