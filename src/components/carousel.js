import * as React from 'react';

import {StyleSheet, View, ScrollView, Dimensions, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Carousel extends React.Component {
  scrollRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  render() {
    const {images} = this.props;
    const {selectedIndex} = this.state;
    return <View style={styles.mainViewStyle}></View>;
  }
}
export default Carousel;

const styles = StyleSheet.create({
  mainViewStyle: {
    height: hp('100%'),
    width: wp('100%'),
  },
  backgroundImage: {
    height: hp('100%'),
    width: wp('100%'),
  },
});
