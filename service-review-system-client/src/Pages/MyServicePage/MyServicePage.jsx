import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import ServiceTable from './ServiceTable';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyServicePage = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to indicate fetching
  const axiosSecure= useAxiosSecure()
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        let url = `/services/${user.email}`;
        if (searchTerm.trim()) {
          url = `/service?searchParams=${searchTerm}&email=${user.email}`;
        }

        const response = await axiosSecure.get(url);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchServices();
    }
  }, [searchTerm, user?.email]); // Depend on searchTerm and user.email

  return (
    <div className="">
      <h1 className="text-3xl text-center font-bold my-8 text-primary">My Services</h1>

      {/* Search Form */}
      <form className="flex items-center gap-2 my-4 w-2/4 mx-auto">
        <input
          type="text"
          placeholder="Search for service tittle..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border-2 rounded focus:outline-none focus:border-blue-700"
        />
      </form>

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="text-center text-2xl">No services found... <br />You have not added any service</div>
      ) : (
        <div className="flex flex-col items-center">
          {services.map((service) => (
            <ServiceTable
              key={service._id}
              service={service}
              services={services}
              setServices={setServices}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyServicePage;
