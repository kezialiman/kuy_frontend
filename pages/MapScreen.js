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
  const [data, setData] = useState({businesses: []});
  const [error, setError] = useState(null);
  const [triggerEndpoint, setTriggerEndpoint] = useState(false);

  const [stringData, setStringData] = useState([]);
  const YELP_API_ENDPOINT = 'https://api.yelp.com/v3/businesses/search';
  //const YELP_API_ENDPOINT = 'https://randomuser.me/api/?seed=1&page=1&results=1'
  const limit = 2;
  const apiKey = `uK0JUUSXQwYpuFFWA0kGd2n7OhEncuw052h4mjpNQ366_ZLfY2on8U8ou4GuI_DShZqhG4FBQScaZMUAnVRlo376vwiZ8m1qlTl8FLt_6JhpWtLyN5LaGy6Yht2dYHYx`;

  const getYelpEndpoint = YELP_API_ENDPOINT + `?latitude=` + lat + `&longitude=` + lon + '&term=' + search + '&limit=' + limit;

  useEffect(() => {
    console.log('Use Effect API Called')
    setIsLoading(true);

    fetch(getYelpEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + apiKey
      },
      })
      .then(response => response.json())
      .then(results => {
        setData(results);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
      
      //const { businesses } = data;
      //console.log(data.businesses);

      //console.log(data.businesses);
      const business = JSON.stringify(data.businesses);
      //console.log(data)
      //console.log(data.businesses)
      
      const business_data = data.businesses[0];
      const string_business_data = JSON.stringify(business_data);
      console.log(string_business_data);

      setStringData(business_data);

      console.log(Object(stringData));
      
      /*JSON.parse(first, (key, value) => {
        console.log(key, value);
      });*/
      
      //console.log(typeOf(data.businesses))
      
      
      setTriggerEndpoint(false);
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

//export const MapScreen;