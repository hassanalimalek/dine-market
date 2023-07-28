import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalItemsPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addItem: (state: any, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) =>
          item?._id == action.payload._id && item.size === action.payload.size
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity =
          state.cartItems[itemIndex]?.quantity + action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      // Updating Total Items Price
      state.totalItemsPrice = state.cartItems.reduce(
        (accumulator: any, cartItem: any) =>
          accumulator + cartItem.quantity * cartItem.unitPrice,
        0
      );
    },
    removeItem: (state: any, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) =>
          item?._id == action.payload._id && item.size === action.payload.size
      );
      state.cartItems.splice(itemIndex, 1);
      // Updating Total Items Price
      state.totalItemsPrice = state.cartItems.reduce(
        (accumulator: any, cartItem: any) =>
          accumulator + cartItem.quantity * cartItem.unitPrice,
        0
      );
    },
    changeItemQuantity: (state: any, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) =>
          item?._id == action.payload._id && item.size === action.payload.size
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = action.payload.quantity;
        if (action.payload.operation === 'INC') {
          state.totalItemsPrice =
            state.totalItemsPrice +
            action.payload.unitPrice * action.payload.quantity;
        } else {
          state.totalItemsPrice =
            state.totalItemsPrice -
            action.payload.unitPrice * action.payload.quantity;
        }
        // Updating Total Items Price
        state.totalItemsPrice = state.cartItems.reduce(
          (accumulator: any, cartItem: any) =>
            accumulator + cartItem.quantity * cartItem.unitPrice,
          0
        );
      }
    },
  },
});

export const { addItem, removeItem, changeItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
