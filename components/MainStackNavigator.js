import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MapScreen from '../pages/MapScreen';
import { HomeScreen } from "../pages/HomeScreen";
import { ProfileScreen } from "../pages/ProfileScreen";
import { ScheduleScreen } from "../pages/ScheduleScreen";
import { ChatScreen } from "../pages/ChatScreen";
import { SearchScreen } from "../pages/SearchScreen";
import { EditProfileScreen } from "../pages/EditProfileScreen";
import { Animated } from "react-native"

const Stack = createStackNavigator();

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#2898FA' },
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Map"
        component={() => MapScreen(60, -122)}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>)
};
