import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Picker,
  Image,
  ToastAndroid,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

class Demo extends Component {
  state = {
    coordinate: {
      latitude: 13.0827,
      longitude: 80.2707,
    },
    marginBottom: 1,
  };
  render() {
    let { latitude, longitude } = this.state.coordinate;
    console.log(this.state.coordinate);
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={(map) => (this.map = map)}
          style={[styles.maps, { marginBottom: this.state.marginBottom }]}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          //   onPress={(e) => {
          //     this.setState({ coordinate: e.nativeEvent.coordinate });
          //   }}

          //   onRegionChange={(region) =>
          //     this.setState({
          //       coordinate: region,
          //     })
          //   }

          onRegionChangeComplete={(region) =>
            this.setState({
              coordinate: region,
            })
          }
          onMapReady={() => {
            this.setState({ marginBottom: 0 });
          }}
        >
          {/* <Marker
            coordinate={{ latitude, longitude }}
            title="title"
            description="description"
          /> */}
        </MapView>
        <View
          style={{
            zIndex: 1,
            left: "50%",
            top: "50%",
            marginLeft: -24,
            marginTop: -48,
            position: "absolute",
          }}
        >
          <Image
            style={{ width: 50, height: 50, resizeMode: "contain" }}
            source={require("./pin.png")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maps: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Demo;
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Picker,
  Image,
  ToastAndroid,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

class Demo extends Component {
  state = {
    coordinate: {
      latitude: 13.0827,
      longitude: 80.2707,
    },
    marginBottom: 1,
  };
  render() {
    let { latitude, longitude } = this.state.coordinate;
    console.log(this.state.coordinate);
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={(map) => (this.map = map)}
          style={[styles.maps, { marginBottom: this.state.marginBottom }]}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          //   onPress={(e) => {
          //     this.setState({ coordinate: e.nativeEvent.coordinate });
          //   }}

          //   onRegionChange={(region) =>
          //     this.setState({
          //       coordinate: region,
          //     })
          //   }

          onRegionChangeComplete={(region) =>
            this.setState({
              coordinate: region,
            })
          }
          onMapReady={() => {
            this.setState({ marginBottom: 0 });
          }}
        >
          {/* <Marker
            coordinate={{ latitude, longitude }}
            title="title"
            description="description"
          /> */}
        </MapView>
        <View
          style={{
            zIndex: 1,
            left: "50%",
            top: "50%",
            marginLeft: -24,
            marginTop: -48,
            position: "absolute",
          }}
        >
          <Image
            style={{ width: 50, height: 50, resizeMode: "contain" }}
            source={require("./pin.png")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maps: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Demo;
