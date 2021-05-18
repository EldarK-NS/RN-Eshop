import React from 'react'
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import OrderItem from './../../components/shop/OrderItem';

export default function OdersScreen() {

    const orders = useSelector(state => state.orders.orders)

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />}
        />
    )
}


OdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => { navData.navigation.toggleDrawer() }}
                />
            </HeaderButtons>
        )
    }

}

const styles = StyleSheet.create({})
