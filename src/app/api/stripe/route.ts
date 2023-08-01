import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';

let key = process.env.STRIPE_SECRET_KEY || '';

const stripe = new Stripe(key, {
  apiVersion: '2022-11-15',
});

export async function POST(request: NextRequest, response: NextResponse) {
  console.log('Post reuqest called');
  const body = await request.json();
  console.log(' body --->', body);
  if (body) {
    // Cart Items
    let items = body.map((item: any) => {
      return {
        price_data: {
          currency: 'USD',
          unit_amount: item.unitPrice * 100,
          product_data: {
            name: item.title,
          },
        },
        quantity: item.quantity,
      };
    });

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        line_items: items,
        mode: 'payment',
        shipping_options: [
          {
            shipping_rate: 'shr_1NZ8DCAq5EYUizZi9lQYqWun',
          },
          {
            shipping_rate: 'shr_1NZ8CgAq5EYUizZiAoaAsNDo',
          },
        ],
        success_url: `${request.headers.get(
          'origin'
        )}/orderComplete?success=true`,
        cancel_url: `${request.headers.get('origin')}/?canceled=true`,
      });

      console.log('session --->', session);
      return NextResponse.json({
        message: 'Stripe session created successfully',
        data: session,
      });
    } catch (err: any) {
      // return t.error();
      return NextResponse.json({ error: err.message });
      // return NextResponse.json(err.message);
    }
  }
}
