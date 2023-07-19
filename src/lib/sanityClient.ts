import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  apiVersion: 'v2023-07-18',
  dataset: 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: true,
});
