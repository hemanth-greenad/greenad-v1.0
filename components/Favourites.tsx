import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Json from '../assets/sample.json';
import Heading from './HeadingComponent';


export interface favItem {
  id: number,
  price: number,
  quantity: number,
  title: string,
  imgUrl: string
}

const Favourites = () => {
  let fav: favItem[] = [];

  Json.info.forEach((x, i) => {
    fav.push({
      id: i,
      price: 20,
      quantity: 1,
      title: x.title,
      imgUrl: x.img
    });
  })
  const [favItems, setFavItems] = useState<favItem[]>([...fav]);
  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;

  function removeCartItem(id: number) {
    const i = favItems.findIndex(x => { return x.id === id; });
    let items = [...favItems];
    items.splice(i, 1)
    setFavItems(x => [...items]);

  }

  return (
    <View style={{ marginTop: 50, backgroundColor: 'white' }}>
      {Heading(`Favourites(${favItems.length})`)}
      <View style={{ backgroundColor: 'white' }}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ display: 'flex', width: '100%', flexWrap: 'wrap', flexDirection: 'row' }}>
            {favItems.length ? favItems.map((item, i) => {
              return (
                <View style={{ width: width - 10 }}>

                  <ItemView quantity={item.quantity} price={item.price} id={item.id} imgUrl={item.imgUrl} name={item.title} onItemsRemove={(x) => { removeCartItem(x) }} />

                </View>
              )
            }) : <View style={{ marginTop: '20%', marginHorizontal: 20, height: '100%' }}>
              <Icon type="font-awesome" name="heart" color='tomato' size={200} />
              {/* <Image source={{ uri: 'https://image.pngaaa.com/61/1172061-middle.png' }} style={{ width: 300, height: 300, borderRadius: 10, margin: 3 }}></Image> */}
              <Text style={{ fontSize: 20, marginLeft: '10%', fontFamily: 'space-mono' }}>Your Favourite List is Empty</Text></View>}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

interface item {
  id: number,
  imgUrl: string,
  name: string,
  price: number,
  quantity: number,
  onItemsRemove: (id: number) => void;
}
function ItemView(props: item) {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 3, paddingBottom: 10, borderBottomWidth: 2, borderColor: 'rgba(112,112,112,.38)', }}>
      <Image source={{ uri: props.imgUrl }} style={{ width: 100, height: 100, borderRadius: 10, margin: 3 }}></Image>
      <View style={{ height: 100 }}>
        <Text style={{ padding: 2, margin: 2, fontSize: 15, fontWeight: 'bold' }}>{props.name}</Text>
        <Text style={{ fontSize: 15, marginLeft: 8 }}>Price:₹ {props.quantity * props.price}</Text>
        <View style={[{ marginVertical: 8, display: 'flex', flexDirection: 'row', marginHorizontal: 10 }]}>

        </View>
        <View>
          <TouchableOpacity onPress={() => { props.onItemsRemove(props.id); }} style={styles.removeButton}>
            <Text style={{ color: 'white' }}>Remove </Text>
            <FontAwesome name="trash" style={{ color: 'white', backgroundColor: '#c50707' }} size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    marginLeft: '45%',
    width: 100,
    backgroundColor: '#c50707',
    color: 'white',
    padding: 6,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row'
  },
});

export default Favourites;