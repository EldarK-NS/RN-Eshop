import React from 'react'
import { FlatList, Platform, Button, Alert, View, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux';

import { deleteProduct } from '../../store/actions/products'

import MyColors from '../../constants/MyColors'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import ProductItem from './../../components/shop/ProductItem';

export default function UserProductsScreen(props) {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you want to delete this item?', [
            { text: 'No', style: 'default' },
            { text: 'Yes', style: 'destructive', onPress: () => { dispatch(deleteProduct(id)) } }
        ])
    }

    if (userProducts.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No products found!</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { editProductHandler(itemData.item.id) }}
                >
                    <Button title='Edit' onPress={() => { editProductHandler(itemData.item.id) }} color={MyColors.primary} />
                    <Button title='Delete' onPress={() => { deleteHandler(itemData.item.id) }} color={MyColors.secondary} />
                </ProductItem>)}
        />
    )
}

UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Products',
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
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-add-circle-outline' : 'ios-add-circle-outline'}
                    onPress={() => { navData.navigation.navigate('EditProduct') }}
                />
            </HeaderButtons>
        ),
    }
}


