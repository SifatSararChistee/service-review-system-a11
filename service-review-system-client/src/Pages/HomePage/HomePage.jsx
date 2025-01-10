import React from 'react';
import Banner from '../../Components/Banner/Banner';
import FeaturedServices from '../../Components/FeaturedServices/FeaturedServices';
import MeetPartners from '../../Components/MeetPartners/MeetPartners';
import StatsSection from '../../Components/StatsSection/StatsSection';
import ReasonsToChooseUs from '../../Components/UniqueSections/ReasonsToChooseUs';
import ServicesSection from '../../Components/UniqueSections/ServicesSection';

const HomePage = () => {
    return (
        <div>
            <section className='w-full mx-auto'>   
                <Banner></Banner>
            </section>
            <section className='max-w-screen-2xl mx-auto'>
                <FeaturedServices></FeaturedServices>
            </section>
            <section className='bg-gray-100 w-full'>
                <ServicesSection></ServicesSection>
            </section>
            <section className='max-w-screen-2xl mx-auto'>
                <ReasonsToChooseUs></ReasonsToChooseUs>
            </section>
            <section className='max-w-screen-2xl mx-auto'>
            <MeetPartners></MeetPartners>
            </section>
            <section  className='bg-gray-100 w-full'>
            <StatsSection></StatsSection>
            </section>
        </div>
    );
};

export default HomePage;