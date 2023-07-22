import { defineType, defineField } from 'sanity';
export const homePagePromotionalProducts = defineType({
  name: 'homePagePromotionalProducts',
  type: 'document',
  title: 'Home Promotional Products (2 required)',
  fields: [
    defineField({
      name: 'homePagePromotionalProduct',
      title: 'Home Promotional Product',
      type: 'reference',
      to: [
        {
          type: 'product',
        },
      ],
    }),
  ],
});
