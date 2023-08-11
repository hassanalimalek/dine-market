'use client';
import { getGenderAgeGroup, getProducts } from '@/lib/sanityQueries';
import React, { useEffect, useState } from 'react';
import ProductsListing from './components/productsListing';
import useSWR from 'swr';
import SideBar from './components/sidebar';

import { FilterIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description: 'List of products available in dinemarket',
};

function Products() {
  let searchParams = useSearchParams();
  const [sideBarFilters, setSideBarFilters] = useState<any>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const genderAgeCategory = searchParams.get('genderAgeCategory');
  const searchValue = searchParams.get('search');

  // Fetching products data
  const {
    data: productsData,
    error,
    isLoading,
  } = useSWR({ sideBarFilters, searchValue }, getProducts);

  // Fetching filter categories
  const { data: genderAgeGroupCategories } = useSWR(
    '/genderAgeGroupCategories',
    getGenderAgeGroup
  );

  useEffect(() => {
    if (genderAgeCategory) {
      setSideBarFilters({ [genderAgeCategory]: true });
    }
  }, [genderAgeCategory]);

  // Checks if any search exists or any filter is applied
  // Returns a boolean
  const getFilterSearchAppliedCheck = () => {
    if (searchValue && searchValue.length > 0) {
      return true;
    }
    if (Object.keys(sideBarFilters).length !== 0) {
      let result = Object.values(sideBarFilters).find((val: any) => {
        if (val === true) {
          return true;
        }
      });
      return result === true ? true : false;
    }
    return false;
  };

  return (
    <div className='gap-2  min-h-[80vh]'>
      <div className='bg-white h-full'>
        <main className='mx-auto max-w-7xl h-full'>
          <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
              Products
            </h1>

            <div className='flex items-center'>
              <button
                type='button'
                className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className='sr-only'>Filters</span>
                <FilterIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>
          <section
            aria-labelledby='products-heading'
            className='pb-24 pt-6 h-full'
          >
            <h2 id='products-heading' className='sr-only'>
              Products
            </h2>

            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 h-full'>
              <SideBar
                categories={genderAgeGroupCategories}
                sideBarFilters={sideBarFilters}
                setSideBarFilters={setSideBarFilters}
                mobileFiltersOpen={mobileFiltersOpen}
                setMobileFiltersOpen={setMobileFiltersOpen}
              />

              {/* Product grid */}
              <div className='lg:col-span-3 h-full '>
                <ProductsListing
                  loading={isLoading}
                  products={productsData}
                  filterSearchAppliedCheck={getFilterSearchAppliedCheck()}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Products;
