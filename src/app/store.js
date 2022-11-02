import {configureStore} from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import currencyReducer from '../features/currencySwitcher/CurrencySwitcherSlice'

export default configureStore({
    reducer: {
        cart: cartReducer,
        currency: currencyReducer

    },
})