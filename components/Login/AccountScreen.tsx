import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>Account Setting</Text>
      <TouchableOpacity onPress={() => navigation.navigate("address_Screen")}>
        <Text style={[styles.submitText]}>Your Address Details</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[styles.submitText]}>Subscription</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "black",
  },
  submitText: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    color: "black",
  },
});
