import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <div>
           <section className='bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 w-full sticky top-0 z-10'>
           <Navbar></Navbar>
            </section>
            <section className='max-w-screen-2xl mx-auto'>
            <Outlet></Outlet>
            </section>
           <section>
           <Footer></Footer>
           </section>
        </div>
    );
};

export default Root;