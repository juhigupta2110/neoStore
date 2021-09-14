import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class StoreLocator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 19.090795877445505,
        longitude: 72.82963201677117,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  render() {
    return (
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        region={this.state.region}>
        <Marker
          coordinate={{
            latitude: 19.090795877445505,
            longitude: 72.82963201677117,
          }}
          pinColor={'red'}
          title={'NeoStore'}
          description={'main branch'}
        />
      </MapView>
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
