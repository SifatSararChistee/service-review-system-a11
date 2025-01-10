import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <div className='flex flex-col min-h-screen'>
           <section className='bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 w-full sticky top-0 z-10'>
           <Navbar></Navbar>
            </section>
            <section className='flex-grow'>
            <Outlet></Outlet>
            </section>
           <section className='w-full bg-gray-200'>
           <Footer></Footer>
           </section>
        </div>
    );
};

export default Root;