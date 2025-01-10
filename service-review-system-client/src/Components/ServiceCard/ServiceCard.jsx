import React from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
import { motion } from "framer-motion";

const ServiceCard = ({ service }) => {
  const {
    _id,
    serviceImage,
    serviceTitle,
    description,
    category,
    price,
    review,
  } = service;

  return (
<motion.div
  className="card bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
  data-aos="fade-up"
  data-aos-duration="800"
  whileHover={{ scale: 1.1 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.2, ease: "easeInOut" }}
>
  <figure className="relative">
    <img
      src={serviceImage}
      alt={serviceTitle}
      className="w-full h-56 object-cover rounded-t-lg"
    />
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
  </figure>
  <div className="card-body p-6">
    <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-colors duration-300">
      {serviceTitle}
    </h2>
    <p className="text-gray-600 mt-2">{description}</p>
    <div className="flex items-center justify-between rounded-lg">
  <div className="text-sm text-white rounded-full bg-blue-500 py-2 px-4 text-center hover:bg-blue-600 transition-colors duration-300">
    {category}
  </div>
  <div className="text-lg font-semibold text-blue-500">${price.toFixed(2)}</div>
</div>

    <div className="text-md font-medium text-yellow-600 mt-1">Reviews: {review}</div>
    <div className="card-actions justify-end mt-4">
      <Link to={`/service-details/${_id}`}>
        <button className="btn bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg hover:scale-105 transition-all duration-300">
          See Details
        </button>
      </Link>
    </div>
  </div>
</motion.div>


  );
};

export default ServiceCard;
