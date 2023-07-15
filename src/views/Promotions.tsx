import React from 'react';
import Promo1 from '../../public/static/images/promo1.png';
import Promo2 from '../../public/static/images/promo2.png';
import Promo3 from '../../public/static/images/promo3.png';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

function Promotions() {
  return (
    <div className='container text-center py-16'>
      <h3 className='mb-4 text-md text-blue-700 font-bold'>PROMOTIONS</h3>
      <h2 className='text-3xl font-bold mb-10'>Our Promotions Events</h2>
      <div className='grid grid-cols-1  lg:grid-cols-2 gap-3 '>
        {/* Left Col */}
        <div className=' grid-rows-1 grid gap-3'>
          <div className='bg-[#D6D6D8] h-[220px] overflow-hidden flex justify-between'>
            <div className='w-[50%] flex flex-col items-center justify-center h-full  '>
              <h2 className='text-2xl font-bold uppercase mb-0'>
                Get upto 60%
              </h2>
              <p>For the summer season</p>
            </div>
            <Image
              className='object-top h-[300px] w-[50%]  '
              alt='Female Modal Image'
              src={Promo1}
            />
          </div>
          <div className='bg-black text-white h-[200px] w-[100%] flex flex-col items-center justify-center   '>
            <h2 className='text-2xl font-bold uppercase mb-1'>Get 30% off</h2>
            <p className='text-sm uppercase font-light mb-2'>Use promo code</p>
            <Badge className='bg-gray-700 rounded-sm text-md px-8 py-2'>
              DINEWEEKENDSALE
            </Badge>
          </div>
        </div>
        {/* Right Col */}
        <div className=' text-left grid gap-3 grid-cols-2 grid-rows-1 h-auto'>
          <div className=' bg-[#EFE1C7]  h-full overflow-hidden'>
            <div className='p-4'>
              <h3 className='text-xl'>Flex Sweatshirt</h3>
              <p>
                <span className='line-through mr-3 font-light'> $100.00 </span>
                <span className='font-bold h-full'>$75.00</span>
              </p>
            </div>
            <Image
              className=' h-[100%]  w-full object-contain  '
              src={Promo2}
              alt='Male modal image'
            />
          </div>
          <div className=' bg-[#D6D6D8]  h-full overflow-hidden'>
            <div className='p-4'>
              <h3 className='text-xl'>Flex Sweatshirt</h3>
              <p>
                <span className='line-through mr-3 font-light'> $100.00 </span>
                <span className='font-bold h-full'>$75.00</span>
              </p>
            </div>
            <Image
              className=' h-[100%] w-full object-contain '
              src={Promo3}
              alt='Male modal image'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promotions;
