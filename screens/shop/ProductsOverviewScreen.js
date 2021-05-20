import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, Button, Platform, ActivityIndicator, View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'


import ProductItem from './../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import MyColors from '../../constants/MyColors'


import { addToCart } from './../../store/actions/cart';
import { fetchProducts } from './../../store/actions/products';


export default function ProductsOverviewScreen(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsREfreshing] = useState(false)
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setIsREfreshing(true)
        try {
            await dispatch(fetchProducts())

        } catch (error) {
            setError(error.message)
        }
        setIsREfreshing(false)
    }, [dispatch, setIsLoading, setError])

    // listen drawer navigation for updating data when we routing by drawer navigator
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts)
        return () => {
            willFocusSub.remove()
        }
    }, [loadProducts])


    useEffect(() => {
        setIsLoading(true)
        loadProducts().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadProducts])



    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        })
    }
    if (isLoading) {
        return (
            <View style={styles.centerText}>
                <ActivityIndicator size='large' color={MyColors.primary} />
            </View>
        )
    }
    if (error) {
        return (
            <View style={styles.centerText}>
                <Text>An Error Ocured!</Text>
                <Button title='Try again' onPress={loadProducts} color={MyColors.primary} />
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centerText}>
                <Text>No products found</Text>
            </View>
        )
    }
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}
                >
                    <Button title='View Details' onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }} color={MyColors.primary} />
                    <Button title='To Cart' onPress={() => { dispatch(addToCart(itemData.item)) }} color={MyColors.secondary} />

                </ProductItem>)}
        />
    )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => { navData.navigation.toggleDrawer() }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => { navData.navigation.navigate('Cart') }}
                />
            </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
