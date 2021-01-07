import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

Tab = ({ color, tab, onPress, icon }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon && <FontAwesome5 name={icon} size={30} color={color}/>}
            <Text style={{ color }}>{tab.name}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    }
})

export default Tab;