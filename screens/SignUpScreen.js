import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from "react";
import { Picker } from '@react-native-community/picker'

export const SignUpScreen = ({route, navigation}) => {
  const [selectedGender, setSelectedGender] = useState('male');
  const {userData} = route.params;

  var name = userData.name;
  var avatar = userData.photoUrl;
  var email = userData.email;
  var access_token = userData.id;

  const genderChoice = [
    {      value: 'male',    },
    {      value: 'female',    },
    {      value: 'unspecified',    }];

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
      }
      catch (e) {
        console.log(e)
   
      }
      alert('Changes saved');
    }
  
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.text_footer}> Select Gender </Text>
      <View style={styles.action}>
        <Picker
          selectedValue={selectedGender}
          style={{marginTop: -30, width: 150, color: '#FFFF'}}
          onValueChange={(itemValue) => changeGender(itemValue)}
        >
          <Picker.Item label="male" value="male" />
          <Picker.Item label="female" value="female" />
          <Picker.Item label="unspecified" value="unspecified" />
        </Picker>
      </View>
     
      <Text style={styles.text_footer}> Enter Fun Fact </Text>
      <View style={styles.action}>
        <TextInput
          placeholder = "Enter fun fact here"
          style={styles.textInput}
          autoCapitalize='none'
          onChangeText={(val) => changeFun(val)}
          >
        </TextInput>
      </View>

      </View>
      <View style={styles.container3}>
        <Button title="Sign Up Now" onPress={postData} color='white'>
        </Button>
      </View>
    <View style={styles.container2}>
      <Button title="Cancel" onPress={logout} color='white'>
      </Button>
    </View>
    </View>

    );
  };

export default  SignUpScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    flex: 2,
    bottom: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  container3: {
    backgroundColor: '#2898fa',
    borderRadius: 5,
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
    backgroundColor: '#2898fa',
    borderRadius: 5,
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
    marginLeft: 25,
    marginTop: '5%',
    width: 20,
    paddingLeft: 10,
    color: '#05375a',
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  }
});