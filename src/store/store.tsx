'use client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartSliceReducer from './slices/cartSlice';
export const store = configureStore({
  reducer: { cart: cartSliceReducer },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
