import { sanityClient } from './sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  return builder.image(source).auto('format').fit('max');
}
