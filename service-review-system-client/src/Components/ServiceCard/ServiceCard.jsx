import React from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

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
    <div
      className="card bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
      data-aos="fade-up"
      data-aos-duration="800"
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
        <h2 className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors duration-300">
          {serviceTitle}
        </h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="text-sm text-gray-500 mt-3">Category: {category}</div>
        <div className="text-lg font-semibold text-primary mt-2">Price: {price}</div>
        <div className="text-md font-medium text-yellow-500 mt-1">Reviews: {review}</div>
        <div className="card-actions justify-end mt-4">
          <Link to={`/service-details/${_id}`}>
            <button className="btn bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-primary-dark transition-colors duration-300">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
