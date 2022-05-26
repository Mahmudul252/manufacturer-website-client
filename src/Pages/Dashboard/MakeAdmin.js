import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';
import MakeAdminChild from './MakeAdminChild';

const MakeAdmin = () => {
    const [users, loading] = useUsers();
    const [updatedUsers, setUpdatedUsers] = useState([]);
    const [adminLoading, setAdminLoading] = useState(false);

    useEffect(() => {
        setUpdatedUsers(users.map(user => user));
    }, [users]);

    if (loading || adminLoading) {
        return <Loading />;
    }

    const handleMakeAdmin = _id => {
        const selectedUser = users.find(user => user._id === _id);
        const proceed = window.confirm(`Are you sure to make ${selectedUser.userName} an admin?`);

        if (proceed) {
            setAdminLoading(true);
            const url = `http://localhost:5000/users/${_id}`;
            fetch(url, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ role: 'admin' })
            })
                .then(res => res.json())
                .then(data => {
                    toast.success(`Made ${selectedUser.userName} an admin successfully!`);
                    setUpdatedUsers([...updatedUsers, selectedUser.role = 'admin']);
                    setAdminLoading(false);
                });
        }
    }

    return (
        <div>
            <h2 className="fs-3 text-center w-75">Make Admin</h2>
            <Table striped bordered hover variant="dark" className='text-center w-75'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Tool Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        updatedUsers.map((user, index) => <MakeAdminChild
                            key={user._id}
                            user={user}
                            index={index}
                            handleMakeAdmin={handleMakeAdmin}
                        ></MakeAdminChild>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default MakeAdmin;