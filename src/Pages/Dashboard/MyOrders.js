import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import useOrders from '../../hooks/useOrders';
import MyOrder from './MyOrder';

const MyOrders = () => {
    const [orders, loading] = useOrders();
    const [user] = useAuthState(auth);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        setUserOrders(orders?.filter(order => order.userEmail === user.email));
    }, [orders, user.email])
    console.log(userOrders);

    return (
        <div>
            <h2 className="display-6 text-center">My Orders</h2>
            {
                userOrders.length ?
                    <Table striped bordered hover variant="dark" className='text-center'>
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