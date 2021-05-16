import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

const HEROKU_URL = "http://kuy-hangout.herokuapp.com/";

export const ChatScreen =  ({navigation}) => {

  return (
    <View style = {{marginBottom: 130}}>
      <ScrollView>
        <View style = {{
          marginTop: 100,
          alignItems: 'center',
          shadowOpacity: 0.1,
          shadowRadius: 1,
          shadowColor: 'black',
          shadowOffset: { height: 2, width: 3}}}>
          </View>
          
          <View style = {{ alignItems: 'center' }}>
          <Text style = {{ fontSize: 25 , fontWeight: 'bold', marginBottom: 5}}>
          Chat
          </Text>
          <Text style = {{ fontSize: 20, marginBottom: 15}}>
          Contact Your New Friends
          </Text>

          </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9FB',
    padding: 20,
    width: 325,
    height: 125,
    borderRadius: 15,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 3}
  },
  itemRight: {
    width: '30%',
  },
  itemLeft: {
    width: '70%',
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
  }
});
