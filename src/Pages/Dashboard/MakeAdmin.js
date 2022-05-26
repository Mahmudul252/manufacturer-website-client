import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';
import MakeAdminChild from './MakeAdminChild';

const MakeAdmin = () => {
    const [user] = useAuthState(auth);
    const [users, loading] = useUsers();
    const [updatedUsers, setUpdatedUsers] = useState([]);
    const [adminLoading, setAdminLoading] = useState(false);
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState({});
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        setUpdatedUsers(users.map(user => user));
        setLoggedInUser(users.find(u => u.userEmail === user.email));
        setRenderCount(renderCount + 1);
    }, [users, user.email]);

    if (renderCount === 2) {
        if (loggedInUser.role !== 'Admin') {
            navigate('/unAuthorizedAccess', { replace: true });
        }
    }

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
                body: JSON.stringify({ role: 'Admin' })
            })
                .then(res => res.json())
                .then(data => {
                    const restUsers = updatedUsers.filter(updatedUser => updatedUser._id !== _id);
                    selectedUser.role = 'Admin';
                    setUpdatedUsers([...restUsers, selectedUser]);
                    toast.success(`Made ${selectedUser.userName} an admin successfully!`);
                    setAdminLoading(false);
                });
        }
    }

    return (
        <div>
            <h2 className="fs-3 text-center w-75">Make Admin</h2>
            <Table striped bordered hover variant="dark" className={loggedInUser?.role === 'Admin' ? 'text-center w-75' : 'd-none'}>
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