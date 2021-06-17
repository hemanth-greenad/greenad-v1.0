import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './HomePage';
import Second from './Second';
import Fourth from './Fourth';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from '../screens/SearchScreen';
import primaryColor from '../styles/style';
import ResultProducts from './ResultProductPage';
const Tab=createBottomTabNavigator();
const Stack=createStackNavigator();
function stackTab(){
 return(
<Stack.Navigator initialRouteName="Home" screenOptions={{headerShown : false}}>
    <Stack.Screen name="Home" component={TabNav} />
    <Stack.Screen name="search" component={SearchScreen} />
    <Stack.Screen name="result" component={ResultProducts} />
 </Stack.Navigator>
 );
}
function TabNav(){
 return(
  <Tab.Navigator initialRouteName="Home"
tabBarOptions={{activeTintColor:'white',inactiveTintColor:'black' ,activeBackgroundColor:'#295F2D',inactiveBackgroundColor:primaryColor}} >
  <Tab.Screen
   name="Home"
   component={HomePage}
   options={{
    title:'Home',
    tabBarLabel: 'Home',
    tabBarIcon: ({color}) => (
      <MaterialIcons name="home" size={24} color="" />
    ),
   }}
  />
  <Tab.Screen
   name="d"
   component={Second}
   options={{
    tabBarLabel: 'My Orders',
    tabBarIcon: ({color}) => (
      <Fontisto name="shopping-basket" size={24} color="black" />
    ),
   }}
  />
  <Tab.Screen
   name="Explore"
   component={Fourth}
   options={{
    tabBarLabel: 'Favourites',
    tabBarIcon: ({color}) => (
<Ionicons name="heart-sharp" size={24} color="black" />
    ),
   }}
  />
 </Tab.Navigator>
 );
}
const MainPage=()=>{
return(
  <NavigationContainer>
  {stackTab()}
 </NavigationContainer>);
}
const style=StyleSheet.create({
  container:{
    flexDirection:'row',
    alignContent:'center',
    width:100,
    height:100
  }
});
export default MainPage;
