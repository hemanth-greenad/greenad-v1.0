import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { Component, useRef, useState } from "react";
import { useEffect } from "react";
import { StyleSheet, ActivityIndicator,Text, TextInput, View, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import firebase from '../fb/firebase';
type RootStackParamList = {
  vcode:String
  };
  type Props = RouteProp<RootStackParamList, 'vcode'>;

const PinValidation =({})=> {

  const val="BearereyJhbGciOiJSUzI1NiIsImtpZCI6IjM2NGU4NTQ1NzI5OWQ5NzIxYjczNDQyZGNiNTQ3Y2U2ZDk4NGRmNTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ3JlZW5hZC00ZjkzZSIsImF1ZCI6ImdyZWVuYWQtNGY5M2UiLCJhdXRoX3RpbWUiOjE2Mjk1MzU2MjcsInVzZXJfaWQiOiJNU1NHZHhua0VUY1V0VXVDMWZDQ0pjeGpoMDMzIiwic3ViIjoiTVNTR2R4bmtFVGNVdFV1QzFmQ0NKY3hqaDAzMyIsImlhdCI6MTYyOTUzNTYyOSwiZXhwIjoxNjI5NTM5MjI5LCJwaG9uZV9udW1iZXIiOiIrOTE5NTg1NjYwODkwIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrOTE5NTg1NjYwODkwIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.U9zgOS40aavw6Taabw4oHoiaDqxQvFFLZm6Y1cTorqcM0npcOUzcjNipZ0kxKwSIL66CE0Vw8dv2Tu021o6Ltb2xckovsJ-g76ChHvBygVni3dRFWAeGc8JPj-Aaa288M9KC2sH76bp2KJ4bzqzXsCkj780HfBY4JGzFlMwqVgNbnHhNE8h37bSacCSXZPqCh_f7b7gVCh3NDeltkPjc6iPD1vnN7HiBHZws6FiXVdFjBv1jLXTZq629m8k2pC4A5q_f1M2i-Fu0dTKa_LdgxM5mYIFHe1L7Hr9gsEWZsC1j-9YmWLmCpF-iOXmKHQRWKVLmBR2j2179HD7Gb78TAg";
  const navigation = useNavigation();
  const[pin1,setpin1]=useState('');
  const[pin2,setpin2]=useState('');
  const[pin3,setpin3]=useState('');
  const[pin4,setpin4]=useState('');
  const[pin5,setpin5]=useState('');
  const[pin6,setpin6]=useState('');
  const[code,setCode]=useState('');
  const[loads,setloads]=useState(false);
  
  const pin1ref:any = useRef(null);
  const pin2ref:any = useRef(null);
  const pin3ref:any = useRef(null);
  const pin4ref:any = useRef(null);
  const pin5ref:any = useRef(null);
  const pin6ref:any = useRef(null);
  const route=useRoute<Props>();
  const vcode:any=route.params;

  
   const confirmCode=async (codes:any)=>{
     setloads(true);
    const credential = firebase.auth.PhoneAuthProvider.credential(
      vcode.vcode,
      codes
    );
  

   await firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        firebase.auth().currentUser?.getIdToken(true).then((idtoken)=>{
console.log(idtoken)
            axios.post('https://greenad.herokuapp.com/saveUsers',{
              
            },
             {
               headers: {
                 Authorization: 'Bearer' + idtoken
               }
             }).then((result)=>navigation.navigate('Cart')).catch((err)=>console.log(err))

          })
      }).catch((r)=>{
        alert('invalid')
      });
  }
    return (
      <View style={{ backgroundColor: "#fbf2d4", height: "100%" }}>
        <View style={styles.container}>
          <View style={[styles.s]}>
            <TextInput
              style={[styles.c]}
              ref={pin1ref}
              maxLength={1}
              keyboardType={"numeric"}
              onChangeText={(p) => {
                setpin1(p);

                if (p !== "") {
                  pin2ref.current.focus();
                }
              }}
              value={pin1}
          
              autoFocus={true}
            />
          </View>
          <View style={[styles.s]}>
            <TextInput
              style={styles.c}
              ref={pin2ref}
              maxLength={1}
              keyboardType={"numeric"}
              onChangeText={(p) => {
               setpin2(p);
                if (p !== "") {
                  pin3ref.current.focus();
                }else{
                  pin1ref.current.focus();
                }
              }}
              value={pin2}
              
            />
          </View>
          <View style={styles.s}>
            <TextInput
              style={styles.c}
              ref={pin3ref}
              maxLength={1}
              keyboardType={"numeric"}
              onChangeText={(p) => {
                setpin3(p);
                if (p !== "") {
                  pin4ref.current.focus();
                }else{
                  pin2ref.current.focus();
                }
              }}
              value={pin3}
            />
          </View>
          <View style={styles.s}>
            <TextInput
              style={styles.c}
              ref={pin4ref}
              maxLength={1}
              keyboardType={"numeric"}
              onChangeText={(p) => {
                setpin4(p);
                if (p !== "") {
                  pin5ref.current.focus();
                }else{
                  pin3ref.current.focus();
                }
              }}
              value={pin4}
            />
            
          </View>
          <View style={styles.s}>
            <TextInput
              style={styles.c}
              ref={pin5ref}
              maxLength={1}
              keyboardType={"numeric"}
              onChangeText={(p) => {
                setpin5(p);
                if (p !== "") {
                  pin6ref.current.focus();
                }else{
                  pin4ref.current.focus();
                }
              }}
              value={pin5}
            />
            </View>
            <View style={styles.s}>
            <TextInput
              style={styles.c}
              ref={pin6ref}
              maxLength={1}
              keyboardType={"numeric"}
              onChangeText={(p) => {
                setpin6(p);
                if(p===""){
                  pin5ref.current.focus();
                }
               
              }}
              value={pin6}
            />
            </View>
        </View>
        <View style={{ top: 250 }}>
          <View style={[styles.submit]}>
            <TouchableOpacity onPress={()=>confirmCode(pin1+pin2+pin3+pin4+pin5+pin6)}>
              <Text style={styles.submitText}>verify</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loads&&<View style={[styles.container, styles.horizontal]}>
  <ActivityIndicator size="large" color="green" />
  </View>}
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    top: 200,
  },
  s: {
    flex: 0.6,
    justifyContent: "space-evenly",
    fontWeight: "600",
  }, horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    
  },
  c: {
    backgroundColor: "#f5f4f2",
    fontWeight: "600",
    alignSelf: "center",
    padding: 10,
    fontSize: 20,
    height: 55,
    width: "50%",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#939597",
    textAlign: "center",
    marginTop: 10,
  },
  submit: {
    marginRight: 40,
    marginLeft: "60%",
    marginTop: 10,
    width: 100,
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
});

export default PinValidation;