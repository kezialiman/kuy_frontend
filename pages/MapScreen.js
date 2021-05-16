import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, Animated, Image, Platform } from "react-native"
import MapView, { Marker } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { markers } from '../components/MapData';
import { AnimatedScrollView } from '../components/AnimatedScrollView';

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 90;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export function MapScreen({navigation}) {
  const initialMapState = {
    markers,
    categories: [
      { 
        name: 'Fastfood Center', 
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
      {
        name: 'Restaurant',
        icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Dineouts',
        icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Snacks Corner',
        icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Hotel',
        icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      },
  ],
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const lat = 37;
  const lon = -122;
  const [state, setState] = React.useState(initialMapState);
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [triggerEndpoint, setTriggerEndpoint] = useState(false);
  const [business, setBusiness] = useState([]);

  const _scrollView = useRef(null);

  const YELP_API_ENDPOINT = 'https://api.yelp.com/v3/businesses/search';
  const limit = 5;
  const apiKey = `uK0JUUSXQwYpuFFWA0kGd2n7OhEncuw052h4mjpNQ366_ZLfY2on8U8ou4GuI_DShZqhG4FBQScaZMUAnVRlo376vwiZ8m1qlTl8FLt_6JhpWtLyN5LaGy6Yht2dYHYx`;

  useEffect(() => {
    console.log('Use Effect API Called')
    if (!triggerEndpoint) {
      console.log(business);
      return
    }
    const getYelpEndpoint = YELP_API_ENDPOINT + `?latitude=` + lat + `&longitude=` + lon + '&limit=' + limit + '&open_now=true' + '&term=' + search;
    setIsLoading(true);

    fetch(getYelpEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ` + apiKey
      },
      })
      .then(response => response.json())
      .then(results => {
        setIsLoading(false);
        var businessArray = new Array();

        for(i = 0; i < results.businesses.length; i++) {
          const business_data = Object(results.businesses[i]);
          businessArray.push({
            "name": business_data.name,
            "address": business_data.location.display_address.join(),
            "latitude": business_data.coordinates.latitude,
            "longitude": business_data.coordinates.longitude,
            "city": business_data.location.city,
            "id": business_data.id
          })
        }
        setBusiness(businessArray);
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
            //marginTop: 35
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
      {business.map((marker, index) => {
          return (
            <Marker key={index} coordinate={{ latitude: marker.latitude, longitude: marker.longitude}}/>
          );
        })}
      </MapView>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top:0,
          left:0,
          bottom:0,
          right:20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
      >
        {business.map((marker, index) =>(
          <View style={styles.card} key={index}>
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.address}</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('VenueScreen', {
                    data: {
                      name: marker.name,
                      address: marker.address,
                      city: marker.city,
                      id: marker.id
                    }
                  })}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: '#FF6347'
                  }]}>Find a friend</Text>
                </TouchableOpacity>
                </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
  </View>
  )
}

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
	},
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 70 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    marginBottom: 280,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
})
