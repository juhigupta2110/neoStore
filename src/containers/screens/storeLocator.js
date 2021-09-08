import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class StoreLocator extends React.Component {
  render() {
    return (
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}></MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    height: hp('100%'),
    width: wp('100%'),
    position: 'absolute',
    top: hp('2%'),
    left: wp('2%'),
  },
});
