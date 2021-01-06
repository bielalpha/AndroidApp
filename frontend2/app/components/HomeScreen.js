import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'

function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#76a6ef'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default HomeScreen;