import React from 'react';
import serviceIcon from '../../images/service-icon.png';
import revenueIcon from '../../images/revenue-icon.png';
import reviewIcon from '../../images/review-icon.png';
import toolsIcon from '../../images/tools-icon.png';
import './Home.css';

const BusinessSummary = () => {
    return (
        <div className="container my-5">
            <h2 className="display-6 text-center mb-3">Business Summary</h2>
            <div className='d-flex flex-column flex-lg-row justify-content-between text-center'>
                <div className='text-center custom-border'>
                    <img className='w-50 p-3' src={serviceIcon} alt="" />
                    <p className="fw-bold">We served 100+ Customers</p>
                </div>
                <div className='custom-border'>
                    <img className='w-50 p-3' src={revenueIcon} alt="" />
                    <p className="fw-bold">130M+ Annual Revenue</p>
                </div>
                <div className='custom-border'>
                    <img className='w-50 p-3' src={reviewIcon} alt="" />
                    <p className="fw-bold">25K+ Reviews</p>
                </div>
                <div className='custom-border'>
                    <img className='w-50 p-3' src={toolsIcon} alt="" />
                    <p className="fw-bold">50+ Tools</p>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;