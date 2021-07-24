import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    FlatList,
    SafeAreaView,
    TextInput,
    Image,
    Button,
    Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";

const AddressScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [id, setId] = useState([]);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const addURL =
        "https://raw.githubusercontent.com/somgreenad/food/master/assets/address.json";

    useEffect(() => {
        fetch(addURL)
            .then((Response) => Response.json())
            .then((json) => {
                setData(json.address);
            })
            .catch((error) => alert(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Text style={styles.text}>Your Addresses</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("register_Address")}
                >
                    <Text style={[styles.submitText]}>Add New Address</Text>
                </TouchableOpacity>

                <View>
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <View>
                            <FlatList
                                data={data}
                                keyExtractor={({ id }, index) => id}
                                renderItem={({ item }) => {
                                    return (
                                        <View
                                            style={{
                                                borderWidth: 0.5,
                                                borderRadius: 10,
                                                padding: 10,
                                                width: "95%",
                                                alignSelf: "center",
                                                marginTop: 10,
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.text,
                                                    { fontWeight: "bold", fontSize: 20 },
                                                ]}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text style={styles.text}>{item.area}</Text>
                                            <Text style={styles.text}>{item.town}</Text>
                                            <Text style={styles.text}>
                                                {item.state} - {item.pincode}
                                            </Text>
                                            <Text style={styles.text}>Phone no: {item.phone}</Text>
                                            <Text>{"\n"}</Text>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    marginTop: -20,
                                                }}
                                            >
                                                <Icon
                                                    name="location-pin"
                                                    color="red"
                                                    onPress={() => navigation.navigate("map")}
                                                />
                                                <Text
                                                    onPress={() => navigation.navigate("map")}
                                                    style={[
                                                        styles.text,
                                                        { marginTop: "1%", marginLeft: 15, color: "blue", fontWeight: "bold" },
                                                    ]}
                                                >
                                                    update Delivery location
                                                </Text>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <TouchableOpacity style={[styles.submit]}>
                                                    <Text style={styles.submitText}>Edit</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.submit]}>
                                                    <Text style={styles.submitText}>Remove</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
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
    search: {},
    submit: {
        width: "20%",
    },
});
