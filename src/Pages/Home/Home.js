import React from 'react';
import Reviews from '../Reviews/Reviews';
import PageTitle from '../Shared/PageTitle';
import Tools from '../Tools/Tools';
import AmazingWorks from './AmazingWorks';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import OurMachines from './OurMachines';

const Home = () => {
    return (
        <div>
            <PageTitle title="" />
            <Banner />
            <Tools />
            <AmazingWorks />
            <OurMachines />
            <Reviews />
            <BusinessSummary />
        </div>
    );
};

export default Home;