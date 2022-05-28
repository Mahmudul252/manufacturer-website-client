import React from 'react';

const ManageProduct = ({ tool, index, handleDeleteTool }) => {
    const { _id, name, availableQuantity } = tool;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{availableQuantity}</td>
            <td><button onClick={() => handleDeleteTool(_id)} className="btn btn-danger">Delete</button></td>
        </tr>
    );
};

export default ManageProduct;