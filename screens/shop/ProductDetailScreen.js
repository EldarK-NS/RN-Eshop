import React from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MyColors from '../../constants/MyColors'
import { addToCart } from './../../store/actions/cart';


export default function ProductDetailScreen(props) {
    const dispatch = useDispatch()
    const prodctId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(
        state => state.products.availableProducts.find(prod => prod.id === prodctId)
    )


    return (
        <ScrollView>
            <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
            <View style={styles.actions}>
                <Button title='Add To Cart' onPress={() => { dispatch(addToCart(selectedProduct)) }} color={MyColors.primary} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)} </Text>
            <Text style={styles.description}>{selectedProduct.description} </Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'

    },
    price: {
        fontSize: 20,
        fontFamily: 'roboto-bold',
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'roboto-regular',
    },
})
