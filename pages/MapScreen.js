import React from 'react';
import { Dimensions, StyleSheet, View } from "react-native"
import MapView, { Marker } from 'react-native-maps';

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

export const MapScreen = (lat, lon) => {
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

//export default MapScreen;
