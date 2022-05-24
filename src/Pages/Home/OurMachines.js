import React from 'react';
import machine1 from '../../images/machine1.jpg';
import machine2 from '../../images/machine2.jpg';
import machine3 from '../../images/machine3.jpg';
import './Home.css';

const OurMachines = () => {
    return (
        <div className='container my-5'>
            <h2 className="display-6 text-center mb-4">Our Machines</h2>
            <div className="d-flex flex-column flex-lg-row gap-3">
                <img className='rounded-3 machine-image' src={machine1} alt="" />
                <img className='rounded-3 machine-image' src={machine2} alt="" />
                <img className='rounded-3 machine-image' src={machine3} alt="" />
            </div>
        </div>
    );
};

export default OurMachines;