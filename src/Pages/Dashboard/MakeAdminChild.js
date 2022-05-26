import React from 'react';

const MakeAdminChild = ({ index, user, handleMakeAdmin }) => {
    const { userEmail, userName, _id, role = 'user' } = user;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{userName}</td>
            <td>{userEmail}</td>
            <td>{role}</td>
            <td>
                <button onClick={() => handleMakeAdmin(_id)} className={role === 'admin' ? 'd-none' : "btn btn-success"}>Make Admin</button>
            </td>
        </tr>
    );
};

export default MakeAdminChild;