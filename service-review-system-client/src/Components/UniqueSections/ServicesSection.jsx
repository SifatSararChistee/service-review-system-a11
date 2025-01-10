import React from 'react';
import { motion } from 'framer-motion';
import image from '../../assets/join-us.jpg';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  return (
    <section className="py-16 px-8 w-11/12 mx-auto m-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        {/* Left Side: Text and Button */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-8 lg:space-y-10">
          <motion.h2
            className="text-3xl font-bold text-blue-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Add Services & Grow Your Business With Us
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We offer a range of services to help you scale your business to the next level. Join us today and unlock new opportunities for growth and success.
          </motion.p>
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Link to={'/add-service'}>
              <button className="btn bg-blue-500 text-white hover:bg-blue-200 hover:text-black transition-all duration-300 w-1/3">
                Join Us
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Image with Animation */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <motion.img
            src={image}
            alt="Business Growth"
            className="w-full rounded-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
