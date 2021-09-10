import { Header } from "@react-navigation/stack";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { onChange } from "react-native-reanimated";
import axios from 'axios';
import firebase from '../fb/firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';



const LoginScreen = ({ navigation }:any) => {
  const [phone, onChangePhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isFocused, setIsFocused] = useState(true);
  const[islogged,setIslogged]=useState(false);
  // const [handleBlur, setHandleBlur] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const [verificationId, setVerificationId] = useState('');
  const recaptchaVerifier:any= useRef(null);
 

const sendVerification = () => {

  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  
  phoneProvider
    .verifyPhoneNumber('+91'+phoneNumber, recaptchaVerifier.current)
    .then((code)=>{
      navigation.navigate("pin",{vcode:code})
    }
      );
    
    
};


  function phoneValidator() {
    let rjx = /^[0-9]+$/;
    let isValid = rjx.test(phone);
    if (phone == "" && !isValid) {
      setPhoneError("number should not be empty");
    } else if (!isValid) {
      setPhoneError("enter number only");
    } else if (phone.length != 10) {
      setPhoneError("number must be 10 digit");
    } else {
      setPhoneError("");
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Welcome to Greenade</Text>
      </View>

      <View style={styles.footer}>
        <View>
          <TextInput
            placeholder="eg : 9876543210"
            keyboardType={"numeric"}
            maxLength={10}
            style={[
              styles.textInput,
              {
                borderColor: isFocused ? "#939597" : "red",
              },
            ]}
            onBlur={() => [phoneValidator()]}
            onChangeText={(e)=>setPhoneNumber(e)}
            value={phoneNumber}
          />
        </View>
        <Text style={styles.textError}>{[phoneError]}</Text>
        <View style={styles.submit}>
          <TouchableOpacity onPress={sendVerification}>
            <Text style={styles.submitText}>Login</Text>
          </TouchableOpacity>
          <FirebaseRecaptchaVerifierModal
      ref={recaptchaVerifier}
    />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e8b57",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  textInput: {
    width: "85%",
    borderWidth: 3,
    borderRadius: 15,
    marginTop: 50,
    alignSelf: "center",
    padding: 10,
    fontSize: 16,
  },
  submit: {
    width: "85%",
    padding: 10,
    alignSelf: "center",
    marginTop: "70%",
  },
  submitText: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#2e8b57",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  textError: {
    color: "red",
    marginLeft: 25,
    fontSize: 15,
  },
});

export default LoginScreen;
