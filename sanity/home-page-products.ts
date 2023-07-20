import { defineType, defineField } from 'sanity';
export const homePageProducts = defineType({
  name: 'homePageProducts',
  type: 'document',
  title: 'Home Page Products',
  fields: [
    defineField({
      name: 'homePageProduct',
      title: 'Home Page Product',
      type: 'reference',
      to: [
        {
          type: 'product',
        },
      ],
    }),
  ],
});
