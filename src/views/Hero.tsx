import { ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import HeroImg from '../../public/static/images/hero.png';
import FeaturedListImg from '../../public/static/images/feautured-list.png';
import Image from 'next/image';
import Link from 'next/link';
const Hero = () => {
  return (
    <div className=' h-[90vh] p-0 pt-10 flex   w-full items-center lg:items-end gap-10'>
      <div className=' text-left  flex-1  h-[80%]  flex flex-col justify-between'>
        <div>
          <div className='bg-blue-50 w-auto py-2 px-4 inline-block mb-8 rounded-md text-blue-500 font-bold'>
            Sale 70%
          </div>
          <h1 className='scroll-m-20 text-4xl  font-extrabold tracking-tight md:text-6xl font-sora'>
            An Industrial Take on Streetwear
          </h1>
          <p className='leading-7 text-2xl [&:not(:first-child)]:mt-6'>
            Anyone can beat you but no one can beat your outfit as long as you
            wear Dine outfits.
          </p>
          <Link href={'/products'}>
            <Button className='my-8 py-6 px-6 border-none'>
              <ShoppingCart className='mr-2 h-5 w-5' /> Start Shopping
            </Button>
          </Link>
        </div>
        <div className=' mb-6'>
          <Image
            className=' '
            src={FeaturedListImg}
            alt='Featured List '
          ></Image>
        </div>
      </div>
      <div className='hidden   lg:block  align-bottom  max-h-full  w-7/12  self-end overflow-hidden mr-0 m-0 '>
        <Image
          className=' ml-auto w-11/12'
          src={HeroImg}
          alt='Image of a female model'
        ></Image>
      </div>
    </div>
  );
};

export default Hero;
