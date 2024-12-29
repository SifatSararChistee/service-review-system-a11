import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../Loading/Loading';
import logo from '../../../src/assets/icons8-review-96.png';

const Navbar = () => {
  const { user, logOut, setUser, loading } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  const links = (
    <>
      <li><NavLink to={'/'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>Home</NavLink></li>
      <li><NavLink to={'/all-services'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>Services</NavLink></li>
      {user ? <li><NavLink to={'/add-service'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>Add Service</NavLink></li> : ''}
      {user ? <li><NavLink to={'/my-services'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>My Services</NavLink></li> : ''}
      {user ? <li><NavLink to={'/my-reviews'} className={'hover:text-blue-700 transition-colors duration-300'}>My Reviews</NavLink></li> : ''}
    </>
  );

  return (
    <div className="navbar px-5 py-3 max-w-screen-2xl mx-auto">
      <div className="navbar-start flex items-center">
        <div className="dropdown z-30">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-transparent focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl">
            {links}
          </ul>
        </div>
        <Link to={"/"} className="flex items-center">
          <img srcSet={logo} className="w-16 hidden lg:block md:block mr-2" alt="Trustify Logo" />
          <button className="btn btn-ghost lg:text-2xl font-bold text-white hover:text-blue-600 transition-colors duration-300">
            Trustify
          </button>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">{links}</ul>
      </div>
      <div className="navbar-end flex items-center">
        {loading ? (
          <Loading />
        ) : (
          <>
            {user && user?.email ? (
              <div className="mr-3 relative group">
                <img
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full group-hover:opacity-75 transition-opacity duration-200"
                  srcSet={user.photoURL}
                  alt=""
                />
                <span className="absolute top-1/2 left-[-150%] transform -translate-y-1/2 -translate-x-0 mt-2 px-2 py-1 text-base text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {user.displayName}
                </span>
              </div>
            ) : (
              ''
            )}
            {user && user?.email ? (
              <button
                onClick={handleLogOut}
                className="btn btn-neutral text-white hover:text-gray-300 transition-colors duration-300 transform hover:scale-105"
              >
                Log Out
              </button>
            ) : (
              <div>
                <Link to={"/login"}>
                  <button className="btn btn-success text-white transition-transform transform hover:scale-105 hover:text-gray-800">
                    Log In
                  </button>
                </Link>
                <span className="text-xl mx-4 font-bold text-white">Or</span>
                <Link to={"/register"}>
                  <button className="btn btn-info text-white transition-transform transform hover:scale-105 hover:text-gray-800">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
