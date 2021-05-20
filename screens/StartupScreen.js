import React, { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyColors from '../constants/MyColors'
import { authenticate } from './../store/actions/auth';
import { useDispatch } from 'react-redux';

export default function StartupScreen(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if (!userData) {
                props.navigation.navigate('Auth')
                return
            }

            const transformedData = JSON.parse(userData)

            const { token, userId, expiryDate } = transformedData

            const expirationDate = new Date(expiryDate)

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth')
                return
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime()

            props.navigation.navigate('Shop')

            dispatch(authenticate(userId, token, expirationTime))
        }
        tryLogin()
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={MyColors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
