import { defineType, defineField } from 'sanity';
export const product = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [
        {
          type: 'productCategory',
        },
      ],
    }),
    defineField({
      name: 'genderCategory',
      title: 'Gender Category',
      type: 'reference',
      to: [
        {
          type: 'gender-age',
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      title: 'Product Care',
      name: 'productCare',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          name: 'img',
          title: 'Image',
          type: 'image',
        },
      ],
    }),
  ],
});
