'use client';
import Image from 'next/image';
import { Search, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IGenderCategory } from '@/lib/types';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import LogoImage from '../../public/Logo.png';

interface FormElements extends HTMLFormControlsCollection {
  search: HTMLInputElement;
}

interface searchFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

const Navbar = ({
  genderAgeGroupData,
}: {
  genderAgeGroupData: IGenderCategory[];
}) => {
  const router = useRouter();
  const [navVisible, setNavVisible] = useState(false);

  const cartItemsCount = useSelector(
    (state: any) => state.cart.cartItems.length
  );

  return (
    <nav className='px-0 flex justify-between items-center h-20 '>
      <Link href='/'>
        <Image src={LogoImage} alt='website logo' width={150} height={150} />
      </Link>

      <button
        data-collapse-toggle='navbar-default'
        type='button'
        className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        aria-controls='navbar-default'
        aria-expanded='false'
        onClick={() => {
          setNavVisible(!navVisible);
        }}
      >
        <span className='sr-only'>Open main menu</span>
        <svg
          className='w-5 h-5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 17 14'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M1 1h15M1 7h15M1 13h15'
          />
        </svg>
      </button>
      <div
        className={`${
          navVisible ? 'block' : 'hidden'
        }  absolute shadow-lg md:shadow-none md:relative top-[7%]  left-0 w-full md:block md:w-auto id='navbar-default`}
      >
        <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0   dark:border-gray-700 cursor-pointer'>
          {genderAgeGroupData &&
            genderAgeGroupData.map((data: any, index: any): any => {
              return (
                <li key={index}>
                  <p
                    onClick={() => {
                      router.push(
                        `/products?genderAgeCategory=${data?.genderAndAge}`
                      );
                    }}
                    className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-lg cursor-pointer'
                    aria-current='page'
                  >
                    {data?.genderAndAge}
                  </p>
                </li>
              );
            })}

          <li>
            <p
              onClick={() => {
                router.push(`/products`);
              }}
              className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-lg cursor-pointer'
            >
              All Products
            </p>
          </li>
        </ul>
      </div>

      <div className=' hidden w-full lg:block lg:w-auto'>
        <div className='relative w-full'>
          <form
            onSubmit={(event: React.FormEvent<searchFormElements>) => {
              event.preventDefault();
              let search = event.currentTarget.elements.search.value;
              router.push(`/products?search=${search}`);
            }}
          >
            <label
              htmlFor='search'
              className='hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Search
            </label>
            <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <Search className='bg-white rounded-l' />{' '}
            </div>
            <input
              className=' block p-3 pl-10 px-24 w-full text-sm text-gray-900 bg-gray-50  border border-gray-300  focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 rounded-md'
              placeholder='Search...'
              type='text'
              id='search'
            />
          </form>
        </div>
      </div>
      <div className='flex items-center gap-4 '>
        <Link href={'/cart'}>
          <div className='p-2 rounded-full bg-gray-300 relative hidden w-full md:block md:w-auto'>
            <ShoppingCart className='h-5 w-5' />
            <span className='absolute -top-3 -right-1 h-5 w-5 text-sm text-center rounded-full bg-[#f02d34] text-white'>
              {cartItemsCount}
            </span>
          </div>
        </Link>
        <SignedIn>
          <UserButton afterSignOutUrl={''} />
        </SignedIn>
        <SignedOut>
          <SignInButton mode='modal' redirectUrl={''}>
            <Button className='px-3 py-1 h-8'>Sign in</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
