import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { useCookies } from 'react-cookie'
const HEROKU_URL = "http://kuy-hangout.herokuapp.com/"

export const BookNowScreen = ({route, navigation}) => {
  const [startTimeInputValue, setStartTimeInputValue] = React.useState('');
  const [endTimeInputValue, setEndTimeInputValue] = React.useState('');
  const [partySizeInputValue, setPartySizeInputValue] = React.useState('');
  const [notesInputValue, setNotesInputValue] = React.useState('');
  const [data, setData] = useState([]);

  const [cookies] = useCookies(["access_token"]);
  const currCookie = cookies;
  console.log('Cookie on profile', currCookie)

  const { place_id, city } = route.params;
  useEffect(() => {
    console.log("Fetching data from heroku")
    fetch(HEROKU_URL +'/users?access_token=' + currCookie.access_token)
      .then((response) => response.json())
      .then((results) => setData(results))
      .catch((error) => console.error(error))
  }, []);

  async function postData(){
    try {
      console.log("Posting data...")
      
      const input = {
        place_id: place_id,
        host_id: data.id,
        start_time: startTimeInputValue,
        end_time: endTimeInputValue,
        party_size: partySizeInputValue,
        city: city,
        notes: notesInputValue,
        minimum_rating: 1,
      }

      await fetch("http://kuy-hangout.herokuapp.com/events/", {
        method: 'POST',
        body: JSON.stringify(input),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(navigation.navigate('Chat'))
    }
    catch (e) {
      console.log(e)

    }
    alert('Changes saved');
  }

  return (
    <View>
      <Input 
        style={{marginTop: 15}}
        placeholder='Start Time'
        onChangeText={text => setStartTimeInputValue(text)}
        value={startTimeInputValue}
      />
      <Input 
        placeholder='End Time'
        onChangeText={text => setEndTimeInputValue(text)}
        value={endTimeInputValue}
        />
      <Input 
        placeholder='Party Size'
        onChangeText={text => setPartySizeInputValue(text)}
        value={partySizeInputValue}
        />
      <Input 
        placeholder='Additional Notes'
        onChangeText={text => setNotesInputValue(text)}
        value={notesInputValue}
        />
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {postData()}}
          style={[styles.signIn, {
          borderColor: '#FF6347',
          borderWidth: 1
          }]}
        >
        <Text style={[styles.textSign, {
          color: '#FF6347'
          }]}>Join</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15
  },
  signIn: {
    width: '100%',
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  }
});