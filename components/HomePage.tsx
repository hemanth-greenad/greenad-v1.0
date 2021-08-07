import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
// style
import primaryColor from '../styles/style';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
// components
import Carousel from './Carousel';
import VerticalScroll from './cards-vertical-scroll';
import Heading from './HeadingComponent';
import ImageWithCuttedEdge from './Img-with-cutted-edge';
import weeklyPack from './Weekly-Pack';
import ProductItem from './ProductItemComponent';

//drawer navigation
import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigationState } from 'react-navigation';
import Second from './Second';
import Third from './Third';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';



const HomePage = ({ navigation }: StackScreenProps<RootStackParamList>) => {




  function renderHeader() {
    return (
      // top notification section of the phone
      <View style={styles.screenTop}>
        <View>
        </View>
        <View style={{ marginTop: 40, flexDirection: 'row', height: 80, backgroundColor: primaryColor }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
            <Ionicons style={{ marginLeft: 10 }} name="menu" size={32} color="black" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 100, fontSize: 20, color: 'white', textAlign: 'center' }}>Greenad</Text>
          <Ionicons style={{ marginLeft: 100 }} name="md-cart" size={24} color="black" />
        </View>
      </View>);
  }
  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={{ marginTop: 25, flexDirection: 'row', backgroundColor: primaryColor }}>
        <FontAwesome name="search" style={{ top: 16, left: 30, position: 'relative', zIndex: 2 }} size={22} color="black" />
        <TextInput onFocus={() => navigation.navigate('search')} placeholder="          Search..." style={{ backgroundColor: 'white', width: '90%', margin: 7, marginLeft: 0, height: 40 }}></TextInput>
      </View>
      <ScrollView >
        <View >
          {Carousel}
        </View>
        {Heading('Best sales')}
        <VerticalScroll />
        {Heading('combo pack')}
        {ImageWithCuttedEdge()}
        {Heading('value for money')}
        <VerticalScroll />
        {Carousel}
        <View>
          {weeklyPack()}
        </View>
        <ProductItem onItemsAdd={() => {
          changeCartVal(cartVal + 1);
          DeviceEventEmitter.emit('updateBadgeCount', cartVal + 1);
        }} onItemsRemove={() => {
          changeCartVal(cartVal - 1);
          DeviceEventEmitter.emit('updateBadgeCount', cartVal - 1);
        }} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTop: { marginTop: 0, height: 50, backgroundColor: '#43a047' },
  searchBar_inputStyle: { top: -10 },
});
export default HomePage;
















