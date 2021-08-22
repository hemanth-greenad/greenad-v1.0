import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import VerticalScroll from "./cards-vertical-scroll";

export interface productDetail {
    name: string,
    quantity: number,
    quantityType: string,
    pricePerQuantity: number,
    minQuantity: number
}


export interface Address {
    id: string;
    name: string;
    phone: string;
    pincode: string;
    town: string;
    state: string;
    area: string;
    lattitude: string;
    longitude: string;
}

export default function OrderDetails() {
    let Width = Dimensions.get('screen').width;
    let height = Dimensions.get('screen').height;
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address>();

    const addURL =
        "https://raw.githubusercontent.com/somgreenad/food/master/assets/address.json";
    useEffect(() => {
        fetch(addURL)
            .then((Response) => Response.json())
            .then((json) => {
                setSelectedAddress(json.address[0]);
                setAddress(json.address);
                console.log(json.address)
            })
            .catch((error) => alert(error));;
    }, []);
    let orderList: productDetail[] = [];
    orderList.push({ name: 'Tomato', quantity: 2, quantityType: 'Kg', pricePerQuantity: 20, minQuantity: 1 });
    orderList.push({ name: 'Onion', quantity: 5, quantityType: 'Kg', pricePerQuantity: 20, minQuantity: 1 });
    orderList.push({ name: 'Beetroot', quantity: 4, quantityType: 'Kg', pricePerQuantity: 20, minQuantity: 1 });
    orderList.push({ name: 'Beans', quantity: 1, quantityType: 'Kg', pricePerQuantity: 20, minQuantity: 0.5 });

    return (<View style={{ height: height, width: Width, backgroundColor: 'white' }}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            {(
                <View style={{ marginTop: height - 300 }}>
                    <View style={styles.modalView}>
                        <View>
                            <TouchableOpacity onPress={() => { setModalVisible(false) }} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                <FontAwesome name="window-close" size={25} color="tomato" />
                            </TouchableOpacity>
                            <View style={{ height: 170 }}>
                                <ScrollView horizontal={true} style={{ marginTop: 5 }} >
                                    <View style={{ flex: 2, flexDirection: 'row', height: 150, backgroundColor: 'white', overflow: 'scroll', borderColor: 'white' }}>
                                        {address.map((x, i) => {
                                            return (
                                                <TouchableOpacity onPress={() => { setSelectedAddress(x) }} style={[{ borderWidth: 1, backgroundColor: x.id === selectedAddress?.id ? '#fff59d' : 'white', elevation: 5, borderColor: 'grey', padding: 5, borderRadius: 5, marginHorizontal: 5 },]}>
                                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{x.name}</Text>
                                                    <Text>{x.area}</Text>
                                                    <Text>{x.town}</Text>
                                                    <Text>{x.state}-{x.pincode}</Text>
                                                    <Text>Phone no:{x.phone}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </ScrollView>
                            </View>
                            <Text style={{ color: '#339af0' }}> <FontAwesome name="address-card" size={25} color="#339af0" /> Select you address.</Text>
                        </View>

                    </View>
                </View>)}
        </Modal>
        <View style={{ marginTop: 100, padding: 5, backgroundColor: 'white', borderRadius: 8, elevation: 20, marginHorizontal: 12, }}>
            <Text style={{ fontSize: 20, width: '50%', color: '#1eae96', marginBottom: 5 }}>Price Details</Text>
            <View style={{ display: 'flex', flexDirection: 'row', borderColor: '#1eae96', borderBottomWidth: 2 }}>
                <Text style={{ fontSize: 15, width: '50%' }}>Product</Text>
                <Text style={{ fontSize: 15, width: '30%' }}>Quantity</Text>
                <Text style={{ fontSize: 15, width: '20%' }}>Price</Text>
            </View>
            {orderList.map((val, j) => {
                return (
                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                        <Text style={{ width: '50%' }}>{val.name}</Text>
                        <Text style={{ width: '30%' }}>{val.minQuantity * val.quantity} {val.quantityType}</Text>
                        <Text style={{ width: '10%' }}>{val.pricePerQuantity * val.minQuantity * val.quantity}</Text>
                    </View>
                )
            })}
            <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row' }}>
                <Text style={{ marginLeft: '50%', width: '30%', borderTopWidth: 2 }}>total:</Text>
                <Text style={{ borderTopWidth: 2 }}>230</Text>
            </View>
        </View>
        <View style={{ display: 'flex', paddingVertical: 10, marginTop: 20, backgroundColor: 'white', elevation: 30, borderRadius: 5, marginHorizontal: 10, }}>
            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
                <Icon type="font-awesome-5" name="map-marker-alt" size={25} style={{ margin: 2 }} color="red" />
                <Text style={{ fontSize: 20, color: '#1eae96', marginBottom: 5 }}>Delivered to:</Text>
                <View>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true);
                    }}
                        style={styles.changeAdd}><Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>change Address</Text></TouchableOpacity>

                </View>
            </View>

            <View style={[{ borderWidth: 1, backgroundColor: 'white', borderColor: 'grey', padding: 5, borderRadius: 5, marginTop: 10, marginRight: 50, marginHorizontal: 10 },]}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedAddress?.name}</Text>
                <Text>{selectedAddress?.area}</Text>
                <Text>{selectedAddress?.town}</Text>
                <Text>{selectedAddress?.state}-{selectedAddress?.pincode}</Text>
                <Text>Phone no:{selectedAddress?.phone}</Text>
            </View>
        </View>
        <View style={{ display: 'flex', marginTop: 20, justifyContent: 'center', flexDirection: 'row', width: Width }}>
            <TouchableOpacity style={{ backgroundColor: '#269b51', display: 'flex', flexDirection: 'row', borderRadius: 30, elevation: 20 }}>
                <FontAwesome name="shopping-basket" style={{ padding: 15, paddingRight: 3 }} size={20} color="white" />
                <Text style={{ color: 'white', padding: 15, paddingLeft: 0 }}>Confirm your's order</Text>
            </TouchableOpacity>
        </View>
    </View >)
}

const styles = StyleSheet.create({
    modalView: {
        //margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },

    changeAdd: {
        marginLeft: '10%',
        backgroundColor: '#ffc107',
        color: 'white',
        fontSize: 18,
        paddingLeft: 10,
        borderRadius: 7,
        marginTop: 8
    },
});