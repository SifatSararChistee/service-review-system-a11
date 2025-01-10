import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';

const FeaturedServices = () => {
    const [featuredServices, setFeaturedServices]=useState([])
    useEffect(()=>{
        axios.get(`https://b10a11-server-side-sifat-sarar-chistee.vercel.app/services-limited`,
            {
                withCredentials: true,  // Include cookies or credentials in the request
            }
        )
        .then(res=> setFeaturedServices(res.data))
    },[])
    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-4xl font-bold my-8 text-center text-blue-500'>Featured Services</h1>
            <div className='grid grid-cols-1 place-items-center lg:grid-cols-4 md:grid-cols-3 gap-8'>
                {
                    featuredServices.map(service =><ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default FeaturedServices;