'use client';
import { Button } from '@/components/ui/button';
import { Trash2, CreditCard } from 'lucide-react';
import React from 'react';
import emptyCart from '../../../public/static/images/emptyCart.png';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { urlForImage } from '@/lib/image';
import { changeItemQuantity, removeItem } from '@/store/slices/cartSlice';
import getStripe from '@/lib/stripe';
import { useUser } from '@clerk/nextjs';
import { toastError } from '@/lib/utils';

function Cart() {
  let dispatch = useDispatch();
  const { cartItems, totalItemsPrice } = useSelector(
    (state: any) => state.cart
  );
  const { isLoaded, isSignedIn, user } = useUser();

  const changeQuantity = (item: any, operation: 'INC' | 'DEC') => {
    if (operation === 'INC') {
      dispatch(
        changeItemQuantity({
          _id: item._id,
          size: item.size,
          quantity: item.quantity + 1,
        })
      );
    } else if (operation === 'DEC' && item.quantity > 1) {
      dispatch(
        changeItemQuantity({
          _id: item._id,
          size: item.size,
          quantity: item.quantity - 1,
        })
      );
    }
  };
  const removeProduct = (item: any) => {
    dispatch(removeItem({ _id: item.id, size: item.size }));
  };
  const handleCheckout = async () => {
    if (isLoaded && isSignedIn) {
      let stripeInstance = await getStripe();

      try {
        // Creating stripe session
        const response = await fetch('api/stripe', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(cartItems),
        });
        const sessionData = await response.json();
        if (!sessionData.data) {
          throw new Error(sessionData?.error);
        }

        // Storing order in database upon successful session creation
        const orderResponse = await fetch('api/order', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            order_id: sessionData.data.id,
            user_id: user.id,
            order_detail: JSON.stringify(cartItems),
          }),
        });

        const orderResponseData = await orderResponse.json();
        if (!orderResponseData.data) {
          throw new Error(orderResponseData?.error);
        }
        localStorage.setItem('orderId', sessionData.data.id);
        // Redirecting to stripe payment page
        if (stripeInstance) {
          const { error } = await stripeInstance.redirectToCheckout({
            sessionId: sessionData.data.id,
          });
          console.log('response payment-->', response);
          console.log('error -->', error);
          if (error) {
            throw new Error(error?.message);
          }
        }
      } catch (error) {
        toastError((String(error) as string) || 'Something went wrong');
      }
    } else {
      toastError('Login to place order');
    }
  };
  return (
    <div className='py-4 lg:py-16 min-h-[75vh] border border-black'>
      {cartItems.length > 0 ? (
        <div>
          <h2 className='text-3xl font-bold mb-4'>Shopping Cart</h2>
          <div className='flex flex-col lg:flex-row gap-1 lg:gap-16 '>
            <div className='p-0 flex-1 flex-grow-1 '>
              {/* Cart Products */}
              {cartItems.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className='flex flex-row items-center gap-4 lg:gap-6  py-2 lg:py-4'
                  >
                    <Image
                      src={urlForImage(item.images[0]?.asset)?.url()}
                      height={100}
                      width={100}
                      className='h-full object-cover  max-h-42 rounded-md w-1/4'
                      alt=''
                    />

                    <div className=' flex-1 flex-grow-1 '>
                      <div className='flex justify-between gap-4 lg:gap-8'>
                        <h2 className='font-normal lg:text-xl'>{item.title}</h2>
                        <Trash2
                          onClick={() => {
                            removeProduct(item);
                          }}
                          className='hover:cursor-pointer transition-all duration-200 hover:text-red-500'
                        />
                      </div>
                      <div className='flex justify-between gap-4 lg:gap-8'>
                        <p className='font-bold text-md lg:text-xl text-[#AFAFAF] mb-4'>
                          {item?.category} - {item?.size}
                        </p>
                      </div>

                      <div className='flex justify-between items-center gap-8   '>
                        <p className='text-lg lg:text-xl   font-bold space-x-2'>
                          ${item.unitPrice}
                        </p>
                        <div className='flex items-center gap-3'>
                          <Button
                            onClick={() => {
                              changeQuantity(item, 'DEC');
                            }}
                            className='h-8 rounded-full text-xl  p-0 py-2 px-[0.65rem] bg-white text-black border border-black  hover:text-white'
                          >
                            -
                          </Button>
                          <p className='w-3'>{item.quantity}</p>
                          <Button
                            onClick={() => {
                              changeQuantity(item, 'INC');
                            }}
                            className='h-8 rounded-full  text-xl  p-0 py-2 px-2 bg-white text-black border border-black   hover:bg-black hover:text-white'
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className='w-full shadow-sm rounded-md   lg:w-[375px] p-6 px-8  my-8  bg-[#FBFCFF]'>
              <h3 className='text-2xl font-bold mb-6'>Order Summary</h3>
              <div>
                <div className='flex justify-between gap-2 mb-4 '>
                  <p className='text-lg font-normal '>Delivery Estimation</p>
                  <p className='text-lg font-normal  text-yellow-400'>5 Days</p>
                </div>
                <div className='flex justify-between mb-8'>
                  <p className='text-lg font-normal '>Total</p>
                  <p className='text-lg font-semibold '>$ {totalItemsPrice}</p>
                </div>
                <Button className='rounded-md' onClick={handleCheckout}>
                  <span className='mr-4'>Proceed to Checkout</span>
                  <CreditCard className='hover:text-green-600' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='h-[60vh] flex justify-center items-center'>
          <Image src={emptyCart} alt='' className=' m-auto' />
        </div>
      )}
    </div>
  );
}

export default Cart;
