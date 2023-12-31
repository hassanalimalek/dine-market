import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
  const hook_response: any = await request.body;

  const result = await request.json();
  // Handle the event based on its type
  if (result.type === 'checkout.session.completed') {
    // Payment success event, handle accordingly

    if (hook_response) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/order`, {
          method: 'PATCH',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            order_id: result.data.object.id,
          }),
        });
      } catch (error: any) {
        return NextResponse.json(
          {
            message: 'Unable to complete processing',
            data: `${
              error?.message
                ? error?.message
                : `process.env.NEXT_PUBLIC_DOMAIN -- > ,${process.env.NEXT_PUBLIC_DOMAIN}`
            } `,
          },
          { status: 400 }
        );
      }
    }
  }
  return NextResponse.json({
    message: 'Data added successfully',
    data: result,
  });
}
