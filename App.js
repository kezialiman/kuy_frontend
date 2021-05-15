import React from 'react';
import { MainStackNavigator } from "./components/MainStackNavigator"
import { NavigationContainer } from "@react-navigation/native";

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    )
  }
}