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
class WeeklyPackScroll extends React.Component<any, AppState> {


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
      <View style={{ marginTop: 5, backgroundColor: '#558948', paddingVertical: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} >
        <Text style={{ color: 'white', marginLeft: '30%', fontSize: 20, fontWeight: '700' }}>Weekly Pack</Text>
        <ScrollView horizontal={true} >
          <View style={{ flex: 2, flexDirection: 'row', marginVertical: 5, overflow: 'scroll', borderColor: 'white' }}>
            {this.state.items.map((x, i) => {
              return Card(x.name, x.imgUrl, i)
            })}
          </View>
        </ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row-reverse', marginLeft: '10%' }}>
          <TouchableOpacity style={{ display: 'flex', width: 100, justifyContent: 'center', backgroundColor: '#88ad81', borderWidth: 3, borderRadius: 5, margin: 2, borderColor: '#8dc133' }}>
            <Text style={{ color: 'white', padding: 2, fontWeight: 'bold', marginLeft: '20%' }}>Add +</Text>
          </TouchableOpacity>
        </View>
      </View>)
  }


}

function Card(name: string, url: string, offer: number) {
  return (<View style={{ backgroundColor: 'white', margin: 5, minWidth: 100, borderColor: 'white', paddingHorizontal: 5, paddingBottom: 10, paddingTop: 15, borderRadius: 10, borderWidth: 1 }}>
    {
      offer ?
        <Badge value={`${offer}%off`}
          status="success"
          containerStyle={{ position: 'absolute', top: 5, right: 5 }}
        /> : <View></View>
    }
    <Image style={{ height: 100, margin: 2, marginTop: 8 }} source={{ uri: url }}></Image>
    <Text style={{ padding: 4, fontWeight: 'bold', borderColor: 'grey', backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}>{name}</Text>
    <Text style={{ fontSize: 10 }}>Quantity:1Kg</Text>
    <Text style={{ fontSize: 10 }}>MRP:20</Text>

  </View >)
}

export default WeeklyPackScroll;