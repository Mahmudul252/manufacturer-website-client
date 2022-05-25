import React from 'react';
import useOrders from '../../hooks/useOrders';

const MyOrders = () => {
    const [orders, loading] = useOrders();
    console.log(orders)
    return (
        <div>
            <h2 className="display-6">My Orders</h2>
        </div>
    );
};

export default MyOrders;