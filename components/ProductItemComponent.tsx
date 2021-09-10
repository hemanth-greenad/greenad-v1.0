import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, ToastAndroid } from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ScrollView } from "react-native-gesture-handler";
import Json from '../assets/sample.json';
import firebase from '../components/fb/firebase';
import { RootStackParamList } from "../types";

interface prod {
    onItemsRemove: () => void;
    onItemsAdd: () => void;
}
const storeData = async (value: any) => {
    try {
        await AsyncStorage.setItem('he', value)
    } catch (e) {
        console.log('errrrrrrrrrror')
    }
}
const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
        "Logged In",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
    );
};
export default function ProductItem(props: prod) {
    const navigation = useNavigation();
    const [parr, setParr] = useState<any>();

    useEffect(() => {

        loadData()
    })

    function loadData() {
        firebase.auth().currentUser?.getIdToken(true).then((idtoken) => {
            axios.get("https://greenad.herokuapp.com/getProducts", {
                headers: {
                    Authorization: 'Bearer' + idtoken
                }
            }).then((result) => { console.log(result.data)}).catch((err) => console.log('err'))
        }).then((msg) => console.log("123")).catch((err) => console.log("123err"))
    }

    let width = Dimensions.get('window').width;
    return (
        <View style={{ display: 'flex', backgroundColor: '#364250', borderTopRightRadius: 10, borderTopLeftRadius: 10, marginTop: 10, width: '100%', flexWrap: 'wrap', flexDirection: 'row' }}>
            <Text style={{ color: 'white', paddingTop: 20, paddingBottom: 20, marginLeft: '28%', fontSize: 20, fontWeight: '700', width: width }}>Vegetables List</Text>
            {Json.info.map((item:any) => {
                return (
                    <View style={{ width: width / 2 }}>
                        <ItemView imgUrl={item.img} name={item.title} onItemsAdd={() => {

                            if (firebase.auth().currentUser?.uid !== undefined) {
                                storeData('af');
                                firebase.auth().currentUser?.getIdToken(true).then((idtoken) => {
                                    axios.post('https://greenad.herokuapp.com/saveCart/' + firebase.auth().currentUser?.uid, {
                                        productId: item.id,
                                        productQuantity: item.actual,
                                        quantityType: 5,
                                    },
                                        {
                                            headers: {
                                                Authorization: 'Bearer' + idtoken
                                            }
                                        }).then((result) => { }).catch((err) => console.log(err))
                                }).then((msg) => console.log(msg)).catch((err) => console.log(err))
                                props.onItemsAdd()

                            }
                        }} onItemsRemove={() => {
                            firebase.auth().currentUser?.getIdToken(true).then((idtoken) => {
                                axios.get('https://greenad.herokuapp.com/deleteCartItem/' + item.id + '/' + firebase.auth().currentUser?.uid,
                                    {
                                        headers: {
                                            Authorization: 'Bearer' + idtoken
                                        }
                                    }).then((result) => { }).catch((err) => console.log(err))
                            }).then((msg) => console.log(msg)).catch((err) => console.log(err))
                            props.onItemsRemove()
                        }} />

                    </View>
                )
            })}
        </View>
    )
}
interface item {
    imgUrl: string,
    name: string,
    onItemsRemove: () => void;
    onItemsAdd: () => void;
}
function ItemView(props: item) {

    const [isAddedToCart, changeIsAddedToCart] = useState(false);
    const [volume, changeVolume] = useState(0);
    const [isFav, changeIsFav] = useState(false);
    return (
        <View style={{ display: 'flex', elevation: 5, backgroundColor: 'white', minHeight: 200, borderWidth: 2, borderRadius: 10, borderColor: 'rgba(112,112,112,.38)', margin: 5 }}>
            <Image source={{ uri: props.imgUrl }} style={{ height: 150, borderTopRightRadius: 9, borderTopLeftRadius: 9 }}></Image>
            <Text style={{ padding: 2, margin: 2, fontSize: 15, fontWeight: 'bold' }}>{props.name}</Text>
            <Text style={{ fontSize: 10, fontWeight: '300', marginLeft: 8 }}>MRP:₹ 28.00</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {(() => {
                    if (volume) {
                        return (
                            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 8, marginLeft: 2 }}>
                                <TouchableOpacity onPress={() => {

                                    if (!(volume - 1)) {
                                        props.onItemsRemove();
                                    }
                                    changeVolume(volume - 1);
                                }
                                } style={[styles.buttonPlus]}>
                                    <FontAwesome name="minus" style={{ color: 'white', marginTop: 2, marginLeft: 1 }} size={12} color="white" />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 15, marginHorizontal: "15%", fontFamily: 'space-mono' }}>{volume}Kg</Text>
                                <TouchableOpacity onPress={() => changeVolume(volume + 1)} style={styles.buttonPlus}>
                                    <FontAwesome name="plus" style={{ color: 'white', marginTop: 2, marginLeft: 1 }} size={12} color="white" />
                                </TouchableOpacity>
                            </View>
                        )
                    } else {
                        // props.onItemsRemove();
                        return (
                            <View style={[{ marginVertical: 8, marginLeft: 80, display: 'flex', flexDirection: 'row', marginHorizontal: 10 }]}>
                                <TouchableOpacity onPress={() => { changeIsFav(!isFav) }} style={[styles.AddToCartButton, { backgroundColor: isFav ? undefined : 'tomato' }]}>

                                    <Icon type="font-awesome" name="heart" color={isFav ? 'tomato' : 'white'} size={20} />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    if (firebase.auth().currentUser?.uid !== undefined) {
                                        changeVolume(volume + 1); props.onItemsAdd()
                                    } else {
                                        showToastWithGravityAndOffset()
                                        //alert('please login to add items to cart')
                                    }
                                }} style={[styles.AddToCartButton, { marginLeft: 10 }]}>

                                    <Icon type="font-awesome" name="cart-plus" color="white" size={20} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })()}

            </View>
            {/* <View style={styles.favourite}>
                <Icon type="font-awesome-5" name="star" style={{ marginTop: 2, marginLeft: 1 }} color="yellow" size={24} />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    AddToCartButton: {
        backgroundColor: '#008ecc',
        display: 'flex',
        justifyContent: 'center',
        // marginHorizontal: 40,
        width: 30,
        height: 30,
        //  marginStart:'20%',
        // padding: 10,
        margin: 0,
        borderRadius: 3,
        // elevation: 5
    },
    buttonPlus: {
        backgroundColor: '#008ecc',
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: 40,
        borderRadius: 5,
        width: 30,
        height: 30,
        padding: 10,
        marginStart: 4,
        marginEnd: 0
    },

    favourite: {
        position: 'absolute',
        top: 10,
        right: 10
    }

});