import React, { useContext } from 'react';
import logo from '../../assets/icons8-review-96.png';
import { AuthContext } from '../../Provider/AuthProvider';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Footer = () => {
  const{user}=useContext(AuthContext)
  const subscribeBtn=e=>{
    e.preventDefault()
    toast.success('You are subscribed to our newsletter')
  }
    
  
    return (
      <div>
        <footer className="footer text-black p-10 max-w-screen-2xl mx-auto flex flex-col lg:flex-row md:flex-row items-center justify-around">
  <aside>
      
    <p className='lg:text-2xl font-bold text-black flex items-center'>
    <img src={logo} alt="" />
      Trustify
    </p>
    <p>A platform designed to allow users to review and <br /> interact with services listed by others</p>
  </aside>
  <div className='text-lg'>
  <p  className="link link-hover"><NavLink to={'/'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>Home</NavLink></p>
      <p  className="link link-hover"><NavLink to={'/all-services'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>Services</NavLink></p>
      <p  className="link link-hover"><NavLink to={'/contact'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>Contact Us</NavLink></p>
      {user ? <p  className="link link-hover"><NavLink to={'/add-service'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>Add Service</NavLink></p> : ''}
      {user ? <p  className="link link-hover"> <NavLink to={'/my-services'} className={'mr-4 hover:text-blue-700 transition-colors duration-300'}>My Services</NavLink></p> : ''}
      {user ? <p  className="link link-hover"><NavLink to={'/my-reviews'} className={'hover:text-blue-700 transition-colors duration-300'}>My Reviews</NavLink></p> : ''}
  </div>
  <div>
  <form>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item" />
        <button onClick={subscribeBtn} className="btn bg-blue-500 text-white join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
  </div>
</footer>

<footer className="footer footer-center bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 text-black p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Trustify</p>
  </aside>
</footer>
      </div>

    );
};

export default Footer;