import React from 'react';

import { View ,Text,Image,StyleSheet, TouchableOpacityBase} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContent } from '@react-navigation/drawer';
import { Icon, Header } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import primaryColor from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, RouteProp, useNavigation } from '@react-navigation/native';
import firebase from '../components/fb/firebase';
const url="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"

const DrawerScreen=({...props})=>{



  function profile(){
    return(
    <View>
<Image style={style.tinyLogo}  source={{
          uri:url
        }}/>
  </View>);
}




    return(


     <DrawerContentScrollView {...props}>
    <Header  
  centerComponent={{ text: 'My Profile', style: { top:70,fontSize:20} }}
  leftComponent={profile()}
  containerStyle={{
    backgroundColor: primaryColor,
    justifyContent: 'space-around',
    height:150,
    top:-50
  }} />
        
         <DrawerItemList itemStyle={{top:0}} {...props}/>
         <DrawerItem onPress={()=>{}} label="My Orders" icon={({color,size})=><Entypo name="shopping-bag" size={24} color="black" />}></DrawerItem>
         <DrawerItem onPress={()=>{}} label="Order Status" icon={({color,size})=><Entypo name="location-pin" size={24} color="black" />}></DrawerItem>
       <Text ></Text>
       <Text ></Text>
       <Text ></Text>
       <Text ></Text>
       <Text ></Text>
       <Text ></Text>
       <Text ></Text>
         <DrawerItem style={{top:20}} onPress={()=>{}} label="  About us"></DrawerItem>
         <DrawerItem style={{top:10}} onPress={()=>{}} label="  Contact us"></DrawerItem>
        
  {(firebase.auth().currentUser?.uid!==undefined)&&<DrawerItem onPress={()=>{firebase.auth().signOut().then((res)=>{alert(res)}).catch((msg)=>{console.log(msg)})}} label="Log out" icon={({color,size})=><Entypo name="log-out" size={24} color="black" />}></DrawerItem>}

  
         </DrawerContentScrollView>

    )

}
const style=StyleSheet.create({
tinyLogo: {
    width: 80,
    height: 80,
    top:50,
    borderRadius:10,

  },
})

export default DrawerScreen;