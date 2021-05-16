import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from "react-native"

const Images = [
    { image: require("../assets/food-banner1.jpg")}
];

/*export const categories = [
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
];*/

export const markers = [
    {
      coordinate: {
        latitude: 22.6293867,
        longitude: 88.4354486,
      },
      name: "Amazing Food Place",
      address: "This is the best food place",
      image: Images[0].image,
      rating: 4,
      reviews: 99,
    },
    {
      coordinate: {
        latitude: 22.6345648,
        longitude: 88.4377279,
      },
      name: "Second Amazing Food Place",
      address: "This is the second best food place",
      image: Images[0].image,
      rating: 5,
      reviews: 102,
    },
    {
      coordinate: {
        latitude: 22.6281662,
        longitude: 88.4410113,
      },
      name: "Third Amazing Food Place",
      address: "This is the third best food place",
      image: Images[0].image,
      rating: 3,
      reviews: 220,
    },
    {
      coordinate: {
        latitude: 22.6341137,
        longitude: 88.4497463,
      },
      name: "Fourth Amazing Food Place",
      address: "This is the fourth best food place",
      image: Images[0].image,
      rating: 4,
      reviews: 48,
    },
    {
      coordinate: {
        latitude: 22.6292757,
        longitude: 88.444781,
      },
      name: "Fifth Amazing Food Place",
      address: "This is the fifth best food place",
      image: Images[0].image,
      rating: 4,
      reviews: 178,
    },
];

const styles = StyleSheet.create({
  chipsIcon: {
    marginRight: 5,
  },
})