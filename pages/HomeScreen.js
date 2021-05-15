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
    </View>
  );
}
