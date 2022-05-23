import React from 'react';
import { useLocation } from 'react-router-dom';

const PlaceOrder = () => {
    const location = useLocation();
    const _id = location?.state?._id;
    return (
        <div>
            <h2>place order</h2>
        </div>
    );
};

export default PlaceOrder;