import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import Tab from './Tab'

const { width } = Dimensions.get('screen')

const TabBar = ({ state, navigation }) => {
    const { routes } = state;
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {routes.map(route => (
                    <Tab tab={route}
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
        backgroundColor: 'red'
    },
    container: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default TabBar;