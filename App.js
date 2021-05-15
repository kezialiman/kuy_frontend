import React from 'react';
import { MainStackNavigator } from "./components/MainStackNavigator"
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./navigation/tabs"

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    )
  }
}