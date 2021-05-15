/*import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

function MapScreen() {
  return (
    <MapView
       style={{ flex: 1 }}
       provider={PROVIDER_GOOGLE}
       showsUserLocation
       initialRegion={{
       latitude: 37.78825,
       longitude: -122.4324,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421}}
    />
  );
}
export default MapScreen;*/

import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from "react-native"
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})

const MapScreen = (lat, lon) => {
  return (
    <View>
    <MapView
     style={styles.map}
     initialRegion={{
       latitude: lat,
       longitude: lon,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421
     }}
     provider="google"
    >
    <Marker
      coordinate={{ latitude: lat,longitude: lon}}
    />
  </MapView>
  </View>
  )
}

export default MapScreen;