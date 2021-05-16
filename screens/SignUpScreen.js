import React from 'react';
import {StyleSheet, Text, View, Button, Input, TextInput,} from 'react-native';
import {useState, useEffect} from "react";
import {Picker} from '@react-native-community/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Dropdown } from 'react-native-material-dropdown';
//import Select from "react-dropdown-select";



const SignUpScreen = ({route, navigation}) => {
  const [triggerEndpoint, setTriggerEndpoint] = useState(false);
  const [selectedGender, setSelectedGender] = useState('male');
  //const [user, setUser] = useState();
  const {userData} = route.params;


  const [gender, setGender] = useState([]);
  const [fun_fact, setFun_Fact] = useState([]);


  const [isLoaded, setLoaded] = useState(false);

  var name = userData.name;
  var avatar = userData.photoUrl;
  var email = userData.email;
  var access_token = userData.id;

  const genderChoice = [
    {      value: 'male',    },
    {      value: 'female',    },
    {      value: 'unspecified',    }];
  
/*const getData = async () => {
  try {
    const jsonValue =  await AsyncStorage.getItem('googleuser')
    jsonValue != null ? 
    setUser(JSON.parse(jsonValue)):
    console.log('aaaa')

    //null;
    
   
  } catch(e) {
    // error reading value
  }
} */
  /*
  useEffect(() => {
    //getData();
    setUser(userData);
    console.log('Gooogle', userData);
  }, [])
*/
    //useEffect(() => {
      //getData();
    //  console.log('Gooogle', user);
    //}, [triggerEndpoint]);
   

  //console.log('Current User', user);
 /* if(typeof user !== "undefined")
{
  name = user.user.name;
  email = user.user.email;
  avatar = user.user.photoUrl;
  access_token = user.user.id;
} */
    //setUser(userData)

    function delCookie(){
      cookies.set('access_token', {expires: Date.now()});
    }
  
  const [data, setData] = React.useState({
      name: name,
      gender: '',
      email: email,
      fun_fact: '',
      avatar: avatar,
      access_token: access_token,

  });

  const populateData = () => {
    setData({
    ...data,
    name: name,
    email: email,
    avatar: avatar,
    access_token: access_token,

  });
  }

const changeGender = (val) => {
  if(val.length != 0) {
    setSelectedGender(val)
    setData({
      ...data,
      gender: val,
      
    });
  } else {
    setSelectedGender(val)
    setData({
      ...data,
      gender: val,

  });
}
};


const changeFun = (val) => {
  if(val.length != 0) {
    setData({
      ...data,
      fun_fact: val,


    });
  } else {
    setData({
      ...data,
      fun_fact: val,
   
  });
}
};



  const logout = async () => {
    try {
          delCookie;
          navigation.navigate("Login");
        }
       catch (error) {
        console.log("LoginScreen.js 19 | error with login", error);
      }
    };

    async function postData(){
      //populateData();
      try {
        console.log("Posting data...")
        console.log(JSON.stringify(data))
        await fetch("http://kuy-hangout.herokuapp.com/users/", {
          method: 'POST',
          body: JSON.stringify({
            name: data.name,
            access_token: data.access_token,
            email: data.email,
            gender: data.gender,
            fun_fact: data.fun_fact
            //avatar: data.avatar
          }),
  
          headers:{
            'Content-Type': 'application/json; charset=UTF-8'
          }
        })
        //.then(response => response.json())
        //.then(json => console.log(json))
        //.then(navigation.navigate('Profile'))
      }
      catch (e) {
        console.log(e)
   
      }
      alert('Changes saved');
    }
  return (
  <View style={styles.container}>
    <View style={styles.header}>
 
      
      <Text style={styles.text_footer}> Gender </Text>
      <View style={styles.action}>
        <Picker
          selectedValue={selectedGender}
          style={{ height: '60%', width: 150, color: '#FFFF'}}
          onValueChange={(itemValue) => changeGender(itemValue)}
        >
          <Picker.Item label="male" value="male" />
          <Picker.Item label="female" value="female" />
          <Picker.Item label="unspecified" value="unspecified" />
        </Picker>
      </View>

     
      <Text style={styles.text_footer}> Fun Fact </Text>
      <View style={styles.action}>
        <TextInput
          placeholder = "Enter your Fun Fact"
          style={styles.textInput}
          autoCapitalize='none'
          onChangeText={(val) => changeFun(val)}
          >
        </TextInput>
      </View>

  
      
    </View>
    <View style={styles.container3}>
    
    <Button title="Sign Up Now" onPress={postData}>

    </Button>
    </View>
  
    <View style={styles.container2}>
    
    <Button title="Cancel" onPress={logout}>

    </Button>
    </View>
  </View>

  );
};
/*      <Dropdown        
      label='Select Gender'        
      data={genderChoice}      
      onChangeText={(val) => changeGender(val)}
  		/>   */
export default  SignUpScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    backgroundColor: "#2898FA",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    flex: 2,
    bottom: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,

    backgroundColor: '#2898FA',
    shadowOpacity: 0.4,
        shadowRadius: 1,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 0},
        borderColor: 'black',
  },
  container3: {
    backgroundColor: 'white',
    borderRadius: 18,
    position: 'absolute',
    width: '75%',
    height: '5%',
    left: '12%',
    top: '70%',
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

container2: {
  backgroundColor: 'white',
  borderRadius: 18,
  position: 'absolute',
  width: '75%',
  height: '5%',
  left: '12%',
  top: '80%',
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

text_footer: {
  color: '#05375a',
  fontSize: 18,
  marginTop: '5%'
},
textInput: {
  flex: 1,
  marginTop: '5%',
  width: 20,
  paddingLeft: 10,
  color: '#05375a',
},
action: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',
  paddingBottom: 5
}



});