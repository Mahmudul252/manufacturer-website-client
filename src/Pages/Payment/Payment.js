import React from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const orderId = location?.state?._id;
    return (
        <div>
            <h2 className="display-6 text-center">Please Pay {orderId}</h2>
        </div>
    );
};

export default Payment;