import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import FlatListBasics from '../components/FlatListBasics';
import { BookNowScreen } from './BookNowScreen';
import {actions} from "./ChatScreen";

const HEROKU_URL = "http://kuy-hangout.herokuapp.com/";

const foo = () => {
  alert(
    "hi"
  )
}

export function VenueScreen ({navigation}) {
  // Fetch data for events
  const [events, setEvents] = useState({});
  const [id, setId] = useState([]);
  const inputLocation = {
    placeId: "",
    placeName: "Chipotle",
    location: "2121 dwight way",
  };
  const utcTime = new Date();

  useEffect(() => {
    fetch(HEROKU_URL + `events?place_id=${inputLocation.placeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then( resp => resp.json())
    .then( resp => {
      var idArray = new Array();
      const test_data = Object(resp.data)
      for (i = 0; i < resp.data.length; i++) {
        idArray.push({
          "place_id": test_data[i].place_id,
          "host_id": test_data[i].host_id,
          "host_name": test_data[i].host_name,
          "start_time": [
            test_data[i].start_time.split("T")[0].split("-").slice(1, 3).join("/"), 
            test_data[i].start_time.split("T")[1].split(":").slice(0, 2).join(":")
          ],
          "end_time": test_data[i].end_time,
          "party_size": test_data[i].party_size,
        });
      }
      setId(idArray);
      setEvents(Object(resp.data))
    })
    .catch( error => console.log(error))
  },[]);

  // const [host, setHost] = useState([]);
  // for (const event of id) {
  //   useEffect(() => {
  //     fetch(HEROKU_URL + `users?id=${event.host_id}`, {
  //         method: 'GET',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         }
  //     })
  //     .then( resp => resp.json())
  //     .then( resp => setHost(resp))
  //     .catch( error => console.log(error))
  //   },[]);
  // }

  const venue = inputLocation.placeName;
  const location = inputLocation.location;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{venue}</Text>
        <Text style={styles.sectionTitle}>{location}</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={id}
          renderItem={({item}) => 
          <Text>
          <Text style={styles.item}>{item.host_name} is waiting for you on </Text>
          <Text>{item.start_time[0]}</Text>
          <Text> at {item.start_time[1]}</Text>
          </Text>
          }
        />
      </View>
      <Button title="Add" onPress={() => navigation.navigate('BookNow')}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  containerBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    alignItems: 'center',
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: 'center',
  // },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#2898FA",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 18,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  header: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center'
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    alignItems: 'center'
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  card: {
      minWidth: 275,
      maxHeight: 190,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
  },
  container: {
    flex: 1,
    paddingTop: 10
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
});