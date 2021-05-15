import React from 'react';
import Map from "./components/map";
import {
  StackNavigator,
} from 'react-navigation';
// export default class App extends React.Component {
//   render() {
//     return (
//       <Map/>
//     )
//   }
// }



const App = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('Profile')
        }
      />
    );
  }
}