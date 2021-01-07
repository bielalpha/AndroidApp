import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import Tab from './Tab'

const { width } = Dimensions.get('screen')

const TabBar = ({ state, navigation }) => {
    const [selected, setSelected] = useState('Home')
    const { routes } = state;
    const renderColor = currentTab => (currentTab === selected ? 'red' : 'black')

    const handlePress = (activateTab, index) => {

        if (state.index !== index) {
            setSelected(activateTab)
            navigation.navigate(activateTab)
        }

    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {routes.map((route, index) => (
                    <Tab tab={route}
                        icon={route.params.icon}
                        color={renderColor(route.name)}
                        onPress={() => handlePress(route.name, index)}
                        key={route.key} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 20,
        width,
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: 250,
        borderRadius: 50
    }
})

export default TabBar;