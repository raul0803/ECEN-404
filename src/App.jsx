import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import Drone from './components/drone.jsx';
import View from './components/view.jsx';
import User from './components/user.jsx';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'raul.png',
}
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Drone Maintanance', href: '/drone', current: false },
  { name: 'View', href: '/view', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '/user', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className='text-black flex justify-between'>
                  <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                    Capstone
                  </h1>
                  <div className="flex h-16 items-center ">
                    <div className="flex items-center">
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                         
                          <button
                            type="button"
                            onClick={() => setCurrentPage('Home')} 
                            className={classNames(
                              'text-black hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >Home</button>
                          <button
                            type="button"
                            onClick={() => setCurrentPage('drone')} 
                            className={classNames(
                              'text-black hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >Drone Maintenance</button>
                          <button
                            type="button"
                            onClick={() => setCurrentPage('view')} 
                            className={classNames(
                              'text-black hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >View</button>

                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">


                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          
                                <Menu.Item key="userPage">
                                  {({ active }) => (
                                
                                    <button
                                    type="button"
                                    onClick={() => setCurrentPage('user')} 
                                    className={classNames(
                                      'text-black hover:bg-gray-700 hover:text-white',
                                      'rounded-md px-3 py-2 text-sm font-medium'
                                    )}
                                  >Your Profile </button>
                                  )}
                                </Menu.Item>
                          
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}

                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div>
          <button onClick={() => setCurrentPage('table')}>Stats</button> &nbsp;
          <button onClick={() => setCurrentPage('drone')}>Drone Maintance</button>
          <button onClick={() => setCurrentPage('view')}>View</button>
          {currentPage === 'drone' && <Drone />}
          {currentPage === 'view' && <View />}
          {currentPage === 'user' && <User />}
          {currentPage === 'Home' && <Home />}
        </div>

      </div>
    </>


    // <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/drone" element={<Drone />} />
    //     <Route path="/view" element={<View />} />
    //     <Route path="/user" element={<User/>} />
    // </Routes>


  );
}

export default App;
