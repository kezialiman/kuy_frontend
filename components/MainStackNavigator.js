import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MapScreen } from '../pages/MapScreen';
import { HomeScreen } from "../pages/HomeScreen";
import { ProfileScreen } from "../pages/ProfileScreen";
import { ScheduleScreen } from "../pages/ScheduleScreen";
import { ChatScreen } from "../pages/ChatScreen";
import { SearchScreen } from "../pages/SearchScreen";
import { VenueScreen } from "../pages/VenueScreen";
import { EditProfileScreen } from "../pages/EditProfileScreen";
import { Animated } from "react-native"
import { BookNowScreen } from '../pages/BookNowScreen';
import { AnimatedScrollView } from '../components/AnimatedScrollView';
import { LoginScreen } from "../screens/LoginScreen";
import { InitialProfileScreen } from "../screens/InitialProfileScreen";
import { SignUpScreen }from "../screens/SignUpScreen";

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

export function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  )
}

export function MapNavigator() {
  return (
    <Stack.Navigator>
    <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
    <Stack.Screen
        name="AnimatedScrollView"
        component={AnimatedScrollView}
        options={{ headerStyleInterpolator: forFade }}
      />
    <Stack.Screen
        name="VenueScreen"
        component={VenueScreen}
        options={{ headerStyleInterpolator: forFade }}
    />
    <Stack.Screen
        name="BookNowScreen"
        component={BookNowScreen}
        options={{ headerStyleInterpolator: forFade }}
    />
          <Stack.Screen name="InitialProfileScreen" component={InitialProfileScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export function LoginNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="InitialProfile" component={InitialProfileScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export function MainStackNavigator() {
  return (
    <Stack.Navigator>
      {/*<Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerStyleInterpolator: forFade }}
      />*/}
      <Stack.Screen
        name="Home"
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
        name="Schedule"
        component={ScheduleScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>)
};
