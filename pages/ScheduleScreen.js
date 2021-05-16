import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image} from 'react-native';

export const ScheduleScreen = () => {
  return (
    <View>
      <ScrollView>
        <View style = {{
          marginTop: 50,
          alignItems: 'center',
          shadowOpacity: 0.1,
          shadowRadius: 1,
          shadowColor: 'black',
          shadowOffset: { height: 2, width: 3}}}>
          </View>
          
          <View style = {{ alignItems: 'center' }}>
          <Text style = {{ fontSize: 25 , fontWeight: 'bold', marginBottom: 15}}>
          Upcoming Schedule
          </Text>
          <View style={styles.container}>
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
          Chipotle Mexican Grill
          </Text>
          <Text style = {{ fontSize: 12 }}>
          May 17th 2021, 5PM
          </Text>
          <Text style = {{ fontSize: 12 }}>
          Kezia, Isabella ...
          </Text>

            </View>
            
      </View>
          
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
  }
});