import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        // Fetch services
        const { data: servicesData } = await axios.get(`https://b10a11-server-side-sifat-sarar-chistee.vercel.app/services`);
        setServices(servicesData);

        // Fetch review data
        const { data: reviewData } = await axios.get(`https://b10a11-server-side-sifat-sarar-chistee.vercel.app/all-reviews`);
        setReviews(reviewData);

        // Fetch users data
        const { data: users } = await axios.get(`https://b10a11-server-side-sifat-sarar-chistee.vercel.app/unique-user-emails`);
        setUsers(users);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchAllServices();
  }, []);

  const stats = [
    { title: 'Users', count: users.length, icon: '👤' },
    { title: 'Reviews', count: reviews.length, icon: '⭐' },
    { title: 'Services', count: services.length, icon: '🛠️' },
  ];

  if (loading) {
    return (
      <section className="py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-500">Loading...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-gray-100 my-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-blue-500">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white w-11/12 mx-auto lg:w-full md:w-full shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
              <CountUp
                start={0}
                end={stat.count}
                duration={10}
                className="text-4xl font-bold text-blue-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
