
import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'
import { enableScreens } from 'react-native-screens'

import ShopNavigator from './navigation/ShopNavigator';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/order';

enableScreens()

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})
const store = createStore(rootReducer)

const fetchFonts = async () => {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}


export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => { setFontLoaded(true) }}
        onError={(err) => console.log(err)}
      />
    )
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

