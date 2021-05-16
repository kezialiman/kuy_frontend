import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, ScrollView, TouchableOpacity, Animated, Image, Platform } from "react-native"
import MapView, { Marker } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { markers } from '../components/MapData';

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
    top:Platform.OS === 'ios' ? 110 : 80, 
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
    marginBottom: 500,
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

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export const MapScreen = (lat, lon) => {
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

  const [state, setState] = React.useState(initialMapState);

  let mapAnimation = new Animated.Value(0);
  const _scrollView = React.useRef(null);

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
            marginTop: 35
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
        //ref={_scrollView}
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
        /*onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}*/
      >
        {state.markers.map((marker, index) =>(
          <View style={styles.card} key={index}>
            <Image 
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
              {/*<StarRating ratings={marker.rating} reviews={marker.reviews} />*/}
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
              {/*<View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: '#FF6347'
                  }]}>Order Now</Text>
                </TouchableOpacity>
                </View>*/}
            </View>
          </View>
        ))}
      </Animated.ScrollView>
  </View>
  )
}
