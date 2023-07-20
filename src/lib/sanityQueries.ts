import { cache } from 'react';
import { sanityClient } from './sanityClient';
import { SanityClient } from 'sanity';

export const getProducts = async () => {
  const res = await sanityClient.fetch(`*[_type=='product']`);
  console.log('res --->', res);
};
export const getHomePageProducts = async () => {
  const res = await sanityClient.fetch(
    `
  *[_type=='homePageProducts']{
    ...homePageProduct->{
      ...,
      genderCategory->{
        genderAndAge
      },
      category->{
       productCategory
      }
    }
  }
  `,
    { next: { revalidate: 0 } }
  );
  return res;
};
export const getProductDetail = async (id: string) => {
  const res = await sanityClient.fetch(
    `
    *[_type=='product' && _id== '${id}' ]{
      ...,
       genderCategory->{
            genderAndAge
          },
      category->{
       productCategory
      }
    }
  `,
    { next: { revalidate: 0 } }
  );
  return res?.[0];
};

export const getGenderAgeGroup = async () => {
  const res = await sanityClient.fetch(
    `
    *[_type=='gender-age' ]{
      genderAndAge
    }
    `,
    { next: { revalidate: 0 } }
  );
  return res;
};
