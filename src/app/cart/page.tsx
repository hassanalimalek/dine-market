import { Button } from '@/components/ui/button';
import { DeleteIcon, Trash2 } from 'lucide-react';
import React from 'react';
import Promo3 from '../../../public/static/images/promo3.png';
import Image from 'next/image';
function Cart() {
  return (
    <div className='py-4 lg:py-16 '>
      <h2 className='text-2xl font-bold'>Shopping Cart</h2>
      <div className='flex flex-col lg:flex-row gap-1 lg:gap-16 '>
        <div className='p-0 flex-1 flex-grow-1 '>
          {/* Cart Products */}
          <div className=' flex flex-row items-center gap-4 lg:gap-6  py-2 lg:py-8'>
            <Image
              src={Promo3}
              className=' h-full object-cover  max-h-72 rounded-md w-1/3 md:w-1/3'
              alt=''
            />

            <div className=' flex-1 flex-grow-1 '>
              <div className='flex justify-between gap-4 lg:gap-8'>
                <h2 className=' font-normal lg:text-xl'>
                  Cameryn Sash Tie Dress
                </h2>
                <Trash2 />
              </div>
              <p className=' font-bold text-md lg:text-xl text-[#AFAFAF] mb-4'>
                Dress
              </p>

              <div className=' flex justify-between items-center gap-8   '>
                <p className=' text-lg lg:text-xl   font-bold space-x-2'>
                  $545.00
                </p>
                <div className='flex items-center gap-3'>
                  <Button className='h-8 rounded-full text-xl  p-0 py-2 px-[0.65rem] bg-white text-black border border-black  hover:text-white'>
                    -
                  </Button>
                  <p>1</p>
                  <Button className='h-8 rounded-full  text-xl  p-0 py-2 px-2 bg-white text-black border border-black   hover:bg-black hover:text-white'>
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className='w-full  lg:w-[350px] p-4 my-8  bg-[#FBFCFF]'>
          <h3 className='text-xl font-bold mb-6'>Order Summary</h3>

          <div>
            <div className='flex justify-between mb-4'>
              <p className='text-lg font-normal '>Total Quantity</p>
              <p className='text-lg font-normal '>1</p>
            </div>
            <div className='flex justify-between gap-2 mb-4 '>
              <p className='text-lg font-normal '>Delivery Estimation</p>
              <p className='text-lg font-normal  text-yellow-400'>5 Days</p>
            </div>
            <div className='flex justify-between mb-8'>
              <p className='text-lg font-normal '>SubTotal</p>
              <p className='text-lg font-normal '>$545</p>
            </div>
            <Button className='rounded-none'>Proceed to Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
