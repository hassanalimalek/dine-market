import { getProducts } from '@/lib/sanityQueries';
import BrandDescription from '@/views/BrandDescription';
import Hero from '@/views/Hero';
import HomeProducts from '@/views/HomeProducts';
import NewsLetter from '@/views/NewsLetter';
import Promotions from '@/views/Promotions';

export default async function Home() {
  let data = await getProducts();
  return (
    <>
      <Hero />
      <Promotions />
      <HomeProducts />
      <BrandDescription />
      <NewsLetter />
    </>
  );
}
