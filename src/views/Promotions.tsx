import React from 'react';
import Promo1 from '../../public/static/images/promo1.png';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { getHomePagePromotionalProducts } from '@/lib/sanityQueries';
import { urlForImage } from '@/lib/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

async function Promotions() {
  let promotionalProductsData = await getHomePagePromotionalProducts();
  return (
    <div className=' text-center py-16'>
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
          <div className=' bg-[#EFE1C7]  h-full overflow-hidden  relative'>
            <div className='p-4'>
              <h3 className='text-xl'>{promotionalProductsData[0]?.title}</h3>
              <p className='font-bold text-lg h-full'>
                ${promotionalProductsData[0]?.price}
              </p>
            </div>
            <Image
              className=' h-[100%]  w-full object-contain  '
              src={urlForImage(
                promotionalProductsData[0]?.images[0]?.asset
              )?.url()}
              width={200}
              height={200}
              alt='Male modal image'
            />
            <Button className='rounded-full bg-white p-0  absolute bottom-4 right-3'>
              <ChevronRight className='w-6 h-6 mx-2 my-4 text-black hover:text-white' />
            </Button>
          </div>
          <div className=' bg-[#D6D6D8]  h-full overflow-hidden relative'>
            <div className='p-4'>
              <h3 className='text-xl'>{promotionalProductsData[1]?.title}</h3>
              <p className='font-bold text-lg h-full'>
                ${promotionalProductsData[1]?.price}
              </p>
            </div>
            <Image
              className=' h-[100%] w-full object-contain '
              src={urlForImage(
                promotionalProductsData[1]?.images[0]?.asset
              )?.url()}
              width={200}
              height={200}
              alt='Male modal image'
            />
            <Link href={`/detail/${promotionalProductsData[1]?.['_id']}`}>
              <Button className='rounded-full bg-white p-0  absolute bottom-4 right-3'>
                <ChevronRight className='w-6 h-6 mx-2 my-4 text-black hover:text-white' />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promotions;
