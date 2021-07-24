import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Picker,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import { Icon } from "react-native-elements";
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class RegisterAddressScreen extends React.Component<Props> {
  state = {
    name: "",
    nameError: "",
    phone: "",
    phoneError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    pincode: "",
    pincodeError: "",
    doorNo: "",
    Area: "",
    choosenIndex: 0,
    isFocused: "",
    show: true,
    visible: true,
  };

  getInitialState() {
    return {
      borderColor: 'red',
    }
  }

  onFocus() {
    this.setState({
      borderColor: 'green'
    })
  }
  onBlur() {
    this.setState({
      borderColor: 'red'
    })
  }


  phoneValidator() {
    if (this.state.phone == "" && this.state.phone.length != 10) {
      this.setState({
        phoneError: "enter valid number",
      });
    } else if (this.state.phone.length != 10) {
      this.setState({
        phoneError: "number must be 10 digit",
      });
    } else {
      this.setState({ phoneError: "" });
    }
  }
  nameValidator() {
    let rjx = /^[a-zA-Z]+$/;
    let isValid = rjx.test(this.state.name);
    if (this.state.name == "" && !isValid) {
      this.setState({ nameError: "name should not be empty" });
    } else if (this.state.name.length < 4) {
      this.setState({ nameError: "enter valid name" });
    } else if (!isValid) {
      this.setState({ nameError: "name must be in alphapatic" });
    } else {
      this.setState({ nameError: "" });
    }
  }
  passValidator() {
    const regex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,15})"
    );
    let isValid = regex.test(this.state.password);
    if (this.state.password == "" && !isValid) {
      this.setState({ passwordError: "password should not be empty" });
    } else if (this.state.password.length < 8) {
      this.setState({
        passwordError: "password must be more than 8 character",
      });
    } else if (!isValid) {
      this.setState({
        passwordError:
          "password must be contain uppercase lowecase speacial character",
      });
    } else {
      this.setState({ passwordError: "" });
    }
  }

  passeye = () => {
    this.setState({ show: !this.state.show, visible: !this.state.visible });
  };
  pincodeValidator() {
    if (this.state.pincode.length != 6) {
      this.setState({
        pincodeError: "must be 6 digit",
      });
    } else {
      this.setState({ pincodeError: "" });
    }
  }
  render() {
    return (
      // NAME
      <View style={styles.container}>
        <ScrollView>
          <View
            style={[
              styles.input,
              {
                marginTop: "5%",
                height: "9%",
              },
            ]}
          >
            <TextInput
              placeholder="Name"
              onBlur={() => [this.nameValidator(), this.onBlur()]}
              onFocus={() => this.onFocus()}
              onChangeText={(text) => {
                this.setState({ name: text });
              }}
            />
            <Text
              style={[
                styles.text,
                {
                  marginTop: "4%",
                },
              ]}
            >
              {this.state.nameError}
            </Text>
          </View>

          {/* PHONE */}
          <View style={[styles.input, { marginTop: "5%", height: "9%" }]}>
            <TextInput
              placeholder="Phone"
              onBlur={() => this.phoneValidator()}
              keyboardType={"numeric"}
              maxLength={10}
              onChangeText={(text) => {
                this.setState({ phone: text });
              }}
            />
            <Text style={[styles.text, { marginTop: "5%" }]}>
              {this.state.phoneError}
            </Text>
          </View>

          {/* PINCODE */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={[
                styles.input,
                { marginTop: "5%", width: "48%", height: "50%" },
              ]}
            >
              <TextInput
                placeholder="Pincode"
                onBlur={() => this.pincodeValidator()}
                keyboardType={"numeric"}
                maxLength={6}
                onChangeText={(text) => {
                  this.setState({ pincode: text });
                }}
              />
              <Text style={[styles.text, { marginTop: "5%" }]}>
                {this.state.pincodeError}
              </Text>
            </View>
            <View
              style={{
                marginTop: "3%",
                right: "10%",
                position: "absolute",
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("map")}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={require("./pin.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* TOWN */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "-3%",
            }}
          >
            <View style={[styles.input, { width: "48%", height: "90%" }]}>
              <TextInput
                placeholder="Town/City"
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({ town: text });
                }}
              />
            </View>

            {/* STATE */}
            <View style={[styles.input, { height: "90%", width: "42%" }]}>
              <TextInput
                placeholder="State"
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({ state: text });
                }}
              />
            </View>
          </View>

          {/* DoorNo */}
          <View style={[styles.input, { marginTop: "5%" }]}>
            <TextInput
              placeholder="House No, Building name"
              keyboardType={"numeric"}
              onChangeText={(text) => {
                this.setState({ doorNo: text });
              }}
            />
          </View>

          {/*Area */}
          <View style={[styles.input, { marginTop: "5%" }]}>
            <TextInput
              placeholder="Road Name,Area,Colony"
              keyboardType={"numeric"}
              onChangeText={(text) => {
                this.setState({ Area: text });
              }}
            />
          </View>

          {/*Home / Office */}
          <View style={[styles.submit]}>
            <TouchableOpacity style={{}}>
              <Text style={[styles.submitText, { backgroundColor: "#2e8b57" }]}>
                Save Address
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#fbf2d4",
  },
  input: {
    // borderColor: "#939597",
    borderWidth: 3,
    borderRadius: 15,
    width: "80%",
    backgroundColor: "white",
    padding: 10,
    fontSize: 16,
    marginLeft: "5%",
  },
  submit: {
    width: "85%",
    padding: 10,
    alignSelf: "center",
  },
  submitText: {
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    width: "100%",
    color: "#fff",
  },
  text: {
    color: "red",
    marginLeft: 25,
    fontSize: 15,
  },
  pickerStyle: {
    height: 150,
    width: "80%",
    color: "#344953",
    justifyContent: "center",
  },
  eye: {
    marginLeft: -40,
    marginTop: 20,
  },
});

export default RegisterAddressScreen;
