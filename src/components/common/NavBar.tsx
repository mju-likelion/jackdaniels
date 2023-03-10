import { FC, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils';
import { useManager } from '@/hooks';
import { useRouter } from 'next/router';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [{ name: '지원서 확인', href: '/applications' }];

export const NavBar: FC = () => {
  const router = useRouter();
  const removeAccessToken = useManager(state => state.removeAccessToken);

  const onSignOut = () => {
    removeAccessToken();
    router.reload();
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-zinc-100">
        <body class="h-full">
        ```
      */}
      <div className='min-h-full'>
        <Disclosure as='nav' className='bg-zinc-800'>
          {({ open }) => (
            <>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='shrink-0'>
                      <img
                        className='h-8 w-8'
                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                        alt='Logo'
                      />
                    </div>
                    <div className='hidden md:block'>
                      <div className='ml-10 flex items-baseline space-x-4'>
                        {navigation.map(item => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.href === router.pathname
                                ? 'bg-zinc-900 text-white'
                                : 'text-zinc-300 hover:bg-zinc-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium',
                            )}
                            aria-current={
                              item.href === router.pathname ? 'page' : undefined
                            }
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-4 flex items-center md:ml-6'>
                      {/* Profile dropdown */}
                      <Menu as='div' className='relative ml-3'>
                        <div>
                          <Menu.Button className='flex max-w-xs items-center rounded-full bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-800'>
                            <span className='sr-only'>Open user menu</span>
                            <img
                              className='h-8 w-8 rounded-full'
                              src={user.imageUrl}
                              alt=''
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none'>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={onSignOut}
                                  className={classNames(
                                    active ? 'bg-zinc-100' : '',
                                    'block px-4 py-2 text-sm text-zinc-700',
                                  )}
                                >
                                  로그아웃
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className='-mr-2 flex md:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-800'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      ) : (
                        <Bars3Icon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='md:hidden'>
                <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
                  {navigation.map(item => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={classNames(
                        item.href === router.pathname
                          ? 'bg-zinc-900 text-white'
                          : 'text-zinc-300 hover:bg-zinc-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium',
                      )}
                      aria-current={
                        item.href === router.pathname ? 'page' : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className='border-t border-zinc-700 pt-4 pb-3'>
                  <div className='flex items-center px-5'>
                    <div className='shrink-0'>
                      <img
                        className='h-10 w-10 rounded-full'
                        src={user.imageUrl}
                        alt=''
                      />
                    </div>
                    <div className='ml-3'>
                      <div className='text-base font-medium leading-none text-white'>
                        {user.name}
                      </div>
                      <div className='text-sm font-medium leading-none text-zinc-400'>
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className='mt-3 space-y-1 px-2'>
                    <Disclosure.Button
                      onClick={onSignOut}
                      className='block rounded-md px-3 py-2 text-base font-medium text-zinc-400 hover:bg-zinc-700 hover:text-white'
                    >
                      로그아웃
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};
