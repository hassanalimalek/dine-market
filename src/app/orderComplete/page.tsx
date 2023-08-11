'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import checkMarkGif from '../../../public/static/images/checkMark.gif';
import errorGif from '../../../public/static/images/error.gif';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { useDispatch } from 'react-redux';
import { emptyCart } from '@/store/slices/cartSlice';
import Link from 'next/link';

function OrderComplete() {
  let dispatch = useDispatch();
  let [orderId, setOrderId] = useState<string>();
  const searchParams = useSearchParams();

  const successStatus = searchParams.get('success');

  useEffect(() => {
    let id = localStorage.getItem('orderId');
    if (id) {
      dispatch(emptyCart());
      setOrderId(id);
      localStorage.removeItem('orderId');
    } else {
      notFound();
    }
  }, []);
  return (
    <div>
      <div className='min-h-[90vh]  flex justify-center items-center'>
        <div className='bg-white p-6  md:mx-auto '>
          {orderId ? (
            Boolean(successStatus) === true ? (
              <>
                <Image
                  className='m-auto '
                  height={90}
                  width={90}
                  src={checkMarkGif}
                  alt='checkmark icon'
                />
                <div className='text-center '>
                  <h3 className='md:text-2xl  text-gray-900  text-center font-heading text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7F8C8D] to-[#000000] mb-5'>
                    Payment Done!
                  </h3>
                  <p className='text-gray-600 my-2'>
                    Thank you for completing your secure online payment.
                  </p>
                  <p> Your order id is {orderId} </p>
                  <div className='py-8 text-center'>
                    <Link href={'/'}>
                      <Button className='text-lg'>Go to Home</Button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Image
                  className='m-auto mb-4'
                  height={90}
                  width={90}
                  src={errorGif}
                  alt='checkmark icon'
                />
                <div className='text-center '>
                  <h3
                    className='md:text-2xl  text-gray-900  text-center
                   font-heading text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7F8C8D] to-[#000000] mb-5
                   '
                  >
                    Something went wrong, try again
                  </h3>
                </div>
              </>
            )
          ) : (
            <Spinner className='inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' />
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderComplete;
