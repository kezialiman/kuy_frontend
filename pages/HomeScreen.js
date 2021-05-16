import React from 'react';
import { View, Text, Button } from 'react-native';

export function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Maps"
        onPress={() => navigation.navigate('Map')}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Go to Schedule"
        onPress={() => navigation.navigate('Schedule')}
      />
      <Button
        title="Go to Chat"
        onPress={() => navigation.navigate('Venue')}
      />
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  );
}
