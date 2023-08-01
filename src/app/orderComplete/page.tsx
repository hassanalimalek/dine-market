'use client';
import React, { useEffect, useState } from 'react';
import checkMark from '../../../public/static/images/checkMark.gif';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function OrderComplete() {
  let [orderId, setOrderId] = useState();
  useEffect(() => {
    let id = localStorage.getItem('orderId');
    console.log('id --->', id);
  }, []);
  return (
    <div>
      <div className='min-h-[90vh] border border-black flex justify-center items-center'>
        <div className='bg-white p-6  md:mx-auto '>
          <Image
            className='m-auto'
            height={90}
            width={90}
            src={checkMark}
            alt='checkmark icon'
          />
          <div className='text-center '>
            <h3
              className='md:text-2xl  text-gray-900  text-center
            font-heading text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7F8C8D] to-[#000000] mb-5
            '
            >
              Payment Done!
            </h3>
            <p className='text-gray-600 my-2'>
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className='py-8 text-center'>
              <Button className='text-lg'>Go to Home</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderComplete;
