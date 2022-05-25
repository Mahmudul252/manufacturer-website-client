import React from 'react';

const MyOrder = ({ userOrder, index }) => {
    const { toolName, orderQuantity, totalPrice } = userOrder;
    console.log(userOrder)
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{toolName}</td>
            <td>{orderQuantity}</td>
            <td>{totalPrice}</td>
            <td>
                <button className="btn btn-success me-2">Pay</button>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    );
};

export default MyOrder;