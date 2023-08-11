import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
  const hook_response: any = await request.body;
  const result = await request.json();
  // Handle the event based on its type
  if (result.type === 'checkout.session.completed') {
    // Payment success event, handle accordingly
    if (hook_response) {
      await fetch(`${process.env.DOMAIN}/api/order`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          order_id: result.data.object.id,
        }),
      });
    }
  }
  return NextResponse.json({
    message: 'Data added successfully',
    data: result,
  });
}
