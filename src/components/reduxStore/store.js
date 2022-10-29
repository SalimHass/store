import {configureStore} from '@reduxjs/toolkit'
import cartReducer from '../cart/cartSlice'
import currencyReducer from '../../features/currencySwitcher/CurrencySwitcherSlicer'

export default configureStore({
    reducer: {cart: cartReducer,
            currency: currencyReducer
                
    },
})