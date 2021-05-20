import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons';

import MyColors from '../constants/MyColors';

import ProductsOverviewScreen from './../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from './../screens/shop/ProductDetailScreen';
import CartScreen from './../screens/shop/CartScreen';
import OdersScreen from './../screens/shop/OdersScreen';
import UserProductsScreen from './../screens/user/UserProductsScreen';
import EditProductScreen from './../screens/user/EditProductScreen';
import AuthScreen from './../screens/user/AuthScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? MyColors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'roboto-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'roboto-regular'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : MyColors.primary
}


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23} color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    Orders: OdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23} color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23} color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: MyColors.primary,
        labelStyle: {
            fontFamily: 'roboto-bold',
            fontSize: 18
        }
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
    AuthScreen: AuthNavigator,
    Shop: ShopNavigator
})



export default createAppContainer(MainNavigator)