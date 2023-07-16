import Image from 'next/image';
import React from 'react';

function CarouselProduct({ item }: any) {
  let { title, type, price, image } = item;
  return (
    <div className='text-left  m-2'>
      <Image src={image} alt='product image block mb-3 w-full' />
      <h3 className='font-lg font-bold mt-2 mb-0'>{title}</h3>
      <h4 className='font-md mb-1 font-light'>{type}</h4>
      <p className='font-lg font-bold text-black'>${price}</p>
    </div>
  );
}
export default CarouselProduct;
