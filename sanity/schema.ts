import { type SchemaTypeDefinition } from 'sanity';
import { product } from './product';
import { genderAgeGroup } from './gender-age';
import { productCategory } from './product-category';
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, productCategory, genderAgeGroup],
};
