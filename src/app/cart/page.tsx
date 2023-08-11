import React from 'react';
import { Metadata } from 'next';
import Cart from './components/cart';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'View the products cart',
};

function CartPage() {
  return <Cart />;
}

export default CartPage;
