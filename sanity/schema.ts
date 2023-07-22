import { type SchemaTypeDefinition } from 'sanity';
import { product } from './product';
import { genderAgeGroup } from './gender-age';
import { productCategory } from './product-category';
import { homePageProducts } from './home-page-products';
import { homePagePromotionalProducts } from './home-promotional-products';
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    productCategory,
    homePagePromotionalProducts,
    homePageProducts,
    genderAgeGroup,
  ],
};
