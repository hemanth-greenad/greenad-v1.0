import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { Badge } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Json from '../assets/sample.json';

interface AppState {
  pokemonUrls: string[];
  items: ItemDetails[];
}

export interface ItemDetails {
  name: string,
  imgUrl: string,
  offer: number,
}
class VerticalScroll extends React.Component<any, AppState> {


  constructor(props: {}) {
    super(props);
    this.state = {
      pokemonUrls: [],
      items: []
    };
  }

  componentDidMount() {

    let tempItem: ItemDetails[] = [];
    Json.info.forEach((x, i) => { tempItem.push({ name: x.title, imgUrl: x.img, offer: i } as ItemDetails) });
    this.setState({ items: [...tempItem] })
  }

  render() {
    return (
      <View >
        <View style={{
          marginTop: 20, borderBottomWidth: 4, borderColor: '#1ba398',
          borderWidth: 2,
          backgroundColor: '#d4f8e8', paddingBottom: 20, borderTopLeftRadius: 10,
          borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 10
        }} >
          <Text style={{
            color: 'white',
            backgroundColor: '#f59f4a',
            marginBottom: 10,
            borderColor: '#838383',
            borderRadius: 10,
            marginRight: '50%',
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 30,
            marginTop: 20,
            paddingVertical: 10, paddingLeft: '10%',
            fontSize: 20, fontWeight: '700'
          }}>Quick Buy

          </Text>

          <ScrollView horizontal={true} >
            <View style={{ flex: 2, flexDirection: 'row', marginVertical: 5, overflow: 'scroll', borderColor: 'white' }}>
              {this.state.items.map((x, i) => {
                return Card(x.name, x.imgUrl, i)
              })}
            </View>
          </ScrollView>

        </View>
      </View>)
  }


}

function Card(name: string, url: string, offer: number) {
  return (<View style={{ backgroundColor: '#1dab9f', marginLeft: 40, minWidth: 150, borderColor: 'white', paddingLeft: 5, borderRadius: 50, borderBottomRightRadius: 5, borderBottomLeftRadius: 40, borderTopRightRadius: 40, borderWidth: 1 }}>
    {
      offer ?
        <Badge value={`${offer}%off`}
          status="success"
          containerStyle={{ position: 'absolute', top: 5, right: 30 }}
        /> : <View></View>
    }
    <Text style={{ padding: 4, marginTop: 20, fontSize: 24, fontWeight: 'bold', borderColor: 'grey', color: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}>{name}</Text>
    <View style={{ marginVertical: 10 }}>
      <Image style={{ height: 100, borderWidth: 1, borderColor: 'grey', width: 120, borderRadius: 5, top: 0, right: 30, position: "relative" }} source={{ uri: url }}></Image>
    </View>
    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }} >
      <View style={{ marginLeft: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 10, color: 'white' }}>Quantity:1Kg</Text>
        <Text style={{ fontSize: 10, color: 'white' }}>  MRP:20</Text>
      </View>
      <TouchableOpacity style={{ display: 'flex', backgroundColor: 'white', justifyContent: 'center', borderWidth: 0, borderRadius: 5, margin: 2 }}>
        <FontAwesome name="plus" style={{ padding: 10, paddingHorizontal: 15 }} size={20} color="black" />
      </TouchableOpacity>

    </View>
  </View >)
}

export default VerticalScroll;