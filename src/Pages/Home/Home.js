import React from 'react';
import Tools from '../Tools/Tools';
import Banner from './Banner';

const Home = () => {
    return (
        <div>
            <Banner />
            <Tools showAll={false}></Tools>
        </div>
    );
};

export default Home;