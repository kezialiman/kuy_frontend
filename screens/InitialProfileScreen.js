import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCookies } from "react-cookie";

export const InitialProfileScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const [cookies, setCookie] = useCookies(["access_token"]);
    const currCookie = cookies;
    console.log(currCookie)
    if (currCookie.access_token != null) {
      console.log("logout")
    }

    setCookie("access_token", user.id, {
    path:'/'
    });

    console.log("Initial profile cookie",cookies);
    
    //check if this obtained user id from google exists in json
    const userID = user.id;
    //var message;
    const herokuUrl = "http://kuy-hangout.herokuapp.com/users?access_token=" + userID;
    //sets loading as true (loading button shows)
      const [isLoading, setLoading] = useState(false);
      //sets initial as blank array
      const [data, setData] = useState([]);
      const [triggerEndpoint, setTriggerEndpoint] = useState(false);
        
      const storeData = async (val) => {
        try {
          await AsyncStorage.setItem('googleuser', JSON.stringify(val))
        } catch (e) {
          alert(e);
        }
      };
        
      useEffect(() => {
        //take from heroku url
        setLoading(true)
        fetch(herokuUrl)
        //put data into json format
        .then((response) => response.json())
        //take from users 'folder' and fetch data inside
        .then((result) => {
          setLoading(false);
          setData(result)
        })
        .catch((error) => {
          //setLoading(false);
          alert(error)
        })
        //loading is now set to false showing the data(initially true)
        .finally(setLoading(false));
    
      }, [triggerEndpoint]);
      
    const logout = async () => {
      try {
          navigation.navigate("Login");
        }
       catch (error) {
        console.log("LoginScreen.js 19 | error with login", error);
      }
      };

    const signup = () => {
        try {
              navigation.navigate("Login");
            }
           catch (error) {
            console.log("SignUp.js 19 | error with signup", error);
          }
        };
 
  
    const message = data.success;

    const onClickUser = () => {
      setTriggerEndpoint(true);
    
      if (message == true) {
        alert("Account Found");
        navigation.navigate('Map');
      } else {
        alert("Please continue to register account.");
        try {
            //storeData;
            navigation.navigate("SignUp", {userData: user});
          }
         catch (error) {
          console.log("SignUp.js 19 | error with signup", error);
        }
      }
      setTriggerEndpoint(false)
    }

    let contAs = "Continue as " + user.name.split(" ")[0];

    return (
      <View style={styles.container}>
        <Text  style={styles.header}>Welcome, {user.name} !</Text>
        <Image style={styles.image} source={{ uri: user.photoUrl }} />
        <View style={styles.container2}>
          <Button title= {contAs}
            color='white'
            onPress={() => navigation.navigate("Profile")}
            >
          </Button>
        </View>
        <View style={styles.container2}>
          <Button title="Logout" onPress={logout} color="white"/>
        </View>
      </View>
    );
  };

export default InitialProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center"
      },
    name: {
        fontSize: 15,
        padding: '2%',
        marginTop: -5
    },
    container2: {
        margin: '5%',
        backgroundColor: '#2898fa',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
      header: {
        fontSize: 25,
        fontWeight: 'bold'
      },
      image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "white",
        borderWidth: 3,
        borderRadius: 150
      }
});