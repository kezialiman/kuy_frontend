import React from 'react';
import { MainStackNavigator } from "./components/MainStackNavigator"
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./navigation/tabs"
import { CookiesProvider } from 'react-cookie'

export default class App extends React.Component {
  render() {
    return (
      <CookiesProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </CookiesProvider>
    )
  }
}
