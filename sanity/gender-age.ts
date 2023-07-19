import { defineType, defineField } from 'sanity';
export const genderAgeGroup = defineType({
  name: 'gender-age',
  type: 'document',
  title: 'Gender & Age',
  fields: [
    defineField({
      name: 'genderAndAge',
      title: 'Gender &/ Age',
      type: 'string',
    }),
  ],
});
