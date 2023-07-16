import CarouselProduct from '@/components/ui/carousel-product';
import MainCarousel from '@/components/ui/main-carousel';
import React from 'react';
import Promo1 from '../../public/static/images/promo1.png';
import Promo2 from '../../public/static/images/promo2.png';

function HomeProducts() {
  return (
    <div className=' text-center py-16'>
      <h3 className='mb-4 text-md text-blue-700 font-bold upper-case'>
        Products
      </h3>
      <h2 className='text-3xl font-bold mb-10'>Check What We Have</h2>
      <div>
        <MainCarousel>
          <CarouselProduct
            item={{
              title: 'Brushed Raglan SweatShirt',
              type: 'Long Dress',
              price: 195,
              image: Promo1,
            }}
          />
          <CarouselProduct
            item={{
              title: 'Brushed Raglan SweatShirt',
              type: 'Long Dress',
              price: 195,
              image: Promo2,
            }}
          />
          <CarouselProduct
            item={{
              title: 'Brushed Raglan SweatShirt',
              type: 'Long Dress',
              price: 195,
              image: Promo1,
            }}
          />
          <CarouselProduct
            item={{
              title: 'Brushed Raglan SweatShirt',
              type: 'Long Dress',
              price: 195,
              image: Promo2,
            }}
          />
        </MainCarousel>
      </div>
    </div>
  );
}

export default HomeProducts;
