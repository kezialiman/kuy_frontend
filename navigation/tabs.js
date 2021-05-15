import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SearchBar } from "../pages/SearchScreen";
import { MapScreen } from "../pages/MapScreen"; 
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ChatScreen } from "../pages/ChatScreen";
import { ProfileScreen } from "../pages/ProfileScreen";
import { ScheduleScreen } from "../pages/ScheduleScreen";

const Tab = createBottomTabNavigator();

// const CustomTabBarButton = ({children, onPress}) => (
//   <TouchableOpacity
//     style={{
//       top: -30,
//       justifyContent: 'center',
//       alignItems: 'center',
//       ...styles.shadow
//     }}
//     onPress={onPress}
//     >
//       <View style={{
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: '#e32f45',
//       }}>
//         {children}
//       </View>
//     </TouchableOpacity>
// )

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
      <Tab.Screen name="Search" component={MapScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View styel={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={require('../assets/icons/location-pin.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#e32f45' : '#748c94'
              }}
            />
            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Map</Text>
          </View>
        ),
      }}
      />
      <Tab.Screen name="Chat" component={ChatScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View styel={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={require('../assets/icons/messenger.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#e32f45' : '#748c94'
              }}
            />
            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Chat</Text>
          </View>
        ),
      }}/>
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View styel={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={require('../assets/icons/calendar.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#e32f45' : '#748c94'
              }}
            />
            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Schedule</Text>
          </View>
        ),
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({focused}) =>(
          <View styel={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image
              source={require('../assets/icons/user.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#e32f45' : '#748c94'
              }}
            />
            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Profile</Text>
          </View>
        ),
      }}/>
    </Tab.Navigator>
  )
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