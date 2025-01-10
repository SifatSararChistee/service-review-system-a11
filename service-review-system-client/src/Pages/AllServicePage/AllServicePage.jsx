import React, { useEffect, useState } from 'react';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';
import axios from 'axios';

const AllServicePage = () => {
    const [services, setServices]= useState([])
    const [filter, setFilter]= useState('')
    const [search, setSearch]= useState('')
    const [sort , setSort]=useState('')
    useEffect(()=>{
      const fetchAllServices = async ()=>{
        const {data} = await axios.get(`https://b10a11-server-side-sifat-sarar-chistee.vercel.app/services?filter=${filter}&search=${search}&sort=${sort}`,
          {
            withCredentials: true,  // Include cookies or credentials in the request
          }
        )
        setServices(data)
      }
      fetchAllServices()
    },[filter, search, sort])
    
    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-5 text-blue-500'>All services </h1>

            <div className='flex items-center justify-center my-8 gap-5'>
            {/* category filter */}
            <div className='text-center'>
              <select
              name='category'
              id='category'
              className='border-2 p-4 rounded-lg focus:border-fuchsia-700'
              onChange={(e)=>setFilter(e.target.value)}
              >
                <option value=''>Filter By Category</option>
                <option value='IT'>IT</option>
                <option value='Education'>Education</option>
                <option value='Cleaning'>Cleaning</option>
                <option value='Healthcare'>Healthcare</option>
                <option value='Fitness'>Fitness</option>
                <option value='Food'>Food</option>
                <option value='Repair'>Repair</option>
              </select>
            </div>

                    {/* Search Form */}
            <div className='w-1/2'>
                <form className="flex items-center gap-2 my-4 mx-auto">
                    <input
                        type="text"
                        placeholder="Search for service tittle..."
                        aria-label="Search for service tittle..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 border-2 rounded focus:outline-none focus:border-fuchsia-700"
                    />
                </form>
            </div>

            <div className='text-center'>
              <select
              name='sorted'
              id='sorted'
              className='border-2 p-4 rounded-lg focus:border-fuchsia-700'
              onChange={(e)=>setSort(e.target.value)}
              >
                <option value=''>Sort By Price</option>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
              </select>
            </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto w-11/12">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
        </div>
    );
};

export default AllServicePage;