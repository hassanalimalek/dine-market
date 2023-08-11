'use client';
import React, { useEffect, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { ArrowLeftCircleIcon, SearchX, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import useSWR from 'swr';
import { getProductDetail } from '@/lib/sanityQueries';
import { urlForImage } from '@/lib/image';
import useWindowSize from '@/lib/hooks/useWindowSize';
import { PortableText } from '@portabletext/react';
import { toastError, toastSuccess } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/slices/cartSlice';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import ProductDetailSkeleton from '@/components/ui/productDetailSkeleton';
function ProductDetail({ params }: any) {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const windowSize = useWindowSize();
  let dispatch = useDispatch();
  let router = useRouter();

  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>();

  // Getting Product Detail
  const {
    data: productData,
    error,
    isLoading,
  } = useSWR(params.productId, getProductDetail);

  useEffect(() => {
    // Getting product images
    if (productData?.images) {
      let images = productData.images.map((image: any) => {
        return {
          original: urlForImage(image?.asset)?.url(),
          thumbnail: urlForImage(image?.asset)?.url(),
        };
      });

      setImages(images);
    }
  }, [productData]);

  const changeQuantity = (operation: 'INC' | 'DEC') => {
    if (operation === 'INC') {
      setQuantity(() => {
        return quantity + 1;
      });
    } else if (operation === 'DEC' && quantity > 1) {
      setQuantity(() => {
        return quantity - 1;
      });
    }
  };
  const addToCart = () => {
    console.log('add to cart called @@@');
    if (!selectedSize) {
      toastError('Select a product size');
    } else {
      toastSuccess('Product added to cart');
      dispatch(
        addItem({
          _id: productData._id,
          title: productData.title,
          category: productData.category.productCategory,
          quantity,
          size: selectedSize,
          images: productData.images,
          unitPrice: productData.price,
          subTotal: productData.price * quantity,
        })
      );
    }
  };

  if (!isLoading && (error || !productData)) {
    return (
      <div className='flex justify-center items-center  text-center h-full  my-8 min-h-[80vh]'>
        <div className='shadow-md rounded-lg p-14 '>
          <SearchX className=' h-16 w-16 m-auto mb-4' />
          <h2 className='text-2xl font-semibold mb-3'>Something went wrong </h2>
          <Button
            className='rounded-md'
            onClick={() => {
              // This will reload the page without doing SSR
              router.refresh();
            }}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className='bg-[#FCFCFC] no-default-container bg-none  text min-h-[80vh]'>
      {isLoading ? (
        <ProductDetailSkeleton />
      ) : (
        <div className='container px-0 pt-2 '>
          <ArrowLeftCircleIcon
            className='h-8 w-8 ml-4 cursor-pointer'
            onClick={() => {
              router.back();
            }}
          />
          <div className='w-full gap-4 lg:gap-8 flex flex-col lg:flex-row  lg:items-center  py-6 px-4 md:py-8'>
            {/* Product Images */}
            <div className=' flex-1 flex-grow-[1.3]'>
              <ImageGallery
                items={images}
                thumbnailPosition={
                  windowSize?.width && windowSize?.width > 1024
                    ? 'left'
                    : 'bottom'
                }
                showFullscreenButton={false}
                showBullets={false}
                showPlayButton={false}
                showNav={false}
              />
            </div>
            {/* Buy Section  */}
            <div className='shadow-sm  h-full  flex-1 flex-grow-1 p-0 lg:p-6  py-6 lg:py-8'>
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
                  {sizes.map((size) => {
                    return (
                      <Toggle
                        key={size}
                        name=''
                        aria-label='Toggle italic'
                        className={`rounded-full data-[state=on]:bg-black data-[state=on]:text-white w-10  `}
                        pressed={selectedSize === size}
                        onClick={() => {
                          setSelectedSize(size);
                        }}
                      >
                        <h4 className='font-bold text-md'>{size}</h4>
                      </Toggle>
                    );
                  })}
                </div>
              </div>
              <div className=' flex items-center gap-8 py-4  lg:py-6'>
                <h2 className='text-md lg:text-lg font-bold'>Quantity</h2>
                <div className='flex items-center gap-3'>
                  <Button
                    className='rounded-full text-2xl lg:text-3xl p-0 px-3 bg-white text-black className hover:text-white border border-black'
                    onClick={() => {
                      changeQuantity('DEC');
                    }}
                  >
                    -
                  </Button>
                  <p className='w-3'>{quantity}</p>
                  <Button
                    className='rounded-full  text-2xl lg:text-3xl  p-0 px-[0.6rem] bg-white text-black className hover:bg-black hover:text-white border border-black'
                    onClick={() => {
                      changeQuantity('INC');
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className=' flex items-center gap-8 py-4  lg:py-6'>
                <Button
                  className='text-sm lg:text-md rounded-md'
                  onClick={() => {
                    addToCart();
                  }}
                >
                  <ShoppingCart className='mr-2' /> Add to Cart
                </Button>
                <p className=' text-xl lg:text-2xl   font-bold space-x-2'>
                  ${productData?.price}
                </p>
              </div>
            </div>
          </div>
          {/* Product Detail */}
          <div className='mb-4 border border-transparent'>
            <div className='my-8 p-4 md:my-16 md:p-16 bg-white'>
              <div className='relative mb-2'>
                <h2 className='font-bold text-6xl  sm:text-7xl  md:text-9xl  opacity-[0.7] text-[#f2f3f7] w-full h-full'>
                  Overview
                </h2>
                <h2 className='absolute top-[40%] z-2 mb-4 text-3xl sm:text-4xl tracking-tight font-extrabold text-gray-900  dark:text-white'>
                  Product Overview
                </h2>
              </div>
              <Separator className='h-[1] bg-[#C4C4C4]' />
              <div className='py-8'>
                <h4 className='uppercase text-xl font-semibold text-[#666666] mb-2'>
                  Product Detail
                </h4>
                <p className='text-lg'>{productData?.description}</p>
              </div>
              <div className='py-8'>
                <h4 className='uppercase text-xl font-semibold text-[#666666] mb-2'>
                  Product Care
                </h4>
                <PortableText value={productData?.productCare} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
