import CarouselProduct from '@/components/ui/carousel-product';
import MainCarousel from '@/components/ui/main-carousel';
import React from 'react';
import { getHomePageProducts } from '@/lib/sanityQueries';
async function HomeProducts() {
  let productsData = await getHomePageProducts();

  return (
    <div className=' text-center py-16'>
      <h3 className='mb-4 text-md text-blue-700 font-bold upper-case'>
        Products
      </h3>
      <h2 className='text-3xl font-bold mb-10'>Check What We Have</h2>
      <div>
        <MainCarousel>
          {productsData.map((product: any) => (
            <CarouselProduct
              key={product._id}
              item={{
                ...product,
                category: product?.category?.productCategory,
              }}
            />
          ))}
        </MainCarousel>
      </div>
    </div>
  );
}

export default HomeProducts;
