import React, { useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator, View, FlatList, Platform, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import OrderItem from './../../components/shop/OrderItem';
import { fetchOrders } from './../../store/actions/order';
import MyColors from '../../constants/MyColors'

export default function OdersScreen() {

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders.orders)

    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchOrders()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])


    if (isLoading) {
        <View style={styles.centered}>
            <ActivityIndicator color={MyColors.primary} size='large' />
        </View>
    }

    if (orders.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No orders found!</Text>
            </View>
        )
    }
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
