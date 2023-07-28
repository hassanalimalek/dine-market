'use client';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import React from 'react';
import emptyCart from '../../../public/static/images/emptyCart.png';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { urlForImage } from '@/lib/image';
import { changeItemQuantity, removeItem } from '@/store/slices/cartSlice';
function Cart() {
  let dispatch = useDispatch();
  const { cartItems, totalItemsPrice } = useSelector(
    (state: any) => state.cart
  );

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
  return (
    <div className='py-4 lg:py-16 '>
      {cartItems.length > 0 ? (
        <div>
          <h2 className='text-2xl font-bold'>Shopping Cart</h2>
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
            <div className='w-full  lg:w-[350px] p-4 my-8  bg-[#FBFCFF]'>
              <h3 className='text-xl font-bold mb-6'>Order Summary</h3>
              <div>
                <div className='flex justify-between gap-2 mb-4 '>
                  <p className='text-lg font-normal '>Delivery Estimation</p>
                  <p className='text-lg font-normal  text-yellow-400'>5 Days</p>
                </div>
                <div className='flex justify-between mb-8'>
                  <p className='text-lg font-normal '>Total</p>
                  <p className='text-lg font-semibold '>$ {totalItemsPrice}</p>
                </div>
                <Button className='rounded-none'>Proceed to Checkout</Button>
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
