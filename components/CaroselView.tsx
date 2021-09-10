import React from "react";
import { View, Text, SafeAreaView, Image, Dimensions } from "react-native";
// import Carousel from 'react-native-snap-carousel';

export default class CarosalView extends React.Component<any, any> {


    constructor(props) {
        const slideList = Array.from({ length: 6 }).map((V, i) => {
            return {
                id: i,
                image: `https://picsum.photos/720/400?random=${i}`,
                title: `This is the title! ${i + 1}`,
                subtitle: `This is the subtitle ${i + 1}!`,
            };
        });
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: [...slideList]
        }
    }

    _renderItem({ item, index }) {
        return (
            <View style={{
                backgroundColor: 'white',
                borderRadius: 20,
                height: 150,
            }}>
                <Image source={{ uri: item.image }} style={{ height: '100%', width: '100%' }}></Image>
            </View>

        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 10, }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                    <Carousel
                        layoutCardOffset={0}
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={Dimensions.get('screen').width}
                        itemWidth={100}
                        renderItem={this._renderItem}
                        onSnapToItem={index => this.setState({ activeIndex: index })} />
                </View>
            </SafeAreaView>
        );
    }
}