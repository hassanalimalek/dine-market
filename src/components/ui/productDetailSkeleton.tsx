import { Separator } from '@radix-ui/react-separator';
import { ArrowLeftCircleIcon } from 'lucide-react';
import React from 'react';

function ProductDetailSkeleton() {
  return (
    <div className='container px-0 pt-2 animate-pulse'>
      <div className='h-8 w-8 ml-4 bg-gray-200 rounded-full dark:bg-gray-700  '></div>

      <div className='w-full gap-4 lg:gap-8 flex flex-col lg:flex-row  lg:items-center  py-6 px-4 md:py-8 '>
        {/* Product Images */}
        <div className=' flex-1 flex-grow-[1.3]'>
          <div className='flex items-center justify-center w-full h-[340px] md:h-[420px] bg-gray-300 rounded  dark:bg-gray-700'>
            <svg
              className='w-10 h-10 text-gray-200 dark:text-gray-600'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 18'
            >
              <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
            </svg>
          </div>
        </div>

        {/* Buy Section  */}
        <div className='shadow-sm  h-full  flex-1 flex-grow-1 p-0 lg:p-6  py-6 lg:py-24 '>
          <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-6'></div>
          <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full  mb-6'></div>
          <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full  mb-6'></div>

          <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[50%] mb-8'></div>

          <div className=''>
            <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[50%] mb-8'></div>
            <div className='flex py-4  gap-3 mb-4'>
              {[1, 2, 3, 4, 5, 6].map((size) => {
                return (
                  <div
                    key={size}
                    className='h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700  '
                  ></div>
                );
              })}
            </div>
          </div>
          <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[50%] mb-8'></div>
          <div className='h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 '></div>
        </div>
      </div>
      {/* Product Detail */}
      <div className='mb-4 border border-transparent'>
        <div className='my-8 p-4 md:my-16 md:p-16 bg-white'>
          <div className='relative mb-2'>
            <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-6'></div>
            <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-6'></div>
            <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-6'></div>
            <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-6'></div>
            <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-6'></div>
            <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-6'></div>
            <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-6'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
