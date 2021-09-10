import { FontAwesome } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Modal, ActivityIndicator, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Json from '../assets/sample.json';
import VerticalScroll from './cards-vertical-scroll';
import EmptyCartImg from '../assets/images/EmptyCart.png';
import Heading from './HeadingComponent';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import firebase from './fb/firebase';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigationFocus } from 'react-navigation';



export interface cItem {
  id: number,
  price: number,
  quantity: number,
  title: string,
  imgUrl: string
}
export interface cartItem {
  productID: number,
  availableQty: number,
  category: string,
  discountInPercent: number,
  finalPricePerQty: number,
  imgUrl: string,
  pricePerQuantity: number,
  productName: string,
  quantityType: string,
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

const Cart = ({ navigation }: any) => {
  useEffect(() => {
    const unsubscribe=navigation.addListener('focus',()=>{
    
      loadData();
    });
    // return ()=>{
 
    // };
      }, [navigation]);

  let cart: cartItem[] = [];
  const [refresh, setRefersh] = useState(0);
  const [address, setAddress] = useState<Address[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [mainloading, setMainLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("0");
  const [cartItems, setCaryItems] = useState<cartItem[]>([]);


  const addURL =
    "https://raw.githubusercontent.com/somgreenad/food/master/assets/address.json";
  const cartUrl = "https://greenad.herokuapp.com/getCartItems/" + firebase.auth().currentUser?.uid;
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('he').then((data)=>alert(data))
      
    } catch(e) {
      console.log('cart er')
    }
  }



  function loadData() {
    setMainLoad(false);
    firebase.auth().currentUser?.getIdToken(true).then((idtoken) => {
      axios.get(cartUrl,
        {
          headers: {
            Authorization: 'Bearer' + idtoken
          }
        }).then((result) => {
          result.data.forEach((x: cartItem) => {
            cart.push({
              productID: x.productID,
              availableQty: x.availableQty,
              category: x.category,
              discountInPercent: x.discountInPercent,
              finalPricePerQty: x.finalPricePerQty,
              imgUrl: x.imgUrl,
              pricePerQuantity: x.pricePerQuantity,
              productName: x.productName,
              quantityType: x.quantityType,
            }); totalPrice = totalPrice + 10
          })
          setCaryItems([...cart]);
          setMainLoad(true)
        }).catch((err) => console.log(err))
    }).then((msg) => console.log("msg")).catch((err) => console.log(err))

  }


  let totalPrice = 0;
  const [selectedAddressPin, setSelectedAddressPin] = useState("625501");



  const [total, setTotal] = useState<number>(totalPrice);
  // console.log("cartItems cartItems cartItems cartItems")

  // }

  function loadAddress() {
    fetch(addURL)
      .then((Response) => Response.json())
      .then((json) => {
        setAddress(json.address);
        // console.log(json.address)
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }




  function removeCartItem(id: number) {
    firebase.auth().currentUser?.getIdToken(true).then((idtoken) => {
      axios.get("https://greenad.herokuapp.com/deleteCartItem/" + id + "/" + firebase.auth().currentUser?.uid,
        {
          headers: {
            Authorization: 'Bearer' + idtoken
          }
        }).then((result) => {  }).catch((err) => console.log(err))
    }).then((msg) => console.log(msg)).catch((err) => console.log(err))
    let item = cartItems.find(x => x.productID === id);
    const localTOT = total - item?.pricePerQuantity * item?.availableQty;
    const i = cartItems.findIndex(x => { return x.productID === id; });
    let items = [...cartItems];
    items.splice(i, 1)
    setCaryItems(x => [...items]);
    setTotal(localTOT)

  }
  function changeQuantity(id: number, increment: number) {
    let items = [...cartItems];
    let index = items.findIndex(x => { return x.productID === id; });
    if (increment > 0) {
      items[index].availableQty++;
      setTotal(x => x + items[index].pricePerQuantity)
      setCaryItems([...items])
    } else {
      items[index].availableQty--;
      setTotal(x => x - items[index].pricePerQuantity);
      setCaryItems([...items]);

    }
  }

  const [placeOrderModalVisible, setPoVisible] = useState(false);

  let width = Dimensions.get('window').width;
  let height = Dimensions.get('window').height;
  
  return (
    <View style={{ marginTop: 50, backgroundColor: 'white' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (

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
                          <TouchableOpacity onPress={() => { setSelectedAddressId(x.id); setSelectedAddressPin(x.pincode) }} style={[{ borderWidth: 1, backgroundColor: x.id === selectedAddressId ? '#fff59d' : 'white', elevation: 5, borderColor: 'grey', padding: 5, borderRadius: 5, marginHorizontal: 5 },]}>
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
      <Modal
        style={{ backgroundColor: 'blue' }}
        animationType="slide"
        transparent={false}
        visible={placeOrderModalVisible}>
        <View style={{ width: '100%', height: '100%', backgroundColor: '#344c63' }}>
          <Image source={{ uri: 'https://i.pinimg.com/originals/ff/fc/5a/fffc5a92c68455f331036891970b1fb9.gif' }} style={{ width: '100%', height: '100%', borderRadius: 30, borderWidth: 1 }} />
          {/* <Text style={{ fontSize: 24, marginLeft: '20%' }}>Placing Order....</Text> */}
        </View>
      </Modal >
      {Heading(`Cart(${cartItems.length})`)}
      <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 10, marginVertical: 5 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Icon type="font-awesome-5" name="map-marker-alt" size={25} style={{ margin: 2 }} color="red" />
          <Text style={{ marginTop: 8 }}>Deliverd to:</Text>
          <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 7 }}>{selectedAddressPin}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => {
            loadAddress();
            setModalVisible(true);
          }}
            style={styles.changeAdd}><Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>change Address</Text></TouchableOpacity>

        </View>
      </View>
      <View style={{ height: height - 210 }}>
        {mainloading ? <ScrollView>
          <View style={{ display: 'flex', width: '100%', flexWrap: 'wrap', flexDirection: 'row' }}>
            {cartItems.length ? cartItems.map((item, i) => {
              return (
                <View style={{ width: width - 10 }}>

                  <ItemView quantity={item.availableQty} price={item.pricePerQuantity} id={item.productID} imgUrl={item.imgUrl} name={item.productName} onQuantityChange={(id, inc) => {
                    changeQuantity(id, inc)
                  }} onItemsRemove={(x) => { removeCartItem(x) }} />

                </View>
              )
            }) : <View style={{ marginTop: '20%', marginHorizontal: 20 }}>
              <Image source={EmptyCartImg} style={{ width: 300, height: 300, borderRadius: 10, margin: 3 }}></Image>
              <Text style={{ fontSize: 20, marginLeft: '10%', fontFamily: 'space-mono' }}>Your Cart is Empty</Text></View>
            }
          </View>
        </ScrollView> : <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="green" /></View>}
      </View>
      <View style={{
        display: 'flex', backgroundColor: 'white', padding: 5, marginHorizontal: 5, justifyContent: 'space-around',
        marginVertical: 3, flexDirection: 'row',
      }}>
        <View>

          <Text style={{ fontSize: 10 }}> total price:</Text>
          <Text style={{ fontSize: 20 }}>₹ {total}</Text>
        </View>
        <TouchableOpacity onPress={() => {
          //  ii()
          setRefersh(refresh + 1)
          // setPoVisible(true);
          // setCaryItems(cart);
          // setTotal(totalPrice);
          //setModalVisible(true);
          // if(cartItems.length!==0){
          // if(firebase.auth().currentUser?.uid!==undefined){
          // setTimeout(() => {

          //   setPoVisible(false);
          //   setModalVisible(false);
          //   navigation.navigate('OrderDetails')
          // }, 3000);}else{
          //   navigation.navigate('Login')
          // }}else{
          //   alert("Your cart is empty")
          // }

        }} style={styles.orderButton}>
          <Text style={{ color: 'white', padding: 6, fontWeight: '600', fontSize: 18 }}>Place Order</Text>
        </TouchableOpacity>
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
  onQuantityChange: (id: number, increment: number) => void;
}
function ItemView(props: item) {
  const [isAddedToCart, changeIsAddedToCart] = useState(false);
  // const [volume, changeVolume] = useState(1);
  const [isFav, changeIsFav] = useState(false);
  return (
    <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 3, paddingBottom: 10, borderBottomWidth: 2, borderColor: 'rgba(112,112,112,.38)', }}>
      <Image source={{ uri: props.imgUrl }} style={{ width: 70, height: 70, borderRadius: 10, margin: 3 }}></Image>
      <View>
        <Text style={{ padding: 2, margin: 2, fontSize: 15, fontWeight: 'bold' }}>{props.name}</Text>
        <Text style={{ fontSize: 15, marginLeft: 8 }}>Price:₹ {props.quantity * props.price}</Text>
        <View style={[{ marginVertical: 8, display: 'flex', flexDirection: 'row', marginHorizontal: 10 }]}>
          <TouchableOpacity onPress={() => {
            if (!(props.quantity - 1)) {
              props.onItemsRemove(props.id);
            } else {
              props.onQuantityChange(props.id, 0);
            }

          }
          } style={[styles.buttonPlus]}>
            <FontAwesome name="minus" style={{ color: 'white', marginTop: 2, marginLeft: 1 }} size={12} color="white" />
          </TouchableOpacity>
          <Text


            style={{ fontSize: 15, marginHorizontal: "3%", fontFamily: 'space-mono' }}>{props.quantity}Kg</Text>
          <TouchableOpacity onPress={() => {
            props.onQuantityChange(props.id, +1);
          }} style={styles.buttonPlus}>
            <FontAwesome name="plus" style={{ color: 'white', marginTop: 2, marginLeft: 1 }} size={12} color="white" />
          </TouchableOpacity>

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
  AddToCartButton: {
    backgroundColor: '#008ecc',
    display: 'flex',
    justifyContent: 'center',
    width: 30,
    height: 30,
    margin: 0,
    borderRadius: 3,
  },
  buttonPlus: {
    backgroundColor: '#008ecc',
    display: 'flex',
    justifyContent: 'center',
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
  },

  removeButton: {
    marginLeft: '15%',
    backgroundColor: '#c50707',
    color: 'white',
    padding: 6,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,

  },
  orderButton: {
    marginLeft: '10%',
    backgroundColor: '#00897b',
    color: 'white',
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
    marginBottom: 3
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

});

export default Cart;

