'use client';
import React, { useEffect, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import useSWR from 'swr';
import { getProductDetail } from '@/lib/sanityQueries';
import { urlForImage } from '@/lib/image';
import useWindowSize from '@/lib/hooks/useWindowSize';
function ProductDetail({ params }) {
  const size = useWindowSize();
  console.log('size --->', size);

  const {
    data: productData,
    error,
    isLoading,
  } = useSWR(params.productId, getProductDetail);
  console.log('error --->', error);
  console.log(' productData --->', productData);
  console.log(' params ===>', params.productId);

  const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (productData?.images) {
      let images = productData.images.map((image: any) => {
        return {
          original: urlForImage(image?.asset)?.url(),
          thumbnail: urlForImage(image?.asset)?.url(),
        };
      });
      console.log('images --->', images);
      setImages(images);
    }
  }, [productData]);
  return (
    <div className='bg-[#FCFCFC] no-default-container bg-none'>
      <div className='container px-0 '>
        <div className='w-full  flex flex-col lg:flex-row  py-6 md:py-8'>
          {/* Product Images */}
          <div className=' flex-1 flex-grow-[1.3]'>
            <ImageGallery
              items={images}
              thumbnailPosition={
                size?.width && size?.width > 1024 ? 'left' : 'bottom'
              }
              showFullscreenButton={false}
              showBullets={false}
              showPlayButton={false}
              showNav={false}
            />
          </div>
          {/* Buy Section  */}
          <div className=' flex-1 flex-grow-1 p-0 lg:p-6  py-6 lg:py-8'>
            <h2 className=' font-semibold text-xl lg:text-3xl'>
              {productData?.title}
            </h2>
            <p className=' font-bold text-xl lg:text-2xl text-[#AFAFAF] mb-8'>
              {productData?.category?.productCategory}
            </p>
            <div className=''>
              <h4 className='uppercase text-black font-extrabold text-md lg:text-lg'>
                Select Size
              </h4>
              <div className='flex py-4   gap-2'>
                <Toggle
                  aria-label='Toggle italic'
                  className='rounded-full '
                  pressed={selectedSize === 'XS'}
                >
                  <h4 className='font-bold text-md'>XS</h4>
                </Toggle>
                <Toggle
                  aria-label='Toggle italic'
                  className='rounded-full'
                  pressed={selectedSize === 'XS'}
                >
                  <h4 className='font-bold text-md'>S</h4>
                </Toggle>
                <Toggle
                  aria-label='Toggle italic'
                  className='rounded-full'
                  pressed={selectedSize === 'XS'}
                >
                  <h4 className='font-bold text-md'>M</h4>
                </Toggle>
                <Toggle
                  aria-label='Toggle italic'
                  className='rounded-full'
                  pressed={selectedSize === 'XS'}
                >
                  <h4 className='font-bold text-md'>L</h4>
                </Toggle>
              </div>
            </div>
            <div className=' flex items-center gap-8 py-4  lg:py-6'>
              <h2 className='text-md lg:text-lg font-bold'>Quantity</h2>
              <div className='flex items-center gap-3'>
                <Button className='rounded-full text-2xl lg:text-3xl p-0 px-3 bg-white text-black className hover:text-white border border-black'>
                  -
                </Button>
                <p>1</p>
                <Button className='rounded-full  text-2xl lg:text-3xl  p-0 px-[0.6rem] bg-white text-black className hover:bg-black hover:text-white border border-black'>
                  +
                </Button>
              </div>
            </div>
            <div className=' flex items-center gap-8 py-4  lg:py-6'>
              <Button className='text-sm lg:text-md rounded-none'>
                <ShoppingCart className='mr-2' /> Add to Cart
              </Button>
              <p className=' text-xl lg:text-2xl   font-bold space-x-2'>
                ${productData?.price}
              </p>
            </div>
          </div>
        </div>
        {/* Product Detail */}
        <div className='my-16 p-16  bg-white'>
          <div className='relative mb-2'>
            <h2 className='font-bold text-9xl  opacity-[0.7] text-[#f2f3f7] w-full h-full'>
              Overview
            </h2>
            <h2 className='absolute top-[40%] z-2 mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white'>
              Product Overview
            </h2>
          </div>
          <Separator className='h-[1] bg-[#C4C4C4]' />
          <div className='py-8'>
            <h4 className='uppercase text-xl font-semibold text-[#666666] mb-1'>
              Product Detail
            </h4>
            <p className='text-lg'>{productData?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
