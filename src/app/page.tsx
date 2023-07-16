import BrandDescription from '@/views/BrandDescription';
import Hero from '@/views/Hero';
import HomeProducts from '@/views/HomeProducts';
import Promotions from '@/views/Promotions';

export default function Home() {
  return (
    <>
      <Hero />
      <Promotions />
      <HomeProducts />
      <BrandDescription />
    </>
  );
}
