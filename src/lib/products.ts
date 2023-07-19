import { sanityClient } from './sanityClient';

export const getProducts = async () => {
  const res = await sanityClient.fetch(`*[_type=='product']`);
  console.log('res --->', res);
};
