import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MapScreen } from "../pages/MapScreen"; 
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ChatScreen } from "../pages/ChatScreen";
import { ScheduleScreen } from "../pages/ScheduleScreen";
import { ProfileNavigator, ChatNavigator, MapNavigator, LoginNavigator } from "../components/MainStackNavigator";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 90,
            ...styles.shadow
          }
        }}>
        <Tab.Screen name="Login" component={LoginNavigator} options={{
        tabBarIcon: ({focused}) =>(
          <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={require('../assets/icons/logout.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                marginTop: 10,
                marginBottom: 5,
                tintColor: focused ? '#2898FA' : '#748c94'
              }}
            />
            <Text style={{color: focused ? '#2898FA' : '#748c94', fontSize: 12, textAlignVertical: "center",textAlign: "center"}}>Logout</Text>
          </View>
        ),
        tabBarVisible: false,
      }}
      />
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={require('../assets/icons/calendar.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                marginTop: 10,
                marginBottom: 5,
                tintColor: focused ? '#2898FA' : '#748c94'
              }}
            />
            <Text style={{color: focused ? '#2898FA' : '#748c94', fontSize: 12, textAlignVertical: "center",textAlign: "center"}}>Schedule</Text>
          </View>
        ),
      }}/>
        <Tab.Screen name="Search" component={MapNavigator} options={{
        tabBarIcon: ({focused}) =>(
          <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={require('../assets/icons/location-pin.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                marginTop: 10,
                marginBottom: 5,
                tintColor: focused ? '#2898FA' : '#748c94'
              }}
            />
            <Text style={{color: focused ? '#2898FA' : '#748c94', fontSize: 12, textAlignVertical: "center",textAlign: "center"}}>Map</Text>
          </View>
        ),
      }}
      />
      <Tab.Screen name="Chat" component={ChatScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={require('../assets/icons/messenger.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                marginTop: 10,
                marginBottom: 5,
                tintColor: focused ? '#2898FA' : '#748c94'
              }}
            />
            <Text style={{color: focused ? '#2898FA' : '#748c94', fontSize: 12, textAlignVertical: "center",textAlign: "center"}}>Chat</Text>
          </View>
        ),
      }}/>
      <Tab.Screen name="Profile" component={ProfileNavigator} options={{
        tabBarIcon: ({focused}) =>(
          <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={require('../assets/icons/user.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                marginTop: 10,
                marginBottom: 5,
                tintColor: focused ? '#2898FA' : '#748c94'
              }}
            />
            <Text style={{color: focused ? '#2898FA' : '#748c94', fontSize: 12, textAlignVertical: "center",textAlign: "center"}}>Profile</Text>
          </View>
        ),
      }}/>
      </Tab.Navigator>
    
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})