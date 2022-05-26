import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import useOrders from '../../hooks/useOrders';
import MyOrder from './MyOrder';
import { toast } from 'react-toastify';

const MyOrders = () => {
    const [orders, loading] = useOrders();
    const [user] = useAuthState(auth);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        setUserOrders(orders?.filter(order => order.userEmail === user.email));
    }, [orders, user.email]);

    if (loading) {
        return <Loading />;
    }


    const handleCancelOrder = _id => {
        const proceed = window.confirm('Are you sure to cancel the order?');
        if (proceed) {
            fetch(`http://localhost:5000/orders/${_id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        setUserOrders(userOrders.filter(userOrder => userOrder._id !== _id));
                        toast.success('Order Cancelled!');
                    }
                })
        }
    }

    return (
        <div>
            <h2 className="fs-3 text-center w-75">My Orders</h2>
            {
                userOrders.length ?
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
                                userOrders.map((userOrder, index) => <MyOrder
                                    key={userOrder._id}
                                    userOrder={userOrder}
                                    index={index}
                                    handleCancelOrder={handleCancelOrder}
                                ></MyOrder>)
                            }
                        </tbody>
                    </Table>
                    :
                    <>
                        <h3 className='text-danger text-center mt-5'>You have no order</h3>
                        <h3 className='text-center'><Link to='/tools' className='text-decoration-none'>Click here to buy tools</Link></h3>
                    </>
            }
        </div>
    );
};

export default MyOrders;