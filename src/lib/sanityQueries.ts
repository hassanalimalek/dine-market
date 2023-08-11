import { cache } from 'react';
import { sanityClient } from './sanityClient';

export const getProducts = async (filterObj: any) => {
  const filters = [];
  for (const key in filterObj.sideBarFilters) {
    if (filterObj.sideBarFilters[key] === true) {
      filters.push(`'${key}'`);
    }
  }
  let query = `_type=='product'`;
  if (filterObj.searchValue) {
    query = query + ` && title match '${filterObj.searchValue}'`;
  }
  if (filters.length > 0) {
    query = query + ` && genderCategory->genderAndAge in [${filters}]`;
  }

  const res = await sanityClient.fetch(`*[
      ${query}
      ] {
    ...,
    category->{
      productCategory
     }
  }`);

  return res;
};
export const getHomePagePromotionalProducts = async () => {
  const res = await sanityClient.fetch(
    `
  *[_type=='homePagePromotionalProducts']{
    ...homePagePromotionalProduct->{
      _id,
      title,
      images,
      price,
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
  console.log('id --->', id);
  console.log('sanityClient --->', sanityClient);
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
