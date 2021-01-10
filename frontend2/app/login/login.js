import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

export default class login extends Component {
    state = {
        loggedInUser: null,
        errorMessage: ''
    }
    signIn = async () => {
        try {
            const response = await api.post('user/login', {
                email: 'bielaraujo10@hotmail.com',
                password: '123456'
            })
            const { email, token } = response.data;
            await AsyncStorage.multiSet([
                ['@backend:token', token],
                ['@backend:email', JSON.stringify(email)]
            ])
            this.setState({ loggedInUser: email })
            Alert.alert('Login feito com sucesso')
        } catch (response) {
            this.setState({ errorMessage: response.data.mesage })
        }


    }
    //async componentDidMount() {
    //    const token = await AsyncStorage.getItem('@backend:token')
    //    const email = JSON.parse(await AsyncStorage.getItem('@backend:email'))
    //    if (token && email) {
    //        this.setState({ loggedInUser: email })
    //    }
    //} 

    render() {
        return (
            <View style={styles.container}>
                { !!this.state.loggedInUser && <Text>{this.state.loggedInUser}</Text>}
                { !!this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
                <Button onPress={this.signIn} title="Entrar" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})