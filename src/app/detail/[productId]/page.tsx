'use client';
import React, { useEffect, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { SearchX, ShoppingCart } from 'lucide-react';
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
        <div className='container px-0 h-[75vh] flex items-center justify-center '>
          <div role='status '>
            <svg
              aria-hidden='true'
              className='inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : (
        <div className='container px-0 '>
          <div className='w-full  flex flex-col lg:flex-row  py-6 px-4 md:py-8'>
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
                  className='text-sm lg:text-md rounded-none'
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
