import React from 'react';
import logo from '../../assets/icons8-review-96.png';

const Footer = () => {
    return (
      <div>
        <footer className="footer text-base-content p-10 max-w-screen-2xl mx-auto">
  <aside>
      
    <p className='lg:text-2xl font-bold text-fuchsia-500 flex items-center'>
    <img src={logo} alt="" />
      Trustify
    </p>
    <p>A platform designed to allow users to review and <br /> interact with services listed by others</p>
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
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