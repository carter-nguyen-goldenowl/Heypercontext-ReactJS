import axios from "axios";
import React from "react";
import { Link, useHistory} from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar(){
  const history = useHistory();

  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/logout').then(res => {
      if(res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        toast.success(res.data.message);
        history.push("/");
      }
    });
  }

  var authUl = "";
      if(!localStorage.getItem('auth_token')){
        authUl = (
          <>
            <Link to='/login'
                  className='p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'
            >
            <i className='fas fa-address-book' /> login
            </Link>
            <Link to='/register'
                  className='p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'
            >
            <i className='fas fa-address-book' /> signup
            </Link>
          </>
        );
      }else{
        authUl = (
        <div className="flex items-center relative">
          <div className="dropdown relative">
            <Link className="dropdown-toggle flex items-center hidden-arrow" to="#" id="dropdownMenuButton2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              hi {localStorage.getItem("auth_name")}
              <img src="https://mdbootstrap.com/img/new/avatars/2.jpg" className="rounded-full ml-2" style={{height: 25, width: 25}} alt="lazy" />
              
            </Link>
              <ul className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0" aria-labelledby="dropdownMenuButton2">
                  <li>
                    <button onClick={logoutSubmit} className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">Logout</button>
                  </li>
              </ul>
          </div>
        </div>
        );
      }

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
                {authUl}
              </div>
            </div>
          </nav>
        </div>
    );
}