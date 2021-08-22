import React from "react"
import { View, Image, Dimensions, Text } from "react-native"

export default function ImageWithCuttedEdge() {
  return (
    <View style={{ paddingTop: 5 }}>

      <Image source={{ uri: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
        style={{
          left: 0,
          width: Dimensions.get('window').width - 10,
          height: 220,
          justifyContent: 'center', alignSelf: 'center',
        }}
      >

      </Image>
      <View style={{
        position: 'absolute',
        backgroundColor: 'transperent',
        top: 20,
        left: 20,
        zIndex: 10
      }}>
        <Text style={{ fontSize: 45, fontWeight: 'bold', color: 'white' }}>
          Go Green
        </Text>
      </View>
      <View
        style={{
          height: 0,
          width: 0,
          position: 'absolute',
          top: 0,
          right: 0,
          borderTopColor: 'white',
          borderLeftColor: '#c5c5c5',
          borderTopWidth: 80,
          borderLeftWidth: 100,
        }}
      ></View>
      <View
        style={{
          height: 0,
          width: 0,
          position: 'absolute',
          top: 0,
          right: 0,
          borderTopColor: 'white',
          borderLeftColor: 'grey',
          borderTopWidth: 50,
          borderLeftWidth: 70,
        }}
      ></View>
    </View>

  )
}