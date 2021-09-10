import React, { useEffect, useState } from 'react'
import { View ,Text,Image, StyleSheet, ScrollView} from 'react-native';
import { Header } from 'react-native-elements';
import primaryColor from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import  Json from '../assets/sample.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
// type RootStackParamList = {
//     id:String
//     };
//     type Props = RouteProp<RootStackParamList, 'id'>;

function Item({ route, navigation }:any){
    const{id}=route.params;
    const[title,setId]=useState("");
    const[imgurl,setImage]=useState("url");

    useEffect(()=>{
        const cItem=Json.info.filter(a=>a.id===id);
        setId(cItem[0].title);
        setImage(cItem[0].img);

    })

return(
   
    <View>
         <ScrollView>
        <View>
        <Header 
     statusBarProps={{ backgroundColor:'#43a047'}} containerStyle={{top:30,height:60,backgroundColor:primaryColor}} />
      </View>
    <View style={{top:30,elevation:4,borderWidth:0 ,height:400,backgroundColor:'#FFFFFF'}}>  
    <View style={{top:30,left:25,borderWidth:0,width:250}}>
    <Text style={{fontSize:20,fontFamily:'sans-serif-condensed',fontWeight:'bold'}}>{title}</Text> 
     </View> 
     <View style={{top:30,left:25,borderWidth:0,width:250,flexDirection:'row'}}>
    <Text style={{fontSize:20,fontFamily:'sans-serif-condensed'}}>₹18 - MRP</Text> 
    <Text style={{textDecorationLine: 'line-through',fontSize:20,fontFamily:'sans-serif-condensed',}}> ₹20</Text> 
    <Text style={{left:15,top:4,height:18,backgroundColor:'green',fontSize:12,fontFamily:'sans-serif-condensed',fontWeight:'bold'}}> 10% offer</Text> 

    </View> 

    <View style={{top:30,left:25,borderWidth:0,width:250,flexDirection:'row'}}>
    <Text style={{fontSize:10,fontFamily:'sans-serif-condensed'}}>(inclusive of all taxes)</Text> 
    </View> 


     <View style={{alignItems:'center',top:45,elevation:5}}>
         <Image style={style.tinyLogo} source={{
          uri:imgurl
        }}/>
     </View> 



    </View>
    <View style={{top:35,elevation:4,borderWidth:0,height:80,backgroundColor:'#FFFFFF',flexDirection:'row'}} >  
    <MaterialCommunityIcons style={{left:10,top:10}} name="truck-delivery-outline" size={24} color="black" />
    <Text style={{fontSize:15,top:10,left:15,fontFamily:'sans-serif-condensed'}}>Delivery within 12 hour</Text> 
    </View>
    </ScrollView>
    <Header rightComponent={rbutton()}  leftComponent={lbutton()} statusBarProps={{ backgroundColor:'#43a047'}} containerStyle={{top:180,height:60,backgroundColor:primaryColor}} />
    </View>
    
)
}


function lbutton(){
    return(
<View style={{width:170,borderWidth:0,alignItems:'center',top:-16,left:-10,height:60,flexDirection:'row',backgroundColor:'#FFA500'}}>
<Ionicons name="save" size={30} color="black" />
    <Text style={{left:20,fontSize:20}}>Save</Text>
</View>

    );
}

function rbutton(){
    return(<View style={{width:170,borderWidth:0,alignItems:'center',top:-15,height:60,flexDirection:'row'}}>
        <FontAwesome name="cart-plus" size={30} color="black" />
        <Text style={{left:20,fontSize:20}}>Add to Cart</Text>
        </View>);
}
const style=StyleSheet.create({
    tinyLogo: {
        width: 250,
        height: 250,
        borderRadius:10,
        left:10
      },
})
export default Item;