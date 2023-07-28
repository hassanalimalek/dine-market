'use client';
import React from 'react';

import { Fragment } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { ICategory } from '@/lib/types';

type TSideBar = {
  categories: ICategory[];
  sideBarFilters: any;
  setSideBarFilters: React.Dispatch<any>;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: React.Dispatch<boolean>;
};

function SideBar({
  categories,
  sideBarFilters,
  setSideBarFilters,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}: TSideBar) {
  return (
    <>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-40 lg:hidden'
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
                <div className='flex items-center justify-between px-4'>
                  <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                  <button
                    type='button'
                    className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <X className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Filters */}
                <form className='mt-4 border-t border-gray-200'>
                  <Disclosure
                    as='div'
                    className='border-t border-gray-200 px-4 py-6'
                  >
                    {({ open }) => (
                      <>
                        <h3 className='-mx-2 -my-3 flow-root'>
                          <Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                            <span className='font-medium text-gray-900'>
                              Categories
                            </span>
                            <span className='ml-6 flex items-center'>
                              {open ? (
                                <MinusIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              ) : (
                                <PlusIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className='pt-6'>
                          <div className='space-y-6'>
                            {categories &&
                              categories.map(
                                (category: any, optionIdx: number) => (
                                  <div
                                    key={category.genderAndAge}
                                    className='flex items-center'
                                  >
                                    <input
                                      id={`${category.genderAndAge}`}
                                      name={`${category.genderAndAge}`}
                                      defaultValue={category.genderAndAge}
                                      type='checkbox'
                                      checked={
                                        sideBarFilters &&
                                        sideBarFilters?.[category.genderAndAge]
                                      }
                                      onChange={(e) => {
                                        setSideBarFilters({
                                          ...sideBarFilters,
                                          [e.target.id]: e.target.checked,
                                        });
                                      }}
                                      className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                    />
                                    <label className='ml-3 min-w-0 flex-1 text-gray-500'>
                                      {category.genderAndAge}
                                    </label>
                                  </div>
                                )
                              )}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Filters */}
      <form className='hidden lg:block'>
        <h3 className='sr-only'>Categories</h3>

        <Disclosure as='div' className='border-b border-gray-200 py-6'>
          {({ open }) => (
            <>
              <h3 className='-mx-2 -my-3 flow-root'>
                <Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                  <span className='font-medium text-gray-900'>Categories</span>
                  <span className='ml-6 flex items-center'>
                    {open ? (
                      <MinusIcon className='h-5 w-5' aria-hidden='true' />
                    ) : (
                      <PlusIcon className='h-5 w-5' aria-hidden='true' />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className='pt-6'>
                <div className='space-y-6'>
                  {categories &&
                    categories.map((category: any, optionIdx: number) => (
                      <div
                        key={category.genderAndAge}
                        className='flex items-center'
                      >
                        <input
                          id={`${category.genderAndAge}`}
                          name={`${category.genderAndAge}`}
                          defaultValue={category.genderAndAge}
                          type='checkbox'
                          checked={
                            sideBarFilters &&
                            sideBarFilters?.[category.genderAndAge]
                          }
                          onChange={(e) => {
                            setSideBarFilters({
                              ...sideBarFilters,
                              [e.target.id]: e.target.checked,
                            });
                          }}
                          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label className='ml-3 min-w-0 flex-1 text-gray-500 '>
                          {category.genderAndAge}
                        </label>
                      </div>
                    ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </form>
    </>
  );
}

export default SideBar;
