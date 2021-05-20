import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ShopNavigator from './ShopNavigator'
import { NavigationActions } from 'react-navigation'

const NavigationContainer = props => {

    const navRef = useRef()
    const iaAuth = useSelector(state => !!state.auth.token)

    useEffect(() => {
        if (!iaAuth) {
            navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }))
        }
    }, [iaAuth])

    return <ShopNavigator ref={navRef} />
}

export default NavigationContainer

