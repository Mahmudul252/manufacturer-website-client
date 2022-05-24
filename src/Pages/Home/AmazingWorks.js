import React from 'react';
import amazingWorks from '../../images/amazingWorks.jpg';

const AmazingWorks = () => {
    return (
        <div className="bg-dark text-white">
            <div className='d-flex flex-column flex-lg-row align-items-center justify-content-center gap-5 amazing-container'>
                <div>
                    <h2 className="display-6 text-center">Our amazing works</h2>
                    <p className='text-justify'>All the tools we provide are made in our own factory. We don't depend on any other manufacturers to produce any tool. We also have our own delivery service.</p>
                </div>
                <div>
                    <img className='rounded-3 amazing-image' src={amazingWorks} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AmazingWorks;