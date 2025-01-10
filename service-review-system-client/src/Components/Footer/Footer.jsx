import React, { useContext } from 'react';
import logo from '../../assets/icons8-review-96.png';
import { AuthContext } from '../../Provider/AuthProvider';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const{user}=useContext(AuthContext)
    return (
      <div>
        <footer className="footer text-base-content p-10 max-w-screen-2xl mx-auto">
  <aside>
      
    <p className='lg:text-2xl font-bold text-black flex items-center'>
    <img src={logo} alt="" />
      Trustify
    </p>
    <p>A platform designed to allow users to review and <br /> interact with services listed by others</p>
  </aside>
  <div>
  <p  className="link link-hover"><NavLink to={'/'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>Home</NavLink></p>
      <p  className="link link-hover"><NavLink to={'/all-services'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>Services</NavLink></p>
      {user ? <p  className="link link-hover"><NavLink to={'/add-service'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>Add Service</NavLink></p> : ''}
      {user ? <p  className="link link-hover"> <NavLink to={'/my-services'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>My Services</NavLink></p> : ''}
      {user ? <p  className="link link-hover"><NavLink to={'/my-reviews'} className={'hover:text-blue-700 transition-colors duration-300'}>My Reviews</NavLink></p> : ''}
  </div>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>

<footer className="footer footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Trustify</p>
  </aside>
</footer>
      </div>

    );
};

export default Footer;