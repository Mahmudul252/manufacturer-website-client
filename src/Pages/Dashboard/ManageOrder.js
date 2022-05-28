import React from 'react';

const ManageOrder = ({ userOrder, index, handleApproveOrder, handleCancelOrder }) => {
    const { _id, userName, toolName, totalPrice, paymentStatus, shippingStatus } = userOrder;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{userName}</td>
            <td>{toolName}</td>
            <td>${totalPrice}</td>
            <td>
                {
                    (paymentStatus === 'Paid' && shippingStatus === 'pending' && 'Pending') || (paymentStatus === 'Paid' && shippingStatus === 'shipped' && 'Shipped') || 'Unpaid'
                }
            </td>
            <td>
                {
                    (paymentStatus === 'Paid' && shippingStatus === 'pending' && <button className='btn btn-success w-75' onClick={() => handleApproveOrder(_id)}>Approve</button>)
                    ||
                    (paymentStatus === 'Paid' && shippingStatus === 'shipped' && 'Delivered')
                    ||
                    <button className='btn btn-danger w-75' onClick={() => handleCancelOrder(_id)}>Cancel Order</button>
                }
            </td>
        </tr >
    );
};

export default ManageOrder;