import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addItem: (state, action) => {
      const product = { ...action.payload, quantity: 1 };
      let found = false;
      const products = state.products.map((pro) => {
        if (product.id === pro.id && (_.isEqual(product.attrDetails, pro.attrDetails)) ) {
          pro.quantity = pro.quantity + 1;
          found = true;
        }
        return pro;
      });
      if (found) {
        state.products = products;
      } else {
        state.products = [...state.products, product];
      }
     
    },
    removeItem: (state, action) => {
      const product = action.payload;
      const products = state.products.map((pro) => {
        if (product.id === pro.id && (_.isEqual(product.attrDetails, pro.attrDetails)) ) {
          pro.quantity = pro.quantity - 1;
        }
        return pro;
      });
      state.products = products;
     
    },
    updateItem: (state, action) => {
      const prodIndex = action.payload.index;
      const newProduct = action.payload.product
      const products = state.products.map((pro,index) => {
        if (prodIndex===index) {
          pro = {...pro,attrDetails:newProduct.attrDetails}
        }
        return pro;
      });
      state.products = products;
     
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem,updateItem,removeItem } = cartSlice.actions;

export default cartSlice.reducer;
