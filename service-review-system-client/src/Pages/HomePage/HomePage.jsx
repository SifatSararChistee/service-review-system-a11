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
            <Banner></Banner>
            <FeaturedServices></FeaturedServices>
            <ServicesSection></ServicesSection>
            <ReasonsToChooseUs></ReasonsToChooseUs>
            <MeetPartners></MeetPartners>
            <StatsSection></StatsSection>
        </div>
    );
};

export default HomePage;