import { urlForImage } from '@/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductCard({ item }: any) {
  let { _id, title, category, price, images } = item;

  return (
    <div className='text-left m-2 shadow-sm border rounded-sm'>
      <div className='overflow-hidden'>
        <Link href={`/detail/${_id}`}>
          <Image
            src={urlForImage(images[0]?.asset)?.url()}
            className='block mb-0  w-[100%] m-0  hover:scale-105 transition duration-700 cursor-pointer'
            alt='product image'
            width={150}
            height={120}
          />
        </Link>
      </div>
      <div className='px-2 py-1 '>
        <Link href={`/detail/${_id}`}>
          <h3 className='text-lg font-lg font-bold mt-2 mb-1'>{title}</h3>
        </Link>
        <div className='flex justify-between py-1'>
          <h4 className='font-md mb-1 font-semibold text-[#a9a7a7]'>
            {category}
          </h4>
          <p className='text-lg font-bold text-black'>${price}</p>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
