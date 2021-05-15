import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Button, Text } from "react-native"
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

export const MapScreen = (lat, lon) => {
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  //const [data, setData] = useState({businesses: []});
  const [error, setError] = useState(null);
  const [triggerEndpoint, setTriggerEndpoint] = useState(false);
  const [businessName, setBusinessName] = useState([]);
  const [businessAddress, setBusinessAddress] = useState([]);

  const YELP_API_ENDPOINT = 'https://api.yelp.com/v3/businesses/search';
  const limit = 5;
  const apiKey = `uK0JUUSXQwYpuFFWA0kGd2n7OhEncuw052h4mjpNQ366_ZLfY2on8U8ou4GuI_DShZqhG4FBQScaZMUAnVRlo376vwiZ8m1qlTl8FLt_6JhpWtLyN5LaGy6Yht2dYHYx`;

  useEffect(() => {
    console.log('Use Effect API Called')
    if (!triggerEndpoint) {
      console.log(businessName);
      console.log(businessAddress)
      return
    }
    const getYelpEndpoint1 = YELP_API_ENDPOINT + `?latitude=` + lat + `&longitude=` + lon + '&limit=' + limit + '&open_now=true' + '&term=' + search;
    setIsLoading(true);

    fetch(getYelpEndpoint1, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + apiKey
      },
      })
      .then(response => response.json())
      .then(results => {
        setIsLoading(false);
        var businessNameArray = new Array();
        var businessAddressArray = new Array();

        for(i = 0; i < results.businesses.length; i++) {
          const business_data = Object(results.businesses[i]);
          businessNameArray.push(business_data.name);
          businessAddressArray.push(business_data.location.display_address.join())
        }
        setBusinessName(businessNameArray);
        setBusinessAddress(businessAddressArray);
        setTriggerEndpoint(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, [triggerEndpoint]);

  const handleSubmit = () => {
    console.log('Search softkey pressed!')
    setTriggerEndpoint(true);
  }

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
            borderBottomWidth: 0,
            marginTop: 40
          }}
          inputContainerStyle={{
            backgroundColor: '#fff'
          }}
          cancelButtonProps={{
            color: '#fff'
          }}
          onSubmitEditing={handleSubmit}
        />
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
