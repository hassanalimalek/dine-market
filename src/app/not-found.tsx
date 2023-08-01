import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function NotFound() {
  return (
    <section className='bg-white dark:bg-gray-900 '>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <p className='p-3 text-sm font-medium text-black rounded-full bg-gray-200 dark:bg-gray-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
              />
            </svg>
          </p>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
            Page not found
          </h1>
          <p className='mt-4 text-gray-500 dark:text-gray-400'>
            The page you are looking for doesn't exist. Here are some helpful
            links:
          </p>
          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
            <Link href={'/'}>
              <Button className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200  rounded-lg shrink-0 sm:w-auto bg-black '>
                <span className='mr-2 '>Take me home</span>
                <Home className='h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
