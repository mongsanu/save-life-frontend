import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
// import routes from '../../configs/router.config';
import logo from '../../public/logo.png';
import Image from 'next/image';
import Cookies from 'js-cookie';
import router from 'next/router';
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation({darkToggle, setDarkToggle}: any) {
  const [navigation, setNavigation] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [path, setPath] = useState('');
  const [admin, setAdmin] = useState<any>({});

  const token = Cookies.get("access_token");
  useEffect(() => {
    const path = window.location.pathname;
    console.log({path});
    console.log({token});
    
    const admin = JSON.parse(localStorage.getItem("user") || "{}");
    console.log({admin});
    
    setPath(path);
    setAdmin(admin);
    let routes: any = [
      { id: 1, name: 'Home', href: '/', current: true },
      { id: 4, name: 'Request', href: '/request', current: false },
      { id: 5, name: 'Find A Donor', href: '/donors', current: false },
      { id: 3, name: 'Admin', href: '/admin', current: false },
      // { id: 3, name: 'About', href: '/about', current: false },
    ];
    !token 
    ?  routes.push({ id: 2, name: 'Register', href: '/register', current: false })
    :  routes = routes.filter((route: any) => route.id !== 2);
    setRoutes(routes);
    setNavigation(routes);
  }, [path]);

  
  
  return (
    <Disclosure
      as="nav"
      className={`${
        darkToggle && "bg-gray-700"
      } bg-white border-b-2 w-full shadow-lg`}
    >
      {({ open }: any) => (
        <React.Fragment>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/">
                  <div className="flex gap-0 items-center h-[30px]">
                    <Image
                      className="animation-pulse"
                      src={logo}
                      height={20}
                      width={30}
                      // src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Save Lives BD"
                    />

                    <h1
                      className="
                        text-red-500 hover:text-amber-500 
                        cursor-pointer
                        font-[900] text-xl
                        uppercase
                      "
                    >
                      Save Lives BD
                    </h1>
                  </div>
                </Link>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation?.map((item: any) => (
                      <Link key={item?.id} href={item?.href}>
                        <a
                          className={classNames(
                            item?.href === path
                              ? "bg-amber-500 text-white"
                              : "text-gray-400 hover:bg-red-400 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                        >
                          {item?.name}
                        </a>
                      </Link>
                    ))}
                    {darkToggle ? (
                      <button
                        onClick={() => {
                          setDarkToggle(!darkToggle);
                          sessionStorage.setItem("bg", "light");
                        }}
                        className="text-gray-300 rounded-full outline-none focus:outline-none"
                      >
                        <span className="sr-only">Light Mode</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setDarkToggle(!darkToggle);
                          sessionStorage.setItem("bg", "dark");
                        }}
                        className="text-gray-500 rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20"
                      >
                        <span className="sr-only">Dark Mode</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="5" />
                          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex gap-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-white-400 p-0 rounded-full text-gray-400 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-100 focus:ring-amber"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                {
                  token && <Menu as="div" className={`ml-3 relative `}>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <div
                        className="h-10 w-10 rounded-full bg-red-500 flex flex-col justify-center text-white font-bold text-md"
                      >
                        {
                          admin?.name 
                          ? <p className='uppercase'>
                              {
                                admin?.name?.split(" ")?.slice(0, 2)?.map((word: any) => word.substring(0, 1)).join("")
                              }
                          </p>
                          : "A"
                        }
                      </div>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }: any) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }: any) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }: any) => (
                            <a
                              onClick={() => {
                                localStorage.clear();
                                sessionStorage.clear();
                                Cookies.remove("access_token");
                                router.push("/");
                              }}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                }
                
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item: any) => (
                // <Disclosure.Button
                <Disclosure.Button
                  key={item?.name}
                  as="a"
                  href={item?.href}
                  onClick={() => {
                    const navigates: any = routes?.map((nav: any) => {
                      if (nav?.id == item?.id) {
                        nav.current = true;
                      } else {
                        nav.current = false;
                      }
                    });
                    setNavigation(navigates);
                  }}
                  className={classNames(
                    item?.href === path
                      ? "bg-amber-500 text-white"
                      : "text-gray-300 hover:bg-red-700 hover:text-white ",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item?.current ? "page" : undefined}
                >
                  {item?.name}
                </Disclosure.Button>
              ))}
              {darkToggle ? (
                <button
                  onClick={() => {
                    setDarkToggle(!darkToggle);
                    sessionStorage.setItem("bg", "light");
                  }}
                  style={{ marginLeft: 10 }}
                  className="text-gray-300 rounded-full outline-none focus:outline-none"
                >
                  <span className="sr-only">Light Mode</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDarkToggle(!darkToggle);
                    sessionStorage.setItem("bg", "dark");
                  }}
                  style={{ marginLeft: 10 }}
                  className="text-gray-500 rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20"
                >
                  <span className="sr-only">Dark Mode</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                </button>
              )}
            </div>
          </Disclosure.Panel>
        </React.Fragment>
      )}
    </Disclosure>
  );
}