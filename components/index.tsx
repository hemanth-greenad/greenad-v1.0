import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./HomePage";
import Second from "./Second";
import Fourth from "./Fourth";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "../screens/SearchScreen";
import primaryColor from "../styles/style";
import ResultProducts from "./ResultProductPage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Third from "./Third";
import DrawerScreen from "../screens/DrawerNavigation";
import { color } from "react-native-reanimated";
import { Icon } from "react-native-elements";
import Item from "./IndividualItem";
import weeklyPackScreen from "../screens/WeekPackScreen";
import LoginScreen from "./Login/LoginScreen";
import PinValidation from "./Login/PinValidation";
import MapScreen from "./Login/MapScreen";
import AccountScreen from "./Login/AccountScreen";
import RegisterAddressScreen from "./Login/RegisterAddressScreen";
import AddressScreen from "./Login/AddressScreen";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function loginNav() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="pin"
        component={PinValidation}
        options={{
          title: "GREENAD",
          headerStyle: {
            backgroundColor: "#2e8b57",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function Account() {
  return (
    <Stack.Navigator initialRouteName="account">
      <Stack.Screen
        name="account"
        component={AccountScreen}
        options={{
          title: "GREENAD",
          headerStyle: {
            backgroundColor: "#2e8b57",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="address_Screen"
        component={AddressScreen}
        options={{
          title: "GREENAD",
          headerStyle: {
            backgroundColor: "#2e8b57",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="register_Address"
        component={RegisterAddressScreen}
        options={{
          title: "GREENAD",
          headerStyle: {
            backgroundColor: "#2e8b57",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="map"
        component={MapScreen}
        options={{
          title: "GREENAD",
          headerStyle: {
            backgroundColor: "#2e8b57",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
function stackTab() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={TabNav} />
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="item" component={Item} />
      <Stack.Screen name="result" component={ResultProducts} />
      <Stack.Screen name="weekPack" component={weeklyPackScreen} />
    </Stack.Navigator>
  );
}

function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "black",
        activeBackgroundColor: "#295F2D",
        inactiveBackgroundColor: primaryColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color="" />
          ),
        }}
      />
      <Tab.Screen
        name="d"
        component={Second}
        options={{
          tabBarLabel: "My Orders",
          tabBarIcon: ({ color }) => (
            <Fontisto name="shopping-basket" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Fourth}
        options={{
          tabBarLabel: "Favourites",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-sharp" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const MainPage = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerScreen {...props} />}>
        <Drawer.Screen
          options={{ drawerIcon: () => <Icon name="home" /> }}
          name="Home"
          component={stackTab}
        />
        <Drawer.Screen
          options={{ drawerIcon: () => <Icon name="home" /> }}
          name="Login"
          component={loginNav}
        />
        <Drawer.Screen
          options={{ drawerIcon: () => <Icon name="home" /> }}
          name="Account"
          component={Account}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    width: 100,
    height: 100,
  },
});
export default MainPage;
