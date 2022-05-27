import React from 'react';
import { useLocation } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle';

const Payment = () => {
    const location = useLocation();
    const orderId = location?.state?._id;
    return (
        <div>
            <PageTitle title="Payment" />
            <h2 className="display-6 text-center">Please Pay {orderId}</h2>
        </div>
    );
};

export default Payment;