export default {
  name: 'featured',
  title: 'Featured Menu Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Featured category name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'restraunts',
      type: 'array',
      title: 'Restaurants',
      of: [{ type: 'reference', to: [{ type: 'restraunt' }] }],
    },
  ],
};