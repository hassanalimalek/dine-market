import { defineType, defineField } from 'sanity';
export const productCategory = defineType({
  name: 'productCategory',
  type: 'document',
  title: 'Product Categories',
  fields: [
    defineField({
      name: 'productCategory',
      title: 'Product Category',
      type: 'string',
    }),
  ],
});
