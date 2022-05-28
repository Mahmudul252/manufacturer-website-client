import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useOrders from '../../hooks/useOrders';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import ManageOrder from './ManageOrder';

const ManageOrders = () => {
    const [user, userLoading] = useAuthState(auth);
    const [users, usersLoading] = useUsers();
    const [orders, loading] = useOrders();
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState({});
    const [renderCount, setRenderCount] = useState(0);
    const [adminLoading, setAdminLoading] = useState(false);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        setAllOrders(orders);
        setLoggedInUser(users.find(u => u.userEmail === user.email));
        setRenderCount(renderCount + 1);
    }, [users, user.email]);

    if (loading || userLoading || usersLoading || adminLoading) {
        return <Loading />;
    }

    if (renderCount === 2) {
        if (loggedInUser.role !== 'Admin') {
            navigate('/unAuthorizedAccess', { replace: true });
        }
    }
    const handleApproveOrder = _id => {
        setAdminLoading(true);
        fetch(`https://lit-journey-03392.herokuapp.com/orders/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ shippingStatus: 'shipped', paymentStatus: 'Paid' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const selectedOrder = allOrders.find(order => order._id === _id);
                    const remainingOrders = allOrders.filter(order => order._id !== _id);
                    selectedOrder.shippingStatus = 'shipped';
                    setAllOrders([...remainingOrders, selectedOrder]);
                    setAdminLoading(false);
                    toast.success('Order Approved Successfully!');
                }
            })
    }
    const handleCancelOrder = _id => {
        const proceed = window.confirm('Are you sure to cancel?');
        if (proceed) {
            setAdminLoading(true);
            fetch(`https://lit-journey-03392.herokuapp.com/orders/${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingOrders = allOrders.filter(order => order._id !== _id);
                        setAllOrders(remainingOrders);
                        setAdminLoading(false);
                        toast.success('Order Cancelled Successfully!');
                    }
                })
        }
    }
    return (
        <div>
            <PageTitle title="Manage Orders" />
            <h2 className='text-center'>Manage All Orders</h2>
            {
                allOrders.length ?
                    <Table striped bordered hover variant="dark" className='text-center' style={{ width: '90%' }} >
                        <thead>
                            <tr>
                                <th></th>
                                <th>Orderer Name</th>
                                <th>Tool Name</th>
                                <th>Total Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allOrders.map((order, index) => <ManageOrder
                                    key={index}
                                    order={order}
                                    index={index}
                                    handleApproveOrder={handleApproveOrder}
                                    handleCancelOrder={handleCancelOrder}
                                ></ManageOrder>)
                            }
                        </tbody>
                    </Table>
                    :
                    <h3 className='text-danger text-center mt-5'>No order available</h3>
            }

        </div >
    );
};

export default ManageOrders;