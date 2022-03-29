import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
    return(
         <div className='header-2 '>
          <nav className='bg-gray-300 py-2 md:py-4'>
            <div className='container px-4 mx-auto md:flex md:items-center'>
              <div className='flex justify-between items-center'>
                <Link to='/' className='font-bold text-xl text-indigo-600'>
                  WebSite title
                </Link>
                <button
                  className='border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden'
                  id='navbar-toggle'
                >
                  <i className='fas fa-bars' />
                </button>
              </div>
              <div className='hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0' id='navbar-collapse'>
                <Link to='/' className='p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600'>
                  <i className='fas fa-home' /> Home
                </Link>
                <Link
                  to='/contacts'
                  className='p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'
                >
                  <i className='fas fa-address-book' /> Contact
                </Link>
                <Link
                  to='/login'
                  className='p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'
                >
                  <i className='fas fa-address-book' /> login
                </Link>
                <Link
                  to='/register'
                  className='p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'
                >
                  <i className='fas fa-address-book' /> signup
                </Link>
              </div>
            </div>
          </nav>
        </div>
    );
}