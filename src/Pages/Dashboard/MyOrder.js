import React from 'react';
import { Link } from 'react-router-dom';

const MyOrder = ({ userOrder, index, handleCancelOrder, handlePayOrder }) => {
    const { _id, toolName, orderQuantity, totalPrice } = userOrder;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{toolName}</td>
            <td>{orderQuantity}</td>
            <td>${totalPrice}</td>
            <td>
                <Link to={`/dashboard/payment/${_id}`} className="btn btn-success me-3">Pay</Link>
                <button onClick={() => handleCancelOrder(_id)} className="btn btn-danger ">Delete</button>
            </td>
        </tr>
    );
};

export default MyOrder;