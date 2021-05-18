import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import MyColors from '../../constants/MyColors';
import CartItem from './CartItem';
import Card from './../UI/Card';

export default function OrderItem(props) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title={showDetails ? 'Hide Details' : 'Show Details'} color={MyColors.primary} onPress={() => {
                setShowDetails(prevState => !prevState)
            }} />
            {showDetails && <View style={styles.detailItems}>
                {props.items.map(cartitem => (
                    <CartItem
                        key={cartitem.productId}
                        quantity={cartitem.quantity}
                        title={cartitem.productTitle}
                        amount={cartitem.sum}
                    />
                ))}
            </View>}
        </Card>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    totalAmount: {
        fontFamily: 'roboto-bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'roboto-regular',
        fontSize: 16,
        color: '#888'
    },
    detailItems: {
        width: '100%',

    },
})
