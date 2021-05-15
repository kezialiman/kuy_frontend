import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, StatusBar, Text } from "react-native"
import MapView, { Marker } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';

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
  const [search, setSearch] = useState('');
    
  return (
    <View>
      <SearchBar
          placeholder="Type Here..."
          onChangeText={(value) => setSearch(value)}
          value={search}
          round
          containerStyle={{
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}
          inputContainerStyle={{
            backgroundColor: '#fff'
          }}
          cancelButtonProps={{
            color: '#fff'
          }}
        />
      <Text>TEST</Text>
      <Text>{search}</Text>
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
