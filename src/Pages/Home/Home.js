import React from 'react';
import Reviews from '../Reviews/Reviews';
import Tools from '../Tools/Tools';
import Banner from './Banner';

const Home = () => {
    return (
        <div>
            <Banner />
            <Tools showAll={false}></Tools>
            <Reviews showAll={false}></Reviews>
        </div>
    );
};

export default Home;