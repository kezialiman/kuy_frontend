import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CookiesProvider } from "react-cookie";

const Stack = createStackNavigator();

// Screens
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignUpScreen from "./screens/SignUpScreen";

//React Navigation Setup
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
  <CookiesProvider>
      <NavigationContainer>
        <Stack.Navigator 
              screenOptions={{
              headerShown: false}}>

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </CookiesProvider>
  );
};

export default App;