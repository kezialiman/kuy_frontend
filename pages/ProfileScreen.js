import React, {useEffect, useState} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { useCookies } from "react-cookie"
//import Cookies from 'universal-cookie';


const HEROKU_URL = "http://kuy-hangout.herokuapp.com/"

export const ProfileScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const [cookies] = useCookies(["access_token"]);
  const currCookie = cookies;
  console.log('Cookie on profile', currCookie)

  useEffect(() => {
    console.log("Fetching data from heroku")
    setLoading(true)
    fetch(HEROKU_URL +'/users?access_token=' + currCookie.access_token)
      .then((response) => response.json())
      .then((results) => setData(results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }
  return (
    <View>
      <ScrollView>
        <View style={{
          padding: 10,
          width: '100%',
          backgroundColor: '#2898FA',
          height: 150
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
              source = {require('../assets/photo.png')}
              style = {{ width: 150, 
              height: 150, 
              borderRadius: 150,
              borderWidth: 5,
              borderColor: 'white',
              marginTop: -75,
              marginBottom: 1
            }}/>
            </TouchableOpacity>
          </View>
          <Button
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile', {
              userData: data
            })}
          />
          
          <View style = {{ alignItems: 'center' }}>
          <Text style = {{ fontSize: 25, marginTop: 10 }}>
           {data.name}
          </Text>

          <Text style = {{ fontSize: 15 }}>
            {data.gender}
          </Text>

          <Text style = {{ fontSize: 15, marginTop: 20 }}>
            Fun Fact:
          </Text>

          <View style={styles.container}>
          <Text style = {{ fontSize: 15}}>
          {data.fun_fact}
          </Text>
      </View>

          
          </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 15,
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