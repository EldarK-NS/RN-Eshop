import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import MyColors from '../../constants/MyColors'
import CartItem from './../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart'
import { addOrder } from './../../store/actions/order';
import Card from './../../components/UI/Card';

export default function CartScreen(props) {
    const [isLoading, setIsLoading] = useState(false)

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const dispatch = useDispatch()

    //transform cartItems from object to array(see reducer ADD_TO_CART there we create a new item in cart)
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
    })

    const sendOrderHandler = async () => {
        setIsLoading(true)
        await dispatch(addOrder(cartItems, cartTotalAmount))
        setIsLoading(false)
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '}<Text style={styles.amount}> ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>

                </Text>
                {isLoading ? <ActivityIndicator saze='small' color={MyColors.primary} /> : (
                    <Button title='Order Now' disabled={cartItems.length === 0} onPress={sendOrderHandler} />
                )}
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (<CartItem
                    deletable
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    onRemove={() => {
                        dispatch(removeFromCart(itemData.item.productId));
                    }}
                />)}
            />

        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,

    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'roboto-bold',
        fontSize: 18,
    },
    amount: {
        color: MyColors.primary,
    },
})
