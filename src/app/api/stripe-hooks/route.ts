import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
  console.log('post request in stripe --hooks');
  const hook_response: any = await request.body;
  console.log('hook_response --->', hook_response);
  const result = await request.json();
  // Handle the event based on its type
  if (result.type === 'checkout.session.completed') {
    // Payment success event, handle accordingly
    console.log(
      'process.env.NEXT_PUBLIC_DOMAIN --->',
      process.env.NEXT_PUBLIC_DOMAIN
    );
    console.log('process.env-->', process.env);
    console.log(
      'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID',
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    );
    console.log('https://dinemarket-kappa.vercel.app/api/stripe-hooks ');
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
        console.log('Error in hook --->', error);
        return NextResponse.json(
          {
            message: 'Unable to complete processing',
            data: error?.message,
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
