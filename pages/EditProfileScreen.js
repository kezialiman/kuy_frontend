import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements'
const HEROKU_URL = "http://kuy-hangout.herokuapp.com/"

export const EditProfileScreen = ({route, navigation}) => {
  const [nameInputValue, setNameInputValue] = React.useState('');
  const [funFactInputValue, setFunFactInputValue] = React.useState('');

  const {userData} = route.params;
  //console.log(userData)

  async function postData(){
    try {
      console.log("Posting data...")
      let result = await fetch(HEROKU_URL+ "users/" + userData.id, {
        method: 'PATCH',
        body: JSON.stringify({
          name: nameInputValue,
          fun_fact: funFactInputValue
        }),
        headers:{
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
      .then(response => response.json())
      .then(navigation.navigate('Profile'))
    }
    catch (e) {
      console.log(e)

    }
    alert('Changes saved');
  }

  return (
    <View>
      <Text style={{
        color: '#2898FA',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 15,
        marginBottom: -5
      }}>NAME</Text>
      <Input 
        placeholder={userData.name}
        onChangeText={text => setNameInputValue(text)}
        value={nameInputValue}
      />
      <Text style={{
        color: '#2898FA',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5,
        marginBottom: -5
      }}>FUN FACT</Text>
      <Input 
        placeholder={userData.fun_fact}
        onChangeText={text => setFunFactInputValue(text)}
        value={funFactInputValue}
        />
        <View style={{
          alignItems:'center',
        }}>
        <Button
        onPress={() => {postData()}}
        title="Update Profile"
        style={{
          backgroundColor: '#2898FA',
          width: 150,
          borderRadius: 100
        }}

      />  
        </View>
    </View>
  )
}