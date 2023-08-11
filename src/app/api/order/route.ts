import { NextRequest, NextResponse } from 'next/server';
import { db, ordersTable } from '@/lib/dirzzle';
import { eq } from 'drizzle-orm';
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    let req = await request.json();

    let res = await db
      .insert(ordersTable)
      .values({
        order_id: req.order_id,
        user_id: req.user_id,
        order_detail: JSON.stringify(req.order_detail),
        payment_status: 'pending',
      })
      .returning();

    return NextResponse.json({ message: 'Data added successfully', data: res });
  } catch (error: any) {
    console.log('Error --->', error);
    return NextResponse.json({
      error: (error.message as string) || 'Something went wrong',
    });
  }
}

export async function PATCH(request: NextRequest, response: NextResponse) {
  try {
    let req = await request.json();

    let res = await db
      .update(ordersTable)
      .set({ payment_status: 'paid' })
      .where(eq(ordersTable.order_id, req.order_id))
      .returning();
    return NextResponse.json({ message: 'Data added successfully', data: res });
  } catch (error) {
    console.log('Error --->', error);
    return NextResponse.json({ Message: 'Something went wrong' });
  }
}
