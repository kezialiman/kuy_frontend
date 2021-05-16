import React from "react";
import { StyleSheet, Text, View, Image, Button,
    Dimensions, 
    ActivityIndicator, 
    FlatList } from "react-native";
import {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCookies } from "react-cookie";
//import { get } from "react-native/Libraries/Utilities/PixelRatio";

 
export const InitialProfileScreen = ({ route, navigation }) => {
    const { user } = route.params;

    // const [cookies, setCookie] = useCookies(["user"]);
  
    // function delCookie(){
    //   cookies.set('access_token', {expires: Date.now()});
    // }

    console.log("user from google", user);

    // setCookie("access_token", user.id, {
    //   path:'/'
    // });

    
   
   // console.log("Cookies",cookies);
    
    //check if this obtained user id from google exists in json
    const userID = user.id;
    //var message;
    const herokuUrl = "http://kuy-hangout.herokuapp.com/users?access_token=" + userID;
    //sets loading as true (loading button shows)
      const [isLoading, setLoading] = useState(false);
      //sets initial as blank array
      const [data, setData] = useState([]);
      const [triggerEndpoint, setTriggerEndpoint] = useState(false);
    
        //Sets user parameters to blank
        //const [id, setID] = useState([]);
        //const[gender, setGender] = useState([]);
    
        //const[fun_fact, setfun_fact] = useState([]);
       
        
        const storeData = async (val) => {
            try {
              await AsyncStorage.setItem('googleuser', JSON.stringify(val))
            } catch (e) {
                console.log(e);
              // saving error
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
                    //console.log("result")
                    //console.log(result);
                    setLoading(false);
                    setData(result)

                })
                    
                    //setting name based on read name in json 
                //setID(json.id);
                    //})
                //any errors will be shown as an alert
                .catch((error) => {
                    //setLoading(false);
                    alert(error)
                })
                //loading is now set to false showing the data(initially true)
                .finally(setLoading(false));
    
        }, [triggerEndpoint]);
        /*
       async function getMessage(){
            const response =  await fetch(herokuUrl);
            const data =  await response.json();
            return data.message;
        } */
   
const logout = async () => {
    try {
         delCookie;
          navigation.navigate("Login");
        }
       catch (error) {
        console.log("LoginScreen.js 19 | error with login", error);
      }
    };
 /*const signup = async () => {
    try {
          navigation.navigate("SignUp");
        }
       catch (error) {
        console.log("SignUp.js 19 | error with signup", error);
      }
    };*/

    const signup = () => {
        try {
              navigation.navigate("Login");
            }
           catch (error) {
            console.log("SignUp.js 19 | error with signup", error);
          }
        };
 
  //console.log(userID);
  //console.log(data.success);    
  const message = data.success;

  const onClickUser = () => {
    setTriggerEndpoint(true);
    
    if (message == true) {
        alert("Account Found");
        navigation.navigate('Map');
        //go to nicole's page
        /*
        try {
            navigation.navigate("Profile");
          }
         catch (error) {
          console.log("Profile.js 19 | error with signup", error);
        }
        */
    } else {
        alert("Please continue to register account.");
        //signup;
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
            onPress={     
                       //alert('yes')
                       () => navigation.navigate("Profile")

                    
                    
                    
                       //alert("not found")
                        
                     //alert(message)
                    //console.log(this.state.id)
                    //alert(userID)       
            //checks if user id in json
                    //userID in id ? 
                        //if true go to nicole's profile page
                        //alert('key exists') : 
                        
                        //if false go to account creation
                        //alert('unknown key')
            }
            >
        </Button>

      </View>
      <View style={styles.container2}>
      <Button title="Cancel" onPress={logout} color="white"/>
      </View>
    </View>
  );
};
/* This is to extract id
{isLoading?<ActivityIndicator/>:
    //puts flatlist in secure view
    <View>
        <FlatList
        data={data} 
        keyExtractor={({id}, index) => id}
        //creates item & list within the users.
        renderItem={({item}) =>{
            <Text>
                List of User Elements Here: Name __, Gender___, etc 
            </Text>
    }}
    >


    </FlatList>
    </View>} 
*/
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