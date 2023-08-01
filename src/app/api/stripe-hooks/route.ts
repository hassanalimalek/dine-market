import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';

let key = process.env.STRIPE_SECRET_KEY || '';

const stripe = new Stripe(key, {
  apiVersion: '2022-11-15',
});

export async function POST(request: NextRequest, response: NextResponse) {
  const hook_response: any = await request.body;
  const result = await request.json();
  console.log('hook executed @@@@');
  // console.log('result data --->', result?.data);
  // console.log(' body --->', body);
  // Handle the event based on its type
  if (result.type === 'checkout.session.completed') {
    // Payment success event, handle accordingly
    if (hook_response) {
      console.log('order -->', hook_response);
      console.log('result -->', result.data.object.id);
      await fetch('http://localhost:3000/api/order', {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          order_id: result.data.object.id,
        }),
      });
      console.log('Payment succeedced:');
    }
  }
  return NextResponse.json({
    message: 'Data added successfully',
    data: result,
  });
}
