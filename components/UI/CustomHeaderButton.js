import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import MyColors from '../../constants/MyColors'


export default function CustomHeaderButton(props) {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS === 'android' ? 'white' : MyColors.primary}
        />
    )
}

const styles = StyleSheet.create({})

