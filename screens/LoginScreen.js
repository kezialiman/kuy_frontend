import React from "react";
import { StyleSheet, 
            View, 
            Text, 
            Button, 
            SafeAreaView, 
        } from "react-native";
import * as Google from "expo-google-app-auth";


const LoginScreen = ({ navigation }) => {
//where to fetch API data

  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: `352050813034-28aonuneo4ag9g37jajhfb0bgria73gl.apps.googleusercontent.com`,
        androidClientId: `<YOUR_ANDROID_CLIENT_ID>`,
      });

      if (type === "success") {
    
        console.log("LoginScreen.js 17 | success, navigating to profile");
        navigation.navigate("Profile", { user });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    //area is safe for anyone to view
    <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.header}>

          <Text style={styles.discover}>
          Discover new friends at new places
              </Text>
            <Text style={styles.search}>
            Search millions of jobs and get the inside scoop on companies.
            Wait for what? Let’s get start it!
            </Text>
          </SafeAreaView>
          <SafeAreaView style={styles.footer}>
    <View style={styles.container2}>
      <Button title="Sign in with Google" onPress={signInAsync} />
    </View>

          </SafeAreaView>


    </SafeAreaView>
    
    
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    search: {
        position: 'absolute',
        width: 253,
        height: 60,
        left: 41,
        top: 460,
        fontFamily: 'Source Sans Pro',
        fontSize: 16,
        lineHeight: 20,

        /* White */

        color:'#FFFFFF',
    },
    discover: {
        position: 'absolute',
        width: 253,
        height: 150,
        left: 40,
        top: 300,
  
        fontSize: 40,
        lineHeight: 50,
        color: '#FFFFFF',
    },
    container2: {
        backgroundColor: 'white',
        borderRadius: 18,
        position: 'absolute',
        width: '75%',
        height: '40%',
        left: 44,
        top: '-20%',
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.4,
        shadowRadius: 1,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 0},
        borderColor: 'black',
    },
  header: {
    fontSize: 25,
    flex: 2,
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#2898FA',
    shadowOpacity: 0.4,
        shadowRadius: 1,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 0},
        borderColor: 'black',
  },
  footer: {
      flex: 0.5,

      backgroundColor: '#fff',
      //paddingVertical: 50,
      //paddingHorizontal: 30
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }

});