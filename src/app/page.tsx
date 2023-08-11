import BrandDescription from '@/views/BrandDescription';
import Hero from '@/views/Hero';
import HomeProducts from '@/views/HomeProducts';
import NewsLetter from '@/views/NewsLetter';
import Promotions from '@/views/Promotions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DineMarket',
  description:
    'DineMarket is a modern and feature-rich ecommerce project that aims to provide users with a seamless shopping experience',
};

export default async function Home() {
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
