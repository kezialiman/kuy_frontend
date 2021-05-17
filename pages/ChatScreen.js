import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

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
