import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import productReducer from './ProductSlice'
import cartReducer from "./CartProduct"
import addressReducer from "./AddressSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem : cartReducer,
    addresses : addressReducer
  },
})