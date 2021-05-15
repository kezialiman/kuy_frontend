import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Button, Image, StyleSheet } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';

export const ProfileScreen = () => {
  return (
    <View style={{
      backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{
          padding: 10,
          width: '100%',
          backgroundColor: '#2898FA',
          height: 150,
        }}>
        </View>
        <View style = {{
          alignItems: 'center',
          shadowOpacity: 0.1,
          shadowRadius: 1,
          shadowColor: 'black',
          shadowOffset: { height: 2, width: 3}}}>
          <TouchableOpacity>
              <Image 
              source = {{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}}
              style = {{ width: 175, 
              height: 175, 
              borderRadius: 150,
              borderWidth: 10,
              borderColor: 'white',
              marginTop: -75
            }}/>
            </TouchableOpacity>
          </View>
          
          <View style = {{ alignItems: 'center' }}>
          <Text style = {{ fontSize: 25, marginTop: 10 }}>
            John Doe
          </Text>

          <Rating
            type='star'
            ratingCount={5}
            imageSize={30}
            style = {{ padding: 10 }}
            readonly
            startingValue = {5}
            />

          <Text style = {{ fontSize: 15 }}>
            21, Male
          </Text>

          <Text style = {{ fontSize: 15, marginTop: 20 }}>
            Fun Facts:
          </Text>

          <View style={styles.container}>
          <Text style = {{ fontSize: 15}}>
          John likes ice cream and chocolate cookies.
          </Text>
      </View>
      <View style={styles.container}>
          <Text style = {{ fontSize: 15}}>
          John likes ice cream and chocolate cookies.
          </Text>
      </View>
      <View style={styles.container}>
          <Text style = {{ fontSize: 15}}>
            John likes ice cream and chocolate cookies.
          </Text>
      </View>
          
          </View>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9FB',
    padding: 20,
    width: 300,
    borderRadius: 15,
    shadowOpacity: 0.1,
          shadowRadius: 1,
          shadowColor: 'black',
          shadowOffset: { height: 2, width: 3}
  }
});