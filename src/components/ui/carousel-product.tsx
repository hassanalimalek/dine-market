import { urlForImage } from '@/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function CarouselProduct({ item }: any) {
  let { _id, title, category, price, images } = item;

  return (
    <Link href={`/detail/${_id}`}>
      <div className='text-left m-2 cursor-pointer'>
        <div className='overflow-hidden'>
          <Image
            src={urlForImage(images[0]?.asset)?.url()}
            className='block mb-3  w-[100%] m-0  hover:scale-105 transition duration-700 cursor-pointer'
            alt='product image'
            width={200}
            height={200}
          />
          <h3 className='font-lg font-bold mt-2 mb-0'>{title}</h3>
        </div>

        <h4 className='font-md mb-1 font-light'>{category}</h4>
        <p className='font-lg font-bold text-black'>${price}</p>
      </div>
    </Link>
  );
}
export default CarouselProduct;
