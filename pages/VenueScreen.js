import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

const HEROKU_URL = "http://kuy-hangout.herokuapp.com/";

export const VenueScreen = ({route, navigation}) => {
  // Fetch data for events
  const [eventData, setEventData] = useState([]);
  const isFocused = useIsFocused();
  const { data } = route.params;

  useEffect(() => {
    fetch(HEROKU_URL + `events?place_id=${data.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resp => resp.json())
    .then(resp => {
      var eventArray = new Array();
      const getEventData = Object(resp.data)
      for (i = 0; i < resp.data.length; i++) {
        eventArray.push({
          "place_id": getEventData[i].place_id,
          "host_id": getEventData[i].host_id,
          "host_name": getEventData[i].host_name,
          "start_time": [
            getEventData[i].start_time.split("T")[0].split("-").join("-"), " ", 
            getEventData[i].start_time.split("T")[1].split(":").slice(0, 2).join(":")
          ],
          "end_time": [
            getEventData[i].end_time.split("T")[0].split("-").join("-"), " ", 
            getEventData[i].end_time.split("T")[1].split(":").slice(0, 2).join(":")
          ],
          "party_size": getEventData[i].party_size,
        });
      }
      setEventData(eventArray);
    })
    .catch( error => console.log(error))
  }, [isFocused]);

  const venue = data.name;
  const location = data.address;

  return (
    <View style = {{marginBottom: 130}}>
      <ScrollView>
        <View style = {{
          marginTop: 30,
          alignItems: 'center',
          shadowOpacity: 0.1,
          shadowRadius: 1,
          shadowColor: 'black',
          shadowOffset: { height: 2, width: 3}}}>
          </View>
          
          <View style = {{ alignItems: 'center' }}>
          <Text style = {{ fontSize: 25 , fontWeight: 'bold', marginBottom: 5}}>
          {venue}
          </Text>
          <Text style = {{ fontSize: 15, marginBottom: 15, marginLeft: 10, marginRight: 10}}>
          {location}
          </Text>

          <View style={styles.button}>
              <TouchableOpacity
                onPress={() => navigation.navigate('BookNowScreen',
                { place_id: data.id, city: data.city })}
                style={[styles.signIn, {
                  borderColor: '#FF6347',
                  borderWidth: 1,
                  marginTop: -10,
                }]}
              >
              <Text style={[styles.textSign, {
                color: '#FF6347'
                }]}>Create new event</Text>
              </TouchableOpacity>
          </View>

          {eventData.map((marker, index) =>(
            <View style={styles.container} key={index}>
            <View style={styles.itemRight}>
            <Image 
              source = {{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}}
              style = {{ width: 75, 
              height: 75, 
              borderRadius: 150
            }}/>
            </View>
            <View style={styles.itemLeft}>
              <Text style = {{ fontSize: 15 , fontWeight: 'bold', marginBottom: 5}}>
                {marker.host_name}
              </Text>
              <Text style = {{ fontSize: 12 }}>
                Start Time: {marker.start_time}
              </Text>
              <Text style = {{ fontSize: 12 }}>
                End Time: {marker.end_time}
              </Text>
              <Text style = {{ fontSize: 12 }}>
                Max Party: {marker.party_size}
              </Text>
              <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {}}
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
          </View>
        ))}
          
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
