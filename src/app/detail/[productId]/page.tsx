import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import ProductDetail from './components/detail';
import { getProductDetail } from '@/lib/sanityQueries';

type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let data = await getProductDetail(params?.productId);

  return {
    title: data.title || 'Product Detail',
    description: data.description || 'Product Description',
  };
}

function Detail() {
  return <ProductDetail />;
}

export default Detail;
