import React from 'react';
import QualitySectionImg from '../../public/static/images/qualitySection.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
function BrandDescription() {
  return (
    <div className='my-8 py-8'>
      <h2 className='text-4xl  lg:text-5xl font-bold mb-8  w-[100%] lg:w-[45%] ml-auto'>
        Unique and Authentic Vintage Designer Jewellery
      </h2>
      <div className='flex flex-col lg:flex-row items-center gap-8'>
        <div className=' flex-1 grid grid-rows-2 grid-cols-2 gap-x-4 gap-y-16  relative'>
          <div className='absolute top-[-30px] z-[-1] '>
            <h2 className='text-[#F0F1F4] font-extrabold text-6xl text-[6.875rem]'>
              <span className='block'>Different</span>{' '}
              <span className='block'>from</span> other
            </h2>
          </div>
          <div>
            <h2 className='font-bold text-lg mb-2'>Using Good Material</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
              accusamus debitis, itaque deleniti ex illo doloribus esse
            </p>
          </div>
          <div>
            <h2 className='font-bold text-lg mb-2'>100% Handmande products</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
              accusamus debitis, itaque deleniti ex illo doloribus esse
            </p>
          </div>
          <div>
            <h2 className='font-bold text-lg mb-2'>Modern Fashion Design</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
              accusamus debitis, itaque deleniti ex illo doloribus esse
            </p>
          </div>
          <div>
            <h2 className='font-bold text-lg mb-2'>Discount for Bulk Orders</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
              accusamus debitis, itaque deleniti ex illo doloribus esse
            </p>
          </div>
        </div>
        <div className='flex-1 '>
          <div className='flex flex-col sm:flex-row items-center gap-6'>
            <div className='flex-1'>
              <Image
                className='h-[350px] w-[300px]'
                src={QualitySectionImg}
                alt='Female Modal Image'
              />
            </div>
            <div className='flex-1'>
              <p className='text-lg font-light leading-6 mb-8'>
                This piece is ethically crafted in our small family-owned
                workshop in Peru with unmatched attention to detail and care.
                The Natural color is the actual natural color of the fiber,
                undyed and 100% traceable.
              </p>
              <Button className='rounded-md'>See All Products</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandDescription;
