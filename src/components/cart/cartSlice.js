import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    values: {amount:0,
    product:[]},
  },
  reducers: {
    addItem: (state, action) => {
      state.values.amount += action.payload.amount;
      state.values.product=[...state.values.product, action.payload.product]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem } = cartSlice.actions

export default cartSlice.reducer