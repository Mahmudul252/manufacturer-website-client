import React from 'react';

const ManageProduct = ({ tool, index, handleDeleteTool }) => {
    const { _id, name, availableQuantity } = tool;
    console.log(tool)

    return (
        <tr>
            <td>{index}</td>
            <td>{name}</td>
            <td>{availableQuantity}</td>
            <td><button onClick={() => handleDeleteTool(_id)} className="btn btn-danger">Delete</button></td>
        </tr>
    );
};

export default ManageProduct;