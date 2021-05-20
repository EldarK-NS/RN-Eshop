import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import MyColors from '../constants/MyColors';

import ProductsOverviewScreen from './../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from './../screens/shop/ProductDetailScreen';
import CartScreen from './../screens/shop/CartScreen';
import OdersScreen from './../screens/shop/OdersScreen';
import UserProductsScreen from './../screens/user/UserProductsScreen';
import EditProductScreen from './../screens/user/EditProductScreen';
import AuthScreen from './../screens/user/AuthScreen';

import StartupScreen from './../screens/StartupScreen';

import { logout } from '../store/actions/auth'

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
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View style={{ flex: 1, paddingTop: 60 }}>
                <SafeAreaView forceInset={{ top: 'always', horisontal: 'never' }}>
                    <DrawerNavigatorItems {...props} />
                    <Button title='Logout' color={MyColors.primary} onPress={() => {
                        dispatch(logout())
                        props.navigation.navigate('Auth')
                    }} />

                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    AuthScreen: AuthNavigator,
    Shop: ShopNavigator
})



export default createAppContainer(MainNavigator)