import React from 'react';
import { Metadata } from 'next';
import OrderComplete from './components/orderComplete';

export const metadata: Metadata = {
  title: 'Order Complete',
};

function OrderCompletePage() {
  return <OrderComplete />;
}

export default OrderCompletePage;
