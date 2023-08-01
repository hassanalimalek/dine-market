'use client';
import ProductCard from '@/components/ui/product-card';
import React from 'react';
import { SearchX } from 'lucide-react';
import { IProduct } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type TProductListing = {
  products: IProduct[];
  loading: boolean;
  filterSearchAppliedCheck: boolean;
};
function ProductsListing({
  products,
  loading,
  filterSearchAppliedCheck,
}: TProductListing) {
  let router = useRouter();
  if (!loading && products.length == 0) {
    return (
      <div className='flex justify-center items-center  text-center h-full  my-8'>
        <div className='shadow-md rounded-lg p-14 '>
          <SearchX className=' h-16 w-16 m-auto mb-4' />
          <h2 className='text-2xl font-semibold mb-3'>
            {!filterSearchAppliedCheck
              ? 'Something went wrong'
              : 'No results found'}{' '}
          </h2>
          {!filterSearchAppliedCheck && (
            <Button
              className='rounded-md'
              onClick={() => {
                // This will reload the page without doing SSR
                router.refresh();
              }}
            >
              Retry
            </Button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3'>
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
              return (
                <div
                  key={index}
                  role='status'
                  className=' border-gray-200  animate-pulse  dark:border-gray-700 m-2 shadow-sm border rounded-sm'
                >
                  <div className='flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700'>
                    <svg
                      className='w-10 h-10 text-gray-200 dark:text-gray-600'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 16 20'
                    >
                      <path d='M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z' />
                      <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
                    </svg>
                  </div>
                  <div className='p-4'>
                    <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>

                    <span className='sr-only'>Loading...</span>
                  </div>
                </div>
              );
            })
          : products &&
            products?.map((product: any) => {
              return (
                <ProductCard
                  key={product._id}
                  item={{
                    ...product,
                    category: product?.category?.productCategory,
                  }}
                />
              );
            })}
      </div>
    );
  }
}

export default ProductsListing;
