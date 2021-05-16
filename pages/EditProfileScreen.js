import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { Input } from 'react-native-elements'
const HEROKU_URL = "http://kuy-hangout.herokuapp.com/"

export const EditProfileScreen = ({route, navigation}) => {
  const [nameInputValue, setNameInputValue] = React.useState('');
  const [funFactInputValue, setFunFactInputValue] = React.useState('');

  const {userID} = route.params;
  console.log(userID)

  async function postData(){
    try {
      console.log("Posting data...")

      let result = await fetch("http://kuy-hangout.herokuapp.com/users/" + userID, {
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
      .then(json => console.log(json))
      .then(navigation.navigate('Profile'))
    }
    catch (e) {
      console.log(e)

    }
    alert('Changes saved');
  }

  return (
    <View>
      <Input 
        placeholder='Name'
        onChangeText={text => setNameInputValue(text)}
        value={nameInputValue}
      />
      <Input 
        placeholder='Fun Fact'
        onChangeText={text => setFunFactInputValue(text)}
        value={funFactInputValue}
        />
      <Button
        onPress={() => {postData()}}
  title="Save Changes"
  color="#841584"
/>
    </View>
  )
}