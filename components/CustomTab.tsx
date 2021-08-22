import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Icon } from "react-native-elements";

function MyTabBar({ state, descriptors, navigation }: any) {
    return (
        <View style={{ flexDirection: 'row', backgroundColor: "white", borderColor: '#f7f7f7', borderTopWidth: 1, position: 'absolute', bottom: 0, borderWidth: 1, marginBottom: 5, elevation: 5, padding: 5, borderRadius: 10, marginHorizontal: 10, justifyContent: "center", alignItems: "center" }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                console.log('start====', state)
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                let iconName;
                let color = isFocused
                    ? '#2a8030'
                    : 'black';
                let bg = isFocused ? '#b7fbbb' : 'white';
                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Cart') {
                    iconName = 'shopping-basket';
                } else if (route.name === 'Favourites') {
                    iconName = 'heart';
                }
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: "center" }}
                    >

                        <View>
                            <Icon reverse={true} style={{ backgroundColor: bg }}
                                type="evilIcons"
                                name={'bell'} size={25} color={color} />
                            {/* <Text style={{ color: isFocused ? 'white' : '#222' }}>
                                    {label}
                                </Text> */}
                        </View>


                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default MyTabBar;