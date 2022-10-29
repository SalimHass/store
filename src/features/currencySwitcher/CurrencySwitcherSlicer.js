import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currency: {
      label: "USD",
      symbol: "$",
    },
  },
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;
